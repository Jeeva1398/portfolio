import Layout from './components/Layout'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Architecture from './sections/Architecture'
import Resume from './sections/Resume'
import Contact from './sections/Contact'

export default function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Architecture />
      <Resume />
      <Contact />
    </Layout>
  )
}
