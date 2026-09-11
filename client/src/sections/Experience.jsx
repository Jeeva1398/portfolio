import { experience } from '../data/content'
import Reveal from '../components/Reveal'

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <Reveal>
        <h2 className="text-3xl font-bold text-slate-50">Experience</h2>
      </Reveal>

      <div className="mt-8 space-y-10">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.08} className="relative border-l-2 border-white/10 pl-6">
            <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold text-slate-100">{job.company}</h3>
              <span className="text-sm text-slate-500">
                {job.start} – {job.end}
              </span>
            </div>
            <p className="text-sm text-slate-500">
              {job.role} &middot; {job.location}
            </p>
            <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed text-slate-300">
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
