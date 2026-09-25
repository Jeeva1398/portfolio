import { lazy, Suspense, useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import useCapability from '../hooks/useCapability'

const BackgroundScene = lazy(() => import('../three/BackgroundScene'))

export default function Layout({ children }) {
  const { webgl, reducedMotion, isMobile } = useCapability()
  // Mount the background after first paint so it never competes with the hero content.
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = (window.requestIdleCallback ?? ((cb) => setTimeout(cb, 200)))(() => setReady(true))
    return () => (window.cancelIdleCallback ?? clearTimeout)(id)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-slate-100"
      >
        Skip to content
      </a>

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute -left-40 top-[-10%] h-[36rem] w-[36rem] rounded-full bg-app/10 blur-[120px]" />
        <div className="absolute -right-40 top-[30%] h-[32rem] w-[32rem] rounded-full bg-data/10 blur-[120px]" />
        <div className="grid-overlay absolute inset-0" />
      </div>
      {webgl && ready && (
        <Suspense fallback={null}>
          <BackgroundScene reducedMotion={reducedMotion} isMobile={isMobile} />
        </Suspense>
      )}

      <Navbar />
      <main id="main" className="w-full flex-1">
        {children}
      </main>
      <Footer />
    </MotionConfig>
  )
}
