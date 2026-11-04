import { SizeOptions } from '@app/entities/enums';

import type { Piece } from '@app/entities/piece';

/** One glaze-and-size variant: the parallel arrays pair up by index. */
export type PieceVariant = {
  index: number;
  glaze: string;
  size: string;
  stock: number;
};

export function pieceVariants(piece: Piece): PieceVariant[] {
  const count = Math.min(
    piece.glaze.length,
    piece.size.length,
    piece.stockQuantity.length,
  );
  return Array.from({ length: count }, (_, index) => ({
    index,
    glaze: piece.glaze[index],
    size: piece.size[index],
    stock: piece.stockQuantity[index],
  }));
}

export function findVariant(
  piece: Piece,
  glaze: string,
  size: string,
): PieceVariant | undefined {
  return pieceVariants(piece).find(
    (variant) => variant.glaze === glaze && variant.size === size,
  );
}

/** How many are left across every variant. */
export function pieceStockTotal(piece: Piece): number {
  return pieceVariants(piece).reduce((sum, variant) => sum + variant.stock, 0);
}

export function isSoldOut(piece: Piece): boolean {
  const variants = pieceVariants(piece);
  return variants.length > 0 && variants.every((variant) => variant.stock <= 0);
}

/** The label a buyer reads for a stored size key. */
export function sizeLabel(size: string): string {
  return SizeOptions.find((option) => option.key === size)?.label ?? size;
}
