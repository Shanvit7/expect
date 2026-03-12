# Closing thoughts

Our menu is basically finished. In this lesson I'll discuss a small improvement and choosing libraries.

## Accessibility

Remember when we talked about accessibility? Animations can make people feel sick. This navigation menu is one of those animations, because there's a lot happening at once.

To disable motion for people that prefer reduced motion, remove animations within a media query. This is a quick fix, but you should ask yourself this question with each animation. Don't forget it, people appreciate it!

## Choosing libraries

Radix is not as maintained as it used to be, and there are great alternatives these days like React Aria or Base UI. While Base UI is the shiny new thing, Radix is mature and battle-tested. Also, code doesn't stop working just because it's not maintained.

You should carefully consider all the options and choose the one that makes the most sense for your project. Consider:

- Maintenance and community
- Accessibility compliance
- API design and DX
- Bundle size
- Animation support and integration
