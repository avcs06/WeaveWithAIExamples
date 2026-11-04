import type { Order } from './types';

export const orderSeed: Order[] = [
  {
    "id": "order-1",
    "createdAt": "2026-10-24T19:43:11.773Z",
    "updatedAt": "2026-10-24T20:43:11.773Z",
    "name": "Meera Sharma",
    "phoneNumber": "9829012345",
    "fulfilmentChoice": "courier_delivery",
    "deliveryAddress": "14 Rose Lane, Malviya Nagar",
    "city": "Jaipur",
    "pinCode": "302017",
    "discountCode": "WEEKEND10",
    "orderReference": "JSC-4821",
    "itemPieceId": ["piece-1"],
    "quantity": [
      2
    ],
    "itemTitle": [
      "Speckled Chai Mug"
    ],
    "itemGlaze": [
      "Sage Green"
    ],
    "itemSize": [
      "small"
    ],
    "itemPrice": [
      650
    ],
    "subtotal": 1300,
    "discountAmount": 130,
    "shippingCost": 120,
    "total": 1290,
    "paymentStatus": "paid",
    "fulfilmentStatus": "packed"
  },
  {
    "id": "order-2",
    "createdAt": "2026-10-26T19:43:11.773Z",
    "updatedAt": "2026-10-26T21:43:11.773Z",
    "name": "Arjun Mehta",
    "phoneNumber": "9414056789",
    "fulfilmentChoice": "studio_pickup",
    "orderReference": "JSC-4825",
    "itemPieceId": ["piece-4"],
    "quantity": [
      1
    ],
    "itemTitle": [
      "Amber Bud Vase"
    ],
    "itemGlaze": [
      "Amber"
    ],
    "itemSize": [
      "medium"
    ],
    "itemPrice": [
      1200
    ],
    "subtotal": 1200,
    "discountAmount": 0,
    "shippingCost": 0,
    "total": 1200,
    "paymentStatus": "unpaid",
    "fulfilmentStatus": "new"
  },
  {
    "id": "order-3",
    "createdAt": "2026-10-28T19:43:11.773Z",
    "updatedAt": "2026-10-28T22:43:11.773Z",
    "name": "Priya Nair",
    "phoneNumber": "9982011223",
    "fulfilmentChoice": "courier_delivery",
    "deliveryAddress": "B-402 Sea Breeze, Bandra West",
    "city": "Mumbai",
    "pinCode": "400050",
    "discountCode": "DIWALI200",
    "orderReference": "JSC-4830",
    "itemPieceId": ["piece-2", "piece-1"],
    "quantity": [
      1,
      2
    ],
    "itemTitle": [
      "Indigo Ramen Bowl",
      "Speckled Chai Mug"
    ],
    "itemGlaze": [
      "Indigo Blue",
      "Mustard Speckle"
    ],
    "itemSize": [
      "medium",
      "medium"
    ],
    "itemPrice": [
      850,
      650
    ],
    "subtotal": 2150,
    "discountAmount": 200,
    "shippingCost": 150,
    "total": 2100,
    "paymentStatus": "paid",
    "fulfilmentStatus": "shipped"
  },
  {
    "id": "order-4",
    "createdAt": "2026-10-30T19:43:11.773Z",
    "updatedAt": "2026-10-30T23:43:11.773Z",
    "name": "Kabir Singh Rathore",
    "phoneNumber": "9001894567",
    "fulfilmentChoice": "courier_delivery",
    "deliveryAddress": "C-56 Defence Colony",
    "city": "New Delhi",
    "pinCode": "110024",
    "discountCode": "FIRSTBUY15",
    "orderReference": "JSC-4834",
    "itemPieceId": ["piece-3"],
    "quantity": [
      3
    ],
    "itemTitle": [
      "Terracotta Tulsi Planter"
    ],
    "itemGlaze": [
      "Terracotta Natural"
    ],
    "itemSize": [
      "large"
    ],
    "itemPrice": [
      950
    ],
    "subtotal": 2850,
    "discountAmount": 427.5,
    "shippingCost": 180,
    "total": 2602.5,
    "paymentStatus": "paid",
    "fulfilmentStatus": "new"
  },
  {
    "id": "order-5",
    "createdAt": "2026-11-01T19:43:11.773Z",
    "updatedAt": "2026-11-02T00:43:11.773Z",
    "name": "Ananya Iyer",
    "phoneNumber": "9799398765",
    "fulfilmentChoice": "studio_pickup",
    "orderReference": "JSC-4840",
    "itemPieceId": ["piece-5"],
    "quantity": [
      1
    ],
    "itemTitle": [
      "Jaipur Blue Serving Bowl"
    ],
    "itemGlaze": [
      "Turquoise Jaal"
    ],
    "itemSize": [
      "large"
    ],
    "itemPrice": [
      1450
    ],
    "subtotal": 1450,
    "discountAmount": 0,
    "shippingCost": 0,
    "total": 1450,
    "paymentStatus": "unpaid",
    "fulfilmentStatus": "cancelled"
  }
];
