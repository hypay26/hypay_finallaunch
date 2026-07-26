import { motion } from "framer-motion";
import { useMemo } from "react";

interface Props {
  size?: number;
  rings?: number;
  perRing?: number;
}

export function DottedGlobe({ size = 620, rings = 26, perRing = 90 }: Props) {
  const dots = useMemo(() => {
    const out: { x: number; y: number; r: number; o: number }[] = [];
    const R = size / 2 - 12;
    for (let i = 1; i < rings; i++) {
      const phi = (i / rings) * Math.PI;
      const y = Math.cos(phi) * R;
      const ringR = Math.sin(phi) * R;
      const count = Math.max(6, Math.floor(perRing * Math.sin(phi)));
      for (let j = 0; j < count; j++) {
        const theta = (j / count) * Math.PI * 2;
        const x = Math.cos(theta) * ringR;
        // fake sphere shading: front dots brighter
        const front = (Math.sin(theta) + 1) / 2;
        out.push({
          x,
          y,
          r: 0.9 + front * 1.2,
          o: 0.25 + front * 0.75,
        });
      }
    }
    return out;
  }, [size, rings, perRing]);

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
    >
      {/* halo */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: "var(--gradient-globe)", filter: "blur(6px)" }}
      />
      {/* purple rim */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow:
            "inset 0 0 60px oklch(0.72 0.22 145 / 0.55), 0 0 90px oklch(0.62 0.24 145 / 0.5)",
          border: "1px solid oklch(0.72 0.22 145 / 0.35)",
        }}
      />
      <motion.svg
        width={size}
        height={size}
        viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill="oklch(0.85 0.15 145)"
            opacity={d.o}
          />
        ))}
      </motion.svg>
    </div>
  );
}