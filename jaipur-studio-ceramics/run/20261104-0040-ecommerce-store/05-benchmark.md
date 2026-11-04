# Benchmark of 20261104-0040-ecommerce-store

2026-11-04T08:29:48.555Z. Measured on the app's dev server (`next dev`), not a production build. Pages are judged whole, design-system components included.

## Summary

|  |  |
|---|---|
| Backend · agent | meta · Muse Code |
| Models | muse-spark-1.3, muse-wonder-1.0 |
| End-to-end time | 2 h 20 min |
| Scope to contract | 30 min |
| Frames to pages | 1 h 46 min |
| Cost | $4.39 |
| Muse Code weekly allowance | 4% (24% to 28%) |
| Model calls | 333 |
| Tokens in / out | 60M / 0.6M |
| Rounds / known issues | 23 / 4 |
| Issues raised | 37 |
| Issues fixed | 33 |
| AI discussion threads | 0 |
| Routes measured | 18 of 18 |
| axe critical + serious | 0 |
| axe moderate + minor | 0 |
| axe rules passed | 100% |
| Contrast failures | 0 |
| Targets under 24 px | 0 |
| Unnamed controls | 0 |
| Routes with one main and one h1 | 18 of 18 |
| Skipped heading levels | 2 |
| Keyboard: reachable | 99.6% of 233 |
| Keyboard: focus visible | 87.9% |
| Keyboard: Enter and Space work | 100% |
| Keyboard: traps / order inversions | 0 / 0 |
| Keyboard: skip link | 0 of 18 |
| Files / lines | 110 / 7,606 |
| Type errors | 0 |
| ESLint errors / warnings | 0 / 0 |
| Design-system validate errors / warnings | 0 / 0 |
| Duplicated code | 2.1% (11 clones, largest 25 lines) |
| Files over 300 lines | 3 |
| Lines written by the model | 68.8% |

## Issues the checks and review agents caught

Each issue is a thread between the agent that raised it and the fix session. Fixed: a fix session closed it and a later review or validation looked at that round. Fixed, unchecked: closed in the final round, which nobody reviews. Discussion threads: issues a reply kept open, from the fix session or the reviewer. `checks` are the validators, not a review agent.

| Part | Reviewer | Caught | Fixed | Fixed, unchecked | Open | Discussion threads |
|---|---|---|---|---|---|---|
| code | checks | 6 | 6 | 0 | 0 | 0 |
| code | code | 5 | 5 | 0 | 0 | 0 |
| code | adherence | 8 | 5 | 3 | 0 | 0 |
| code | behavior | 6 | 5 | 1 | 0 | 0 |
| planning | checks | 3 | 3 | 0 | 0 | 0 |
| planning | peer | 6 | 6 | 0 | 0 | 0 |
| planning | output | 3 | 3 | 0 | 0 | 0 |

## Accessibility

| Route | Signed in | axe critical + serious | axe moderate + minor | Rules passed | Contrast failures | Targets under 24 px | Unnamed controls | main / h1 | Skipped levels |
|---|---|---|---|---|---|---|---|---|---|
| / | no | 0 | 0 | 24 of 24 | 0 | 0 | 0 | 1 / 1 | 1 |
| /shop | no | 0 | 0 | 29 of 29 | 0 | 0 | 0 | 1 / 1 | 1 |
| /shop/piece-1 | no | 0 | 0 | 28 of 28 | 0 | 0 | 0 | 1 / 1 | 0 |
| /cart | no | 0 | 0 | 21 of 21 | 0 | 0 | 0 | 1 / 1 | 0 |
| /checkout | no | 0 | 0 | 21 of 21 | 0 | 0 | 0 | 1 / 1 | 0 |
| /orders/demo | no | 0 | 0 | 21 of 21 | 0 | 0 | 0 | 1 / 1 | 0 |
| /order-lookup | no | 0 | 0 | 27 of 27 | 0 | 0 | 0 | 1 / 1 | 0 |
| /dashboard | yes | 0 | 0 | 26 of 26 | 0 | 0 | 0 | 1 / 1 | 0 |
| /dashboard/pieces | yes | 0 | 0 | 30 of 30 | 0 | 0 | 0 | 1 / 1 | 0 |
| /dashboard/pieces/new | yes | 0 | 0 | 29 of 29 | 0 | 0 | 0 | 1 / 1 | 0 |
| /dashboard/pieces/piece-1 | yes | 0 | 0 | 25 of 25 | 0 | 0 | 0 | 1 / 1 | 0 |
| /dashboard/pieces/piece-1/edit | yes | 0 | 0 | 29 of 29 | 0 | 0 | 0 | 1 / 1 | 0 |
| /dashboard/orders | yes | 0 | 0 | 26 of 26 | 0 | 0 | 0 | 1 / 1 | 0 |
| /dashboard/orders/order-1 | yes | 0 | 0 | 29 of 29 | 0 | 0 | 0 | 1 / 1 | 0 |
| /dashboard/discount-codes | yes | 0 | 0 | 25 of 25 | 0 | 0 | 0 | 1 / 1 | 0 |
| /dashboard/discount-codes/new | yes | 0 | 0 | 29 of 29 | 0 | 0 | 0 | 1 / 1 | 0 |
| /dashboard/discount-codes/discountCode-1 | yes | 0 | 0 | 26 of 26 | 0 | 0 | 0 | 1 / 1 | 0 |
| /dashboard/account | yes | 0 | 0 | 25 of 25 | 0 | 0 | 0 | 1 / 1 | 0 |

## Keyboard

| Route | Controls | Reachable | Focus visible | Enter and Space | Trap | Order inversions | Skip link |
|---|---|---|---|---|---|---|---|
| / | 14 | 14 | 14 | 0 of 0 | no | 0 | no |
| /shop | 16 | 16 | 15 | 0 of 0 | no | 0 | no |
| /shop/piece-1 | 15 | 15 | 14 | 2 of 2 | no | 0 | no |
| /cart | 10 | 10 | 10 | 0 of 0 | no | 0 | no |
| /checkout | 10 | 10 | 10 | 0 of 0 | no | 0 | no |
| /orders/demo | 11 | 11 | 11 | 0 of 0 | no | 0 | no |
| /order-lookup | 13 | 13 | 11 | 2 of 2 | no | 0 | no |
| /dashboard | 13 | 13 | 13 | 2 of 2 | no | 0 | no |
| /dashboard/pieces | 14 | 14 | 13 | 2 of 2 | no | 0 | no |
| /dashboard/pieces/new | 19 | 19 | 11 | 8 of 8 | no | 0 | no |
| /dashboard/pieces/piece-1 | 9 | 9 | 9 | 4 of 4 | no | 0 | no |
| /dashboard/pieces/piece-1/edit | 28 | 28 | 16 | 16 of 16 | no | 0 | no |
| /dashboard/orders | 12 | 12 | 12 | 2 of 2 | no | 0 | no |
| /dashboard/orders/order-1 | 9 | 9 | 9 | 6 of 6 | no | 0 | no |
| /dashboard/discount-codes | 12 | 12 | 12 | 2 of 2 | no | 0 | no |
| /dashboard/discount-codes/new | 13 | 12 | 9 | 4 of 4 | no | 0 | no |
| /dashboard/discount-codes/discountCode-1 | 8 | 8 | 8 | 4 of 4 | no | 0 | no |
| /dashboard/account | 7 | 7 | 7 | 4 of 4 | no | 0 | no |
