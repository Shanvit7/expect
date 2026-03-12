# Animation Reference

Practical summaries from animations.dev by Emil Kowalski. Each section links to detailed lesson files.

---

## Easing

The most important factor in making animations feel right. Incorrect easing ruins any animation.

- **ease-out** — enter/exit (most common). Starts fast (feels responsive), decelerates into final position. **Default choice for dropdowns, toasts, dialogs, popovers.**
- **ease-in-out** — elements already on screen that need to move. Accelerates then decelerates like a car. Good for morphing containers, sliding panels, Dynamic Island-style size changes.
- **ease-in** — starts slow, feels sluggish. Almost never correct for UI.
- **ease** — softer than ease-in-out. Good for subtle color transitions, gentle components. Used in Sonner for elegance over strict correctness.
- **Custom curves** — built-in CSS curves lack energy. Custom cubic-bezier curves create more intentional, snappy motion. Use [easings.co](https://easings.co/) for reference.

The built-in `ease-out` is fine for subtle transitions, but for anything noticeable, use a custom curve with stronger acceleration.

> [animation-theory/03-the-easing-blueprint.md](animation-theory/03-the-easing-blueprint.md)

## Springs

Physics-based animations with no fixed duration. Feel more natural because real-world motion doesn't have set durations.

- **Stiffness** — spring rigidity. Higher = faster, snappier animation. Lower = gentle, slower.
- **Damping** — oscillation decay. Higher = settles quickly. Lower = more bounce.
- **Mass** — element weight. Higher = heavier, slower to start and stop.

**Key advantage:** interruptible. Triggering a new animation mid-spring smoothly redirects without jumps or restarts. CSS transitions snap to new values on interrupt, causing jarring jumps.

**Bounce:** no-bounce should be your default for product UI. Slight bounce works for drag gestures where the user applies physical force (dragging a drawer, throwing an item). Vaul (drawer library) intentionally chose CSS over springs to minimize bundle size — it's a valid trade-off.

Springs in Figma: Figma supports spring animations natively for prototyping.

> [animation-theory/04-spring-animations.md](animation-theory/04-spring-animations.md)

## Timing

- **100–200ms** — small, frequent interactions: hover states, tooltip appearance, button feedback
- **200–400ms** — content transitions: page changes, expanding panels, menus, modals
- **400ms+** — reserved for marketing page storytelling animations
- **Never animate:** arrow key navigation, keyboard shortcuts, tab/focus movements — these repeat hundreds of times daily
- **Frequently-used elements:** test by using your own product daily. What feels delightful the first time becomes annoying on the 50th.
- Snappy product easing: `cubic-bezier(0.32, 0.72, 0, 1)` — sharp start, subtle deceleration at the end.

Marketing pages allow longer, more elaborate animations since they're viewed less often. But even there, if everything animates, nothing stands out.

> [animation-theory/05-timing-and-purpose.md](animation-theory/05-timing-and-purpose.md)

## Performance

**Target:** 60fps (16.7ms per frame for smooth perception).

**Rendering pipeline:** Style → Layout → Paint → Composite. Only **transform** and **opacity** skip to composite (cheapest step, GPU-accelerated).

**Avoid animating:** width, height, margin, padding, top, left — these trigger layout recalculation on every frame.

- `will-change: transform` — tells browser to keep element on GPU. Prevents 1px shift from GPU/CPU handoff. Don't add preemptively — each GPU layer uses VRAM.
- `contain: layout style paint` — isolates element rendering so changes don't repaint siblings.
- `transform: translateZ(0)` — forces GPU layer as fallback, useful for expensive filter/blur elements.
- Framer Motion animates outside React's render cycle (no re-renders per frame). But `layoutId` shared animations can drop frames if the main thread is busy loading a new page — fall back to CSS animations in those cases.

> [good-vs-great/02-performance.md](good-vs-great/02-performance.md)

## Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
    transition: none;
  }
}
```

JS: `window.matchMedia('(prefers-reduced-motion: reduce)').matches`
Framer Motion: `useReducedMotion()` hook.

**Strategy per animation type:**

- **Decorative** (hover effects, marketing flourishes) → remove entirely
- **Functional** (page transitions, state changes) → reduce duration or replace with fade
- **Informational** (loading indicators, progress) → keep but simplify

Always manage focus after animated content changes for screen reader users.

> [good-vs-great/03-accessibility.md](good-vs-great/03-accessibility.md)

---

## CSS Animations

### When CSS vs Library

**CSS:** simple hover/active effects, enter/exit transitions, infinite loops (marquee, spinner, skeleton), bundle-size-sensitive projects. Hardware-accelerated for transform, opacity, filter — stays smooth even when main thread is busy.

**Library (Framer Motion):** interruptible animations (springs), animating elements removed from DOM (exit animations), layout animations (height/position changes without knowing pixel values), shared layout transitions between components, gesture-driven interactions (drag, pinch), coordinating multiple elements with staggered timing.

> [css-animations/01-the-beauty-of-css-animations.md](css-animations/01-the-beauty-of-css-animations.md)

### Transforms

- **translate:** repositions without affecting document flow. Positive = down/right, negative = up/left.
- **scale:** `0.97` for button press feedback. Never animate from `scale(0)` — combine `scale(0.95)` with `opacity: 0` instead.
- **transform-origin:** defaults to element center. Set to trigger position for popovers so they scale from where the user clicked. Radix exposes `--radix-dropdown-menu-content-transform-origin`.
- **Transform order matters:** `rotate(45deg) translateX(100px)` moves along the rotated axis. `translateX(100px) rotate(45deg)` moves horizontally then rotates in place.
- **3D transforms:** `perspective` on parent for depth, `rotateY` for flips, `translateZ` for z-axis movement, `transform-style: preserve-3d` to keep children in 3D space. Used for card flips, Sonner's stacking toast layout.

> [css-animations/02-transforms.md](css-animations/02-transforms.md)

### Transitions

Interpolates between CSS states. Shorthand: `transition: property duration timing-function delay`.

When multiple properties share duration/easing, reduce repetition:

```css
.button {
  transition: 0.2s ease;
  transition-property: color, background-color, border-color;
}
```

Avoid `transition: all` — it animates properties you don't intend to change and hurts performance.

> [css-animations/03-transitions.md](css-animations/03-transitions.md)

### Keyframes

**Use keyframes:** infinite loops (marquee, spinner), auto-play on mount (page intro), multi-step sequences (pulse, orbit).
**Use transitions:** user-triggered state changes (hover, click), when you need smooth interruption handling.

`animation-fill-mode: forwards` keeps the element at its final keyframe state instead of snapping back. Essential for dialogs/popovers that animate in and stay.

Reverse engineer animations from great sites (Stripe, Linear, Aave) by inspecting CSS in DevTools.

> [css-animations/04-keyframe-animations.md](css-animations/04-keyframe-animations.md)

### clip-path

Creates clipping regions that are animatable, hardware-accelerated, and cause no layout shift (the element still occupies its original space).

```css
.image-reveal {
  clip-path: inset(0 0 100% 0);
  animation: reveal 1s forwards cubic-bezier(0.77, 0, 0.175, 1);
}
@keyframes reveal {
  to {
    clip-path: inset(0 0 0 0);
  }
}
```

Shapes: `circle()`, `ellipse()`, `polygon()`, `inset()`. All animatable between matching shapes.

**Use cases:** scroll-triggered image reveals (better than height animation — no layout shift), tab indicator highlights, theme transition (clip dark/light mode over each other). Combine with View Transitions API for the theme pattern without DOM duplication.

> [css-animations/05-the-magic-of-clip-path.md](css-animations/05-the-magic-of-clip-path.md)

---

## Framer Motion (Motion for React)

### Core API

```jsx
import { motion, AnimatePresence } from "motion/react";
```

- **`initial` + `animate`** — defines start and end states. Framer Motion interpolates between them outside React's render cycle, so animation frames don't trigger re-renders.
- **`exit`** — wrapped in `AnimatePresence`, animates elements being removed from the DOM. Each child must have a unique `key` prop or exit won't trigger.
- **`transition`** — `type: "spring"` or `type: "tween"`, plus duration, ease, bounce, stiffness, damping. Defaults: spring for physical properties (x, y, scale, rotate), tween for opacity/color.
- **`variants`** — named animation states for cleaner code. Parent variants can orchestrate children with `staggerChildren` and `delayChildren`.
- **`layout`** — animates any CSS layout change (height, width, flex-direction, justify-content) by measuring before/after and interpolating with transforms. Powerful but can cause distortion with border-radius or child elements — use `layout="position"` to only animate position.
- **`layoutId`** — connects two elements across renders for shared layout animation. The library handles measuring positions and creating the transition. Used for tab highlights, card expansions, button-to-popover morphs.

**AnimatePresence modes:**

- `wait` — old element exits completely before new element enters. Used for content crossfades, wizard steps.
- `popLayout` — elements exit and enter simultaneously. Old element is removed from flow immediately so new element can animate in. Can cause visual glitches with absolutely positioned content.

**Tip:** `initial={false}` on AnimatePresence prevents the initial mount animation — useful when you only want exit/enter animations on state change, not first render.

> [framer-motion/02-the-basics.md](framer-motion/02-the-basics.md), [framer-motion/03-how-do-i-code-animations.md](framer-motion/03-how-do-i-code-animations.md)

### Hooks

- **`useMotionValue`** — creates a mutable value that updates outside React's render cycle. Attach to `style` prop for 60fps animation without re-renders.
- **`useTransform`** — derives a new motion value by mapping input ranges to output ranges. Example: map scroll position `[0, 500]` to opacity `[0, 1]`, or mouse X to rotation degrees.
- **`useSpring`** — wraps a motion value with spring physics for smooth, physically-based transitions between value changes.
- **`useAnimate`** — returns `[scope, animate]` for imperative control. Attach `scope` ref to a parent element, then target children with CSS selectors: `animate("[data-animate='bg']", { scale: 1.1 })`. Supports `await` for sequencing multiple animations.

**Common chain:** `useMotionValue` (tracks raw input) → `useTransform` (maps to animation values) → `useSpring` (smooths the output).

> [framer-motion/07-hooks-and-animations.md](framer-motion/07-hooks-and-animations.md)

### Gestures

`whileHover`, `whileTap`, `whileDrag` props for declarative gesture animations. Drag maintains momentum after release by default (`dragMomentum={false}` to disable). Drag constraints via `dragConstraints` ref or pixel values.

### Patterns

- **Button → popover morph:** use `layoutId` to connect button and popover elements. Add opacity + scale for enter/exit. Blur during transition masks the intermediate states.
- **Multi-step wizard:** `AnimatePresence mode="wait"` for sequential step transitions. Track a direction number (+1/-1) and multiply by x-offset so steps slide left when going forward, right when going back. Use `layout` prop on the container to animate height when steps have different content lengths. Guard against rapid clicking.
- **Trash interaction:** `layoutId` on images in the grid and in the trash creates the "thrown into trash" effect. `AnimatePresence` for toolbar appearing on selection and for image exit animations. Add slight random rotation on trash images for playfulness.

> [framer-motion/04-feedback-popover.md](framer-motion/04-feedback-popover.md), [framer-motion/05-multi-step-component.md](framer-motion/05-multi-step-component.md), [framer-motion/06-trash-interaction.md](framer-motion/06-trash-interaction.md)

---

## SVG Animation

- **viewBox** defines an internal coordinate system (`viewBox="0 0 622 319"`). All positions are coordinates, not flow-based. SVG scales to any display size while animation values stay consistent.
- **Line drawing:** set `strokeDasharray` equal to path length (one dash fills the path). Set `strokeDashoffset` to the same value (hides the dash). Animate offset to 0 to reveal. Use `pathLength="1"` to normalize all paths so they share animation values regardless of actual pixel length.
- **Transform origins:** SVG defaults to viewBox `(0,0)`, not element center. Fix with `transform-box: fill-box` so `transform-origin: center` references the element's own bounding box. In Framer Motion, set `transformOrigin` in the `initial` prop, not `style` — Motion overrides style with `"50% 50%"` on SVG elements.
- **Path morphing:** create a `useMotionValue(0)` for progress, then `useTransform(progress, [0, 1], [pathA, pathB])` to interpolate between two SVG path `d` strings. Animate progress 0→1→0 with `times` array for timing control. For non-matching paths with different command counts, use the flubber library.
- **Imperative SVG with `useAnimate`:** attach scope ref to a parent `<g>` element, then target children via `data-animate` attributes: `animate("[data-animate='clock']", { rotate: 360 })`. Sequence animations with `await`. Set `overflow: visible` on the SVG to prevent clipping during scale overshoot.

> [hero-illustration/](hero-illustration/) (6 lessons covering SVG fundamentals through complex multi-state clock animation)

---

## Good vs Great

- **Brand alignment:** animation speed conveys personality. Slow, measured motion = premium/reliable (Stripe). Fast, snappy motion = innovative/cutting-edge (Linear, Vercel).
- **Interruption handling:** user hovers on/off quickly — the animation shouldn't glitch. Springs handle this naturally by redirecting momentum. CSS transitions snap to new values.
- **Stagger:** animate child elements with sequential delays (50-100ms apart). Creates rhythm, guides the eye through content hierarchy.
- **Direction awareness:** animations should originate from the spatial context of the user's action. Dropdown from a button animates from that button. Tab content switching should slide in the direction the user navigated.
- **Consistency:** establish an animation language for your product and apply it uniformly. All buttons scale `0.97` on press. All popovers use `ease-out` at `200ms`. All exits fade with the same duration. Inconsistency feels broken.
- **Blur as polish:** adding subtle `filter: blur(2px)` during fast transitions masks the intermediate frames where both states are partially visible. Keep under 20px (Safari performance).

> [good-vs-great/01-the-big-little-details.md](good-vs-great/01-the-big-little-details.md)

## Future CSS

- **View Transitions API** — browser-native animated transitions between DOM states. Enables page transitions, theme switches without duplicating elements.
- **Scroll-driven animations** — `scroll-timeline` and `view-timeline` tie animations to scroll progress with zero JS. Pure CSS, great performance.
- **`@starting-style`** — define initial styles for elements entering the DOM, enabling animate-on-appear without JS.
- **`transition-behavior: allow-discrete`** — enables transitioning `display: none → block` and other discrete properties.
- **Native CSS spring animations** — proposal stage. Would bring physics-based motion to CSS without libraries.

> [good-vs-great/04-animations-of-the-future.md](good-vs-great/04-animations-of-the-future.md)

---

## Walkthroughs

### Family Drawer

Analyze Family's iOS drawer interaction → build open/close with spring-based drag → crossfade between different content views within the drawer (one view fades out while another fades in, coordinated with height change) → polish with details like backdrop opacity tied to drag progress.

> [family-drawer/](family-drawer/) (4 lessons)

### Dynamic Island

Analyze Apple's design → build ring/progress view with conic gradient animation → timer view with rolling number counter (each digit is a separate element keyed by value, `AnimatePresence` + `popLayout` for simultaneous enter/exit, `tabular-nums` prevents width jitter) → morph between views using `AnimatePresence mode="wait"` so content fades out before new content fades in, while the container morphs shape with `layout` prop and spring bounce.

> [dynamic-island/](dynamic-island/) (4 lessons)

### Navigation Menu

Use Radix NavigationMenu for keyboard navigation, ARIA attributes, and focus management. Animate dropdown content with opacity/transform on enter/exit. Animate the viewport container to smoothly resize when switching between menu items with different content sizes. Add arrow indicator that follows active item via shared layout animation. Direction-aware content transitions: track which item the user came from to determine slide direction.

> [navigation-menu/](navigation-menu/) (3 lessons)

### Hero Illustration Polish

- **Hover debounce:** wrap hover handlers in a 100ms timeout (useHoverTimeout) to prevent jittery triggers from fast mouse movement across multiple elements.
- **Mobile two-tap pattern:** no hover on touch devices. First tap triggers hover animation, second tap triggers click animation. Shared hook (`useTapState`) tracks readiness across components. Set hover delay to 0ms on mobile since there's no mouse to debounce.
- **Idle animation:** `repeat: Infinity` with `repeatDelay: 2` and initial `delay: 2` so users discover hover naturally before idle loops start. Stop idle on hover, restart on mouse leave.
- **GPU optimization:** apply `will-change`, `contain: layout style paint`, `translateZ(0)` only to `[data-animate]` elements and only when profiling shows dropped frames. Too many GPU layers waste memory.
  > [hero-illustration/06-polish.md](hero-illustration/06-polish.md)
