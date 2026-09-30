import { experience } from '../data/content'

// professional projects name their company; the dates come from that job so they never drift apart
export function companyLine(project) {
  if (!project.company) return null
  const job = experience.find((j) => j.company === project.company)
  return job ? `${project.company} · ${job.start} – ${job.end}` : project.company
}
