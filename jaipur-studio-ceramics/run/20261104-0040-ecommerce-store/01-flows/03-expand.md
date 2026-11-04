# Jaipur Studio Ceramics: user flows

## F01 Visit the shop landing page
Buyer · landing · Goal: Understand this is the studio's own shop and start browsing in-stock pieces.
Starts: On the public web address without being signed in
Before: Not signed in.

1. The visitor opens the public shop address. The website shows this is the Jaipur studio's own ceramics shop, that ordering needs no account or messaging, and featured in-stock pieces with photos, price and how many are left or sold out, with choices to browse the full shop and to open a piece.
   Changes: lists Piece.
2. The visitor chooses to browse the full shop. The website shows the shop listing with all pieces, photos, prices and honest availability.
   Changes: lists Piece.

Other paths
- F01.A01 (from 1, empty) No pieces are in stock to feature:
  1. (system) The website shows the studio introduction and ordering without messaging, says no pieces are available right now, and keeps the choice to browse the full shop and check back later.
  Back to 2.
- F01.A02 (from 2, empty) The shop listing has no pieces to show:
  1. (system) The website shows an empty shop listing saying no pieces are available right now, with a choice to return to the landing page and check back later.
  Flow ends.
- F01.A03 (from 1, other) The visitor chooses to open a featured piece instead of browsing the full shop:
  1. The visitor chooses a featured piece to open. The website shows that piece with its photos, price, description and glaze, size and availability choices.
  Flow ends.

Outcome: The visitor knows how to browse and order; nothing is stored and a refresh shows the same page.

## F02 Browse pieces
Buyer · browse Piece · Goal: Find an available mug, bowl, planter or vase in the catalog.
Starts: On the landing page or shop listing
Before: Not signed in.

1. The buyer chooses to browse the shop. The website shows the shop listing with each Piece's photos, price, category and how many are left or sold out.
   Changes: lists Piece.
2. The buyer types search words and picks a category to narrow the listing.
   - Search pieces (optional, up to 100 characters), e.g. ""mug""
   - Category (required, one of: Mug, Bowl, Planter, Vase), e.g. ""Mug""
   The website shows only the Pieces that match the search words and category.
   Changes: lists Piece.
3. The buyer chooses a Piece to view. The website shows the Piece page with its details and glaze, size and quantity choices.
   Changes: reads Piece.

Other paths
- F02.A01 (from 1, empty) No Pieces are available to show:
  1. (system) The website says the shop has no pieces right now and invites the buyer to check back later.
  Flow ends.
- F02.A02 (from 2, empty) No Pieces match the search words or the chosen category:
  1. (system) The website says nothing matches and offers to clear the search words and category to see all Pieces again.
  Back to 2.
- F02.A03 (from 3, notFound) The chosen Piece is no longer available:
  1. (system) The website says the piece is gone and shows the shop listing again.
  Flow ends.

Outcome: The buyer has found pieces that are actually available; a refresh shows the same listing with current stock.

## F03 View a piece and choose options
Buyer · view Piece · Goal: See a piece's details and choose a glaze, size and quantity that is in stock.
Starts: On the shop listing
Before: Not signed in.; At least one Piece exists.

1. The buyer opens a Piece from the shop listing. The website shows the Piece's photos, title, description, price and how many are left for each glaze-and-size variant, marking sold-out variants as sold out.
   Changes: reads Piece.
2. The buyer picks a glaze, a size and a quantity.
   - Glaze (required, up to 80 characters), e.g. ""Sage Green""
   - Size (required, one of: Small, Medium, Large), e.g. ""Medium""
   - Quantity (required, at least 1), e.g. ""2""
   The website shows whether the chosen glaze-and-size variant is in stock, how many are left, and the total for the chosen quantity, and allows ordering only when the variant is in stock and the quantity is within the stock left.

Other paths
- F03.A01 (from 1, notFound) The Piece is no longer available:
  1. (system) The website says the piece is gone and shows the shop listing again.
  Flow ends.
- F03.A02 (from 2, other) The chosen glaze-and-size variant is sold out:
  1. (system) The website shows the variant as sold out and does not allow it to be ordered, and invites the buyer to pick another glaze or size.
  Back to 2.
