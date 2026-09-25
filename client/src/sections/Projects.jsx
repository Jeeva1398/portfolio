import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../data/content'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import SectionHeading from '../components/SectionHeading'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'app', label: 'MERN / Full-Stack' },
  { id: 'data', label: 'Data Engineering' },
]

function ProjectGrid({ items, onSelect }) {
  return (
    <motion.ul layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {items.map((project) => (
          <motion.li
            key={project.slug}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            className={project.featured ? 'md:col-span-2 lg:col-span-1' : undefined}
          >
            <ProjectCard project={project} onSelect={onSelect} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const close = useCallback(() => setSelected(null), [])

  const { building, professional } = useMemo(() => {
    const visible = projects.filter((p) => filter === 'all' || p.track === filter || p.alsoTrack === filter)
    return {
      building: visible.filter((p) => p.kind === 'personal'),
      professional: visible.filter((p) => p.kind === 'professional'),
    }
  }, [filter])

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <SectionHeading
        index="04"
        eyebrow="projects"
        id="projects-title"
        title="Production work, and what I'm building next."
        intro="Professional projects were delivered for clients and employers across healthcare, CRM, and e-commerce. Portfolio projects are my own builds, labelled honestly with their current status."
      />

      <div role="group" aria-label="Filter projects" className="mt-8 inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors sm:px-4 ${
              filter === f.id ? 'text-ink' : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            {filter === f.id && (
              <motion.span
                layoutId="project-filter"
                className={`absolute inset-0 rounded-lg ${
                  f.id === 'data' ? 'bg-data' : f.id === 'app' ? 'bg-app' : 'bg-slate-100'
                }`}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{f.label}</span>
          </button>
        ))}
      </div>

      {building.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-5 font-mono text-xs uppercase tracking-wider text-build">Portfolio projects</h3>
          <ProjectGrid items={building} onSelect={setSelected} />
        </div>
      )}

      {professional.length > 0 && (
        <div className="mt-12">
          <h3 className="mb-5 font-mono text-xs uppercase tracking-wider text-slate-400">Professional work</h3>
          <ProjectGrid items={professional} onSelect={setSelected} />
        </div>
      )}

      <ProjectModal project={selected} onClose={close} />
    </section>
  )
}
