import { about, profile } from '../data/content'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import Tilt from '../components/Tilt'

const facts = [
  { value: '~3 yrs', label: 'Building production MERN apps', color: 'text-app' },
  { value: '3', label: 'Domains: healthcare, CRM, e-commerce', color: 'text-app' },
  { value: '2', label: 'Tracks: application stack + data stack', color: 'text-data' },
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
              <p className="mt-2 text-sm text-slate-300">
                {profile.role} at Pentabay Softwares, Chennai — designing REST APIs, Express middleware, and
                MongoDB schemas, and owning deployment for production releases.
              </p>
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
