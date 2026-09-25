import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import StatusBadge from './StatusBadge'
import { PipelineStrip } from './ProjectCard'
import { GitHubIcon } from './Icons'

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!project) return
    const previouslyFocused = document.activeElement
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [project, onClose])

  const accent = project?.track === 'data' ? 'text-data' : 'text-app'

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-40 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-panel p-6 shadow-2xl shadow-black/50 sm:p-8"
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-md text-slate-400 hover:bg-white/5 hover:text-slate-100"
            >
              ✕
            </button>

            <div className="flex flex-wrap items-center gap-3 pr-10">
              <p className={`font-mono text-[11px] uppercase tracking-wider ${accent}`}>{project.domain}</p>
              <StatusBadge status={project.kind === 'professional' ? 'Professional' : project.status} />
            </div>
            <h3 id="project-modal-title" className="mt-3 font-display text-2xl font-semibold text-slate-50">
              {project.name}
            </h3>
            <p className="mt-2 text-slate-400">{project.tagline}</p>

            {project.pipeline && (
              <div className="mt-5">
                <PipelineStrip steps={project.pipeline} />
              </div>
            )}

            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded bg-white/5 px-2 py-1 font-mono text-xs text-slate-300">
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-6">
              {project.details.map((block) => (
                <div key={block.heading}>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-slate-200">{block.heading}</h4>
                  {block.text && <p className="mt-2 leading-relaxed text-slate-300">{block.text}</p>}
                  {block.list && (
                    <ul className="mt-2 space-y-2 text-slate-300">
                      {block.list.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden="true" className={accent}>
                            ›
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {(project.links?.repo || project.links?.demo) && (
              <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
                {project.links.repo && (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-100 hover:border-app/50"
                  >
                    <GitHubIcon className="h-4 w-4" /> Source code
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-lg bg-gradient-to-r from-app to-data px-4 py-2 text-sm font-semibold text-ink"
                  >
                    Live demo
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
