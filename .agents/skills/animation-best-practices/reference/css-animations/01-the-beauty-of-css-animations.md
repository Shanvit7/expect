# The beauty of CSS animations

There's something special about CSS animations. No dependencies, no javascript, just HTML and CSS. It feels like you are writing code how it was meant to be written.

This module is about ensuring that you get the basics of CSS animations right and know when and how to use them. It covers everything you need to know to build beautiful things with CSS animations.

## Right tool for the job

I agree that you don't need Framer Motion for a simple hover animation or enter animations, but that's pretty much it.

### Disclaimer

Framer Motion is now Motion for React. I'll keep referring to it as Framer Motion in this course to avoid confusion. This will change in the future.

You bought this course not only to learn how to code animations, but also how to build beautiful interfaces. Beautiful interfaces sometimes have more complex animations. Interactions that respond to user input, crossfades, layout animations, direction-aware animations — these are all things that would be very challenging to build with just CSS. That extra dependency is justified here.

I personally like to build beautiful things. If that means I have to use an animation library, then I'm okay with that. As long as the end result is beautiful and works well across all devices and browsers.

The smoothness seen here would be hard to achieve with just CSS (it's using Framer Motion).

You might think that using an animation library will increase the bundle size and may cause frame drops, which will degrade the experience. While increased bundle size is unavoidable, this is usually not a cause for concern. Frame drops will not be an issue if you animate things in the right way. And you are here to learn this right way.

CSS animations have their place of course, and we will cover many use cases in this module.

## Performance

Some CSS animations are hardware-accelerated, which means that the browser can offload the work to the GPU. A hardware-accelerated animation will remain smooth, no matter how busy the main thread is. If you are animating transform, opacity, or filter, chances are the browser can do it efficiently. They don't need any extra dependencies either. Using more dependencies won't cause your animations to drop frames, but it will increase the bundle size, which will make your website load longer.

## When to use CSS animations

Use CSS animations when:

- You need a simple hover effect.
- You need to animate an element in or out.
- You have an infinite, linear animation like a marquee.
- You have a bundle-size sensitive project.

Use Framer Motion/other animation library when:

- You need to create complex animations.
- You want to make your animations feel more sophisticated.
- You want your animations to be interruptible and feel natural.

## Resources

- A Framework for Evaluating Browser Support
