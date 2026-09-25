import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

const APP = '#22d3ee'
const DATA = '#a78bfa'

// Node anchors: app cluster on the left, data cluster on the right.
const P = {
  client: new THREE.Vector3(-2.7, 1.35, 0.2),
  api: new THREE.Vector3(-1.55, 0.45, 0),
  db: new THREE.Vector3(-1.55, -1.05, 0.15),
  src1: new THREE.Vector3(0.55, 1.05, 0.35),
  src2: new THREE.Vector3(0.75, -0.05, -0.35),
  etl: new THREE.Vector3(0.45, -1.05, 0.25),
  warehouse: new THREE.Vector3(2.05, -0.1, 0),
}

function arc(a, b, lift = 0.5) {
  const mid = a.clone().lerp(b, 0.5)
  mid.y += lift
  mid.z += 0.4
  return new THREE.QuadraticBezierCurve3(a, mid, b)
}

const ROUTES = [
  { curve: arc(P.client, P.api, 0.3), color: APP, speed: 0.35 },
  { curve: arc(P.api, P.db, 0), color: APP, speed: 0.45 },
  { curve: arc(P.db, P.src2, -0.2), color: '#94a3b8', speed: 0.22 },
  { curve: arc(P.src1, P.warehouse, 0.2), color: DATA, speed: 0.3 },
  { curve: arc(P.src2, P.warehouse, 0.1), color: DATA, speed: 0.38 },
  { curve: arc(P.etl, P.warehouse, -0.2), color: DATA, speed: 0.33 },
]

function Route({ curve, color, speed, offset }) {
  const packet = useRef()
  const geometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(curve.getPoints(40)),
    [curve],
  )

  useFrame(({ clock }) => {
    if (!packet.current) return
    const t = (clock.elapsedTime * speed + offset) % 1
    packet.current.position.copy(curve.getPoint(t))
    packet.current.scale.setScalar(0.6 + Math.sin(t * Math.PI) * 0.6)
  })

  return (
    <>
      <line geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={0.35} />
      </line>
      <mesh ref={packet}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </>
  )
}

function Label({ children, position, color }) {
  return (
    <Html position={position} center distanceFactor={5.5} zIndexRange={[1, 0]} style={{ pointerEvents: 'none' }}>
      <span
        className="whitespace-nowrap rounded border bg-slate-950/70 px-1.5 py-0.5 font-mono text-[10px] tracking-wider backdrop-blur"
        style={{ color, borderColor: `${color}55` }}
      >
        {children}
      </span>
    </Html>
  )
}

function ServerRack() {
  return (
    <group position={P.api}>
      {[0.3, 0, -0.3].map((y, i) => (
        <RoundedBox key={y} args={[1.15, 0.22, 0.7]} radius={0.05} position={[0, y, 0]}>
          <meshStandardMaterial
            color="#0b1324"
            emissive={APP}
            emissiveIntensity={i === 1 ? 0.35 : 0.12}
            metalness={0.6}
            roughness={0.35}
          />
        </RoundedBox>
      ))}
      {[0.3, 0, -0.3].map((y) => (
        <mesh key={`led-${y}`} position={[0.42, y, 0.36]}>
          <boxGeometry args={[0.16, 0.035, 0.01]} />
          <meshBasicMaterial color={APP} toneMapped={false} />
        </mesh>
      ))}
      <Label position={[0, 0.62, 0]} color={APP}>
        node / express api
      </Label>
    </group>
  )
}

function Database() {
  return (
    <group position={P.db}>
      {[0.14, -0.1].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.2, 32]} />
          <meshStandardMaterial color="#0b1324" emissive={APP} emissiveIntensity={0.22} metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
      <Label position={[0, -0.48, 0]} color={APP}>
        mongodb · mysql
      </Label>
    </group>
  )
}

function Warehouse() {
  const inner = useRef()
  useFrame((_, delta) => {
    if (inner.current) inner.current.rotation.y += delta * 0.4
  })
  return (
    <group position={P.warehouse}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={DATA} transparent opacity={0.08} />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial color={DATA} transparent opacity={0.8} />
      </lineSegments>
      <mesh ref={inner}>
        <boxGeometry args={[0.42, 0.42, 0.42]} />
        <meshStandardMaterial color="#1e1036" emissive={DATA} emissiveIntensity={0.6} />
      </mesh>
      <Label position={[0, -0.8, 0]} color={DATA}>
        postgres warehouse
      </Label>
    </group>
  )
}

function PipelineNode({ position, label }) {
  return (
    <group position={position}>
      <mesh>
        <octahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial color="#1e1036" emissive={DATA} emissiveIntensity={0.7} flatShading />
      </mesh>
      {label && (
        <Label position={[0, 0.34, 0]} color={DATA}>
          {label}
        </Label>
      )}
    </group>
  )
}

function Client() {
  return (
    <group position={P.client}>
      <mesh>
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshStandardMaterial color="#0b1324" emissive={APP} emissiveIntensity={0.9} />
      </mesh>
      <Label position={[0, 0.34, 0]} color={APP}>
        react client
      </Label>
    </group>
  )
}

// Tracks the cursor across the whole window (not just the canvas) so the core leans toward it.
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
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, pointer.current.x * 0.35, 0.05)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, pointer.current.y * 0.18, 0.05)
  })
  return <group ref={group}>{children}</group>
}

export default function HeroCore({ active }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.4], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[-4, 2, 4]} intensity={30} color={APP} />
      <pointLight position={[4, -1, 4]} intensity={30} color={DATA} />
      <Rig>
        <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.35}>
          <Client />
          <ServerRack />
          <Database />
          <PipelineNode position={P.src1} label="python extract" />
          <PipelineNode position={P.src2} />
          <PipelineNode position={P.etl} label="airflow · dbt" />
          <Warehouse />
          {ROUTES.map((route, i) => (
            <Route key={i} {...route} offset={i * 0.17} />
          ))}
        </Float>
      </Rig>
    </Canvas>
  )
}
