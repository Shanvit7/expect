# Animating the menu

Let's try and build our menu. This lesson is split into multiple exercises to reduce complexity.

## Starting code

Radix's primitives are compound components — each component is a group of smaller components that work together. Radix has an anatomy section for each component showing how the group is structured.

- `NavigationMenu.Item` — container for each menu item
- `NavigationMenu.Trigger` — when hovered, opens the content
- `NavigationMenu.Content` — the dropdown content
- `NavigationMenu.Viewport` — element in which content is rendered

## Exercises

### Content animation

Animate the dropdown content appearing and disappearing with opacity and transform transitions.

### Viewport animation

Animate the viewport (the container around the content) to smoothly resize when switching between different menu items.

### Arrow indicator

Add a small arrow that follows the active menu item, using shared layout animations.

### Direction-aware transitions

Make the content slide in from the left or right depending on which menu item the user navigated from, creating a more natural directional transition.

### Height animation

Smoothly animate the height of the viewport when different menu items have different content heights.
