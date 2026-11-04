import { createPersistentStore } from '@packages/utils/state';

import { slotSeed } from './seed';

import type { Slot } from './types';

type SlotState = { records: Slot[] };

/** Every Slot, saved in the browser so a reload keeps what the user changed. */
export const useSlotStore = createPersistentStore<SlotState>(
  () => ({ records: slotSeed }),
  'weave:20261104-0428-freelancer-workspace:slot',
);
