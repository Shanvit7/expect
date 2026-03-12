# Accessibility

Animations are used to strategically improve an experience. To some people, animations actually degrade the experience. Animations can make people feel sick or get distracted. That's not the experience we want to build.

Most devices today allow users to convey their preference for animations. You can read this preference in browsers using the `prefers-reduced-motion` CSS media query.

When that preference is present, we should consider removing, reducing or replacing animations.

## Workflow

Here's a workflow for building accessible animations:

1. Build the animation
2. Check if `prefers-reduced-motion` is set
3. If yes, decide whether to remove, reduce, or replace the animation

## prefers-reduced-motion in CSS

```css
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none;
    transition: none;
  }
}
```

## prefers-reduced-motion in JavaScript

You can also check this preference in JavaScript:

```javascript
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

## Framer Motion's ReducedMotion

Framer Motion provides a `useReducedMotion` hook that makes it easy to respect the user's preference.

## Remove vs Reduce vs Replace

- **Remove**: Simply disable the animation entirely
- **Reduce**: Keep the animation but make it subtler (shorter duration, less movement)
- **Replace**: Swap the animation for a different, less triggering one (e.g., replace a slide with a fade)

The best approach depends on the specific animation and its purpose. A decorative animation can be removed, but a functional animation (like a page transition) should be reduced or replaced.

## Focus management

When animations involve content changes, make sure focus is managed properly for screen reader users. Content that appears after an animation should be focusable and announced.
