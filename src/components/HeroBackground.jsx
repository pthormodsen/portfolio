// Circuit traces along the hero's edges, with small pulses travelling along them.
// Drawn for the left side and mirrored for the right, leaving the centre clear for text.
// Hidden below the lg breakpoint, where the text takes up the full width.
const TRACES = [
  { d: "M40 0 V90 L80 130 V210 L120 250 H210", end: [210, 250], seconds: 11, delay: 0 },
  { d: "M0 170 H30 L70 210 V300 L110 340 H300", end: [300, 340], seconds: 14, delay: 6 },
  { d: "M0 330 H50 L90 370 V430 L130 470 H240", end: [240, 470], seconds: 12, delay: 3 },
  { d: "M20 640 V540 L60 500 H130 L170 540 H340", end: [340, 540], seconds: 15, delay: 9 },
  { d: "M130 0 V50 L170 90 H320", end: [320, 90], seconds: 10, delay: 5 },
  { d: "M70 640 V610 L100 580 H420", end: [420, 580], seconds: 13, delay: 1 },
];

function CircuitSide({ className, delayOffset }) {
  return (
    <svg
      viewBox="0 0 480 640"
      preserveAspectRatio="xMinYMid slice"
      fill="none"
      className={`absolute inset-y-0 hidden h-full w-[34%] max-w-[520px] lg:block ${className}`}
      style={{
        maskImage: "linear-gradient(to right, black 45%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, black 45%, transparent)",
      }}
    >
      {TRACES.map(({ d, end, seconds, delay }) => (
        <g key={d}>
          <path d={d} stroke="#34d399" strokeOpacity="0.2" />
          <circle cx={end[0]} cy={end[1]} r="3" stroke="#34d399" strokeOpacity="0.4" />
          {/* A wide, faint copy under the pulse gives it a glow without a costly blur filter. */}
          {[
            { strokeWidth: 6, strokeOpacity: 0.18 },
            { strokeWidth: 1.5, strokeOpacity: 1 },
          ].map((stroke) => (
            <path
              key={stroke.strokeWidth}
              d={d}
              pathLength={100}
              stroke="#6ee7b7"
              {...stroke}
              className="hero-pulse"
              style={{
                animationDuration: `${seconds}s`,
                // A negative delay starts mid-cycle, so pulses are visible right away.
                animationDelay: `${-(delay + delayOffset)}s`,
              }}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

export default function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        // Fades the traces out before the section's bottom edge.
        maskImage: "linear-gradient(to bottom, black 75%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, black 75%, transparent)",
      }}
    >
      <CircuitSide className="left-0" delayOffset={0} />
      <CircuitSide className="right-0 -scale-x-100" delayOffset={4} />
    </div>
  );
}
