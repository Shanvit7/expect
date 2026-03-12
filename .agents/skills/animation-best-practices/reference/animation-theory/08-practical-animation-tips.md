# Practical Animation Tips

This lesson is a summary of what we learned so far in the form of practical tips, but there are also some tips we haven't covered yet. You can treat this as a reference guide that you can come back to whenever you need to make a decision or feel stuck on an animation.

## Record your animations

When something about your animation feels off, but you can't figure out what, record it and play it back frame by frame. This will not only help you see the animation in a new light, but also help you notice details that you might have missed at normal speed.

I record a ton of my own animations, but also those of others for inspiration.

## Fix shaky animations

If your animation feels shaky or jittery, it might be because you're animating a property that triggers layout recalculations. Stick to animating transform and opacity whenever possible, as these properties are handled by the GPU and won't cause layout shifts.

## Give yourself a break

Sometimes when you're working on an animation, it just doesn't feel right. You've tried everything, but it still feels off. In these cases, it's best to take a break and come back to it later. A fresh pair of eyes can make a huge difference.

## Scale your buttons

Add a subtle scale effect to buttons on press (:active). It gives the user immediate feedback and makes the interface feel more responsive. A scale of around 0.97 works well.

## Don't animate from scale(0)

Such animations just don't look good and feel weird. Nothing in the world around us can disappear and reappear like that. Instead, you can combine an initial scale like 0.5 with opacity animation.

## Don't animate subsequent tooltips

Tooltips should have a slight delay before appearing to prevent accidental activation. Once a tooltip is open however, hovering over other tooltips should open them with no delay and no animation.

Radix UI and Base UI skip the delay once a tooltip is shown. Base UI allows you to skip the animation as well by targeting the `data-instant` attribute and setting the transition duration to 0ms.

```css
.tooltip {
  transition:
    transform 0.125s ease-out,
    opacity 0.125s ease-out;
  transform-origin: var(--transform-origin);

  &[data-starting-style],
  &[data-ending-style] {
    opacity: 0;
    transform: scale(0.97);
  }

  /* Skip animation for subsequent tooltips */
  &[data-instant] {
    transition-duration: 0ms;
  }
}
```

## Make your animations origin aware

Animations should originate from their trigger point. All kinds of popovers should animate from the trigger, not from the center. This makes it feel more natural as it won't appear out of nowhere. Setting the right `transform-origin` is key.

## Keep your animations fast

Unless you are working on marketing sites, your animations have to be fast. Rarely go above 300ms. They improve the perceived performance of your app and stay connected to user's actions.

## Don't animate keyboard interactions

Keyboard interactions may be repeated hundreds of times a day. An animation would make them feel slow and disconnected. You should never animate them.

## Be careful with adding animations to frequently used elements

Elements that users interact with repeatedly throughout the day should have minimal or no animation. What feels delightful the first time can quickly annoy you.

## Hover flicker

When you add a hover animation that changes the position of the element, it sometimes means that the cursor is not on that element anymore. This causes the element to flicker back and forth. The solution is to add a child to your box and change its position instead. This way hovering on the parent won't cause it to change its position, only the child will.

## Appropriate target area

Sometimes you can have a button that is visually quite small which makes it harder to tap on touch devices. The fix is to use a `::before` pseudo-element to create a larger hit area without changing the layout. Apple recommends that interactive elements should have a minimum of 44px.

## Use ease-out for enter and exit animations

If you are animating something that is entering or exiting the screen, use ease-out. It accelerates at the beginning which gives the user a feeling of responsiveness.

## Use ease-in-out for elements that are already on the screen

When something that is already on the screen needs to move, use ease-in-out. It mimics the motion of a car accelerating and decelerating, so it feels more natural.

## Disable hover effects on touch devices

Use `@media (hover: hover)` to ensure hover effects only apply on devices that support hover.

```css
@media (hover: hover) {
  .card:hover {
    transform: scale(1.05);
  }
}
```

## Use custom easing curves

The built-in easing curves in CSS are usually not strong enough. Custom easing curves feel more energetic. You can find custom easing curves at easings.co.

## Use blur when nothing else works

When a transition between two states doesn't look smooth, adding a subtle blur during the transition can help mask the imperfections.

## Does this matter?

When I look at these tips, I know that some of them are absolutely game-changing, while others some people might not even notice. Both of them are equally important. They make the interface feel cohesive and consistent which makes it more predictable. It allows the user to focus on their task rather than the interface.

I think it's actually good when details go unnoticed. That means that users use our product without any friction, a seamless experience. That's what great interfaces are all about. Not animations, not details, not delight, but enabling the user to achieve their goals with ease.
