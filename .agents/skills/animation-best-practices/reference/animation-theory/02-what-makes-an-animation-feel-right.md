# What makes an animation feel right?

I'm sure you've seen an animation that made you think, "Wow, that feels good!". But can you explain why it felt that way? What actually made it work? That's what we'll be unpacking in this lesson, why some animations feel better than others.

## What's the difference?

Does this animation feel good to you?

Probably not.

How about this one?

Better, right?

The second one uses an easing type that works better with this type of animation, which helps make it feel more natural.

The first one has a linear easing type, which feels robotic and unnatural as almost nothing in the world around us moves at a constant speed. It has no energy to its movement. It feels lifeless.

An animation feels right when it mirrors the physics we experience every day. It feels right when you are not surprised by the way it animates, because it feels familiar.

Next, consider these two buttons:

The right one feels better because the subtle blur fills the space the icon previously occupied. Without it, there's an empty gap between the checkmark and "Added" for a few frames. Blur hides this gap and makes the transition feel seamless.

Without blur, the icon would leave a noticeable gap as it exits. Blur fills that space and makes the transition between the two states feel smooth and seamless.

## The role of easing

The first example shows us what a big impact easing has on an animation. Everything in the world around us accelerates and decelerates when it changes position. A car, a ball, an elevator, everything. We're subconsciously used to these types of movements. So when an animation accelerates and decelerates similarly, it feels right and natural.

Choosing the right easing is the most important factor in making your animations feel right. Incorrect easing can completely ruin an animation. We'll learn how to choose the right easing in the next lesson, The Easing Blueprint.

## The small details

Most of the time it's the small details that make the difference. The example with the two buttons is a great example of this. The blur is such a small, yet crucial detail.

I often zoom into what I'm working on and do close-up recordings to analyze an animation more carefully.

Small details are hard to spot and implement. They are what will separate your animations from everyone else's.

## Context matters

The context in which an animation is used can change whether it's a good or bad animation. The example we saw earlier with the blue element sliding in, has a linear easing which does feel bad in most animations. But linear easing can actually feel good in the right context.

For example, a linear easing works for infinite marquees because it represents constant movement that never speeds up or slows down.

Or for a skeleton loader. These need to feel continuous and steady, not speeding up or slowing down, just a smooth loop. It's a different type of animation than the previous example. Using ease-in-out on a skeleton could create the impression that it's pausing between loops, instead of one continuous movement.

## Transitions

Most UI animations are actually state transitions. Something goes from state A to state B. A dialog opens, a menu expands, a page transitions.

That's why UI animations feel right when the transition between the two states makes sense. Delete an email, and then we need some sort of UI to confirm the deletion. Since we're already swapping states, we can make this moment a bit special by animating this transition.

## Taste

Great animation, just like great design, follows a set of rules. The Easing Blueprint shows you how to choose the right easing for your animations. Timing and Purpose helps you know when and how to animate.

These rules are a great starting point, but to get really good at animations, you need to develop great taste. And despite what some people think, taste is not just a personal preference, you can actually learn it.

> If taste is just personal preference, then everyone's already perfect.

When you have developed taste, you know what looks good and what doesn't. At that point you'll have also built a collection of references that you can use to guide your work. You'll then be prepared for every scenario, whether it's covered in the blueprint or not.

We'll dive deeper into this in the taste lesson, but for now, just know that taste plays an important role.

## Summary

An animation feels right when:

- It mirrors the physics we experience every day
- It has the right easing
- It has the right small details
- It is used in the right context
- The transition between states makes sense
