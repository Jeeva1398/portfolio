import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { audiences, profile, stackUnits } from '../data/content'
import AudienceSwitch from '../components/AudienceSwitch'
import useAudience from '../hooks/useAudience'
import { ArrowIcon, DownloadIcon } from '../components/Icons'
import HubFallback from '../three/HubFallback'
import useCapability from '../hooks/useCapability'
import useInViewport from '../hooks/useInViewport'

const HubScene = lazy(() => import('../three/HubScene'))

const rise = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring', stiffness: 80, damping: 20, delay },
})

// Which layer is lit in the hub: follows the pointer, and otherwise steps through the three
// layers slowly so a visitor who never hovers still sees all of them.
function useActiveUnit(running) {
  const [index, setIndex] = useState(0)
  const [held, setHeld] = useState(false)
  useEffect(() => {
    if (!running || held) return
    const id = setInterval(() => setIndex((i) => (i + 1) % stackUnits.length), 3600)
    return () => clearInterval(id)
  }, [running, held])
  const hover = (i) => {
    setHeld(true)
    setIndex(i)
  }
  return { index, hover, release: () => setHeld(false) }
}

export default function Hero() {
  const { use3D, reducedMotion } = useCapability()
  const visualRef = useRef(null)
  const inView = useInViewport(visualRef)
  const audience = useAudience()
  const copy = audiences[audience]
  const forClient = audience === 'client'
  const { index, hover, release } = useActiveUnit(inView && !reducedMotion)

  // Leaving the hero, the copy lifts away faster than the hub, and the hub tips back and sinks:
  // two planes at different depths, so the first scroll already feels three-dimensional.
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const visualRotate = useTransform(scrollYProgress, [0, 1], [0, 22])
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.86])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const depth = !reducedMotion

  return (
    <section ref={sectionRef} id="home" aria-labelledby="hero-title" className="section flex min-h-[100dvh] flex-col justify-center !pb-16 !pt-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <motion.div style={depth ? { y: copyY, opacity: copyOpacity } : undefined}>
          <motion.div {...rise(0)}>
            <AudienceSwitch />
          </motion.div>

          <motion.h1
            {...rise(0.05)}
            id="hero-title"
            className="mt-8 text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.045em] text-fg sm:text-6xl lg:text-[4.25rem]"
          >
            {profile.name}
            {profile.headline.split(' | ').map((part) => (
              <span key={part} className="block text-[0.4em] leading-[1.3] font-normal tracking-[-0.02em] text-muted first-of-type:mt-4">
                {part}
              </span>
            ))}
          </motion.h1>

          <motion.div {...rise(0.12)} className="mt-7 max-w-[34rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={audience}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="text-lg leading-relaxed text-muted"
              >
                {copy.intro}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.div {...rise(0.18)} className="mt-9 flex flex-wrap items-center gap-3">
            {forClient ? (
              <>
                <a href="#contact" className="btn btn-primary group">
                  Start a project
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a href="#services" className="btn btn-ghost">
                  See services
                </a>
              </>
            ) : (
              <>
                <a href="#projects" className="btn btn-primary group">
                  View projects
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a href="#contact" className="btn btn-ghost">
                  Contact me
                </a>
              </>
            )}
          </motion.div>

          <motion.ul {...rise(0.24)} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-subtle">
            <li>
              <a href={`/${profile.resumeFile}`} download className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
                <DownloadIcon className="h-4 w-4" />
                Resume (PDF)
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">
                LinkedIn
              </a>
            </li>
          </motion.ul>
        </motion.div>

        <motion.figure
          ref={visualRef}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 18, delay: 0.15 }}
          className="relative"
          onPointerLeave={release}
        >
          <motion.div
            style={depth ? { rotateX: visualRotate, scale: visualScale, y: visualY, transformPerspective: 1200, transformOrigin: '50% 100%' } : undefined}
            className="relative h-[19rem] sm:h-[24rem] lg:h-[28rem]"
          >
            {use3D ? (
              <Suspense fallback={<HubFallback units={stackUnits} activeIndex={index} />}>
                <div
                  className="absolute inset-0"
                  role="img"
                  aria-label="3D diagram: a core wired to three layer cards (application, AI, data) and to the tools behind each layer. Pointing at a layer lights its connections."
                >
                  <HubScene units={stackUnits} activeIndex={index} onHover={hover} onLeave={release} active={inView} />
                </div>
              </Suspense>
            ) : (
              <HubFallback units={stackUnits} activeIndex={index} onHover={hover} />
            )}
          </motion.div>

          <figcaption>
            <ul className="mx-auto grid max-w-md gap-px overflow-hidden rounded-xl border border-line bg-line">
              {stackUnits.map((unit, i) => {
                const active = i === index
                return (
                  <li key={unit.id}>
                    <button
                      type="button"
                      onPointerEnter={() => hover(i)}
                      onFocus={() => hover(i)}
                      onBlur={release}
                      aria-pressed={active}
                      className="flex w-full items-baseline gap-4 bg-bg px-4 py-3 text-left transition-colors hover:bg-surface"
                    >
                      <span className={`w-24 shrink-0 text-sm font-medium transition-colors ${active ? 'text-accent' : 'text-fg'}`}>
                        {unit.label}
                      </span>
                      <span className="text-[0.8125rem] text-subtle">{unit.detail}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
