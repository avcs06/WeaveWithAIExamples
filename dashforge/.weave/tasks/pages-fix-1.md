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

- T01: CODE-014 at web/app/(routes)/(app)/account/page.tsx: web/app/(routes)/(app)/account/page.tsx uses Button without its recipe read. Call get_recipe Button, then build it as the case that fits.
- T02: CODE-014 at web/app/(routes)/(app)/account/page.tsx: web/app/(routes)/(app)/account/page.tsx uses Form without its recipe read. Call get_recipe Form, then build it as the case that fits.
- T03: CODE-014 at web/app/(routes)/(app)/account/page.tsx: web/app/(routes)/(app)/account/page.tsx uses Input without its recipe read. Call get_recipe Input, then build it as the case that fits.
- T04: CODE-014 at web/app/(routes)/(app)/account/page.tsx: web/app/(routes)/(app)/account/page.tsx uses Section without its recipe read. Call get_recipe Section, then build it as the case that fits.
- T05: CODE-014 at web/app/(routes)/(app)/account/page.tsx: web/app/(routes)/(app)/account/page.tsx uses Toast without its recipe read. Call get_recipe Toast, then build it as the case that fits.
- T06: CODE-014 at web/app/(routes)/(app)/account/page.tsx: web/app/(routes)/(app)/account/page.tsx uses Typography without its recipe read. Call get_recipe Typography, then build it as the case that fits.
- T07: CODE-014 at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx uses Button without its recipe read. Call get_recipe Button, then build it as the case that fits.
- T08: CODE-014 at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx uses Card without its recipe read. Call get_recipe Card, then build it as the case that fits.
- T09: CODE-014 at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx uses Checkbox without its recipe read. Call get_recipe Checkbox, then build it as the case that fits.
- T10: CODE-014 at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx uses Dialog without its recipe read. Call get_recipe Dialog, then build it as the case that fits.
- T11: CODE-014 at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx uses Dropdown without its recipe read. Call get_recipe Dropdown, then build it as the case that fits.
- T12: CODE-014 at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx uses Input without its recipe read. Call get_recipe Input, then build it as the case that fits.
- T13: CODE-014 at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx uses Link without its recipe read. Call get_recipe Link, then build it as the case that fits.
- T14: CODE-014 at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx uses Numeral without its recipe read. Call get_recipe Numeral, then build it as the case that fits.
- T15: CODE-014 at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx uses Select without its recipe read. Call get_recipe Select, then build it as the case that fits.
- T16: CODE-014 at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx uses Textarea without its recipe read. Call get_recipe Textarea, then build it as the case that fits.
- T17: CODE-014 at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx uses Toast without its recipe read. Call get_recipe Toast, then build it as the case that fits.
- T18: CODE-014 at web/app/(routes)/(app)/dashboards/page.tsx: web/app/(routes)/(app)/dashboards/page.tsx uses Button without its recipe read. Call get_recipe Button, then build it as the case that fits.
- T19: CODE-014 at web/app/(routes)/(app)/dashboards/page.tsx: web/app/(routes)/(app)/dashboards/page.tsx uses Dropdown without its recipe read. Call get_recipe Dropdown, then build it as the case that fits.
- T20: CODE-014 at web/app/(routes)/(app)/dashboards/page.tsx: web/app/(routes)/(app)/dashboards/page.tsx uses Input without its recipe read. Call get_recipe Input, then build it as the case that fits.
- T21: CODE-014 at web/app/(routes)/(app)/dashboards/page.tsx: web/app/(routes)/(app)/dashboards/page.tsx uses Table without its recipe read. Call get_recipe Table, then build it as the case that fits.
- T22: CODE-014 at web/app/(routes)/(app)/dashboards/page.tsx: web/app/(routes)/(app)/dashboards/page.tsx uses Toast without its recipe read. Call get_recipe Toast, then build it as the case that fits.
- T23: CODE-014 at web/app/(routes)/(app)/dashboards/page.tsx: web/app/(routes)/(app)/dashboards/page.tsx uses Tooltip without its recipe read. Call get_recipe Tooltip, then build it as the case that fits.
- T24: CODE-014 at web/app/(routes)/(app)/dashboards/page.tsx: web/app/(routes)/(app)/dashboards/page.tsx uses Typography without its recipe read. Call get_recipe Typography, then build it as the case that fits.
- T25: CODE-014 at web/app/(routes)/(marketing)/page.tsx: web/app/(routes)/(marketing)/page.tsx uses Button without its recipe read. Call get_recipe Button, then build it as the case that fits.
- T26: CODE-014 at web/app/(routes)/(marketing)/page.tsx: web/app/(routes)/(marketing)/page.tsx uses Card without its recipe read. Call get_recipe Card, then build it as the case that fits.
- T27: CODE-014 at web/app/(routes)/(marketing)/page.tsx: web/app/(routes)/(marketing)/page.tsx uses Checkbox without its recipe read. Call get_recipe Checkbox, then build it as the case that fits.
- T28: CODE-014 at web/app/(routes)/(marketing)/page.tsx: web/app/(routes)/(marketing)/page.tsx uses Link without its recipe read. Call get_recipe Link, then build it as the case that fits.
- T29: CODE-014 at web/app/(routes)/(marketing)/page.tsx: web/app/(routes)/(marketing)/page.tsx uses Numeral without its recipe read. Call get_recipe Numeral, then build it as the case that fits.
- T30: CODE-014 at web/app/(routes)/(marketing)/page.tsx: web/app/(routes)/(marketing)/page.tsx uses Section without its recipe read. Call get_recipe Section, then build it as the case that fits.
- T31: CODE-014 at web/app/(routes)/(marketing)/page.tsx: web/app/(routes)/(marketing)/page.tsx uses Typography without its recipe read. Call get_recipe Typography, then build it as the case that fits.
- T32: CODE-014 at web/app/blocks/DeleteDashboardDialog/DeleteDashboardDialog.tsx: web/app/blocks/DeleteDashboardDialog/DeleteDashboardDialog.tsx uses Button without its recipe read. Call get_recipe Button, then build it as the case that fits.
- T33: CODE-014 at web/app/blocks/DeleteDashboardDialog/DeleteDashboardDialog.tsx: web/app/blocks/DeleteDashboardDialog/DeleteDashboardDialog.tsx uses Dialog without its recipe read. Call get_recipe Dialog, then build it as the case that fits.
- T34: CODE-014 at web/app/blocks/DeleteDashboardDialog/DeleteDashboardDialog.tsx: web/app/blocks/DeleteDashboardDialog/DeleteDashboardDialog.tsx uses Toast without its recipe read. Call get_recipe Toast, then build it as the case that fits.
- T35: CODE-003: lint failed:
> nx run web:lint

