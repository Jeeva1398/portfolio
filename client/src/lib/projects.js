import { experience } from '../data/content'

// professional projects name their company; the dates come from that job so they never drift apart
export function companyLine(project) {
  if (!project.company) return null
  const job = experience.find((j) => j.company === project.company)
  return job ? `${project.company} · ${job.start} – ${job.end}` : project.company
}

// Opens a project's details from anywhere on the page (the Projects section listens for this).
export const OPEN_PROJECT_EVENT = 'portfolio:open-project'

export function openProject(slug) {
  window.dispatchEvent(new CustomEvent(OPEN_PROJECT_EVENT, { detail: slug }))
}
