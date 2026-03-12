# Transitions

Elements on a site often have state. Buttons might change color when hovered, a toast might change its transform values when it enters the screen. By default, changes in CSS happen instantly.

CSS transitions allow you to interpolate between the initial and target states.

### What's interpolation?

It's the process of estimating unknown values that fall between known values. In the context of CSS transitions, it's the process of calculating the values between the initial and target state.

To add a transition we need to use the transition property. It's a shorthand property for four transition properties:

- transition-property
- transition-duration
- transition-timing-function
- transition-delay

Here's an example:

```css
.button {
  /* Transition transform over 200ms with ease as our timing function and a delay of 100ms */
  transition: transform 200ms ease 100ms;
}
```

Let's briefly clarify what they mean:

- **transition-property**: The property we want to animate. We can also use `all` to animate all properties that change.
- **transition-duration**: How long the transition takes.
- **transition-timing-function**: The easing of the transition.
- **transition-delay**: A delay before the transition starts.

## Shorthand tips

When transitioning multiple properties with the same duration and easing, you can define it once with shorthand and complement with transition-property:

```css
/* More repetition */
.button {
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
}

/* Less repetition, more consistency */
.button {
  transition: 0.2s ease;
  transition-property: color, background-color, border-color;
}
```

I don't use the shorthand for transition-delay. I have always found reading a transition like `transition: transform 0.2s ease 1s` a bit confusing. When I see `transition-delay: 1s` I know exactly what it does.

## Practice

In general, CSS transitions are quite straightforward. You specify which property you want to animate, how long it should take, the easing you want to apply, and optionally, a delay — that's it!

### Exercise: Simple Transform

The end goal is to move the box 20% upwards on hover. You can choose your own duration and easing.

### Exercise: Toast Animation

Make toasts animate each time when a toast changes position. You can choose your own duration and easing.
