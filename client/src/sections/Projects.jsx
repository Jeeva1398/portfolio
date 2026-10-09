import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../data/content'
import { ProductCard, WorkRow } from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { OPEN_PROJECT_EVENT } from '../lib/projects'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'app', label: 'MERN / Full-Stack' },
  { id: 'ai', label: 'AI' },
  { id: 'data', label: 'Data Engineering' },
]

const fade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
  transition: { duration: 0.25 },
}

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const close = useCallback(() => setSelected(null), [])

  // Services rows open a project's details directly
  useEffect(() => {
    const onOpen = (e) => {
      const project = projects.find((p) => p.slug === e.detail)
      if (project) setSelected(project)
    }
    window.addEventListener(OPEN_PROJECT_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, onOpen)
  }, [])

  const { featured, products, professional } = useMemo(() => {
    const visible = projects.filter((p) => filter === 'all' || p.track === filter || p.alsoTrack === filter)
    const own = visible.filter((p) => p.kind === 'personal')
    const lead = own.find((p) => p.featured) ?? null
    return {
      featured: lead,
      products: own.filter((p) => p !== lead),
      professional: visible.filter((p) => p.kind === 'professional'),
    }
  }, [filter])

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="projects-title"
          title="Production work, and what I'm building next."
          intro="Client and employer work in healthcare, CRM and e-commerce, plus my own products: the ZenithDesk SaaS, its AI chatbot, and an open-source AI tool. Each one is labelled with its real status."
        />
        <div role="group" aria-label="Filter projects" className="flex shrink-0 flex-wrap gap-x-1 gap-y-2">
          {FILTERS.map((f) => {
            const on = filter === f.id
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={on}
                className={`relative rounded-md px-3 py-1.5 text-sm transition-colors ${on ? 'text-fg' : 'text-subtle hover:text-fg'}`}
              >
                {on && (
                  <motion.span
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-md border border-line-strong"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{f.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={filter} {...fade}>
          {featured && (
            <div className="mt-16">
              <ProductCard project={featured} onSelect={setSelected} large />
            </div>
          )}

          {products.length > 0 && (
            <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-10">
              {products.map((project) => (
                <ProductCard key={project.slug} project={project} onSelect={setSelected} />
              ))}
            </div>
          )}

          {professional.length > 0 && (
            <Reveal className="mt-24">
              <h3 className="text-sm text-subtle">Client and employer work</h3>
              <ul className="mt-4 border-b border-line">
                {professional.map((project) => (
                  <WorkRow key={project.slug} project={project} onSelect={setSelected} />
                ))}
              </ul>
            </Reveal>
          )}
        </motion.div>
      </AnimatePresence>

      <ProjectModal project={selected} onClose={close} />
    </section>
  )
}
