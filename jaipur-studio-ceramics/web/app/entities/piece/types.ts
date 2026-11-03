import type { Category } from '../enums';

export type Piece = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description?: string;
  price: number;
  photos: string[];
  category: Category;
  glaze: string[];
  size: string[];
  variantStockQuantity: number[];
};

/** What a create takes: everything but the fields the store sets. */
export type PieceInput = Omit<Piece, 'id' | 'createdAt' | 'updatedAt'>;
