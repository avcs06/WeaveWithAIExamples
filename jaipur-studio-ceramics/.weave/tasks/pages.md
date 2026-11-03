Build every screen below, each from its file in `.weave/04-pages/` into its route folder. You build them all in this session. When two screens share something, build it once, in `web/app/blocks/` or `web/app/components/`, and use it on both. When you are done, a user can do every step of every screen with the seed data. Each screen puts what the user came for first.

Read `.weave/01-scaffold/guidelines.md` first. It says what to read in each folder. Your folders are `.weave/01-scaffold/`, `.weave/02-contract/`, `.weave/03-frames/` and `.weave/04-pages/`. Follow every guideline in them.

Build the screens in the order below. Before you build each one, decide its layout from what it holds, as the guidelines say under Layout and emphasis. Check each screen with its command once it is built. The command checks the desktop width. On a page behind sign-in, it signs in as a member first.

## The screens

- S01 (Jaipur Studio Ceramics) at `/`, from `.weave/04-pages/S01.md`, in `web/app/(routes)/(marketing)`. Check it with `pnpm verify / --widths 1280`.
- S02 (Browse pieces) at `/pieces`, from `.weave/04-pages/S02.md`, in `web/app/(routes)/(marketing)/pieces`. Check it with `pnpm verify /pieces --widths 1280`.
- S03 (The piece's name) at `/pieces/[pieceId]`, from `.weave/04-pages/S03.md`, in `web/app/(routes)/(marketing)/pieces/[pieceId]`. Check it with `pnpm verify /pieces/piece-1 --widths 1280`.
- S04 (Your cart) at `/cart`, from `.weave/04-pages/S04.md`, in `web/app/(routes)/(marketing)/cart`. Check it with `pnpm verify /cart --widths 1280`.
- S05 (Checkout) at `/checkout`, from `.weave/04-pages/S05.md`, in `web/app/(routes)/(marketing)/checkout`. Check it with `pnpm verify /checkout --widths 1280`.
- S06 (The order's reference, as in "Order JSC-1024") at `/order-confirmation/[orderId]`, from `.weave/04-pages/S06.md`, in `web/app/(routes)/(marketing)/order-confirmation/[orderId]`. Check it with `pnpm verify /order-confirmation/order-1 --widths 1280`.
- S07 (Find your order) at `/order-lookup`, from `.weave/04-pages/S07.md`, in `web/app/(routes)/(marketing)/order-lookup`. Check it with `pnpm verify /order-lookup --widths 1280`.
- S10 (Dashboard) at `/dashboard`, from `.weave/04-pages/S10.md`, in `web/app/(routes)/(app)/dashboard`. Check it with `pnpm verify /dashboard --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S11 (Orders) at `/orders`, from `.weave/04-pages/S11.md`, in `web/app/(routes)/(app)/orders`. Check it with `pnpm verify /orders --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S12 (The order's reference, as in "Order JSC-1024") at `/orders/[orderId]`, from `.weave/04-pages/S12.md`, in `web/app/(routes)/(app)/orders/[orderId]`. Check it with `pnpm verify /orders/order-1 --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S13 (Pieces) at `/studio/pieces`, from `.weave/04-pages/S13.md`, in `web/app/(routes)/(app)/studio/pieces`. Check it with `pnpm verify /studio/pieces --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S14 (The piece's name) at `/studio/pieces/[pieceId]`, from `.weave/04-pages/S14.md`, in `web/app/(routes)/(app)/studio/pieces/[pieceId]`. Check it with `pnpm verify /studio/pieces/piece-1 --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S15 (Add a piece) at `/studio/pieces/new`, from `.weave/04-pages/S15.md`, in `web/app/(routes)/(app)/studio/pieces/new`. Check it with `pnpm verify /studio/pieces/new --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S16 (Edit the piece's name, as in "Edit Speckled Stoneware Mug") at `/studio/pieces/[pieceId]/edit`, from `.weave/04-pages/S16.md`, in `web/app/(routes)/(app)/studio/pieces/[pieceId]/edit`. Check it with `pnpm verify /studio/pieces/piece-1/edit --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S17 (Discount codes) at `/discount-codes`, from `.weave/04-pages/S17.md`, in `web/app/(routes)/(app)/discount-codes`. Check it with `pnpm verify /discount-codes --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S18 (Create discount code) at `/discount-codes/new`, from `.weave/04-pages/S18.md`, in `web/app/(routes)/(app)/discount-codes/new`. Check it with `pnpm verify /discount-codes/new --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S19 (Account) at `/account`, from `.weave/04-pages/S19.md`, in `web/app/(routes)/(app)/account`. Check it with `pnpm verify /account --widths 1280 --storage .weave/02-contract/signed-in.json`.
