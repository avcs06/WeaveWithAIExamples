# Jaipur Studio Ceramics: frames, screens and dialogs

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

## FR02 App frame (frame)
Surrounds every signed-in owner screen: the home dashboard, pieces, orders, discount codes and account.
Flows: F10

1. Sees the logo "Jaipur Studio Ceramics", which leads to /dashboard.
2. Can open Home, Pieces, Orders and Discount codes from the navigation, in that order.
3. Can open the account menu, which shows the owner's email and lets them open Account or choose "Sign out", which ends the session and goes to / (F10.S01).

When the user is signed out:
   1. Sees no app frame; the visitor is shown /sign-in instead.

## S01 Jaipur Studio Ceramics (/)
Introduce the studio's own shop, show featured in-stock pieces, and start browsing without an account or messaging.
Roles: buyer · Frame: FR01 · Flows: F01

1. Reads the headline "Handmade ceramics from our Jaipur studio".
2. Reads the line under it: "Mugs, bowls, planters and vases made in small batches. Order what is actually in stock, with no account and no messaging."
3. Can choose "Browse the shop", the main action, which goes to /shop.
4. Sees a preview of the shop at work: featured piece cards for a Speckled Chai Mug at ₹650 with 12 left, a Sage Green planter marked sold out, and a bowl with 3 left, each showing its photo, price and how many are left or sold out.
5. Sees each featured piece as a card with its photo, title (FD01), price (FD03), category (FD05) and how many are left or sold out; can open a featured piece, which goes to /shop/[pieceId] (F01.A03).
6. Reads "Made in small batches" and the line "Each glaze and size shows the real stock left, so what you order is what we have."
7. Reads "Order without messaging" and the line "Choose your glaze and size, place your order, and we will collect payment by UPI later."
8. Reads "Pickup or courier" and the line "Collect from our Jaipur studio for free, or choose courier for ₹99, free when your discounted subtotal is above ₹1,500."
9. Reads "Honest availability" and the line "Sold-out glazes are marked sold out and cannot be ordered until a new batch is ready."

When no pieces are in stock to feature (F01.A01):
   1. Reads "No pieces are available right now. New small batches are on the way, please check back later."
   2. Can choose "Browse the shop", which goes to /shop.

## S02 Shop (/shop)
Browse and search all pieces with honest availability before opening one.
Roles: buyer · Frame: FR01 · Flows: F01, F02

1. Reads the title and understands this is the full shop listing.
2. Fills in Search pieces (FD18) and chooses a Category (FD05: Mug, Bowl, Planter, Vase), which shows only pieces matching the search words and category (F02.S02).
3. Sees each piece as a card with its photo (FD04), title (FD01), price (FD03), category (FD05) and how many are left across its variants or sold out.
4. Can open a piece by its title or its card, which goes to /shop/[pieceId] (F02.S03).

When the shop has no pieces to show (F01.A02, F02.A01):
   1. Reads "No pieces are available right now. Please check back later."
   2. Can choose "Back to the studio page", which goes to /.

When no pieces match the search words or category (F02.A02):
   1. Reads "Nothing matches your search."
   2. Can clear the search words (FD18) and category (FD05), which shows all pieces again.

## S03 The piece's title (FD01) (/shop/[pieceId])
See one piece in detail and choose an in-stock glaze, size and quantity to add to the cart.
Roles: buyer · Frame: FR01 · Flows: F02, F03, F04

1. Sees the piece's photos (FD04), title (FD01), description (FD02), price (FD03) and category (FD05).
2. Sees how many are left for each glaze-and-size variant, with sold-out variants marked sold out (F03.S01).
3. Chooses a Glaze (FD06), a Size (FD07: Small, Medium, Large) and a Quantity (FD09), and sees whether the chosen variant is in stock, how many are left, and the total for the chosen quantity (F03.S02).
4. Can choose "Add to cart", the main action, which adds the chosen variant and quantity to the cart kept in the browser, shows the updated cart count and total in the frame, and keeps the buyer on this page (F04.S01).
5. Can choose "Review cart", which goes to /cart.
6. Can choose "Back to the shop", which goes to /shop.

When the piece is no longer available (F02.A03, F03.A01):
   1. Reads "This piece is gone."
   2. Can choose "Back to the shop", which goes to /shop.

