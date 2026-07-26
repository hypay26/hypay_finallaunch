import { Starfield } from "./primitives/Starfield";

export function StudioBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "var(--gradient-studio)" }}>
      <Starfield count={120} />

      {/* left speaker silhouette */}
      <div
        className="absolute -left-24 top-1/3 h-[380px] w-[280px] rounded-[36px]"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.14 0.02 145), oklch(0.09 0.015 145))",
          boxShadow: "inset 0 0 40px oklch(0 0 0 / 0.6), 0 40px 80px oklch(0 0 0 / 0.4)",
        }}
      >
        <div className="absolute inset-6 rounded-2xl border" style={{ borderColor: "oklch(1 0 0 / 0.03)" }} />
        <div
          className="absolute bottom-6 left-6 h-2 w-2 rounded-full"
          style={{ background: "oklch(0.62 0.24 145)", boxShadow: "0 0 10px oklch(0.72 0.22 145)" }}
        />
      </div>

      {/* right monitor silhouette */}
      <div
        className="absolute -right-32 -top-16 h-[520px] w-[420px] rounded-[28px]"
        style={{
          background:
            "linear-gradient(215deg, oklch(0.15 0.02 145), oklch(0.09 0.015 145))",
          boxShadow: "inset 0 0 40px oklch(0 0 0 / 0.6), 0 40px 80px oklch(0 0 0 / 0.4)",
        }}
      />

      {/* bottom console */}
      <div
        className="absolute -bottom-20 left-1/2 h-[220px] w-[520px] -translate-x-1/2 rounded-[32px]"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.16 0.02 145), oklch(0.09 0.015 145))",
          boxShadow: "inset 0 0 40px oklch(0 0 0 / 0.6), 0 40px 80px oklch(0 0 0 / 0.5)",
        }}
      />

      {/* ambient green wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, oklch(0.5 0.2 145 / 0.18) 0%, transparent 55%)",
        }}
      />
    </div>
  );
}