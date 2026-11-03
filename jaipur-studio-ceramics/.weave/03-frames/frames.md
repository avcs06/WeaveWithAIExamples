# Frames

## FR01 Public site frame (frame)
Surrounds the public shop screens buyers use to browse pieces, use the cart, check out, confirm an order and look an order up, and gives the owner a way to sign in or create the owner account.
Flows: F11

1. Sees the logo, which leads to /.
2. Can open Pieces from the navigation.
3. Can open the cart, which goes to /cart and shows how many cart lines it holds.
4. Can open the account menu, which shows the owner's email when signed in and lets them open /dashboard or sign out, or shows "Owner sign in" and "Create owner account" when signed out.
5. Reads the studio pickup information, with the fixed studio pickup address and pickup instructions.
6. Can choose "Find your order", which goes to /order-lookup.

When the visitor is signed out:
   1. Sees the logo, which leads to /.
   2. Can open Pieces from the navigation.
   3. Can open the cart, which goes to /cart.
   4. Can choose "Owner sign in", which goes to /sign-in.
   5. Can choose "Create owner account", which goes to /sign-up.
   6. Reads the studio pickup information, with the fixed studio pickup address and pickup instructions.
   7. Can choose "Find your order", which goes to /order-lookup.

When the shop owner is signed in:
   1. Sees the logo, which leads to /.
   2. Can open Pieces from the navigation.
   3. Can open the cart, which goes to /cart.
   4. Can open the account menu, which shows the owner's email and lets them open /dashboard or sign out.
   5. Reads the studio pickup information, with the fixed studio pickup address and pickup instructions.
   6. Can choose "Find your order", which goes to /order-lookup.

Route group: `web/app/(routes)/(marketing)/`. Screens inside it: S01 /, S02 /pieces, S03 /pieces/[pieceId], S04 /cart, S05 /checkout, S06 /order-confirmation/[orderId], S07 /order-lookup, S08 /sign-in, S09 /sign-up.
Loads its records through: nothing.

## FR02 App frame (frame)
Surrounds the signed-in owner's screens for the dashboard, orders, pieces, discount codes and account so the owner can move between daily shop work.
Flows: F11

1. Sees the logo, which leads to /dashboard.
2. Can open Dashboard, Orders, Pieces and Discount codes from the navigation, in that order.
3. Can open the account menu, which shows their sign-in email, lets them open Account at /account, and lets them sign out.
4. Choosing sign out signs the owner out and goes to /.

When the visitor is signed out:
   1. Sees the sign-in screen at /sign-in instead of the owner screens.

Route group: `web/app/(routes)/(app)/`. Screens inside it: S10 /dashboard, S11 /orders, S12 /orders/[orderId], S13 /studio/pieces, S14 /studio/pieces/[pieceId], S15 /studio/pieces/new, S16 /studio/pieces/[pieceId]/edit, S17 /discount-codes, S18 /discount-codes/new, S19 /account.
Loads its records through: nothing.
