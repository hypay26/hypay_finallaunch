import { useMemo } from "react";

export function Starfield({ count = 90, className = "" }: { count?: number; className?: string }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 1.4 + 0.3,
        d: Math.random() * 4 + 2,
        o: Math.random() * 0.6 + 0.2,
        delay: Math.random() * 5,
      })),
    [count],
  );
  return (
    <svg
      className={"absolute inset-0 h-full w-full " + className}
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r * 0.15} fill="white" opacity={s.o}>
          <animate
            attributeName="opacity"
            values={`${s.o};${s.o * 0.2};${s.o}`}
            dur={`${s.d}s`}
            begin={`${s.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}