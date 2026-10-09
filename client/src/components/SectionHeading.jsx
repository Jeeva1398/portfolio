import Reveal from './Reveal'
import { RevealWords } from './Motion'

// Headline first, one short line under it. No numbered labels: the nav already says where you are.
export default function SectionHeading({ title, intro, id, className = '' }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <RevealWords id={id} text={title} className="text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-[2.75rem] sm:leading-[1.08]" />
      {intro && (
        <Reveal delay={0.25}>
          <p className="mt-5 max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted">{intro}</p>
        </Reveal>
      )}
    </div>
  )
}
