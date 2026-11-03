Build every screen below, each from its file in `.weave/04-pages/` into its route folder. You build them all in this session. When two screens share something, build it once, in `web/app/blocks/` or `web/app/components/`, and use it on both. When you are done, a user can do every step of every screen with the seed data. Each screen puts what the user came for first.

Read `.weave/01-scaffold/guidelines.md` first. It says what to read in each folder. Your folders are `.weave/01-scaffold/`, `.weave/02-contract/`, `.weave/03-frames/` and `.weave/04-pages/`. Follow every guideline in them.

Build the screens in the order below. Before you build each one, decide its layout from what it holds, as the guidelines say under Layout and emphasis. Check each screen with its command once it is built. The command checks the desktop width. On a page behind sign-in, it signs in as a member first.

## The screens

- S01 (Jaipur Studio Ceramics) at `/`, from `.weave/04-pages/S01.md`, in `web/app/(routes)/(marketing)`. Check it with `pnpm verify / --widths 1280`.
- S02 (Shop) at `/shop`, from `.weave/04-pages/S02.md`, in `web/app/(routes)/(marketing)/shop`. Check it with `pnpm verify /shop --widths 1280`.
- S03 (The piece's title (FD01)) at `/shop/[pieceId]`, from `.weave/04-pages/S03.md`, in `web/app/(routes)/(marketing)/shop/[pieceId]`. Check it with `pnpm verify /shop/piece-1 --widths 1280`.
- S04 (Your cart) at `/cart`, from `.weave/04-pages/S04.md`, in `web/app/(routes)/(marketing)/cart`. Check it with `pnpm verify /cart --widths 1280`.
- S05 (Checkout) at `/checkout`, from `.weave/04-pages/S05.md`, in `web/app/(routes)/(marketing)/checkout`. Check it with `pnpm verify /checkout --widths 1280`.
- S06 (The order reference (FD17), as in "Order JSC-4821") at `/orders/[orderReference]`, from `.weave/04-pages/S06.md`, in `web/app/(routes)/(marketing)/orders/[orderReference]`. Check it with `pnpm verify /orders/demo --widths 1280`.
- S07 (Look up an order) at `/order-lookup`, from `.weave/04-pages/S07.md`, in `web/app/(routes)/(marketing)/order-lookup`. Check it with `pnpm verify /order-lookup --widths 1280`.
- S10 (Home) at `/dashboard`, from `.weave/04-pages/S10.md`, in `web/app/(routes)/(app)/dashboard`. Check it with `pnpm verify /dashboard --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S11 (Pieces) at `/dashboard/pieces`, from `.weave/04-pages/S11.md`, in `web/app/(routes)/(app)/dashboard/pieces`. Check it with `pnpm verify /dashboard/pieces --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S12 (Add a piece) at `/dashboard/pieces/new`, from `.weave/04-pages/S12.md`, in `web/app/(routes)/(app)/dashboard/pieces/new`. Check it with `pnpm verify /dashboard/pieces/new --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S13 (The piece's title (FD01)) at `/dashboard/pieces/[pieceId]`, from `.weave/04-pages/S13.md`, in `web/app/(routes)/(app)/dashboard/pieces/[pieceId]`. Check it with `pnpm verify /dashboard/pieces/piece-1 --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S14 (Edit the piece's title (FD01), as in "Edit Speckled Chai Mug") at `/dashboard/pieces/[pieceId]/edit`, from `.weave/04-pages/S14.md`, in `web/app/(routes)/(app)/dashboard/pieces/[pieceId]/edit`. Check it with `pnpm verify /dashboard/pieces/piece-1/edit --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S15 (Orders) at `/dashboard/orders`, from `.weave/04-pages/S15.md`, in `web/app/(routes)/(app)/dashboard/orders`. Check it with `pnpm verify /dashboard/orders --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S16 (The order reference (FD17), as in "Order JSC-4821") at `/dashboard/orders/[orderId]`, from `.weave/04-pages/S16.md`, in `web/app/(routes)/(app)/dashboard/orders/[orderId]`. Check it with `pnpm verify /dashboard/orders/order-1 --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S17 (Discount codes) at `/dashboard/discount-codes`, from `.weave/04-pages/S17.md`, in `web/app/(routes)/(app)/dashboard/discount-codes`. Check it with `pnpm verify /dashboard/discount-codes --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S18 (Create a discount code) at `/dashboard/discount-codes/new`, from `.weave/04-pages/S18.md`, in `web/app/(routes)/(app)/dashboard/discount-codes/new`. Check it with `pnpm verify /dashboard/discount-codes/new --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S19 (The discount code (FD19), as in "WEEKEND10") at `/dashboard/discount-codes/[discountCodeId]`, from `.weave/04-pages/S19.md`, in `web/app/(routes)/(app)/dashboard/discount-codes/[discountCodeId]`. Check it with `pnpm verify /dashboard/discount-codes/discountCode-1 --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S20 (Account) at `/dashboard/account`, from `.weave/04-pages/S20.md`, in `web/app/(routes)/(app)/dashboard/account`. Check it with `pnpm verify /dashboard/account --widths 1280 --storage .weave/02-contract/signed-in.json`.
