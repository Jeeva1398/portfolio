import StatusBadge from './StatusBadge'
import Tilt from './Tilt'
import { ArrowIcon, GitHubIcon } from './Icons'
import { companyLine } from '../lib/projects'

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

const ACCENTS = {
  app: { text: 'text-app', line: 'from-app/70', glare: 'rgb(34 211 238 / 0.12)', hover: 'hover:border-app/35' },
  data: { text: 'text-data', line: 'from-data/70', glare: 'rgb(167 139 250 / 0.14)', hover: 'hover:border-data/35' },
  ai: { text: 'text-ai', line: 'from-ai/70', glare: 'rgb(244 114 182 / 0.12)', hover: 'hover:border-ai/35' },
}

// wide: landscape layout (screenshot left, details right) used by the horizontal gallery
export default function ProjectCard({ project, onSelect, wide = false }) {
  const accent = ACCENTS[project.track] ?? ACCENTS.app

  return (
    <Tilt
      className={`group glass h-full rounded-2xl transition-colors ${accent.hover} ${
        wide && project.image ? 'grid grid-cols-[1.1fr_1fr] overflow-hidden' : 'flex flex-col'
      }`}
      glare={accent.glare}
      max={wide ? 2 : 4}
    >
      {!wide && <div className={`h-px w-full rounded-t-2xl bg-gradient-to-r ${accent.line} to-transparent`} aria-hidden="true" />}
      {project.image &&
        (wide ? (
          <div className="relative border-r border-white/10">
            <img
              src={project.image.src}
              alt={project.image.alt}
              width="1280"
              height="800"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-left-top"
            />
          </div>
        ) : (
          <img
            src={project.image.src}
            alt={project.image.alt}
            width="1280"
            height="800"
            loading="lazy"
            decoding="async"
            className="aspect-[16/9] w-full border-b border-white/10 object-cover object-top"
          />
        ))}
      <div className="flex flex-1 flex-col p-6" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={`font-mono text-[11px] uppercase tracking-wider ${accent.text}`}>{project.domain}</p>
          <StatusBadge status={project.kind === 'professional' ? 'Professional' : project.status} />
        </div>

        <h3 className="mt-4 font-display text-xl font-semibold text-slate-50">{project.name}</h3>
        {project.company && <p className="mt-1 text-xs text-slate-500">{companyLine(project)}</p>}
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

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          <button
            type="button"
            onClick={() => onSelect(project)}
            className={`inline-flex items-center gap-2 text-sm font-medium ${accent.text} after:absolute after:inset-0 after:content-['']`}
          >
            View details<span className="sr-only">: {project.name}</span>
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          {(project.links?.demo || project.links?.repo) && (
            <div className="relative z-10 flex items-center gap-2">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-app to-data px-3 py-1.5 text-xs font-semibold text-ink transition-opacity hover:opacity-90"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-ink/70" aria-hidden="true" />
                  {project.links.demoLabel ?? 'Live'}<span className="sr-only"> - {project.name} (opens in a new tab)</span>
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-app/50 hover:text-app"
                >
                  <GitHubIcon className="h-3.5 w-3.5" />
                  Code<span className="sr-only"> for {project.name} on GitHub (opens in a new tab)</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Tilt>
  )
}
