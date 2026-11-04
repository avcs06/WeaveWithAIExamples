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

- T01: DESIGN-R-011 at body > div:nth-of-type(2) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > header:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > a:nth-of-type(1): /dashboard/pieces: padding 8px with a gap of 10px; a container's padding is at least its gap
- T02: DESIGN-R-010 at body > div:nth-of-type(2) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > header:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > a:nth-of-type(1): /dashboard/pieces/piece-1: gap 10px inside body > div:nth-of-type(2) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > header:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2), whose gap is 8px; a group's gap is at most its parent's
- T03: DESIGN-R-011 at body > div:nth-of-type(2) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > header:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > a:nth-of-type(1): /dashboard/pieces/piece-1: padding 8px with a gap of 10px; a container's padding is at least its gap
- T04: DESIGN-R-012 at body > div:nth-of-type(2) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(1) > td:nth-of-type(3) > span:nth-of-type(1): /dashboard/orders/order-1: wrap the number "2" in Numeral from @packages/ui/Numeral: a number the user reads and compares is set in the mono font
- T05: DESIGN-R-012 at body > div:nth-of-type(2) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > table:nth-of-type(1) > tbody:nth-of-type(1) > tr:nth-of-type(1) > td:nth-of-type(4) > span:nth-of-type(1): /dashboard/orders/order-1: wrap the number "650" in Numeral from @packages/ui/Numeral: a number the user reads and compares is set in the mono font
- T06: DESIGN-R-011 at body > div:nth-of-type(2) > main:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > header:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > a:nth-of-type(1): /dashboard/discount-codes: padding 8px with a gap of 10px; a container's padding is at least its gap
- T07: REVIEW at web/app/(routes)/(marketing)/shop/page.tsx and 11 other page.tsx screens: The loading and failed-load markup every screen shows is repeated in each screen instead of written once. Fix: Write the loading and failed-load markup once as one component or function in components or blocks and use it on every screen instead of repeating the Paragraph plus Try again block in each file.
- T08: REVIEW at web/app/blocks/orders/OrderItems.tsx: OrderDate and stockTag are exported but never used. Fix: Remove the unused OrderDate and stockTag exports or use them where stock and dates are shown.
- T09: REVIEW at web/app/blocks/pieces/variants.ts: isSoldOut is exported but never used. Fix: Remove the unused isSoldOut export or use it where sold-out is decided.
- T10: REVIEW at web/app/entities/auth/index.ts: changePassword writes the plaintext password to persistent browser storage. Fix: Do not persist the password in the persistent store or any browser storage and never show it back; keep only the session and handle the password change without storing the secret.
- T11: REVIEW at web/app/(routes)/(marketing)/order-lookup/page.tsx and web/app/(routes)/(marketing)/checkout/page.tsx: Records are read through async functions instead of through the operation hooks. Fix: Read records only through the entity layer hooks such as useLookupOrder and useListOrders instead of calling the lookupOrder and listOrders functions directly.
- T12: REVIEW at web/app/(routes)/(marketing)/shop/[pieceId]/page.tsx: S03 step 1 requires photos, title, description, price and category but the page never shows the category. Fix: Show the piece category (FD05) by its label beside the title, description and price.
- T13: REVIEW at web/app/(routes)/(marketing)/page.tsx: S01 hero media builds piece preview by hand with Card without photo, category or link instead of a CardList of piece cards. Fix: Render the hero media preview from PieceCards/CardList with photo, title link, price, category and stock/sold-out for up to 3 in-stock pieces.
- T14: REVIEW at web/app/(routes)/(marketing)/shop/[pieceId]/page.tsx: Glaze-and-size variants show the raw size key small/medium/large instead of its Small/Medium/Large label. Fix: Map every displayed size key through SizeOptions labels so it reads Small, Medium or Large in S03, S04, S06, S10, S11 and S13.
- T15: REVIEW at web/app/(routes)/(app)/dashboard/account/page.tsx: S20 password edit adds a second labeled field with help text and a Done button under the record instead of an in-place edit. Fix: Edit the password in place with no label and no help text and icon edit/save/cancel buttons beside the value, or in a dialog.
- T16: REVIEW at web/app/blocks/pieces/PieceCards.tsx: No screen uses Truncate for one-line text such as titles, cells, breadcrumbs or status lines. Fix: Wrap every text meant for one line in Truncate so it cuts with ellipsis and tooltip instead of wrapping or overflowing.
- T17: REVIEW at web/app/entities/auth/index.ts: changePassword writes the plaintext password into persistent browser storage. Fix: Do not persist the password: remove `passwords` from the persistent store and keep nothing secret in browser storage, logs, URLs, or UI.
- T18: REVIEW at web/app/(routes)/(marketing)/checkout/page.tsx: Checkout decrements each piece's stock then creates the order with no atomicity, leaving partial stock loss when a later step fails. Fix: Make stock decrements and order creation atomic in one entity operation with rollback, or restore any decremented stock and tell the user exactly what was and was not saved.
- T19: REVIEW at web/app/(routes)/(app)/dashboard/orders/[orderId]/page.tsx: Cancel restores stock piece-by-piece then cancels with no guard or atomicity, so failure or a second press can double-restore stock while reporting unchanged. Fix: Make stock restore plus cancellation a single atomic operation with a running guard so a second press does nothing, and report exactly what failed without claiming the order is unchanged after partial restores.
- T20: REVIEW at web/app/blocks/orders/money.ts: Percentage discounts stay fractional so separately rounded shown discount and total can differ by ₹1. Fix: Round the discount to whole rupees once (e.g. Math.round) before computing shipping and total so the shown total equals shown subtotal minus shown discount plus shown shipping.
- T21: REVIEW at web/app/(routes)/(app)/dashboard/orders/[orderId]/page.tsx: Mark paid, advance, cancel, deactivate and remove run without a running guard so a second press re-runs the operation. Fix: Disable each mutating button while its operation runs so a second press while it runs does nothing, as done for form submits.
