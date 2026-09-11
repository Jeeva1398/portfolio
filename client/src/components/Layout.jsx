import { lazy, Suspense } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Scene3D = lazy(() => import('./Scene3D'))

export default function Layout({ children }) {
  return (
    <>
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
      <Navbar />
      <main className="flex-1 w-full pt-16">{children}</main>
      <Footer />
    </>
  )
}
