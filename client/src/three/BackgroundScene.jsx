import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import usePalette from './palette'

function buildNetwork(count, maxDist, maxLinks) {
  const positions = new Float32Array(count * 3)
  const tones = []
  for (let i = 0; i < count; i++) {
    const radius = 6 + Math.random() * 10
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const x = radius * Math.sin(phi) * Math.cos(theta)
    positions.set([x, radius * Math.sin(phi) * Math.sin(theta) * 0.6, radius * Math.cos(phi)], i * 3)
    // Left half leans cyan (app), right half violet (data), with neutral nodes mixed in.
    tones.push(i % 5 === 0 ? 'neutral' : x < 0 ? 'app' : 'data')
  }

  const links = []
  for (let i = 0; i < count && links.length / 6 < maxLinks; i++) {
    for (let j = i + 1; j < count && links.length / 6 < maxLinks; j++) {
      const dx = positions[i * 3] - positions[j * 3]
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
      if (dx * dx + dy * dy + dz * dz < maxDist * maxDist) {
        links.push(...positions.slice(i * 3, i * 3 + 3), ...positions.slice(j * 3, j * 3 + 3))
      }
    }
  }
  return { positions, tones, links: new Float32Array(links) }
}

// Soft round sprite so particles render as dots rather than squares.
function useDotTexture() {
  return useMemo(() => {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.45, 'rgba(255,255,255,0.9)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    return new THREE.CanvasTexture(canvas)
  }, [])
}

function Network({ count }) {
  const dot = useDotTexture()
  const group = useRef()
  const scroll = useRef(0)
  const palette = usePalette()
  const { positions, tones, links } = useMemo(() => buildNetwork(count, 2.8, count), [count])
  const colors = useMemo(() => {
    const out = new Float32Array(tones.length * 3)
    tones.forEach((tone, i) => {
      const c = new THREE.Color(palette[tone])
      out.set([c.r, c.g, c.b], i * 3)
    })
    return out
  }, [tones, palette])

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const doc = document.documentElement
    const max = doc.scrollHeight - doc.clientHeight
    scroll.current = max > 0 ? doc.scrollTop / max : 0
    g.rotation.y += delta * 0.03
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.1 + state.pointer.y * 0.08 + scroll.current * 0.3, 0.03)
    g.position.x = THREE.MathUtils.lerp(g.position.x, state.pointer.x * 0.4, 0.03)
    state.camera.position.z = 14 - scroll.current * 3
  })

  return (
    <group ref={group} rotation={[0.1, 0.35, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute key={palette.app} attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial map={dot} alphaTest={0.01} size={0.12} vertexColors transparent opacity={0.8} sizeAttenuation depthWrite={false} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[links, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={palette.link} transparent opacity={palette.linkOpacity} depthWrite={false} />
      </lineSegments>
    </group>
  )
}

export default function BackgroundScene({ reducedMotion, isMobile }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        frameloop={reducedMotion ? 'demand' : 'always'}
        eventSource={document.body}
        eventPrefix="client"
      >
        <Network count={isMobile ? 60 : 130} />
      </Canvas>
    </div>
  )
}
