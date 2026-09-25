import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/content'
import useActiveSection from '../hooks/useActiveSection'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'contact', label: 'Contact' },
]

const sectionIds = links.map((link) => link.id)

export default function Navbar() {
  const activeId = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || menuOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid
          ? 'border-b border-white/10 bg-ink/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="group flex items-center gap-2 font-display font-semibold tracking-tight text-slate-100">
          <span
            aria-hidden="true"
            className="grid h-7 w-7 place-items-center rounded-md border border-white/15 bg-gradient-to-br from-app/25 to-data/25 font-mono text-xs"
          >
            J
          </span>
          {profile.shortName}
          <span className="font-mono text-sm font-normal text-slate-500">.dev</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={activeId === link.id ? 'true' : undefined}
                className={`relative block px-3 py-2 text-sm font-medium transition-colors ${
                  activeId === link.id ? 'text-slate-50' : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {link.label}
                {activeId === link.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-app to-data"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`/${profile.resumeFile}`}
          download
          className="hidden rounded-md border border-white/15 px-3 py-1.5 text-sm font-medium text-slate-200 transition-colors hover:border-app/50 hover:text-app lg:inline-flex"
        >
          Resume
        </a>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-200 lg:hidden"
        >
          <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-white/10 lg:hidden"
          >
            <ul className="flex flex-col px-4 py-2">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-3 text-sm font-medium ${
                      activeId === link.id ? 'text-slate-50' : 'text-slate-400'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`/${profile.resumeFile}`} download className="block py-3 text-sm font-medium text-app">
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
