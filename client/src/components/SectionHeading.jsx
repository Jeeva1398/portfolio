import Reveal from './Reveal'

export default function SectionHeading({ index, eyebrow, title, intro, id }) {
  return (
    <Reveal className="max-w-2xl">
      <p className="font-mono text-xs tracking-wider text-app/80">
        <span className="text-slate-500">{index} //</span> {eyebrow}
      </p>
      <h2 id={id} className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 leading-relaxed text-slate-400">{intro}</p>}
    </Reveal>
  )
}
