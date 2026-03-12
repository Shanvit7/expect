# Hooks and animations

We've now animated things mainly using initial, animate and exit props. While these props are very powerful, and I personally use Framer Motion this way ~90% of the time, this library has more to offer.

Hooks like `useSpring` or `useTransform` can help us in cases where the animate prop is not enough. But before we dive into these hooks, we need to understand what motion values are.

## Motion values

Motion values are primitives from Framer Motion that update their value outside of React's render cycle. That's what allows us to animate at 60 frames per second as we are not triggering any re-renders each time the transform value changes.

To create a motion value we can use the `useMotionValue` hook. The string or number passed to the hook will act as its initial state. Motion components can read and write to motion values via their `style` prop.

## useTransform

The `useTransform` hook allows us to create a new motion value that transforms the output of one or more motion values. This is incredibly useful for creating dependent animations — for example, as the user scrolls, you can transform the scroll position into opacity or scale values.

## useSpring

The `useSpring` hook creates a motion value that animates to its target with a spring simulation. It's useful when you want physical, springy motion that responds to changing values.

## Combining hooks

The real power comes from combining these hooks. You can use `useMotionValue` to track mouse position, `useTransform` to map it to rotation values, and `useSpring` to smooth the transitions.

## Resources

- Framer Motion hooks documentation
- useMotionValue API reference
- useTransform API reference
