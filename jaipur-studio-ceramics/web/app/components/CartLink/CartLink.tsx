'use client';

import { NextLink } from '@app/components/NextLink';
import { useCartLineCount } from '@app/entities/cart';
import { Tag } from '@packages/ui/Tag';
import React from 'react';

/**
 * The header's cart link: opens /cart and shows how many cart lines it
 * holds.
 */
export const CartLink = () => {
  const count = useCartLineCount();

  return (
    <NextLink
      href="/cart"
      look="plain"
      aria-label={
        count === 0 ? 'Cart' : `Cart, ${count} ${count === 1 ? 'line' : 'lines'}`
      }
    >
      Cart{count > 0 ? (
        <>
          {' '}
          <Tag>{count}</Tag>
        </>
      ) : null}
    </NextLink>
  );
};
