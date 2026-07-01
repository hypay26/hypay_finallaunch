import { motion, type Variants } from "framer-motion";
import { Starfield } from "../primitives/Starfield";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

function GridCard({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="flex flex-col gap-2 rounded-lg border p-3"
      style={{
        background: "oklch(0.2 0.02 275 / 0.8)",
        borderColor: "oklch(1 0 0 / 0.06)",
      }}
    >
      <div className="h-8 w-8 rounded-md" style={{ background: "oklch(0.28 0.03 275)" }} />
      <div className="h-1.5 w-3/4 rounded-full" style={{ background: "oklch(1 0 0 / 0.15)" }} />
      <div className="h-1 w-1/2 rounded-full" style={{ background: "oklch(1 0 0 / 0.08)" }} />
    </motion.div>
  );
}

export function EmpowerStore() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Starfield count={80} className="opacity-70" />

      <div className="relative z-10 grid h-full grid-cols-12 items-center gap-6 px-8 pt-16 md:px-14">
        {/* left copy */}
        <motion.div className="col-span-5" variants={fadeUp} initial="initial" animate="animate" exit="exit">
          <div className="mb-3 text-[10px] tracking-[0.3em] text-muted-foreground">eCOMMERCE</div>
          <h2 className="text-[46px] font-medium leading-[1.02] tracking-tight md:text-[56px]">
            Empower
            <br />
            Your Store
          </h2>
          <p className="mt-4 max-w-[320px] text-[13px] text-muted-foreground">
            Manage your online business seamlessly, accepting various
            cryptocurrencies with low fees.
          </p>
          <button
            className="mt-5 rounded-full border px-4 py-2 text-[12px]"
            style={{ borderColor: "oklch(1 0 0 / 0.15)" }}
          >
            Learn more →
          </button>
        </motion.div>

        {/* right dashboard */}
        <motion.div
          className="col-span-7 relative"
          initial={{ opacity: 0, x: 30, rotateY: -12 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="rounded-xl border p-4"
            style={{
              background: "oklch(0.16 0.02 275 / 0.9)",
              borderColor: "oklch(1 0 0 / 0.08)",
              boxShadow: "0 20px 60px oklch(0 0 0 / 0.5)",
            }}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md" style={{ background: "oklch(0.62 0.24 300)" }} />
                <div className="h-1.5 w-24 rounded-full" style={{ background: "oklch(1 0 0 / 0.15)" }} />
              </div>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: "oklch(1 0 0 / 0.3)" }} />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <GridCard key={i} delay={0.1 + i * 0.05} />
              ))}
            </div>
          </div>

          {/* floating avatar bubble */}
          <motion.div
            className="absolute -right-2 -top-8 flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background: "linear-gradient(135deg, oklch(0.62 0.24 300), oklch(0.72 0.22 305))",
              boxShadow: "0 10px 30px oklch(0.5 0.25 300 / 0.5)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5, ease: EASE }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" fill="white" opacity="0.9" />
              <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}