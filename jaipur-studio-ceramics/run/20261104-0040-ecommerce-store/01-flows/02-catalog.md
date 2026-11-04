# Jaipur Studio Ceramics: flows catalog

## Flows
- F01 Visit the shop landing page (Buyer, landing, starts On the public web address without being signed in): The visitor arrives on the public shop page, reads what the Jaipur studio sells and that ordering needs no account or messaging, sees featured in-stock Pieces with photos (FD04), price (FD03) and honest availability, and chooses to browse the full shop or open a piece. No fields are asked.
- F02 Browse pieces (Buyer, browse Piece, starts On the landing page or shop listing): The buyer opens the shop listing from the landing page, sees all Pieces with photos (FD04), price (FD03), category (FD05) and how many are left or sold out, narrows the list with search (FD18) and category (FD05), and chooses a piece to view. No fields are saved.
- F03 View a piece and choose options (Buyer, view Piece, starts On the shop listing): The buyer opens one Piece from the listing, sees its photos (FD04), title (FD01), description (FD02), price (FD03) and per-variant availability, then picks a glaze (FD06), a size (FD07) and a quantity (FD09) no greater than the stock left (FD08); a sold-out variant is shown as sold out and cannot be picked for ordering.
- F04 Add piece to cart (Buyer, act Piece, starts On a Piece page with a glaze, size and quantity chosen): The buyer, having chosen a glaze (FD06), size (FD07) and quantity (FD09) within stock (FD08) on a Piece page, chooses to add it to the cart; the website keeps the cart in the browser and shows the cart count and total update, and the buyer continues browsing or goes to review the cart.
- F05 Review cart and update quantities (Buyer, edit Order, starts On any shop page with items in the cart): The buyer opens the cart, sees each line with piece, glaze (FD06), size (FD07), price (FD03) and quantity (FD09) with the total updating, changes a quantity (FD09) within stock (FD08) or removes a line, and proceeds to checkout when ready.
- F06 Place an order as guest (Buyer, create Order, starts On the cart review): The buyer starts checkout from the cart, enters name (FD10), phone number (FD11), fulfilment choice (FD12) and, for courier, delivery address (FD13), city (FD14) and PIN code (FD15), optionally types a discount code (FD16) which is checked and rejected with a message when invalid, expired or deactivated while still allowing the order without it, sees subtotal with discount plus courier shipping of Rs 99 or free above Rs 1500 discounted subtotal and free pickup, and submits the Order; the website immediately reduces stock (FD08), creates the Order with reference, and shows the confirmation with UPI-later note.
- F07 Look up an order (Buyer, view Order, starts On the shop pages with an order reference): The buyer opens order lookup, enters the order reference (FD17) and phone number (FD11) from checkout, and sees the confirmation again: pieces with glaze (FD06), size (FD07) and quantity (FD09), totals with discount and shipping, fulfilment choice (FD12) with pickup instructions or delivery address, and the note that the owner will collect by UPI later.
- F08 Owner sign up (Shop Owner, auth, starts On the owner sign-in page while not signed in): The owner chooses to sign up from the owner entry, fills in FM02 with email (FD23) and password (FD24) and submits it to create the single shop-owner account and reach the home dashboard.
- F09 Owner sign in (Shop Owner, auth, starts On the owner sign-in page while not signed in): The owner chooses to sign in, fills in FM02 with email (FD23) and password (FD24) and submits it to reach the home dashboard with new orders and low-stock warnings.
- F10 Owner sign out (Shop Owner, auth, starts On any owner page while signed in): The signed-in owner chooses to sign out; the website ends the session and shows the public shop again.
- F11 Owner home dashboard (Shop Owner, home, starts After signing in): The owner lands on the home dashboard after signing in and sees new Orders clearly identifiable, today's counts and totals, and Pieces whose variants are nearly gone with low-stock warning at 3 or fewer left (FD08) and sold out at 0, with paths to open an order, edit stock, or plan the next batch.
- F12 Browse pieces with stock (Shop Owner, browse Piece, starts On the owner dashboard): The owner opens the piece list, sees each Piece with title (FD01), price (FD03), photos (FD04) and per-variant stock (FD08) with low-stock and sold-out marks, narrows with search (FD18) and availability filter (FD26), and chooses a piece to edit or restock.
- F13 Add a piece (Shop Owner, create Piece, starts On the owner piece list): The owner chooses to add a piece and fills in FM01 with title (FD01), description (FD02), price (FD03), photos (FD04), category (FD05) and each glaze-and-size variant's glaze (FD06), size (FD07) and stock quantity (FD08), then saves it so buyers can order the in-stock variants.
- F14 Edit a piece and its stock (Shop Owner, edit Piece, starts On the owner piece list): The owner opens a Piece from the list, edits it in FM01 changing title (FD01), description (FD02), price (FD03), photos (FD04), category (FD05) or variant glaze (FD06), size (FD07) and stock quantity (FD08) to add a new batch or correct details, and saves the changes for buyers to see.
- F15 Remove a piece (Shop Owner, delete Piece, starts On the owner piece list): The owner chooses to remove a Piece from the piece list, confirms the removal, and the piece no longer appears for buyers while past Orders keep their snapshot of it.
- F16 Browse orders by status (Shop Owner, browse Order, starts On the owner dashboard): The owner opens the order list, sees Orders newest first with new orders clearly identifiable, narrows by order status filter (FD25), and chooses an order to open for packing or payment.
- F17 View an order (Shop Owner, view Order, starts On the owner order list): The owner opens one Order from the list and sees buyer name (FD10), phone number (FD11), items with glaze (FD06), size (FD07) and quantity (FD09), discount code (FD16) and totals with shipping, fulfilment choice (FD12) with delivery address (FD13), city (FD14) and PIN code (FD15) or pickup, plus payment and fulfilment states.
- F18 Mark order as paid (Shop Owner, act Order, starts On an Order page): The owner opens an Unpaid Order and marks it Paid after collecting by UPI outside the app; the website shows the Order as Paid while fulfilment state stays unchanged.
- F19 Advance order fulfilment (Shop Owner, act Order, starts On an Order page): The owner opens a New or Packed Order and moves it from New to Packed and then to Shipped for courier fulfilment choice (FD12) or Picked Up for studio pickup; the website shows the new fulfilment state.
- F20 Create a discount code (Shop Owner, create DiscountCode, starts On the owner discount list): The owner chooses to create a promotion code and enters code (FD19), discount type (FD20), discount value (FD21) and expiry date (FD22), then saves it so buyers can use it at checkout for a weekend offer.
- F21 Browse discount codes (Shop Owner, browse DiscountCode, starts On the owner dashboard): The owner opens the discount list and sees each DiscountCode with code (FD19), discount type (FD20), discount value (FD21), expiry date (FD22) and active or deactivated state, newest and expiring offers identifiable.
- F22 Deactivate a discount code (Shop Owner, act DiscountCode, starts On the owner discount list): The owner opens an active DiscountCode from the list and deactivates it so it is rejected at checkout with a message; deactivated codes stay listed for records and are never deleted.
- F23 Manage owner account (Shop Owner, account, starts On any owner page while signed in): The owner opens their account, sees email (FD23), changes password with password (FD24), and saves the changes to keep the shop protected.
- F24 Cancel an order and restore stock (Shop Owner, act Order, starts On an Order page): The owner opens a New or Packed Order that cannot be fulfilled and cancels it; the website marks the Order Cancelled and restores the stock quantity (FD08) of each ordered variant so the pieces become orderable again.

