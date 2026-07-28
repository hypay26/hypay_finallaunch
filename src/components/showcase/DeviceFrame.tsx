import type { MotionValue } from "framer-motion";
import { motion, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  progress: MotionValue<number>;
}

const BASE_DEVICE_WIDTH = 980;
const BASE_DEVICE_HEIGHT = BASE_DEVICE_WIDTH / 1.6;

export function DeviceFrame({ children, progress }: Props) {
  const [contentScale, setContentScale] = useState(1);
  const screenRef = useRef<HTMLDivElement>(null);

  // Camera-like drift as user scrolls
  const rotateY = useTransform(progress, [0, 1], [-24, -14]);
  const rotateX = useTransform(progress, [0, 1], [20, 14]);
  const rotateZ = useTransform(progress, [0, 1], [-6, -3]);
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.03, 1]);

  useEffect(() => {
    const element = screenRef.current;
    if (!element) return;

    const updateScale = () => {
      const width = element.clientWidth || 0;
      const height = element.clientHeight || 0;

      if (!width || !height) {
        setContentScale(1);
        return;
      }

      const nextScale = Math.min(width / BASE_DEVICE_WIDTH, height / BASE_DEVICE_HEIGHT);
      setContentScale(Number.isFinite(nextScale) ? nextScale : 1);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ perspective: "2200px" }}
    >
      <div className="device-frame-wrapper relative max-h-[76vh] max-w-[84vw]" style={{ width: "min(980px, 82vw, 102vh)" }}>
        <motion.div
          className="relative h-full w-full"
          style={{
            width: "min(980px, 82vw, 102vh)",
            aspectRatio: "16 / 10",
            pointerEvents: "auto",
            rotateX,
            rotateY,
            rotateZ,
            scale,
          }}
        >
          {/* device shadow */}
          <div
            className="absolute inset-x-10 -bottom-16 h-24 rounded-[100%] blur-3xl"
            style={{ background: "oklch(0 0 0 / 0.7)" }}
          />

          {/* bezel */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[28px] p-[10px]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.16 0.01 145), oklch(0.06 0.005 145))",
              boxShadow:
                "var(--shadow-device), inset 0 1px 0 oklch(1 0 0 / 0.08), inset 0 -1px 0 oklch(0 0 0 / 0.6)",
            }}
          >
            {/* screen */}
            <div
              ref={screenRef}
              className="pointer-events-auto relative h-full w-full overflow-hidden rounded-[20px]"
              style={{
                background: "var(--gradient-screen)",
                boxShadow: "inset 0 0 60px oklch(0 0 0 / 0.6)",
              }}
            >
              {/* screen glare rendered first to stack behind interactive content */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[20px]"
                style={{
                  background:
                    "linear-gradient(115deg, oklch(1 0 0 / 0.06) 0%, transparent 30%, transparent 70%, oklch(1 0 0 / 0.03) 100%)",
                }}
              />

              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: `${BASE_DEVICE_WIDTH}px`,
                    height: `${BASE_DEVICE_HEIGHT}px`,
                    transform: `translate(-50%, -50%) scale(${contentScale})`,
                    transformOrigin: "center center",
                    willChange: "transform",
                  }}
                >
                  {children}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}