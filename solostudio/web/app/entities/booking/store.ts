import { createPersistentStore } from '@packages/utils/state';

import { bookingSeed } from './seed';

import type { Booking } from './types';

type BookingState = { records: Booking[] };

/** Every Booking, saved in the browser so a reload keeps what the user changed. */
export const useBookingStore = createPersistentStore<BookingState>(
  () => ({ records: bookingSeed }),
  'weave:20261104-0428-freelancer-workspace:booking',
);
