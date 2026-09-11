import { zenithDesk } from '../data/content'
import Reveal from '../components/Reveal'

export default function Building() {
  return (
    <section id="building" className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <Reveal>
        <span className="inline-block rounded bg-amber-400/10 px-2 py-1 text-xs font-medium uppercase tracking-wide text-amber-400">
          {zenithDesk.status}
        </span>
        <h2 className="mt-3 text-3xl font-bold text-slate-50">{zenithDesk.name}</h2>
        <p className="mt-2 text-slate-400">{zenithDesk.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {zenithDesk.stack.map((tech) => (
            <span key={tech} className="rounded bg-white/5 px-2 py-1 text-xs text-slate-300">
              {tech}
            </span>
          ))}
        </div>

        <p className="mt-6 rounded-lg border border-amber-400/20 bg-amber-400/5 p-4 text-sm leading-relaxed text-slate-300">
          This project is honestly in progress — what follows is the architecture and current build
          state, not a finished product.
        </p>
      </Reveal>

      <div className="mt-10">
        <Reveal>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-100">
            Architecture highlights
          </h3>
        </Reveal>
        <div className="space-y-5">
          {zenithDesk.architecture.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="border-l-2 border-white/10 pl-4">
              <h4 className="font-medium text-slate-100">{item.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-10">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-100">
          Development process
        </h3>
        <p className="mt-2 leading-relaxed text-slate-300">{zenithDesk.devProcess}</p>
      </Reveal>

      {(zenithDesk.links.repo || zenithDesk.links.demo) && (
        <div className="mt-10 flex gap-4">
          {zenithDesk.links.repo && (
            <a href={zenithDesk.links.repo} className="text-sm text-cyan-400 hover:underline">
              Repository
            </a>
          )}
          {zenithDesk.links.demo && (
            <a href={zenithDesk.links.demo} className="text-sm text-cyan-400 hover:underline">
              Live demo
            </a>
          )}
        </div>
      )}
    </section>
  )
}
