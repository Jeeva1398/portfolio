export default function ProjectCard({ project, onSelect }) {
  return (
    <button
      onClick={() => onSelect(project)}
      className="group block h-full w-full rounded-xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur transition-all hover:border-white/20 hover:bg-white/[0.07]"
    >
      <span className="inline-block rounded bg-indigo-400/10 px-2 py-1 text-xs font-medium uppercase tracking-wide text-indigo-300">
        {project.domain}
      </span>
      <h3 className="mt-3 text-lg font-semibold text-slate-100 group-hover:text-cyan-300">
        {project.name}
      </h3>
      <p className="mt-2 text-sm text-slate-400">{project.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span key={tech} className="rounded bg-white/5 px-2 py-0.5 text-xs text-slate-400">
            {tech}
          </span>
        ))}
      </div>
      <span className="mt-4 inline-block text-sm font-medium text-cyan-400 group-hover:underline">
        View details &rarr;
      </span>
    </button>
  )
}
