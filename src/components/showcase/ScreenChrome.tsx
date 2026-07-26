export function ScreenChrome() {
  return (
    <>
      {/* top nav */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-4 md:px-8 md:py-5">
        <img
          src="/logo.png"
          alt="HYPAY"
          className="h-10 w-auto object-contain"
        />
        {/* <nav className="hidden gap-6 text-[11px] text-muted-foreground md:flex">
          <span>About Us</span>
          <span>Compare</span>
          <span>FAQ</span>
          <span>Contact Sales</span>
        </nav> */}

      </div>
    </>
  );
}