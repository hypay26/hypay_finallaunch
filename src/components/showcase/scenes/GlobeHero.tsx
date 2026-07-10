import { AnimatePresence, motion, type Variants } from "framer-motion";
import { DottedGlobe } from "../primitives/DottedGlobe";
import { NotificationCard } from "../primitives/NotificationCard";
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
    <div className="relative flex h-full w-full items-center justify-center">
      {/* globe layer */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.05, opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative">
          <DottedGlobe size={640} />
          <div className="pointer-events-none absolute inset-0">
            <OrbitArc size={640} rx={340} ry={90} rotate={-14} duration={5} />
          </div>
        </div>
      </motion.div>

      {/* text content */}
      <motion.div
        className="relative z-10 mx-auto max-w-[560px] px-6 text-center"
        variants={container}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.h1
          variants={item}
          className="text-glow text-[54px] font-medium leading-[1.02] tracking-tight md:text-[64px]"
        >
          Travel money,
          <br />
          without the markup
        </motion.h1>
        <motion.p
          variants={item}
          className="mx-auto mt-4 max-w-[440px] text-[13px] leading-relaxed text-muted-foreground md:text-[14px]"
        >
          Spend, pay, and move money across borders — instantly, transparently,
          and without the 3–7% you're losing to hidden fees today.
        </motion.p>
        <motion.div variants={item} className="mt-6 flex items-center justify-center gap-2.5">
          <button
            className="rounded-full px-4 py-2 text-[12px] font-medium"
            style={{ background: "oklch(0.97 0.005 270)", color: "oklch(0.16 0.02 275)" }}
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

        <AnimatePresence>
          {withNotification && (
            <motion.div
              key="notif"
              className="mt-10 flex justify-center"
            >
              <NotificationCard />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}