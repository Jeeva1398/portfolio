import { MotionConfig } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import { ScrollProgress } from './Motion'

export default function Layout({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-fg"
      >
        Skip to content
      </a>

      <div aria-hidden="true" className="grain" />
      <ScrollProgress />

      <Navbar />
      <main id="main" className="w-full flex-1 overflow-x-clip">
        {children}
      </main>
      <Footer />
    </MotionConfig>
  )
}
