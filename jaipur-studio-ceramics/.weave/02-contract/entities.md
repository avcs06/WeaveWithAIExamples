# Entities

## Piece

`@app/entities/piece`

- `name`: text
- `description`: text, optional
- `price`: money
- `photos`: url, a list
- `category`: enum Category
- `glaze`: text, a list
- `size`: text, a list
- `variantStockQuantity`: int, a list

- `listPieces()` or `useListPieces()`: List pieces with photos, price and variant availability, optionally filtered by search words and category.
- `getPiece(id)` or `useGetPiece(id)`: Get one piece with its photos and glaze-and-size variant stock.
- `createPiece(input)`: Create a piece with photos, price, category and glaze-size variant stock.
- `updatePiece(id, changes)`: Update a piece including its variant stock, also used to reduce stock on order placement and restore stock on cancellation.
- `deletePiece(id)`: Remove a piece from the shop while keeping existing orders and their snapshots.

## Order

`@app/entities/order`

- `buyerName`: text
- `phoneNumber`: phone
- `fulfilmentChoice`: enum FulfilmentChoice
- `deliveryAddress`: text, optional
- `city`: text, optional
- `pinCode`: text, optional
- `quantity`: int, a list
- `orderReference`: text
- `pieces`: ref Piece id, a list
- `fulfilmentStatus`: enum FulfilmentStatus
- `paymentStatus`: enum PaymentStatus
- `subtotal`: money
- `discountTotal`: money, optional
- `shippingTotal`: money
- `total`: money
- `discountCode`: ref DiscountCode id, optional
- `orderedPieceName`: text, a list
- `orderedGlaze`: text, a list
- `orderedSize`: text, a list
- `orderedPrice`: money, a list

- `listOrders()` or `useListOrders()`: List orders newest first, optionally filtered by fulfilment or payment status.
- `getOrder(id)` or `useGetOrder(id)`: Get one order with buyer, items snapshot, totals and payment and fulfilment status.
- `lookupOrder(orderReference)` or `useLookupOrder(orderReference)`: Look up an order by its order reference together with the buyer phone number.
- `createOrder(input)`: Place a guest order with buyer details, fulfilment choice, quantities and optional discount code.
- `markOrderPacked(id, changes)`: Mark a New order as Packed.
- `markOrderShipped(id, changes)`: Mark a Packed courier order as Shipped.
- `markOrderPaid(id, changes)`: Mark an Unpaid order as Paid without changing fulfilment status.
- `cancelOrder(id, changes)`: Cancel a New or Packed order and restore its variant stock.
- `markOrderPickedUp(id, changes)`: Mark a Packed studio pickup order as Picked Up.

## DiscountCode

`@app/entities/discountCode`

- `discountCode`: text, optional
- `discountType`: enum DiscountType
- `discountValue`: decimal
- `expiryDate`: date
- `status`: enum DiscountCodeStatus

- `listDiscountCodes()` or `useListDiscountCodes()`: List discount codes with type, value, expiry and Active or Deactivated status.
- `getDiscountCode(discountCode)` or `useGetDiscountCode(discountCode)`: Check a typed discount code for validity, expiry and active state.
- `createDiscountCode(input)`: Create a new Active percentage or fixed-amount discount code.
- `deactivateDiscountCode(id, changes)`: Deactivate an Active discount code so it can no longer be used.

## Cart

`@app/entities/cart`

- `useCartLines()`: The cart's lines in the order they were added.
- `addCartLine(line)`: Add a variant to the cart, merging with a line for the same variant.
- `updateCartLine(index, quantity)`: Change one line's quantity.
- `removeCartLine(index)`: Remove one line from the cart.
- `clearCart()`: Empty the cart, such as after placing an order.

## Enums

`@app/entities/enums`

- `Category`: `mugs` (Mugs), `bowls` (Bowls), `planters` (Planters), `vases` (Vases); options in `CategoryOptions`
- `FulfilmentChoice`: `studio_pickup` (Studio pickup), `courier_delivery` (Courier delivery); options in `FulfilmentChoiceOptions`
- `DiscountType`: `percentage` (Percentage), `fixed_amount` (Fixed amount); options in `DiscountTypeOptions`
- `FulfilmentStatus`: `new` (New), `packed` (Packed), `shipped` (Shipped), `picked_up` (Picked Up), `cancelled` (Cancelled); options in `FulfilmentStatusOptions`
- `PaymentStatus`: `unpaid` (Unpaid), `paid` (Paid); options in `PaymentStatusOptions`
- `DiscountCodeStatus`: `active` (Active), `deactivated` (Deactivated); options in `DiscountCodeStatusOptions`

## Sign-in

`@app/entities/auth`: `signUp(email)`, `signIn(email)`, `signOut()`, `useCurrentUser()`.
