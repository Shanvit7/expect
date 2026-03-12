# Animations of the future

> Static transitions can disrupt the user's sense of flow and orientation. You should envision your interface as a constantly evolving space, where any element can transform into another.

Family's iOS App is a great example of a fluid interface.

We did this in the course already with shared layout animations. Rather than rendering a separate component for the form, we morph our button into its new state. Another example is the trash interaction — the items don't suddenly appear in the trash, they are "thrown" into it.

## Morphing text

Applying this principle to text adds another layer of fluidity. This is not only appealing, but it also helps the user notice the change. In a static interface, this change would happen instantly. By morphing the text we highlight the transition in a subtle, yet effective way.

When shared on Twitter, some people said that this is distracting, but that's exactly the point! We want the user to notice something changed.

## View Transitions API

The View Transitions API is a browser-native way to create smooth transitions between different states of the DOM. It's a promising API that could make many animation libraries unnecessary for simpler transitions.

## Scroll-driven animations

CSS now supports scroll-driven animations natively. This allows you to tie animations to scroll progress without JavaScript, which is great for performance.

## Future CSS features

Several upcoming CSS features will make animations more powerful:

- `@starting-style` for animating element appearance
- `transition-behavior: allow-discrete` for transitioning display and other discrete properties
- Native spring animations in CSS (still in proposal stage)

## The direction

The future of web animations is bright. Browser APIs are getting more powerful, making it easier to create smooth, performant animations without heavy libraries. But the principles we learned in this course — taste, timing, easing, purpose — will always be relevant regardless of the tools.
