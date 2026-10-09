import { audiences, profile } from '../data/content'
import useAudience from '../hooks/useAudience'
import ContactForm from '../components/ContactForm'
import Reveal from '../components/Reveal'
import { RevealWords, Rise3D } from '../components/Motion'
import { ExternalIcon } from '../components/Icons'

const channels = [
  { label: 'LinkedIn', value: 'linkedin.com/in/jeevaananthan-m', href: profile.linkedin },
  { label: 'GitHub', value: 'github.com/Jeeva1398', href: profile.github },
]

export default function Contact() {
  const audience = useAudience()
  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal>
          <RevealWords
            key={audience}
            id="contact-title"
            text={audience === 'client' ? "Let's build something." : "Let's talk."}
            className="text-4xl font-semibold tracking-[-0.035em] text-fg sm:text-6xl"
          />
          <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed">{audiences[audience].contactIntro}</p>

          <a
            href={`mailto:${profile.email}`}
            className="mt-10 inline-block text-xl text-fg underline decoration-line-strong underline-offset-[6px] transition-colors hover:decoration-accent sm:text-2xl"
          >
            {profile.email}
          </a>

          <ul className="mt-10 border-t border-line">
            {channels.map(({ label, value, href }) => (
              <li key={label} className="border-b border-line">
                <a href={href} target="_blank" rel="noreferrer" className="group flex items-baseline justify-between gap-4 py-4">
                  <span className="text-sm text-subtle">{label}</span>
                  <span className="inline-flex items-center gap-1.5 text-fg group-hover:text-accent">
                    {value}
                    <ExternalIcon className="h-3.5 w-3.5" />
                  </span>
                </a>
              </li>
            ))}
            <li className="border-b border-line">
              <a href={`/${profile.resumeFile}`} download className="group flex items-baseline justify-between gap-4 py-4">
                <span className="text-sm text-subtle">Resume</span>
                <span className="text-fg group-hover:text-accent">Download PDF</span>
              </a>
            </li>
          </ul>
        </Reveal>

        <Rise3D delay={0.08} tilt={12}>
          <div className="panel p-6 sm:p-8">
            <ContactForm />
          </div>
        </Rise3D>
      </div>
    </section>
  )
}
