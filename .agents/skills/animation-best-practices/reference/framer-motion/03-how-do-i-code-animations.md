# How do I code animations

In this lesson, we'll cover some of the advanced features of Framer Motion that I often use.

## Layout animations

The most powerful feature of this library is the `layout` prop. This is what enables our animations to feel native on the web. If we'd want to recreate the App Store's card animation, we'd have to make the card larger to cover the whole screen.

That's where layout animations come in. They allow us to animate any layout changes easily. Properties that were not possible to animate before, like flex-direction or justify-content, can now be animated smoothly by simply adding the layout prop.

This is relatively simple to implement, but there is a lot of magic happening under the hood. Because of that, things might not always work as expected in some more complex animations that involve layout changes. You can experience some distortion, or other weird issues.

If you are interested in learning how layout animations work under the hood, you can read "Inside Framer's Magic Motion" — an article about recreating Framer Motion's layout animations from scratch.

## Shared layout animations

Thanks to shared layout animations, we can basically connect two elements and create a smooth transition between them. We are not actually moving the element ourselves, the library does it for us.

We can also use it to make a highlight animation. The highlight (div with gray color) is rendered for the active element only, and the library animates it between positions using `layoutId`.

## Gestures

Framer Motion provides gesture support through props like `whileHover`, `whileTap`, and `whileDrag`. The drag gesture is particularly interesting — the draggable element maintains momentum when dragging finishes, which helps it feel more natural. We can disable this with `dragMomentum={false}`.

## App Store-like transition

Using shared layout animations to create an App Store-like card expansion. This uses `layoutId` to connect the card in the list with the expanded view.

Keep in mind that it's not finished — there is a small text jump when you click on the card and in dark mode, there's a slight white border present when animating.

## That's it

These are the core features of Framer Motion that you'll use most often:

- `initial` and `animate` for basic animations
- `exit` with `AnimatePresence` for exit animations
- `layout` for layout animations
- `layoutId` for shared layout animations
- Gesture props (`whileHover`, `whileTap`, `whileDrag`)
- `variants` for reusable animation definitions

## Resources

- Inside Framer's Magic Motion
- Framer Motion documentation
