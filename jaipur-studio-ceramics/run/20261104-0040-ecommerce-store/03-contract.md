# Jaipur Studio Ceramics: contract

The records the app keeps, the operations its screens call, and what each screen and dialog loads. Every record also has id, createdAt, updatedAt. Sign up, sign in and sign out are built in.

## Entities

### Piece

Implements Piece.

| Field | Kind | Required |
| ----- | ---- | -------- |
| title | string | yes |
| description | text | no |
| price | money | yes |
| photos | url list | yes |
| category | enum PieceCategory | yes |
| glaze | string list | yes |
| size | enum Size list | yes |
| stockQuantity | int list | yes |

### Order

Implements Order.

| Field | Kind | Required |
| ----- | ---- | -------- |
| name | string | yes |
| phoneNumber | phone | yes |
| fulfilmentChoice | enum FulfilmentChoice | yes |
| deliveryAddress | text | no |
| city | string | no |
| pinCode | string | no |
| discountCode | string | no |
| orderReference | string | yes |
| quantity | int list | yes |
| itemTitle | string list | yes |
| itemGlaze | string list | yes |
| itemSize | enum Size list | yes |
| itemPrice | money list | yes |
| subtotal | money | yes |
| discountAmount | money | no |
| shippingCost | money | yes |
| total | money | yes |
| paymentStatus | enum PaymentStatus | yes |
| fulfilmentStatus | enum FulfilmentStatus | yes |

### DiscountCode

Implements DiscountCode.

| Field | Kind | Required |
| ----- | ---- | -------- |
| code | string | yes |
| discountType | enum DiscountType | yes |
| discountValue | decimal | yes |
| expiryDate | date | yes |
| status | enum DiscountCodeStatus | yes |

## Enums

- PieceCategory: Mug (`mug`), Bowl (`bowl`), Planter (`planter`), Vase (`vase`)
- Size: Small (`small`), Medium (`medium`), Large (`large`)
- FulfilmentChoice: Studio pickup (`studio_pickup`), Courier delivery (`courier_delivery`)
- DiscountType: Percentage (`percentage`), Fixed amount (`fixed_amount`)
- PaymentStatus: Unpaid (`unpaid`), Paid (`paid`)
- FulfilmentStatus: New (`new`), Packed (`packed`), Shipped (`shipped`), Picked Up (`picked_up`), Cancelled (`cancelled`)
- DiscountCodeStatus: Active (`active`), Deactivated (`deactivated`)

## Operations

| Operation | Kind | Entity | Summary | Inputs | Serves |
| --------- | ---- | ------ | ------- | ------ | ------ |
| listPieces | list | Piece | List pieces with photos, price, category and variant stock for shop, cart and dashboard. | FD18 Search pieces as q, FD05 Category as category, FD26 Availability filter as stockQuantity | F01.S01, F01.S02, F02.S01, F02.S02, F05.S01, F06.S01, F11.S01, F12.S01, F12.S02 |
| getPiece | get | Piece | Get one piece with its variants and stock quantities. | none | F02.S03, F03.S01, F04.S01, F12.S03, F14.S01, F15.S01 |
| createPiece | create | Piece | Create a piece with variants and stock. | FD01 Title as title, FD02 Description as description, FD03 Price as price, FD04 Photos as photos, FD05 Category as category, FD06 Glaze as glaze, FD07 Size as size, FD08 Stock quantity as stockQuantity | F13.S02 |
| updatePiece | update | Piece | Edit a piece's details, variants and stock. | FD01 Title as title, FD02 Description as description, FD03 Price as price, FD04 Photos as photos, FD05 Category as category, FD06 Glaze as glaze, FD07 Size as size, FD08 Stock quantity as stockQuantity | F14.S02 |
| updatePieceStock | update | Piece | Reduce stock when an order is placed and restore stock when an order is cancelled. | none | F06.S02, F24.S01 |
| deletePiece | delete | Piece | Remove a piece from the shop; past orders keep their snapshot. | none | F15.S02 |
| listOrders | list | Order | List orders newest first, optionally filtered by fulfilment status. | FD25 Order status filter as fulfilmentStatus | F11.S01, F16.S01, F16.S02 |
| getOrder | get | Order | Get one order with buyer, items, totals and fulfilment details. | none | F16.S03, F17.S01, F07.S02 |
| lookupOrder | list | Order | Find a placed order by its reference and phone number. | FD17 Order reference as orderReference, FD11 Phone number as phoneNumber | F07.S02 |
| createOrder | create | Order | Place a guest order with contact, fulfilment choice and optional discount code. | FD09 Quantity as quantity, FD10 Name as name, FD11 Phone number as phoneNumber, FD12 Fulfilment choice as fulfilmentChoice, FD13 Delivery address as deliveryAddress, FD14 City as city, FD15 PIN code as pinCode, FD16 Discount code as discountCode | F06.S02 |
| markOrderPaid | update | Order | Record that UPI payment was collected for an unpaid order. | none | F18.S01 |
| advanceOrderFulfilment | update | Order | Move a New order to Packed, then to Shipped or Picked Up. | none | F19.S01 |
| cancelOrder | update | Order | Cancel a New or Packed order and restore its stock. | none | F24.S01 |
| listDiscountCodes | list | DiscountCode | List all discount codes newest first with value, expiry and state. | none | F21.S01 |
| getDiscountCode | get | DiscountCode | Get one discount code with its value, expiry and state. | none | F22.S01 |
| getDiscountCodeByCode | get | DiscountCode | Validate the discount code typed at checkout. | FD16 Discount code as code | F06.S02 |
| createDiscountCode | create | DiscountCode | Create an active discount code with type, value and expiry. | FD19 Code as code, FD20 Discount type as discountType, FD21 Discount value as discountValue, FD22 Expiry date as expiryDate | F20.S02 |
| deactivateDiscountCode | update | DiscountCode | Deactivate a code so it is rejected at checkout. | none | F22.S02 |

## What each screen loads

- FR01 Public site frame: none
- FR02 App frame: none
- S01 Jaipur Studio Ceramics: listPieces
- S02 Shop: listPieces
- S03 The piece's title (FD01): getPiece
- S04 Your cart: listPieces
- S05 Checkout: listPieces, getDiscountCodeByCode
- S06 The order reference (FD17), as in "Order JSC-4821": getOrder, lookupOrder
- S07 Look up an order: none
- S08 Studio owner sign in: none
- S09 Create the studio owner account: none
- S10 Home: listOrders, listPieces
- S11 Pieces: listPieces
- S12 Add a piece: none
- S13 The piece's title (FD01): getPiece
- S14 Edit the piece's title (FD01), as in "Edit Speckled Chai Mug": getPiece
- S15 Orders: listOrders
- S16 The order reference (FD17), as in "Order JSC-4821": getOrder
- S17 Discount codes: listDiscountCodes
- S18 Create a discount code: none
- S19 The discount code (FD19), as in "WEEKEND10": getDiscountCode
- S20 Account: none
- D01 Remove this piece?: getPiece
- D02 Deactivate this code?: getDiscountCode
- D03 Cancel this order?: getOrder