- F03.A03 (from 2, invalid) The quantity is empty, less than 1, or greater than the stock left for the chosen variant:
  1. (system) The website marks the quantity, keeps the chosen glaze and size, and explains only up to the stock left can be ordered.
  Back to 2.

Outcome: The buyer has seen the piece and a valid in-stock variant choice; nothing is saved yet and a refresh shows the same piece with current stock.

## F04 Add piece to cart
Buyer · act Piece · Goal: Put a chosen in-stock variant in the cart.
Starts: On a Piece page with a glaze, size and quantity chosen
Before: Not signed in.; Chosen variant has stock left.

1. The buyer chooses to add the chosen glaze, size and quantity to the cart. The website adds the variant and quantity to the cart kept in the browser and shows the updated cart count and total, and the buyer can continue browsing Pieces or go to review the cart.
   Changes: reads Piece.

Other paths
- F04.A01 (from 1, other) The variant has no stock left or has less stock left than the wanted quantity:
  1. (system) The website says the variant just sold out or only the stock left remains, keeps the Piece page with current stock, and invites the buyer to pick another glaze, size or quantity.
  Flow ends.

Outcome: The cart holds the chosen variant and quantity; after a refresh the cart is still there.

## F05 Review cart and update quantities
Buyer · edit Order · Goal: Review the cart and correct quantities before ordering.
Starts: On any shop page with items in the cart
Before: Not signed in.; Cart has at least one item.

1. The buyer opens the cart. The website shows each cart line with piece title, glaze, size, price and quantity, and the cart total.
   Changes: lists Piece.
2. The buyer changes the quantity of a cart line.
   - Quantity (required, at least 1), e.g. ""2""
   The website checks the stock left for the variant, updates the line quantity and shows the updated cart total.
3. The buyer removes a cart line. The website removes the line and shows the updated cart total.
4. The buyer chooses to proceed to checkout. The website shows the checkout with the cart summary and fields for name, phone, fulfilment choice, address and discount code.

Other paths
- F05.A01 (from 1, empty) The cart is empty:
  1. (system) The website shows that the cart is empty and offers to browse pieces.
  Flow ends.
- F05.A02 (from 2, invalid) The quantity is empty, zero, not a number, or greater than the stock left for the variant:
  1. (system) The website marks the quantity, keeps what was typed, explains how many are left for that glaze and size, and keeps the previous cart unchanged.
  Back to 2.
- F05.A03 (from 2, failure) Updating the cart fails:
  1. (system) The website keeps the entered quantity and offers to try again.
  Back to 2.
- F05.A04 (from 4, other) A cart variant has sold out or no longer has enough stock:
  1. (system) The website says which glaze and size is no longer available in the wanted quantity and asks the buyer to adjust the cart.
  Back to 1.

Outcome: The cart reflects the wanted quantities; after a refresh the same cart is shown.

## F06 Place an order as guest
Buyer · create Order · Goal: Place an order as a guest without paying online.
Starts: On the cart review
Before: Not signed in.; Cart has at least one in-stock item.

1. The buyer chooses to check out from the cart review. The website shows the checkout with cart lines, subtotal, discount field, fields for name, phone, fulfilment choice and, for courier, delivery address, city and PIN code, the shipping rule of Rs 99 courier and free above Rs 1500 discounted subtotal and free pickup, and the studio pickup address and instructions.
   Changes: lists Piece.
2. The buyer fills in name, phone, fulfilment choice, address when courier is chosen and optional discount code, and submits the order.
   - Name (required, up to 120 characters), e.g. ""Meera Sharma""
   - Phone number (required), e.g. ""9829012345""
   - Fulfilment choice (required, one of: Studio pickup, Courier delivery), e.g. ""Courier delivery""
   - Delivery address (optional, up to 500 characters), e.g. ""14 Rose Lane, Malviya Nagar""
   - City (optional, up to 120 characters), e.g. ""Jaipur""
   - PIN code (optional, 6 to 6 characters), e.g. ""302017""
   - Discount code (optional, up to 30 characters), e.g. ""WEEKEND10""
   The website checks the discount code and stock, reduces the stock of each ordered variant, creates the order with an order reference, clears the cart, and shows the confirmation with reference, pieces with glaze, size and quantities, totals including discount and shipping, fulfilment choice with pickup instructions or delivery address, and the note that the owner will collect payment by UPI later.
   Changes: creates Order, updates Piece, reads DiscountCode.

