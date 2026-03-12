# Morph effect

This is our final piece of the Dynamic Island. Let's look at the morphing effect from Apple's Dynamic Island.

## How Apple does it

Most of the time, the Dynamic Island transitions between its idle state and an activity, like a phone call. This is easier because it transitions from a black background to a rich view rather than between two UI-rich states.

It becomes tricky when morphing between two rich states. Apple avoids showing both states simultaneously by using a method similar to `wait` mode in `AnimatePresence`. The exiting state disappears before the entering state starts to animate in.

## Our approach

Animating with `popLayout` would introduce issues, because we animate these views inside a container that changes both height and width. Because a lot of stuff inside is positioned absolutely, using `popLayout` would cause visual glitches.

Instead, we use `wait` mode and coordinate the container size animation with the content transitions. The container morphs its shape while the content fades out and then in.

## Key techniques

- `AnimatePresence` with `mode="wait"` for sequential content transitions
- `layout` prop on the container for smooth size morphing
- Spring animations with bounce for the elastic "living" feel
- Careful timing coordination between container and content animations
