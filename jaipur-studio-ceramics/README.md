# Jaipur Studio Ceramics

The full record of the run that made this app, from the brief to every review thread and model call, is in [run/](run).

| | |
|---|---|
| Model | Muse Spark 1.3 (`muse-spark-1.3`) on the Meta Model API, with Muse Wonder 1.0 (`muse-wonder-1.0`) for the scope |
| Coding agent | Muse Code, on Muse Spark 1.3 |
| End-to-end time | 2 h 20 min |
| Total cost | $4.39 for the model calls; the coding sessions ran on the Muse Code subscription |
| Muse Code subscription | 4% of the weekly allowance (24% to 28%) |
| Screens measured | 18 |
| Issues raised | 37 |
| Issues fixed | 33 |
| AI discussion threads<br><sub>Issues an agent kept<br>open to discuss</sub> | 0 |
| Accessibility violations (axe, WCAG 2.2 AA) | 0 |
| Contrast failures | 0 |
| Controls without a name | 0 |
| Keyboard: controls reachable with Tab | 99.6% of 233 |
| Keyboard: focus visible | 87.9% |
| Type and lint errors | 0 |
| Design-system validation errors | 0 |
| Duplicated code | 2.1% |
| Code size | 110 files, 7,606 lines |

Accessibility and keyboard numbers are from the app's dev server (`next dev`), not a production build.

Weave generated this app from the prompt below.

## Prompt

I make ceramics in a small studio in Jaipur, mugs, bowls, planters, the odd
vase, in batches of ten or twenty. Right now I sell through Instagram DMs and a
Google Form and it's a mess: I lose track of who has paid, I oversell a glaze
that ran out, and I spend evenings answering "is this still available".

I want my own shop site. People should be able to see what's in stock, pick a
glaze and size, and order without messaging me. Pieces sell out fast, so it has
to be honest about what's left. Buyers in Jaipur pick up from the studio,
everyone else gets a courier; I charge ₹99 for shipping and nothing above
₹1,500. I don't want to set up online payments yet, so for now an order just
comes in and I collect by UPI later.

Sometimes I put a discount code on Instagram for a weekend. I'd like a simple
way to see new orders, mark what I've packed and shipped, and know when a glaze
is nearly gone so I can plan the next batch.

Earthy, lots of white space, the photos should do the talking.

## Screenshots

Each screen at 1280px wide, with the app's seed data. The dashboard screens are
signed in as the shop owner.

### Home

`/`

![Home](screenshots/s01-home.png)

### Shop

`/shop`

![Shop](screenshots/s02-shop.png)

### A piece

`/shop/piece-1`

![A piece](screenshots/s03-piece.png)

### Cart

`/cart`

![Cart](screenshots/s04-cart.png)

### Checkout

`/checkout`

![Checkout](screenshots/s05-checkout.png)

### An order that is not found

`/orders/demo`

![An order that is not found](screenshots/s06-order-not-found.png)

### Look up an order

`/order-lookup`

![Look up an order](screenshots/s07-look-up-an-order.png)

### Dashboard

`/dashboard`

![Dashboard](screenshots/s10-dashboard.png)

### Pieces

`/dashboard/pieces`

![Pieces](screenshots/s11-pieces.png)

### Add a piece

`/dashboard/pieces/new`

![Add a piece](screenshots/s12-add-a-piece.png)

### A piece, for the owner

`/dashboard/pieces/piece-1`

![A piece, for the owner](screenshots/s13-piece-details.png)

### Edit a piece

`/dashboard/pieces/piece-1/edit`

![Edit a piece](screenshots/s14-edit-a-piece.png)

### Orders

`/dashboard/orders`

![Orders](screenshots/s15-orders.png)

### An order, for the owner

`/dashboard/orders/order-1`

![An order, for the owner](screenshots/s16-order.png)

### Discount codes

`/dashboard/discount-codes`

![Discount codes](screenshots/s17-discount-codes.png)

### Create a discount code

`/dashboard/discount-codes/new`

![Create a discount code](screenshots/s18-create-a-discount-code.png)

### A discount code

`/dashboard/discount-codes/discountCode-1`

![A discount code](screenshots/s19-discount-code.png)

### Account

`/dashboard/account`

![Account](screenshots/s20-account.png)
