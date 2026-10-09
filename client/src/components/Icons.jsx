import {
  AppWindow,
  ArrowRight,
  ArrowUpRight,
  Browsers,
  ChartLineUp,
  ChatCircleDots,
  Database,
  DownloadSimple,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  List,
  Moon,
  Plugs,
  Sparkle,
  Sun,
  X,
} from '@phosphor-icons/react'

// One icon family (Phosphor) at one weight across the site.
export const ArrowIcon = (props) => <ArrowRight weight="regular" aria-hidden="true" {...props} />
export const ExternalIcon = (props) => <ArrowUpRight weight="regular" aria-hidden="true" {...props} />
export const DownloadIcon = (props) => <DownloadSimple weight="regular" aria-hidden="true" {...props} />
export const MailIcon = (props) => <EnvelopeSimple weight="regular" aria-hidden="true" {...props} />
export const GitHubIcon = (props) => <GithubLogo weight="regular" aria-hidden="true" {...props} />
export const LinkedInIcon = (props) => <LinkedinLogo weight="regular" aria-hidden="true" {...props} />
export const MenuIcon = (props) => <List weight="regular" aria-hidden="true" {...props} />
export const CloseIcon = (props) => <X weight="regular" aria-hidden="true" {...props} />
export const MoonIcon = (props) => <Moon weight="regular" aria-hidden="true" {...props} />
export const SunIcon = (props) => <Sun weight="regular" aria-hidden="true" {...props} />

// Section glyphs: one per service and skill track, shown in an accent tile.
export const TRACK_ICONS = {
  webapps: Browsers,
  backend: Plugs,
  ai: ChatCircleDots,
  data: ChartLineUp,
  app: AppWindow,
  db: Database,
  spark: Sparkle,
}

export function IconTile({ icon: Glyph, className = '' }) {
  return (
    <span aria-hidden="true" className={`grid h-11 w-11 place-items-center rounded-md bg-accent-soft text-accent ${className}`}>
      <Glyph weight="regular" className="h-[1.375rem] w-[1.375rem]" />
    </span>
  )
}
