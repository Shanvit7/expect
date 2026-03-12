# Polish

The clock works. It responds to hover, animates the hands to the current time, handles all the interactions. But something's missing. That subtle aliveness you see in UIs that truly stand out. Let's improve it!

We'll work on subtle movement, better interaction feel, mobile support, accessibility, and performance optimization for complex scenes.

## Subtle life

When idle, everything is completely still. It works, but it doesn't feel alive. We need some barely-noticeable movement to make the scene feel more organic.

We'll add gentle floating to the illustrations and subtle rotation to the backgrounds. Instead of writing animation logic in each component, we create reusable animation utilities. When every element in the scene is animated in this subtle way, it creates a sense of life and movement. Especially when all the elements have some special, unique movement to them too from time to time, like the lightbulb blinking.

## Preventing accidental triggers

Try moving your mouse quickly across the clock. The animation triggers way too quickly, it's jittery and annoying. That's why tooltips have slight delays, to prevent accidental triggers.

The fix is to simply trigger the hover only if the mouse stays for a tiny bit.

A simple approach is debouncing the hover with a useHoverTimeout hook. This ensures that the hover will be triggered only after you hovered for at least 100ms. It accepts a delay prop and two callbacks, onHoverStart and onHoverEnd that fire when the hover starts (after the delay) and ends. We can then use this hook and apply it to each of the components.

## Mobile support

On desktop, hover and click are separate events. On mobile, there is no hover - you only have taps. We need to split the interaction into two taps: first tap triggers hover state, second tap triggers click animation.

The approach: a shared hook that tracks tap state across many components. On desktop, isReadyForClick is always true. On mobile, it starts as false. First tap calls markTapped() to enable the click, second tap proceeds with the click animation.

Now connect this to our hover and click handlers. The trick is making handleClick return early on the first tap, which allows handleMouseEnter to fire and play the hover animation.

First tap: handleClick returns early, handleMouseEnter fires. Second tap: isReadyForClick is true, click animation runs. When the user taps outside, handleMouseLeave calls resetTap() to prepare for the next interaction.

We also set the delay to 0 in useHoverTimeout for mobile devices because the first tap should trigger the hover animation immediately as there's no mouse movement to debounce.

## Performance

You might notice slight frame drops as the hover animation plays. Usually when you hit performance issues with SVGs there are a few things you can do:

- will-change tells the browser which properties we'll animate. The browser promotes these elements to their own GPU layer, which gets animated separately without recalculating the entire page on every frame.
- contain: layout style paint isolates the element's rendering - changes here won't trigger repaints of sibling elements.
- transform: translateZ(0) forces GPU layer creation as a fallback, especially useful for filtered elements where blur calculations are expensive.

Don't add these preemptively, GPU layers use memory. Too many layers hurt performance instead of helping. Build your animation, test it, and only add will-change when you see dropped frames. We're targeting [data-animate] specifically, not every element.

For a deeper dive into performance, you can view the performance lesson.

## Wrapping it up

The key takeaway from this entire walkthrough is that great animations aren't just about the motion itself - they're about the details that make them feel alive and polished. Always consider mobile interactions, performance, and accessibility alongside the actual animation work.
