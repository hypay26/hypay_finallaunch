import { motion } from "framer-motion";

export function NotificationCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center gap-3 rounded-full border px-4 py-2.5 backdrop-blur-xl"
      style={{
        background: "oklch(0.22 0.03 275 / 0.85)",
        borderColor: "oklch(1 0 0 / 0.1)",
        boxShadow: "0 20px 40px -12px oklch(0 0 0 / 0.5), var(--shadow-glow)",
      }}
    >
      <div
        className="flex h-8 w-10 items-center justify-center rounded-md"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.62 0.24 300), oklch(0.72 0.22 305))",
        }}
      >
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
          <rect x="0.5" y="0.5" width="17" height="13" rx="2" stroke="white" opacity="0.9" />
          <rect x="0.5" y="3.5" width="17" height="2" fill="white" opacity="0.9" />
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-[13px] font-semibold text-foreground">Product Bought</span>
        <span className="text-[11px] text-muted-foreground">1.2 SOL · $182</span>
      </div>
      <motion.div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        initial={false}
      >
        <motion.div
          className="absolute inset-y-0 w-1/3"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.15), transparent)",
          }}
          animate={{ x: ["-100%", "300%"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
        />
      </motion.div>
    </motion.div>
  );
}