import { createPersistentStore } from '@packages/utils/state';

import { discountCodeSeed } from './seed';

import type { DiscountCode } from './types';

type DiscountCodeState = { records: DiscountCode[] };

/** Every DiscountCode, saved in the browser so a reload keeps what the user changed. */
export const useDiscountCodeStore = createPersistentStore<DiscountCodeState>(
  () => ({ records: discountCodeSeed }),
  'weave:20261104-0040-ecommerce-store:discountCode',
);
