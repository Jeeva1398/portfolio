import { useEffect, useState } from 'react'
import { projects as fallbackProjects } from '../data/content'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import Reveal from '../components/Reveal'

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data) && data.length) setProjects(data)
      })
      .catch(() => {
        // fall back silently to bundled content if the API isn't reachable
      })
  }, [])

  return (
    <section id="projects" className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <Reveal>
        <h2 className="text-3xl font-bold text-slate-50">Projects</h2>
        <p className="mt-2 max-w-2xl text-slate-400">
          Production work delivered across healthcare, CRM, and e-commerce domains.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06}>
            <ProjectCard project={project} onSelect={setSelected} />
          </Reveal>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
