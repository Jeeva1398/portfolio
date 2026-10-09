import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import StatusBadge from './StatusBadge'
import { companyLine } from '../lib/projects'
import { CloseIcon, ExternalIcon, GitHubIcon } from './Icons'

function PipelineStrip({ steps }) {
  return (
    <ol aria-label="Pipeline stages" className="flex flex-wrap items-center gap-y-2 font-mono text-[0.75rem] text-muted">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center">
          <span className="rounded-[4px] border border-line-strong px-2 py-1">{step}</span>
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="mx-1.5 text-subtle">
              &rarr;
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}

// Slide-over panel from the right: keeps the page visible behind it, closes on Escape or backdrop.
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

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-40 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-bg/70 backdrop-blur-[2px]" onClick={onClose} aria-hidden="true" />

          <motion.div
            initial={{ x: 48, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 32, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="relative h-full w-full max-w-2xl overflow-y-auto border-l border-line bg-surface px-6 pb-12 pt-6 sm:px-10"
          >
            <div className="sticky top-0 -mx-6 flex justify-end bg-surface/90 px-6 py-2 backdrop-blur sm:-mx-10 sm:px-10">
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close project details"
                className="grid h-9 w-9 place-items-center rounded-md text-muted hover:bg-raised hover:text-fg"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm text-subtle">{project.domain}</p>
              <StatusBadge status={project.kind === 'professional' ? 'Professional' : project.status} />
            </div>
            <h3 id="project-modal-title" className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-fg">
              {project.name}
            </h3>
            {project.company && <p className="mt-1 text-sm text-subtle">{companyLine(project)}</p>}
            <p className="mt-4 leading-relaxed">{project.tagline}</p>

            {project.image && (
              <a href={project.image.src} target="_blank" rel="noreferrer" className="mt-8 block">
                <img
                  src={project.image.src}
                  alt={project.image.alt}
                  width="1440"
                  height="810"
                  loading="lazy"
                  className="h-auto w-full rounded-lg border border-line"
                />
                <span className="sr-only">(opens full size in a new tab)</span>
              </a>
            )}

            {project.pipeline && (
              <div className="mt-6">
                <PipelineStrip steps={project.pipeline} />
              </div>
            )}

            <p className="mt-6 font-mono text-[0.8125rem] leading-relaxed text-subtle">{project.stack.join(', ')}</p>

            <div className="mt-10 space-y-9">
              {project.details.map((block) => (
                <div key={block.heading}>
                  <h4 className="font-medium text-fg">{block.heading}</h4>
                  {block.text && <p className="mt-2 leading-relaxed">{block.text}</p>}
                  {block.list && (
                    <ul className="mt-3 space-y-2.5">
                      {block.list.map((item) => (
                        <li key={item} className="flex gap-3 leading-relaxed">
                          <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {project.gallery && (
              <div className="mt-10">
                <h4 className="font-medium text-fg">Screenshots</h4>
                <div className="mt-4 space-y-6">
                  {project.gallery.map((shot) => (
                    <figure key={shot.caption}>
                      <a href={shot.src} target="_blank" rel="noreferrer" className="block">
                        <img
                          src={shot.src}
                          alt={shot.alt}
                          width={shot.width}
                          height={shot.height}
                          loading="lazy"
                          className="mx-auto h-auto max-h-[36rem] w-auto max-w-full rounded-lg border border-line"
                        />
                        <span className="sr-only">(opens full size in a new tab)</span>
                      </a>
                      <figcaption className="mt-2 text-sm text-subtle">{shot.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {(project.links?.repo || project.links?.demo) && (
              <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-8">
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
                    {project.links.demoLabel ? `${project.links.demoLabel} package` : 'Open live'}
                    <ExternalIcon className="h-4 w-4" />
                  </a>
                )}
                {project.links.repo && (
                  <a href={project.links.repo} target="_blank" rel="noreferrer" className="btn btn-ghost">
                    <GitHubIcon className="h-4 w-4" /> Source code
                  </a>
                )}
                {project.links.extra?.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="btn btn-ghost">
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
