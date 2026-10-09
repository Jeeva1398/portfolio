import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

// Headline words rise out of a mask one after another. Screen readers get the plain
// text from aria-label; the split words are hidden from them.
export function RevealWords({ as = 'h2', text, className = '', id, delay = 0 }) {
  const Component = motion[as] ?? motion.h2
  const words = text.split(' ')
  return (
    <Component
      id={id}
      aria-label={text}
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: 0.045, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: '105%' }, shown: { y: '0%' } }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {word}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </Component>
  )
}

// A list whose items come in one after another once the list scrolls into view.
export function Stagger({ as = 'ul', children, className = '', gap = 0.06, delay = 0 }) {
  const Component = motion[as] ?? motion.ul
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: gap, delayChildren: delay }}
    >
      {children}
    </Component>
  )
}

export function StaggerItem({ as = 'li', children, className = '', x = 0, y = 12 }) {
  const Component = motion[as] ?? motion.li
  return (
    <Component
      className={className}
      variants={{ hidden: { opacity: 0, x, y }, shown: { opacity: 1, x: 0, y: 0 } }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </Component>
  )
}

// The short accent dash in front of list items draws itself in.
export function Dash({ className = 'bg-accent' }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`mt-[0.7em] h-px w-3 shrink-0 origin-left ${className}`}
      variants={{ hidden: { scaleX: 0 }, shown: { scaleX: 1 } }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
    />
  )
}

// Thin accent line along the top edge showing how far down the page you are.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
    />
  )
}

// A panel that leans toward the mouse, so it reads as an object with depth rather than a box of
// text. Children marked with a translateZ class float above its surface. Mouse only: touch and
// reduced motion get a flat panel.
export function Tilt({ children, className = '', wrapperClassName = '', max = 7 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 160, damping: 20, mass: 0.5 })
  const sy = useSpring(py, { stiffness: 160, damping: 20, mass: 0.5 })
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])

  const move = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div className={`[perspective:1200px] ${wrapperClassName}`}>
      <motion.div
        ref={ref}
        onPointerMove={move}
        onPointerLeave={reset}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Comes in tipped back and stands up as it enters, like a card being set upright on the table.
export function Rise3D({ as = 'div', children, className = '', delay = 0, tilt = 14 }) {
  const Component = motion[as] ?? motion.div
  return (
    <Component
      className={className}
      style={{ transformPerspective: 1400, transformOrigin: '50% 100%' }}
      initial={{ opacity: 0, rotateX: tilt, y: 48 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 70, damping: 18, delay }}
    >
      {children}
    </Component>
  )
}
