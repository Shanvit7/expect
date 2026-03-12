# Spring animations

We want to design motion that feels natural and familiar. While using the right type of easing already helps, these easings are made based on a curve and a duration. That means that we can't create a perfectly natural motion, because the movement in the world around us doesn't have a fixed duration.

Spring animations can help here as they are based on the behavior of an object attached to a spring in a physical world, so it feels more natural by definition. They also don't have a duration, making them more fluid.

```css
.element {
  animation: scaleUp 0.3s ease-out;
}

@keyframes scaleUp {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
```

## Spring physics

Spring animations are configured with values inspired by real physics:

- **Stiffness** — How rigid the spring is. Higher stiffness means the animation reaches its target state faster but feels more aggressive. Lower stiffness results in a more gentle, slower animation.
- **Damping** — Controls how quickly the spring stops bouncing. Higher damping reduces oscillation, while lower damping allows for more bounce.
- **Mass** — Affects the weight of the element. Higher mass makes the animation feel heavier and slower to start and stop.

## Interruptibility

One of the biggest advantages of spring animations is that they are interruptible. This means that if you interrupt a spring animation by triggering a new one, it will smoothly transition to the new state without any jarring jumps. CSS transitions are not interruptible.

Try adding toasts quickly and notice how they jump to their new positions.

## Bounce

While spring animations can have a bouncy effect, there are only a few instances in product UI where a bounce is appropriate. For a more physical feel, a slight bounce at the end of a drag gesture might make sense. However, if you simply press to close, there's no bounce at all.

The drag works, because the user has to drag to dismiss. A drag requires some force, you need to drag your finger over the screen, so adding a bounce makes this transition feel more natural. Just like throwing a ball against the wall.

I tend to avoid bounce in most cases, and if I do decide to use it, it's a very small value. Generally, having no bounce at all should be your default to ensure that your transitions feel natural and elegant.

## Should you use spring animation for everything?

You might be thinking that spring animations are better than CSS animations in every way. That's not the case. Spring animations can improve animations that involve more motion like the trash interaction. It's a trade-off that requires consideration.

## Vaul as example

I wanted it to feel like the iOS Sheet component, which utilizes spring animations. This would mean that I'd need to use a library like Framer Motion. However, I wanted to keep Vaul's package size small, so using a large library wasn't really an option. I decided to prioritize a smaller package size over a more native feel in this case.

## Spring animations in Figma

You can also use spring animations in Figma. They wrote a great article about the implementation of spring animations in their design tool. How Figma put the bounce in spring animations.

## What's next?

We've now covered the theory of spring animations. We'll put them into practice later in the Framer Motion module.
