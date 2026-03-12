# First animations

This component might look a bit overwhelming at first, that's why we'll break it down into smaller parts.

## Starting point

Our starting point is the component with the drawer appearing instantly. It's not draggable, you can't close it with the Escape key, and focus is not trapped within the drawer (accessibility issue).

## Using Vaul

We could either code these features ourselves, or use an existing solution. While enter and exit animation and focus trapping are relatively easy to implement, dragging is more complex — especially if we want momentum-based dragging, matching overlay's opacity with drag progress, and more.

I built an open-source drawer component in 2023 called Vaul. It mimics the iOS Sheet component and is perfect for this use case.

## Height animation

The first animation to add is the height transition when switching between drawer views. We'll use Framer Motion's layout animations to smoothly interpolate between different content heights.

## Exercise

Implement the basic height animation using Vaul as the drawer component and Framer Motion for the height transitions.
