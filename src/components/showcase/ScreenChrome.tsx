export function ScreenChrome() {
  return (
    <>
      {/* top nav */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-7 py-5 sm:px-8 sm:py-6 md:px-10 md:py-7">
        <img
          src="/logo.png"
          alt="HYPAY"
          className="h-11 w-auto object-contain sm:h-12"
        />
      </div>
    </>
  );
}