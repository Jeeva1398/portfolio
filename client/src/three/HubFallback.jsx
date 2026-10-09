import { useMemo } from 'react'
import { hubLayout, toolIcons } from './toolIcons'

// The hero hub drawn in CSS 3D for phones, low-power devices, reduced motion, and while the WebGL
// scene loads. Same layout as HubScene (scene units -> --u px); the pieces assemble with CSS
// keyframes, which the global reduced-motion rule turns off.
const X0 = 3.75
const Z0 = 3.35

function place(x, z, w, h) {
  return {
    left: `calc(var(--u) * ${x + X0 - w / 2})`,
    top: `calc(var(--u) * ${z + Z0 - h / 2})`,
    width: `calc(var(--u) * ${w})`,
    height: `calc(var(--u) * ${h})`,
  }
}

function cablePath(points) {
  const [a, b, c, d] = points.map(([x, z]) => [x + X0, z + Z0])
  return `M${a[0]} ${a[1]} C${b[0]} ${b[1]} ${c[0]} ${c[1]} ${d[0]} ${d[1]}`
}

export default function HubFallback({ units, activeIndex, onHover }) {
  const { cards, tiles, columns } = useMemo(() => hubLayout(units), [units])
  const cables = [
    ...cards.map((card) => ({
      unit: card.unit,
      reverse: false,
      d: cablePath([[card.x * 0.28, -0.7], [card.x * 0.32, -1.45], [card.x, -1.45], [card.x, card.z + 0.38]]),
    })),
    ...columns.map((col) => ({
      unit: col.unit,
      reverse: true,
      d: cablePath([[col.x * 0.24, 0.7], [col.x * 0.3, 1.38], [col.x, 1.38], [col.x, 1.69]]),
    })),
  ]

  return (
    <div aria-hidden="true" className="hub-stage">
      <div className="hub-plane">
        <svg className="hub-cables" viewBox={`0 0 ${X0 * 2} ${Z0 * 2}`} preserveAspectRatio="none">
          {cables.map((c, i) => (
            <g key={i}>
              <path d={c.d} className="hub-cable" pathLength="100" />
              {c.unit === activeIndex && (
                <path d={c.d} className="hub-flow" data-reverse={c.reverse} pathLength="100" />
              )}
            </g>
          ))}
        </svg>

        <div className="hub-core hub-pop" style={{ ...place(0, 0, 2, 2), '--i': 0 }}>
          <div className="hub-core-top">JM</div>
        </div>

        {cards.map((card, i) => (
          <div
            key={card.unit}
            className="hub-block hub-pop"
            data-active={card.unit === activeIndex}
            style={{ ...place(card.x, card.z, 1.9, 0.82), '--i': 2 + i }}
            onPointerEnter={() => onHover?.(card.unit)}
          >
            <div className="iso-side-a" />
            <div className="iso-side-b" />
            <div className="hub-top">
              <span className="hub-card-label">{units[card.unit].label}</span>
            </div>
          </div>
        ))}

        {tiles.map((tile) => {
          const icon = toolIcons[tile.name]
          return (
            <div
              key={tile.name}
              className="hub-block hub-pop"
              data-active={tile.unit === activeIndex}
              style={{ ...place(tile.x, tile.z, 0.66, 0.66), '--i': 5 + tile.col + tile.row }}
              onPointerEnter={() => onHover?.(tile.unit)}
            >
              <div className="iso-side-a" />
              <div className="iso-side-b" />
              <div className="hub-top grid place-items-center">
                <svg viewBox="0 0 24 24" className="hub-icon">
                  <path d={icon.path} />
                </svg>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
