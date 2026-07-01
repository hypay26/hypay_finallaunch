import { motion } from "framer-motion";

interface Props {
  size?: number;
  rx?: number;
  ry?: number;
  rotate?: number;
  duration?: number;
  delay?: number;
  reverse?: boolean;
}

export function OrbitArc({
  size = 620,
  rx = 340,
  ry = 120,
  rotate = -20,
  duration = 6,
  delay = 0,
  reverse = false,
}: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const pathId = `orbit-${rx}-${ry}-${rotate}-${reverse ? "r" : "f"}`;
  const circumference = Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));

  return (
    <svg
      width={size}
      height={size}
      className="absolute inset-0 overflow-visible"
      style={{ pointerEvents: "none" }}
    >
      <defs>
        <linearGradient id={`${pathId}-grad`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.85 0.15 305)" stopOpacity="0" />
          <stop offset="60%" stopColor="oklch(0.9 0.15 305)" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <path
          id={pathId}
          d={`M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 ${reverse ? 0 : 1} ${rx * 2} 0 a ${rx} ${ry} 0 1 ${reverse ? 0 : 1} ${-rx * 2} 0`}
          transform={`rotate(${rotate} ${cx} ${cy})`}
        />
      </defs>

      <use
        href={`#${pathId}`}
        fill="none"
        stroke="oklch(0.72 0.22 305 / 0.25)"
        strokeWidth="1"
      />

      <motion.use
        href={`#${pathId}`}
        fill="none"
        stroke={`url(#${pathId}-grad)`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={`${circumference * 0.18} ${circumference}`}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: 0 }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ filter: "drop-shadow(0 0 6px oklch(0.85 0.15 305))" }}
      />

      <circle r="5" fill="white" style={{ filter: "drop-shadow(0 0 8px oklch(0.9 0.15 305))" }}>
        <animateMotion dur={`${duration}s`} repeatCount="indefinite" begin={`${delay}s`}>
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
    </svg>
  );
}