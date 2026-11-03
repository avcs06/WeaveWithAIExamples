# Entities

## Piece

`@app/entities/piece`

- `title`: string
- `description`: text, optional
- `price`: money
- `photos`: url, a list
- `category`: enum PieceCategory
- `glaze`: string, a list
- `size`: enum Size, a list
- `stockQuantity`: int, a list

- `listPieces()` or `useListPieces()`: List pieces with photos, price, category and variant stock for shop, cart and dashboard.
- `getPiece(id)` or `useGetPiece(id)`: Get one piece with its variants and stock quantities.
- `createPiece(input)`: Create a piece with variants and stock.
- `updatePiece(id, changes)`: Edit a piece's details, variants and stock.
- `updatePieceStock(id, changes)`: Reduce stock when an order is placed and restore stock when an order is cancelled.
- `deletePiece(id)`: Remove a piece from the shop; past orders keep their snapshot.

## Order

`@app/entities/order`

- `name`: string
- `phoneNumber`: phone
- `fulfilmentChoice`: enum FulfilmentChoice
- `deliveryAddress`: text, optional
- `city`: string, optional
- `pinCode`: string, optional
- `discountCode`: string, optional
- `orderReference`: string
- `itemPieceId`: string, a list
- `quantity`: int, a list
- `itemTitle`: string, a list
- `itemGlaze`: string, a list
- `itemSize`: enum Size, a list
- `itemPrice`: money, a list
- `subtotal`: money
- `discountAmount`: money, optional
- `shippingCost`: money
- `total`: money
- `paymentStatus`: enum PaymentStatus
- `fulfilmentStatus`: enum FulfilmentStatus

- `listOrders()` or `useListOrders()`: List orders newest first, optionally filtered by fulfilment status.
- `getOrder(id)` or `useGetOrder(id)`: Get one order with buyer, items, totals and fulfilment details.
- `lookupOrder()` or `useLookupOrder()`: Find a placed order by its reference and phone number.
- `createOrder(input)`: Place a guest order with contact, fulfilment choice and optional discount code.
- `markOrderPaid(id, changes)`: Record that UPI payment was collected for an unpaid order.
- `advanceOrderFulfilment(id, changes)`: Move a New order to Packed, then to Shipped or Picked Up.
- `cancelOrder(id, changes)`: Cancel a New or Packed order and restore its stock.

## DiscountCode

`@app/entities/discountCode`

- `code`: string
- `discountType`: enum DiscountType
- `discountValue`: decimal
- `expiryDate`: date
- `status`: enum DiscountCodeStatus

- `listDiscountCodes()` or `useListDiscountCodes()`: List all discount codes newest first with value, expiry and state.
- `getDiscountCode(id)` or `useGetDiscountCode(id)`: Get one discount code with its value, expiry and state.
- `getDiscountCodeByCode(code)` or `useGetDiscountCodeByCode(code)`: Validate the discount code typed at checkout.
- `createDiscountCode(input)`: Create an active discount code with type, value and expiry.
- `deactivateDiscountCode(id, changes)`: Deactivate a code so it is rejected at checkout.

## Enums

`@app/entities/enums`

- `PieceCategory`: `mug` (Mug), `bowl` (Bowl), `planter` (Planter), `vase` (Vase); options in `PieceCategoryOptions`
- `Size`: `small` (Small), `medium` (Medium), `large` (Large); options in `SizeOptions`
- `FulfilmentChoice`: `studio_pickup` (Studio pickup), `courier_delivery` (Courier delivery); options in `FulfilmentChoiceOptions`
- `DiscountType`: `percentage` (Percentage), `fixed_amount` (Fixed amount); options in `DiscountTypeOptions`
- `PaymentStatus`: `unpaid` (Unpaid), `paid` (Paid); options in `PaymentStatusOptions`
- `FulfilmentStatus`: `new` (New), `packed` (Packed), `shipped` (Shipped), `picked_up` (Picked Up), `cancelled` (Cancelled); options in `FulfilmentStatusOptions`
- `DiscountCodeStatus`: `active` (Active), `deactivated` (Deactivated); options in `DiscountCodeStatusOptions`

## Sign-in

`@app/entities/auth`: `signUp(email)`, `signIn(email)`, `signOut()`, `useCurrentUser()`.
