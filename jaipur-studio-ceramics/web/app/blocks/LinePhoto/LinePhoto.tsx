'use client';

import { Image } from '@packages/ui/Image';
import React from 'react';

/** One ordered line's photo. The screen loads the piece and passes its photo. */
export const LinePhoto = ({
  photo,
  name,
}: {
  photo: string | undefined;
  name: string;
}) => {
  if (!photo) return null;
  return (
    <Image
      src={photo}
      alt={`Photo of ${name}`}
      width={120}
      height={90}
      fit="cover"
    />
  );
};
