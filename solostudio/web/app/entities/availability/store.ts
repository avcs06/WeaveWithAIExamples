import { createPersistentStore } from '@packages/utils/state';

import { availabilitySeed } from './seed';

import type { Availability } from './types';

type AvailabilityState = { records: Availability[] };

/** Every Availability, saved in the browser so a reload keeps what the user changed. */
export const useAvailabilityStore = createPersistentStore<AvailabilityState>(
  () => ({ records: availabilitySeed }),
  'weave:20261104-0428-freelancer-workspace:availability',
);
