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
    <div className="relative h-full w-full">
      {/* ── Mobile / Tablet layout (< lg) ─────────────────────── */}
      <div className="flex lg:hidden flex-col items-center gap-8 px-6 pt-12 pb-16 text-center">
        {/* Globe */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="relative">
            <DottedGlobe size={240} perRing={50} rings={18} />
            <div className="absolute inset-0" style={{ transform: "scale(1.15)" }}>
              <OrbitArc size={240} rx={150} ry={40} rotate={-18} duration={4.5} />
              <OrbitArc size={240} rx={150} ry={40} rotate={22} duration={5.5} reverse delay={1} />
            </div>
          </div>
        </motion.div>

        {/* Big stat */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col items-center gap-2"
        >
          <div className="text-[56px] sm:text-[72px] font-medium leading-none tracking-tight">
            HIGH
          </div>
          <p className="text-[13px] text-muted-foreground max-w-[260px]">
            average hidden markup travelers pay per transaction
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          exit="exit"
          className="text-[13px] leading-relaxed text-muted-foreground max-w-[340px]"
        >
          International wire transfers and card payments abroad are slow,
          expensive, and opaque. HYPAY is built to make moving money across
          borders as simple as sending a message — transparent fees, instant
          confirmation, no matter where you are.
        </motion.p>

        {/* Bottom pill */}
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

      {/* ── Desktop layout (lg+) — original 3-col grid ─────────── */}
      <div className="hidden lg:grid relative h-full w-full grid-cols-12 items-center gap-6 px-8 md:px-14">
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
            <DottedGlobe size={280} perRing={60} rings={20} />
            <div className="absolute inset-0" style={{ transform: "scale(1.15)" }}>
              <OrbitArc size={280} rx={170} ry={45} rotate={-18} duration={4.5} />
              <OrbitArc size={280} rx={170} ry={45} rotate={22} duration={5.5} reverse delay={1} />
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
    </div>
  );
}