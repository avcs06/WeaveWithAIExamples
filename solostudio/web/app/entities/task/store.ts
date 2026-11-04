import { createPersistentStore } from '@packages/utils/state';

import { taskSeed } from './seed';

import type { Task } from './types';

type TaskState = { records: Task[] };

/** Every Task, saved in the browser so a reload keeps what the user changed. */
export const useTaskStore = createPersistentStore<TaskState>(
  () => ({ records: taskSeed }),
  'weave:20261104-0428-freelancer-workspace:task',
);