## Skipped
- Buyer, auth: Buyers never sign in; they order as guests and look up orders with reference and phone (A05).
- Buyer, home: Buyers have no signed-in home; landing F01 and browse F02 are the entry.
- Buyer, browse Order: No buyer accounts or order history in MVP; must-have shopper order list is met by single-order lookup in F07 instead.
- Buyer, browse DiscountCode: Buyers do not browse codes; one code is entered at checkout in F06.
- Buyer, view DiscountCode: Buyers only type the code at checkout; code details are never shown to buyers.
- Buyer, create Piece: Only the shop owner manages Pieces in F13.
- Buyer, create DiscountCode: Only the shop owner creates codes in F20.
- Buyer, edit Piece: Buyers do not edit catalog pieces; cart quantities are edited in F05.
- Buyer, edit DiscountCode: Only the owner manages codes; buyers only enter them in F06.
- Buyer, delete Piece: Buyers do not delete pieces; removing a cart line happens in F05.
- Buyer, delete Order: Buyers do not delete orders; cancellation before shipping is done by the owner in F24 which restores stock.
- Buyer, delete DiscountCode: Buyers never delete codes.
- Buyer, act Order: Buyers take no action on placed Orders; must-have shopper cancel before shipping is not offered to guests and cancellation is done by the owner in F24.
- Buyer, act DiscountCode: Must-have apply-discount-code is part of checkout F06 with FD16, not a separate action.
- Buyer, account: No buyer accounts in MVP; guest checkout only.
- Buyer, settings: Buyers have no preferences to set.
- Shop Owner, landing: Landing invites buyers; the owner starts at sign-in and home F11.
- Shop Owner, view Piece: Owner reviews piece details in browse F12 and edits in F14; no separate view needed.
- Shop Owner, view DiscountCode: Code details are shown in the browse list F21; no separate view needed.
- Shop Owner, create Order: Orders are created only by buyers in F06.
- Shop Owner, edit Order: Order contents are never edited; payment and fulfilment change in F18 and F19.
- Shop Owner, edit DiscountCode: Codes are not edited after creation; they are deactivated in F22.
- Shop Owner, delete Order: Orders are cancelled in F24, never deleted, to keep records.
- Shop Owner, delete DiscountCode: Codes are deactivated in F22, never deleted, to keep order records honest.
- Shop Owner, act Piece: No piece action beyond add/edit/remove; stock changes happen in F14.
- Shop Owner, settings: Must-have shipping and pickup settings are fixed for MVP: Rs 99 courier, free above Rs 1500 discounted subtotal, free pickup (A04, A09); no editable settings.

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
