import { about, profile } from '../data/content'
import Reveal from '../components/Reveal'

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <Reveal>
        <h2 className="text-3xl font-bold text-slate-50">About</h2>
        <p className="mt-2 text-slate-400">
          {profile.role} &middot; {profile.location}
        </p>
      </Reveal>

      <div className="mt-8 space-y-6 leading-relaxed text-slate-300">
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
          <p className="border-l-2 border-white/15 pl-4 text-sm text-slate-400">{about.pivotNote}</p>
        </Reveal>
      </div>

      <Reveal delay={0.25} className="mt-10 border-t border-white/10 pt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-100">Education</h3>
        <p className="mt-2 text-sm text-slate-400">
          {about.education.degree} — {about.education.institution} ({about.education.years})
        </p>
      </Reveal>
    </section>
  )
}
