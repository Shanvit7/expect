# Trash interaction

Recreation of Family's trash interaction on the web.

This is a hands-on project lesson where you build a trash interaction component. The toolbar appears once we select at least one image, and it disappears when we deselect all images.

Key implementation details:

- Wrap the toolbar in `AnimatePresence` and add an appropriate animation to it
- Use the `layoutId` prop to tell Framer Motion that the images in the grid should become the images in the trash — creating a smooth shared layout animation
- Wrap trash with `AnimatePresence` and add a small animation
- Handle unselected images disappearing — wrap the images grid in `AnimatePresence` and add an exit animation
- Handle the lid opening animation on the trash icon
- Add rotation to images as they enter the trash for a more playful feel

To get the codebase running locally, download the starter code, run `pnpm install` and `pnpm dev`.

## Resources

- Family's original trash interaction
- Starter code download
- Final code download
