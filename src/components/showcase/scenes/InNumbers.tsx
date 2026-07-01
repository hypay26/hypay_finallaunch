import { motion, type Variants } from "framer-motion";
import { CountUp } from "../primitives/CountUp";

const EASE = [0.22, 1, 0.36, 1] as const;

const stats = [
  { label: "Cryptocurrencies supported", to: 35, suffix: "+" },
  { label: "Crypto payments processed in USD", to: 60, suffix: "M+" },
  { label: "Fiat options supported", to: 25, suffix: "+" },
  { label: "Total payments volume processed in USD", to: 100, suffix: "M+" },
  { label: "Transactions completed", to: 8.2, suffix: "M+", format: (v: number) => v.toFixed(1) },
  { label: "Customers", to: 3.2, suffix: "M+", format: (v: number) => v.toFixed(1) },
  { label: "Registered users", to: 350, suffix: "K+" },
  { label: "Active merchants", to: 3.5, suffix: "K+", format: (v: number) => v.toFixed(1) },
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
    <div className="relative h-full w-full px-8 pt-20 md:px-14">
      <motion.div
        className="grid grid-cols-4 gap-x-6 gap-y-8"
        variants={container}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="col-span-1 flex items-start">
          <h2 className="text-[38px] font-medium leading-none tracking-tight md:text-[46px]">
            In
            <br />
            Numbers
          </h2>
        </div>

        {stats.slice(0, 3).map((s, i) => (
          <motion.div key={i} variants={item} className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="inline-block h-2.5 w-2.5 rounded-sm border" style={{ borderColor: "oklch(1 0 0 / 0.3)" }} />
              {s.label}
            </div>
            <div className="text-[36px] font-medium tracking-tight md:text-[42px]">
              <CountUp to={s.to} suffix={s.suffix} format={s.format} />
            </div>
          </motion.div>
        ))}

        {stats.slice(3).map((s, i) => (
          <motion.div key={i + 3} variants={item} className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="inline-block h-2.5 w-2.5 rounded-sm border" style={{ borderColor: "oklch(1 0 0 / 0.3)" }} />
              {s.label}
            </div>
            <div className="text-[36px] font-medium tracking-tight md:text-[42px]">
              <CountUp to={s.to} suffix={s.suffix} format={s.format} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}