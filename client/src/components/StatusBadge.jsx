const STYLES = {
  'In progress': 'border-build/30 bg-build/10 text-build',
  Planned: 'border-slate-400/30 bg-slate-400/10 text-slate-300',
  Completed: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  Live: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  Building: 'border-build/30 bg-build/10 text-build',
  Proven: 'border-emerald-400/25 bg-emerald-400/5 text-emerald-300',
  Professional: 'border-white/15 bg-white/5 text-slate-300',
}

export default function StatusBadge({ status }) {
  const pulsing = status === 'In progress' || status === 'Building'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider ${
        STYLES[status] ?? STYLES.Professional
      }`}
    >
      {pulsing && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-build opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-build" />
        </span>
      )}
      {status}
    </span>
  )
}