When the chosen glaze-and-size variant is sold out (F03.A02):
   1. Sees the chosen variant marked sold out and cannot add it to the cart.
   2. Can pick another glaze (FD06) or size (FD07).

When the quantity is empty, less than 1, or greater than the stock left (F03.A03):
   1. Sees the quantity (FD09) marked, keeps the chosen glaze and size, and reads that only up to the stock left can be ordered.

When the variant sold out or has less stock than the wanted quantity when adding to cart (F04.A01):
   1. Reads that the variant just sold out or only the stock left remains, sees current stock, and can pick another glaze, size or quantity.

## S04 Your cart (/cart)
Review cart lines, correct quantities within stock, remove lines, and proceed to checkout.
Roles: buyer · Frame: FR01 · Flows: F05

1. Sees each cart line as a row with the piece title, glaze, size, price and quantity (FD09), and sees the cart total (F05.S01).
2. Can change a line's Quantity (FD09), which checks the stock left for the variant, updates the line and shows the updated cart total with a confirmation toast (F05.S02).
3. Can remove a cart line, which removes it and shows the updated cart total (F05.S03).
4. Can choose "Proceed to checkout", the main action, which goes to /checkout (F05.S04).
5. Can choose "Continue browsing", which goes to /shop.

When the cart is empty (F05.A01):
   1. Reads "Your cart is empty."
   2. Can choose "Browse pieces", which goes to /shop.

When a quantity is empty, zero, not a number, or greater than the stock left (F05.A02):
   1. Sees the quantity (FD09) marked, keeps what was typed, reads how many are left for that glaze and size, and sees the previous cart unchanged.

When updating the cart fails (F05.A03):
   1. Keeps the entered quantity and can try updating the cart again.

When a cart variant has sold out or no longer has enough stock at checkout (F05.A04):
   1. Reads which glaze and size is no longer available in the wanted quantity and can adjust the cart before checkout.

## S05 Checkout (/checkout)
Place a guest order with contact details, fulfilment choice and an optional discount code, without paying online.
Roles: buyer · Frame: FR01 · Flows: F06

1. Sees the cart lines with piece title, glaze, size, price and quantity, the subtotal, and the shipping rule: courier is ₹99, free when the discounted subtotal is above ₹1,500, and studio pickup is free (F06.S01).
2. Sees the studio pickup address and pickup instructions when Studio pickup is chosen, and reads that no online payment is taken and the owner will collect payment by UPI later.
3. Fills in Name (FD10), Phone number (FD11) and Fulfilment choice (FD12: Studio pickup, Courier delivery).
4. Fills in Delivery address (FD13), City (FD14) and PIN code (FD15) when Courier delivery is chosen.
5. Fills in Discount code (FD16, optional), which applies one code per order and updates the discount, shipping and total shown.
6. Sees the discount, shipping and order total, each shown in rupees with no decimals.
7. Can choose "Place order", the main action, which checks the discount code and stock, reduces the stock of each ordered variant, creates the order, clears the cart, and goes to /orders/[orderReference] (F06.S02).
8. Can choose "Back to cart", which goes to /cart.

When the cart is empty (F06.A01):
   1. Reads "Your cart is empty."
   2. Can choose "Browse pieces", which goes to /shop.

When the name is empty, the phone is not a valid Indian phone number, no fulfilment choice is picked, or courier address, city or 6-digit PIN code is missing or wrong (F06.A02):
   1. Sees what is missing or wrong marked, keeps what was typed, and sees the cart unchanged.

When the discount code is invalid, expired or deactivated (F06.A04):
   1. Reads that the code is invalid, expired or deactivated, keeps the other entered values, and can correct the code or place the order without it.

When a cart variant has sold out or the wanted quantity is greater than the stock left (F06.A05):
   1. Reads which glaze and size is no longer available in the wanted quantity.
   2. Can choose "Return to cart", which goes to /cart and shows current stock for each line.

When placing the order fails (F06.A03):
   1. Keeps all entered values and can try placing the order again.

## S06 The order reference (FD17), as in "Order JSC-4821" (/orders/[orderReference])
Confirm a placed order and show everything the buyer needs to keep: reference, items, totals, fulfilment and the UPI-later note.
Roles: buyer · Frame: FR01 · Flows: F06, F07

