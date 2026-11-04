import { createPersistentStore } from '@packages/utils/state';

import { clientSeed } from './seed';

import type { Client } from './types';

type ClientState = { records: Client[] };

/** Every Client, saved in the browser so a reload keeps what the user changed. */
export const useClientStore = createPersistentStore<ClientState>(
  () => ({ records: clientSeed }),
  'weave:20261104-0428-freelancer-workspace:client',
);
