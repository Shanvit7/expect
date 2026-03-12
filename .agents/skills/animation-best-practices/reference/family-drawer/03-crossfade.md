# Crossfade

## Updated UI

The UI has been split into multiple files — a components file that contains all the views. These views are used in a `useMemo` hook, which is the preferred approach for conditional rendering with multiple possible outcomes. If it were just two components, a ternary would work.

## Implementation details

- Uses arbitrary Tailwind values (e.g., `mt-[21px]`) to match Family's Figma file spacing exactly
- Uses `clsx` for conditionally adding classes to elements
- Uses `popLayout` mode on `AnimatePresence` for the crossfade effect

## The crossfade effect

The crossfade is a crucial part of the animation. The old content fades out while the new content fades in simultaneously. This prevents any jarring jumps between states.

Key implementation:

- Use `AnimatePresence` with `mode="popLayout"` to allow both entering and exiting elements to animate simultaneously
- Apply opacity and slight y-offset animations to both entering and exiting content
- Coordinate the timing so the crossfade feels natural
