import { createPersistentStore } from '@packages/utils/state';

import { orderSeed } from './seed';

import type { Order } from './types';

type OrderState = { records: Order[] };

/** Every Order, saved in the browser so a reload keeps what the user changed. */
export const useOrderStore = createPersistentStore<OrderState>(
  () => ({ records: orderSeed }),
  'weave:20261103-1640-ecommerce-store:order',
);
