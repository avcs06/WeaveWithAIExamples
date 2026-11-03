'use client';

import { NextLink } from '@app/components/NextLink';
import { CategoryOptions } from '@app/entities/enums';
import { Button, IconButton } from '@packages/ui/Button';
import { Controller, Form, FormRow } from '@packages/ui/Form';
import { Input, NumberInput } from '@packages/ui/Input';
import { Select, SelectOption } from '@packages/ui/Select';
import { Textarea } from '@packages/ui/Textarea';
import { Minus, Plus } from 'lucide-react';
import React from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import type { PieceInput } from '@app/entities/piece';

export type PieceFormValues = {
  name: string;
  description: string;
  price: number | null;
  photos: { value: string }[];
  category: string;
  glazes: { value: string }[];
  sizes: { value: string }[];
  stock: Record<string, number | null>;
};

const stockKey = (glazeIndex: number, sizeIndex: number): string =>
  `${glazeIndex}:${sizeIndex}`;

/** Empty values for adding a piece. */
export const emptyPieceValues: PieceFormValues = {
  name: '',
  description: '',
  price: null,
  photos: [{ value: '' }],
  category: '',
  glazes: [{ value: '' }],
  sizes: [{ value: '' }],
  stock: {},
};

/** Values filled from the piece being edited. */
export function pieceToValues(piece: {
  name: string;
  description?: string;
  price: number;
  photos: string[];
  category: string;
  glaze: string[];
  size: string[];
  variantStockQuantity: number[];
}): PieceFormValues {
  const stock: Record<string, number | null> = {};
  piece.glaze.forEach((_, glazeIndex) => {
    piece.size.forEach((__, sizeIndex) => {
      stock[stockKey(glazeIndex, sizeIndex)] =
        piece.variantStockQuantity[
          glazeIndex * piece.size.length + sizeIndex
        ] ?? 0;
    });
  });
  return {
    name: piece.name,
    description: piece.description ?? '',
    price: piece.price,
    photos: piece.photos.map((value) => ({ value })),
    category: piece.category,
    glazes: piece.glaze.map((value) => ({ value })),
    sizes: piece.size.map((value) => ({ value })),
    stock,
  };
}

/** Values back to the shape the piece operations save. */
function valuesToPieceInput(values: PieceFormValues): PieceInput {
  const glaze = values.glazes.map((entry) => entry.value.trim()).filter(Boolean);
  const size = values.sizes.map((entry) => entry.value.trim()).filter(Boolean);
  const variantStockQuantity: number[] = [];
  glaze.forEach((_, glazeIndex) => {
    size.forEach((__, sizeIndex) => {
      variantStockQuantity.push(
        values.stock[stockKey(glazeIndex, sizeIndex)] ?? 0,
      );
    });
  });
  return {
    name: values.name.trim(),
    description: values.description.trim() || undefined,
    price: values.price ?? 0,
    photos: values.photos.map((entry) => entry.value.trim()).filter(Boolean),
    category: values.category as PieceInput['category'],
    glaze,
    size,
    variantStockQuantity,
  };
}

const isPhotoAddress = (value: string): boolean => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * The piece form FM01: name, description, price, photos, category, glaze and
 * size variants, and the stock quantity of each variant. Adding and editing
 * share it; editing starts from the piece's current values.
 */
