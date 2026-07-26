export function ScreenChrome() {
  return (
    <>
      {/* top nav */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-4 md:px-8 md:py-5">
        <div
          className="text-[15px] font-semibold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          HYPAY
        </div>
        {/* <nav className="hidden gap-6 text-[11px] text-muted-foreground md:flex">
          <span>About Us</span>
          <span>Compare</span>
          <span>FAQ</span>
          <span>Contact Sales</span>
        </nav> */}
        <div className="flex items-center gap-2">
          <button className="rounded-full border px-3.5 py-1.5 text-[11px] text-foreground/90" style={{ borderColor: "oklch(1 0 0 / 0.12)" }}>
            Contact
          </button>
          <button
            className="rounded-full px-3.5 py-1.5 text-[11px] font-medium cursor-pointer"
            style={{ background: "oklch(0.97 0.005 145)", color: "oklch(0.16 0.02 145)" }}
            onClick={() => {
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth"
              });
            }}
          >
            Get Early Access →
          </button>
        </div>
      </div>
    </>
  );
}