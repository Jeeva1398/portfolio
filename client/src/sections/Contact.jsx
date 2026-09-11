import { profile } from '../data/content'
import ContactForm from '../components/ContactForm'
import Reveal from '../components/Reveal'

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <Reveal>
        <h2 className="text-3xl font-bold text-slate-50">Contact</h2>
        <p className="mt-2 max-w-2xl text-slate-400">
          Open to backend and full-stack roles for the June/July 2026 cycle. Reach out directly or
          use the form below.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-12 md:grid-cols-2">
        <Reveal delay={0.05} className="space-y-4 text-sm">
          <div>
            <dt className="text-slate-500">Email</dt>
            <dd>
              <a href={`mailto:${profile.email}`} className="text-cyan-400 hover:underline">
                {profile.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Phone</dt>
            <dd>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="text-cyan-400 hover:underline">
                {profile.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">LinkedIn</dt>
            <dd>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                linkedin.com/in/jeevaananthan-m
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">GitHub</dt>
            <dd>
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">
                github.com/Jeeva1398
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Resume</dt>
            <dd>
              <a href={`/${profile.resumeFile}`} download className="text-cyan-400 hover:underline">
                Download PDF
              </a>
            </dd>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
