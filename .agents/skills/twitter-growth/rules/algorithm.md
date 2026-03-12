---
name: algorithm
description: X algorithm scoring and key metrics.
---

# Algorithm

## scoring

`Final Score = Σ(weight_i × P(action_i))` across 19 signals.

**15 positive:** favorite, reply, repost, photo_expand, click, profile_click, vqv (video only), share, share_via_dm, share_via_copy_link, dwell (binary), dwell_time (continuous), quote, quoted_click, follow_author

**4 negative:** not_interested, block_author, mute_author, report

## rules

- MUST use video on product launches — `vqv_score` = 0.0 for non-video posts (entire scoring dimension inaccessible)
- MUST design posts to trigger multiple positive signals: video + question + @mention + useful tool
- MUST keep tone constructive on callouts — hostile tone triggers block/mute/report
- NEVER reply-farm — single-word replies have zero dwell_time, detected as hollow signals
- SHOULD space same-day tweets 4-6h apart — exponential decay for repeated author in feed batch

## key metrics

| metric                    | signal                           |
| ------------------------- | -------------------------------- |
| B/L > 0.7                 | strong product-market fit        |
| B/L > 1.0                 | exceptional (React Doctor: 1.07) |
| L/V > 1.0%                | high engagement quality          |
| Views > 400K              | breakout territory               |
| Stars/day > 300 sustained | exceptional campaign             |

## B/L drivers

- npx/CLI command people can copy → highest B/L
- URL they'll want to revisit → high B/L
- named specific problems to reference later → high B/L
- gamification (scores/leaderboards) → high B/L
- memes → B/L 0.08-0.15 (consumed and forgotten)
