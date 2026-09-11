import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ACCENTS = [
  [99, 102, 241], // indigo-500
  [34, 211, 238], // cyan-400
  [245, 158, 11], // amber-500
]

function buildPoints(count) {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const color = new THREE.Color()

  for (let i = 0; i < count; i++) {
    const radius = 6 + Math.random() * 10
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6
    positions[i * 3 + 2] = radius * Math.cos(phi)

    const [r, g, b] = ACCENTS[i % ACCENTS.length]
    color.setRGB(r / 255, g / 255, b / 255)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  return { positions, colors }
}

function buildLinks(positions, count, maxDist, maxLinks) {
  const linked = []
  let linkCount = 0
  for (let i = 0; i < count && linkCount < maxLinks; i++) {
    for (let j = i + 1; j < count && linkCount < maxLinks; j++) {
      const dx = positions[i * 3] - positions[j * 3]
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
      if (dist < maxDist) {
        linked.push(
          positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
          positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2],
        )
        linkCount++
      }
    }
  }
  return new Float32Array(linked)
}

export default function Scene3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isSmallScreen = window.innerWidth < 768
    const pointCount = isSmallScreen ? 70 : 140

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.z = 14

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const { positions, colors } = buildPoints(pointCount)

    const pointsGeometry = new THREE.BufferGeometry()
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(pointsGeometry, pointsMaterial)
    group.add(points)

    const linkPositions = buildLinks(positions, pointCount, 2.8, isSmallScreen ? 60 : 140)
    const linksGeometry = new THREE.BufferGeometry()
    linksGeometry.setAttribute('position', new THREE.BufferAttribute(linkPositions, 3))
    const linksMaterial = new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.18 })
    const links = new THREE.LineSegments(linksGeometry, linksMaterial)
    group.add(links)

    const pointer = { x: 0, y: 0 }
    const targetRotation = { x: 0, y: 0 }
    let scrollProgress = 0

    const handlePointerMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1
    }

    const handleScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      scrollProgress = max > 0 ? doc.scrollTop / max : 0
    }

    const handleResize = () => {
      const width = mount.clientWidth
      const height = mount.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    let frameId
    const clock = new THREE.Clock()

    const renderStatic = () => {
      group.rotation.y = 0.35
      group.rotation.x = 0.08
      renderer.render(scene, camera)
    }

    let baseRotationY = 0

    const animate = () => {
      const delta = clock.getDelta()
      targetRotation.y += (pointer.x * 0.4 - targetRotation.y) * 0.02
      targetRotation.x += (pointer.y * 0.2 - targetRotation.x) * 0.02
      baseRotationY += delta * 0.04

      group.rotation.y = baseRotationY + targetRotation.y
      group.rotation.x = 0.1 + targetRotation.x * 0.3 + scrollProgress * 0.3
      camera.position.z = 14 - scrollProgress * 3

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }

    if (prefersReducedMotion) {
      renderStatic()
    } else {
      animate()
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      pointsGeometry.dispose()
      pointsMaterial.dispose()
      linksGeometry.dispose()
      linksMaterial.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full"
    />
  )
}
