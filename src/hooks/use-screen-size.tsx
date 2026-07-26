import * as React from "react";

const TABLET_BREAKPOINT = 1024; // lg in Tailwind

/**
 * Returns:
 *  - `undefined` before the first render effect (avoid layout flash)
 *  - `true`  on mobile / tablet (< 1024 px)
 *  - `false` on desktop (≥ 1024 px)
 */
export function useIsTabletOrBelow(): boolean | undefined {
  const [isSmall, setIsSmall] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsSmall(window.innerWidth < TABLET_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsSmall(window.innerWidth < TABLET_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isSmall;
}
