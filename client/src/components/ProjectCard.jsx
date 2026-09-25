import StatusBadge from './StatusBadge'
import Tilt from './Tilt'
import { ArrowIcon } from './Icons'

export function PipelineStrip({ steps }) {
  return (
    <ol aria-label="Pipeline stages" className="flex flex-wrap items-center gap-y-2 font-mono text-[11px] text-data-soft">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center">
          <span className="rounded border border-data/30 bg-data/10 px-2 py-1">{step}</span>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="mx-1 text-data/60">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}

export default function ProjectCard({ project, onSelect }) {
  const isData = project.track === 'data'
  const accent = isData
    ? { text: 'text-data', line: 'from-data/70', glare: 'rgb(167 139 250 / 0.14)', hover: 'hover:border-data/35' }
    : { text: 'text-app', line: 'from-app/70', glare: 'rgb(34 211 238 / 0.12)', hover: 'hover:border-app/35' }

  return (
    <Tilt className={`group glass flex h-full flex-col rounded-2xl transition-colors ${accent.hover}`} glare={accent.glare} max={4}>
      <div className={`h-px w-full rounded-t-2xl bg-gradient-to-r ${accent.line} to-transparent`} aria-hidden="true" />
      <div className="flex flex-1 flex-col p-6" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={`font-mono text-[11px] uppercase tracking-wider ${accent.text}`}>{project.domain}</p>
          <StatusBadge status={project.kind === 'professional' ? 'Professional' : project.status} />
        </div>

        <h3 className="mt-4 font-display text-xl font-semibold text-slate-50">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{project.tagline}</p>

        {project.pipeline && (
          <div className="mt-5">
            <PipelineStrip steps={project.pipeline} />
          </div>
        )}

        {project.highlights && (
          <ul className="mt-5 space-y-1.5 text-sm text-slate-300">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className={accent.text}>
                  ›
                </span>
                {item}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded bg-white/5 px-2 py-0.5 font-mono text-[11px] text-slate-400">
              {tech}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => onSelect(project)}
          className={`mt-auto inline-flex items-center gap-2 self-start pt-6 text-sm font-medium ${accent.text} after:absolute after:inset-0 after:content-['']`}
        >
          View details<span className="sr-only">: {project.name}</span>
          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </Tilt>
  )
}
