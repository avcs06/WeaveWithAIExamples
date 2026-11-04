import { createPersistentStore } from '@packages/utils/state';

import { dashboardSeed } from './seed';

import type { Dashboard } from './types';

type DashboardState = { records: Dashboard[] };

/** Every Dashboard, saved in the browser so a reload keeps what the user changed. */
export const useDashboardStore = createPersistentStore<DashboardState>(
  () => ({ records: dashboardSeed }),
  'weave:20261104-0609-dashboard-editor:dashboard',
);
