import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import StatusBadge from './StatusBadge'
import { ArrowIcon, ExternalIcon, GitHubIcon } from './Icons'
import { companyLine } from '../lib/projects'
import { Dash, Stagger, StaggerItem, Tilt } from './Motion'

// The screenshot starts tipped back like a monitor seen from above and stands up as it scrolls
// into view. It is the one 3D move on the cards, and it ends flat so the screenshot is readable.
function Screen({ image, large }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center 55%'] })
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })
  const rotateX = useTransform(p, [0, 1], [large ? 22 : 16, 0])
  const scale = useTransform(p, [0, 1], [0.92, 1])
  const shadow = useTransform(p, [0, 1], [0.1, 0.35])
  const boxShadow = useTransform(shadow, (a) => `0 30px 60px -30px rgb(0 0 0 / ${a})`)
  // Inside the frame the screenshot drifts a little against the scroll, like a window onto the app
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(pass, [0, 1], ['0%', '-5%'])

  return (
    <div ref={ref} className="[perspective:1400px]">
      <motion.div
        style={reduce ? undefined : { rotateX, scale, boxShadow, transformOrigin: '50% 100%' }}
        className="overflow-hidden rounded-lg border border-line bg-raised"
      >
        <div className="aspect-video overflow-hidden">
          <motion.img
            style={reduce ? undefined : { y: imageY }}
            src={image.src}
            alt={image.alt}
            width="1440"
            height="810"
            loading="lazy"
            decoding="async"
            className="h-[106%] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          />
        </div>
      </motion.div>
    </div>
  )
}

function Links({ project }) {
  const { demo, repo, demoLabel } = project.links ?? {}
  if (!demo && !repo) return null
  return (
    <div className="relative z-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      {demo && (
        <a href={demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-fg hover:text-accent">
          {demoLabel ? 'On npm' : 'Open live'}
          <ExternalIcon className="h-3.5 w-3.5" />
          <span className="sr-only"> - {project.name} (opens in a new tab)</span>
        </a>
      )}
      {repo && (
        <a href={repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
          <GitHubIcon className="h-4 w-4" />
          Code<span className="sr-only"> for {project.name} on GitHub (opens in a new tab)</span>
        </a>
      )}
    </div>
  )
}

// Own products: screenshot on top, text underneath. `large` is the featured one at full width.
export function ProductCard({ project, onSelect, large = false }) {
  return (
    <article className="group">
      {project.image && (
        <Tilt max={large ? 3 : 5}>
          <Screen image={project.image} large={large} />
        </Tilt>
      )}
      <div className={`mt-7 grid gap-6 ${large ? 'md:grid-cols-[1.2fr_1fr] md:gap-12' : ''}`}>
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className={`font-semibold tracking-[-0.02em] text-fg ${large ? 'text-3xl' : 'text-2xl'}`}>{project.name}</h3>
            <StatusBadge status={project.status} />
          </div>
          <p className="mt-1 text-sm text-subtle">{project.domain}</p>
          <p className="mt-4 max-w-[58ch] leading-relaxed">{project.tagline}</p>
        </div>
        <div className="flex flex-col gap-5">
          {project.highlights && (
            <Stagger gap={0.08} delay={0.1} className="space-y-2 text-[0.9375rem] text-fg">
              {project.highlights.map((item) => (
                <StaggerItem key={item} x={-8} y={0} className="flex gap-3">
                  <Dash />
                  {item}
                </StaggerItem>
              ))}
            </Stagger>
          )}
          <p className="font-mono text-[0.75rem] leading-relaxed text-subtle">{project.stack.join(', ')}</p>
          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3">
            <button type="button" onClick={() => onSelect(project)} className="btn btn-ghost group/btn !py-2">
              How it works<span className="sr-only">: {project.name}</span>
              <ArrowIcon className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
            </button>
            <Links project={project} />
          </div>
        </div>
      </div>
    </article>
  )
}

// Client and employer work: no public links or screenshots, so a plain row.
export function WorkRow({ project, onSelect }) {
  return (
    <li className="group relative grid gap-3 border-t border-line py-7 transition-colors md:grid-cols-[1.3fr_1fr_auto] md:items-baseline md:gap-10">
      <div>
        <h3 className="text-lg font-medium text-fg">{project.name}</h3>
        <p className="mt-1 text-sm text-subtle">{companyLine(project)}</p>
      </div>
      <p className="text-[0.9375rem] leading-relaxed">{project.tagline}</p>
      <button
        type="button"
        onClick={() => onSelect(project)}
        className="inline-flex items-center gap-1.5 text-sm text-fg after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
      >
        Details<span className="sr-only">: {project.name}</span>
        <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </li>
  )
}