1. Reads "Order placed" and that the owner will collect payment by UPI later; no online payment has been taken.
2. Sees the order reference (FD17), as in "Order JSC-4821", and reads to keep it with the phone number from checkout to look the order up again.
3. Sees each ordered piece with its title, glaze, size, quantity and price.
4. Sees the subtotal, discount and shipping, and the total including any discount and shipping, in rupees with no decimals.
5. Sees the fulfilment choice (FD12) with the studio pickup address and instructions for pickup, or the delivery address, city and PIN code for courier.
6. Can choose "Look up an order", which goes to /order-lookup.
7. Can choose "Continue browsing", which goes to /shop.

When the order is gone or the reference does not match:
   1. Reads "We could not find this order."
   2. Can choose "Look up an order", which goes to /order-lookup.
   3. Can choose "Browse the shop", which goes to /shop.

## S07 Look up an order (/order-lookup)
Find a placed order again using its reference and the phone number given at checkout.
Roles: buyer · Frame: FR01 · Flows: F07

1. Reads that a placed order can be found with its reference and the phone number from checkout.
2. Fills in Order reference (FD17) and Phone number (FD11).
3. Can choose "Find my order", the main action, which goes to /orders/[orderReference] showing the pieces, totals, fulfilment choice and the UPI-later note (F07.S02).
4. Can choose "Back to the shop", which goes to /shop.

When the order reference is empty or the phone number is empty or not valid (F07.A01):
   1. Sees what is missing or wrong marked and keeps what was typed.

When no order matches the reference and phone number (F07.A03):
   1. Reads "No order matches those values. Check the reference and phone number and try again." and keeps what was typed.

When looking up the order fails (F07.A02):
   1. Keeps the entered values and can try again.

## S08 Studio owner sign in (/sign-in)
Sign the shop owner in to manage the shop.
Roles: shopOwner · Frame: FR01 · Flows: F08, F09

1. Signs in with their email (FD23) and password (FD24), which goes to /dashboard.
2. Can choose "Create account", which goes to /sign-up (F08.S01).

When the email is not an address or a field is empty:
   1. Sees the empty or invalid field marked and keeps what was typed (F09.A01).

When the email and password match no owner account:
   1. Reads that the email or password is wrong, keeps the email, and can try again (F09.A03).

When signing in fails:
   1. Keeps the entered email and can try again (F09.A02).

## S09 Create the studio owner account (/sign-up)
Create the single shop-owner account.
Roles: shopOwner · Frame: FR01 · Flows: F08

1. Signs up with their email (FD23) and password (FD24), which creates the shop-owner account, signs them in, and goes to /dashboard.

When the email is not an address or the password is shorter than 8 characters:
   1. Sees the email or password field marked and keeps what was typed (F08.A01).

When an owner account already exists or the email already has an account (F08.A03):
   1. Reads that only one shop-owner account is allowed.
   2. Can choose "Sign in instead", which goes to /sign-in.

When creating the account fails:
   1. Keeps the entered values and can try again (F08.A02).

## S10 Home (/dashboard)
See new orders and pieces running low at a glance after signing in.
Roles: shopOwner · Frame: FR02 · Flows: F11

1. Sees the number of New orders, labelled "New orders".
2. Sees the number of variants with 3 or fewer left, labelled "Low stock variants", and the number with 0 left, labelled "Sold out variants".
3. Sees new orders in a table, each row with its order reference, buyer name, total, fulfilment choice and New status; can open an order by its reference or row, which goes to /dashboard/orders/[orderId].
4. Sees pieces needing attention in a table, each row with the piece title, glaze, size and stock left, marked "Low stock" at 3 or fewer and "Sold out" at 0; can open a piece, which goes to /dashboard/pieces/[pieceId].
5. Can choose "View all orders", which goes to /dashboard/orders.

When there are no orders and no pieces yet (F11.A01):
   1. Reads "No orders yet" and "No pieces yet".
   2. Can choose "Add a piece", which goes to /dashboard/pieces/new.
   3. Can choose "Open orders", which goes to /dashboard/orders.

When there are pieces but no new orders:
   1. Reads "No new orders. New orders will appear here." and still sees low-stock and sold-out warnings.

## S11 Pieces (/dashboard/pieces)
Find pieces and spot glazes and variants that are nearly gone so the next batch can be planned.
Roles: shopOwner · Frame: FR02 · Flows: F12

