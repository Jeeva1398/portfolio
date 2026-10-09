import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { experience } from '../data/content'
import SectionHeading from '../components/SectionHeading'
import { Dash, Rise3D, Stagger, StaggerItem } from '../components/Motion'

export default function Experience() {
  const listRef = useRef(null)
  // The accent rail fills down the timeline as you read through it
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <SectionHeading id="experience-title" title="Two product teams, one release cycle end to end." />

      <ol ref={listRef} className="relative mt-16 pl-8 md:pl-10">
        <span aria-hidden="true" className="absolute inset-y-0 left-[3px] w-px bg-line" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: fill }}
          className="absolute inset-y-0 left-[3px] w-px origin-top bg-accent"
        />
        {experience.map((job, i) => (
          <Rise3D as="li" key={job.company} delay={i * 0.06} tilt={10} className="relative grid gap-6 border-t border-line py-10 md:grid-cols-[14rem_1fr] md:gap-12">
            <motion.span
              aria-hidden="true"
              className="absolute -left-8 top-11 h-[7px] w-[7px] rounded-full border border-accent bg-bg md:-left-10"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1, backgroundColor: 'var(--color-accent)' }}
              viewport={{ once: true, margin: '-45% 0px -45% 0px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            />
            <div>
              <p className="font-mono text-[0.8125rem] text-subtle tabular-nums">
                <time>{job.start}</time> to <time>{job.end}</time>
              </p>
              <p className="mt-1 text-sm text-subtle">{job.location}</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold tracking-[-0.02em] text-fg">{job.company}</h3>
              <p className="mt-1 text-muted">{job.role}</p>
              <Stagger gap={0.08} delay={0.15} className="mt-6 max-w-[68ch] space-y-3 leading-relaxed">
                {job.bullets.map((bullet) => (
                  <StaggerItem key={bullet} x={-8} y={0} className="flex gap-3">
                    <Dash className="bg-line-strong" />
                    {bullet}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Rise3D>
        ))}
      </ol>
    </section>
  )
}
