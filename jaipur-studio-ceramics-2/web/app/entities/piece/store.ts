import { createPersistentStore } from '@packages/utils/state';

import { pieceSeed } from './seed';

import type { Piece } from './types';

type PieceState = { records: Piece[] };

/** Every Piece, saved in the browser so a reload keeps what the user changed. */
export const usePieceStore = createPersistentStore<PieceState>(
  () => ({ records: pieceSeed }),
  'weave:20261104-0040-ecommerce-store:piece',
);
