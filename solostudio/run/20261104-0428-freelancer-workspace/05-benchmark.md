# Benchmark of 20261104-0428-freelancer-workspace

2026-11-04T08:31:19.644Z. Measured on the app's dev server (`next dev`), not a production build. Pages are judged whole, design-system components included.

## Summary

|  |  |
|---|---|
| Backend · agent | meta · Muse Code |
| Models | muse-spark-1.3, muse-wonder-1.0 |
| End-to-end time | 1 h 40 min |
| Scope to contract | 37 min |
| Frames to pages | 1 h 1 min |
| Cost | $6.62 |
| Muse Code weekly allowance | 5% (28% to 33%) |
| Model calls | 320 |
| Tokens in / out | 53.9M / 0.8M |
| Rounds / known issues | 31 / 12 |
| Issues raised | 53 |
| Issues fixed | 41 |
| AI discussion threads | 1 |
| Routes measured | 14 of 14 |
| axe critical + serious | 0 |
| axe moderate + minor | 0 |
| axe rules passed | 100% |
| Contrast failures | 0 |
| Targets under 24 px | 0 |
| Unnamed controls | 0 |
| Routes with one main and one h1 | 14 of 14 |
| Skipped heading levels | 1 |
| Keyboard: reachable | 97.8% of 184 |
| Keyboard: focus visible | 98.3% |
| Keyboard: Enter and Space work | 100% |
| Keyboard: traps / order inversions | 0 / 0 |
| Keyboard: skip link | 0 of 14 |
| Files / lines | 139 / 8,380 |
| Type errors | 0 |
| ESLint errors / warnings | 0 / 0 |
| Design-system validate errors / warnings | 0 / 0 |
| Duplicated code | 5.8% (34 clones, largest 31 lines) |
| Files over 300 lines | 3 |
| Lines written by the model | 65.4% |

## Issues the checks and review agents caught

Each issue is a thread between the agent that raised it and the fix session. Fixed: a fix session closed it and a later review or validation looked at that round. Fixed, unchecked: closed in the final round, which nobody reviews. Discussion threads: issues a reply kept open, from the fix session or the reviewer. `checks` are the validators, not a review agent.

| Part | Reviewer | Caught | Fixed | Fixed, unchecked | Open | Discussion threads |
|---|---|---|---|---|---|---|
| code | code | 6 | 3 | 2 | 1 | 1 |
| code | adherence | 9 | 6 | 3 | 0 | 0 |
| code | ux | 10 | 9 | 1 | 0 | 0 |
| code | behavior | 1 | 0 | 1 | 0 | 0 |
| planning | peer | 19 | 19 | 0 | 0 | 0 |
| planning | output | 7 | 3 | 4 | 0 | 0 |
| planning | checks | 1 | 1 | 0 | 0 | 0 |

## Accessibility

| Route | Signed in | axe critical + serious | axe moderate + minor | Rules passed | Contrast failures | Targets under 24 px | Unnamed controls | main / h1 | Skipped levels |
|---|---|---|---|---|---|---|---|---|---|
| / | no | 0 | 0 | 22 of 22 | 0 | 0 | 0 | 1 / 1 | 1 |
| /home | yes | 0 | 0 | 26 of 26 | 0 | 0 | 0 | 1 / 1 | 0 |
| /clients | yes | 0 | 0 | 30 of 30 | 0 | 0 | 0 | 1 / 1 | 0 |
| /clients/client-1 | yes | 0 | 0 | 29 of 29 | 0 | 0 | 0 | 1 / 1 | 0 |
| /projects | yes | 0 | 0 | 29 of 29 | 0 | 0 | 0 | 1 / 1 | 0 |
| /projects/project-1 | yes | 0 | 0 | 33 of 33 | 0 | 0 | 0 | 1 / 1 | 0 |
| /availability | yes | 0 | 0 | 25 of 25 | 0 | 0 | 0 | 1 / 1 | 0 |
| /session-types | yes | 0 | 0 | 26 of 26 | 0 | 0 | 0 | 1 / 1 | 0 |
| /sessions | yes | 0 | 0 | 25 of 25 | 0 | 0 | 0 | 1 / 1 | 0 |
| /sessions/slot-1 | yes | 0 | 0 | 29 of 29 | 0 | 0 | 0 | 1 / 1 | 0 |
| /bookings/booking-1 | yes | 0 | 0 | 25 of 25 | 0 | 0 | 0 | 1 / 1 | 0 |
| /book | no | 0 | 0 | 23 of 23 | 0 | 0 | 0 | 1 / 1 | 0 |
| /my-booking/booking-1 | no | 0 | 0 | 23 of 23 | 0 | 0 | 0 | 1 / 1 | 0 |
| /account | yes | 0 | 0 | 25 of 25 | 0 | 0 | 0 | 1 / 1 | 0 |

## Keyboard

| Route | Controls | Reachable | Focus visible | Enter and Space | Trap | Order inversions | Skip link |
|---|---|---|---|---|---|---|---|
| / | 5 | 5 | 5 | 0 of 0 | no | 0 | no |
| /home | 10 | 10 | 10 | 2 of 2 | no | 0 | no |
| /clients | 25 | 24 | 23 | 22 of 22 | no | 0 | no |
| /clients/client-1 | 17 | 17 | 17 | 14 of 14 | no | 0 | no |
| /projects | 20 | 20 | 19 | 4 of 4 | no | 0 | no |
| /projects/project-1 | 24 | 22 | 21 | 24 of 24 | no | 0 | no |
| /availability | 9 | 9 | 9 | 4 of 4 | no | 0 | no |
| /session-types | 13 | 13 | 13 | 12 of 12 | no | 0 | no |
| /sessions | 19 | 19 | 19 | 2 of 2 | no | 0 | no |
| /sessions/slot-1 | 12 | 12 | 12 | 4 of 4 | no | 0 | no |
| /bookings/booking-1 | 11 | 11 | 11 | 2 of 2 | no | 0 | no |
| /book | 5 | 4 | 4 | 0 of 0 | no | 0 | no |
| /my-booking/booking-1 | 5 | 5 | 5 | 2 of 2 | no | 0 | no |
| /account | 9 | 9 | 9 | 4 of 4 | no | 0 | no |
