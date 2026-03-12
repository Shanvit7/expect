# Know your tools

Let's assume we work on the marketing team at a company and we are tasked with creating a navigation menu with multiple dropdowns. How should we go about this?

## Getting inspiration

What I usually do is go and look how other companies do it. I actually created a navigation menu before at Vercel, and what I did is I looked at how other companies do it and decided to build something similar to Stripe's.

This is how I usually work. Nothing is done in isolation, I get inspired by other products. Most of the time, you shouldn't try to invent new patterns, but rather use existing ones, because they are battle tested and proven to work.

This is especially useful early-on in your animation journey when you don't have the intuition yet. Look at great products and companies, see how they do things, and then try to create something inspired by that. Steal like an artist.

## Choosing a library

A menu like this is actually quite complex from an accessibility standpoint. It needs proper keyboard navigation, ARIA attributes, focus management, and more. Building all of this from scratch would take a lot of time and is prone to errors.

This is where component libraries like Radix come in. Radix provides unstyled, accessible components that handle all the complex accessibility requirements, letting you focus on the animation and styling.

## Radix Navigation Menu

Radix has a NavigationMenu component that provides:

- Keyboard navigation
- Screen reader support
- Focus management
- Proper ARIA attributes
- Viewport rendering for dropdown content

We'll use this as our foundation and add animations on top.
