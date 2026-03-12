# The Magic of Clip Path

clip-path is often used for trimming a DOM node into specific shapes, like triangles. But what if I told you that it's also great for animations?

## The Basics

The clip-path property is used to clip an element into a specific shape. We create a clipping region with it, content outside of this region will be hidden, while content inside will be visible. This allows us to easily turn a rectangle into a circle for example.

```css
.circle {
  clip-path: circle(50% at 50% 50%);
}
```

This has no effect on layout meaning that an element with clip-path will occupy the same space as an element without it, just like transform.

## Positioning

We positioned our circle above using a coordinate system. It starts at the top left corner (0, 0). `circle(50% at 50% 50%)` means that the circle is 50% of the element's size and is positioned at the center of the element.

## Shapes

clip-path supports several shapes:

- `circle()` - Creates a circular clipping region
- `ellipse()` - Creates an elliptical clipping region
- `polygon()` - Creates a polygonal clipping region
- `inset()` - Creates a rectangular clipping region

## Animating with clip-path

clip-path is animatable, which makes it very powerful for animations. We can transition between different shapes or sizes smoothly.

The dashed text effect is a stroke applied in Figma that is then converted to SVG — showing the creativity possible with clip-path.

## Animating images

clip-path can also be used for an image reveal effect. We start off with a clip-path that covers the whole image so that it's invisible, and then we animate it to reveal the image.

```css
.image-reveal {
  clip-path: inset(0 0 100% 0);
  animation: reveal 1s forwards cubic-bezier(0.77, 0, 0.175, 1);
}

@keyframes reveal {
  to {
    clip-path: inset(0 0 0 0);
  }
}
```

We could also do it with a height animation, but there are some benefits to using clip-path here. clip-path is hardware-accelerated, so it's more performant than animating the height of the image. Using clip-path also prevents us from having a layout shift when the image is revealed, as the image is already there, it's just clipped.

## Scroll animations

The image reveal effect must be triggered when the image enters the viewport; otherwise, the user will never see the image being animated. So how do we do that?

## Tab indicator

clip-path can also be used for a tab indicator animation — it's polished even if it goes unnoticed.

## Going a step further

A theme animation using clip-path: basically animate the clip-path of either light or dark theme to reveal the other one. The code is very similar to the image reveal effect. Once you understand the basics you can create many great animations with it, it's just a matter of creativity.

While this implementation is hacky as it requires duplicating the element you want to animate, you can use the View Transitions API for a more elegant solution.
