# Why Framer Motion

Framer Motion allows us to create very impressive, native-like animations with not a lot of code. Because of that, many things happen magically, and once you run into an issue it can be hard to debug.

## The power of Framer Motion

How would you code a tab highlight animation without this library? You'd need to calculate the highlight's new position based on the tab's dimensions and its distance from the left side. That's only the highlight part. Now, we'd need to find a way to smoothly change the direction as well.

This whole component, including the styles and inline SVGs, is only 76 lines of code. That alone would convince me to start using Framer Motion for more complex animations.

Remember the spring animation example? It consists of 33 lines of code, is interruptible and maintains momentum. Try building it again without Framer Motion or a similar library. It'd be a lot of work.

Also, in React, it's usually difficult to animate components once they've been removed from the DOM, because they're not there anymore. By wrapping your components with `AnimatePresence` provided by Framer Motion, you can animate them out as well.

```jsx
import { motion, AnimatePresence } from "motion/react";
```

## React Spring

Another popular React animation library. You can write declarative and imperative animations with it. Declarative ones can be defined as simple descriptions. This API avoids the need for you to interact with the DOM via selectors, refs or other kinds of error-prone identifiers.

## GSAP

The first animation library many developers use. Powers a lot of awwwwards websites. It's framework-agnostic and doesn't support spring animations. Framework-agnostic is actually a con here, because framework-specific libraries usually provide a better developer experience.

Since this lesson was published, GSAP has been acquired by Webflow and all of its features are now free.

## Framer Motion

Framer Motion is what this course uses. It's declarative, supports spring animations, exit animations via AnimatePresence, layout animations, and much more.

## Framer Motion is now Motion

Framer Motion has been renamed to Motion for React. The course will keep referring to it as Framer Motion to avoid confusion.

## Other alternatives

There are other alternatives like:

- Motion One
- Auto Animate
- Various CSS-only approaches

## Resources

- Framer Motion documentation
- React Spring documentation
- GSAP documentation
