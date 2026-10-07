import { motion } from 'framer-motion'
import { engagement, projects, proofPoints, services } from '../data/content'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import Tilt from '../components/Tilt'
import Magnetic from '../components/Magnetic'
import CountUp from '../components/CountUp'
import { ArrowIcon } from '../components/Icons'
import { openProject } from '../lib/projects'
import { setAudience } from '../hooks/useAudience'

const TRACK = {
  app: { text: 'text-app', hover: 'hover:text-app', border: 'hover:border-app/40', bg: 'bg-app', glare: 'rgb(34 211 238 / 0.12)', soft: 'from-app/20' },
  ai: { text: 'text-ai', hover: 'hover:text-ai', border: 'hover:border-ai/40', bg: 'bg-ai', glare: 'rgb(244 114 182 / 0.12)', soft: 'from-ai/20' },
  data: { text: 'text-data', hover: 'hover:text-data', border: 'hover:border-data/40', bg: 'bg-data', glare: 'rgb(167 139 250 / 0.12)', soft: 'from-data/20' },
}

// Simple line glyphs, one per service
const GLYPHS = {
  webapps: 'M3 5h18v12H3zM8 21h8M12 17v4M3 9h18',
  backend: 'M4 5h16v5H4zM4 14h16v5H4zM8 7.5h.01M8 16.5h.01',
  ai: 'M12 3v3M12 18v3M3 12h3M18 12h3M7 7l2 2M15 15l2 2M17 7l-2 2M9 15l-2 2M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  data: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6',
}

const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]))

function ServiceCard({ service, index }) {
  const t = TRACK[service.track]
  return (
    <Reveal delay={index * 0.06} className="h-full">
      <Tilt className={`group glass h-full overflow-hidden rounded-2xl p-6 transition-colors ${t.border}`} max={7} glare={t.glare}>
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${t.soft} to-transparent blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-60`}
        />
        {/* translateZ layers give the card real depth while it tilts */}
        <div className="relative flex items-start justify-between gap-4 [transform:translateZ(40px)]">
          <span className={`grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/5 ${t.text} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d={GLYPHS[service.id]} />
            </svg>
          </span>
          <span className="font-mono text-xs text-slate-500">0{index + 1}</span>
        </div>

        <h3 className="relative mt-5 font-display text-xl font-semibold text-slate-50 [transform:translateZ(30px)]">{service.title}</h3>
        <p className="relative mt-2 text-sm leading-relaxed text-slate-400 [transform:translateZ(20px)]">{service.summary}</p>

        <ul className="relative mt-5 space-y-2 [transform:translateZ(15px)]">
          {service.deliverables.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm text-slate-300">
              <svg aria-hidden="true" viewBox="0 0 24 24" className={`mt-0.5 h-4 w-4 shrink-0 ${t.text}`} fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        <ul aria-label="Typical stack" className="relative mt-5 flex flex-wrap gap-1.5 [transform:translateZ(10px)]">
          {service.stack.map((tech) => (
            <li key={tech} className="chip border border-white/10 bg-white/5 font-mono !text-[11px] text-slate-400">
              {tech}
            </li>
          ))}
        </ul>

        <div className="relative mt-5 border-t border-white/10 pt-4 [transform:translateZ(20px)]">
          <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">Proof - built it before</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {service.proof.map((slug) => (
              <button
                key={slug}
                type="button"
                onClick={() => openProject(slug)}
                className={`inline-flex items-center gap-1 rounded-md border border-white/10 px-2.5 py-1 text-xs font-medium text-slate-200 transition-colors hover:border-current ${t.hover}`}
              >
                {projectBySlug[slug]?.name ?? slug}
                <ArrowIcon className="h-3 w-3" />
              </button>
            ))}
          </div>
        </div>
      </Tilt>
    </Reveal>
  )
}

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section">
      <SectionHeading
        index="02"
        eyebrow="services"
        id="services-title"
        title="What I can build for you."
        intro="For teams hiring and for clients with a project: the same four things I have already shipped. Each one links to the real work behind it."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {services.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>

      <Reveal className="mt-14">
        <h3 className="font-mono text-xs uppercase tracking-wider text-slate-400">How a project runs</h3>
        <ol className="relative mt-6 grid gap-4 md:grid-cols-4">
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px origin-left bg-gradient-to-r from-app via-ai to-data md:block"
          />
          {engagement.map((item, i) => (
            <li key={item.step} className="relative">
              <span className="relative z-10 mx-auto grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-panel font-mono text-sm text-slate-100 shadow-lg md:mx-auto">
                {i + 1}
              </span>
              <div className="glass mt-4 rounded-xl p-4 text-center">
                <p className="font-display font-semibold text-slate-50">{item.step}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal className="mt-12">
        <div className="glass relative overflow-hidden rounded-2xl p-6 sm:p-8">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-r from-app/10 via-ai/10 to-data/10" />
          <dl className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map((point) => (
              <div key={point.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm leading-snug text-slate-400">{point.label}</dt>
                <dd className="font-display text-3xl font-semibold text-slate-50">
                  <CountUp value={point.value} />
                </dd>
              </div>
            ))}
          </dl>
          <div className="relative mt-8 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#contact"
                onClick={() => setAudience('client')}
                className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-ai to-data px-5 py-2.5 text-sm font-semibold text-ink shadow-lg shadow-ai/20"
              >
                Start a project
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <p className="text-sm text-slate-400">Or try the live AI chatbot I built - it&apos;s the chat bubble on this page.</p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
