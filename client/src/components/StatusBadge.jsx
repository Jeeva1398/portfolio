// Plain square-cornered tag. Only "Live" gets colour, because it is the one status a visitor can act on.
export default function StatusBadge({ status }) {
  const live = status === 'Live'
  return (
    <span
      className={`inline-flex items-center rounded-[4px] border px-1.5 py-0.5 font-mono text-[0.6875rem] ${
        live ? 'border-ok/40 text-ok' : 'border-line-strong text-subtle'
      }`}
    >
      {status}
    </span>
  )
}
