import { motion } from 'framer-motion'
import { audiences } from '../data/content'
import useAudience, { setAudience } from '../hooks/useAudience'

const OPTIONS = [
  { id: 'hiring', icon: 'M4 7h16v12H4zM9 7V5h6v2' },
  { id: 'client', icon: 'M12 3l2.6 5.6L20 9.3l-4 4.2 1 5.5-5-2.8-5 2.8 1-5.5-4-4.2 5.4-.7z' },
]

// "I'm hiring" / "I have a project": swaps the hero pitch, CTAs, nav button, and contact form defaults.
export default function AudienceSwitch({ className = '', compact = false }) {
  const audience = useAudience()
  return (
    <div
      role="group"
      aria-label="What brings you here?"
      className={`inline-flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur ${className}`}
    >
      {OPTIONS.map(({ id, icon }) => {
        const active = audience === id
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            onClick={() => setAudience(id)}
            className={`relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
              active ? 'text-ink' : 'text-slate-400 hover:text-slate-100'
            }`}
          >
            {active && (
              <motion.span
                layoutId={compact ? 'audience-pill-compact' : 'audience-pill'}
                className={`absolute inset-0 rounded-full ${id === 'client' ? 'bg-gradient-to-r from-ai to-data' : 'bg-gradient-to-r from-app to-data'}`}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <svg aria-hidden="true" viewBox="0 0 24 24" className="relative h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
              <path d={icon} />
            </svg>
            <span className="relative">{compact ? audiences[id].short : audiences[id].label}</span>
          </button>
        )
      })}
    </div>
  )
}
