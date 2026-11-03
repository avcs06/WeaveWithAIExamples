The checks after your work, and the two reviewers who read your change, found the issues below. Fix them in the code you wrote for this unit.

You built this unit earlier in this session, so you know what you changed. You need no git history. Your guidelines are in `.weave/01-scaffold/guidelines.md` and in these folders: `.weave/01-scaffold/`, `.weave/02-contract/`, `.weave/03-frames/`, `.weave/04-pages/`. Read one again only when you need a detail you no longer have.

Every issue below is a blocker. Each one is a failed check, or a reviewer's finding with the fix it asks for. Fix each one, and keep everything else as it is. End with the summary the guidelines ask for.

## How the checks ran

- An issue that names a route, such as `/:`, comes from a browser check the runner ran on that route after you finished. `pnpm verify` does not run it, and you cannot run it yourself. Fix it from the code. Start no dev server, and write no browser scripts.
- Each of those issues names its element by a CSS path, such as `main > form > button:nth-of-type(2)`. Find that element in your code.
- When you finish, the runner runs every check again.

## The issues

- DESIGN-R-003: /discount-codes/new: focus stays among 3 controls and never leaves
- REVIEW at web/app/blocks/LinePhoto/LinePhoto.tsx: Block reads records through its own hook instead of receiving them from the screen, and order-confirmation and order-lookup never call the required getPiece hook in their route folder. Fix: Call the getPiece/list operation hook inside each screen's route folder and pass the photo/name to a presentational LinePhoto instead of calling useGetPiece inside the block
- REVIEW at web/app/(routes)/(app)/studio/pieces/[pieceId]/components/RemovePieceDialog.tsx: Dialog reads records through entity functions in an effect instead of through the operation hook. Fix: Receive the piece and its blocking orders as props loaded by the screen's useGetPiece/useListOrders hooks instead of calling getPiece/listOrders functions and copying results into effect state
- REVIEW at web/app/(routes)/(marketing)/checkout/page.tsx: Loading and failed-load markup every screen shows is duplicated in every page instead of written once. Fix: Share one loading and one failed-load component across all screens instead of repeating the same Paragraph plus Try-again markup in every page
- REVIEW at web/app/entities/cart/index.ts: Entity layer adds cart operations that the summary does not list. Fix: List useCartLines, addCartLine, updateCartLine, removeCartLine and clearCart in the summary as added operations written like the ones beside them
- REVIEW at web/app/blocks/PieceCard/PieceCard.tsx: Change exports components and helpers that no importer uses. Fix: Remove the unused PieceCardContent export and the unused valuesToPieceInput export from PieceForm or use them, so every export is used
