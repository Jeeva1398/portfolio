import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, MeshDistortMaterial, RoundedBox, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import usePalette from './palette'

// Node anchors: app cluster on the left, AI core on top in the middle, data cluster on the right.
const P = {
  client: new THREE.Vector3(-2.7, 1.35, 0.2),
  api: new THREE.Vector3(-1.55, 0.45, 0),
  db: new THREE.Vector3(-1.55, -1.05, 0.15),
  ai: new THREE.Vector3(-0.35, 1.75, -0.2),
  src1: new THREE.Vector3(0.75, 0.95, 0.35),
  src2: new THREE.Vector3(0.75, -0.05, -0.35),
  etl: new THREE.Vector3(0.45, -1.05, 0.25),
  warehouse: new THREE.Vector3(2.05, -0.1, 0),
}

// Which nodes belong to which cluster, so hovering one lights up its whole stack.
const CLUSTER = { client: 'app', api: 'app', db: 'app', ai: 'ai', src1: 'data', src2: 'data', etl: 'data', warehouse: 'data' }

function arc(a, b, lift = 0.5) {
  const mid = a.clone().lerp(b, 0.5)
  mid.y += lift
  mid.z += 0.4
  return new THREE.QuadraticBezierCurve3(a, mid, b)
}

const ROUTES = [
  { from: 'client', to: 'api', lift: 0.3, color: 'app', speed: 0.35 },
  { from: 'api', to: 'db', lift: 0, color: 'app', speed: 0.45 },
  { from: 'api', to: 'ai', lift: 0.25, color: 'ai', speed: 0.4 },
  { from: 'ai', to: 'client', lift: 0.35, color: 'ai', speed: 0.3 },
  { from: 'db', to: 'src2', lift: -0.2, color: 'neutral', speed: 0.22 },
  { from: 'src1', to: 'warehouse', lift: 0.2, color: 'data', speed: 0.3 },
  { from: 'src2', to: 'warehouse', lift: 0.1, color: 'data', speed: 0.38 },
  { from: 'etl', to: 'warehouse', lift: -0.2, color: 'data', speed: 0.33 },
  { from: 'warehouse', to: 'ai', lift: 0.6, color: 'data', speed: 0.2 },
].map((r) => ({ ...r, curve: arc(P[r.from], P[r.to], r.lift) }))

// The hovered node; its whole cluster lights up and the rest of the scene dims.
const FocusContext = createContext(null)

function useLit(id) {
  const node = useContext(FocusContext)
  if (!node) return { lit: false, dim: false }
  const lit = node === id || CLUSTER[node] === CLUSTER[id]
  return { lit, dim: !lit }
}

// Pointer target around a node: scales the node up and reports hover to the scene.
function Node({ id, position, onHover, children }) {
  const group = useRef()
  const { lit, dim } = useLit(id)
  useFrame(() => {
    const g = group.current
    if (!g) return
    const target = lit ? 1.12 : dim ? 0.94 : 1
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, target, 0.12))
  })
  return (
    <group
      ref={group}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover(id)
      }}
      onPointerOut={() => onHover(null)}
    >
      {children}
    </group>
  )
}

const TRAIL = [0, 0.025, 0.05, 0.075]