Other paths
- F06.A01 (from 1, empty) The cart is empty:
  1. (system) The website shows that the cart is empty and offers to browse pieces.
  Flow ends.
- F06.A02 (from 2, invalid) The name is empty, the phone number is not a valid Indian phone number, no fulfilment choice is picked, or for courier delivery the delivery address, city or 6-digit PIN code is missing or wrong:
  1. (system) The website marks what is missing or wrong, keeps what was typed, and keeps the cart unchanged.
  Back to 2.
- F06.A03 (from 2, failure) Placing the order fails:
  1. (system) The website keeps all entered values and offers to try again.
  Back to 2.
- F06.A04 (from 2, other) The discount code is invalid, expired or deactivated:
  1. (system) The website rejects the code with a message, keeps the other entered values, and allows the buyer to correct the code or place the order without it.
  Back to 2.
- F06.A05 (from 2, other) A cart variant has sold out or the wanted quantity is greater than the stock left:
  1. (system) The website says which glaze and size is no longer available in the wanted quantity and asks the buyer to adjust the cart.
  2. The buyer returns to the cart. The website shows the cart with current stock for each line.
  Flow ends.

Outcome: An Order is created with stock reduced; after a refresh the confirmation with reference and totals is still retrievable.

## F07 Look up an order
Buyer · view Order · Goal: Find a placed order again with reference and phone number.
Starts: On the shop pages with an order reference
Before: Not signed in.; An Order was placed.

1. The buyer opens order lookup. The website shows the order lookup with fields for order reference and phone number.
2. The buyer enters the order reference and phone number and submits them.
   - Order reference (required, up to 20 characters), e.g. ""JSC-4821""
   - Phone number (required), e.g. ""9829012345""
   The website shows the order with pieces, glaze, size and quantities, totals with discount and shipping, fulfilment choice with studio pickup instructions or delivery address, and the note that the owner will collect payment by UPI later.
   Changes: reads Order.

Other paths
- F07.A01 (from 2, invalid) The order reference is empty or the phone number is empty or not a valid phone number:
  1. (system) The website marks what is missing or wrong and keeps what was typed.
  Back to 2.
- F07.A02 (from 2, failure) Looking up the order fails:
  1. (system) The website keeps the entered values and offers to try again.
  Back to 2.
- F07.A03 (from 2, notFound) No order matches the entered reference and phone number:
  1. (system) The website says no order matches those values and offers to check the values and try again.
  Back to 2.

Outcome: The buyer has seen the order details; a refresh shows the same order.

## F08 Owner sign up
Shop Owner · auth · Goal: Create the shop-owner account.
Starts: On the owner sign-in page while not signed in
Before: Not signed in.

1. The owner chooses to sign up. The website shows the owner sign-up form.
2. The owner fills in the form and submits it. (Owner auth form)
   - Email (required, up to 254 characters), e.g. ""owner@jaipurceramics.in""
   - Password (required, 8 to 128 characters), e.g. ""correct-horse-battery""
   The website creates the single shop-owner account, signs the owner in and shows the home dashboard with new orders and low-stock warnings.

Other paths
- F08.A01 (from 2, invalid) The email is not an address or the password is shorter than 8 characters:
  1. (system) The website marks the email or password field and keeps what was typed.
  Back to 2.
- F08.A02 (from 2, failure) Creating the account fails:
  1. (system) The website keeps the entered values and offers to try again.
  Back to 2.
- F08.A03 (from 2, conflict) An owner account already exists or the email already has an account:
  1. (system) The website says only one shop-owner account is allowed and offers to sign in instead.
  2. The owner chooses to sign in. The website shows the owner sign-in form.
  Flow ends.

Outcome: The owner account exists and the owner is signed in; after a refresh they stay signed in.

## F09 Owner sign in
Shop Owner · auth · Goal: Sign in to manage the shop.
Starts: On the owner sign-in page while not signed in
Before: Not signed in.; Owner account exists.

