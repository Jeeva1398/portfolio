import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { profile } from '../data/content'
import useActiveSection from '../hooks/useActiveSection'
import ThemeToggle from './ThemeToggle'
import useAudience from '../hooks/useAudience'
import { CloseIcon, MenuIcon } from './Icons'

const links = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'contact', label: 'Contact' },
]

const sectionIds = ['home', ...links.map((link) => link.id)]

export default function Navbar() {
  const activeId = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const forClient = useAudience() === 'client'
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  const solid = scrolled || menuOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 border-b transition-[background-color,border-color] duration-300 ${
        solid ? 'border-line bg-bg/85 backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-[76rem] items-center justify-between px-4 sm:px-8">
        <a href="#home" className="text-[0.9375rem] font-semibold tracking-tight text-fg">
          {profile.name}
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {links.map((link) => {
            const active = activeId === link.id
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active ? 'true' : undefined}
                  className={`relative block rounded-md px-3 py-2 text-sm transition-colors ${
                    active ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-[13px] h-[2px] bg-accent"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {forClient ? (
            <a href="#contact" className="btn btn-primary hidden !py-2 lg:inline-flex">
              Start a project
            </a>
          ) : (
            <a href={`/${profile.resumeFile}`} download className="btn btn-ghost hidden !py-2 lg:inline-flex">
              Resume
            </a>
          )}

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="grid h-9 w-9 place-items-center rounded-md text-fg hover:bg-raised lg:hidden"
          >
            {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <ul className="flex flex-col px-4 py-3">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-3 text-base ${activeId === link.id ? 'text-fg' : 'text-muted'}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                {forClient ? (
                  <a href="#contact" onClick={() => setMenuOpen(false)} className="btn btn-primary w-full justify-center">
                    Start a project
                  </a>
                ) : (
                  <a href={`/${profile.resumeFile}`} download className="btn btn-ghost w-full justify-center">
                    Download resume
                  </a>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
