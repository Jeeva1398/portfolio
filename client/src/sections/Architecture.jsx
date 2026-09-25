import { lazy, Suspense, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { architecture } from '../data/content'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import useCapability from '../hooks/useCapability'
import useInViewport from '../hooks/useInViewport'

const ArchitectureScene = lazy(() => import('../three/ArchitectureScene'))

const VIEWS = {
  app: { ...architecture.app, color: '#22d3ee', text: 'text-app', border: 'border-app', bg: 'bg-app' },
  data: { ...architecture.data, color: '#a78bfa', text: 'text-data', border: 'border-data', bg: 'bg-data' },
}

// The layer list is both the keyboard-accessible control and the 2D diagram on mobile / reduced motion.
function LayerFlow({ view, selectedId, onSelect, compact }) {
  return (
    <ol
      className={compact ? 'flex flex-wrap items-center gap-y-2' : 'relative space-y-2'}
      aria-label={`${view.label} layers`}
    >
      {!compact && (
        <span aria-hidden="true" className={`absolute left-[17px] top-4 bottom-4 w-px ${view.bg} opacity-30`} />
      )}
      {view.layers.map((layer, i) => {
        const selected = layer.id === selectedId
        return (
          <li key={layer.id} className={compact ? 'flex items-center' : 'relative'}>
            <button
              type="button"
              onClick={() => onSelect(layer.id)}
              aria-pressed={selected}
              className={`flex items-center gap-3 rounded-lg border text-left transition-colors ${
                compact ? 'px-2.5 py-1.5' : 'w-full px-2 py-2'
              } ${
                selected
                  ? `${view.border} bg-white/10 text-slate-50`
                  : 'border-white/10 bg-ink/60 text-slate-400 hover:border-white/25 hover:text-slate-100'
              }`}
            >
              <span
                className={`grid shrink-0 place-items-center rounded-md border font-mono text-[11px] ${
                  compact ? 'h-5 w-5 border-transparent' : 'h-6 w-6'
                } ${selected ? `${view.border} ${view.text}` : 'border-white/15 text-slate-500'}`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm font-medium">{layer.label}</span>
              {!compact && <span className="ml-auto hidden font-mono text-[11px] text-slate-500 sm:inline">{layer.tech}</span>}
            </button>
            {compact && i < view.layers.length - 1 && (
              <span aria-hidden="true" className={`mx-1.5 ${view.text} opacity-60`}>
                →
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}

function LayerDetail({ view, layer, index }) {
  return (
    <div aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={layer.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
        >
          <p className={`font-mono text-[11px] uppercase tracking-wider ${view.text}`}>
            Layer {String(index + 1).padStart(2, '0')} of {String(view.layers.length).padStart(2, '0')}
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-slate-50">{layer.label}</h3>
          <p className="mt-1 font-mono text-xs text-slate-400">{layer.tech}</p>
          <p className="mt-4 leading-relaxed text-slate-300">{layer.what}</p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-slate-500">Where I&apos;ve used it</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {layer.usedIn.map((name) => (
              <li key={name} className="chip border border-white/10 bg-white/5 text-slate-200">
                {name}
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function Architecture() {
  const { use3D } = useCapability()
  const [viewId, setViewId] = useState('app')
  const [selection, setSelection] = useState({ app: 'server', data: 'orchestrate' })
  const canvasRef = useRef(null)
  const inView = useInViewport(canvasRef)

  const view = VIEWS[viewId]
  const selectedId = selection[viewId]
  const index = view.layers.findIndex((l) => l.id === selectedId)
  const select = (id) => setSelection((prev) => ({ ...prev, [viewId]: id }))

  return (
    <section id="architecture" aria-labelledby="architecture-title" className="section">
      <SectionHeading
        index="05"
        eyebrow="architecture"
        id="architecture-title"
        title="How the systems I build fit together."
        intro="Two views of the same engineer: the application stack I ship in production, and the data pipeline I'm building on top of it. Select any layer to see what it does and where I've used it."
      />

      <Reveal className="mt-8">
        <div role="tablist" aria-label="Architecture view" className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
          {Object.entries(VIEWS).map(([id, v]) => (
            <button
              key={id}
              role="tab"
              type="button"
              aria-selected={viewId === id}
              aria-controls="architecture-panel"
              onClick={() => setViewId(id)}
              className={`relative rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                viewId === id ? 'text-ink' : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {viewId === id && (
                <motion.span
                  layoutId="arch-view"
                  className={`absolute inset-0 rounded-lg ${v.bg}`}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{v.short}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <div id="architecture-panel" role="tabpanel" aria-label={view.label} className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="glass overflow-hidden rounded-2xl">
          {use3D ? (
            <>
              <div ref={canvasRef} className="relative h-[380px]">
                <Suspense fallback={null}>
                  <ArchitectureScene
                    key={viewId}
                    layers={view.layers}
                    color={view.color}
                    selectedId={selectedId}
                    onSelect={select}
                    active={inView}
                  />
                </Suspense>
              </div>
              <div className="border-t border-white/10 p-4">
                <LayerFlow view={view} selectedId={selectedId} onSelect={select} compact />
              </div>
            </>
          ) : (
            <div className="p-4 sm:p-6">
              <LayerFlow view={view} selectedId={selectedId} onSelect={select} />
            </div>
          )}
        </div>

        <div className="glass rounded-2xl p-6 sm:p-7">
          <LayerDetail view={view} layer={view.layers[index]} index={index} />
        </div>
      </div>
    </section>
  )
}
