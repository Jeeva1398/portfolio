import { useCallback, useSyncExternalStore } from 'react'

const KEY = 'theme'
const root = () => document.documentElement

const read = () => (root().dataset.theme === 'light' ? 'light' : 'dark')

function subscribe(callback) {
  const observer = new MutationObserver(callback)
  observer.observe(root(), { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

function apply(theme) {
  root().dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f1f1f3' : '#0f0f10')
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    // storage blocked: the choice just won't persist
  }
}

export default function useTheme() {
  const theme = useSyncExternalStore(subscribe, read, () => 'dark')

  // The new theme spreads out from the toggle as a growing circle.
  const toggle = useCallback((event) => {
    const next = read() === 'dark' ? 'light' : 'dark'
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduce) {
      apply(next)
      return
    }
    const rect = event?.currentTarget?.getBoundingClientRect()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
    const y = rect ? rect.top + rect.height / 2 : 0
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    const transition = document.startViewTransition(() => apply(next))
    transition.ready.then(() => {
      root().animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }, [])

  return { theme, toggle }
}
