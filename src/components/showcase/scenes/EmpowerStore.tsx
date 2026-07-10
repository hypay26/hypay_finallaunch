import { motion, type Variants } from "framer-motion";
import { Starfield } from "../primitives/Starfield";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

// Abstract "movement across distance" — thin glowing line
// tracing between pulsing city nodes. No labels, no geography.
const NODES = [
  { x: 60, y: 190 },
  { x: 175, y: 90 },
  { x: 310, y: 150 },
  { x: 430, y: 70 },
  { x: 545, y: 175 },
];

function buildPath(pts: { x: number; y: number }[]) {
  if (pts.length === 0) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const cur = pts[i];
    const mx = (prev.x + cur.x) / 2;
    // gently arcing control points for a soft, orbital feel
    d += ` C ${mx} ${prev.y - 40}, ${mx} ${cur.y - 40}, ${cur.x} ${cur.y}`;
  }
  return d;
}

function RouteMap() {
  const d = buildPath(NODES);
  return (
    <svg
      viewBox="0 0 600 260"
      className="h-full w-full overflow-visible"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="route-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.85 0.15 305)" stopOpacity="0" />
          <stop offset="60%" stopColor="oklch(0.9 0.15 305)" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <path id="route-path" d={d} />
      </defs>

      {/* faint base line */}
      <use
        href="#route-path"
        fill="none"
        stroke="oklch(0.72 0.22 305 / 0.25)"
        strokeWidth="1"
      />

      {/* glowing traveling stroke */}
      <motion.use
        href="#route-path"
        fill="none"
        stroke="url(#route-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="140 900"
        initial={{ strokeDashoffset: 1040 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ filter: "drop-shadow(0 0 6px oklch(0.85 0.15 305))" }}
      />

      {/* traveling dot */}
      <circle
        r="4"
        fill="white"
        style={{ filter: "drop-shadow(0 0 8px oklch(0.9 0.15 305))" }}
      >
        <animateMotion dur="5s" repeatCount="indefinite">
          <mpath href="#route-path" />
        </animateMotion>
      </circle>

      {/* pulsing city nodes */}
      {NODES.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x}
            cy={n.y}
            r="3"
            fill="oklch(0.9 0.15 305)"
            style={{ filter: "drop-shadow(0 0 6px oklch(0.9 0.15 305))" }}
          />
          <circle
            cx={n.x}
            cy={n.y}
            r="3"
            fill="none"
            stroke="oklch(0.85 0.15 305)"
            strokeWidth="1.2"
            opacity="0.6"
          >
            <animate
              attributeName="r"
              values="3;16;3"
              dur="2.6s"
              begin={`${i * 0.4}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.6;0;0.6"
              dur="2.6s"
              begin={`${i * 0.4}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}

export function EmpowerStore() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Starfield count={80} className="opacity-70" />

      <div className="relative z-10 grid h-full grid-cols-12 items-center gap-6 px-8 pt-16 md:px-14">
        {/* left copy */}
        <motion.div className="col-span-5" variants={fadeUp} initial="initial" animate="animate" exit="exit">
          <div className="mb-3 text-[10px] tracking-[0.3em] text-muted-foreground">THE PROBLEM</div>
          <h2 className="text-[46px] font-medium leading-[1.02] tracking-tight md:text-[56px]">
            The old way of
            <br />
            paying abroad
            <br />
            is broken
          </h2>
          <p className="mt-4 max-w-[340px] text-[13px] text-muted-foreground">
            Cash, cards, and a dozen apps — each with its own fees, delays,
            and blind spots. Merchants wait days to get paid. Travelers overpay
            without knowing it. It's time for one app that just works,
            everywhere.
          </p>
          <button
            className="mt-5 rounded-full border px-4 py-2 text-[12px]"
            style={{ borderColor: "oklch(1 0 0 / 0.15)" }}
          >
            See the Difference →
          </button>
        </motion.div>

        {/* right — abstract route/map */}
        <motion.div
          className="col-span-7 relative flex h-full items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="relative w-full max-w-[560px]">
            {/* soft ambient glow behind the route */}
            <div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, oklch(0.72 0.22 305 / 0.25), transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            <RouteMap />
          </div>
        </motion.div>
      </div>
    </div>
  );
}