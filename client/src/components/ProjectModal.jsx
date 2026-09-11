import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

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
          <motion.div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-900 p-6 sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-md text-slate-400 hover:bg-white/5 hover:text-slate-100"
            >
              ✕
            </button>

            <span className="inline-block rounded bg-indigo-400/10 px-2 py-1 text-xs font-medium uppercase tracking-wide text-indigo-300">
              {project.domain}
            </span>
            <h3 id="project-modal-title" className="mt-3 text-2xl font-bold text-slate-50">
              {project.name}
            </h3>
            <p className="mt-2 text-slate-400">{project.tagline}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="rounded bg-white/5 px-2 py-1 text-xs text-slate-300">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-100">
                  Frontend integration
                </h4>
                <p className="mt-2 leading-relaxed text-slate-300">{project.frontend}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-100">
                  Backend development
                </h4>
                <p className="mt-2 leading-relaxed text-slate-300">{project.backend}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-100">
                  Key features
                </h4>
                <ul className="mt-2 list-inside list-disc space-y-2 text-slate-300">
                  {project.keyFeatures.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
