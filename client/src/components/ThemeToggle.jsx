import { motion } from 'framer-motion'
import useTheme from '../hooks/useTheme'

const STARS = [
  [9, 7, 1.1],
  [15, 17, 0.8],
  [22, 9, 0.9],
  [29, 19, 0.7],
  [13, 12, 0.6],
]

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  const light = theme === 'light'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={light}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      title={light ? 'Night shift' : 'Day shift'}
      onClick={toggle}
      className={`relative h-8 w-[3.75rem] shrink-0 overflow-hidden rounded-full border border-white/15 transition-colors duration-500 ${
        light ? 'bg-gradient-to-b from-sky-300 to-sky-100' : 'bg-gradient-to-b from-[#0b1030] to-[#1b1446]'
      } ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 60 32" className="absolute inset-0 h-full w-full">
        <g className="transition-all duration-500" style={{ opacity: light ? 0 : 1, transform: light ? 'translateY(-6px)' : 'none' }}>
          {STARS.map(([x, y, r]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#e0e7ff" className="animate-pulse" style={{ animationDelay: `${x * 40}ms` }} />
          ))}
        </g>
        <g className="transition-all duration-500" style={{ opacity: light ? 1 : 0, transform: light ? 'none' : 'translateY(8px)' }}>
          <ellipse cx="14" cy="21" rx="7" ry="3.2" fill="#fff" />
          <ellipse cx="19" cy="19" rx="5" ry="3.6" fill="#fff" />
          <ellipse cx="25" cy="23" rx="5" ry="2.4" fill="#fff" opacity="0.85" />
        </g>
      </svg>

      <motion.span
        aria-hidden="true"
        className="absolute top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center"
        initial={false}
        animate={{ left: light ? 'calc(100% - 1.75rem)' : '0.25rem', rotate: light ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 overflow-visible">
          <defs>
            <mask id="theme-moon-cut">
              <rect width="24" height="24" fill="#fff" />
              <motion.circle r="8" fill="#000" initial={false} animate={{ cx: light ? 30 : 17, cy: light ? -6 : 7 }} transition={{ duration: 0.45 }} />
            </mask>
          </defs>
          <motion.g
            initial={false}
            animate={{ opacity: light ? 1 : 0, scale: light ? 1 : 0.4 }}
            transition={{ duration: 0.35 }}
            style={{ transformOrigin: '12px 12px' }}
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line key={deg} x1="12" y1="1.5" x2="12" y2="4" transform={`rotate(${deg} 12 12)`} />
            ))}
          </motion.g>
          <circle cx="12" cy="12" r={light ? 6 : 8} fill={light ? '#fbbf24' : '#e2e8f0'} mask="url(#theme-moon-cut)" className="transition-all duration-500" />
        </svg>
      </motion.span>
    </button>
  )
}
