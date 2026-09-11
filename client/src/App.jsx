import Layout from './components/Layout'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Building from './sections/Building'
import Contact from './sections/Contact'

export default function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Building />
      <Contact />
    </Layout>
  )
}
