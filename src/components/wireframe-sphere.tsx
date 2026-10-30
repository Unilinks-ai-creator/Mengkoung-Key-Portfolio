type Props = {
  size?: number;
  className?: string;
  stroke?: string;
  strokeOpacity?: number;
};

const round = (n: number) => Math.round(n * 1000) / 1000;

export function WireframeSphere({
  size = 480,
  className = "",
  stroke = "currentColor",
  strokeOpacity = 0.35,
}: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 1;

  const meridians = 14;
  const parallels = 9;

  const meridianPaths = Array.from({ length: meridians }, (_, i) => {
    const t = i / meridians;
    const rx = round(Math.abs(Math.cos(t * Math.PI)) * r);
    return (
      <ellipse
        key={`m-${i}`}
        cx={cx}
        cy={cy}
        rx={rx}
        ry={r}
        fill="none"
        stroke={stroke}
        strokeOpacity={strokeOpacity}
        strokeWidth={0.6}
      />
    );
  });

  const parallelPaths = Array.from({ length: parallels }, (_, i) => {
    const t = (i + 1) / (parallels + 1);
    const y = round(cy - r + t * 2 * r);
    const rx = round(Math.sqrt(Math.max(0, r * r - (y - cy) * (y - cy))));
    return (
      <ellipse
        key={`p-${i}`}
        cx={cx}
        cy={y}
        rx={rx}
        ry={round(rx * 0.18)}
        fill="none"
        stroke={stroke}
        strokeOpacity={strokeOpacity}
        strokeWidth={0.6}
      />
    );
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="img"
      aria-label="Wireframe sphere"
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={stroke}
        strokeOpacity={strokeOpacity + 0.15}
        strokeWidth={0.8}
      />
      {meridianPaths}
      {parallelPaths}
    </svg>
  );
}
