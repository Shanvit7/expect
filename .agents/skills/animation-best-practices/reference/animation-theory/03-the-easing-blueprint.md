# The Easing Blueprint

The main ingredient that influences how our animations feel is easing. It describes the rate at which something changes over a period of time. It's the most important part of any animation. It can make a bad animation look great, and a great animation look bad.

Easing also plays an important role in how fast our interfaces feel. This is important, because the perception of speed is often times more important than the actual performance of your app.

A faster-spinning spinner makes the app seem to load faster, even when the load times are identical. This improves perceived performance.

## ease-out

Starts fast and ends slow. This easing type is the most commonly used and fits in the majority of use cases. It works great for elements that need to enter or exit the screen, like a dropdown, toast, or dialog.

The reason why ease-out feels good for these types of animations is that it accelerates at the beginning. This makes the UI feel responsive; as soon as the user clicks, the element starts moving fast.

It also decelerates at the end, smoothly blending into its final position. If it stopped at full speed, it would feel jarring and unnatural.

If I had to pick one type of easing for the rest of my life, I would choose ease-out. It works well for most cases and it's what I use the most in my day-to-day work.

## ease-in-out

Starts slow, goes fast in the middle, ends slow. Good for elements that are already on the screen and need to move to a different position. They just change in some way. This easing feels right, because we see an animation accelerate and decelerate in a natural way.

Notice how this movement mimics a car accelerating and decelerating.

The Dynamic Island would be a good use case for ease-in-out too. Apple actually uses spring animations to make it even more natural and organic, but if we were to convert it into an easing type, it would be an ease-in-out curve, because it changes its size while staying on the screen.

## ease-in

It's the opposite of ease-out, it starts slowly and ends fast. That slow start can make interfaces feel sluggish and less responsive, so it should generally be avoided.

There's almost no good use case for it in product UI. I rarely use it. The only scenario where I'd consider it is when something is exiting. The idea being that it accelerates as it leaves the viewport.

Even then, I'd recommend using ease-out instead, because the fast start gives you that responsive feeling the moment the user clicks or interacts.

## ease

Ease is the browser's default easing and has a gentle acceleration at the beginning followed by a more pronounced deceleration at the end. It's more subtle and softer than ease-in-out and so on.

The button below uses ease for both the subtle background color transition, and, the success animation. These smaller, more gentle animations often work best with ease, it's an elegant curve that works well in such cases.

I actually used it in Sonner for the same reason. ease-out would technically be the right choice, because a toast enter and exits the screen, but ease makes the component feel more elegant which was more important for me in this case.

## Custom easings

All the examples you've seen up until this point are actually using custom easings, as the accelerations of the built-in ones are not strong enough.

Custom easing here feels more energetic.

The only time I personally use the built-in easings is for very subtle transitions like colors, where the difference is barely noticeable. I also use the built-in ease to mimic iOS' Sheet easing. This tiny detail gave the component a more native feel with little effort.

If you are not comfortable with easings just yet, I encourage you to reference the blueprint as much as possible. I also encourage you to try every easing from the blueprint after this lesson. This will give you a better understanding and feel of how each curve works.

## Resources

- View the custom easing curves
- Cubic Bezier Curve Generator
