// LottieStyleSVG: hand-built, animatable SVG "Lottie-like" icons using CSS keyframes.
// These replace heavy Lottie JSON with lightweight, dependency-free animations.

export function DropAnim({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <circle className="ring" cx="32" cy="40" r="10" fill="none" stroke="#38bdf8" strokeWidth="2" />
      <path className="drop" d="M32 12 C42 28 44 36 32 44 C20 36 22 28 32 12 Z" fill="#38bdf8" />
    </svg>
  )
}

export function GearAnim({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <g className="spin">
        <circle cx="32" cy="32" r="10" fill="none" stroke="#a78bfa" strokeWidth="3" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4
          const x = 32 + Math.cos(a) * 20
          const y = 32 + Math.sin(a) * 20
          return <rect key={i} x={x - 3} y={y - 3} width="6" height="6" rx="1.5" fill="#a78bfa" />
        })}
      </g>
    </svg>
  )
}

export function PipeAnim({ size = 40, active }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <rect x="10" y="26" width="44" height="12" rx="6" fill="none" stroke={active ? '#34d399' : '#38bdf8'} strokeWidth="3" />
      <circle cx="32" cy="32" r={active ? 6 : 4} fill={active ? '#34d399' : '#38bdf8'}>
        {active && <animate attributeName="r" values="4;7;4" dur="1.4s" repeatCount="indefinite" />}
      </circle>
    </svg>
  )
}

export function CheckAnim({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <circle cx="32" cy="32" r="26" fill="none" stroke="#34d399" strokeWidth="4" />
      <path d="M20 33 L29 42 L46 22" fill="none" stroke="#34d399" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <animate attributeName="stroke-dasharray" from="0 60" to="60 0" dur="0.5s" fill="freeze" />
      </path>
    </svg>
  )
}
