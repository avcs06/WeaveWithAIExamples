'use client';

import { sizeLabel } from '@app/blocks/pieces';
import { Numeral } from '@packages/ui/Numeral';
import { createTable } from '@packages/ui/Table';
import { Truncate } from '@packages/ui/Truncate';
import React from 'react';

import { rupees } from './money';

export type OrderItemRow = {
  key: string;
  title: string;
  glaze: string;
  size: string;
  quantity: number;
  price: number;
};

const ItemsTable = createTable<OrderItemRow>();

/** One order's pieces with glaze, size, quantity and price. */
export const OrderItems = ({ items }: { items: OrderItemRow[] }) => (
  <ItemsTable
    caption="Ordered pieces"
    data={items}
    rowKey={(item) => item.key}
  >
    <ItemsTable.Column
      id="title"
      rowHeader
      title="Piece"
      dataKey="title"
      width={220}
    >
      {(title) => <Truncate>{title}</Truncate>}
    </ItemsTable.Column>
    <ItemsTable.Column
      id="glaze"
      title="Glaze"
      dataKey="glaze"
      width={160}
    />
    <ItemsTable.Column id="size" title="Size" dataKey="size" width={110}>
      {(size) => sizeLabel(size)}
    </ItemsTable.Column>
    <ItemsTable.Column
      id="quantity"
      title="Quantity"
      dataKey="quantity"
      width={90}
      align="right"
    >
      {(quantity) => <Numeral>{quantity}</Numeral>}
    </ItemsTable.Column>
    <ItemsTable.Column
      id="price"
      title="Price"
      dataKey="price"
      width={130}
      align="right"
    >
      {(price) => <Numeral>{rupees.format(price)}</Numeral>}
    </ItemsTable.Column>
  </ItemsTable>
);
