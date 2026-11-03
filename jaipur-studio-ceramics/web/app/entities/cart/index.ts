import { createStore } from '@packages/utils/state';

export type CartLine = {
  pieceId: string;
  glaze: string;
  size: string;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
};

// The guest's cart this session. The frames load no records, so the frame
// parts read only the line count through the hook below; the cart, checkout
// and confirmation screens own the cart's lines and totals.
const useCartStore = createStore<CartState>(() => ({ lines: [] }));

/** How many cart lines the cart holds. */
export function useCartLineCount(): number {
  return useCartStore((state) => state.lines.length);
}

/** The cart's lines in the order they were added. */
export function useCartLines(): CartLine[] {
  return useCartStore((state) => state.lines);
}

/** Add a variant to the cart, merging with a line for the same variant. */
export function addCartLine(line: CartLine): void {
  useCartStore.setState(({ lines }) => {
    const at = lines.findIndex(
      (entry) =>
        entry.pieceId === line.pieceId &&
        entry.glaze === line.glaze &&
        entry.size === line.size,
    );
    if (at === -1) return { lines: [...lines, line] };
    return {
      lines: lines.map((entry, index) =>
        index === at
          ? { ...entry, quantity: entry.quantity + line.quantity }
          : entry,
      ),
    };
  });
}

/** Change one line's quantity. */
export function updateCartLine(index: number, quantity: number): void {
  useCartStore.setState(({ lines }) => ({
    lines: lines.map((entry, at) =>
      at === index ? { ...entry, quantity } : entry,
    ),
  }));
}

/** Remove one line from the cart. */
export function removeCartLine(index: number): void {
  useCartStore.setState(({ lines }) => ({
    lines: lines.filter((_, at) => at !== index),
  }));
}

/** Empty the cart, such as after placing an order. */
export function clearCart(): void {
  useCartStore.setState({ lines: [] });
}
