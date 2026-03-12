# The Basics

While Framer Motion is a very powerful animation library and is relatively easy to start with, it still differs from CSS animations. We'll go over the basics first and get comfortable with the library.

## Anatomy of an animation

To animate with Framer Motion we need to use the motion element. It's a wrapper around the native HTML elements that allows us to animate them using Framer Motion's API.

### Framer Motion imports

Framer Motion is now Motion for React. We still use motion imports in this course, but the API of the library is the same. The only difference is the import path.

When working with animations you have a start and an end state. In Framer Motion, you can define these states using the `initial` and `animate` props. The `initial` prop defines the starting state of the animation, while the `animate` prop defines the end state.

This will make our element invisible when it renders the first time (at mount time). To define our end state, we simply add an animate prop, and define the properties we want to end up with.

When we inspect a Framer Motion animation we can see that the value we provided isn't immediately applied. It's interpolated — the value is gradually changed. The animation is done in JavaScript and not CSS.

The animation happens outside of React's render cycle, so every time the animation updates, it doesn't trigger a re-render, which is great for performance.

By default, Framer Motion will create an appropriate animation for a snappy transition based on the types of value being animated. For instance, physical properties like x or scale will be animated via a spring simulation. Whereas values like opacity will be animated with a tween (duration-based).

## Transition prop

The transition prop allows us to define the type of animation we want to use. We can set the type to spring or tween, and define the duration, easing, and more. This gives us full control over how the animation looks and feels.

## Exit animations

To handle exit animations, Framer Motion provides the `AnimatePresence` component. We add an `exit` prop to our motion element which defines what should happen when the element is removed from the DOM.

It also has different modes. The `wait` mode animates between two elements sequentially — when you click, the first icon animates out, and only after that, the second animates in.

### Tip

With exit animations, it's important to include `initial={false}` on AnimatePresence. This tells Framer Motion not to animate on the initial render.

If an animation involving AnimatePresence is not working, make sure you have a `key` prop on the element. Otherwise, the component won't be unmounted and the exit animation won't be triggered.

## Variants

Variants are predefined sets of targets which can then be used in the initial, animate, and exit props. They help keep animation definitions clean and reusable.

## Animating height

This is always a tricky thing in CSS. Framer Motion makes it much easier with layout animations. By adding the `layout` prop, we can animate height changes smoothly without knowing the exact pixel values.

## When should you use Framer Motion?

Use Framer Motion when:

- You need spring animations
- You need exit animations (AnimatePresence)
- You need layout animations
- You need gesture-based animations
- You need shared layout animations
- You need complex, multi-step animations
