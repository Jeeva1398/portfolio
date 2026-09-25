import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

// Pointer-driven 3D tilt with a soft glare. Inert for touch and reduced motion.
export default function Tilt({ children, className = '', max = 6, glare = 'rgb(34 211 238 / 0.10)' }) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 180, damping: 18, mass: 0.4 }
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring)
  const glareX = useTransform(px, (v) => `${v * 100}%`)
  const glareY = useTransform(py, (v) => `${v * 100}%`)
  const background = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(420px circle at ${x} ${y}, ${glare}, transparent 60%)`,
  )

  if (reduce) return <div className={className}>{children}</div>

  const handleMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`relative h-full ${className}`}
      >
        <motion.div
          aria-hidden="true"
          style={{ background }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {children}
      </motion.div>
    </div>
  )
}
