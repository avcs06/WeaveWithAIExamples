import { createPersistentStore } from '@packages/utils/state';

import { discountCodeSeed } from './seed';

import type { DiscountCode } from './types';

type DiscountCodeState = { records: DiscountCode[] };

/** Every DiscountCode, saved in the browser so a reload keeps what the user changed. */
export const useDiscountCodeStore = createPersistentStore<DiscountCodeState>(
  () => ({ records: discountCodeSeed }),
  'weave:20261103-1640-ecommerce-store:discountCode',
);