1. The owner chooses to sign in. The website shows the owner sign-in form.
2. The owner fills in the form and submits it. (Owner auth form)
   - Email (required, up to 254 characters), e.g. ""owner@jaipurceramics.in""
   - Password (required, 8 to 128 characters), e.g. ""correct-horse-battery""
   The website signs the owner in and shows the home dashboard with new orders and low-stock warnings.

Other paths
- F09.A01 (from 2, invalid) The email is not an address or a field is empty:
  1. (system) The website marks the field and keeps what was typed.
  Back to 2.
- F09.A02 (from 2, failure) Signing in fails:
  1. (system) The website keeps the entered email and offers to try again.
  Back to 2.
- F09.A03 (from 2, denied) The email and password match no owner account:
  1. (system) The website says the email or password is wrong, keeps the email and offers to try again.
  Back to 2.

Outcome: The owner is signed in; after a refresh they are still signed in on the dashboard.

## F10 Owner sign out
Shop Owner · auth · Goal: End the owner session.
Starts: On any owner page while signed in
Before: Signed in as shop owner.

1. The owner chooses to sign out. The website ends the session and shows the public shop landing page.

Outcome: The owner is signed out; after a refresh they stay signed out.

## F11 Owner home dashboard
Shop Owner · home · Goal: See new orders and pieces running low at a glance.
Starts: After signing in
Before: Signed in as shop owner.

1. The owner opens the home dashboard. The website shows new orders clearly identifiable with counts and totals, and pieces whose variants have 3 or fewer left marked low-stock and 0 marked sold out, with options to open an order and to open a piece to edit stock.
   Changes: lists Order, lists Piece.

Other paths
- F11.A01 (from 1, empty) There are no orders and no pieces yet:
  1. (system) The website says there are no orders yet and no pieces yet, and offers to add a piece and to open the order list.
  Flow ends.

Outcome: The owner has seen what needs packing and what needs making; a refresh shows current orders and stock.

## F12 Browse pieces with stock
Shop Owner · browse Piece · Goal: Find pieces and spot glazes and variants that are nearly gone.
Starts: On the owner dashboard
Before: Signed in as shop owner.

1. The owner chooses to open the piece list. The website shows all pieces with title, price, photos and per-variant stock with low-stock and sold-out marks.
   Changes: lists Piece.
2. The owner enters search words and chooses an availability filter.
   - Search pieces (optional, up to 100 characters), e.g. ""mug""
   - Availability filter (optional, one of: All, In stock, Low stock, Sold out), e.g. ""Low stock""
   The website shows only the pieces that match the search and filter.
   Changes: lists Piece.
3. The owner opens a piece from the list. The website shows the piece's details with all glaze-and-size variants and stock quantities.
   Changes: reads Piece.

Other paths
- F12.A01 (from 1, empty) No pieces exist yet:
  1. (system) The website says no pieces exist yet and offers to add a piece.
  Flow ends.
- F12.A02 (from 2, empty) No pieces match the search or filter:
  1. (system) The website says nothing matches and offers to clear the search and filter.
  Back to 2.
- F12.A03 (from 3, notFound) The piece was removed in the meantime:
  1. (system) The website says the piece is gone and shows the piece list again.
  Flow ends.

Outcome: The owner has found the wanted pieces and stock states; a refresh shows the same current list.

## F13 Add a piece
Shop Owner · create Piece · Goal: Add a new ceramic piece with variants and stock.
Starts: On the owner piece list
Before: Signed in as shop owner.

1. The owner chooses to add a piece. The website shows an empty piece form with fields for details, variants and stock.
2. The owner fills in the piece details, adds one or more glaze-and-size variants with stock quantities, and saves the piece. (Piece form)
   - Title (required, up to 120 characters), e.g. ""Speckled Chai Mug""
   - Description (optional, up to 2000 characters), e.g. ""Wheel-thrown stoneware mug with speckled glaze, 300ml.""
   - Price (required, at least 1), e.g. ""650""
   - Photos (required), e.g. ""https://shop.example/photos/mug-sage-1.jpg""
   - Category (required, one of: Mug, Bowl, Planter, Vase), e.g. ""Mug""
   - Glaze (required, up to 80 characters), e.g. ""Sage Green""
   - Size (required, one of: Small, Medium, Large), e.g. ""Medium""
   - Stock quantity (required, at least 0), e.g. ""12""
   The website saves the piece and shows it in the piece list with its variants and stock.
   Changes: creates Piece.

