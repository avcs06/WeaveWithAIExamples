import { createPersistentStore } from '@packages/utils/state';

import { projectSeed } from './seed';

import type { Project } from './types';

type ProjectState = { records: Project[] };

/** Every Project, saved in the browser so a reload keeps what the user changed. */
export const useProjectStore = createPersistentStore<ProjectState>(
  () => ({ records: projectSeed }),
  'weave:20261104-0428-freelancer-workspace:project',
);
