import { Suspense, useLayoutEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, RoundedBox, Text } from '@react-three/drei'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import geistFont from '@fontsource/geist/files/geist-latin-600-normal.woff?url'
import useTheme from '../hooks/useTheme'
import { hubLayout, toolIcons } from './toolIcons'

// Matte clay per theme, one accent. The lit cable segment is a slightly fatter accent tube that
// slides along the cable: it reads as light moving through it without any bloom.
const MATERIALS = {
  dark: {
    hub: '#1c1c20', plate: '#2c2c32', block: '#34343b', pipe: '#4a4a52', icon: '#e4e4e8',
    text: '#ededeb', hubText: '#ededeb', accent: '#ec6a3c', shadow: '#000000', shadowOpacity: 0.55, iconGlow: 0.25,
  },
  light: {
    hub: '#2a2a30', plate: '#3a3a42', block: '#fbfbfc', pipe: '#d4d4da', icon: '#3f3f46',
    text: '#18181b', hubText: '#f1f1f3', accent: '#c2410c', shadow: '#2a2a3a', shadowOpacity: 0.22, iconGlow: 0,
  },
}

// Assembly timeline, in seconds from the moment the hero first comes on screen.
const T = { hub: 0, plates: 0.55, cards: 0.75, tiles: 1.15, pipes: 1.85, flow: 2.7, camera: 2.6 }

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const progress = (t, start, duration) => clamp01((t - start) / duration)
const easeOutCubic = (p) => 1 - (1 - p) ** 3
const easeOutBack = (p) => 1 + 2.70158 * (p - 1) ** 3 + 1.70158 * (p - 1) ** 2
function easeOutBounce(p) {
  const n = 7.5625
  const d = 2.75
  if (p < 1 / d) return n * p * p
  if (p < 2 / d) return n * (p -= 1.5 / d) * p + 0.75
  if (p < 2.5 / d) return n * (p -= 2.25 / d) * p + 0.9375
  return n * (p -= 2.625 / d) * p + 0.984375
}

// Pop-in used by cards and tiles: scale up with overshoot while dropping a little.
function pop(obj, p, lift = 0.6) {
  const s = Math.max(0.0001, easeOutBack(p))
  obj.scale.setScalar(s)
  obj.visible = p > 0
  return (1 - easeOutCubic(p)) * lift
}

function iconGeometry(icon, size) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${icon.path}"/></svg>`
  const shapes = new SVGLoader().parse(svg).paths.flatMap((p) => SVGLoader.createShapes(p))
  const geometry = new THREE.ShapeGeometry(shapes, 6)
  const s = size / 24
  // SVG y points down; flip it, centre the 24x24 box, and lay it flat facing up.
  geometry.translate(-12, -12, 0)
  geometry.scale(s, -s, s)
  geometry.rotateX(-Math.PI / 2)
  return geometry
}

const BLOCK_H = 0.22
const TILE = 0.66

function Tile({ tile, palette, active, timeRef, onHover }) {
  const group = useRef()
  const iconMat = useRef()
  const geometry = useMemo(() => iconGeometry(toolIcons[tile.name], 0.36), [tile.name])
  useLayoutEffect(() => () => geometry.dispose(), [geometry])
  const start = T.tiles + tile.col * 0.07 + tile.row * 0.11

  useFrame((_, delta) => {
    const g = group.current
    const drop = pop(g, progress(timeRef.current, start, 0.5))
    const lift = THREE.MathUtils.damp(g.userData.lift ?? 0, active ? 0.12 : 0, 8, delta)
    g.userData.lift = lift
    g.position.y = drop + lift
    const k = THREE.MathUtils.damp(iconMat.current.userData.k ?? 0, active ? 1 : 0, 6, delta)
    iconMat.current.userData.k = k
    iconMat.current.color.lerpColors(palette.iconColor, palette.accentColor, k)
    iconMat.current.emissive.copy(iconMat.current.color)
  })

  return (
    <group
      ref={group}
      position={[tile.x, 0, tile.z]}
      visible={false}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover(tile.unit)
      }}
    >
      <RoundedBox args={[TILE, BLOCK_H, TILE]} radius={0.07} smoothness={4} position={[0, BLOCK_H / 2, 0]} castShadow>
        <meshStandardMaterial color={palette.block} roughness={0.55} />
      </RoundedBox>
      <mesh geometry={geometry} position={[0, BLOCK_H + 0.003, 0]}>
        <meshStandardMaterial
          ref={iconMat}
          color={palette.icon}
          emissive={palette.icon}
          emissiveIntensity={palette.iconGlow}
          roughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