Other paths
- F13.A01 (from 2, invalid) A required value is missing or wrong, such as an empty title, a price below ₹1, a missing photo, a missing glaze or size, or a negative stock quantity:
  1. (system) The website marks what is wrong and keeps what was typed.
  Back to 2.
- F13.A02 (from 2, failure) Saving fails:
  1. (system) The website keeps the values and offers to try again.
  Back to 2.
- F13.A03 (from 1, cancel) The owner cancels:
  1. (system) Nothing is saved; the website shows the piece list as it was.
  Flow ends.

Outcome: The new Piece is saved and visible to buyers when in stock; after a refresh it is still there.

## F14 Edit a piece and its stock
Shop Owner · edit Piece · Goal: Change a piece's details, variants or stock.
Starts: On the owner piece list
Before: Signed in as shop owner.; At least one Piece exists.

1. The owner opens a piece from the piece list. The website shows the piece's current details, variants and stock for editing.
   Changes: reads Piece.
2. The owner changes the details, variants or stock quantities and saves the changes. (Piece form)
   - Title (required, up to 120 characters), e.g. ""Speckled Chai Mug""
   - Description (optional, up to 2000 characters), e.g. ""Wheel-thrown stoneware mug with speckled glaze, 300ml.""
   - Price (required, at least 1), e.g. ""650""
   - Photos (required), e.g. ""https://shop.example/photos/mug-sage-1.jpg""
   - Category (required, one of: Mug, Bowl, Planter, Vase), e.g. ""Mug""
   - Glaze (required, up to 80 characters), e.g. ""Sage Green""
   - Size (required, one of: Small, Medium, Large), e.g. ""Medium""
   - Stock quantity (required, at least 0), e.g. ""12""
   The website saves the changes and shows the updated piece with current stock.
   Changes: updates Piece.

Other paths
- F14.A01 (from 1, notFound) The piece was removed in the meantime:
  1. (system) The website says the piece is gone and shows the piece list again.
  Flow ends.
- F14.A02 (from 2, invalid) A required value is missing or wrong, such as an empty title, a price below ₹1, a missing photo, a missing glaze or size, or a negative stock quantity:
  1. (system) The website marks what is wrong and keeps what was typed.
  Back to 2.
- F14.A03 (from 2, failure) Saving the changes fails:
  1. (system) The website keeps the values and offers to try again.
  Back to 2.
- F14.A04 (from 2, cancel) The owner cancels without saving:
  1. (system) Nothing is changed; the website shows the piece again as it was.
  Flow ends.

Outcome: The Piece changes are saved; after a refresh the updated piece and stock remain.

## F15 Remove a piece
Shop Owner · delete Piece · Goal: Remove a piece that will no longer be sold.
Starts: On the owner piece list
Before: Signed in as shop owner.; At least one Piece exists.

1. The owner opens a piece from the piece list. The website shows the piece's details, variants and stock.
   Changes: reads Piece.
2. The owner chooses to remove the piece. The website asks the owner to confirm removing the piece.
   Changes: deletes Piece.

Other paths
- F15.A01 (from 1, notFound) The piece was removed in the meantime:
  1. (system) The website says the piece is gone and shows the piece list again.
  Flow ends.
- F15.A02 (from 2, confirm) The owner confirms the removal:
  1. (system) The website removes the piece and shows the piece list without it; past orders keep their snapshot of it.
  Flow ends.
- F15.A03 (from 2, cancel) The owner cancels:
  1. (system) The website shows the piece again, unchanged.
  Flow ends.

Outcome: The Piece is gone from the shop and stays gone after a refresh; past Orders are unchanged.

## F16 Browse orders by status
Shop Owner · browse Order · Goal: Find orders by status, newest first.
Starts: On the owner dashboard
Before: Signed in as shop owner.

1. The owner chooses to view orders. The website shows orders newest first with New orders clearly identifiable, each with reference, buyer name, totals and fulfilment state.
   Changes: lists Order.
