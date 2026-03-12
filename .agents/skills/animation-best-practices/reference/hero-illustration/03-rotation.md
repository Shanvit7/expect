# Rotation

We know how to position shapes and animate lines. Now let's rotate them. Click the clock to see the hands rotate around the clock center.

Those hands use transform origins to rotate around a specific point. Let's see how it works.

## The problem with SVG transforms

Let's rotate a rectangle. It rotates around the corner instead of its center. This is because SVG transforms use coordinate (0, 0) as the default origin - the top-left corner of the viewBox.

You might try to fix this with transform-origin: center, like you would in HTML. But in SVG, center refers to the center of the viewBox, not the element. So this still doesn't give the desired result.

## Using explicit coordinates

The solution is to set transform-origin to the exact center coordinates of the element. For a rectangle at x=40, y=30 with width=20 and height=40, the center is at (50, 50).

## Exercise: Build a clock

Build a simple clock with two hands that rotate around the center.

Success criteria:

- Clock circle positioned at the center of the canvas.
- Both hands start at the center of the clock.
- Hands rotate around the clock's center when animated.

## A simpler approach with transform-box

The explicit coordinate approach works, but it has a downside: if you move the clock or change its size, you need to recalculate the transform-origin coordinates. There's a more flexible solution using transform-box: fill-box.

This property changes the reference point for transform-origin. Instead of using viewBox coordinates, it uses the element's bounding box - making transform-origin work like it does in HTML.

Now center refers to the center of the rectangle itself, not the viewBox. Try moving the rect shape around - the transform-origin moves with it.

## Challenge

Refactor your clock from the previous exercise to use transform-box: fill-box instead of explicit coordinates.