function Route({ curve, color: tone, speed, offset, from, to }) {
  const color = usePalette()[tone]
  const node = useContext(FocusContext)
  const active = node ? node === from || node === to : null
  const line = useRef()
  const packets = useRef([])
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(curve.getPoints(48)), [curve])

  useFrame(({ clock }) => {
    if (line.current) {
      const target = active === null ? 0.35 : active ? 0.85 : 0.12
      line.current.opacity = THREE.MathUtils.lerp(line.current.opacity, target, 0.1)
    }
    // Two comets per route, each with a short fading tail
    const pace = active ? 1.8 : 1
    packets.current.forEach((mesh, i) => {
      if (!mesh) return
      const comet = Math.floor(i / TRAIL.length)
      const lag = TRAIL[i % TRAIL.length]
      const t = (((clock.elapsedTime * speed * pace + offset + comet * 0.5 - lag) % 1) + 1) % 1
      mesh.position.copy(curve.getPoint(t))
      const fade = 1 - (i % TRAIL.length) / TRAIL.length
      mesh.scale.setScalar((0.5 + Math.sin(t * Math.PI) * 0.7) * fade)
    })
  })

  return (
    <>
      <line geometry={geometry}>
        <lineBasicMaterial ref={line} color={color} transparent opacity={0.35} />
      </line>
      {[0, 1].flatMap((comet) =>
        TRAIL.map((_, j) => {
          const i = comet * TRAIL.length + j
          return (
            <mesh key={i} ref={(m) => (packets.current[i] = m)}>
              <sphereGeometry args={[0.05, 10, 10]} />
              <meshBasicMaterial color={color} toneMapped={false} transparent opacity={1 - j / TRAIL.length} />
            </mesh>
          )
        }),
      )}
    </>
  )
}

function Label({ id, children, position, color }) {
  const { lit, dim } = useLit(id)
  return (
    <Html position={position} center distanceFactor={5.5} zIndexRange={[1, 0]} style={{ pointerEvents: 'none' }}>
      <span
        className="whitespace-nowrap rounded border bg-slate-950/70 px-1.5 py-0.5 font-mono text-[10px] tracking-wider backdrop-blur transition-[opacity,box-shadow] duration-300"
        style={{
          color,
          borderColor: `${color}${lit ? 'cc' : '55'}`,
          opacity: dim ? 0.45 : 1,
          boxShadow: lit ? `0 0 14px ${color}66` : 'none',
        }}
      >
        {children}
      </span>
    </Html>
  )
}

// Soft additive halo so emissive parts read as glowing without a post-processing pass.
function Halo({ color, size = 1, opacity = 0.35 }) {
  const texture = useMemo(() => {
    const s = 64
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = s
    const ctx = canvas.getContext('2d')
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
    g.addColorStop(0, 'rgba(255,255,255,0.9)')
    g.addColorStop(0.35, 'rgba(255,255,255,0.25)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, s, s)
    return new THREE.CanvasTexture(canvas)
  }, [])
  return (
    <sprite scale={[size, size, 1]}>
      <spriteMaterial map={texture} color={color} transparent opacity={opacity} blending={THREE.AdditiveBlending} depthWrite={false} />
    </sprite>
  )
}

function ServerRack({ onHover }) {
  const { app: APP, appBody, glow } = usePalette()
  const leds = useRef([])
  useFrame(({ clock }) => {
    // LEDs blink out of step, like a rack under load
    leds.current.forEach((m, i) => {
      if (m) m.material.opacity = 0.45 + 0.55 * Math.max(0, Math.sin(clock.elapsedTime * (3 + i * 1.7) + i))
    })
  })
  return (
    <Node id="api" position={P.api} onHover={onHover}>
      {[0.3, 0, -0.3].map((y, i) => (
        <RoundedBox key={y} args={[1.15, 0.22, 0.7]} radius={0.05} position={[0, y, 0]}>
          <meshStandardMaterial
            color={appBody}
            emissive={APP}
            emissiveIntensity={(i === 1 ? 0.35 : 0.12) * glow}
            metalness={0.6}
            roughness={0.35}
          />
        </RoundedBox>
      ))}
      {[0.3, 0, -0.3].map((y, i) => (
        <mesh key={`led-${y}`} ref={(m) => (leds.current[i] = m)} position={[0.42, y, 0.36]}>
          <boxGeometry args={[0.16, 0.035, 0.01]} />
          <meshBasicMaterial color={APP} toneMapped={false} transparent />
        </mesh>
      ))}
      <Label id="api" position={[0, 0.62, 0]} color={APP}>
        node / express api
      </Label>
    </Node>
  )
}

function Database({ onHover }) {
  const { app: APP, appBody, glow } = usePalette()
  return (
    <Node id="db" position={P.db} onHover={onHover}>
      {[0.14, -0.1].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.2, 32]} />
          <meshStandardMaterial color={appBody} emissive={APP} emissiveIntensity={0.22 * glow} metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
      <Label id="db" position={[0, -0.48, 0]} color={APP}>
        mongodb · mysql
      </Label>
    </Node>
  )
}

