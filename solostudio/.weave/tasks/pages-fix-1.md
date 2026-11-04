The checks after your work, and the reviewers who read your change, found the issues below. Fix them in the code you wrote for this unit.

You built this unit earlier in this session, so you know what you changed. You need no git history. Your guidelines are in `.weave/01-scaffold/guidelines.md` and in these folders: `.weave/01-scaffold/`, `.weave/02-contract/`, `.weave/03-frames/`, `.weave/04-pages/`. Read one again only when you need a detail you no longer have.

Each issue below is a failed check, or a reviewer's finding with the fix it asks for. Fix each one, and keep everything else as it is. End with the summary the guidelines ask for.

## Your replies

Each issue below has an id, such as T01, and the replies given on it in earlier rounds. Each line under an issue is one reply, oldest first: its round, who gave it, its status and its reason. `fix` is you, in an earlier round. `review-<name>` is a reviewer. When a reviewer answered your reason, answer that reviewer's point.

When you finish, write `.weave/replies.json` with one reply per issue:

```json
[
  { "id": "T01", "status": "closed", "reason": "Moved the Edit button into the page header." },
  { "id": "T02", "status": "open", "reason": "T01 moves the same button; the header is where the user looks for it." }
]
```

- `closed` when you fixed it. Say what you changed.
- `open` when you did not fix it. Give your reason in one or two sentences.

## When you leave an issue open

Fix every issue. Leave an issue `open` only in one of three cases:

- Its fix would break an instruction you were given: your task, the guidelines, `UX.md` or the design. Quote that instruction in your reason.
- It asks for the opposite of another issue, such as one that moves a link and one that keeps it where it is. Fix the one that serves the user better. In the other's reason, name the one you fixed.
- Its fix would bring in a new error, such as a failed check, a step that stops working or a screen that breaks. Name what would break.

Taste, or a fix that is hard or long, is no reason to leave an issue open. For example, "The guidelines say the way up to a list is the breadcrumb, so I added no back link" is a reason. "The current layout looks cleaner" is not: fix the issue.

A failed check you answer `open` is not sent to you again. The reviewers read your replies when they review this fix. They accept a reason that quotes an instruction, names the opposite issue you fixed, or names what the fix would break. They answer any other reason `open`.

## How the checks ran

- An issue that names a route, such as `/:`, comes from a browser check the runner ran on that route after you finished. `pnpm verify` does not run it, and you cannot run it yourself. Fix it from the code. Start no dev server, and write no browser scripts.
- Each of those issues names its element by a CSS path, such as `main > form > button:nth-of-type(2)`. Find that element in your code.
- When you finish, the runner runs every check again.

## The issues

- T01: REVIEW at web/app/blocks/ClientDialogs/AddClientDialog.tsx: Dialogs used by only one screen live in app-wide blocks instead of that screen's route folder. Fix: Move dialogs used by only one screen into that screen's components/ folder and import from there; keep only AddProjectDialog, used by S06 and S07, in web/app/blocks/.
- T02: REVIEW at web/app/(routes)/(app)/clients/page.tsx: Failed-load markup is copied on every screen and client status tags are re-implemented instead of reused. Fix: Extract the repeated failed-load alert with retry into one shared component or function and use it on every screen, and render client status with the existing ClientStatusTag.
- T03: REVIEW at web/app/(routes)/(app)/sessions/[slotId]/components/SlotBookings.tsx: The change contains dead code: an unused import and exported helpers nothing imports. Fix: Remove the unused Time import and remove unused exports such as followUpState, FollowUpState and isSlotFull from web/app/blocks/Slots/slots.ts.
- T04: REVIEW at S04, S05, S07, S09, S10, S11, S14: List screens show their empty message while records are still loading and show no loading state. Fix: Show a loading state while list hooks are loading and show the empty message with its actions only after loading finishes with zero records.
- T05: REVIEW at S06, S08, S12, S13, S15: Record screens return NotFound while the record is still loading and show no loading state. Fix: Show a loading state while the get hooks are loading and show NotFound only after loading finishes with no record.
- T06: REVIEW at web/app/(routes)/(app)/availability/page.tsx: Availability shows no Edit action when nothing is saved so the empty state cannot be filled. Fix: Offer Edit/Done controls when no availability is saved so empty weekly hours can be created.
- T07: REVIEW at S12 D15: Cancel-slot confirm does not show the slot's session type and time. Fix: Show the slot's session type name and time in the cancel dialog title or content.
- T08: REVIEW at web/app/(routes)/(app)/clients/[clientId]/page.tsx, web/app/(routes)/(app)/projects/[projectId]/page.tsx: Destructive row icon buttons use danger variant while other row actions use base. Fix: Use the same quiet base ghost icon buttons with tooltips for edit and delete row actions.
- T09: REVIEW at Tables, cells and status lines across S04-S15: No one-line text uses Truncate so long values can wrap or overflow. Fix: Wrap one-line text such as names, cells, breadcrumbs and status lines in Truncate.
- T10: REVIEW at S06 at web/app/(routes)/(app)/clients/[clientId]/page.tsx: The client email shows twice, as the header subtitle and again in Details. Fix: Remove description={record.email} from the PageHeader so the email shows only once, in Details.
- T11: REVIEW at S06 Notes at web/app/(routes)/(app)/clients/[clientId]/page.tsx: When there are no notes Add a note shows twice, above the list and again in the empty state. Fix: Hide the Notes headerAction while the list is empty so Add a note shows only once in the empty state.
- T12: REVIEW at S06 Projects at web/app/(routes)/(app)/clients/[clientId]/page.tsx: When there are no projects Add a project shows twice, above the list and again in the empty state. Fix: Hide the Projects headerAction while the list is empty so Add a project shows only once in the empty state.
- T13: REVIEW at S08 Tasks at web/app/(routes)/(app)/projects/[projectId]/page.tsx: When there are no tasks Add a task shows twice, above the list and again in the empty state. Fix: Hide the Tasks headerAction while the project has no tasks so Add a task shows only once in the empty state.
- T14: REVIEW at S13 at web/app/(routes)/(app)/bookings/[bookingId]/page.tsx: Details repeats the same facts as Session type plus Time plus Slot link, showing the time twice with conflicting values. Fix: Show each fact once in Details: Name, Email, Linked client, and Slot as the single link with session type name and time formatted one way; remove the separate Session type and Time rows.
- T15: REVIEW at S12 at web/app/(routes)/(app)/sessions/[slotId]/page.tsx: The same slot shows two different times: title says 10:00 while Details says 15:30. Fix: Render the header title and the Details Session line from the same formatted slot title so both show the identical date and time.
- T16: REVIEW at D15 at web/app/(routes)/(app)/sessions/[slotId]/page.tsx: Cancel dialog does not identify which slot is being cancelled. Fix: Include the slot's session type name and date/time in the confirm dialog content, e.g. the formatted slot title, plus the note that every booking on it is cancelled.
- T17: REVIEW at S15 web/app/(routes)/(marketing)/my-booking/[bookingId]/page.tsx title vs Details Time: The title reads 5 Nov at 10:00 while Details Time reads 5 Nov 2026, 15:30 for the same slot. Fix: Show one formatted slot time in both places, so the title and the Time row read the same, for example Discovery call, 5 Nov at 10:00 and Time 5 Nov at 10:00.
- T18: REVIEW at S15 cancelled view web/app/(routes)/(marketing)/my-booking/[bookingId]/page.tsx: Book another time sits alone after the Details section instead of with the cancelled result. Fix: Put Book another time in the PageHeader actions with the This booking was cancelled result and remove the lone button after the Details section.
