import { lazy, Suspense, useRef } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/content'
import Magnetic from '../components/Magnetic'
import { ArrowIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from '../components/Icons'
import HeroCoreFallback from '../three/HeroCoreFallback'
import useCapability from '../hooks/useCapability'
import useInViewport from '../hooks/useInViewport'
import profilePhoto from '../assets/profile.webp'

const HeroCore = lazy(() => import('../three/HeroCore'))

const ease = [0.21, 0.47, 0.32, 0.98]
const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
})

export default function Hero() {
  const { use3D } = useCapability()
  const visualRef = useRef(null)
  const inView = useInViewport(visualRef)
  const [appTrack, dataTrack] = profile.headline.split('|').map((part) => part.trim())

  return (
    <section id="home" aria-labelledby="hero-title" className="section flex min-h-svh flex-col justify-center !pt-28 !pb-16">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.p {...rise(0)} className="font-mono text-xs tracking-wider text-slate-400">
            <span className="text-app">~/jeeva</span> <span className="text-slate-600">$</span> whoami
          </motion.p>

          <motion.div {...rise(0.05)} className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
            <span className="avatar-ring relative grid h-20 w-20 shrink-0 place-items-center rounded-full p-[3px] sm:h-24 sm:w-24">
              <span className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-b from-app/30 via-panel to-data/30">
                <img
                  src={profilePhoto}
                  alt={`Portrait of ${profile.name}`}
                  width="423"
                  height="590"
                  fetchPriority="high"
                  className="absolute left-1/2 top-[-20%] w-[135%] max-w-none -translate-x-1/2"
                />
              </span>
            </span>
            <h1
              id="hero-title"
              className="font-display text-[2.5rem] leading-[1.05] font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-[2.75rem] xl:text-5xl"
            >
              {profile.name}
            </h1>
          </motion.div>

          <motion.p {...rise(0.12)} className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-lg sm:text-xl">
            <span className="text-app-soft">{appTrack}</span>
            <span aria-hidden="true" className="text-slate-600">
              /
            </span>
            <span className="text-data-soft">{dataTrack}</span>
          </motion.p>

          <motion.p {...rise(0.18)} className="mt-6 max-w-xl leading-relaxed text-slate-300">
            {profile.pitch}
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-app to-data px-5 py-2.5 text-sm font-semibold text-ink shadow-lg shadow-app/20 transition-shadow hover:shadow-app/40"
              >
                View Projects
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-100 transition-colors hover:border-app/50"
              >
                Contact Me
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={`/${profile.resumeFile}`}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-100 transition-colors hover:border-data/50"
              >
                <DownloadIcon className="h-4 w-4" />
                Download Resume
              </a>
            </Magnetic>
            <div className="ml-1 flex items-center gap-1">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile (opens in a new tab)"
                className="rounded-md p-2 text-slate-400 transition-colors hover:text-slate-100"
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile (opens in a new tab)"
                className="rounded-md p-2 text-slate-400 transition-colors hover:text-slate-100"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          <motion.a
            {...rise(0.3)}
            href="#projects"
            className="mt-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-build"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-build opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-build" />
            </span>
            {profile.currentlyBuildingTeaser}
          </motion.a>
        </div>

        <motion.div
          ref={visualRef}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="relative mx-auto aspect-[4/3] w-full max-w-xl lg:aspect-square"
        >
          <div aria-hidden="true" className="absolute inset-8 rounded-full bg-gradient-to-br from-app/10 to-data/10 blur-3xl" />
          {use3D ? (
            <Suspense fallback={<HeroCoreFallback />}>
              <div
                className="absolute inset-0"
                role="img"
                aria-label="Interactive 3D model: an application stack (React client, Node and Express API, MongoDB and MySQL) linked to a data pipeline (Python, Airflow, dbt) feeding a Postgres warehouse."
              >
                <HeroCore active={inView} />
              </div>
            </Suspense>
          ) : (
            <div className="absolute inset-0 p-2">
              <HeroCoreFallback />
            </div>
          )}
        </motion.div>
      </div>

      <motion.dl {...rise(0.4)} className="mt-14 grid gap-4 sm:grid-cols-3">
        <div className="glass rounded-xl p-5">
          <dt className="font-mono text-[11px] uppercase tracking-wider text-app">Core stack</dt>
          <dd className="mt-2 text-sm text-slate-300">{profile.coreStack.join(' · ')}</dd>
        </div>
        <div className="glass rounded-xl p-5">
          <dt className="font-mono text-[11px] uppercase tracking-wider text-data">Domain experience</dt>
          <dd className="mt-2 text-sm text-slate-300">{profile.domainExperience.join(' · ')}</dd>
        </div>
        <div className="glass rounded-xl p-5">
          <dt className="font-mono text-[11px] uppercase tracking-wider text-slate-400">Based in</dt>
          <dd className="mt-2 text-sm text-slate-300">{profile.location}</dd>
        </div>
      </motion.dl>
    </section>
  )
}
