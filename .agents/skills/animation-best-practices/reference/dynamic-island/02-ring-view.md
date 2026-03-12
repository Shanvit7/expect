# Ring view

Our approach to building the Dynamic Island will differ from previous exercises. Instead of step-by-step exercises, I'll show you how I built each piece. This component is quite unusual, and some solutions are equally unconventional.

## Starter code

We change the active view through two buttons that set the view state to either "ring" or "idle". The current view is rendered via a `useMemo` hook, the same way as the Family Drawer.

The ring component renders a few things conditionally and slightly adjusts the styling based on the `isSilent` value which changes automatically every 2 seconds through a `useEffect` hook.

## Building the ring animation

We'll use Framer Motion's keyframes feature for this animation. The ring view consists of:

- The bell icon that animates (rings)
- A silent mode toggle that crossfades
- Spring-based transitions for the container size change

## Key implementation details

- Use `AnimatePresence` for transitioning between ring states (ringing vs silent)
- Keyframe animations for the bell ringing motion
- Spring animations for the container morphing
- Coordinate timing between content and container animations
