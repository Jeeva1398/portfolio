import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { about, profile } from '../data/content'
import Reveal from '../components/Reveal'
import { RevealWords, Stagger, StaggerItem, Tilt } from '../components/Motion'
import profilePhoto from '../assets/profile.webp'

const facts = [
  { term: 'Experience', value: 'About 3 years, two product teams in Chennai' },
  { term: 'Domains', value: profile.domainExperience.join(', ') },
  { term: 'Based in', value: profile.location },
  { term: 'Education', value: `${about.education.degree}, ${about.education.institution}, ${about.education.years}` },
]

export default function About() {
  const photoRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ['start end', 'end start'] })
  // the cut-out photo drifts a little slower than its frame: a small depth cue, nothing more
  const y = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="grid gap-14 lg:grid-cols-[22rem_1fr] lg:gap-20">
        <Reveal>
          <figure ref={photoRef} className="lg:sticky lg:top-28">
            <Tilt max={6}>
            <div className="panel relative aspect-[4/5] overflow-hidden !bg-raised">
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg/40 to-transparent" />
              <motion.img
                style={{ y }}
                src={profilePhoto}
                alt={`${profile.name}, ${profile.role}`}
                width="423"
                height="590"
                loading="lazy"
                decoding="async"
                className="absolute inset-x-0 bottom-[-4%] mx-auto h-[104%] w-auto max-w-none"
              />
            </div>
            </Tilt>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-sm">
              <span className="font-medium text-fg">{profile.name}</span>
              <span className="text-subtle">{profile.role}</span>
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <RevealWords
            id="about-title"
            text="Backend-leaning, production-tested, now building the data layer."
            className="max-w-[20ch] text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-[2.75rem] sm:leading-[1.08]"
          />

          <div className="mt-10 max-w-[62ch] space-y-6 text-[1.0625rem] leading-relaxed">
            <Reveal>
              <p className="text-xl leading-relaxed text-fg">{about.summary}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>{about.domainParagraph}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>{about.direction}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-[0.9375rem] text-subtle">{about.pivotNote}</p>
            </Reveal>
          </div>

          <Stagger as="dl" gap={0.08} className="mt-14 grid gap-4 sm:grid-cols-2">
            {facts.map((fact) => (
              <StaggerItem as="div" key={fact.term} y={20} className="panel panel-lift p-5">
                <dt className="text-sm text-subtle">{fact.term}</dt>
                <dd className="mt-1.5 text-[0.9375rem] text-fg">{fact.value}</dd>
              </StaggerItem>
            ))}
            <StaggerItem as="div" y={20} className="rounded-xl border border-accent/30 bg-accent-soft p-5 sm:col-span-2">
              <dt className="text-sm text-accent">Currently</dt>
              <dd className="mt-1.5 max-w-[62ch] text-[0.9375rem] text-fg">{about.currently}</dd>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </section>
  )
}
