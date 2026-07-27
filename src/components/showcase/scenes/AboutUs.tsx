import { motion, type Variants } from "framer-motion";
import { DottedGlobe } from "../primitives/DottedGlobe";
import { OrbitArc } from "../primitives/OrbitArc";
import { Starfield } from "../primitives/Starfield";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

function SceneBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" >
      <Starfield count={70} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, oklch(0.5 0.2 145 / 0.18) 0%, transparent 55%)",
        }}
      />
    </div>
  );
}

/** Scene 1: About Halith Technologies India Private Limited */
export function AboutCompany() {
  return (
    <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
      <SceneBackdrop />

      {/* ── Mobile / Tablet layout (< lg) ── */}
      <div className="flex lg:hidden flex-col items-center justify-center gap-6 px-6 pt-8 pb-12 text-center h-full overflow-hidden">
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col items-center"
        >
          <div
            className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
            style={{ borderColor: "oklch(1 0 0 / 0.12)", background: "oklch(1 0 0 / 0.03)" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "oklch(0.72 0.22 145)", boxShadow: "0 0 8px oklch(0.72 0.22 145)" }}
            />
            The Company
          </div>
          <h2 className="text-glow text-[26px] sm:text-[32px] font-medium leading-[1.1] tracking-tight">
            About Halith Technologies India Private Limited
          </h2>
          <p className="mt-3 max-w-[380px] text-[12px] sm:text-[13px] leading-relaxed text-muted-foreground">
            Halith Technologies India Private Limited is a fintech company building blockchain-powered payment infrastructure that makes global transactions faster, more secure, and cost-effective. We bridge traditional finance with the digital economy through innovative, scalable financial solutions.
          </p>
        </motion.div>

        <motion.div
          className="relative flex items-center justify-center"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="relative" style={{ width: 240, height: 240 }}>
            <div
              className="absolute inset-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: "var(--gradient-globe)",
                boxShadow: "0 0 60px oklch(0.62 0.24 145 / 0.55), inset 0 0 30px oklch(0.72 0.22 145 / 0.5)",
                border: "1px solid oklch(0.72 0.22 145 / 0.35)",
              }}
            />
            <OrbitArc size={240} rx={110} ry={110} rotate={0} duration={8} />
            <OrbitArc size={240} rx={110} ry={45} rotate={30} duration={7} delay={0.8} reverse />
            <OrbitArc size={240} rx={110} ry={45} rotate={-30} duration={9} delay={0.4} />
          </div>
        </motion.div>
      </div>

      {/* ── Desktop layout (lg+) ── */}
      <div className="hidden lg:flex relative h-full w-full items-center justify-between px-10 xl:px-14 pb-2 z-10">
        <div className="grid grid-cols-12 items-center gap-8 w-full">
          <motion.div
            className="col-span-7 flex flex-col justify-center pr-4"
            variants={fadeUp}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div
              className="mb-3 inline-flex items-center gap-2 self-start rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
              style={{ borderColor: "oklch(1 0 0 / 0.12)", background: "oklch(1 0 0 / 0.03)" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "oklch(0.72 0.22 145)", boxShadow: "0 0 8px oklch(0.72 0.22 145)" }}
              />
              The Company
            </div>
            <h2 className="text-glow text-[30px] xl:text-[36px] font-medium leading-[1.08] tracking-tight">
              About Halith Technologies India Private Limited
            </h2>
            <p className="mt-3.5 max-w-[500px] text-[13px] xl:text-[14px] leading-relaxed text-muted-foreground">
              Halith Technologies India Private Limited is a fintech company building blockchain-powered payment infrastructure that makes global transactions faster, more secure, and cost-effective. We bridge traditional finance with the digital economy through innovative, scalable financial solutions.
            </p>
          </motion.div>

          <motion.div
            className="col-span-5 flex items-center justify-center relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <motion.div
              className="relative"
              style={{ width: 320, height: 320, perspective: "1200px" }}
              animate={{ rotateY: [-10, 6, -10], rotateX: [8, 4, 8] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="absolute inset-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: "var(--gradient-globe)",
                  boxShadow: "0 0 70px oklch(0.62 0.24 145 / 0.55), inset 0 0 35px oklch(0.72 0.22 145 / 0.5)",
                  border: "1px solid oklch(0.72 0.22 145 / 0.35)",
                }}
              />
              <OrbitArc size={320} rx={150} ry={150} rotate={0} duration={8} />
              <OrbitArc size={320} rx={150} ry={60} rotate={30} duration={7} delay={0.8} reverse />
              <OrbitArc size={320} rx={150} ry={60} rotate={-30} duration={9} delay={0.4} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/** Scene 2: About HyPay */
