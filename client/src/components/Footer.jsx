import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-slate-950/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-4">
          <a href={`mailto:${profile.email}`} className="hover:text-slate-200">
            Email
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-slate-200">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-slate-200">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
