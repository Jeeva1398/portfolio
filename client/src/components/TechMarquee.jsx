import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'

const DOT = { app: 'bg-app', data: 'bg-data', ai: 'bg-ai', tools: 'bg-slate-400' }

// One endless row of skill chips. It drifts on its own and speeds up while the page is scrolled fast.
function Row({ items, direction, boost, active }) {
  const x = useMotionValue(0)
  const track = useRef(null)

  useAnimationFrame((_, delta) => {
    if (!active || !track.current) return
    const half = track.current.scrollWidth / 2
    let next = x.get() + direction * 32 * boost.get() * (delta / 1000)
    if (next <= -half) next += half
    if (next > 0) next -= half
    x.set(next)
  })

  return (
    <motion.ul ref={track} style={{ x }} className="flex w-max gap-3">
      {[...items, ...items].map((item, i) => (
        <li
          key={i}
          className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-slate-300"
        >
          <span className={`h-1.5 w-1.5 rounded-full ${DOT[item.track] ?? DOT.tools}`} />
          {item.label}
        </li>
      ))}
    </motion.ul>
  )
}

// Decorative: every chip here is also listed in the skill cards below, so it is hidden from screen readers.
export default function TechMarquee({ rows }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const boost = useSpring(useTransform(velocity, [-2500, 0, 2500], [6, 1, 6]), { damping: 40, stiffness: 200 })

  if (reduce) return null

  return (
    <div ref={ref} aria-hidden="true" className="marquee-mask space-y-3 overflow-hidden py-1">
      {rows.map((items, i) => (
        <Row key={i} items={items} direction={i % 2 === 0 ? -1 : 1} boost={boost} active={inView} />
      ))}
    </div>
  )
}