export function AboutProduct() {
  return (
    <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
      <SceneBackdrop />

      {/* ── Mobile / Tablet layout (< lg) ── */}
      <div className="flex lg:hidden flex-col items-center justify-center gap-6 px-6 pt-8 pb-12 text-center h-full overflow-hidden">
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col items-center"
        >
          <div
            className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
            style={{ borderColor: "oklch(1 0 0 / 0.12)", background: "oklch(1 0 0 / 0.03)" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "oklch(0.72 0.22 145)", boxShadow: "0 0 8px oklch(0.72 0.22 145)" }}
            />
            The Product
          </div>
          <h2 className="text-glow text-[30px] sm:text-[36px] font-medium leading-[1.1] tracking-tight">
            About HyPay
          </h2>
          <p className="mt-3 max-w-[380px] text-[12px] sm:text-[13px] leading-relaxed text-muted-foreground">
            HyPay is Halith Technologies' flagship cross-border payment platform, enabling individuals and businesses to send, spend, and receive money globally using blockchain and stablecoin technology. With secure digital wallets, intelligent payment routing, and competitive foreign exchange conversion, HyPay delivers fast, transparent, and seamless international payments.
          </p>
        </motion.div>

        <motion.div
          className="relative flex items-center justify-center"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="relative">
            <DottedGlobe size={240} />
            <div className="pointer-events-none absolute inset-0">
              <OrbitArc size={240} rx={130} ry={40} rotate={-14} duration={6} />
              <OrbitArc size={240} rx={130} ry={40} rotate={26} duration={7} delay={1} reverse />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Desktop layout (lg+) ── */}
      <div className="hidden lg:flex relative h-full w-full items-center justify-between px-10 xl:px-14 pb-2 z-10">
        <div className="grid grid-cols-12 items-center gap-8 w-full">
          <motion.div
            className="col-span-5 flex items-center justify-center relative order-2 lg:order-1"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <motion.div
              className="relative"
              animate={{ rotateY: [10, -6, 10], rotateX: [8, 4, 8] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            >
              <DottedGlobe size={330} />
              <div className="pointer-events-none absolute inset-0">
                <OrbitArc size={330} rx={170} ry={50} rotate={-14} duration={6} />
                <OrbitArc size={330} rx={170} ry={50} rotate={26} duration={7} delay={1} reverse />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="col-span-7 flex flex-col justify-center pl-4 order-1 lg:order-2"
            variants={fadeUp}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div
              className="mb-3 inline-flex items-center gap-2 self-start rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
              style={{ borderColor: "oklch(1 0 0 / 0.12)", background: "oklch(1 0 0 / 0.03)" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "oklch(0.72 0.22 145)", boxShadow: "0 0 8px oklch(0.72 0.22 145)" }}
              />
              The Product
            </div>
            <h2 className="text-glow text-[34px] xl:text-[40px] font-medium leading-[1.08] tracking-tight">
              About HyPay
            </h2>
            <p className="mt-3.5 max-w-[500px] text-[13px] xl:text-[14px] leading-relaxed text-muted-foreground">
              HyPay is Halith Technologies' flagship cross-border payment platform, enabling individuals and businesses to send, spend, and receive money globally using blockchain and stablecoin technology. With secure digital wallets, intelligent payment routing, and competitive foreign exchange conversion, HyPay delivers fast, transparent, and seamless international payments.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/** Combined view for standalone route `/about` */
export function AboutUs() {
  return (
    <div className="relative w-full flex flex-col">
      <div className="min-h-screen">
        <AboutCompany />
      </div>
      <div className="min-h-screen">
        <AboutProduct />
      </div>
    </div>
  );
}
