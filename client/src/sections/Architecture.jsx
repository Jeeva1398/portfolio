import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { architecture } from '../data/content'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { Tilt } from '../components/Motion'

const VIEWS = { app: architecture.app, data: architecture.data }

// One plate of the exploded stack. `gap` is a motion value: the plates spread apart as the
// section scrolls in, so the stack visibly comes apart into its layers.
function Plate({ layer, depth, gap, active, onSelect }) {
  const transform = useTransform(gap, (g) => `translateZ(${depth * g}px) translateX(${active ? 26 : 0}px)`)
  return (
    <motion.div
      className="iso-plate"
      data-active={active}
      style={{ transform }}
      onClick={() => onSelect(layer.id)}
      onPointerEnter={() => onSelect(layer.id)}
    >
      <div className="iso-side-a" />
      <div className="iso-side-b" />
      <div className="iso-top">
        <span className="iso-label">{layer.label}</span>
      </div>
    </motion.div>
  )
}

function Stack({ view, selectedId, onSelect }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center 60%'] })
  const eased = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })
  const gap = useTransform(eased, [0, 1], reduce ? [48, 48] : [10, 48])
  const n = view.layers.length

  return (
    <div ref={ref} aria-hidden="true" className="iso-stage h-[25rem] sm:h-[34rem]">
      <div className="iso translate-y-[5.5rem] sm:translate-y-[7.5rem]">
        {view.layers.map((layer, i) => (
          <Plate key={layer.id} layer={layer} depth={n - 1 - i} gap={gap} active={layer.id === selectedId} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}

export default function Architecture() {
  const [viewId, setViewId] = useState('app')
  const [selection, setSelection] = useState({ app: 'server', data: 'warehouse' })

  const view = VIEWS[viewId]
  const selectedId = selection[viewId]
  const layer = view.layers.find((l) => l.id === selectedId)
  const select = (id) => setSelection((prev) => ({ ...prev, [viewId]: id }))

  return (
    <section id="architecture" aria-labelledby="architecture-title" className="section">
      <SectionHeading
        id="architecture-title"
        title="How the systems I build fit together."
        intro="Two views of the same engineer: the application stack I ship in production, and the data pipeline I build on top of it. Pick a layer to see what it does and where I have used it."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <Tilt max={5} className="panel overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={viewId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <Stack view={view} selectedId={selectedId} onSelect={select} />
            </motion.div>
          </AnimatePresence>
          </Tilt>
        </Reveal>

        <div className="order-1 lg:order-2">
          <div role="tablist" aria-label="Architecture view" className="inline-flex rounded-lg border border-line p-1">
            {Object.entries(VIEWS).map(([id, v]) => (
              <button
                key={id}
                role="tab"
                type="button"
                aria-selected={viewId === id}
                aria-controls="architecture-panel"
                onClick={() => setViewId(id)}
                className={`relative rounded-md px-3.5 py-1.5 text-sm transition-colors ${viewId === id ? 'text-fg' : 'text-subtle hover:text-fg'}`}
              >
                {viewId === id && (
                  <motion.span layoutId="arch-view" className="absolute inset-0 rounded-md bg-raised" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                )}
                <span className="relative">{v.short}</span>
              </button>
            ))}
          </div>

          <div id="architecture-panel" role="tabpanel" aria-label={view.label}>
            <ol className="mt-8 border-t border-line" aria-label={`${view.label} layers`}>
              {view.layers.map((l) => {
                const on = l.id === selectedId
                return (
                  <li key={l.id} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => select(l.id)}
                      aria-pressed={on}
                      className="flex w-full items-baseline justify-between gap-4 py-3 text-left"
                    >
                      <span className={`text-[0.9375rem] transition-colors ${on ? 'text-accent' : 'text-fg hover:text-accent'}`}>{l.label}</span>
                      <span className="hidden font-mono text-[0.75rem] text-subtle sm:inline">{l.tech.replaceAll(" · ", ", ")}</span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <div aria-live="polite" className="mt-8 min-h-[12rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${viewId}-${layer.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="leading-relaxed text-fg">{layer.what}</p>
                  {layer.usedIn.length > 0 && (
                    <p className="mt-4 text-sm text-subtle">
                      Used in: <span className="text-muted">{layer.usedIn.join(', ')}</span>
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
