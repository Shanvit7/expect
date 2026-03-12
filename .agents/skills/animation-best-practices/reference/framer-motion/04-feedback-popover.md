# Feedback popover

A button that morphs into a popover.

## Button to popover

Let's animate the first part of the component where the feedback button becomes the feedback popover. One hint: the gray feedback text inside the popover is not the actual placeholder of the textarea, it's a separate HTML element.

Success criteria:

- The button should morph into the popover.
- The placeholder should disappear when the user starts typing.

## Success state

Let's now animate the success state. The form should disappear to the bottom, and the success UI should come from top, with a slight blur.

- The form and the success UI should animate simultaneously.
- The success state should come from the top.
- Exit animation should morph the success state into the button.

## Accessibility

Even if we replace our placeholder with a span we should still provide a placeholder for the textarea, because the placeholder attribute is used by screen readers to provide context.

## Key takeaways

- Use `layoutId` for morphing animations between different UI states
- Combine opacity and transform for smooth enter/exit transitions
- Always consider accessibility when replacing native HTML elements
- Subtle blur during transitions can mask imperfections
