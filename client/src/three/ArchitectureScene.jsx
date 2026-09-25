import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

// Zig-zag the layers left → right so the flow reads like a request (or a batch) moving through the stack.
function layout(count) {
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1)
    return new THREE.Vector3(-3.3 + 6.6 * t, i % 2 === 0 ? -0.55 : 0.65, i % 2 === 0 ? 0.3 : -0.3)
  })
}

function Node({ layer, index, position, color, selected, onSelect }) {
  const mesh = useRef()
  const [hovered, setHovered] = useState(false)
  const lift = selected ? 0.35 : hovered ? 0.15 : 0

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : ''
    return () => {
      document.body.style.cursor = ''
    }
  }, [hovered])

  useFrame((_, delta) => {
    const m = mesh.current
    if (!m) return
    m.position.z = THREE.MathUtils.damp(m.position.z, lift, 6, delta)
    const s = THREE.MathUtils.damp(m.scale.x, selected ? 1.15 : 1, 6, delta)
    m.scale.setScalar(s)
    m.rotation.y = THREE.MathUtils.damp(m.rotation.y, selected ? 0.5 : 0.2, 4, delta)
  })

  const labelBelow = index % 2 === 0

  return (
    <group position={position}>
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
          <meshStandardMaterial
            color="#0b1324"
            emissive={color}
            emissiveIntensity={selected ? 0.9 : hovered ? 0.5 : 0.18}
            metalness={0.5}
            roughness={0.35}
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
          className="block whitespace-nowrap rounded-md border px-2 py-1 text-center font-mono text-[11px] backdrop-blur transition-colors"
          style={{
            color: selected ? '#f8fafc' : color,
            borderColor: selected ? color : `${color}40`,
            background: selected ? `${color}30` : 'rgb(4 6 12 / 0.7)',
          }}
        >
          {String(index + 1).padStart(2, '0')}
          {(selected || hovered) && ` · ${layer.label}`}
        </span>
      </Html>
    </group>
  )
}

function Flow({ points, color }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.2), [points])
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(curve.getPoints(120)), [curve])
  const packets = useRef([])

  useFrame(({ clock }) => {
    packets.current.forEach((p, i) => {
      if (!p) return
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

function Rig({ children }) {
  const group = useRef()
  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.12, 3, delta)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, 0.12 - state.pointer.y * 0.08, 3, delta)
  })
  return <group ref={group}>{children}</group>
}

export default function ArchitectureScene({ layers, color, selectedId, onSelect, active }) {
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
      <Rig>
        <Flow points={points} color={color} />
        {layers.map((layer, i) => (
          <Node
            key={layer.id}
            layer={layer}
            index={i}
            position={points[i]}
            color={color}
            selected={layer.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </Rig>
    </Canvas>
  )
}
