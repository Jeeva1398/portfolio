import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Html, Lightformer, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import usePalette from './palette'

// Zig-zag the layers left → right so the flow reads like a request (or a batch) moving through the stack.
function layout(count) {
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1)
    return new THREE.Vector3(-3.3 + 6.6 * t, i % 2 === 0 ? -0.55 : 0.65, i % 2 === 0 ? 0.3 : -0.3)
  })
}

// Deterministic scatter: where each block floats before the stack assembles.
function scatter(i) {
  const r = (n) => {
    const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453
    return x - Math.floor(x)
  }
  return {
    position: new THREE.Vector3((r(1) - 0.5) * 7, (r(2) - 0.5) * 4.5, (r(3) - 0.5) * 3 - 1.5),
    rotation: new THREE.Euler(r(4) * 4, r(5) * 4, r(6) * 4),
  }
}

const easeOut = (t) => 1 - Math.pow(1 - t, 3)

// Scroll progress (a framer MotionValue, 0 → 1) smoothed per frame. Missing progress means "fully built".
function useBuilt(progress, start = 0, span = 1) {
  const built = useRef(0)
  return (delta) => {
    const target = THREE.MathUtils.clamp(((progress ? progress.get() : 1) - start) / span, 0, 1)
    built.current = THREE.MathUtils.damp(built.current, target, 5, delta)
    return easeOut(built.current)
  }
}

function Node({ layer, index, count, position, color, selected, onSelect, progress }) {
  const { appBody } = usePalette()
  const place = useRef()
  const mesh = useRef()
  const label = useRef()
  const loose = useMemo(() => scatter(index), [index])
  // Blocks fly in one after another, in flow order
  const build = useBuilt(progress, (index / count) * 0.45, 0.55)
  const [hovered, setHovered] = useState(false)
  const lift = selected ? 0.35 : hovered ? 0.15 : 0

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : ''
    return () => {
      document.body.style.cursor = ''
    }
  }, [hovered])

  useFrame((_, delta) => {
    const e = build(delta)
    const g = place.current
    if (g) {
      g.position.lerpVectors(loose.position, position, e)
      g.rotation.set(loose.rotation.x * (1 - e), loose.rotation.y * (1 - e), loose.rotation.z * (1 - e))
      g.scale.setScalar(0.35 + 0.65 * e)
    }
    if (label.current) label.current.style.opacity = String(THREE.MathUtils.clamp((e - 0.7) / 0.3, 0, 1))
    const m = mesh.current
    if (!m) return
    m.position.z = THREE.MathUtils.damp(m.position.z, lift, 6, delta)
    const s = THREE.MathUtils.damp(m.scale.x, selected ? 1.15 : 1, 6, delta)
    m.scale.setScalar(s)
    m.rotation.y = THREE.MathUtils.damp(m.rotation.y, selected ? 0.5 : 0.2, 4, delta)
  })

  const labelBelow = index % 2 === 0

  return (
    <group ref={place} position={loose.position}>
      <group ref={mesh}>
        <RoundedBox
          args={[0.7, 0.7, 0.7]}
          radius={0.1}
          onClick={(e) => {
            e.stopPropagation()
            onSelect(layer.id)
          }}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHovered(true)
          }}
          onPointerOut={() => setHovered(false)}
        >
          <meshPhysicalMaterial
            color={appBody}
            emissive={color}
            emissiveIntensity={selected ? 0.9 : hovered ? 0.5 : 0.18}
            metalness={0.3}
            roughness={0.28}
            clearcoat={1}
            clearcoatRoughness={0.15}
            iridescence={0.45}
            iridescenceIOR={1.3}
          />
        </RoundedBox>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.72, 0.72, 0.72)]} />
          <lineBasicMaterial color={color} transparent opacity={selected ? 0.95 : 0.4} />
        </lineSegments>
      </group>
      <Html
        position={[0, labelBelow ? -0.75 : 0.75, 0]}
        center
        distanceFactor={5.5}
        zIndexRange={[1, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <span
          ref={label}
          className="block whitespace-nowrap rounded-md border px-2 py-1 text-center font-mono text-[11px] backdrop-blur transition-colors"
          style={{
            color: selected ? 'var(--color-slate-50)' : color,
            borderColor: selected ? color : `${color}40`,
            background: selected ? `${color}30` : 'color-mix(in srgb, var(--color-ink) 70%, transparent)',
          }}
        >
          {String(index + 1).padStart(2, '0')}
          {(selected || hovered) && ` · ${layer.label}`}
        </span>
      </Html>
    </group>
  )
}

function Flow({ points, color, progress }) {
  const build = useBuilt(progress, 0.1, 0.9)
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.2), [points])
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(curve.getPoints(120)), [curve])
  const packets = useRef([])

  useFrame(({ clock }, delta) => {
    // The line draws itself as the stack assembles; packets only start once it is complete
    const e = build(delta)
    geometry.setDrawRange(0, Math.floor(e * 121))
    packets.current.forEach((p, i) => {
      if (!p) return
      p.visible = e > 0.95
      const t = (clock.elapsedTime * 0.08 + i / 4) % 1
      p.position.copy(curve.getPointAt(t))
    })
  })

  return (
    <>
      <line geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={0.3} />
      </line>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} ref={(el) => (packets.current[i] = el)}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      ))}
    </>
  )
}

// Follows the pointer, and swings round into place while the stack assembles.
function Rig({ children, progress }) {
  const group = useRef()
  const build = useBuilt(progress)
  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const e = build(delta)
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.12 + (1 - e) * 0.6, 3, delta)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.12 - state.pointer.y * 0.08, 3, delta)
  })
  return <group ref={group}>{children}</group>
}

export default function ArchitectureScene({ layers, color, selectedId, onSelect, active, progress }) {
  const points = useMemo(() => layout(layers.length), [layers.length])

  return (
    <Canvas
      camera={{ position: [0, 0.4, 7.5], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? 'always' : 'never'}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 3, 5]} intensity={35} color={color} />
      {/* Local light rig for the clearcoat reflections - rendered once, nothing fetched */}
      <Environment frames={1} resolution={64}>
        <Lightformer intensity={2} position={[0, 4, 3]} scale={[8, 2, 1]} />
        <Lightformer intensity={1.5} color={color} position={[-5, 0, 2]} scale={[2, 5, 1]} />
        <Lightformer intensity={0.8} position={[5, -1, 2]} scale={[2, 4, 1]} />
      </Environment>
      <Rig progress={progress}>
        <Flow points={points} color={color} progress={progress} />
        {layers.map((layer, i) => (
          <Node
            key={layer.id}
            layer={layer}
            index={i}
            count={layers.length}
            position={points[i]}
            color={color}
            selected={layer.id === selectedId}
            onSelect={onSelect}
            progress={progress}
          />
        ))}
      </Rig>
    </Canvas>
  )
}
