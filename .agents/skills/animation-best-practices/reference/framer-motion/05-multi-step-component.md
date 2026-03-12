# Multi-step component

A direction-aware multi-step component.

## Step animation

Let's try animating the steps first, with no height animation or direction awareness.

Success criteria:

- When the continue or back button is pressed, the exiting step should animate to the left and the entering step should animate from the right.
- The exit animation should consist of opacity and x transition.

## Height animation

Animating the height will make our component look less jarring. Let's try that next.

- The height should animate smoothly when the content changes, it should not use magic numbers.
- The buttons should follow the height animation, they should not jump around.

## Direction awareness

Currently, elements enter from the right and disappear to the left, regardless of whether we are moving forward or backward. We want to flip our x-values depending on the direction.

## Accessibility

Make sure the component is keyboard navigable and screen reader friendly.

## Key takeaways

- Use `AnimatePresence` with `mode="wait"` for sequential step transitions
- Animate height using `layout` prop for smooth content size changes
- Track direction state to make animations contextually aware
- Consider rapid switching — users may click quickly between steps

## Rapid switching

When users click quickly between steps, the animations should handle interruption gracefully without glitching.

## Inspiration

- Stripe's checkout flow
- Apple's setup wizards