1. Can choose "Add a piece", the main action, which goes to /dashboard/pieces/new.
2. Fills in Search pieces (FD18) and chooses an Availability filter (FD26: All, In stock, Low stock, Sold out), which shows only matching pieces (F12.S02).
3. Sees each piece in a table row with its photo (FD04), title (FD01), category (FD05) and price (FD03), and each glaze-and-size variant with its stock quantity (FD08), marked "Low stock" at 3 or fewer left and "Sold out" at 0.
4. Can open a piece by its title or row, which goes to /dashboard/pieces/[pieceId] (F12.S03).

When no pieces exist yet (F12.A01):
   1. Reads "No pieces yet. Add the first piece to start your shop."
   2. Can choose "Add a piece", which goes to /dashboard/pieces/new; this is the only Add a piece action shown while the list is empty.

When no pieces match the search or filter (F12.A02):
   1. Reads "Nothing matches your search or filter."
   2. Can clear the search (FD18) and availability filter (FD26), which shows all pieces again.

## S12 Add a piece (/dashboard/pieces/new)
Add a new ceramic piece with photos, variants and stock.
Roles: shopOwner · Frame: FR02 · Flows: F13

1. Fills in the Piece form (FM01): Title (FD01), Description (FD02), Price (FD03), Photos (FD04) and Category (FD05: Mug, Bowl, Planter, Vase).
2. Fills in one or more variants, each with Glaze (FD06), Size (FD07: Small, Medium, Large) and Stock quantity (FD08), and can add another variant or remove a variant.
3. Can choose "Save piece", the main action, which saves the piece, shows a confirmation toast, and goes to /dashboard/pieces showing the new piece with its variants and stock (F13.S02).
4. Can choose "Cancel", which goes back to /dashboard/pieces and saves nothing (F13.A03).

When a required value is missing or wrong (F13.A01):
   1. Sees what is wrong marked, such as an empty title, a price below ₹1, a missing photo, a missing glaze or size, or a negative stock quantity, and keeps what was typed.

When saving fails (F13.A02):
   1. Keeps the values and can try saving again.

## S13 The piece's title (FD01) (/dashboard/pieces/[pieceId])
See one piece's details, variants and stock, then edit or remove it.
Roles: shopOwner · Frame: FR02 · Flows: F12, F14, F15

1. Sees the piece's photos (FD04), description (FD02), price (FD03) and category (FD05).
2. Sees each glaze-and-size variant with its stock quantity (FD08), marked "Low stock" at 3 or fewer left and "Sold out" at 0.
3. Can choose "Edit piece", the main action, which goes to /dashboard/pieces/[pieceId]/edit.
4. Can choose "Remove piece", which opens D01 (F15.S02).
5. Can choose "Back to pieces", which goes to /dashboard/pieces.

When the piece was removed in the meantime (F12.A03, F14.A01, F15.A01):
   1. Reads "This piece is gone."
   2. Can choose "Back to pieces", which goes to /dashboard/pieces.

## S14 Edit the piece's title (FD01), as in "Edit Speckled Chai Mug" (/dashboard/pieces/[pieceId]/edit)
Change a piece's details, variants or stock quantities.
Roles: shopOwner · Frame: FR02 · Flows: F14

1. Sees the Piece form (FM01) filled with the current Title (FD01), Description (FD02), Price (FD03), Photos (FD04) and Category (FD05).
2. Sees each variant's Glaze (FD06), Size (FD07) and Stock quantity (FD08), and can change them, add another variant or remove a variant.
3. Can choose "Save piece", the main action, which saves the changes, shows a confirmation toast, and goes to /dashboard/pieces/[pieceId] showing the updated piece with current stock (F14.S02).
4. Can choose "Cancel", which goes back to /dashboard/pieces/[pieceId] and changes nothing (F14.A04).

When the piece was removed in the meantime (F14.A01):
   1. Reads "This piece is gone."
   2. Can choose "Back to pieces", which goes to /dashboard/pieces.

When a required value is missing or wrong (F14.A02):
   1. Sees what is wrong marked, such as an empty title, a price below ₹1, a missing photo, a missing glaze or size, or a negative stock quantity, and keeps what was typed.

