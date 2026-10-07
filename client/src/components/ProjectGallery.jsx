import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import ProjectCard from './ProjectCard'

// Desktop-only horizontal gallery: the section pins, vertical scroll slides the cards sideways,
// and each card turns away and sinks back the further it is from the centre of the screen.
export default function ProjectGallery({ title, items, onSelect }) {
  const wrap = useRef(null)
  const sticky = useRef(null)
  const track = useRef(null)
  const [distance, setDistance] = useState(0)
  const dist = useMotionValue(0)

  useLayoutEffect(() => {
    const measure = () => {
      const d = Math.max(0, track.current.scrollWidth - sticky.current.clientWidth)
      dist.set(d)
      setDistance(d)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(track.current)
    observer.observe(sticky.current)
    return () => observer.disconnect()
  }, [dist])

  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] })
  const x = useSpring(
    useTransform(() => -scrollYProgress.get() * dist.get()),
    { stiffness: 260, damping: 40, mass: 0.4 },
  )

  const turn = useCallback(() => {
    if (!track.current) return
    const center = window.innerWidth / 2
    for (const card of track.current.children) {
      const r = card.getBoundingClientRect()
      const off = Math.max(-1, Math.min(1, (r.left + r.width / 2 - center) / window.innerWidth))
      card.style.setProperty('transform', `rotateY(${(-off * 16).toFixed(2)}deg) translateZ(${(-Math.abs(off) * 90).toFixed(1)}px)`)
      card.style.setProperty('--sweep', `${(50 + off * 120).toFixed(1)}%`)
      card.style.setProperty('--glint', Math.min(1, Math.abs(off) * 2).toFixed(2))
    }
  }, [])

  useMotionValueEvent(x, 'change', turn)
  useLayoutEffect(turn, [turn, items, distance])

  // Keyboard users: tabbing into a card scrolls the page so that card is centred.
  const centre = (e) => {
    if (distance <= 0) return
    const card = e.currentTarget
    const top = wrap.current.getBoundingClientRect().top + window.scrollY
    const target = card.offsetLeft + card.offsetWidth / 2 - sticky.current.clientWidth / 2
    window.scrollTo({ top: top + Math.max(0, Math.min(1, target / distance)) * distance, behavior: 'smooth' })
  }

  const pinned = distance > 0
  const inset = { paddingInline: 'max(1rem, calc((100vw - 72rem) / 2 + 1.5rem))' }

  return (
    <div
      ref={wrap}
      className="relative"
      style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)', height: pinned ? `calc(100svh + ${distance}px)` : undefined }}
    >
      <div
        ref={sticky}
        className={`flex flex-col justify-center overflow-clip [perspective:1600px] ${pinned ? 'sticky top-0 h-svh' : ''}`}
      >
        <div style={inset}>{title}</div>
        <motion.ul ref={track} style={{ x, ...inset }} className="flex w-max items-stretch gap-6 py-4 [transform-style:preserve-3d]">
          {items.map((project) => (
            <li key={project.slug} onFocus={centre} className="relative w-[min(880px,72vw)] flex-none will-change-transform">
              <ProjectCard project={project} onSelect={onSelect} wide />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 rounded-2xl"
                style={{
                  opacity: 'var(--glint, 0)',
                  backgroundImage: 'linear-gradient(105deg, transparent 42%, rgb(255 255 255 / 0.07) 50%, transparent 58%)',
                  backgroundSize: '300% 100%',
                  backgroundPosition: 'var(--sweep, 50%) 0',
                }}
              />
            </li>
          ))}
        </motion.ul>
        {pinned && (
          <div style={inset} className="mt-4">
            <div className="h-px w-full max-w-xs overflow-hidden rounded bg-white/10">
              <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-gradient-to-r from-app via-ai to-data" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
