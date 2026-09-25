import { about, experience, profile, skillGroups } from '../data/content'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import Magnetic from '../components/Magnetic'
import { DownloadIcon } from '../components/Icons'

const tracks = [
  { id: 'app', label: 'Application track', text: 'text-app', dot: 'bg-app' },
  { id: 'data', label: 'Data track', text: 'text-data', dot: 'bg-data' },
]

export default function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-title" className="section">
      <SectionHeading index="06" eyebrow="resume" id="resume-title" title="The one-page version." />

      <Reveal className="mt-10">
        <div className="glass grid gap-8 rounded-2xl p-6 sm:p-8 lg:grid-cols-3">
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-slate-500">Experience</h3>
            <ul className="mt-4 space-y-4">
              {experience.map((job) => (
                <li key={job.company}>
                  <p className="font-medium text-slate-100">{job.company}</p>
                  <p className="text-sm text-slate-400">
                    {job.role} · {job.start} – {job.end}
                  </p>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 font-mono text-[11px] uppercase tracking-wider text-slate-500">Education</h3>
            <p className="mt-3 font-medium text-slate-100">{about.education.degree}</p>
            <p className="text-sm text-slate-400">
              {about.education.institution} · {about.education.years}
            </p>
          </div>

          {tracks.map((track) => (
            <div key={track.id}>
              <h3 className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider ${track.text}`}>
                <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${track.dot}`} />
                {track.label}
              </h3>
              <dl className="mt-4 space-y-4">
                {skillGroups
                  .filter((g) => g.track === track.id)
                  .map((group) => (
                    <div key={group.title}>
                      <dt className="text-sm font-medium text-slate-200">
                        {group.title}
                        {group.status === 'building' && <span className="ml-2 text-xs text-build">(building)</span>}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-slate-400">{group.items.join(' · ')}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-6 flex flex-wrap items-center gap-4">
        <Magnetic>
          <a
            href={`/${profile.resumeFile}`}
            download
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-app to-data px-5 py-2.5 text-sm font-semibold text-ink shadow-lg shadow-data/20"
          >
            <DownloadIcon className="h-4 w-4" />
            Download Resume (PDF)
          </a>
        </Magnetic>
      </Reveal>
    </section>
  )
}
