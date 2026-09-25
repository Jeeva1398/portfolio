import { skillGroups } from '../data/content'
import SkillGroup from '../components/SkillGroup'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <SectionHeading
        index="02"
        eyebrow="skills"
        id="skills-title"
        title="Two stacks, one engineer."
        intro={
          <>
            Skills marked <span className="text-slate-200">Proven</span> come from shipped, production
            work. Skills marked <span className="text-build">Building</span> are ones I&apos;m actively developing
            as I move toward DevOps and data engineering.
          </>
        }
      />

      <div className="mt-8 flex flex-wrap gap-4 font-mono text-xs text-slate-400" aria-hidden="true">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-app" /> application stack
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-data" /> data stack
        </span>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.05} className="h-full">
            <SkillGroup group={group} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
