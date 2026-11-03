The checks after your work, and the two reviewers who read your change, found the issues below. Fix them in the code you wrote for this unit.

You built this unit earlier in this session, so you know what you changed. You need no git history. Your guidelines are in `.weave/01-scaffold/guidelines.md` and in these folders: `.weave/01-scaffold/`, `.weave/02-contract/`, `.weave/03-frames/`. Read one again only when you need a detail you no longer have.

Every issue below is a blocker. Each one is a failed check, or a reviewer's finding with the fix it asks for. Fix each one, and keep everything else as it is. End with the summary the guidelines ask for.

## How the checks ran

- An issue that names a route, such as `/:`, comes from a browser check the runner ran on that route after you finished. `pnpm verify` does not run it, and you cannot run it yourself. Fix it from the code. Start no dev server, and write no browser scripts.
- Each of those issues names its element by a CSS path, such as `main > form > button:nth-of-type(2)`. Find that element in your code.
- When you finish, the runner runs every check again.

## The issues

- DESIGN-R-010 at #radix-_r_4_: /weave-frame-app: gap 8px inside body > div:nth-of-type(2) > aside:nth-of-type(1), whose gap is 6px; a group's gap is at most its parent's
- REVIEW at web/app/components/MarketingHeaderRightSlot/MarketingHeaderRightSlot.tsx: A component imports a block (CartLink), breaking the one-way import order. Fix: Do not import from @app/blocks/Cart in a file under components; move the cart link into components or expose the count through the entity layer so the import follows shared/entities/components/blocks order.
- REVIEW at web/app/blocks/Cart/cartStore.ts: Cart data is read and written through browser persistent storage outside the entity layer. Fix: Remove the persistent browser cart store from blocks and, if cart data is needed, implement it in web/app/entities/ and read it through its hook; the frames load no records.
- REVIEW at web/app/blocks/Cart/cartStore.ts: addCartLine, setCartLineQuantity, removeCartLine, clearCart and related exports are never used. Fix: Keep only useCartLineCount while it is used by the header and remove addCartLine, setCartLineQuantity, removeCartLine, clearCart, useCartStore and CartLine until a screen imports them.
