'use client';

import { LinePhoto } from '@app/blocks/LinePhoto';
import { useGetPiece } from '@app/entities/piece';
import React from 'react';

/** One order line's photo, loaded through getPiece in this route folder. */
export const OrderLinePhoto = ({
  pieceId,
  name,
}: {
  pieceId: string;
  name: string;
}) => {
  const { data: piece } = useGetPiece(pieceId);
  return <LinePhoto photo={piece?.photos[0]} name={name} />;
};
