import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { CountUp } from "../primitives/CountUp";

const EASE = [0.22, 1, 0.36, 1] as const;

type Stat = { label: string; value: ReactNode };

const columns: Stat[][] = [
  [
    { label: "Typical bank FX fees", value: <CountUp to={8.2} suffix="%" format={(v) => v.toFixed(1)} /> },
    { label: "Typical settlement delay", value: "2–5 days" },
  ],
  [
    { label: "HYPAY platform fee", value: <CountUp to={2.5} suffix="%" format={(v) => v.toFixed(1)} /> },
    { label: "HYPAY settlement time", value: "Instant" },
  ],
  [
    { label: "Average savings per transfer", value: <CountUp to={5.7} suffix="%" format={(v) => v.toFixed(1)} /> },
    { label: "Countries supported at launch", value: "25+" },
  ],
];

const container: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
  exit: { opacity: 0 },
};
const item: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, y: -8 },
};

export function InNumbers() {
  return (
    <div className="relative h-full w-full px-8 pt-16 md:px-14">
      <motion.div
        className="flex h-full flex-col"
        variants={container}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="text-[38px] font-medium leading-none tracking-tight md:text-[46px]">
            In
            <br />
            Numbers
          </h2>
          <div className="pb-1 text-right text-[10px] tracking-[0.3em] text-muted-foreground">
            THE REAL COST OF
            <br />
            CROSS-BORDER SPENDING
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-10 gap-y-10">
          {columns.map((col, ci) =>
            col.map((s, ri) => (
              <motion.div key={`${ci}-${ri}`} variants={item} className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full border"
                    style={{
                      borderColor:
                        ci === 1
                          ? "oklch(0.85 0.15 305 / 0.9)"
                          : "oklch(1 0 0 / 0.3)",
                      background:
                        ci === 1 ? "oklch(0.72 0.22 305 / 0.5)" : "transparent",
                      boxShadow:
                        ci === 1 ? "0 0 8px oklch(0.72 0.22 305)" : "none",
                    }}
                  />
                  {s.label}
                </div>
                <div className="text-[36px] font-medium tracking-tight md:text-[42px]">
                  {s.value}
                </div>
              </motion.div>
            )),
          )}
        </div>
      </motion.div>
    </div>
  );
}