export const PieceForm = ({
  defaultValues,
  submitLabel,
  cancelHref,
  serverError,
  onSubmit,
}: {
  defaultValues: PieceFormValues;
  submitLabel: string;
  cancelHref: string;
  serverError?: string;
  onSubmit: (input: PieceInput) => Promise<void>;
}) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<PieceFormValues>({ defaultValues });
  const photos = useFieldArray({ control, name: 'photos' });
  const glazes = useFieldArray({ control, name: 'glazes' });
  const sizes = useFieldArray({ control, name: 'sizes' });
  const watchedGlazes = useWatch({ control, name: 'glazes' });
  const watchedSizes = useWatch({ control, name: 'sizes' });
  const glazeCount = Math.max(
    watchedGlazes.filter((entry) => entry.value.trim()).length,
    1,
  );
  const sizeCount = Math.max(
    watchedSizes.filter((entry) => entry.value.trim()).length,
    1,
  );

  return (
    <Form
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(valuesToPieceInput(values));
      })}
      error={serverError}
      actions={
        <>
          <Button
            variant="base" // Cancel is the secondary action, so it stays quiet beside Save.
            as={NextLink}
            href={cancelHref}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loadingWithReason={isSubmitting ? 'Saving the piece' : undefined}
          >
            {submitLabel}
          </Button>
        </>
      }
    >
      <Controller
        name="name"
        control={control}
        rules={{
          required: 'Enter the piece name',
          maxLength: { value: 120, message: 'Keep the name to 120 characters' },
        }}
      >
        {({ field }) => (
          <Input label="Name" autoComplete="off" {...field} />
        )}
      </Controller>
      <Controller name="description" control={control}>
        {({ field }) => (
          <Textarea
            label="Description"
            helpText="What the piece is, how it is made and how it looks."
            width="2x"
            {...field}
          />
        )}
      </Controller>
      <Controller
        name="price"
        control={control}
        rules={{
          required: 'Enter the price',
          min: { value: 1, message: 'Enter a price of at least ₹1' },
        }}
      >
        {({ field }) => (
          <NumberInput
            label="Price"
            autoComplete="off"
            allowDecimal={false}
            allowNegative={false}
            leftAddOn="₹"
            {...field}
          />
        )}
      </Controller>
      {photos.fields.map((row, at) => (
        <FormRow key={row.id}>
          <Controller
            name={`photos.${at}.value`}
            control={control}
            rules={{
              required: at === 0 ? 'Add at least one photo' : 'Enter the photo address',
              validate: (value) =>
                isPhotoAddress(value.trim()) ||
                'Enter a valid photo address starting with http',
            }}
          >
            {({ field }) => (
              <Input
                label={at === 0 ? 'Photos' : `Photo ${at + 1}`}
                type="url"
                placeholder="https://"
                autoComplete="off"
                {...field}
              />
            )}
          </Controller>
          {photos.fields.length > 1 ? (
            <IconButton
              variant="base"
              look="ghost"
              tooltip={`Remove photo ${at + 1}`}
              aria-label={`Remove photo ${at + 1}`}
              onClick={() => photos.remove(at)}
            >
              <Minus />
            </IconButton>
          ) : null}
        </FormRow>
      ))}
      <Button
        variant="base" // Adding a row is a quiet inline action, not the form's save.
        look="ghost" // Sits inside the form without drawing the eye from Save.
        leftIcon={<Plus />}
        onClick={() => photos.append({ value: '' })}
      >
        Add photo
      </Button>
      <Controller
        name="category"
        control={control}
        rules={{ required: 'Choose a category' }}
      >
        {({ field }) => (
          <Select label="Category" {...field}>
            {CategoryOptions.map((option) => (
              <SelectOption
                key={option.key}
                value={option.key}
                label={option.label}
              />
            ))}
          </Select>
        )}
      </Controller>
      {glazes.fields.map((row, at) => (
        <FormRow key={row.id}>
          <Controller
            name={`glazes.${at}.value`}
            control={control}
            rules={{
              validate: (value, values) => {
                if (value.trim()) return true;
                const entered = values.glazes.filter((entry) =>
                  entry.value.trim(),
                ).length;
                return entered > 0 || 'Enter at least one glaze';
              },
            }}
          >
            {({ field }) => (
              <Input
                label={at === 0 ? 'Glaze' : `Glaze ${at + 1}`}
                autoComplete="off"
                {...field}
              />
            )}
          </Controller>
          {glazes.fields.length > 1 ? (
            <IconButton
              variant="base"
              look="ghost"
              tooltip={`Remove glaze ${at + 1}`}
              aria-label={`Remove glaze ${at + 1}`}
              onClick={() => glazes.remove(at)}
            >
              <Minus />
            </IconButton>
          ) : null}
        </FormRow>
      ))}
      <Button
        variant="base" // Adding a row is a quiet inline action, not the form's save.
        look="ghost" // Sits inside the form without drawing the eye from Save.
        leftIcon={<Plus />}
        onClick={() => glazes.append({ value: '' })}
      >
        Add glaze
      </Button>
      {sizes.fields.map((row, at) => (
        <FormRow key={row.id}>
          <Controller
            name={`sizes.${at}.value`}
            control={control}
            rules={{
              validate: (value, values) => {
                if (value.trim()) return true;
                const entered = values.sizes.filter((entry) =>
                  entry.value.trim(),
                ).length;
                return entered > 0 || 'Enter at least one size';
              },
            }}
          >
            {({ field }) => (
              <Input
                label={at === 0 ? 'Size' : `Size ${at + 1}`}
                autoComplete="off"
                {...field}
              />
            )}
          </Controller>
          {sizes.fields.length > 1 ? (
            <IconButton
              variant="base"
              look="ghost"
              tooltip={`Remove size ${at + 1}`}
              aria-label={`Remove size ${at + 1}`}
              onClick={() => sizes.remove(at)}
            >
              <Minus />
            </IconButton>
          ) : null}
        </FormRow>
      ))}
      <Button
        variant="base" // Adding a row is a quiet inline action, not the form's save.
        look="ghost" // Sits inside the form without drawing the eye from Save.
        leftIcon={<Plus />}
        onClick={() => sizes.append({ value: '' })}
      >
        Add size
      </Button>
      {Array.from({ length: glazeCount }).map((_, glazeIndex) =>
        Array.from({ length: sizeCount }).map((__, sizeIndex) => (
          <Controller
            key={stockKey(glazeIndex, sizeIndex)}
            name={`stock.${stockKey(glazeIndex, sizeIndex)}`}
            control={control}
            rules={{
              required: 'Enter the stock',
              min: { value: 0, message: 'Enter stock of 0 or more' },
            }}
          >
            {({ field }) => (
              <NumberInput
                label={`Stock for glaze ${glazeIndex + 1}, size ${sizeIndex + 1}`}
                autoComplete="off"
                allowDecimal={false}
                allowNegative={false}
                {...field}
              />
            )}
          </Controller>
        )),
      )}
    </Form>
  );
};
