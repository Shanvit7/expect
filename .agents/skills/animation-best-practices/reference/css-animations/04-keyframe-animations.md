# Keyframe Animations

Similar to transitions, keyframe animations offer another way to interpolate between states.

## Keyframe animations vs transitions

### Use keyframe animations when:

- You need infinite loops (marquee, spinner)
- The animation runs automatically (intro animation on a page)
- You need multiple steps/states (pulse animation)
- Simple enter or exit transitions that don't need to support interruptions (dialog, popup)

### Use CSS transitions when:

- User interaction triggers the change (hover, click, etc.)
- You need smooth interruption handling (Sonner)

## Creating keyframe animations

We define a keyframe animation using the `@keyframes` at-rule. It consists of a name and a set of keyframes that describe the animation's states.

## Maintaining end state

By default, the animation resets to the initial state after it finishes. Often times we want to maintain the end state of our animation (think of a dialog or a popover). We can do it by adjusting the `animation-fill-mode`. In our case we want to maintain the end state, so we set it to `forwards`.

There are also other values for animation-fill-mode like `backwards` or `both`, but `forwards` is definitely the most common one.

## Complex animations

Keyframe animations can have multiple steps. For example, a marquee animation, a pulse animation, or an orbiting animation.

The movement of the purple ball in the video below could be done with keyframes, but more complex physics-based motion is better handled by Motion library.

## Exercise: Orbiting animation

Animate an element orbiting around another element using keyframe animations and 3D transforms. Bonus points if you can make it grow and shrink depending on the distance between the viewer and the circle.

An orbiting animation is not a work of art on its own. It's just giving you the tools to create something beautiful. The loader animation uses this orbiting technique, it's just a different design and an extra animation at the end.

## Reverse engineering

If you like an animation, you can inspect the CSS in the browser and reverse engineer it. Great sites for reference:

- Stripe's marketing pages and their design system
- Linear's marketing pages
- Aave's site (their docs are also full of pleasant surprises)

Curate a list for yourself and be very selective.
