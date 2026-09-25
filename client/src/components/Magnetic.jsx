import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

// Wraps a CTA so it drifts slightly toward the cursor.
export default function Magnetic({ children, strength = 0.25 }) {
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 })
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 })

  if (reduce) return children

  const handleMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span className="inline-flex" style={{ x, y }} onPointerMove={handleMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  )
}