When saving the changes fails (F14.A03):
   1. Keeps the values and can try saving again.

## S15 Orders (/dashboard/orders)
Find orders by fulfilment status, newest first, with new orders clearly identifiable.
Roles: shopOwner · Frame: FR02 · Flows: F16

1. Chooses an Order status filter (FD25: All, New, Packed, Shipped, Picked Up, Cancelled), which shows only orders with the chosen status, newest first (F16.S02).
2. Sees each order in a table row with its order reference, buyer name, order date, total, payment status (Unpaid or Paid) and fulfilment status, with New orders clearly marked "New"; the list is sorted newest first and shows each order's date.
3. Can open an order by its reference or row, which goes to /dashboard/orders/[orderId] (F16.S03).

When there are no orders yet (F16.A01):
   1. Reads "No orders yet. New orders will appear here once buyers order from the shop."
   2. Can choose "View pieces", which goes to /dashboard/pieces.

When no orders have the chosen status (F16.A02):
   1. Reads "No orders have this status."
   2. Can choose another Order status filter (FD25).

## S16 The order reference (FD17), as in "Order JSC-4821" (/dashboard/orders/[orderId])
See an order's buyer, items, totals and destination, then record payment and advance or cancel fulfilment.
Roles: shopOwner · Frame: FR02 · Flows: F16, F17, F18, F19, F24

1. Sees the buyer name (FD10) and phone number (FD11), each ordered item with piece title, glaze, size, quantity and price, the discount code used (FD16) when one was applied, and the subtotal, discount, shipping and total in rupees with no decimals (F17.S01).
2. Sees the fulfilment choice (FD12) with the delivery address (FD13), city (FD14) and PIN code (FD15) for courier orders, or studio pickup for pickup orders.
3. Sees one payment status at a time, Unpaid or Paid, and one fulfilment status at a time: New, Packed, Shipped, Picked Up or Cancelled.
4. Can choose "Mark as paid", the main action when the order is Unpaid, which shows the order as Paid with the fulfilment state unchanged and a confirmation toast (F18.S01).
5. Can choose "Mark as packed" when the order is New, which moves it to Packed and shows a confirmation toast (F19.S01).
6. Can choose "Mark as shipped" when a Packed courier order is ready, which moves it to Shipped and shows a confirmation toast (F19.S01).
7. Can choose "Mark as picked up" when a Packed pickup order is handed over, which moves it to Picked Up and shows a confirmation toast (F19.S01).
8. Can choose "Cancel order" when the order is New or Packed, which opens D03 (F24.S01).
9. Can choose "Back to orders", which goes to /dashboard/orders.

When the order no longer exists (F16.A03, F17.A01):
   1. Reads "This order is gone."
   2. Can choose "Back to orders", which goes to /dashboard/orders.

When the order is already Paid (F18.A02):
   1. Reads that the order is already Paid and sees it unchanged.

When marking the order as paid fails (F18.A01):
   1. Keeps the order as Unpaid and can try again.

When the order is Shipped, Picked Up or Cancelled and cannot be advanced (F19.A02):
   1. Reads that only New or Packed orders can be moved, and sees the order unchanged.

When moving the order fails (F19.A01):
   1. Keeps the current fulfilment state and can try again.

When the order is Shipped, Picked Up or already Cancelled (F24.A03):
   1. Reads that only New or Packed orders can be cancelled, and sees the order unchanged; no Cancel order action is shown.

## S17 Discount codes (/dashboard/discount-codes)
Review all promotion codes and their active or deactivated state, newest first.
Roles: shopOwner · Frame: FR02 · Flows: F20, F21

1. Can choose "Create a discount code", the main action, which goes to /dashboard/discount-codes/new (F20.S01).
2. Sees each discount code in a table row, newest first, with its Code (FD19), Discount type (FD20), Discount value (FD21), Expiry date (FD22), creation date and one state at a time: Active or Deactivated; the list shows each code's creation date and expiry date.
3. Can open a discount code by its code or row, which goes to /dashboard/discount-codes/[discountCodeId].

When no discount codes exist yet (F21.A01):
   1. Reads "No discount codes yet. Create one for a promotion, such as a weekend Instagram offer."
   2. Can choose "Create a discount code", which goes to /dashboard/discount-codes/new; this is the only Create a discount code action shown while the list is empty.