function Card({ card, unit, palette, active, timeRef, onHover }) {
  const group = useRef()
  const bar = useRef()
  const start = T.cards + card.unit * 0.14

  useFrame((_, delta) => {
    const g = group.current
    const drop = pop(g, progress(timeRef.current, start, 0.55), 0.8)
    const lift = THREE.MathUtils.damp(g.userData.lift ?? 0, active ? 0.2 : 0, 7, delta)
    g.userData.lift = lift
    g.position.y = drop + lift
    const k = THREE.MathUtils.damp(bar.current.scale.x, active ? 1 : 0.0001, 9, delta)
    bar.current.scale.x = k
  })

  return (
    <group
      ref={group}
      position={[card.x, 0, card.z]}
      visible={false}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover(card.unit)
      }}
    >
      <RoundedBox args={[1.9, BLOCK_H, 0.82]} radius={0.08} smoothness={4} position={[0, BLOCK_H / 2, 0]} castShadow>
        <meshStandardMaterial color={palette.block} roughness={0.55} />
      </RoundedBox>
      <Suspense fallback={null}>
        <Text
          font={geistFont}
          characters="ApplicationID"
          fontSize={0.2}
          letterSpacing={-0.02}
          color={palette.text}
          anchorX="left"
          anchorY="middle"
          position={[-0.76, BLOCK_H + 0.004, -0.06]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          {unit.label}
        </Text>
      </Suspense>
      {/* accent bar along the front edge, drawn out when this layer is the active one */}
      <mesh ref={bar} position={[0, BLOCK_H + 0.004, 0.24]} scale={[0.0001, 1, 1]}>
        <boxGeometry args={[1.52, 0.012, 0.05]} />
        <meshStandardMaterial color={palette.accent} emissive={palette.accent} emissiveIntensity={0.35} />
      </mesh>
    </group>
  )
}

