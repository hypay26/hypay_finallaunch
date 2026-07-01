# Plan: 3D Device Mockup Showcase (generic rebrand)

Recreate the reference video as a single, scroll-driven showcase page. A tilted laptop/tablet floats in a dark studio, and its screen cycles through animated hero scenes — matching the camera-tilt, ambient background, and scene transitions from the video. No 3D device chrome from the video's exact brand; a generic brand name ("Nebula" placeholder, easy to change) and neutral copy.

## Scenes (in order, ~5s each)

1. **Cross-border finance** — glowing purple dotted globe, headline + subhead + two pill buttons.
2. **Product Bought notification** — same globe scene, a floating card slides in with an orbit arc across it.
3. **100% global availability** — reframed layout with large stat, small progress ring, orbiting arrows around a smaller globe, right-side paragraph.
4. **Empower Your Store** — starfield background with a tilted product-grid dashboard mockup floating in.
5. **In Numbers** — dark stat grid with 8 count-up metrics and small icons.

Scenes advance on scroll (pinned section with scroll progress driving scene index + camera tilt), and also auto-advance if the user is idle.

## Core interactions & animations

- **Device frame**: CSS 3D transforms on a rounded-rect "laptop screen" element — `rotateX(~18deg) rotateY(~-22deg)` with slight scroll-linked drift so the camera feels alive. Soft ambient shadow + inner bezel + subtle screen glare gradient.
- **Ambient studio**: blurred dark speaker/monitor silhouettes behind the device (pure CSS radial gradients + rounded rects), plus a faint starfield (SVG dots with staggered twinkle).
- **Globe**: SVG dotted-sphere (generated dot grid mapped to a circle) with a slow `rotateZ` + purple radial glow ring, `filter: drop-shadow` for bloom.
- **Orbit arcs**: SVG ellipse strokes with `strokeDasharray` + animated `strokeDashoffset` for the arrow trails; small arrowhead follows via `<animateMotion>` / framer-motion `motion.path`.
- **Floating notification card**: framer-motion enter (y+opacity+scale) with a light sweep across it.
- **Stat count-ups**: `useMotionValue` + `animate()` on scene enter, formatted as `35+`, `60M+`, etc.
- **Scene transitions**: crossfade + 30px lift, staggered children (title → subhead → buttons). Reduced-motion users get instant swaps.
- **Header**: top nav (Products, Pricing, Developers, Resources, Contact Sales) + Login / Get Started pills, all sitting on the tilted screen plane.

## Design tokens (src/styles.css)

- Background `oklch(0.16 0.02 270)` deep charcoal; foreground near-white.
- Accent purple `oklch(0.62 0.24 300)` + glow `oklch(0.72 0.22 305)`.
- `--gradient-globe`, `--gradient-screen`, `--shadow-device`, `--shadow-glow` tokens.
- Fonts: Inter Tight (display) + Inter (body) via `@fontsource-variable/inter` + `@fontsource-variable/inter-tight`.
- Custom Button variants: `pill` (light glass) and `pillPrimary` (frosted white).

## Structure

```
src/routes/index.tsx                 -> renders <Showcase />
src/components/showcase/
  Showcase.tsx                       -> pinned scroll container + scene switcher
  DeviceFrame.tsx                    -> 3D-tilted screen + bezel + shadow
  StudioBackground.tsx               -> ambient silhouettes + starfield
  scenes/GlobeHero.tsx               -> scenes 1 & 2 (with notification variant)
  scenes/GlobalAvailability.tsx      -> scene 3
  scenes/EmpowerStore.tsx            -> scene 4
  scenes/InNumbers.tsx               -> scene 5
  primitives/DottedGlobe.tsx
  primitives/OrbitArc.tsx
  primitives/NotificationCard.tsx
  primitives/CountUp.tsx
  primitives/Starfield.tsx
```

## Technical notes

- `framer-motion` for scene transitions, count-ups, orbit motion.
- Scroll driver: `useScroll` on the pinned wrapper → maps progress to `sceneIndex` (0–4) and `tiltX/tiltY`.
- All colors via semantic tokens; no hardcoded hex in components.
- Head metadata + og tags updated on `/` route.
- No 3rd-party 3D lib — pure CSS 3D + SVG is enough and stays fast in the sandbox.

## Out of scope

- Real routing between multiple pages (single showcase route).
- Backend / auth — buttons are visual only.
- Pixel-perfect recreation of the video's exact device model or brand marks.
