'use client';

import { NextLink } from '@app/components/NextLink';
import { Numeral } from '@packages/ui/Numeral';
import { ShoppingCart } from 'lucide-react';
import React from 'react';

import { useCartStore } from './store';

const rupees = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/**
 * The header's cart: opens the cart, with the count and total while the cart
 * holds items. The cart lives in the browser, so it survives a refresh.
 */
export const CartLink = () => {
  const count = useCartStore(({ lines }) =>
    lines.reduce((sum, line) => sum + line.quantity, 0),
  );
  const total = useCartStore(({ lines }) =>
    lines.reduce((sum, line) => sum + line.price * line.quantity, 0),
  );

  return (
    <NextLink
      look="plain"
      href="/cart"
      className="inline-flex-row-gap-2 items-center"
    >
      <ShoppingCart className="icon-size-body" />
      <span>
        Cart
        {count > 0 && (
          <>
            {' · '}
            {count} {count === 1 ? 'item' : 'items'}
            {' · '}
            <Numeral>{rupees.format(total)}</Numeral>
          </>
        )}
      </span>
    </NextLink>
  );
};
