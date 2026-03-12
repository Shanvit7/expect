# The finishing touch

We have our height and crossfade animations working, but it doesn't feel quite right yet. The drawer is too slow at the moment, it feels kinda robotic and the easing could be improved.

## Easing

When it comes to easing, I tried a lot of different settings, and none of them felt great at first. It's just trial and error.

- **Height animation**: `[0.26, 1, 0.5, 1]` — a strong ease-out curve to make it snappy
- **Body/content**: `[0.26, 0.08, 0.25, 1]` — a lighter version of the height easing, slower to ensure the content transition is visible, but still ease-out to stay in sync

## Duration

The duration was chosen after trying many options: `0.27s`. It's not a common duration (you usually go for 0.25s or 0.3s), but this just felt right after many tries.

This is a creative process — there's no formula. You try different values until it feels right. That's where your taste comes in.

## Polish

Final details to make the drawer feel great:

- Ensure the overlay opacity matches the drag progress
- Add momentum to the drag gesture
- Fine-tune the spring settings for the close animation
- Test on different screen sizes
