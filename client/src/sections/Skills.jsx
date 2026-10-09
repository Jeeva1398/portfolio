import { skillGroups } from '../data/content'
import { IconTile, TRACK_ICONS } from '../components/Icons'
import SectionHeading from '../components/SectionHeading'
import { Rise3D, Stagger, StaggerItem, Tilt } from '../components/Motion'

// Three columns, one per track. Workflow tools sit under the AI column so the columns balance.
const COLUMNS = [
  { label: 'Application', tracks: ['app'], icon: 'app' },
  { label: 'Data', tracks: ['data'], icon: 'db' },
  { label: 'AI and tooling', tracks: ['ai', 'tools'], icon: 'spark' },
]

function Group({ group }) {
  const building = group.status === 'building'
  return (
    <div className="border-t border-line pt-5">
      <h4 className="flex items-baseline justify-between gap-3">
        <span className="font-medium text-fg">{group.title}</span>
        <span className={`font-mono text-[0.6875rem] ${building ? 'text-accent' : 'text-subtle'}`}>
          {building ? 'Building' : 'Proven'}
        </span>
      </h4>
      <Stagger gap={0.03} delay={0.1} className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[0.9375rem] leading-snug">
        {group.items.map((item) => (
          <StaggerItem key={item} y={8}>
            <span className="inline-block transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-fg">{item}</span>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <SectionHeading
        id="skills-title"
        title="Full-stack, AI and data, in one engineer."
        intro={
          <>
            <span className="text-fg">Proven</span> skills come from shipped, production work.{' '}
            <span className="text-accent">Building</span> skills are ones I am actively developing in AI, data
            engineering and DevOps.
          </>
        }
      />

      <div className="mt-16 grid gap-6 md:grid-cols-3 lg:gap-8">
        {COLUMNS.map((column, i) => (
          <Rise3D key={column.label} delay={i * 0.08} className="h-full">
            <Tilt wrapperClassName="h-full" className="panel panel-lift h-full p-6 sm:p-7">
              {/* the heading sits above the card surface, so it shifts against the list as the card tilts */}
              <div className="mb-7 flex items-center gap-4 [transform:translateZ(30px)]">
                <IconTile icon={TRACK_ICONS[column.icon]} />
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-fg">{column.label}</h3>
              </div>
              <div className="space-y-7">
                {skillGroups
                  .filter((g) => column.tracks.includes(g.track))
                  .map((group) => (
                    <Group key={group.title} group={group} />
                  ))}
              </div>
            </Tilt>
          </Rise3D>
        ))}
      </div>
    </section>
  )
}
