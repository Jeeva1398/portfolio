import { motion } from 'framer-motion'
import { audiences } from '../data/content'
import useAudience, { setAudience } from '../hooks/useAudience'

const OPTIONS = ['hiring', 'client']

// "Hiring for a role" / "Have a project": swaps the hero pitch, CTAs, nav button, and contact form defaults.
export default function AudienceSwitch({ className = '' }) {
  const audience = useAudience()
  return (
    <div role="group" aria-label="What brings you here?" className={`inline-flex rounded-lg border border-line p-1 ${className}`}>
      {OPTIONS.map((id) => {
        const active = audience === id
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            onClick={() => setAudience(id)}
            className={`relative rounded-md px-3 py-1.5 text-[0.8125rem] transition-colors ${
              active ? 'text-fg' : 'text-subtle hover:text-fg'
            }`}
          >
            {active && (
              <motion.span
                layoutId="audience-pill"
                className="absolute inset-0 rounded-md bg-raised"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{audiences[id].label}</span>
          </button>
        )
      })}
    </div>
  )
}
