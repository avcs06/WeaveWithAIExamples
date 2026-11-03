# Frames

## FR01 Public site frame (frame)
Surrounds the landing page, shop, piece, cart, checkout, order lookup, order confirmation, sign in and sign up pages for buyers and for the owner before signing in.
Flows: F04, F09

1. Sees the logo "Jaipur Studio Ceramics", which leads to /.
2. Can open Shop and Look up an order from the navigation, in that order.
3. Can open the cart, which shows the cart count and total when the cart has items and goes to /cart (F04.S01).
4. Can choose "Studio owner sign in", which goes to /sign-in (F09.S01).
5. Reads the studio pickup information: the fixed Jaipur studio pickup address and pickup instructions supplied by the owner, and that the owner collects payment by UPI after an order is placed.
6. Can open Shop, Look up an order, Studio owner sign in and "Create studio owner account" from the shop links in the footer, with "Create studio owner account" going to /sign-up.

When the shop owner is signed in and visits a public page:
   1. Sees the same logo, navigation, cart and footer, with no owner sign in shown after the owner signs in, because owner work happens in the app frame.

Route group: `web/app/(routes)/(marketing)/`. Screens inside it: S01 /, S02 /shop, S03 /shop/[pieceId], S04 /cart, S05 /checkout, S06 /orders/[orderReference], S07 /order-lookup, S08 /sign-in, S09 /sign-up.
Loads its records through: nothing.

## FR02 App frame (frame)
Surrounds every signed-in owner screen: the home dashboard, pieces, orders, discount codes and account.
Flows: F10

1. Sees the logo "Jaipur Studio Ceramics", which leads to /dashboard.
2. Can open Home, Pieces, Orders and Discount codes from the navigation, in that order.
3. Can open the account menu, which shows the owner's email and lets them open Account or choose "Sign out", which ends the session and goes to / (F10.S01).

When the user is signed out:
   1. Sees no app frame; the visitor is shown /sign-in instead.

Route group: `web/app/(routes)/(app)/`. Screens inside it: S10 /dashboard, S11 /dashboard/pieces, S12 /dashboard/pieces/new, S13 /dashboard/pieces/[pieceId], S14 /dashboard/pieces/[pieceId]/edit, S15 /dashboard/orders, S16 /dashboard/orders/[orderId], S17 /dashboard/discount-codes, S18 /dashboard/discount-codes/new, S19 /dashboard/discount-codes/[discountCodeId], S20 /dashboard/account.
Loads its records through: nothing.
