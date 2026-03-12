# Timing and purpose

When done right, animations make an interface feel predictable, faster, and more enjoyable to use. They help you and your product stand out.

But they can also do the opposite. They can make an interface feel unpredictable, slow, and annoying. They can even make your users lose trust in your product.

So how do you know when and how to animate to improve the experience?

Step one is making sure your animations have a purpose.

## Purposeful animations

Before you start animating, ask yourself: what's the purpose of this animation?

This animation explains how Product Intelligence (Linear's feature) works. We could have used a static asset, but the animated version helps the user understand what this feature does, straight in the initial viewport of the page.

The purpose of this animation is to simplify and visualize a complex product. That's a valid purpose.

Another common purpose is improving perceived performance. For example, a skeleton or placeholder loading state makes the app feel faster while data is loading.

### Invalid purposes

Not every animation has a valid purpose. Sometimes developers add animations just because they can. This can make the interface feel slow and annoying.

Don't get me wrong, delight is a valid purpose. The goal is to not overdo it.

## Duration

The right duration varies depending on the context, the distance an element travels, and the type of element.

Short duration (100–200ms) works for small, frequent interactions like button hovers and tooltip appearances. These shouldn't feel slow.

Medium duration (200–400ms) works for content transitions like page changes, expanding panels, and menus.

Longer duration (400ms+) is typically for elaborate animations on marketing pages.

## Keep your animations fast

Unless you are working on marketing sites, your animations have to be fast. They improve the perceived performance of your app, stay connected to user's actions, and make the interface feel as if it's truly listening. I rarely go above 300ms.

## Don't animate keyboard interactions

Keyboard interactions are common in product UIs. Users navigate through lists, select items, and trigger actions with keyboard shortcuts throughout the day.

The same goes for keyboard-initiated actions. These actions may be repeated hundreds of times a day, an animation would make them feel slow, delayed, and disconnected from the user's actions. You should never animate them.

## Perception of speed

Unless you are working on marketing sites, your animations have to be fast. They improve the perceived performance of your app, stay connected to user's actions, and make the interface feel as if it's truly listening.

A sharp easing curve at the beginning, so it starts fast, with the transition only being noticeable at the very end where it's not losing its snappiness.

This curve is `0.32, 0.72, 0, 1` if you'd like to try it.

## Marketing vs Product animations

Most of the rules above apply to both marketing and product animations, but marketing pages give you more freedom.

Marketing pages are the packaging of your product. They should create a memorable experience for the user, and animations can help achieve that.

These pages are also usually viewed less often than the product itself, so we can be more flexible with the duration of our animations.

Even on marketing pages we need to be careful with the amount of animations we add. If we overdo it, the user will become overwhelmed and animations lose their impact. If everything animates, then nothing stands out.

## Great interfaces

The goal is not to animate for animation's sake, it's to build great user interfaces. The ones that users will happily use, even on a daily basis. Sometimes this requires animations, but sometimes the best animation is no animation.

## Resources

- Animations at Work
