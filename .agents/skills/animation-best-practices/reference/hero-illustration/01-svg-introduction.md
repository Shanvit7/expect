# SVG Introduction

A while back me and dimi worked together on some animations of the illustrations on animations.dev. Hover on each of the boxes above to see the animations in action. This walkthrough will cover how we animated some of them.

Before we dive into the actual animations of that illustration, let's cover some SVG fundamentals.

By the end of the three SVG fundamentals lessons, you'll understand:

- The SVG coordinate system and viewBox
- Basic SVG path syntax
- Stroke properties for line drawing animations
- How to use transform origins correctly for SVG transforms

## Coordinates, not flow

SVG uses coordinates instead of the CSS box model. Every element is placed at exact x,y positions within a coordinate system defined by the viewBox attribute.

The viewBox defines the internal coordinate system. It takes four values: min-x, min-y, width, and height. The SVG then maps this coordinate space to whatever size the element renders at on screen.

You can even animate these values to create smooth panning and zooming effects.

In the hero animation, the SVG uses viewBox="0 0 622 319". The shapes work with this coordinate system, but the SVG displays at different sizes depending on the screen. This is why we can use consistent animation values at any size.

## SVG paths

SVG paths let you draw complex shapes using drawing commands in the d attribute.

Think of paths like drawing with a pen. There's an invisible cursor that starts at (0, 0). Commands move this cursor around or draw lines from its current position.

This draws a square using two commands:

- M (move) - moves the cursor to a starting point without drawing anything.
- L (line) - draws a line from the cursor's current position to a new point.

Path commands can be uppercase or lowercase, and this changes how coordinates work:

- Uppercase L 40,60: Go to coordinate (40, 60) in the viewBox.
- Lowercase l 40,60: Move 40 units right and 60 units down from the current cursor position. It's relative to the cursor.

For a path that starts at M 30,20:

- L 40,60 draws to (40, 60).
- l 10,40 draws to (40, 60) as well, because 30+10=40 and 20+40=60.

## The Z command

There's one more essential command: Z (or z - it works the same either way). It closes the path by drawing a straight line from the current cursor position back to the starting point (where M placed the cursor).

In practice, you rarely write paths by hand. Design tools like Figma export them for you. But understanding the basics helps when you need to animate or modify them.

For a deeper dive into path syntax, check out Nanda's A Deep Dive Into SVG Path Commands guide.
