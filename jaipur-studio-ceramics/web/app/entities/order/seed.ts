import type { Order } from './types';

export const orderSeed: Order[] = [
  {
    "id": "order-1",
    "createdAt": "2026-10-22T11:54:11.023Z",
    "updatedAt": "2026-10-22T12:54:11.023Z",
    "buyerName": "Priya Sharma",
    "phoneNumber": "9829012345",
    "fulfilmentChoice": "courier_delivery",
    "deliveryAddress": "14 Rose Lane, C-Scheme",
    "city": "Jaipur",
    "pinCode": "302001",
    "quantity": [
      2
    ],
    "orderReference": "JSC-1024",
    "pieces": [
      "piece-1"
    ],
    "fulfilmentStatus": "new",
    "paymentStatus": "unpaid",
    "subtotal": 1300,
    "discountTotal": 130,
    "shippingTotal": 120,
    "total": 1290,
    "discountCode": "discountCode-1",
    "orderedPieceName": [
      "Speckled Stoneware Mug"
    ],
    "orderedGlaze": [
      "Matte White"
    ],
    "orderedSize": [
      "300 ml"
    ],
    "orderedPrice": [
      650
    ]
  },
  {
    "id": "order-2",
    "createdAt": "2026-10-24T11:54:11.023Z",
    "updatedAt": "2026-10-24T13:54:11.023Z",
    "buyerName": "Rahul Verma",
    "phoneNumber": "9414056789",
    "fulfilmentChoice": "studio_pickup",
    "quantity": [
      1,
      1
    ],
    "orderReference": "JSC-1025",
    "pieces": [
      "piece-2",
      "piece-4"
    ],
    "fulfilmentStatus": "packed",
    "paymentStatus": "paid",
    "subtotal": 1800,
    "discountTotal": 90,
    "shippingTotal": 0,
    "total": 1710,
    "discountCode": "discountCode-3",
    "orderedPieceName": [
      "Jaipur Blue Ramen Bowl",
      "Tall Bud Vase"
    ],
    "orderedGlaze": [
      "Jaipur Blue",
      "Matte Black"
    ],
    "orderedSize": [
      "500 ml",
      "8 inch"
    ],
    "orderedPrice": [
      850,
      950
    ]
  },
  {
    "id": "order-3",
    "createdAt": "2026-10-26T11:54:11.023Z",
    "updatedAt": "2026-10-26T14:54:11.023Z",
    "buyerName": "Ananya Iyer",
    "phoneNumber": "9982011223",
    "fulfilmentChoice": "courier_delivery",
    "deliveryAddress": "B-402 Sea Breeze, Bandra West",
    "city": "Mumbai",
    "pinCode": "400050",
    "quantity": [
      2
    ],
    "orderReference": "JSC-1026",
    "pieces": [
      "piece-3"
    ],
    "fulfilmentStatus": "shipped",
    "paymentStatus": "paid",
    "subtotal": 1100,
    "discountTotal": 200,
    "shippingTotal": 150,
    "total": 1050,
    "discountCode": "discountCode-2",
    "orderedPieceName": [
      "Hand-Painted Planter"
    ],
    "orderedGlaze": [
      "Indigo Bloom"
    ],
    "orderedSize": [
      "6 inch"
    ],
    "orderedPrice": [
      550
    ]
  },
  {
    "id": "order-4",
    "createdAt": "2026-10-28T11:54:11.023Z",
    "updatedAt": "2026-10-28T15:54:11.023Z",
    "buyerName": "Kabir Mehta",
    "phoneNumber": "9001897654",
    "fulfilmentChoice": "studio_pickup",
    "quantity": [
      1
    ],
    "orderReference": "JSC-1027",
    "pieces": [
      "piece-5"
    ],
    "fulfilmentStatus": "picked_up",
    "paymentStatus": "paid",
    "subtotal": 1200,
    "discountTotal": 60,
    "shippingTotal": 0,
    "total": 1140,
    "discountCode": "discountCode-3",
    "orderedPieceName": [
      "Rustic Serving Bowl"
    ],
    "orderedGlaze": [
      "Cream"
    ],
    "orderedSize": [
      "Large"
    ],
    "orderedPrice": [
      1200
    ]
  },
  {
    "id": "order-5",
    "createdAt": "2026-10-30T11:54:11.023Z",
    "updatedAt": "2026-10-30T16:54:11.023Z",
    "buyerName": "Neha Gupta",
    "phoneNumber": "9810456789",
    "fulfilmentChoice": "courier_delivery",
    "deliveryAddress": "27 Green Park Extension",
    "city": "New Delhi",
    "pinCode": "110016",
    "quantity": [
      1,
      2
    ],
    "orderReference": "JSC-1028",
    "pieces": [
      "piece-4",
      "piece-1"
    ],
    "fulfilmentStatus": "new",
    "paymentStatus": "unpaid",
    "subtotal": 2250,
    "discountTotal": 225,
    "shippingTotal": 120,
    "total": 2145,
    "discountCode": "discountCode-1",
    "orderedPieceName": [
      "Tall Bud Vase",
      "Speckled Stoneware Mug"
    ],
    "orderedGlaze": [
      "Sandstone",
      "Speckled Oatmeal"
    ],
    "orderedSize": [
      "10 inch",
      "300 ml"
    ],
    "orderedPrice": [
      950,
      650
    ]
  },
  {
    "id": "order-6",
    "createdAt": "2026-11-01T11:54:11.023Z",
    "updatedAt": "2026-11-01T17:54:11.023Z",
    "buyerName": "Arjun Singhania",
    "phoneNumber": "9829054321",
    "fulfilmentChoice": "courier_delivery",
    "deliveryAddress": "C-11 Malviya Nagar",
    "city": "Jaipur",
    "pinCode": "302017",
    "quantity": [
      1
    ],
    "orderReference": "JSC-1029",
    "pieces": [
      "piece-3"
    ],
    "fulfilmentStatus": "cancelled",
    "paymentStatus": "unpaid",
    "subtotal": 550,
    "discountTotal": 100,
    "shippingTotal": 120,
    "total": 570,
    "discountCode": "discountCode-4",
    "orderedPieceName": [
      "Hand-Painted Planter"
    ],
    "orderedGlaze": [
      "Sage Green"
    ],
    "orderedSize": [
      "4 inch"
    ],
    "orderedPrice": [
      550
    ]
  }
];
