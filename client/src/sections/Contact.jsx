import { profile } from '../data/content'
import ContactForm from '../components/ContactForm'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from '../components/Icons'

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon },
  { label: 'LinkedIn', value: 'linkedin.com/in/jeevaananthan-m', href: profile.linkedin, Icon: LinkedInIcon, external: true },
  { label: 'GitHub', value: 'github.com/Jeeva1398', href: profile.github, Icon: GitHubIcon, external: true },
]

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-72 max-w-3xl animate-pulse rounded-full bg-gradient-to-r from-app/10 via-transparent to-data/10 blur-3xl [animation-duration:6s]" />

      <SectionHeading
        index="07"
        eyebrow="contact"
        id="contact-title"
        title="Let's talk."
        intro="Open to backend, full-stack, and data engineering roles. Reach out directly or use the form."
      />

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <Reveal delay={0.05}>
          <ul className="space-y-3">
            {channels.map(({ label, value, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="glass group flex items-center gap-4 rounded-xl p-4 transition-colors hover:border-app/40"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 group-hover:text-app">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-slate-500">{label}</span>
                    <span className="block truncate text-sm text-slate-100">{value}</span>
                  </span>
                </a>
              </li>
            ))}
            <li className="glass flex items-center gap-4 rounded-xl p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 font-mono text-xs text-slate-300">
                ☎
              </span>
              <span>
                <span className="block font-mono text-[11px] uppercase tracking-wider text-slate-500">Phone</span>
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="text-sm text-slate-100 hover:text-app">
                  {profile.phone}
                </a>
              </span>
            </li>
            <li>
              <a
                href={`/${profile.resumeFile}`}
                download
                className="glass group flex items-center gap-4 rounded-xl p-4 transition-colors hover:border-data/40"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 group-hover:text-data">
                  <DownloadIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-slate-500">Resume</span>
                  <span className="block text-sm text-slate-100">Download PDF</span>
                </span>
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
