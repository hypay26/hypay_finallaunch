import { motion, type Variants } from "framer-motion";
import { DottedGlobe } from "../primitives/DottedGlobe";
import { OrbitArc } from "../primitives/OrbitArc";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

export function GlobalAvailability() {
  return (
    <div className="relative grid h-full w-full grid-cols-12 items-center gap-6 px-8 pt-16 md:px-14">
      {/* left */}
      <motion.div
        className="col-span-4 flex flex-col gap-4"
        variants={fadeUp}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="text-[64px] font-medium leading-none tracking-tight md:text-[80px]">
          HIGH
        </div>
        <p className="text-[13px] text-muted-foreground">
          average hidden markup
          <br />
          travelers pay per transaction
        </p>
        {/* <div
          className="mt-3 h-14 w-14 rounded-full border"
          style={{
            borderColor: "oklch(1 0 0 / 0.2)",
            background:
              "conic-gradient(oklch(0.72 0.22 145) 0deg, oklch(0.72 0.22 145) 360deg, transparent 0deg)",
            padding: 2,
          }}
        >
          <div className="h-full w-full rounded-full" style={{ background: "var(--gradient-screen)" }} />
        </div>
        <div className="mt-auto text-[10px] tracking-[0.3em] text-muted-foreground">
          [ 03 / 03 ]
        </div> */}
      </motion.div>

      {/* center globe with orbits */}
      <motion.div
        className="col-span-5 flex items-center justify-center"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.05, opacity: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <div className="relative">
          <DottedGlobe size={320} perRing={60} rings={20} />
          <div className="absolute inset-0" style={{ transform: "scale(1.15)" }}>
            <OrbitArc size={320} rx={200} ry={55} rotate={-18} duration={4.5} />
            <OrbitArc size={320} rx={200} ry={55} rotate={22} duration={5.5} reverse delay={1} />
          </div>
        </div>
      </motion.div>

      {/* right paragraph */}
      <motion.div
        className="col-span-3"
        variants={fadeUp}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <p className="text-[11px] leading-relaxed text-muted-foreground md:text-[12px]">
          International wire transfers and card payments abroad are slow,
          expensive, and opaque. HYPAY is built to make moving money across
          borders as simple as sending a message — transparent fees, instant
          confirmation, no matter where you are.
        </p>
      </motion.div>

      {/* bottom pill */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div
          className="flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] tracking-[0.2em] text-muted-foreground"
          style={{ borderColor: "oklch(1 0 0 / 0.1)", background: "oklch(0.2 0.02 145 / 0.6)" }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "oklch(0.72 0.22 145)", boxShadow: "0 0 8px oklch(0.72 0.22 145)" }}
          />
          LAUNCHING SOON
        </div>
      </div>
    </div>
  );
}