// The core: a graphite puck with three plates (application, AI, data). It lands with a bounce and
// the plates arrive pulled apart, then settle: the exploded-layer move from the Finx shot.
function Core({ units, palette, activeIndex, timeRef }) {
  const group = useRef()
  const plates = useRef([])

  useFrame((_, delta) => {
    const t = timeRef.current
    const g = group.current
    const p = progress(t, T.hub, 0.85)
    g.visible = p > 0
    g.position.y = (1 - easeOutBounce(p)) * 3.2
    const settle = easeOutCubic(progress(t, T.plates, 0.9))
    plates.current.forEach((plate, i) => {
      if (!plate) return
      // plate 0 sits on top; index from the bottom for stacking
      const fromBottom = units.length - 1 - i
      const rest = 0.36 + fromBottom * 0.085
      const spread = (1 - settle) * (0.5 + fromBottom * 0.35)
      const lift = THREE.MathUtils.damp(plate.userData.lift ?? 0, i === activeIndex ? 0.07 : 0, 8, delta)
      plate.userData.lift = lift
      plate.position.y = rest + spread + lift
      const mat = plate.children[0].material
      const k = THREE.MathUtils.damp(mat.userData.k ?? 0, i === activeIndex ? 1 : 0, 6, delta)
      mat.userData.k = k
      mat.color.lerpColors(palette.plateColor, palette.accentColor, k * 0.5)
    })
  })

  return (
    <group ref={group} visible={false}>
      <mesh position={[0, 0.17, 0]} castShadow>
        <cylinderGeometry args={[0.98, 1.02, 0.34, 64]} />
        <meshStandardMaterial color={palette.hub} roughness={0.45} metalness={0.15} />
      </mesh>
      {/* accent ring set into the top rim of the puck */}
      <mesh position={[0, 0.341, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.84, 0.9, 64]} />
        <meshStandardMaterial color={palette.accent} emissive={palette.accent} emissiveIntensity={0.3} />
      </mesh>
      {units.map((unit, i) => (
        <group key={unit.id} ref={(el) => (plates.current[i] = el)}>
          <mesh castShadow>
            <cylinderGeometry args={[0.72, 0.72, 0.06, 64]} />
            <meshStandardMaterial color={palette.plate} roughness={0.5} />
          </mesh>
          {i === 0 && (
            <Suspense fallback={null}>
              <Text
                font={geistFont}
                characters="JM"
                fontSize={0.36}
                letterSpacing={-0.04}
                color={palette.hubText}
                anchorX="center"
                anchorY="middle"
                position={[0, 0.032, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                JM
              </Text>
            </Suspense>
          )}
        </group>
      ))}
    </group>
  )
}

const SEGMENTS = 72
const RADIAL = 8
const RING = RADIAL * 6 // indices per tubular segment
const PULSE = 22 // lit segment length, in tubular segments

// One cable: grows out of the core during assembly, then carries a lit segment while its layer is
// active. `reverse` cables are drawn from the far end, so tools flow into the core and the core
// flows out to the layer cards.
function Cable({ points, reverse, delay, active, palette, timeRef }) {
  const cable = useRef()
  const pulse = useRef()
  const { tube, lit } = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)), false, 'centripetal')
    return {
      tube: new THREE.TubeGeometry(curve, SEGMENTS, 0.045, RADIAL, false),
      lit: new THREE.TubeGeometry(curve, SEGMENTS, 0.062, RADIAL, false),
    }
  }, [points])
  useLayoutEffect(
    () => () => {
      tube.dispose()
      lit.dispose()
    },
    [tube, lit],
  )

  useFrame((_, delta) => {
    const t = timeRef.current
    // growth always starts at the core end
    const grown = Math.ceil(easeOutCubic(progress(t, T.pipes + delay, 0.7)) * SEGMENTS)
    cable.current.visible = grown > 0
    if (reverse) tube.setDrawRange((SEGMENTS - grown) * RING, grown * RING)
    else tube.setDrawRange(0, grown * RING)

    // the lit segment eases in and out with its layer
    const m = pulse.current
    const k = THREE.MathUtils.damp(m.userData.k ?? 0, active && t > T.flow ? 1 : 0, 5, delta)
    m.userData.k = k
    m.visible = k > 0.02
    if (!m.visible) return
    const phase = ((t - T.flow) * 0.62 + delay * 1.7) % 1
    const head = Math.floor(phase * (SEGMENTS + PULSE))
    const from = Math.max(0, head - PULSE)
    const to = Math.min(SEGMENTS, head)
    // tools -> core: travel from the far end toward the core
    const start = reverse ? SEGMENTS - to : from
    lit.setDrawRange(start * RING, Math.max(0, to - from) * RING)
  })

  return (
    <group>
      <mesh ref={cable} geometry={tube} castShadow visible={false}>
        <meshStandardMaterial color={palette.pipe} roughness={0.6} />
      </mesh>
      <mesh ref={pulse} geometry={lit} visible={false}>
        <meshStandardMaterial color={palette.accent} emissive={palette.accent} emissiveIntensity={0.45} roughness={0.4} />
      </mesh>
    </group>
  )
}

// Slow pull-back while the scene assembles (the Finx camera move), then a small pointer parallax.
function Rig({ timeRef, children }) {
  const group = useRef()
  const { camera } = useThree()
  const base = useMemo(() => new THREE.Vector3(3.6, 10, 11.6), [])
  const target = useMemo(() => new THREE.Vector3(0.1, -0.3, 0.2), [])

  useFrame((state, delta) => {
    const p = easeOutCubic(progress(timeRef.current, 0, T.camera))
    camera.position.copy(base).multiplyScalar(0.72 + 0.2 * p)
    camera.lookAt(target)
    const g = group.current
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, state.pointer.x * 0.07, 3, delta)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -state.pointer.y * 0.035, 3, delta)
  })

  return <group ref={group}>{children}</group>
}

