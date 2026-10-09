import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { engagement, projects, proofPoints, services } from '../data/content'
import Reveal from '../components/Reveal'
import { Dash, RevealWords, Rise3D, Stagger, StaggerItem } from '../components/Motion'
import CountUp from '../components/CountUp'
import { ArrowIcon, IconTile, TRACK_ICONS } from '../components/Icons'
import { openProject } from '../lib/projects'
import { setAudience } from '../hooks/useAudience'
import useCapability from '../hooks/useCapability'

const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]))

// Each service is a card that pins near the top while the next one slides up over it. The cards
// underneath tip back and shrink a little, so the four offers read as a physical stack.
function Service({ service, index, count, progress, flat }) {
  const under = count - 1 - index
  const from = index / count
  const scale = useTransform(progress, [from, 1], [1, 1 - under * 0.05])
  const rotateX = useTransform(progress, [from, 1], [0, under * -5])
  const shade = useTransform(progress, [from, 1], [0, under * 0.12])

  return (
    <li className="mb-8 last:mb-0 md:sticky" style={{ top: `calc(7rem + ${index * 1.25}rem)` }}>
      <motion.article
        style={flat ? undefined : { scale, rotateX, transformPerspective: 1400, transformOrigin: '50% 0%' }}
        className="panel relative overflow-hidden p-7 sm:p-9"
      >
        <motion.div aria-hidden="true" style={{ opacity: flat ? 0 : shade }} className="pointer-events-none absolute inset-0 bg-bg" />
        <div className="flex items-start justify-between gap-6">
          <h3 className="text-2xl font-semibold tracking-[-0.02em] text-fg">{service.title}</h3>
          <IconTile icon={TRACK_ICONS[service.id]} className="shrink-0" />
        </div>
        <p className="mt-3 max-w-[56ch] leading-relaxed">{service.summary}</p>

        <Stagger delay={0.15} className="mt-6 grid gap-x-8 gap-y-2.5 text-[0.9375rem] text-fg sm:grid-cols-2">
          {service.deliverables.map((item) => (
            <StaggerItem key={item} x={-8} y={0} className="flex gap-3">
              <Dash />
              {item}
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 text-sm sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-mono text-[0.8125rem] text-subtle">{service.stack.join(', ')}</p>
          <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="text-subtle">Built before:</span>
            {service.proof.map((slug) => (
              <button key={slug} type="button" onClick={() => openProject(slug)} className="link text-sm">
                {projectBySlug[slug]?.name ?? slug}
              </button>
            ))}
          </p>
        </div>
      </motion.article>
    </li>
  )
}

function ServiceStack() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 20%', 'end end'] })
  // phones get a plain list: the cards are not sticky there, so there is nothing to stack
  const { isMobile, reducedMotion } = useCapability()
  return (
    <ul ref={ref}>
      {services.map((service, i) => (
        <Service key={service.id} service={service} index={i} count={services.length} progress={scrollYProgress} flat={isMobile || reducedMotion} />
      ))}
    </ul>
  )
}

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <RevealWords
            id="services-title"
            text="What I can build for you."
            className="text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-[2.75rem] sm:leading-[1.08]"
          />
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-[42ch] leading-relaxed">
              For teams hiring and for clients with a project: four things I have already shipped, each linked to the
              real work behind it.
            </p>
          </Reveal>
          {/* The process line draws down and each step lights up as it is reached */}
          <Stagger as="ol" gap={0.18} delay={0.3} className="relative mt-10 space-y-4 pl-5">
            <motion.span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-px origin-top bg-line"
              variants={{ hidden: { scaleY: 0 }, shown: { scaleY: 1 } }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
            {engagement.map((item) => (
              <StaggerItem key={item.step} x={-6} y={0} className="relative">
                <motion.span
                  aria-hidden="true"
                  className="absolute -left-[1.4rem] top-[0.45em] h-1.5 w-1.5 rounded-full bg-accent"
                  variants={{ hidden: { scale: 0 }, shown: { scale: 1 } }}
                />
                <p className="text-sm font-medium text-fg">{item.step}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-subtle">{item.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <ServiceStack />
      </div>

      <Rise3D className="panel mt-20 p-8 sm:p-10">
        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {proofPoints.map((point) => (
            <div key={point.label} className="flex flex-col-reverse gap-2">
              <dt className="text-sm leading-snug text-subtle">{point.label}</dt>
              <dd className="text-4xl font-semibold tracking-[-0.03em] text-fg tabular-nums">
                <CountUp value={point.value} />
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8">
          <a href="#contact" onClick={() => setAudience('client')} className="btn btn-primary group">
            Start a project
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <p className="text-sm text-subtle">Or try the AI chatbot I built: it is the chat bubble in the corner of this page.</p>
        </div>
      </Rise3D>
    </section>
  )
}
