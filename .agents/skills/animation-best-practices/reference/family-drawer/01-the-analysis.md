# The analysis

One thing that really helped me learn animations was recreating some of the best ones. The key to a good recreation is figuring out why an animation feels right — like which properties are being animated, what kind of easing or spring is used, and so on.

Most animations are fast, so it's tough to catch all the details. What works best is recording the animation and playing it back frame by frame or in slow motion. Since Family is an iOS app, I just use my phone to record the interaction I want to recreate, then send it to my Mac to replay.

## Frame by frame analysis

There are a few things that stick out even before analyzing frame by frame. When slowed down, we can see:

- A subtle crossfade between the new and old content
- The content follows the height of the drawer
- We'll probably need to use the `popLayout` mode on AnimatePresence

The content follows the height of the drawer. If we look closely, the old content doesn't just disappear — it fades out while the new content fades in. This crossfade is a crucial detail that makes the transition feel smooth.

## Requirements

Based on the analysis:

1. Height animation for the drawer content
2. Crossfade effect between old and new content
3. Snappy spring-like easing
4. Smooth drag-to-dismiss behavior
