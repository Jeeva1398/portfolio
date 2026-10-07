import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// A soft glow that trails the mouse across the page. Mouse only, off for reduced motion.
export default function Spotlight() {
  const [on, setOn] = useState(false)
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const sx = useSpring(x, { stiffness: 120, damping: 24, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 120, damping: 24, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setOn(true)
    }
    const leave = () => setOn(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [x, y])

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className={`pointer-events-none fixed left-0 top-0 -z-10 -ml-72 -mt-72 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgb(34_211_238/0.09),rgb(167_139_250/0.05)_40%,transparent_70%)] transition-opacity duration-500 ${
        on ? 'opacity-100' : 'opacity-0'
      }`}
    />
  )
}
