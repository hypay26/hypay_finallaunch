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
    <div className="relative flex h-full w-full items-center justify-center">
      {/* globe layer — reused from hero */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.05, opacity: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <div className="relative">
          <DottedGlobe size={640} />
          <div className="pointer-events-none absolute inset-0">
            <OrbitArc size={640} rx={340} ry={90} rotate={-14} duration={5} />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="relative z-30 pointer-events-auto mx-auto max-w-[560px] px-6 text-center"
        variants={container}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.h1
          variants={item}
          className="text-glow text-[54px] font-medium leading-[1.02] tracking-tight md:text-[64px]"
        >
          Be first to fly
          <br />
          with HYPAY
        </motion.h1>
        <motion.p
          variants={item}
          className="mx-auto mt-4 max-w-[440px] text-[13px] leading-relaxed text-muted-foreground md:text-[14px]"
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
            <p className="mt-3 text-[11px] text-muted-foreground">{errorMsg}</p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}