2. The owner chooses an order status filter.
   - Order status filter (optional, one of: All, New, Packed, Shipped, Picked Up, Cancelled), e.g. ""New""
   The website shows only orders with the chosen status, newest first.
   Changes: lists Order.
3. The owner opens an order from the list. The website shows the order's buyer, items, totals and fulfilment choice.
   Changes: reads Order.

Other paths
- F16.A01 (from 1, empty) There are no orders yet:
  1. (system) The website says there are no orders yet and explains that new orders will appear here once buyers order from the shop.
  Flow ends.
- F16.A02 (from 2, empty) No orders have the chosen status:
  1. (system) The website says no orders have this status and offers to choose another status.
  Back to 2.
- F16.A03 (from 3, notFound) The opened order is gone:
  1. (system) The website says the order is gone and shows the order list.
  Flow ends.

Outcome: The owner has found the wanted orders; a refresh shows the same current list.

## F17 View an order
Shop Owner · view Order · Goal: See an order's buyer, items, totals and where to send it.
Starts: On the owner order list
Before: Signed in as shop owner.; At least one Order exists.

1. The owner opens an order from the order list. The website shows the order reference, buyer name and phone number, items with glaze, size, quantity and price, discount code and totals with shipping, fulfilment choice with delivery address, city and PIN code or studio pickup, and payment and fulfilment states.
   Changes: reads Order.

Other paths
- F17.A01 (from 1, notFound) The order no longer exists:
  1. (system) The website says the order is gone and shows the order list.
  Flow ends.

Outcome: The owner has seen the full order; a refresh shows the same current order.

## F18 Mark order as paid
Shop Owner · act Order · Goal: Record that UPI payment was collected for an order.
Starts: On an Order page
Before: Signed in as shop owner.; Order is Unpaid.

1. The owner chooses to mark the order as paid after collecting by UPI outside the app. The website shows the order as Paid with the fulfilment state unchanged.
   Changes: updates Order.

Other paths
- F18.A01 (from 1, failure) Marking the order as paid fails:
  1. (system) The website keeps the order as Unpaid and offers to try again.
  Back to 1.
- F18.A02 (from 1, other) The order is already Paid:
  1. (system) The website says the order is already Paid and shows it unchanged.
  Flow ends.

Outcome: The Order is Paid and stays Paid after a refresh.

## F19 Advance order fulfilment
Shop Owner · act Order · Goal: Pack, ship or hand over orders.
Starts: On an Order page
Before: Signed in as shop owner.; Order is New or Packed.

1. The owner chooses to move the order to its next fulfilment state. The website moves a New order to Packed, moves a Packed courier order to Shipped and a Packed pickup order to Picked Up, and shows the new fulfilment state.
   Changes: updates Order.

Other paths
- F19.A01 (from 1, failure) Moving the order fails:
  1. (system) The website keeps the current fulfilment state and offers to try again.
  Back to 1.
- F19.A02 (from 1, denied) The order is Shipped, Picked Up or Cancelled:
  1. (system) The website says only New or Packed orders can be moved and shows the order unchanged.
  Flow ends.

Outcome: The Order's fulfilment state is advanced; after a refresh the new state remains.

## F20 Create a discount code
Shop Owner · create DiscountCode · Goal: Create a discount code with an amount and end date.
Starts: On the owner discount list
Before: Signed in as shop owner.

1. The owner chooses to create a discount code. The website shows an empty discount code form.
2. The owner fills in the code, discount type, discount value and expiry date and saves it.
   - Code (required, up to 30 characters), e.g. ""WEEKEND10""
   - Discount type (required, one of: Percentage, Fixed amount), e.g. ""Percentage""
   - Discount value (required, at least 1), e.g. ""10""
   - Expiry date (required), e.g. ""2026-12-31""
   The website saves the code as active and shows it in the discount list.
   Changes: creates DiscountCode.

Other paths
- F20.A01 (from 2, invalid) The code is empty, the discount value is missing or less than 1, a percentage value is greater than 100, or the expiry date is missing or in the past:
  1. (system) The website marks what is wrong and keeps what was typed.
  Back to 2.
- F20.A02 (from 2, failure) Saving the code fails:
  1. (system) The website keeps the entered values and offers to try again.
  Back to 2.
