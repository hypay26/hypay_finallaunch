import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { CountUp } from "../primitives/CountUp";

const EASE = [0.22, 1, 0.36, 1] as const;

type Stat = { label: string; value: ReactNode };

// Existing legacy bank features
const existingStats: Stat[] = [
  { label: "Typical bank FX fees", value: "HIGH" },
  { label: "Typical settlement delay", value: "2–5 days" },
];

// Application specific HYPAY features
const hypayStats: Stat[] = [
  { label: "Platform fee", value: "LOW" },
  { label: "Settlement time", value: "Instant" },
  { label: "Average savings per transfer", value: <CountUp to={5.7} suffix="%" format={(v) => v.toFixed(1)} /> },
  { label: "Countries supported at launch", value: "15+" },
];

const container: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
  exit: { opacity: 0 },
};

const item: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, y: -8 },
};

export function InNumbers() {
  return (
    <div className="relative h-full w-full">
      <motion.div
        className="flex h-full flex-col px-6 pt-4 pb-6 lg:px-14 lg:pt-4 lg:pb-6"
        variants={container}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-4">
          <h2 className="font-medium leading-none tracking-tight" style={{ fontSize: "var(--scene-title-lg)" }}>
            In
            <br />
            Numbers
          </h2>
          <div className="pb-1 text-right tracking-[0.3em] text-muted-foreground" style={{ fontSize: "var(--scene-label)" }}>
            THE REAL COST OF
            <br />
            CROSS-BORDER SPENDING
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 flex-1 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5 items-stretch">
          {/* Traditional Banks */}
          <motion.div
            variants={item}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4 opacity-60 backdrop-blur-sm lg:col-span-4 lg:p-5"
          >
            <div className="font-medium tracking-[0.25em] text-muted-foreground/60 uppercase mb-3" style={{ fontSize: "var(--scene-label)" }}>
              Legacy Benchmarks
            </div>
            <div className="flex flex-col gap-4 my-auto">
              {existingStats.map((s, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-muted-foreground/60" style={{ fontSize: "var(--scene-label)" }}>
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full border"
                      style={{
                        borderColor: "oklch(0.5 0.05 25 / 0.4)",
                        background: "oklch(0.4 0.05 25 / 0.15)",
                      }}
                    />
                    {s.label}
                  </div>
                  <div className="font-medium tracking-tight text-zinc-400" style={{ fontSize: "var(--scene-stat-lg)" }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* HYPAY Advantage */}
          <motion.div
            variants={item}
            className="flex flex-col justify-between rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.04] p-4 opacity-100 backdrop-blur-md shadow-[0_0_35px_rgba(16,185,129,0.06)] lg:col-span-8 lg:p-5"
          >
            <div className="font-medium tracking-[0.25em] text-emerald-400/90 uppercase mb-3 flex items-center gap-2" style={{ fontSize: "var(--scene-label)" }}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
              HYPAY Advantage
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 my-auto lg:gap-x-8 lg:gap-y-4">
              {hypayStats.map((s, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-zinc-200" style={{ fontSize: "var(--scene-label)" }}>
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full border"
                      style={{
                        borderColor: "oklch(0.85 0.15 145 / 0.9)",
                        background: "oklch(0.72 0.22 145 / 0.5)",
                        boxShadow: "0 0 8px oklch(0.72 0.22 145)",
                      }}
                    />
                    {s.label}
                  </div>
                  <div className="font-medium tracking-tight text-white" style={{ fontSize: "var(--scene-stat-xl)" }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}