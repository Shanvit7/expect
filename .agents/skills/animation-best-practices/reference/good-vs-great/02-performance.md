# Performance

Making animations that are performant on all devices is actually pretty tricky. What CSS properties should you animate? Should you use Javascript or CSS animations? What are hardware-accelerated animations?

If our animations are not performant, everything we learned so far will not create the desired effect. Imagine if Sonner ran on 30 frames per second — it wouldn't feel nearly as good.

Performant animations run at 60 frames per second, the same as most screen refresh rates. We need to be able to re-render in ~16.7 milliseconds (1000/60). This is required for our brain to perceive motion as fluid.

## How do browsers render

To understand performance, we need to understand the rendering pipeline:

1. **Style** — The browser calculates which CSS rules apply to each element
2. **Layout** — The browser calculates the size and position of each element
3. **Paint** — The browser fills in pixels for each element
4. **Composite** — The browser draws layers in the correct order

## What to animate

The best properties to animate are **transform** and **opacity** because they only trigger the composite step, which is the cheapest. These can be offloaded to the GPU.

Properties like `width`, `height`, `margin`, `padding` trigger layout recalculations which are expensive and will cause jank.

## Hardware acceleration

GPU-accelerated animations remain smooth even when the main thread is busy. Properties that trigger only compositing (transform, opacity, filter) can be GPU-accelerated.

## will-change

Sometimes one animation can be handled by both the CPU and the GPU — there's a hand-off between the two. This can cause our animation to shift sometimes. To avoid this, we can use the `will-change` property to ensure that the animation will be handled exclusively by the GPU.

## React re-renders

Animation libraries like react-spring or Framer Motion animate things outside of React's render cycle. This means the animation won't cause unnecessary re-renders.

However, issues can arise with Shared Layout Animations. At Vercel, the active highlight of a tab was animated with Shared Layout Animations, and because the browser was busy loading the new page, the animation dropped frames. They fixed this by using CSS animations which moved the animation off the CPU.

## Resources

- Sidebar Animation Performance by Josh Wootonn
- CSS for JS Developers by Josh Comeau
