import { createPersistentStore } from '@packages/utils/state';

import { sessionTypeSeed } from './seed';

import type { SessionType } from './types';

type SessionTypeState = { records: SessionType[] };

/** Every SessionType, saved in the browser so a reload keeps what the user changed. */
export const useSessionTypeStore = createPersistentStore<SessionTypeState>(
  () => ({ records: sessionTypeSeed }),
  'weave:20261104-0428-freelancer-workspace:sessionType',
);