// The AI core: a slowly morphing "thinking" blob inside a wireframe shell, with orbiting tokens.
function AICore({ onHover }) {
  const { ai: AI, aiBody, glow } = usePalette()
  const shell = useRef()
  const orbit = useRef()
  const { lit } = useLit('ai')
  useFrame((_, delta) => {
    if (shell.current) {
      shell.current.rotation.y += delta * 0.35
      shell.current.rotation.x += delta * 0.15
    }
    if (orbit.current) orbit.current.rotation.z += delta * (lit ? 1.6 : 0.8)
  })
  return (
    <Node id="ai" position={P.ai} onHover={onHover}>
      <Halo color={AI} size={1.6} opacity={0.3 * glow + 0.1} />
      <mesh>
        <sphereGeometry args={[0.26, 48, 48]} />
        <MeshDistortMaterial color={aiBody} emissive={AI} emissiveIntensity={0.75 * glow} distort={0.38} speed={2.2} roughness={0.25} />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[0.44, 1]} />
        <meshBasicMaterial color={AI} wireframe transparent opacity={0.35} />
      </mesh>
      <group ref={orbit} rotation={[1.1, 0.3, 0]}>
        {[0, 2.1, 4.2].map((angle) => (
          <mesh key={angle} position={[Math.cos(angle) * 0.62, Math.sin(angle) * 0.62, 0]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color={AI} toneMapped={false} />
          </mesh>
        ))}
        <mesh>
          <torusGeometry args={[0.62, 0.004, 6, 64]} />
          <meshBasicMaterial color={AI} transparent opacity={0.4} />
        </mesh>
      </group>
      <Label id="ai" position={[0, 0.72, 0]} color={AI}>
        llm · fine-tuned model
      </Label>
    </Node>
  )
}

function Warehouse({ onHover }) {
  const { data: DATA, dataBody, glow } = usePalette()
  const inner = useRef()
  const layers = useRef([])
  useFrame(({ clock }, delta) => {
    if (inner.current) inner.current.rotation.y += delta * 0.4
    // Rows of data stack up inside the warehouse
    layers.current.forEach((m, i) => {
      if (!m) return
      const t = (clock.elapsedTime * 0.25 + i / 3) % 1
      m.position.y = -0.42 + t * 0.84
      m.material.opacity = Math.sin(t * Math.PI) * 0.5
    })
  })
  return (
    <Node id="warehouse" position={P.warehouse} onHover={onHover}>
      <Halo color={DATA} size={2} opacity={0.18 * glow + 0.05} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={DATA} transparent opacity={0.08} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial color={DATA} transparent opacity={0.8} />
      </lineSegments>
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(m) => (layers.current[i] = m)} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.86, 0.86]} />
          <meshBasicMaterial color={DATA} transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ))}
      <mesh ref={inner}>
        <boxGeometry args={[0.42, 0.42, 0.42]} />
        <meshStandardMaterial color={dataBody} emissive={DATA} emissiveIntensity={0.6 * glow} />
      </mesh>
      <Label id="warehouse" position={[0, -0.8, 0]} color={DATA}>
        data warehouse
      </Label>
    </Node>
  )
}

function PipelineNode({ id, label, onHover }) {
  const { data: DATA, dataBody, glow } = usePalette()
  const mesh = useRef()
  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.9
  })
  return (
    <Node id={id} position={P[id]} onHover={onHover}>
      <mesh ref={mesh}>
        <octahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial color={dataBody} emissive={DATA} emissiveIntensity={0.7 * glow} flatShading />
      </mesh>
      {label && (
        <Label id={id} position={[0, 0.34, 0]} color={DATA}>
          {label}
        </Label>
      )}
    </Node>
  )
}

