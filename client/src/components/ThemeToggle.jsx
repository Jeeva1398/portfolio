import useTheme from '../hooks/useTheme'
import { MoonIcon, SunIcon } from './Icons'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  const light = theme === 'light'
  const Icon = light ? MoonIcon : SunIcon

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      title={light ? 'Dark mode' : 'Light mode'}
      className={`grid h-9 w-9 place-items-center rounded-md text-muted transition-colors hover:bg-raised hover:text-fg ${className}`}
    >
      <Icon className="h-[18px] w-[18px]" />
    </button>
  )
}
