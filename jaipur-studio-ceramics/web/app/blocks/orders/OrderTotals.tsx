'use client';

import { Numeral } from '@packages/ui/Numeral';
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from '@packages/ui/Typography';
import React from 'react';

import { rupees } from './money';

/** The subtotal, discount, shipping and total, in rupees with no decimals. */
export const OrderTotals = ({
  subtotal,
  discountAmount = 0,
  shippingCost,
  total,
}: {
  subtotal: number;
  discountAmount?: number;
  shippingCost: number;
  total: number;
}) => (
  <DescriptionList>
    <div>
      <DescriptionTerm>Subtotal</DescriptionTerm>
      <DescriptionDetails className="text-right">
        <Numeral>{rupees.format(subtotal)}</Numeral>
      </DescriptionDetails>
    </div>
    <div>
      <DescriptionTerm>Discount</DescriptionTerm>
      <DescriptionDetails className="text-right">
        <Numeral>{rupees.format(discountAmount)}</Numeral>
      </DescriptionDetails>
    </div>
    <div>
      <DescriptionTerm>Shipping</DescriptionTerm>
      <DescriptionDetails className="text-right">
        <Numeral>{rupees.format(shippingCost)}</Numeral>
      </DescriptionDetails>
    </div>
    <div>
      <DescriptionTerm>Total</DescriptionTerm>
      <DescriptionDetails className="text-right">
        <Numeral>{rupees.format(total)}</Numeral>
      </DescriptionDetails>
    </div>
  </DescriptionList>
);
