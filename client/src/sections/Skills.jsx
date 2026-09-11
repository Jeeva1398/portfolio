import { skillGroups } from '../data/content'
import SkillGroup from '../components/SkillGroup'
import Reveal from '../components/Reveal'

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <Reveal>
        <h2 className="text-3xl font-bold text-slate-50">Skills</h2>
        <p className="mt-2 max-w-2xl text-slate-400">
          Proven skills come from shipped, production work. Skills marked <em>Building</em> are ones
          I&apos;m actively developing as I move toward DevOps and data engineering.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.05}>
            <SkillGroup group={group} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
