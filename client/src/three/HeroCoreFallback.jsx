// Static 2D version of the hero "system core" for mobile, low-power devices, and reduced motion.
const APP = '#22d3ee'
const DATA = '#a78bfa'

function Tag({ x, y, color, children }) {
  return (
    <text x={x} y={y} fill={color} fontSize="11" textAnchor="middle" className="font-mono" letterSpacing="0.05em">
      {children}
    </text>
  )
}

export default function HeroCoreFallback() {
  return (
    <svg
      viewBox="0 0 420 320"
      className="h-full w-full"
      role="img"
      aria-label="Diagram: a React client calls a Node and Express API backed by MongoDB and MySQL; application data flows through a Python, Airflow and dbt pipeline into a Postgres warehouse."
    >
      <defs>
        <linearGradient id="bridge" x1="0" x2="1">
          <stop offset="0" stopColor={APP} />
          <stop offset="1" stopColor={DATA} />
        </linearGradient>
      </defs>

      <g fill="none" strokeWidth="1.5" strokeDasharray="4 6" className="[animation:dash_3s_linear_infinite]">
        <path d="M60 60 Q 95 70 110 110" stroke={APP} opacity="0.6" />
        <path d="M140 170 L 140 205" stroke={APP} opacity="0.6" />
        <path d="M175 235 Q 225 250 255 185" stroke="url(#bridge)" opacity="0.7" />
        <path d="M270 90 Q 310 110 330 140" stroke={DATA} opacity="0.6" />
        <path d="M280 175 Q 305 170 318 165" stroke={DATA} opacity="0.6" />
        <path d="M265 250 Q 310 235 335 200" stroke={DATA} opacity="0.6" />
      </g>

      {/* app cluster */}
      <circle cx="50" cy="52" r="9" fill="#0b1324" stroke={APP} strokeWidth="2" />
      <Tag x={50} y={32} color={APP}>react client</Tag>
      {[110, 132, 154].map((y, i) => (
        <g key={y}>
          <rect x="95" y={y} width="90" height="16" rx="4" fill="#0b1324" stroke={APP} strokeOpacity={i === 1 ? 0.9 : 0.45} />
          <rect x="160" y={y + 6} width="14" height="3" rx="1.5" fill={APP} />
        </g>
      ))}
      <Tag x={140} y={100} color={APP}>node / express api</Tag>
      <ellipse cx="140" cy="215" rx="30" ry="8" fill="#0b1324" stroke={APP} strokeOpacity="0.7" />
      <path d="M110 215 v18 a30 8 0 0 0 60 0 v-18" fill="#0b1324" stroke={APP} strokeOpacity="0.7" />
      <Tag x={140} y={262} color={APP}>mongodb · mysql</Tag>

      {/* data cluster */}
      {[
        [262, 82],
        [270, 178],
        [258, 252],
      ].map(([x, y]) => (
        <path key={`${x}-${y}`} d={`M${x} ${y - 11} L${x + 11} ${y} L${x} ${y + 11} L${x - 11} ${y} Z`} fill="#1e1036" stroke={DATA} strokeWidth="1.5" />
      ))}
      <Tag x={262} y={62} color={DATA}>python extract</Tag>
      <Tag x={258} y={282} color={DATA}>airflow · dbt</Tag>
      <rect x="318" y="135" width="72" height="72" rx="6" fill={DATA} fillOpacity="0.08" stroke={DATA} strokeWidth="1.5" />
      <rect x="340" y="157" width="28" height="28" rx="3" fill="#1e1036" stroke={DATA} />
      <Tag x={354} y={228} color={DATA}>postgres warehouse</Tag>

      <style>{`@keyframes dash { to { stroke-dashoffset: -40; } }`}</style>
    </svg>
  )
}
