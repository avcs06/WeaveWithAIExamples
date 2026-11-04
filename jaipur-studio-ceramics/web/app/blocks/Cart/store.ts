import { createPersistentStore } from '@packages/utils/state';

/** One variant in the browser-kept cart: price is the snapshot from when it was added. */
export type CartLine = {
  pieceId: string;
  title: string;
  glaze: string;
  size: string;
  price: number;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
  addLine: (line: Omit<CartLine, 'quantity'> & { quantity?: number }) => void;
  setQuantity: (
    pieceId: string,
    glaze: string,
    size: string,
    quantity: number,
  ) => void;
  removeLine: (pieceId: string, glaze: string, size: string) => void;
  clearLines: () => void;
};

const sameLine = (
  line: CartLine,
  pieceId: string,
  glaze: string,
  size: string,
) =>
  line.pieceId === pieceId && line.glaze === glaze && line.size === size;

/** The buyer's cart, kept in the browser so a refresh keeps it. Only the lines are saved. */
export const useCartStore = createPersistentStore<CartState>(
  (set) => ({
    lines: [],
    addLine: (line) =>
      set(({ lines }) => ({
        lines: lines.some((entry) =>
          sameLine(entry, line.pieceId, line.glaze, line.size),
        )
          ? lines.map((entry) =>
              sameLine(entry, line.pieceId, line.glaze, line.size)
                ? { ...entry, quantity: entry.quantity + (line.quantity ?? 1) }
                : entry,
            )
          : [...lines, { ...line, quantity: line.quantity ?? 1 }],
      })),
    setQuantity: (pieceId, glaze, size, quantity) =>
      set(({ lines }) => ({
        lines:
          quantity <= 0
            ? lines.filter(
                (entry) => !sameLine(entry, pieceId, glaze, size),
              )
            : lines.map((entry) =>
                sameLine(entry, pieceId, glaze, size)
                  ? { ...entry, quantity }
                  : entry,
              ),
      })),
    removeLine: (pieceId, glaze, size) =>
      set(({ lines }) => ({
        lines: lines.filter(
          (entry) => !sameLine(entry, pieceId, glaze, size),
        ),
      })),
    clearLines: () => set({ lines: [] }),
  }),
  'weave:20261104-0040-ecommerce-store:cart',
  ['lines'],
);
