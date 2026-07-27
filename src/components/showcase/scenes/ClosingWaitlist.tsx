import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useState } from "react";
import { DottedGlobe } from "../primitives/DottedGlobe";
import { OrbitArc } from "../primitives/OrbitArc";
import { submitWaitlistEmail } from "@/lib/google-sheets";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};
const item: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.35 } },
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function ClosingWaitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email.");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const result = await submitWaitlistEmail({
        data: { email: trimmed },
      });

      if (result.success) {
        setStatus("success");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong.");
    }
  }

  return (
    <div className="relative w-full lg:h-full">
      {/* ── Mobile / Tablet Layout (< lg) ── */}
      <div className="flex lg:hidden w-full flex-col items-center pt-16 pb-24 px-6 text-center">
        <motion.div
          className="relative z-30 w-full max-w-[440px]"
          variants={container}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.h1
            variants={item}
            className="text-glow text-[40px] font-medium leading-[1.05] tracking-tight sm:text-[48px]"
          >
            Be first to fly
            <br />
            with HYPAY
          </motion.h1>
          <motion.p
            variants={item}
            className="mx-auto mt-4 text-[13px] leading-relaxed text-muted-foreground"
          >
            Early access opens soon. Join the list and skip the line.
          </motion.p>

          <motion.div variants={item} className="mx-auto mt-8 w-full">
            <AnimatePresence mode="wait" initial={false}>
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="rounded-full border px-5 py-4 text-[13px] text-foreground/90 backdrop-blur-xl"
                  style={{
                    background: "oklch(0.22 0.03 145 / 0.8)",
                    borderColor: "oklch(0.85 0.15 145 / 0.4)",
                    boxShadow: "var(--shadow-glow)",
                  }}
                >
                  You're on the list — we'll be in touch soon.
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-40 pointer-events-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-1.5 rounded-3xl sm:rounded-full border p-2 sm:p-1 backdrop-blur-xl"
                  style={{
                    background: "oklch(0.22 0.03 145 / 0.7)",
                    borderColor: "oklch(1 0 0 / 0.12)",
                  }}
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="you@example.com"
                    className="w-full flex-1 rounded-full bg-transparent px-4 py-3 sm:py-2 text-[14px] sm:text-[13px] text-center sm:text-left text-foreground placeholder:text-muted-foreground focus:outline-none"
                    style={{ caretColor: "oklch(0.85 0.15 145)" }}
                    disabled={status === "submitting"}
                    aria-label="Email address"
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full sm:w-auto whitespace-nowrap rounded-full px-5 py-3 sm:px-4 sm:py-2 text-[14px] sm:text-[12px] font-medium disabled:opacity-60"
                    style={{
                      background: "oklch(0.97 0.005 145)",
                      color: "oklch(0.16 0.02 145)",
                    }}
                  >
                    {status === "submitting" ? "Joining…" : "Get Early Access →"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
            {status === "error" && errorMsg && (
              <p className="mt-3 text-[12px] text-red-400">{errorMsg}</p>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mt-16 flex justify-center w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
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
        {/* globe layer */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.05, opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="relative">
            <DottedGlobe size={500} />
            <div className="pointer-events-none absolute inset-0">
              <OrbitArc size={500} rx={270} ry={75} rotate={-14} duration={5} />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative z-30 pointer-events-auto mx-auto max-w-[540px] px-6 text-center"
          variants={container}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.h1
            variants={item}
            className="text-glow text-[42px] sm:text-[52px] xl:text-[60px] font-medium leading-[1.04] tracking-tight"
          >
            Be first to fly
            <br />
            with HYPAY
          </motion.h1>
          <motion.p
            variants={item}
            className="mx-auto mt-4 max-w-[440px] text-[14px] leading-relaxed text-muted-foreground"
          >
            Early access opens soon. Join the list and skip the line.
          </motion.p>

          <motion.div variants={item} className="mx-auto mt-6 w-full max-w-[440px]">
            <AnimatePresence mode="wait" initial={false}>
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="rounded-full border px-5 py-3 text-[13px] text-foreground/90 backdrop-blur-xl"
                  style={{
                    background: "oklch(0.22 0.03 145 / 0.8)",
                    borderColor: "oklch(0.85 0.15 145 / 0.4)",
                    boxShadow: "var(--shadow-glow)",
                  }}
                >
                  You're on the list — we'll be in touch soon.
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-40 pointer-events-auto flex items-center gap-1.5 rounded-full border p-1 backdrop-blur-xl"
                  style={{
                    background: "oklch(0.22 0.03 145 / 0.7)",
                    borderColor: "oklch(1 0 0 / 0.12)",
                  }}
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="you@example.com"
                    className="flex-1 rounded-full bg-transparent px-4 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none"
                    style={{ caretColor: "oklch(0.85 0.15 145)" }}
                    disabled={status === "submitting"}
                    aria-label="Email address"
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-medium disabled:opacity-60"
                    style={{
                      background: "oklch(0.97 0.005 145)",
                      color: "oklch(0.16 0.02 145)",
                    }}
                  >
                    {status === "submitting" ? "Joining…" : "Get Early Access →"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
            {status === "error" && errorMsg && (
              <p className="mt-3 text-[11px] text-red-400">{errorMsg}</p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}