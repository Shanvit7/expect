# Transforms

Most animations that go beyond simple hover effects use the transform property. Before we dive deep into the world of writing animations in code, let's first understand how transform works.

The CSS transform property allows us to change how a given element looks. It's very powerful, because it's not only about moving the element on the y or x axis. We can move it, rotate it, scale it, and translate it. This unlocks a lot of possibilities when it comes to animations.

## Translation

The translate function allows us to move an element around. Positive values move an element down and to the right, negative values move up and to the left.

We can either use `translate(x, y)`, or, if we only want to move the element on one axis, `translateX(x)` or `translateY(y)`. I usually use the latter because it's more readable.

Using translate doesn't change its position in the document flow. This means that the element will still occupy the same space as if it hadn't been translated.

## Scale

Scale allows us to resize an element. A value of 1 means the element will keep its original size, a value of 2 will double its size, and a value of 0.5 will halve it.

A common use case for scale is a press effect on buttons:

```css
button {
  transition: transform 150ms ease;
}

button:active {
  transform: scale(0.97);
}
```

Another cool use case for scale is a zoom effect. A subtle benefit of using scale here is that it scales the border radius correctly as well.

A tip for using `scale()` is to (almost) never animate from `scale(0)`. Such animations just don't look good and feel weird. Nothing in the world around us can disappear and reappear like that. Instead, you can combine an initial scale like 0.5 with opacity animation.

## Rotate

Used less often than the two previous functions, but as the name suggests, rotate allows us to rotate an element.

## Transform Origin

The transform-origin property defines the point around which a transformation is applied. By default, it's set to the center of the element (50% 50%).

All kinds of popovers should animate from the trigger, not from the center. This makes it feel more natural as it won't appear out of nowhere. That's where setting the right transform-origin comes in handy. Radix supports this out of the box via a css variable.

## Order of transforms

The order of transforms matters. In the demo below we first apply rotate and then translateX. Try switching them around to see how the order affects the animation.

## 3D Transforms

CSS transforms can work in 3D as well. `rotateY` rotates an element around the Y-axis. 180° is the back of the element, upside down.

`translateZ` moves the element along the z-axis. Positive values bring the element closer to the viewer, while negative values push it farther away. You won't see its effect unless you add perspective to the parent element.

`transform-style: preserve-3d` property enables an element to position its children in 3D space, rather than flattening them into a 2D plane.

`perspective` defines the distance between the viewer and the z value, creating depth perception. The closer the viewer is to z0, the more pronounced the 3D effect will be.

## 3D Transforms in action

Once you get a good grasp of 3D transforms, you can create some really unique effects that seem impossible to achieve with just CSS.

## Exercise: Sonner stacking layout

Recreate Sonner's stacking layout. This is not only a good layout for this specific toast component, but you can use it for a stack of cards, or even for nested dialogs.
