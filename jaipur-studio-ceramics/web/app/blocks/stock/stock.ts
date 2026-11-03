import type { Piece } from '@app/entities/piece';

/** A variant shows a low-stock warning at this many pieces left. */
export const LOW_STOCK_AT = 3;

export type VariantCombo = {
  glaze: string;
  glazeIndex: number;
  size: string;
  sizeIndex: number;
  stock: number;
};

/** Every glaze-and-size variant of a piece with its stock left. */
export function variantCombos(piece: Piece): VariantCombo[] {
  const combos: VariantCombo[] = [];
  piece.glaze.forEach((glaze, glazeIndex) => {
    piece.size.forEach((size, sizeIndex) => {
      combos.push({
        glaze,
        glazeIndex,
        size,
        sizeIndex,
        stock:
          piece.variantStockQuantity[glazeIndex * piece.size.length + sizeIndex] ??
          0,
      });
    });
  });
  return combos;
}

/** How many are left for one glaze-and-size variant. */
export function stockFor(
  piece: Piece,
  glaze: string,
  size: string,
): number | undefined {
  const glazeIndex = piece.glaze.indexOf(glaze);
  const sizeIndex = piece.size.indexOf(size);
  if (glazeIndex === -1 || sizeIndex === -1) return undefined;
  return (
    piece.variantStockQuantity[glazeIndex * piece.size.length + sizeIndex] ?? 0
  );
}

/** How many are left across all variants of a piece. */
export function pieceTotalStock(piece: Piece): number {
  return piece.variantStockQuantity.reduce((sum, left) => sum + left, 0);
}

export function isSoldOut(stock: number): boolean {
  return stock <= 0;
}

export function isLowStock(stock: number): boolean {
  return stock > 0 && stock <= LOW_STOCK_AT;
}

/** Honest availability beside a piece or a variant. */
export function availabilityLabel(stock: number): string {
  return isSoldOut(stock) ? 'Sold out' : `${stock} left`;
}

/**
 * The stock array after an order's lines change it: sign -1 reduces stock
 * when an order is placed, +1 restores it when an order is cancelled.
 */
export function stockAfterOrderLines(
  piece: Piece,
  lines: { glaze: string; size: string; quantity: number }[],
  sign: -1 | 1,
): number[] {
  const next = [...piece.variantStockQuantity];
  for (const line of lines) {
    const glazeIndex = piece.glaze.indexOf(line.glaze);
    const sizeIndex = piece.size.indexOf(line.size);
    if (glazeIndex === -1 || sizeIndex === -1) continue;
    const at = glazeIndex * piece.size.length + sizeIndex;
    next[at] = Math.max(0, (next[at] ?? 0) + sign * line.quantity);
  }
  return next;
}
