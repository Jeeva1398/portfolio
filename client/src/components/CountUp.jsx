import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

// Counts the number inside a stat ("~155") up from zero when it first comes into view.
// Small numbers ("3", "~3 yrs") are left as they are; counting to three adds nothing.
export default function CountUp({ value }) {
  const match = /^(\D*)(\d+)(.*)$/.exec(value)
  const target = match ? Number(match[2]) : 0
  const reduce = useReducedMotion()
  const counts = Boolean(match) && target >= 10 && !reduce
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' })
  const [n, setN] = useState(counts ? 0 : target)

  useEffect(() => {
    if (!counts || !inView) return
    const controls = animate(0, target, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [counts, inView, target])

  if (!counts) return value

  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {match[1]}
        {n}
        {match[3]}
      </span>
    </span>
  )
}
