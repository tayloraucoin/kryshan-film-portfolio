/**
 * The laurel on a film's tile: the film-festival sign for a win (spec §4.3,
 * DEVIATIONS 2026-09-26). The decision it carries: a mark, not a trophy, star
 * or ribbon, which read as sport, ratings or corporate; drawn for this site
 * because the icon set has none. Decorative: the award's name is in the
 * tile's accessible name. Two mirrored sprigs, drawn without ids so any number
 * of tiles can carry one.
 */
export function LaurelMark({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {[undefined, "translate(24 0) scale(-1 1)"].map((mirror) => (
        <g key={mirror ?? "left"} transform={mirror}>
          <path
            d="M11.4 21.3C7.5 20.4 4.7 17 4.7 12.7c0-2.3.7-4.4 1.8-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path
            d="M0-2.5C1.15-1.3 1.15 1.3 0 2.5C-1.15 1.3-1.15-1.3 0-2.5Z"
            transform="translate(6.0 4.9) rotate(18)"
          />
          <path
            d="M0-2.5C1.15-1.3 1.15 1.3 0 2.5C-1.15 1.3-1.15-1.3 0-2.5Z"
            transform="translate(3.8 8.9) rotate(-28)"
          />
          <path
            d="M0-2.5C1.15-1.3 1.15 1.3 0 2.5C-1.15 1.3-1.15-1.3 0-2.5Z"
            transform="translate(3.5 13.4) rotate(-55)"
          />
          <path
            d="M0-2.5C1.15-1.3 1.15 1.3 0 2.5C-1.15 1.3-1.15-1.3 0-2.5Z"
            transform="translate(5.1 17.6) rotate(-80)"
          />
          <path
            d="M0-2.5C1.15-1.3 1.15 1.3 0 2.5C-1.15 1.3-1.15-1.3 0-2.5Z"
            transform="translate(7.3 9.4) rotate(38) scale(.85)"
          />
          <path
            d="M0-2.5C1.15-1.3 1.15 1.3 0 2.5C-1.15 1.3-1.15-1.3 0-2.5Z"
            transform="translate(7.5 13.6) rotate(20) scale(.85)"
          />
          <path
            d="M0-2.5C1.15-1.3 1.15 1.3 0 2.5C-1.15 1.3-1.15-1.3 0-2.5Z"
            transform="translate(9.2 17.4) rotate(-5) scale(.85)"
          />
        </g>
      ))}
    </svg>
  );
}
