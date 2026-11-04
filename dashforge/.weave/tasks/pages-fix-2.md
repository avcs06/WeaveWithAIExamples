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

- T47: REVIEW at web/app/(routes)/(app)/dashboards/page.tsx: Alternative 'This dashboard is no longer available.' when a dashboard was deleted in the meantime is not built, and empty-state does not hide the frame's Create dashboard action. Fix: Add the deleted-dashboard alternative (message + show home list) and hide the frame Create action while the list is empty as S04 requires.
  - round 2, fix, open: Concurrent deletion detection requires backend subscription not available with mock layer.
  - round 2, review-adherence, open: Alternative can be built without realtime subscription: handle delete/get error as 'already gone' and show message + keep list visible; hiding frame Create action while empty is a conditional render in AppSidebar/AppHeader, not a subscription. Reason does not quote guideline that rules it out.
- T48: REVIEW at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: Alternative 'This widget is gone.' when a widget was deleted in the meantime is not built. Fix: Detect missing widget and show 'This widget is gone.' while rendering the editor without it.
  - round 2, fix, open: Concurrent widget deletion detection requires realtime subscription not available.
  - round 2, review-adherence, open: Widget-gone alternative can be built from getWidget/listWidgets returning null/empty after delete and rendering 'This widget is gone.' inline; does not require realtime subscription. Mock layer can simulate via error code already used for dashboard delete.
- T62: REVIEW at web/app/blocks/DeleteDashboardDialog/DeleteDashboardDialog.tsx: Imports useWidgetStore from @app/entities/widget/store and mutates records directly via setState, bypassing entity layer. Fix: Remove store import and clean up widgets only through entity operations (e.g., deleteWidget per widget or add a deleteWidgetsByDashboard operation in the widget entity that uses createPersistentStore).
- T63: REVIEW at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: Single page component loads records, holds ~15 useState/useRef, implements dashboard rename, duplicate, add/remove widget, title edit, reposition, size, link add/edit and all dialogs and layout. Fix: Split into single-responsibility components/blocks (e.g., DashboardHeader, WidgetGrid, AddWidgetDialog, RemoveWidgetDialog, LinkDialog, widget type components) and compose them in page.tsx.
- T64: REVIEW at web/app/(routes)/(app)/account/page.tsx: Imports violate one-way order: @app/components/PageHeader imported before @app/entities/auth (and same pattern in dashboards/page.tsx and dashboards/[dashboardId]/page.tsx where blocks/components precede entities). Fix: Reorder imports to shared -> entities -> components -> blocks -> routes in each file.
- T65: REVIEW at web/app/(routes)/(app)/dashboards/page.tsx: Duplicate creates the copy dashboard then creates its widgets one by one with no rollback; if a createWidget fails the copy remains with partial widgets. Fix: Make the multi-record duplicate atomic: if any widget create fails delete the partially created copy (and its widgets) and show what failed, or create dashboard+widgets in one operation.
- T66: REVIEW at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: Duplicate and create flows create one record then update another (createWidget + updateDashboard lastEditedAt, duplicate loop) without atomicity; failure leaves partial state. Fix: Wrap the multi-step change so either all steps succeed or the user is told what did not happen and partial records are removed/rolled back.
- T67: REVIEW at web/app/(routes)/(app)/dashboards/[dashboardId]/page.tsx: handleSaveDash and handleWTitle have no pending guard, so a second press while the save runs fires the operation again. Fix: Guard every save/update action with a saving flag, return early if pending, and show loadingWithReason/disabled while it runs.
