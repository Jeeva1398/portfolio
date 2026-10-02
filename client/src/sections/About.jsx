import { about, profile } from '../data/content'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import Tilt from '../components/Tilt'
import profilePhoto from '../assets/profile.webp'

const facts = [
  { value: '~3 yrs', label: 'Building production MERN apps', color: 'text-app' },
  { value: '3', label: 'Domains: healthcare, CRM, e-commerce', color: 'text-app' },
  { value: '2', label: 'Tracks: application stack + data stack', color: 'text-data' },
]

// Pinned to the arch edges: application stack on the left, data stack on the right
const portraitChips = [
  { label: 'node.js', className: 'left-0 top-28 border-app/40 text-app', delay: '0s' },
  { label: 'mongodb', className: 'left-0 top-48 border-app/40 text-app', delay: '-3s' },
  { label: 'python', className: 'right-0 top-32 border-data/40 text-data', delay: '-1.5s' },
  { label: 'airflow', className: 'right-0 top-52 border-data/40 text-data', delay: '-4.5s' },
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <SectionHeading
        index="01"
        eyebrow="about"
        id="about-title"
        title="Backend-leaning, production-tested, now building the data layer."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_1fr]">
        <div className="space-y-6 leading-relaxed text-slate-300">
          <Reveal delay={0.05}>
            <p>{about.summary}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>{about.domainParagraph}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>{about.direction}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="border-l-2 border-data/40 pl-4 text-sm text-slate-400">{about.pivotNote}</p>
          </Reveal>
        </div>

        <div className="space-y-4">
          <Reveal>
            <figure className="glass relative overflow-hidden rounded-2xl">
              <div className="relative mx-auto mt-6 h-80 max-w-sm sm:h-96">
                <div aria-hidden="true" className="portrait-arch absolute inset-x-12 bottom-0 top-20 rounded-t-full sm:inset-x-16 sm:top-24" />
                <div className="portrait-window absolute inset-x-12 bottom-0 top-0 sm:inset-x-16">
                  <img
                    src={profilePhoto}
                    alt={`${profile.name}, ${profile.role}`}
                    width="423"
                    height="590"
                    loading="lazy"
                    decoding="async"
                    className="absolute bottom-0 left-1/2 h-[106%] w-auto max-w-none -translate-x-1/2"
                  />
                </div>
                {portraitChips.map((chip) => (
                  <span
                    key={chip.label}
                    aria-hidden="true"
                    className={`portrait-chip absolute z-10 inline-flex items-center gap-1.5 rounded-full border bg-panel/90 px-2.5 py-1 font-mono text-[11px] shadow-lg shadow-black/20 backdrop-blur-md ${chip.className}`}
                    style={{ animationDelay: chip.delay }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {chip.label}
                  </span>
                ))}
              </div>
              <figcaption className="relative flex flex-wrap items-end justify-between gap-x-4 gap-y-1 border-t border-white/10 bg-ink/60 px-5 py-4 backdrop-blur">
                <div>
                  <p className="font-display text-lg font-semibold text-slate-50">{profile.name}</p>
                  <p className="text-sm text-app-soft">{profile.role}</p>
                </div>
                <p className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </svg>
                  {profile.location}
                </p>
              </figcaption>
            </figure>
          </Reveal>

          <div className="grid grid-cols-3 gap-3">
            {facts.map((fact, i) => (
              <Reveal key={fact.label} delay={0.08 * i}>
                <Tilt className="group glass rounded-xl p-4" max={8}>
                  <p className={`font-display text-2xl font-semibold ${fact.color}`}>{fact.value}</p>
                  <p className="mt-1 text-xs leading-snug text-slate-400">{fact.label}</p>
                </Tilt>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <Tilt className="group glass rounded-xl p-5" max={4}>
              <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">Currently</p>
              <p className="mt-2 text-sm text-slate-300">{about.currently}</p>
            </Tilt>
          </Reveal>

          <Reveal delay={0.2}>
            <Tilt className="group glass rounded-xl p-5" max={4}>
              <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">Education</p>
              <p className="mt-2 text-sm font-medium text-slate-200">{about.education.degree}</p>
              <p className="mt-1 text-sm text-slate-400">
                {about.education.institution} · {about.education.years}
              </p>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
