'use client';

import { formatINR } from '@app/blocks/money';
import {
  fulfilmentLabel,
  fulfilmentTone,
  paymentLabel,
  paymentTone,
} from '@app/blocks/orderStatus';
import {
  STUDIO_PICKUP_ADDRESS,
  STUDIO_PICKUP_INSTRUCTIONS,
} from '@app/blocks/shopInfo';
import { FulfilmentChoiceOptions } from '@app/entities/enums';
import { Numeral } from '@packages/ui/Numeral';
import { Tag } from '@packages/ui/Tag';
import {
  Caption,
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
  List,
  ListItem,
  Paragraph,
  Time,
} from '@packages/ui/Typography';
import React from 'react';

import type { Order } from '@app/entities/order';

const choiceLabel = (order: Order): string =>
  FulfilmentChoiceOptions.find((option) => option.key === order.fulfilmentChoice)
    ?.label ?? order.fulfilmentChoice;

/**
 * Everything an order holds: its items with glaze, size and quantities, the
 * discount and shipping totals and the total, the fulfilment choice with the
 * pickup instructions or the courier address, and the UPI-later note.
 * Screens add their own actions around it.
 */
export const OrderDetails = ({
  order,
  showBuyer = false,
  showStatus = false,
}: {
  order: Order;
  showBuyer?: boolean;
  showStatus?: boolean;
}) => (
  <div className="flex-col-gap-4">
    {showStatus ? (
      <div className="flex-row-gap-2 flex-wrap items-center">
        <Tag variant={fulfilmentTone(order.fulfilmentStatus)}>
          {fulfilmentLabel(order.fulfilmentStatus)}
        </Tag>
        <Tag variant={paymentTone(order.paymentStatus)}>
          {paymentLabel(order.paymentStatus)}
        </Tag>
        <Caption>
          Placed <Time value={order.createdAt} />
        </Caption>
      </div>
    ) : (
      <Caption>
        Placed <Time value={order.createdAt} />
      </Caption>
    )}
    <List aria-label="Ordered pieces">
      {order.orderedPieceName.map((name, at) => (
        <ListItem key={`${name}-${at}`}>
          {order.quantity[at]} × {name} in {order.orderedGlaze[at]},{' '}
          {order.orderedSize[at]} ·{' '}
          <Numeral>
            {formatINR(
              (order.orderedPrice[at] ?? 0) * (order.quantity[at] ?? 0),
            )}
          </Numeral>
        </ListItem>
      ))}
    </List>
    <DescriptionList>
      <div>
        <DescriptionTerm>Subtotal</DescriptionTerm>
        <DescriptionDetails>
          <Numeral>{formatINR(order.subtotal)}</Numeral>
        </DescriptionDetails>
      </div>
      {(order.discountTotal ?? 0) > 0 ? (
        <div>
          <DescriptionTerm>Discount</DescriptionTerm>
          <DescriptionDetails>
            <Numeral>{`−${formatINR(order.discountTotal ?? 0)}`}</Numeral>
          </DescriptionDetails>
        </div>
      ) : null}
      <div>
        <DescriptionTerm>Shipping</DescriptionTerm>
        <DescriptionDetails>
          {order.shippingTotal === 0 ? (
            'Free'
          ) : (
            <Numeral>{formatINR(order.shippingTotal)}</Numeral>
          )}
        </DescriptionDetails>
      </div>
      <div>
        <DescriptionTerm>Total</DescriptionTerm>
        <DescriptionDetails>
          <Numeral>{formatINR(order.total)}</Numeral>
        </DescriptionDetails>
      </div>
      <div>
        <DescriptionTerm>Fulfilment</DescriptionTerm>
        <DescriptionDetails>{choiceLabel(order)}</DescriptionDetails>
      </div>
      {order.fulfilmentChoice === 'courier_delivery' ? (
        <div>
          <DescriptionTerm>Delivery address</DescriptionTerm>
          <DescriptionDetails>
            {[order.deliveryAddress, order.city, order.pinCode]
              .filter(Boolean)
              .join(', ')}
          </DescriptionDetails>
        </div>
      ) : (
        <div>
          <DescriptionTerm>Pickup</DescriptionTerm>
          <DescriptionDetails>
            {STUDIO_PICKUP_ADDRESS}. {STUDIO_PICKUP_INSTRUCTIONS}
          </DescriptionDetails>
        </div>
      )}
      {showBuyer ? (
        <>
          <div>
            <DescriptionTerm>Buyer</DescriptionTerm>
            <DescriptionDetails>{order.buyerName}</DescriptionDetails>
          </div>
          <div>
            <DescriptionTerm>Phone</DescriptionTerm>
            <DescriptionDetails>
              <Numeral>{order.phoneNumber}</Numeral>
            </DescriptionDetails>
          </div>
        </>
      ) : null}
    </DescriptionList>
    <Paragraph>
      The studio will collect payment by UPI later. No online payment has been
      taken.
    </Paragraph>
  </div>
);
