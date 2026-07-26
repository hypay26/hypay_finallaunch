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
import { useIsTabletOrBelow } from "@/hooks/use-screen-size";

const SCENES = [
  { key: "hero", render: () => <GlobeHero withNotification /> },
  { key: "availability", render: () => <GlobalAvailability /> },
  { key: "problem", render: () => <EmpowerStore /> },
  { key: "numbers", render: () => <InNumbers /> },
  { key: "about", render: () => <AboutUs /> },
  { key: "waitlist", render: () => <ClosingWaitlist /> },
] as const;

/** Desktop: sticky scroll experience with 3D DeviceFrame */
function DesktopShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [index, setIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
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

/** Mobile/Tablet: each scene is a fullscreen section, no DeviceFrame */
function MobileShowcase() {
  return (
    <div className="relative w-full" style={{ background: "var(--gradient-studio)" }}>
      {/* Single fixed starfield-style background — avoids re-mounting per section */}
      <div className="pointer-events-none fixed inset-0 z-0" style={{ background: "var(--gradient-studio)" }}>
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 55%, oklch(0.5 0.2 145 / 0.18) 0%, transparent 55%)",
          }}
        />
      </div>

      {/* Persistent nav bar */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-5 py-3 backdrop-blur-md"
        style={{
          background: "oklch(0.16 0.02 145 / 0.85)",
          borderBottom: "1px solid oklch(1 0 0 / 0.07)",
        }}
      >
        <img src="/logo.png" alt="HYPAY" className="h-8 w-auto object-contain" />
        <a
          href="#waitlist"
          className="rounded-full px-4 py-1.5 text-[12px] font-medium"
          style={{ background: "oklch(0.97 0.005 145)", color: "oklch(0.16 0.02 145)" }}
        >
          Join Waitlist →
        </a>
      </header>

      {SCENES.map(({ key, render }, idx) => (
        <section
          id={key === "waitlist" ? "waitlist" : undefined}
          key={key}
          className="relative z-10 w-full overflow-hidden"
          style={{
            borderTop: idx > 0 ? "1px solid oklch(1 0 0 / 0.06)" : undefined,
          }}
        >
          <div className="relative flex w-full flex-col">
            {render()}
          </div>
        </section>
      ))}
    </div>
  );
}


export function Showcase() {
  const isTabletOrBelow = useIsTabletOrBelow();

  // Until hydration resolves, render nothing (avoids layout flash).
  // The hook starts as `undefined` then resolves on first effect.
  if (isTabletOrBelow === undefined) return null;

  return isTabletOrBelow ? <MobileShowcase /> : <DesktopShowcase />;
}