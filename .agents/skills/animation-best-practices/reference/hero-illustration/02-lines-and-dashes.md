# Lines and dashes

You've probably seen this effect before, a path that looks like it's drawing itself. Loading spinners, signature animations, icon reveals. It's everywhere. In this case, it's the hand's rays.

The technique is surprisingly simple once you know the trick.

## Dash patterns

SVG paths can have dashed strokes using strokeDasharray. This property takes two values: the dash length and the gap length.

Notice how the pattern automatically repeats along the entire path. This works on any SVG element with a stroke - lines, circles, rectangles, complex paths - the pattern tiles across its full length.

## Shifting with dash offset

strokeDashoffset shifts the dash pattern along the path. The trick for line drawing:

- Set the dash length equal to the path length so only one dash is visible
- Offset the dash by the path length to hide it completely
- Animate the offset back to 0 to reveal the line

The path starts hidden because the dash is offset by its full length. As strokeDashoffset animates from 100 to 0, the line appears to draw itself.

This is the exact technique we'll use to animate the hand rays in the next lesson.

### A note on pathLength

The path uses pathLength="100". This property overrides the path's actual pixel length - the browser uses your custom value for all stroke calculations.

This is useful for normalizing paths to round numbers. Set it to 100 to work in percentages, or use the same value across multiple paths so they can share animation values regardless of their actual sizes.

## Exercise: Animate a checkbox

Practice the line drawing technique. Below is a checkbox with a square and checkmark - both have pathLength="100" already set.

Your task: Make both the square and checkmark draw themselves when toggled on, and reverse the animation when toggled off. Use strokeDasharray and strokeDashoffset.