function Client({ onHover }) {
  const { app: APP, appBody, glow } = usePalette()
  return (
    <Node id="client" position={P.client} onHover={onHover}>
      <Halo color={APP} size={0.9} opacity={0.35 * glow + 0.1} />
      <mesh>
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshStandardMaterial color={appBody} emissive={APP} emissiveIntensity={0.9 * glow} />
      </mesh>
      <Label id="client" position={[0, 0.34, 0]} color={APP}>
        react client
      </Label>
    </Node>
  )
}

// Two faint tilted rings framing the whole system
function Orbits() {
  const { neutral } = usePalette()
  const a = useRef()
  const b = useRef()
  useFrame((_, delta) => {
    if (a.current) a.current.rotation.z += delta * 0.05
    if (b.current) b.current.rotation.z -= delta * 0.035
  })
  return (
    <group position={[-0.25, 0.2, -0.6]}>
      <mesh ref={a} rotation={[1.25, 0.2, 0]}>
        <torusGeometry args={[3.3, 0.006, 6, 128]} />
        <meshBasicMaterial color={neutral} transparent opacity={0.22} />
      </mesh>
      <mesh ref={b} rotation={[1.4, -0.35, 0.4]}>
        <torusGeometry args={[2.7, 0.005, 6, 128]} />
        <meshBasicMaterial color={neutral} transparent opacity={0.16} />
      </mesh>
    </group>
  )
}

// Leans toward the cursor across the whole window, scales in on load, and tips back as the hero scrolls away.
function Rig({ children }) {
  const group = useRef()
  const pointer = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  useFrame(() => {
    const g = group.current
    if (!g) return
    const scroll = Math.min(window.scrollY / window.innerHeight, 1)
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, pointer.current.x * 0.35 + scroll * 0.5, 0.05)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.current.y * 0.18 - scroll * 0.35, 0.05)
    g.position.z = THREE.MathUtils.lerp(g.position.z, -scroll * 1.5, 0.08)
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, 1, 0.035))
  })
  return (
    <group ref={group} scale={0.55}>
      {children}
    </group>
  )
}

function Lights() {
  const { app, data, ai, glow } = usePalette()
  return (
    <>
      <ambientLight intensity={glow < 1 ? 1.1 : 0.35} />
      <pointLight position={[-4, 2, 4]} intensity={30} color={app} />
      <pointLight position={[4, -1, 4]} intensity={30} color={data} />
      <pointLight position={[0, 3.5, 2]} intensity={14} color={ai} />
    </>
  )
}

function Ambient() {
  const { app, data, ai } = usePalette()
  return (
    <>
      <Sparkles count={28} scale={[7, 4.5, 3]} size={2.2} speed={0.3} opacity={0.6} color={app} />
      <Sparkles count={22} scale={[7, 4.5, 3]} size={2.2} speed={0.25} opacity={0.6} color={data} />
      <Sparkles count={14} scale={[5, 3.5, 2]} size={2.6} speed={0.35} opacity={0.55} color={ai} position={[-0.3, 1, 0]} />
    </>
  )
}

export default function HeroCore({ active }) {
  const [hovered, setHovered] = useState(null)

  return (
    <Canvas
      camera={{ position: [0, 0, 8.4], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
    >
      <FocusContext.Provider value={hovered}>
        <Lights />
        <Rig>
          <Orbits />
          <Ambient />
          <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.35}>
            <Client onHover={setHovered} />
            <ServerRack onHover={setHovered} />
            <Database onHover={setHovered} />
            <AICore onHover={setHovered} />
            <PipelineNode id="src1" label="python extract" onHover={setHovered} />
            <PipelineNode id="src2" onHover={setHovered} />
            <PipelineNode id="etl" label="airflow · dbt" onHover={setHovered} />
            <Warehouse onHover={setHovered} />
            {ROUTES.map((route, i) => (
              <Route key={i} {...route} offset={i * 0.17} />
            ))}
          </Float>
        </Rig>
      </FocusContext.Provider>
    </Canvas>
  )
}