function Hub({ units, activeIndex, onHover, palette }) {
  // Scene time only advances while the canvas renders, so the assembly waits for the hero to be
  // on screen and does not jump ahead after the tab was hidden.
  const timeRef = useRef(-0.25)
  useFrame((_, delta) => {
    timeRef.current += Math.min(delta, 1 / 20)
  })

  const { cards, tiles, columns } = useMemo(() => hubLayout(units), [units])
  const cables = useMemo(() => {
    const y = 0.07
    const toCards = cards.map((card, i) => ({
      key: `card-${i}`,
      unit: card.unit,
      reverse: false,
      delay: i * 0.08,
      points: [
        [card.x * 0.28, y, -0.7],
        [card.x * 0.32, y, -1.25],
        [card.x * 0.85, y, -1.45],
        [card.x, y, card.z + 0.38],
      ],
    }))
    const fromTools = columns.map((col, i) => ({
      key: `col-${i}`,
      unit: col.unit,
      reverse: true,
      delay: 0.2 + i * 0.06,
      points: [
        [col.x * 0.24, y, 0.7],
        [col.x * 0.3, y, 1.15],
        [col.x * 0.9, y, 1.38],
        [col.x, y, 2.0 - TILE / 2 + 0.02],
      ],
    }))
    return [...toCards, ...fromTools]
  }, [cards, columns])

  return (
    <Rig timeRef={timeRef}>
      <Core units={units} palette={palette} activeIndex={activeIndex} timeRef={timeRef} />
      {cables.map((c) => (
        <Cable key={c.key} points={c.points} reverse={c.reverse} delay={c.delay} active={c.unit === activeIndex} palette={palette} timeRef={timeRef} />
      ))}
      {cards.map((card) => (
        <Card
          key={card.unit}
          card={card}
          unit={units[card.unit]}
          palette={palette}
          active={card.unit === activeIndex}
          timeRef={timeRef}
          onHover={onHover}
        />
      ))}
      {tiles.map((tile) => (
        <Tile
          key={tile.name}
          tile={tile}
          palette={palette}
          active={tile.unit === activeIndex}
          timeRef={timeRef}
          onHover={onHover}
        />
      ))}
    </Rig>
  )
}

export default function HubScene({ units, activeIndex, onHover, onLeave, active }) {
  const { theme } = useTheme()
  const palette = useMemo(() => {
    const p = MATERIALS[theme]
    return {
      ...p,
      iconColor: new THREE.Color(p.icon),
      accentColor: new THREE.Color(p.accent),
      plateColor: new THREE.Color(p.plate),
    }
  }, [theme])
  const camera = useMemo(() => ({ position: [3.6, 10, 11.6], fov: 30 }), [])

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={camera}
      shadows="variance"
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      onPointerLeave={onLeave}
    >
      <ambientLight intensity={theme === 'light' ? 0.7 : 0.6} />
      {/* window light from the back right, so shadows fall forward-left like the studio renders */}
      <directionalLight
        position={[5, 10, -3.5]}
        intensity={theme === 'light' ? 1.6 : 1.9}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-radius={10}
        shadow-blurSamples={16}
        shadow-bias={-0.0005}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-camera-near={1}
        shadow-camera-far={30}
      />
      <directionalLight position={[-6, 4, 6]} intensity={0.35} />
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={1.6} position={[0, 6, 2]} rotation-x={Math.PI / 2} scale={[12, 6, 1]} />
        <Lightformer intensity={0.6} position={[-7, 2, 3]} rotation-y={Math.PI / 2} scale={[10, 3, 1]} />
      </Environment>
      <Hub units={units} activeIndex={activeIndex} onHover={onHover} palette={palette} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <shadowMaterial color={palette.shadow} opacity={palette.shadowOpacity} />
      </mesh>
    </Canvas>
  )
}
