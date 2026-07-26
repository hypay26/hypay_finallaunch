// import { AnimatePresence, useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { DeviceFrame } from "./DeviceFrame";
import { StudioBackground } from "./StudioBackground";
import { ScreenChrome } from "./ScreenChrome";
import { GlobeHero } from "./scenes/GlobeHero";
import { GlobalAvailability } from "./scenes/GlobalAvailability";
import { EmpowerStore } from "./scenes/EmpowerStore";
import { InNumbers } from "./scenes/InNumbers";
import { AboutUs } from "./scenes/AboutUs";
import { ClosingWaitlist } from "./scenes/ClosingWaitlist";

const SCENES = [
  { key: "hero", render: () => <GlobeHero withNotification /> },
  { key: "availability", render: () => <GlobalAvailability /> },
  { key: "problem", render: () => <EmpowerStore /> },
  { key: "numbers", render: () => <InNumbers /> },
  { key: "about", render: () => <AboutUs /> },
  { key: "waitlist", render: () => <ClosingWaitlist /> },
] as const;

export function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [index, setIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Round to nearest scene (less flicker at boundaries than floor)
    const raw = Math.round(v * (SCENES.length - 1));
    const i = Math.min(SCENES.length - 1, Math.max(0, raw));
    if (i !== index) setIndex(i);
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative" style={{ height: `${SCENES.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <StudioBackground />

        <DeviceFrame progress={progress}>
          <ScreenChrome />
          {/* Keep every scene mounted; cross-fade by opacity so interactive
              elements (e.g. the waitlist email input) don't get unmounted
              mid-keystroke when scroll noise flips the active index. */}
          <motion.div
            key={SCENES[index].key}
            className="absolute inset-0 z-20 pt-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            {SCENES[index].render()}
          </motion.div>
        </DeviceFrame>

        {/* scene indicator */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-1.5">
          {SCENES.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-500"
              style={{
                width: i === index ? 22 : 8,
                background:
                  i === index
                    ? "oklch(0.85 0.15 145)"
                    : "oklch(1 0 0 / 0.25)",
                boxShadow: i === index ? "0 0 12px oklch(0.72 0.22 145)" : "none",
              }}
            />
          ))}
        </div>

        {/* scroll hint */}
        <div className="pointer-events-none absolute right-6 top-1/2 z-30 -translate-y-1/2 rotate-90 text-[10px] tracking-[0.3em] text-muted-foreground">
          SCROLL
        </div>
      </div>
    </div>
  );
}