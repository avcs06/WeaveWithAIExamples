import type { PieceCategory, Size } from '../enums';

export type Piece = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description?: string;
  price: number;
  photos: string[];
  category: PieceCategory;
  glaze: string[];
  size: Size[];
  stockQuantity: number[];
};

/** What a create takes: everything but the fields the store sets. */
export type PieceInput = Omit<Piece, 'id' | 'createdAt' | 'updatedAt'>;
