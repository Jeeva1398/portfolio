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
    // Left half leans cyan (app), right half violet (data), with AI-pink and neutral nodes mixed in.
    tones.push(i % 5 === 0 ? 'neutral' : i % 7 === 0 ? 'ai' : x < 0 ? 'app' : 'data')
  }

  // Each link stores its two endpoints, a 0 -> 1 progress value per end, a random seed, and
  // the tone of its start node, so the shader can run a pulse along it in that colour.
  const links = []
  const progress = []
  const seeds = []
  const linkTones = []
  for (let i = 0; i < count && links.length / 6 < maxLinks; i++) {
    for (let j = i + 1; j < count && links.length / 6 < maxLinks; j++) {
      const dx = positions[i * 3] - positions[j * 3]
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
      if (dx * dx + dy * dy + dz * dz < maxDist * maxDist) {
        links.push(...positions.slice(i * 3, i * 3 + 3), ...positions.slice(j * 3, j * 3 + 3))
        const seed = Math.random()
        progress.push(0, 1)
        seeds.push(seed, seed)
        linkTones.push(tones[i], tones[i])
      }
    }
  }
  return {
    positions,
    tones,
    links: new Float32Array(links),
    progress: new Float32Array(progress),
    seeds: new Float32Array(seeds),
    linkTones,
  }
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

const pulseVertex = /* glsl */ `
  attribute float aProgress;
  attribute float aSeed;
  attribute vec3 aColor;
  varying float vProgress;
  varying float vSeed;
  varying vec3 vColor;
  void main() {
    vProgress = aProgress;
    vSeed = aSeed;
    vColor = aColor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Faint base line everywhere; about a third of the links carry a travelling pulse.
const pulseFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uBase;
  uniform float uBaseOpacity;
  varying float vProgress;
  varying float vSeed;
  varying vec3 vColor;
  void main() {
    float carries = step(0.66, vSeed);
    float head = fract(uTime * (0.12 + vSeed * 0.18) + vSeed * 7.0);
    float d = vProgress - head;
    float pulse = carries * smoothstep(-0.18, 0.0, d) * (1.0 - smoothstep(0.0, 0.02, d));
    vec3 color = mix(uBase, vColor, pulse);
    gl_FragColor = vec4(color, uBaseOpacity + pulse * 0.75);
  }
`

function Network({ count }) {
  const dot = useDotTexture()
  const group = useRef()
  const scroll = useRef(0)
  const palette = usePalette()
  const { positions, tones, links, progress, seeds, linkTones } = useMemo(() => buildNetwork(count, 2.8, count), [count])
  const colors = useMemo(() => {
    const out = new Float32Array(tones.length * 3)
    tones.forEach((tone, i) => {
      const c = new THREE.Color(palette[tone])
      out.set([c.r, c.g, c.b], i * 3)
    })
    return out
  }, [tones, palette])
  const linkColors = useMemo(() => {
    const out = new Float32Array(linkTones.length * 3)
    linkTones.forEach((tone, i) => {
      const c = new THREE.Color(palette[tone])
      out.set([c.r, c.g, c.b], i * 3)
    })
    return out
  }, [linkTones, palette])
  const pulse = useRef()
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uBase: { value: new THREE.Color() }, uBaseOpacity: { value: 0 } }),
    [],
  )

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const doc = document.documentElement
    const max = doc.scrollHeight - doc.clientHeight
    scroll.current = max > 0 ? doc.scrollTop / max : 0
    const u = pulse.current?.uniforms
    if (u) {
      u.uTime.value = state.clock.elapsedTime
      u.uBase.value.set(palette.link)
      u.uBaseOpacity.value = palette.linkOpacity
    }
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
          <bufferAttribute attach="attributes-aProgress" args={[progress, 1]} />
          <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
          <bufferAttribute key={palette.app} attach="attributes-aColor" args={[linkColors, 3]} />
        </bufferGeometry>
        <shaderMaterial
          ref={pulse}
          vertexShader={pulseVertex}
          fragmentShader={pulseFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={palette.glow < 1 ? THREE.NormalBlending : THREE.AdditiveBlending}
        />
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
