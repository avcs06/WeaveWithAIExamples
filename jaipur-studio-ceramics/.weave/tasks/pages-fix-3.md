The checks after your work, and the two reviewers who read your change, found the issues below. Fix them in the code you wrote for this unit.

You built this unit earlier in this session, so you know what you changed. You need no git history. Your guidelines are in `.weave/01-scaffold/guidelines.md` and in these folders: `.weave/01-scaffold/`, `.weave/02-contract/`, `.weave/03-frames/`, `.weave/04-pages/`. Read one again only when you need a detail you no longer have.

Every issue below is a blocker. Each one is a failed check, or a reviewer's finding with the fix it asks for. Fix each one, and keep everything else as it is. End with the summary the guidelines ask for.

## How the checks ran

- An issue that names a route, such as `/:`, comes from a browser check the runner ran on that route after you finished. `pnpm verify` does not run it, and you cannot run it yourself. Fix it from the code. Start no dev server, and write no browser scripts.
- Each of those issues names its element by a CSS path, such as `main > form > button:nth-of-type(2)`. Find that element in your code.
- When you finish, the runner runs every check again.

## The issues

- CODE-006 at web/app/(routes)/(marketing)/order-confirmation/[orderId]: Nothing in web/app/(routes)/(marketing)/order-confirmation/[orderId] calls getPiece; load the screen's records through it.
- CODE-006 at web/app/(routes)/(marketing)/order-lookup: Nothing in web/app/(routes)/(marketing)/order-lookup calls getPiece; load the screen's records through it.
- DESIGN-R-003: /discount-codes/new: focus stays among 3 controls and never leaves
- REVIEW at web/app/entities/auth/index.ts: A new entity operation was added but is not listed in the summary. Fix: List the new updateAccount operation in the summary in the same style as the operations beside it.
- REVIEW at web/app/(routes)/(app)/dashboard/page.tsx: The orders Table in Dashboard and Orders duplicates the same rows and status tags instead of being written once. Fix: Build the orders table once in blocks or components and use it on both Dashboard and Orders.
- REVIEW at S03: The piece page builds no Browse-pieces control in its body, only the breadcrumb. Fix: Add the step-6 "Browse pieces" action to /pieces in the page body beside the cart actions.
- REVIEW at web/app/blocks/OrderDetails/OrderDetails.tsx: The buyer phone number is shown as a Numeral instead of text. Fix: Render the phone number as plain text, not inside Numeral.
- REVIEW at summary: The summary Files list omits most new screens and blocks and describes edits not in the diff. Fix: List every file the diff adds and describe only changes in the diff.