- F20.A03 (from 2, conflict) The code text is already used by another discount code:
  1. (system) The website says the code already exists and keeps what was typed so it can be changed.
  Back to 2.
- F20.A04 (from 2, cancel) The owner cancels without saving:
  1. (system) Nothing is saved; the website shows the discount list as it was.
  Flow ends.

Outcome: The DiscountCode is active and usable; after a refresh it is still listed.

## F21 Browse discount codes
Shop Owner · browse DiscountCode · Goal: Review promotion codes and their state.
Starts: On the owner dashboard
Before: Signed in as shop owner.

1. The owner opens the discount codes. The website shows all discount codes newest first, each with its code, discount type, discount value, expiry date and active or deactivated state.
   Changes: lists DiscountCode.

Other paths
- F21.A01 (from 1, empty) No discount codes exist yet:
  1. (system) The website says no discount codes exist yet and offers to create one.
  Flow ends.

Outcome: The owner has seen all codes and states; a refresh shows the same current list.

## F22 Deactivate a discount code
Shop Owner · act DiscountCode · Goal: Stop a promotion code from being used.
Starts: On the owner discount list
Before: Signed in as shop owner.; At least one active DiscountCode exists.

1. The owner opens an active discount code from the list. The website shows the code with its discount type, discount value, expiry date and active state.
   Changes: reads DiscountCode.
2. The owner chooses to deactivate the code. The website asks the owner to confirm deactivating the code.
   Changes: updates DiscountCode.

Other paths
- F22.A01 (from 1, notFound) The discount code is no longer available:
  1. (system) The website says the code is gone and shows the discount list.
  Flow ends.
- F22.A02 (from 2, confirm) The owner confirms the deactivation:
  1. (system) The website shows the code as deactivated in the discount list; the code will be rejected at checkout.
  Flow ends.
- F22.A03 (from 2, cancel) The owner cancels the deactivation:
  1. (system) Nothing changes; the website shows the code again still active.
  Flow ends.
- F22.A04 (from 2, failure) Deactivating the code fails:
  1. (system) The website keeps the code active and offers to try again.
  Back to 2.

Outcome: The code is deactivated and stays deactivated after a refresh.

## F23 Manage owner account
Shop Owner · account · Goal: Manage the owner's own sign-in details.
Starts: On any owner page while signed in
Before: Signed in as shop owner.

1. The owner opens their account. The website shows the owner's email and a field to enter a new password.
2. The owner enters a new password and saves it.
   - Password (required, 8 to 128 characters), e.g. ""correct-horse-battery""
   The website saves the new password and shows the account again with a confirmation.

Other paths
- F23.A01 (from 2, invalid) The new password is shorter than 8 characters:
  1. (system) The website marks the password field, clears it and asks to enter a password of at least 8 characters.
  Back to 2.
- F23.A02 (from 2, failure) Saving the new password fails:
  1. (system) The website keeps the account unchanged and offers to try again.
  Back to 2.

Outcome: Account changes are saved; after a refresh they remain and sign-in uses them.

## F24 Cancel an order and restore stock
Shop Owner · act Order · Goal: Cancel a New or Packed order and return its stock to sale.
Starts: On an Order page
Before: Signed in as shop owner.; Order is New or Packed.

1. The owner chooses to cancel the order. The website asks the owner to confirm cancelling the order and restoring its stock to sale.
   Changes: updates Order, updates Piece.

Other paths
- F24.A01 (from 1, confirm) The owner confirms the cancellation:
  1. (system) The website marks the order Cancelled, restores the stock of each ordered variant so the pieces become orderable again, and shows the Cancelled order.
  Flow ends.
- F24.A02 (from 1, cancel) The owner does not confirm:
  1. (system) Nothing changes; the website shows the order unchanged.
  Flow ends.
- F24.A03 (from 1, denied) The order is Shipped, Picked Up or already Cancelled:
  1. (system) The website says only New or Packed orders can be cancelled and shows the order unchanged.
  Flow ends.
- F24.A04 (from 1, failure) Cancelling the order fails:
  1. (system) The website keeps the order unchanged and offers to try again.
  Back to 1.

