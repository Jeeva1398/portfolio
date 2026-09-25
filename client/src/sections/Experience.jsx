import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { experience } from '../data/content'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import Tilt from '../components/Tilt'

export default function Experience() {
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <SectionHeading
        index="03"
        eyebrow="experience"
        id="experience-title"
        title="Two product teams, one release cycle end to end."
      />

      <ol ref={timelineRef} className="relative mt-12 max-w-4xl space-y-10 pl-8 sm:pl-12">
        <span aria-hidden="true" className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10 sm:left-[15px]" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: progress }}
          className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-app via-app to-data sm:left-[15px]"
        />

        {experience.map((job, i) => (
          <li key={job.company} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-8 top-6 grid h-4 w-4 place-items-center rounded-full border border-app/50 bg-ink sm:-left-12 sm:h-8 sm:w-8"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-app shadow-[0_0_12px] shadow-app sm:h-2 sm:w-2" />
            </span>

            <Reveal delay={i * 0.08}>
              <Tilt className="group glass rounded-2xl p-6 sm:p-7" max={3}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-slate-50">{job.company}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {job.role} · {job.location}
                    </p>
                  </div>
                  <p className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300">
                    <time>{job.start}</time> – <time>{job.end}</time>
                  </p>
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-300">
                  {job.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 h-1 w-3 shrink-0 rounded-full bg-app/60" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Tilt>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
