import StatusBadge from './StatusBadge'
import Tilt from './Tilt'

const TRACK = {
  app: { label: 'Application stack', dot: 'bg-app', text: 'text-app', glare: 'rgb(34 211 238 / 0.12)', ring: 'hover:border-app/30' },
  data: { label: 'Data stack', dot: 'bg-data', text: 'text-data', glare: 'rgb(167 139 250 / 0.14)', ring: 'hover:border-data/30' },
  tools: { label: 'Workflow', dot: 'bg-slate-400', text: 'text-slate-400', glare: 'rgb(148 163 184 / 0.10)', ring: 'hover:border-white/20' },
}

export default function SkillGroup({ group }) {
  const track = TRACK[group.track] ?? TRACK.tools
  const isBuilding = group.status === 'building'

  return (
    <Tilt className={`group glass rounded-2xl p-6 transition-colors ${track.ring}`} glare={track.glare}>
      <div style={{ transform: 'translateZ(24px)' }}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider ${track.text}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${track.dot}`} aria-hidden="true" />
              {track.label}
            </p>
            <h3 className="mt-2 font-display text-lg font-semibold text-slate-100">{group.title}</h3>
          </div>
          <StatusBadge status={isBuilding ? 'Building' : 'Proven'} />
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {group.items.map((item) => (
            <li
              key={item}
              className={`chip border ${
                isBuilding ? 'border-build/20 bg-build/5 text-amber-100' : 'border-white/10 bg-white/5 text-slate-200'
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Tilt>
  )
}
