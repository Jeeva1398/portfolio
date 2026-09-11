export default function SkillGroup({ group }) {
  const isBuilding = group.status === 'building'
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-100">{group.title}</h3>
        {isBuilding && (
          <span className="rounded bg-amber-400/10 px-2 py-0.5 text-xs font-medium text-amber-400">
            Building
          </span>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className={`rounded-md px-2.5 py-1 text-sm ${
              isBuilding ? 'bg-amber-400/10 text-amber-300' : 'bg-white/5 text-slate-300'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
