import { about, experience, profile, skillGroups } from '../data/content'
import { Rise3D } from '../components/Motion'
import { DownloadIcon } from '../components/Icons'

const tracks = [
  { id: 'app', label: 'Application track' },
  { id: 'data', label: 'Data track' },
]

// The page as a sheet of paper: the same facts the PDF has, laid out like one.
export default function Resume() {
  return (
    <section id="resume" aria-labelledby="resume-title" className="section">
      <Rise3D tilt={18} className="panel p-6 sm:p-12">
        <div className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="resume-title" className="text-3xl font-semibold tracking-[-0.03em] text-fg">
              The one-page version.
            </h2>
            <p className="mt-2 text-subtle">{profile.headline}</p>
          </div>
          <a href={`/${profile.resumeFile}`} download className="btn btn-primary self-start sm:self-auto">
            <DownloadIcon className="h-4 w-4" />
            Download PDF
          </a>
        </div>

        <div className="grid gap-10 pt-8 lg:grid-cols-3">
          <div>
            <h3 className="text-sm text-subtle">Experience</h3>
            <ul className="mt-4 space-y-4">
              {experience.map((job) => (
                <li key={job.company}>
                  <p className="font-medium text-fg">{job.company}</p>
                  <p className="text-sm">
                    {job.role}, {job.start} to {job.end}
                  </p>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-sm text-subtle">Education</h3>
            <p className="mt-3 font-medium text-fg">{about.education.degree}</p>
            <p className="text-sm">
              {about.education.institution}, {about.education.years}
            </p>
          </div>

          {tracks.map((track) => (
            <div key={track.id}>
              <h3 className="text-sm text-subtle">{track.label}</h3>
              <dl className="mt-4 space-y-4">
                {skillGroups
                  .filter((g) => g.track === track.id)
                  .map((group) => (
                    <div key={group.title}>
                      <dt className="text-sm font-medium text-fg">
                        {group.title}
                        {group.status === 'building' && <span className="ml-2 font-normal text-accent">building</span>}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed">{group.items.join(', ')}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          ))}
        </div>
      </Rise3D>
    </section>
  )
}
