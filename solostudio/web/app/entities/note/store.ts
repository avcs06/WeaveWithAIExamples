import { createPersistentStore } from '@packages/utils/state';

import { noteSeed } from './seed';

import type { Note } from './types';

type NoteState = { records: Note[] };

/** Every Note, saved in the browser so a reload keeps what the user changed. */
export const useNoteStore = createPersistentStore<NoteState>(
  () => ({ records: noteSeed }),
  'weave:20261104-0428-freelancer-workspace:note',
);
