'use client';

import { Paragraph } from '@packages/ui/Typography';
import React from 'react';

import type { FulfilmentChoice } from '@app/entities/enums';

export const PICKUP_ADDRESS =
  '21 Rose Quartz Lane, Johari Bazaar, Jaipur 302003';

/** The fixed studio pickup information every buyer reads. */
export const PickupInfo = () => (
  <div className="flex-col-gap-2">
    <Paragraph>
      Studio pickup is free from our Jaipur studio at {PICKUP_ADDRESS}.
      Collect your order Tuesday to Sunday, 10am to 7pm.
    </Paragraph>
    <Paragraph>
      No online payment is taken. The owner will collect payment by UPI after
      you place your order.
    </Paragraph>
  </div>
);

/** Where the order goes: the pickup address or the courier destination. */
export const FulfilmentDetails = ({
  choice,
  deliveryAddress,
  city,
  pinCode,
}: {
  choice: FulfilmentChoice;
  deliveryAddress?: string;
  city?: string;
  pinCode?: string;
}) =>
  choice === 'studio_pickup' ? (
    <PickupInfo />
  ) : (
    <div className="flex-col-gap-2">
      <Paragraph>Courier delivery to:</Paragraph>
      <Paragraph>
        {deliveryAddress}
        <br />
        {city} {pinCode}
      </Paragraph>
      <Paragraph color="muted">
        No online payment is taken. The owner will collect payment by UPI
        after you place your order.
      </Paragraph>
    </div>
  );
