---
name: launch-day
description: Product launch tweet formula.
---

# Launch Day

## rules

- MUST include video demo (8-15s) — 17/17 successful launches used video, algo has a `vqv_score` dimension only video can access
- MUST include one-line CLI command (`npx react-doctor@latest`) — strongest bookmark driver. With CTA: B/L 1.07. Without: B/L 0.56
- MUST use "Introducing [Name]" framing — gets 5-11x views vs "v0.1.2" updates
- MUST end with "fully open source" — standard trust signal since Nov 2024, omitting is conspicuous
- SHOULD self-quote 30-60 min later with different angle (leaderboard, early stats) — creates second distribution candidate (+93K views on React Doctor)
- SHOULD use a new repo for major features — react-grab (new repo): 879 stars. React Doctor (existing repo): 70 stars despite 10x more likes

## template

```
Introducing [Product Name].

[1-2 sentences naming specific pain points]

[2-3 bullet points of concrete problems]

[npx command or URL]

Fully open source.

[video]
```

## examples

```
WEAK (41K views):
"React Scan v0.1.2 — new component tree view, smaller cleaner toolbar"

STRONG (1,049K views):
"Introducing React Doctor. Scan your React codebase for anti-patterns:
- Unnecessary useEffects
- Fix accessibility issues
- Prop drilling instead of context / composition
Run as a CLI or agent skill. Repeat until passing. Fully open source."
```
