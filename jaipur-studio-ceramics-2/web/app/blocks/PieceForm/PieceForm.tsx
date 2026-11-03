'use client';

import { NextLink } from '@app/components/NextLink';
import {
  PieceCategoryOptions,
  SizeOptions,
} from '@app/entities/enums';
import { Button, IconButton } from '@packages/ui/Button';
import { Chip, ChipGroup } from '@packages/ui/Chip';
import {
  Controller,
  Form,
  FormRow,
} from '@packages/ui/Form';
import { Input, NumberInput } from '@packages/ui/Input';
import { Textarea } from '@packages/ui/Textarea';
import { Plus, Trash2 } from 'lucide-react';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export type PieceVariantValue = {
  glaze: string;
  size: string;
  stockQuantity: number | null;
};

export type PieceFormValues = {
  title: string;
  description: string;
  price: number | null;
  photos: { url: string }[];
  category: string;
  variants: PieceVariantValue[];
};

export const emptyPieceForm: PieceFormValues = {
  title: '',
  description: '',
  price: null,
  photos: [{ url: '' }],
  category: '',
  variants: [{ glaze: '', size: '', stockQuantity: null }],
};

const HTTP_URL = /^https?:\/\/.+/;

/**
 * The piece form (FM01): details, photos and one row per glaze-and-size
 * variant. Used when adding a piece and when editing one.
 */
export const PieceForm = ({
  defaultValues,
  submitLabel,
  savingLabel,
  cancelHref,
  failureMessage,
  onSubmit,
}: {
  defaultValues: PieceFormValues;
  submitLabel: string;
  savingLabel: string;
  cancelHref: string;
  failureMessage: string;
  onSubmit: (values: PieceFormValues) => Promise<void>;
}) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PieceFormValues>({ defaultValues });

  const photos = useFieldArray({ control, name: 'photos' });
  const variants = useFieldArray({ control, name: 'variants' });

  const save = async (values: PieceFormValues) => {
    try {
      await onSubmit(values);
    } catch {
      setError('root', { message: failureMessage });
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(save)}
      error={errors.root?.message}
      actions={
        <>
          <Button
            // Cancel keeps its quiet styling beside the main save.
            variant="base"
            as={NextLink}
            href={cancelHref}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loadingWithReason={isSubmitting ? savingLabel : undefined}
          >
            {submitLabel}
          </Button>
        </>
      }
    >
      <Controller
        name="title"
        control={control}
        rules={{ required: 'Enter the title' }}
      >
        {({ field }) => (
          <Input label="Title" autoComplete="off" {...field} />
        )}
      </Controller>
      <Controller name="description" control={control}>
        {({ field }) => (
          <Textarea
            label="Description"
            rows={4}
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
          min: { value: 1, message: 'The price must be at least ₹1' },
        }}
      >
        {({ field }) => (
          <NumberInput
            label="Price"
            autoComplete="off"
            allowDecimal={false}
            min={0}
            leftAddOn="₹"
            {...field}
          />
        )}
      </Controller>
      <Controller
        name="category"
        control={control}
        rules={{ required: 'Choose a category' }}
      >
        {({ field }) => (
          <ChipGroup
            // Four visible choices take chips, not a select.
            label="Category"
            {...field}
            className="flex-row-gap-2 flex-wrap"
          >
            {PieceCategoryOptions.map((option) => (
              <Chip key={option.key} value={option.key}>
                {option.label}
              </Chip>
            ))}
          </ChipGroup>
        )}
      </Controller>
      <div className="flex-col-gap-2">
        <span>Photos</span>
        {photos.fields.map((photo, index) => (
          <FormRow key={photo.id}>
            <Controller
              name={`photos.${index}.url`}
              control={control}
              rules={{
                required: 'Add at least one photo',
                pattern: {
                  value: HTTP_URL,
                  message: 'Enter a photo address starting with http',
                },
              }}
            >
              {({ field }) => (
                <Input
                  label={`Photo ${index + 1}`}
                  type="url"
                  autoComplete="off"
                  placeholder="https://"
                  {...field}
                />
              )}
            </Controller>
            <IconButton
              // The remove sits beside its row, quiet like other row actions.
              look="ghost"
              tooltip="Remove photo"
              aria-label={`Remove photo ${index + 1}`}
              disabledWithReason={
                photos.fields.length <= 1
                  ? 'A piece needs at least one photo'
                  : undefined
              }
              onClick={() => photos.remove(index)}
            >
              <Trash2 />
            </IconButton>
          </FormRow>
        ))}
        <div>
          <Button
            // Adding another photo is secondary to saving the piece.
            variant="base"
            leftIcon={<Plus />}
            onClick={() => photos.append({ url: '' })}
          >
            Add photo
          </Button>
        </div>
      </div>
      <div className="flex-col-gap-2">
        <span>Variants</span>
        {variants.fields.map((variant, index) => (
          <FormRow key={variant.id}>
            <Controller
              name={`variants.${index}.glaze`}
              control={control}
              rules={{ required: 'Enter the glaze' }}
            >
              {({ field }) => (
                <Input label="Glaze" autoComplete="off" {...field} />
              )}
            </Controller>
            <Controller
              name={`variants.${index}.size`}
              control={control}
              rules={{ required: 'Choose a size' }}
            >
              {({ field }) => (
                <ChipGroup
                  // Three visible sizes take chips, not a select.
                  aria-label={`Size of variant ${index + 1}`}
                  {...field}
                  className="flex-row-gap-2 flex-wrap"
                >
                  {SizeOptions.map((option) => (
                    <Chip key={option.key} value={option.key}>
                      {option.label}
                    </Chip>
                  ))}
                </ChipGroup>
              )}
            </Controller>
            <Controller
              name={`variants.${index}.stockQuantity`}
              control={control}
              rules={{
                required: 'Enter the stock',
                min: { value: 0, message: 'Stock cannot be negative' },
              }}
            >
              {({ field }) => (
                <NumberInput
                  label="Stock left"
                  autoComplete="off"
                  allowDecimal={false}
                  min={0}
                  {...field}
                />
              )}
            </Controller>
            <IconButton
              // The remove sits beside its row, quiet like other row actions.
              look="ghost"
              tooltip="Remove variant"
              aria-label={`Remove variant ${index + 1}`}
              disabledWithReason={
                variants.fields.length <= 1
                  ? 'A piece needs at least one variant'
                  : undefined
              }
              onClick={() => variants.remove(index)}
            >
              <Trash2 />
            </IconButton>
          </FormRow>
        ))}
        <div>
          <Button
            // Adding another variant is secondary to saving the piece.
            variant="base"
            leftIcon={<Plus />}
            onClick={() => variants.append({ glaze: '', size: '', stockQuantity: null })}
          >
            Add variant
          </Button>
        </div>
      </div>
    </Form>
  );
};