Outcome: The Order is Cancelled with stock restored; after a refresh it stays Cancelled and the stock remains restored.

## Fields

### Piece
- FD01 Title (required, up to 120 characters), e.g. ""Speckled Chai Mug"". How the piece is named in the shop
- FD02 Description (optional, up to 2000 characters), e.g. ""Wheel-thrown stoneware mug with speckled glaze, 300ml."". What the piece is, how it is made and how it looks
- FD03 Price (required, at least 1), e.g. ""650"". How much one unit of the piece costs in rupees
- FD04 Photos (required), e.g. ""https://shop.example/photos/mug-sage-1.jpg"". Pictures of the piece so buyers can see glaze and form
- FD05 Category (required, one of: Mug, Bowl, Planter, Vase), e.g. ""Mug"". Which kind of ceramics the piece is
- FD06 Glaze (required, up to 80 characters), e.g. ""Sage Green"". The glaze colour option of this variant
- FD07 Size (required, one of: Small, Medium, Large), e.g. ""Medium"". The size option of this variant
- FD08 Stock quantity (required, at least 0), e.g. ""12"". How many units are left for this glaze-and-size variant; 0 means sold out

### Order
- FD09 Quantity (required, at least 1), e.g. ""2"". How many units of the chosen variant the buyer wants, no more than stock left
- FD10 Name (required, up to 120 characters), e.g. ""Meera Sharma"". Who placed the order and who collects or receives it
- FD11 Phone number (required), e.g. ""9829012345"". How the owner contacts the buyer and how the buyer looks up the order
- FD12 Fulfilment choice (required, one of: Studio pickup, Courier delivery), e.g. ""Courier delivery"". Whether the buyer picks up at the Jaipur studio or gets a courier
- FD13 Delivery address (optional, up to 500 characters), e.g. ""14 Rose Lane, Malviya Nagar"". Street address for courier delivery, required only for courier
- FD14 City (optional, up to 120 characters), e.g. ""Jaipur"". City for courier delivery, required only for courier
- FD15 PIN code (optional, 6 to 6 characters), e.g. ""302017"". Postal code for courier delivery, required only for courier
- FD16 Discount code (optional, up to 30 characters), e.g. ""WEEKEND10"". Promotional code typed at checkout for one discount per order
- FD17 Order reference (required, up to 20 characters), e.g. ""JSC-4821"". Reference shown at confirmation used with phone number to find the order again

### DiscountCode
- FD19 Code (required, up to 30 characters), e.g. ""WEEKEND10"". The text buyers type at checkout to get the promotion
- FD20 Discount type (required, one of: Percentage, Fixed amount), e.g. ""Percentage"". Whether the code takes a percent or a fixed rupee amount off the subtotal
- FD21 Discount value (required, at least 1), e.g. ""10"". How much the code takes off: percent when type is Percentage, rupees when Fixed amount
- FD22 Expiry date (required), e.g. ""2026-12-31"". Last date the code can be used

### Kept by no record
- FD18 Search pieces (optional, up to 100 characters), e.g. ""mug"". Words to find pieces by name or glaze
- FD23 Email (required, up to 254 characters), e.g. ""owner@jaipurceramics.in"". How the shop owner signs in
- FD24 Password (required, 8 to 128 characters), e.g. ""correct-horse-battery"". Secret that protects the owner account
- FD25 Order status filter (optional, one of: All, New, Packed, Shipped, Picked Up, Cancelled), e.g. ""New"". Which fulfilment states to show in the order list
- FD26 Availability filter (optional, one of: All, In stock, Low stock, Sold out), e.g. ""Low stock"". Which stock states to show in the piece list

## Forms
- FM01 Piece form: FD01, FD02, FD03, FD04, FD05, FD06, FD07, FD08
- FM02 Owner auth form: FD23, FD24

## New assumptions
- A10 (behavior): The cart is kept in the buyer's browser and is cleared after the Order is placed. Stock is checked again at checkout, so a variant that sold out while in the cart cannot be ordered.
- A11 (data): Deleting a Piece does not delete past Orders that contain it. Orders keep a snapshot of piece name, glaze, size, quantity and price for the owner's records.
- A12 (permission): There is a single shop-owner account. Buyers never sign in and owners never place Orders.
