import { motion } from 'framer-motion'
import { profile } from '../data/content'
import avatar from '../assets/avatar-placeholder.svg'

export default function Hero() {
  return (
    <section id="home" className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl flex-col justify-center gap-16 px-4 py-16 sm:px-6">
      <div className="grid w-full items-center gap-10 md:grid-cols-[1fr_auto]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <p className="mb-3 text-sm font-medium text-cyan-400">{profile.positioning}</p>
          <h1 className="bg-gradient-to-r from-slate-50 via-slate-100 to-slate-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg text-slate-400">
            {profile.role} &middot; {profile.location}
          </p>
          <p className="mt-6 max-w-2xl leading-relaxed text-slate-300">{profile.pitch}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center rounded-md bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-transform hover:scale-[1.03]"
            >
              View Projects
            </a>
            <a
              href={`/${profile.resumeFile}`}
              download
              className="inline-flex items-center rounded-md border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-md border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/5"
            >
              Contact
            </a>
          </div>

          <a
            href="#building"
            className="mt-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
            {profile.currentlyBuildingTeaser}
          </a>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          src={avatar}
          alt={profile.name}
          className="mx-auto h-40 w-40 rounded-2xl object-cover shadow-xl shadow-black/40 ring-1 ring-white/10 sm:h-56 sm:w-56"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid gap-4 sm:grid-cols-2"
      >
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <h2 className="mb-2 text-sm font-semibold text-slate-100">Core stack</h2>
          <p className="text-sm text-slate-400">{profile.coreStack.join(' · ')}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <h2 className="mb-2 text-sm font-semibold text-slate-100">Domain experience</h2>
          <p className="text-sm text-slate-400">{profile.domainExperience.join(' · ')}</p>
        </div>
      </motion.div>
    </section>
  )
}
