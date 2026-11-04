# Jaipur Studio Ceramics: scope

Jaipur Studio Ceramics is an online shop for a Jaipur potter who sells mugs, bowls, planters and vases in small batches. Buyers browse pieces that are actually in stock, choose a glaze and size, and place an order without messaging the studio or paying online. The owner then collects payment by UPI, packs and ships or prepares the order for studio pickup, and uses stock and low-stock views to plan the next batch.

Audience: People in India who want to buy small-batch handmade ceramics, and the single studio owner in Jaipur who makes and sells them.

Kinds of app: ecommerce

## Roles
- Buyer (buyer, no sign-in): A visitor who browses in-stock ceramics and places an Order without creating an account.
- Shop Owner (shopOwner, signs in): The Jaipur potter who manages Pieces, stock, DiscountCodes and Orders, and collects payment by UPI outside the app.

## Vocabulary
- Piece (owned by Shop Owner): A ceramic item for sale such as a mug, bowl, planter or vase, with photos, price, and glaze-and-size variants each holding their own stock quantity.
- Order (owned by Buyer): A buyer's placed order with their name, phone, pickup-or-courier choice, delivery address when needed, ordered variants and quantities, discount and shipping totals, payment status and fulfilment status.
- DiscountCode (owned by Shop Owner): A promotional code created by the owner giving a percentage or fixed amount off an Order, with an expiry date and an active or deactivated state.

## In scope
- A public landing page that says this is the Jaipur studio's own ceramics shop, shows featured in-stock pieces, and invites visitors to browse and order without messaging the studio.
- Browse all Pieces (mugs, bowls, planters and vases) with photos, price and honest availability: how many are left, or sold out.
- View a Piece, choose a glaze and a size, and choose a quantity no greater than the stock left for that glaze-and-size variant; a sold-out variant cannot be ordered.
- Add Pieces to a cart and place an Order as a guest with name, phone number and a choice of studio pickup in Jaipur or courier delivery; no online payment is taken and the confirmation states the owner will collect payment by UPI later.
- Order pricing rule: courier shipping is ₹99, and shipping is free when the discounted subtotal is above ₹1,500; studio pickup costs nothing.
- Apply one DiscountCode per Order at checkout; an invalid, expired or deactivated code is rejected with a message and the Order can still be placed without it.
- Stock rule: placing an Order immediately reduces the stock of the ordered variants so the shop never oversells, and cancelling an Order before shipping or pickup restores the stock.
- After placing an Order the buyer sees a confirmation with an order reference, the pieces, glaze, size and quantities ordered, the total including any discount and shipping, the fulfilment choice, and the UPI-later note; the buyer can look the Order up again with the reference and their phone number.
- The shop owner signs in to add, edit and remove Pieces, including photos, description, price, glaze and size variants, and the stock quantity of each variant.
- The shop owner sees a list of Orders with new orders clearly identifiable, opens an Order to see the buyer, phone, items, totals, discount used and fulfilment choice, and marks the Order Paid when UPI payment is collected.
- The shop owner moves each Order from New to Packed and then to Shipped for courier orders or Picked Up for studio pickups, and can Cancel a New or Packed Order.
- The shop owner creates, deactivates and reviews DiscountCodes with a code, a percentage or fixed-amount discount, and an expiry date, for promotions such as a weekend Instagram offer.
- The shop owner sees which glazes and variants are nearly gone, with a low-stock warning at 3 or fewer pieces left and sold out at 0, so the next batch can be planned.

## Out of scope
- Online payment processing, including paying by UPI inside the shop: The owner explicitly does not want to set up online payments yet. Instead: The Order is placed without payment, the confirmation says the owner will collect by UPI later, and the owner marks the Order Paid once collected.
- Buyer accounts and saved order histories: The idea asks for ordering without messaging, not for accounts, and guest checkout keeps the first order short. Instead: Buyers check out as guests and can look up an Order with its reference and the phone number from checkout.
- Booking or paying a courier, printing shipping labels, and live delivery tracking: The idea only requires courier delivery at a flat charge and an honest shipped status. Instead: The owner arranges the courier outside the app and simply marks the Order Shipped in the shop.
- Pre-orders, waitlists and custom commissions for sold-out pieces: Pieces are made in small batches and the shop must stay honest about what is actually available. Instead: Sold-out variants are shown as sold out and cannot be added to an Order until the owner adds stock from a new batch.
- Selling through Instagram DMs or the old Google Form, or importing past orders from them: The shop replaces those channels rather than integrating with them. Instead: All new Orders are taken only through the shop; past conversations stay where they are.

## Assumptions
- A01 (data): Stock is tracked per glaze-and-size variant of a Piece, not just per Piece, because a glaze can sell out while other glazes of the same Piece remain available.
- A02 (behavior): Placing an Order immediately reduces the available stock of each ordered variant. Cancelling an Order before it is shipped or picked up restores that stock.
- A03 (behavior): A low-stock warning appears when a variant has 3 or fewer pieces left, and a sold-out warning appears at 0. The owner can still see and edit sold-out Pieces.
- A04 (behavior): Shipping is free when the discounted subtotal is above ₹1,500; at or below ₹1,500 courier shipping is ₹99. Studio pickup is always free.
- A05 (permission): Buyers check out as guests without an account. A buyer can find an Order again using the order reference shown at confirmation together with the phone number given at checkout.
- A06 (data): Checkout requires only the buyer's name, phone number, fulfilment choice (studio pickup or courier), and a delivery address with city and PIN code when courier is chosen.
- A07 (behavior): Payment status is separate from fulfilment status: an Order is Unpaid until the owner marks it Paid after collecting by UPI. Fulfilment moves from New to Packed, then to Shipped for courier orders or Picked Up for pickup orders; the owner may Cancel a New or Packed order.
- A08 (behavior): A DiscountCode gives either a percentage off or a fixed rupee amount off the subtotal, as chosen by the owner when creating it. One code may be used per Order, codes have an expiry date, and the owner can deactivate a code at any time.
- A09 (behavior): The studio pickup address and pickup instructions are fixed shop information supplied by the owner at setup and shown at checkout and on the order confirmation; they are not edited per Order.

## Questions
- Q01: Is the free-shipping threshold of ₹1,500 calculated before or after a DiscountCode is applied? Why:  Default: The discounted subtotal decides: above ₹1,500 shipping is free, otherwise courier shipping is ₹99.
- Q02: At what stock level should a glaze count as nearly gone for planning the next batch, and should the owner be able to change that level per Piece? Why:  Default: A warning at 3 or fewer pieces left per glaze-and-size variant, with the threshold fixed for the MVP.
- Q03: Should studio pickup be offered only to buyers in Jaipur, or can any buyer choose pickup at checkout? Why:  Default: Buyers simply choose studio pickup or courier at checkout; no address check restricts who may pick up.
