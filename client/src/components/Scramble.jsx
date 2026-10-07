import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

const CHARS = '01/<>{}#*_$'

// Short mono labels decode from random characters the first time they scroll into view.
export default function Scramble({ text, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' })
  const reduce = useReducedMotion()
  const [output, setOutput] = useState(text)

  useEffect(() => {
    if (!inView || reduce) return
    const duration = Math.min(1200, 350 + text.length * 45)
    const start = performance.now()
    let frame
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const revealed = Math.floor(p * text.length)
      setOutput(
        Array.from(text, (c, i) => (i < revealed || c === ' ' ? c : CHARS[Math.floor(Math.random() * CHARS.length)])).join(''),
      )
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduce, text])

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{output}</span>
    </span>
  )
}
