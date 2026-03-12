# Timer view

This view is less complicated than the ring view. It has one constant animation and one button animation on the left where we animate the pause button into a play button.

## Starting point

The countdown uses a `setInterval` inside a `useEffect` to go from 60 to 0, then it resets. One important detail: we use `tabular-nums` for our numbers, which keeps them monospaced and their sizes consistent. Otherwise, they would slightly shift each time the number changes.

## Number animation

This is a great use case for `AnimatePresence`, as each number is rendered separately with a unique key. We wrap our `countArray` with `AnimatePresence` and set `initial={false}` and `mode="popLayout"`. We don't want to animate on the initial render, and we want the elements to exit and enter simultaneously.

The numbers come from the bottom and disappear to the top, creating a rolling counter effect.

## Play/Pause button

The play/pause button transition is a simple `AnimatePresence` swap between two icons with a crossfade animation.
