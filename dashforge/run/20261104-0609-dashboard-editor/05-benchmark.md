# Benchmark of 20261104-0609-dashboard-editor

2026-11-04T08:32:27.262Z. Measured on the app's dev server (`next dev`), not a production build. Pages are judged whole, design-system components included.

## Summary

|  |  |
|---|---|
| Backend · agent | baseten · OpenCode |
| Models | meta-models/muse-spark-open-1026 |
| End-to-end time | 58 min |
| Scope to contract | 13 min |
| Frames to pages | 43 min |
| Cost | $8.60 |
| Model calls | 334 |
| Tokens in / out | 35.4M / 0.5M |
| Rounds / known issues | 25 / 29 |
| Issues raised | 129 |
| Issues fixed | 101 |
| AI discussion threads | 3 |
| Routes measured | 4 of 4 |
| axe critical + serious | 0 |
| axe moderate + minor | 0 |
| axe rules passed | 100% |
| Contrast failures | 0 |
| Targets under 24 px | 0 |
| Unnamed controls | 0 |
| Routes with one main and one h1 | 4 of 4 |
| Skipped heading levels | 1 |
| Keyboard: reachable | 100% of 51 |
| Keyboard: focus visible | 92.2% |
| Keyboard: Enter and Space work | 100% |
| Keyboard: traps / order inversions | 0 / 0 |
| Keyboard: skip link | 0 of 4 |
| Files / lines | 88 / 3,905 |
| Type errors | 0 |
| ESLint errors / warnings | 0 / 0 |
| Design-system validate errors / warnings | 0 / 0 |
| Duplicated code | 3.8% (16 clones, largest 16 lines) |
| Files over 300 lines | 0 |
| Lines written by the model | 39% |

## Issues the checks and review agents caught

Each issue is a thread between the agent that raised it and the fix session. Fixed: a fix session closed it and a later review or validation looked at that round. Fixed, unchecked: closed in the final round, which nobody reviews. Discussion threads: issues a reply kept open, from the fix session or the reviewer. `checks` are the validators, not a review agent.

| Part | Reviewer | Caught | Fixed | Fixed, unchecked | Open | Discussion threads |
|---|---|---|---|---|---|---|
| code | code | 11 | 8 | 3 | 0 | 0 |
| code | ux | 6 | 5 | 1 | 0 | 0 |
| code | checks | 35 | 35 | 0 | 0 | 0 |
| code | adherence | 7 | 5 | 2 | 0 | 2 |
| code | behavior | 10 | 7 | 3 | 0 | 0 |
| planning | peer | 22 | 14 | 8 | 0 | 0 |
| planning | output | 25 | 16 | 9 | 0 | 1 |
| planning | checks | 13 | 11 | 0 | 2 | 0 |

## Accessibility

| Route | Signed in | axe critical + serious | axe moderate + minor | Rules passed | Contrast failures | Targets under 24 px | Unnamed controls | main / h1 | Skipped levels |
|---|---|---|---|---|---|---|---|---|---|
| / | no | 0 | 0 | 22 of 22 | 0 | 0 | 0 | 1 / 1 | 0 |
| /dashboards | yes | 0 | 0 | 29 of 29 | 0 | 0 | 0 | 1 / 1 | 0 |
| /dashboards/dashboard-1 | yes | 0 | 0 | 28 of 28 | 0 | 0 | 0 | 1 / 1 | 1 |
| /account | yes | 0 | 0 | 29 of 29 | 0 | 0 | 0 | 1 / 1 | 0 |

## Keyboard

| Route | Controls | Reachable | Focus visible | Enter and Space | Trap | Order inversions | Skip link |
|---|---|---|---|---|---|---|---|
| / | 9 | 9 | 9 | 0 of 0 | no | 0 | no |
| /dashboards | 21 | 21 | 20 | 24 of 24 | no | 0 | no |
| /dashboards/dashboard-1 | 11 | 11 | 10 | 12 of 12 | no | 0 | no |
| /account | 10 | 10 | 8 | 10 of 10 | no | 0 | no |
