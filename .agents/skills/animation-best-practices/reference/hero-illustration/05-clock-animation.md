# Clock animation

This clock has a fun easter egg - click it and the hands will spin to show you the actual time. We'll build this animation step by step: bells swinging sideways in idle state, alarm going off on hover, current time animation on click and feedback on subsequent clicks.

## The SVG structure

The SVG has three main elements:

- Background: This will scale and rotate based on state.
- Clock: Containing the clock face and the hour and minute hands.
- Bells: Two bells on top of the clock.

The bells are grouped with the clock inside clock-and-bells so we can rotate and scale them together during certain animations.

## Transform origins

We use explicit pixel coordinates for transformOrigin. The transformBox: "view-box" style makes these coordinates relative to the SVG's viewBox.

Notice we set transformOrigin in initial rather than style. This is important because when you set it in style, Motion will override it with its default "50% 50%" origin for SVG elements.

## Idle: Bells swing

The bells rotate left, then right, then back to center, repeating every 2 seconds. We can use animateVariant directly to start this animation on mount since it's the only idle animation in this component.

## Hover: The alarm goes off

When you hover, the background tilts and compresses, the clock shakes horizontally, the bells group moves up, and each individual bell shakes independently.

The background uses a simple rotate and scale sequence. The clock-and-bells group translates up to create a jump effect. The clock face shakes horizontally with rapid x translations.

## Click: Show the time

The clock hands spin to the current time. The hour hand does one full spin, the minute hand does two. Spring transitions create a natural, bouncy spin effect.

While the hands spin, the clock-and-bells group animates into an upright position to create a settling effect.

The click handler brings everything together. On mouse leave, we reset everything back to the initial state and restart the idle animation.

## Click again: Just a pulse

After the first click, the clock settles into its upright position. Clicking again would replay the same animation, tilting it back upright - we don't want that.

On subsequent clicks, we can ignore the hands as they're already showing the time. We just want feedback to acknowledge the click.

This variant maintains the rotation from the first click but just animates the scale. The handler uses a ref to track whether this is the first click.

When the user leaves the clock, we reset the ref so it starts fresh next time.

In the next lesson, we'll polish this into a production-ready component with mobile support, idle life, and performance optimization.
