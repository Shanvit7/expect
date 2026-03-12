# Click animation

In this lesson we'll build the click animation. We'll layer transform-based animations, path morphing, and stroke dash effects with careful timing to make everything feel unified.

## What we're working with

The hand SVG we'll be working with has three main elements:

- Background: We'll scale this when the hand clicks for extra feedback.
- Hand: A single path element we'll morph between resting and clicked shapes.
- Three lines: All line elements are of the same length and will be animated with the strokeDashoffset method discussed in the previous lesson.

Notice the data-animate attributes on each element. We'll use these to target them in our animation functions.

## Why useAnimate

This animation coordinates 4+ elements with staggered timing. All triggered from different events (hover, click, idle timer) with precise coordination between them.

A declarative approach would require managing animation states. Every state change triggers a re-render, even though we're just updating animation phases.

Then there's path morphing - there's no declarative way to interpolate between SVG paths, so we're forced into imperative code regardless.

The biggest pain is coordinating completion. When the user's mouse leaves, we need to wait for all the "leave" animations to finish before starting the idle loop. With declarative variants, there's no built-in way to await completion across multiple elements.

With useAnimate, we get imperative control that lets us coordinate everything cleanly.

## Setting up useAnimate

We're calling useAnimate which gives us a scope ref and an animate function. The ref gets attached to a parent g element, creating a scope for our animations. Any element inside this scope can be targeted by our animate function.

When the mouse enters, we use animate with a CSS selector "[data-animate='background']" to find our background element. This is more flexible than using refs when you need to animate multiple elements.

The animation itself is a keyframe sequence. We pass an array of transform values creating compress, overshoot, then settle.

We don't need to explicitly define transform-box: fill-box style on the motion.g element as motion does this by default on SVG elements, and sets the transform-origin to 50% 50% (or center) which is exactly what we need.

We also set overflow: visible on the SVG to make sure that the SVG doesn't clip the background path when it overshoots the SVG bounds.

## Moving the hand into clicked position

For the hand path morphing, we use useMotionValue and useTransform. There are libraries like flubber for complex path morphing, but for matching paths, useTransform is all we need.

The pattern for path morphing with Motion:

We create a useMotionValue for the animation progress, then useTransform converts that progress into interpolated SVG paths. We pass it the progress value, the input range [0, 1], and the two paths to morph between. When the progress value changes, the path automatically updates.

When we animate the progress from 0 to 1 to 0, we get open hand to clicking hand to open hand. The times array controls when these transitions happen - the hand starts morphing at 40% through the animation, reaches full curl at 60%, and returns to open by 90%.

## Drawing the motion lines

Now we'll animate the motion lines using the stroke dash technique from the previous lessons.

We're normalizing the line length with pathLength="1" and creating a dashed pattern with strokeDasharray.

## Coordinating hover enter and leave

We make handleMouseEnter async and await one of the animations. Since they all have the same duration, any one works. Once it completes, we set the ref to true.

We reset it to false in handleMouseLeave, and guard against early clicks in handleClick.

Alternative approaches include await Promise.all([...animations]) if durations differ, or using .then() notation.

## Idle animation

When users aren't interacting with the animation, we want it to subtly loop to catch their attention. This means starting an infinite animation on mount, then restarting it when the user's mouse leaves.

The key properties are repeat: Infinity to loop forever, and repeatDelay: 2 to wait 2 seconds between loops.

We also use delay: 2 for the initial delay. This gives users time to discover the hover interaction naturally before the idle animation starts.