> eslint .

[0m[0m
[0m[4mweb/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx[24m[0m
[0m  [2m4:10[22m  [33mwarning[39m  'NextLink' is defined but never used  [2m@typescript-eslint/no-unused-vars[22m[0m
[0m[0m
[0m[4mweb/app/(routes)/(app)/dashboards/page.tsx[24m[0m
[0m   [2m16:10[22m  [33mwarning[39m  'Table' is defined but never used                                                                                     [2m@typescript-eslint/no-unused-vars[22m[0m
[0m   [2m20:17[22m  [33mwarning[39m  'Copy' is defined but never used                                                                                      [2m@typescript-eslint/no-unused-vars[22m[0m
[0m   [2m20:49[22m  [33mwarning[39m  'Trash2' is defined but never used                                                                                    [2m@typescript-eslint/no-unused-vars[22m[0m
[0m  [2m155:76[22m  [31merror[39m    Use `disabledWithReason` so the user sees why, or write a comment right above `disabled` saying why it has no reason  [2mdisabled-reasons/with-reason-or-comment[22m[0m
[0m[0m
[0m[4mweb/app/(routes)/(marketing)/page.tsx[24m[0m
[0m   [2m6:10[22m  [33mwarning[39m  'Card' is defined but never used  [2m@typescript-eslint/no-unused-vars[22m[0m
[0m  [2m58:56[22m  [33mwarning[39m  Unexpected empty arrow function   [2m@typescript-eslint/no-empty-function[22m[0m
[0m[0m
[0m[4mweb/app/blocks/DeleteDashboardDialog/DeleteDashboardDialog.tsx[24m[0m
[0m  [2m58:13[22m  [31merror[39m  Use `loadingWithReason` so the user sees why, or write a comment right above `loading` saying why it has no reason  [2mdisabled-reasons/with-reason-or-comment[22m[0m
[0m[0m
[0m[31m[1m✖ 8 problems (2 errors, 6 warnings)[22m[39m[0m
[0m[31m[1m[22m[39m[0m
Warning: command "eslint ." exited with non-zero status code


 NX   Running target lint for project web failed

Failed tasks:

- web:lint

Hint: run the command with --verbose for more details.
- T36: REVIEW at web/app/(routes)/(app)/dashboards/page.tsx: Imports entity store directly and mutates it to duplicate widgets instead of using entity operations Fix: Remove import of useWidgetStore from @app/entities/widget/store and duplicate widgets only through entity layer functions (e.g. createWidget/duplicate operation); never import or write to store inner files from a screen or block
- T37: REVIEW at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: Imports entity store inner file and writes records with setState/crypto.randomUUID instead of entity operations Fix: Remove import from @app/entities/widget/store and replace direct useWidgetStore.setState and crypto.randomUUID duplication with entity create/duplicate functions; screens/blocks must only use hooks and async functions exported from @app/entities/<entity>
- T38: REVIEW at web/app/(routes)/(app)/account/page.tsx: Uses mockCall('updatePassword') instead of entity layer auth operation to change password Fix: Replace mockCall with the auth entity's update/change-password function/hook and handle its success/error as the flow describes; do not call mock or fetch directly from component
- T39: REVIEW at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: Single page component loads records, holds all form/dialog state for every widget type, and lays out entire screen Fix: Split into single-purpose components (e.g. separate widget cards, dialogs, and edit controls in components/ beside route or in blocks) so page composes them instead of containing all logic
- T40: REVIEW at web/app/(routes)/(app)/dashboards/page.tsx: Import order violates shared->entities->components->blocks->screens (blocks imported before entities/components) Fix: Reorder imports to entities first, then components, then blocks; e.g. import from @app/entities/dashboard before @app/components/* and @app/blocks/*
- T41: REVIEW at web/app/(routes)/(app)/account/page.tsx: Import order violates layer order and contains dead imports/logic (components before entities) Fix: Reorder to entities before components and remove unused direct store/mock usage; keep only entity hooks/functions
- T42: REVIEW at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: Contains unused import NextLink and dead code paths Fix: Remove unused imports (NextLink) and any unused props/branches; ensure every import and branch is used
- T43: REVIEW at web/app/(routes)/(app)/dashboards/page.tsx: In-place rename adds a labeled Input ("Dashboard name") with error prop; A15 requires in-place edit has no label and no help text, with only icon buttons beside the value. Fix: Render the inline edit as an unlabeled field (no label/help) with save/cancel IconButtons beside the value, showing validation inline without a label.
- T44: REVIEW at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: In-place edits for dashboard name, widget title, counter label and checklist item use labeled Inputs; A15 forbids label/help text for in-place edits. Fix: Remove labels/help from all in-place edits (dashboard name, widget title, counter label, checklist item) and keep only the value with save/cancel icon buttons.
- T45: REVIEW at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: Note/counter/checklist validations show toast instead of marking the field with the design's messages (Max 5000, Max 40, Text is required and max 120) and keeping typed value without saving. Fix: Mark the specific field as invalid with the exact messages from S05 alternatives, keep what was typed, and do not save.
- T46: REVIEW at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: Widgets list is rendered as a div of Card components, not a Table or CardList; A13 requires every list of records be a Table or CardList. Fix: Render widgets with CardList (layout grid/column as appropriate) so the list uses the required component.
- T47: REVIEW at web/app/(routes)/(app)/dashboards/page.tsx: Alternative 'This dashboard is no longer available.' when a dashboard was deleted in the meantime is not built, and empty-state does not hide the frame's Create dashboard action. Fix: Add the deleted-dashboard alternative (message + show home list) and hide the frame Create action while the list is empty as S04 requires.
- T48: REVIEW at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: Alternative 'This widget is gone.' when a widget was deleted in the meantime is not built. Fix: Detect missing widget and show 'This widget is gone.' while rendering the editor without it.
- T49: REVIEW at web/app/(routes)/(app)/account/page.tsx: Password validation and incorrect-password/failure messages are shown as form-level error, not as field-marked errors with the exact wording, and success/failure handling does not match S06 alternatives. Fix: Mark the fields as invalid with 'Current password is required and new password must be 8 to 128 characters' / 'Current password is incorrect.' / 'Could not update password. Try again.' and clear passwords for security as specified.
- T50: REVIEW at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: Checklist and link lists use array index as React key while items can be added/removed. Fix: Use a stable id from the record for each item's key (e.g. item id) and never use index where items can be added, removed or reordered.
- T51: REVIEW at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: Save/change actions can be triggered twice while running and do not wait/disable. Fix: Make every create/update/delete handler async, await its operation, disable its button while pending, and ignore a second press until it settles, showing success/error.
- T52: REVIEW at web/app/(routes)/(app)/dashboards/page.tsx: Duplicate/create/rename/delete actions run without a pending guard so a second press runs again. Fix: Track pending per action, disable the triggering control with loading/disabledWithReason while awaiting, and handle success/error once.
- T53: REVIEW at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: Reordering does two separate repositionWidget writes; if the second fails the order is left inconsistent. Fix: Perform the reorder as a single atomic operation or rollback on failure and tell the user what did not happen so records stay consistent.
- T54: REVIEW at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: Link href from widget records is rendered without restricting to http/https/app URLs. Fix: Validate/filter href before rendering and only render Link when it starts with http://, https:// or an app route; otherwise render plain text.
- T55: REVIEW at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: Saving/Saved indicator uses setTimeout without cleanup so it can set state after unmount/navigation. Fix: Store timer ids in a ref/effect and clear them in the effect cleanup, and guard against showing a stale load after the user moved to another dashboard.
- T56: REVIEW at web/app/(routes)/(app)/account/page.tsx: Password save does not disable while awaiting and does not prevent double submit. Fix: Await the update, disable Save while pending, and react to success/error once per press.
- T57: REVIEW at S05 at /dashboards/[dashboardId] in web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: Widgets render in a single narrow column (flex-col-gap-4) and ignore FD06 size, leaving empty space on 1280px and not showing small/medium/large footprint. Fix: Render widgets in a grid (e.g. 12-col grid or CardList layout="grid") and map size to column span so small/medium/large have different visual footprints and fill the width.
- T58: REVIEW at S05 at /dashboards/[dashboardId] in web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx PageHeader actions: Editing header shows four filled Buttons (Add widget, Duplicate, Delete, Done) with equal weight; view has no single primary action. Fix: Keep one primary (Done or Add widget) and make the others secondary/ghost or move Duplicate/Delete to a menu; Delete stays variant="danger" as the only danger primary.
- T59: REVIEW at S05 at /dashboards/[dashboardId] in web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx Saving status: Saving/Saved indicator sits in its own row below PageHeader, not beside the dashboard name it describes. Fix: Place the Saving/Saved text inline with the title in PageHeader (or immediately beside it) so the status sits beside what it describes per U12.
- T60: REVIEW at S05 at /dashboards/[dashboardId] in web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx dashboard name edit: In editing mode the name is not editable until user clicks an extra "Edit dashboard name" button, adding a step and a dangling button row. Fix: When editing is on, show the dashboard name directly as an editable field with current value and save/cancel icon buttons, without the intermediate button.
- T61: REVIEW at S04 at /dashboards in web/app/(routes)/(app)/dashboards/page.tsx name column inline edit: Inline rename renders Input with visible label "Dashboard name" inside the table cell, adding noise and breaking in-place edit (field should have no label). Fix: Render the in-place field without a label (aria-label only) with save/cancel icon buttons side-by-side in the same cell.
