import { motion, type Variants } from "framer-motion";
import { DottedGlobe } from "../primitives/DottedGlobe";
import { OrbitArc } from "../primitives/OrbitArc";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

const item: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.35 } },
};

export function GlobeHero({ withNotification = false }: { withNotification?: boolean }) {
  return (
    <div className="relative h-full w-full">
      {/* ── Mobile / Tablet Layout (< lg) ── */}
      <div className="flex lg:hidden w-full flex-col items-center pt-16 pb-12 px-6 text-center">
        <motion.div
          className="relative z-30"
          variants={container}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.h1
            variants={item}
            className="text-glow text-[38px] font-medium leading-[1.05] tracking-tight sm:text-[44px]"
          >
            Move money without borders
          </motion.h1>
          <motion.p
            variants={item}
            className="mx-auto mt-4 max-w-[340px] sm:max-w-[440px] text-[13px] leading-relaxed text-muted-foreground"
          >
            Spend, pay, and move money across borders — instantly, transparently,
            and without the hidden fees you're losing today.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              className="w-full sm:w-auto rounded-full px-5 py-3 sm:px-4 sm:py-2 text-[13px] sm:text-[12px] font-medium cursor-pointer"
              style={{ background: "oklch(0.97 0.005 145)", color: "oklch(0.16 0.02 145)" }}
              onClick={() => {
                window.scrollTo({
                  top: document.documentElement.scrollHeight,
                  behavior: "smooth"
                });
              }}
            >
              Join the Waitlist →
            </button>
            <button
              className="w-full sm:w-auto rounded-full border px-5 py-3 sm:px-4 sm:py-2 text-[13px] sm:text-[12px]"
              style={{ borderColor: "oklch(1 0 0 / 0.15)" }}
            >
              Contact Sales →
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mt-12 mb-8 flex justify-center w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="relative">
            <DottedGlobe size={280} />
            <div className="pointer-events-none absolute inset-0">
              <OrbitArc size={280} rx={160} ry={40} rotate={-14} duration={5} />
            </div>
          </div>
        </motion.div>


      </div>

      {/* ── Desktop Layout (lg+) ── */}
      <div className="hidden lg:flex relative h-full w-full items-center justify-center">
        {/* globe layer — sized to fit within the device frame (~560px tall) */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <DottedGlobe size={420} />
            <div className="pointer-events-none absolute inset-0">
              <OrbitArc size={420} rx={220} ry={60} rotate={-14} duration={5} />
            </div>
          </div>
        </motion.div>

        {/* text content */}
        <motion.div
          className="relative z-30 pointer-events-auto mx-auto max-w-[540px] px-6 text-center"
          variants={container}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.h1
            variants={item}
            className="text-glow text-[52px] font-medium leading-[1.04] tracking-tight"
          >
            Move money without borders
          </motion.h1>
          <motion.p
            variants={item}
            className="mx-auto mt-4 max-w-[440px] text-[14px] leading-relaxed text-muted-foreground"
          >
            Spend, pay, and move money across borders — instantly, transparently,
            and without the hidden fees you're losing today.
          </motion.p>
          <motion.div variants={item} className="mt-6 flex items-center justify-center gap-2.5">
            <button
              className="rounded-full px-4 py-2 text-[12px] font-medium cursor-pointer"
              style={{ background: "oklch(0.97 0.005 145)", color: "oklch(0.16 0.02 145)" }}
              onClick={() => {
                window.scrollTo({
                  top: document.documentElement.scrollHeight,
                  behavior: "smooth"
                });
              }}
            >
              Join the Waitlist →
            </button>
            <button
              className="rounded-full border px-4 py-2 text-[12px]"
              style={{ borderColor: "oklch(1 0 0 / 0.15)" }}
            >
              Contact Sales →
            </button>
          </motion.div>


        </motion.div>
      </div>
    </div>
  );
}