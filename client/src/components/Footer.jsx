import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[76rem] flex-col gap-4 px-4 py-10 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. Built with React and three.js.
        </p>
        <ul className="flex items-center gap-6">
          <li>
            <a href={`mailto:${profile.email}`} className="transition-colors hover:text-fg">
              Email
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