## S18 Create a discount code (/dashboard/discount-codes/new)
Create a discount code with a percentage or fixed amount and an expiry date.
Roles: shopOwner · Frame: FR02 · Flows: F20

1. Fills in Code (FD19), Discount type (FD20: Percentage, Fixed amount), Discount value (FD21) and Expiry date (FD22).
2. Can choose "Save discount code", the main action, which saves the code as Active, shows a confirmation toast, and goes to /dashboard/discount-codes showing it in the list (F20.S02).
3. Can choose "Cancel", which goes back to /dashboard/discount-codes and saves nothing (F20.A04).

When the code is empty, the discount value is missing or less than 1, a percentage is greater than 100, or the expiry date is missing or in the past (F20.A01):
   1. Sees what is wrong marked: an empty code, a discount value missing or less than 1, a percentage greater than 100, or an expiry date missing or in the past, and keeps what was typed.

When the code text is already used by another discount code (F20.A03):
   1. Reads that the code already exists and keeps what was typed so it can be changed.

When saving the code fails (F20.A02):
   1. Keeps the entered values and can try saving again.

## S19 The discount code (FD19), as in "WEEKEND10" (/dashboard/discount-codes/[discountCodeId])
See one discount code's details and stop it from being used.
Roles: shopOwner · Frame: FR02 · Flows: F22

1. Sees the Code (FD19), Discount type (FD20), Discount value (FD21), Expiry date (FD22) and its state: Active or Deactivated (F22.S01).
2. Can choose "Deactivate code", the main action when the code is Active, which opens D02 (F22.S02).
3. Can choose "Back to discount codes", which goes to /dashboard/discount-codes.

When the discount code is no longer available (F22.A01):
   1. Reads "This code is gone."
   2. Can choose "Back to discount codes", which goes to /dashboard/discount-codes.

When the code is already deactivated:
   1. Sees the code as Deactivated and reads that it will be rejected at checkout; no Deactivate action is shown.

## S20 Account (/dashboard/account)
Manage the owner's own sign-in details.
Roles: shopOwner · Frame: FR02 · Flows: F23

1. Sees the owner's email (FD23) (F23.S01).
2. Can choose "Edit", which shows the editing controls.

When editing::
   1. Sees the owner's email (FD23).
   2. Fills in Password (FD24) with a new password of at least 8 characters.
   3. Can choose "Done", which saves the new password, shows a confirmation toast, and shows the account as it is now (F23.S02).

When editing and the new password is shorter than 8 characters (F23.A01):
   1. Sees the password field marked, the field cleared, and reads to enter a password of at least 8 characters.

When editing and saving the new password fails (F23.A02):
   1. Reads that saving failed, the account is unchanged, and can try again.

When the user is not signed in as the shop owner:
   1. Can choose "Sign in", which goes to /sign-in.

## D01 Remove this piece? (dialog)
Confirm removing a piece that will no longer be sold.
Opened from: S13 · Flows: F15

1. Reads that removing the piece removes it from the shop, while past orders keep their snapshot of it.
2. Can choose "Delete", which deletes the piece and goes back to /dashboard/pieces.
3. Can choose "Cancel", which closes the dialog and changes nothing.

When removing the piece fails:
   1. Reads that the piece could not be removed and can try again.

## D02 Deactivate this code? (dialog)
Confirm stopping a discount code from being used at checkout.
Opened from: S19 · Flows: F22

1. Reads the code and that buyers will no longer be able to use it at checkout.
2. Can choose "Deactivate", which deactivates the code and goes back to /dashboard/discount-codes.
3. Can choose "Cancel", which closes the dialog and changes nothing.

When deactivating the code fails (F22.A04):
   1. Reads that deactivating the code failed, and can try again.

## D03 Cancel this order? (dialog)
Confirm cancelling a New or Packed order and restoring its stock.
Opened from: S16 · Flows: F24

1. Reads the order reference and that cancelling restores the stock of each ordered variant so the pieces become orderable again.
2. Can choose "Cancel order", which cancels the order, restores its stock, and shows the Cancelled order on /dashboard/orders/[orderId].
3. Can choose "Keep order", which closes the dialog and changes nothing.

When cancelling the order fails (F24.A04):
   1. Reads that cancelling the order failed, the order is unchanged, and can try again.
