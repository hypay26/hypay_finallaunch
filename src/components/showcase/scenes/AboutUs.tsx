import { motion, type Variants } from "framer-motion";
import { ArrowRightLeft, Building2, ShieldCheck, Sparkles, Wallet, Zap } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  exit: { opacity: 0 },
};

const item: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  exit: { opacity: 0, y: -8 },
};

export function AboutUs() {
  return (
    <div className="relative h-full w-full px-6 pt-14 md:px-12">
      <motion.div
        className="flex h-full flex-col justify-between pb-6"
        variants={container}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-4">
          <div>
            <div className="mb-1 flex items-center gap-2 text-[10px] font-medium tracking-[0.25em] text-emerald-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
              Who We Are
            </div>
            <h2 className="text-[32px] font-medium leading-none tracking-tight md:text-[42px]">
              About Us
            </h2>
          </div>
          <div className="text-left md:text-right text-[11px] font-medium tracking-[0.15em] text-zinc-300 uppercase">
            Bridging TradFi with the digital economy.
          </div>
        </div>

        {/* Content Cards Grid */}
        <div className="grid grid-cols-12 gap-5 my-auto items-stretch">
          {/* Halith Technologies Card */}
          <motion.div
            variants={item}
            className="col-span-12 md:col-span-6 flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <h3 className="text-[14px] font-semibold text-white tracking-tight">
                    Halith Technologies
                  </h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] text-muted-foreground tracking-wider uppercase">
                  Parent Enterprise
                </span>
              </div>

              {/* Micro Bullet Features */}
              <div className="grid grid-cols-1 gap-3 pt-1">
                <div className="flex items-start gap-2.5 text-[11px] text-zinc-200">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>
                    <strong className="text-white font-medium">Bridge TradFi:</strong> Next-gen blockchain payment rails connecting legacy banking to web3 finance.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-[11px] text-zinc-200">
                  <Zap className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>
                    <strong className="text-white font-medium">Streamline Rails:</strong> Engineered for instant, transparent, and low-cost cross-border money movement.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-[11px] text-zinc-200">
                  <ArrowRightLeft className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>
                    <strong className="text-white font-medium">Scale Globally:</strong> Scalable enterprise infrastructure powering individuals, businesses, and merchants.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[9px] text-muted-foreground border-t border-white/5 pt-2.5">
              <span>HALITH TECHNOLOGIES INDIA PVT LTD</span>
              <span className="text-emerald-400 font-medium">FINTECH INFRASTRUCTURE</span>
            </div>
          </motion.div>

          {/* HyPay Flagship Product Card */}
          <motion.div
            variants={item}
            className="col-span-12 md:col-span-6 flex flex-col justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.05] p-5 backdrop-blur-md shadow-[0_0_35px_rgba(16,185,129,0.08)]"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-white"
                    style={{
                      background: "oklch(0.72 0.22 145)",
                      boxShadow: "0 0 12px oklch(0.72 0.22 145 / 0.5)",
                    }}
                  >
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h3 className="text-[14px] font-semibold text-white tracking-tight">
                    HyPay
                  </h3>
                </div>
                <span
                  className="rounded-full border px-2 py-0.5 text-[9px] font-medium tracking-wider uppercase"
                  style={{
                    borderColor: "oklch(0.85 0.15 145 / 0.4)",
                    color: "oklch(0.85 0.15 145)",
                    background: "oklch(0.72 0.22 145 / 0.15)",
                  }}
                >
                  Flagship Product
                </span>
              </div>

              {/* 1-sentence value proposition */}
              <p className="text-[12px] font-medium text-emerald-300/90 mb-3.5 leading-snug">
                Redefining how the world sends, spends, and receives money globally.
              </p>

              {/* Crisp Feature Highlights */}
              <div className="grid grid-cols-1 gap-2.5 pt-1 border-t border-emerald-500/15">
                <div className="flex items-start gap-2.5 text-[11px] text-zinc-200">
                  <Zap className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>
                    <strong className="text-white font-medium">Instant Settlement:</strong> Stablecoin routing for real-time international transfers.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-[11px] text-zinc-200">
                  <Wallet className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>
                    <strong className="text-white font-medium">Smart Wallets:</strong> Secure digital vaults built for travelers, merchants, and global teams.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-[11px] text-zinc-200">
                  <ArrowRightLeft className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>
                    <strong className="text-white font-medium">Borderless FX:</strong> Direct conversion rates with transparent fees and zero hidden markups.
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-[9px] text-emerald-400/80 border-t border-emerald-500/15 pt-2.5">
              <span>SEND • SPEND • ACCEPT</span>
              <span className="font-semibold text-white">GLOBAL PAYMENTS</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom indicator badge */}
        <div className="mt-2 flex items-center justify-center">
          <div
            className="flex items-center gap-2 rounded-full border px-4 py-1 text-[9px] tracking-[0.2em] text-muted-foreground uppercase"
            style={{ borderColor: "oklch(1 0 0 / 0.1)", background: "oklch(0.2 0.02 145 / 0.6)" }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "oklch(0.72 0.22 145)", boxShadow: "0 0 8px oklch(0.72 0.22 145)" }}
            />
            Halith Technologies India Private Limited • Next-Gen Digital Finance
          </div>
        </div>
      </motion.div>
    </div>
  );
}
