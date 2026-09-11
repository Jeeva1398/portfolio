import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/content'
import useActiveSection from '../hooks/useActiveSection'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'building', label: 'Building' },
  { id: 'contact', label: 'Contact' },
]

const sectionIds = links.map((link) => link.id)

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const activeId = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavClick = (id) => {
    scrollToSection(id)
    setMenuOpen(false)
  }

  return (
    <header className="fixed top-0 inset-x-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-lg">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <button
          onClick={() => handleNavClick('home')}
          className="font-semibold tracking-tight text-slate-100"
        >
          {profile.shortName}
          <span className="font-normal text-slate-500">.dev</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                activeId === link.id ? 'text-slate-50' : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              {link.label}
              {activeId === link.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-indigo-400 to-cyan-400"
                />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-200"
        >
          <span className="sr-only">Menu</span>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-b border-white/10 bg-slate-950/95"
          >
            <div className="flex flex-col px-4 py-2">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`py-3 text-left text-sm font-medium ${
                    activeId === link.id ? 'text-slate-50' : 'text-slate-400'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
