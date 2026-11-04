'use client';

import { LoadError } from '@app/components/LoadError';
import { PageHeader } from '@app/components/PageHeader';
import {
  createAvailability,
  deleteAvailability,
  updateAvailability,
  useGetAvailability,
  useListAvailabilities,
  type Availability,
} from '@app/entities/availability';
import { DayOfWeekOptions } from '@app/entities/enums';
import { Button } from '@packages/ui/Button';
import { Controller, Form } from '@packages/ui/Form';
import { FormControl } from '@packages/ui/FormControl';
import { MultiSelect, SelectOption } from '@packages/ui/Select';
import { toast } from '@packages/ui/Toast';
import { Truncate } from '@packages/ui/Truncate';
import { DescriptionDetails, DescriptionList, DescriptionTerm, Paragraph } from '@packages/ui/Typography';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type AvailabilityFormValues = {
  days: string[];
  fromTime: string;
  toTime: string;
};

const dayLabel = (day: string) => DayOfWeekOptions.find((option) => option.key === day)?.label ?? day;

function ruleSummary(record: Availability): string {
  const days = (record.days ?? []).map(dayLabel).join(', ');
  if (!days) return 'No days';
  if (record.fromTime && record.toTime) return `${days} · ${record.fromTime}–${record.toTime}`;
  return days;
}

/**
 * S09 Availability: see and set the weekly days and hours that can be booked.
 * The saved rules show as a weekly summary; saving sets one weekly days and
 * hours, which replaces the saved rules.
 */
export default function AvailabilityPage() {
  const list = useListAvailabilities();
  const primaryId = list.data[0]?.id ?? '';
  const primary = useGetAvailability(primaryId);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const loading = list.loading || primary.loading;
  const failed = list.error ?? primary.error;
  if (failed) {
    return (
      <>
        <PageHeader title="Availability" />
        <LoadError
          message="The availability could not be loaded."
          onRetry={() => {
            list.retry();
            primary.retry();
          }}
        />
      </>
    );
  }

  if (loading && list.data.length === 0) {
    return (
      <>
        <PageHeader title="Availability" />
        <Paragraph>Loading availability.</Paragraph>
      </>
    );
  }

  const rules = list.data.filter((record) => (record.days ?? []).length > 0);
  const saved = primary.data;

  const done = async (values: AvailabilityFormValues) => {
    setSaving(true);
    try {
      const changes = {
        days: (values.days ?? []) as Availability['days'],
        fromTime: values.fromTime || undefined,
        toTime: values.toTime || undefined,
      };
      if (saved) {
        await updateAvailability(saved.id, changes);
        for (const record of list.data.filter((entry) => entry.id !== saved.id)) {
          await deleteAvailability(record.id);
        }
      } else {
        await createAvailability(changes);
      }
      toast({ title: 'Availability saved', status: 'success' });
      setEditing(false);
    } catch {
      toast({ title: 'Could not save the availability', status: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Availability"
        description="The weekly days and hours guests can book."
        actions={
          !editing ? (
            <Button onClick={() => setEditing(true)}>
              Edit
            </Button>
          ) : undefined
        }
      />
      {editing ? (
        <AvailabilityEditor
          key={saved?.id ?? 'new'}
          initial={{
            days: saved?.days ?? [],
            fromTime: saved?.fromTime ?? '',
            toTime: saved?.toTime ?? '',
          }}
          saving={saving}
          onCancel={() => setEditing(false)}
          onDone={(values) => void done(values)}
        />
      ) : (
        <div className="flex-col-gap-3 items-start">
          {rules.length === 0 ? (
            <Paragraph>No days set yet. No slots are offered until hours are set.</Paragraph>
          ) : (
            <DescriptionList>
              {rules.map((record) => (
                <div key={record.id}>
                  <DescriptionTerm>Open hours</DescriptionTerm>
                  <DescriptionDetails>
                    <Truncate>{ruleSummary(record)}</Truncate>
                  </DescriptionDetails>
                </div>
              ))}
            </DescriptionList>
          )}
          <Paragraph color="muted">
            Changing availability affects slots offered afterwards and does not move or cancel bookings
            already made.
          </Paragraph>
        </div>
      )}
    </>
  );
}

function AvailabilityEditor({
  initial,
  saving,
  onCancel,
  onDone,
}: {
  initial: AvailabilityFormValues;
  saving: boolean;
  onCancel: () => void;
  onDone: (values: AvailabilityFormValues) => void;
}) {
  const { control, handleSubmit } = useForm<AvailabilityFormValues>({ defaultValues: initial });

  return (
    <Form
      onSubmit={handleSubmit(onDone)}
      actions={
        <>
          <Button
            variant="base" // Cancel is the secondary action beside the main Done.
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" loadingWithReason={saving ? 'Saving the availability' : undefined}>
            Done
          </Button>
        </>
      }
    >
      <Controller
        name="days"
        control={control}
        rules={{ deps: ['fromTime', 'toTime'] }}
      >
        {({ field }) => (
          <MultiSelect label="Days" {...field}>
            {DayOfWeekOptions.map((option) => (
              <SelectOption key={option.key} value={option.key} label={option.label} />
            ))}
          </MultiSelect>
        )}
      </Controller>
      <Controller
        name="fromTime"
        control={control}
        rules={{
          deps: ['toTime'],
          validate: (value, { days }) =>
            days.length === 0 || value ? true : 'Enter the start time',
        }}
      >
        {({ field: { value, onChange, onBlur, ...field } }) => (
          <FormControl label="From time" {...field}>
            {({ isDisabled, ...controlProps }) => (
              <input
                {...controlProps}
                type="time"
                value={value}
                readOnly={isDisabled}
                onChange={(event) => {
                  if (!isDisabled) onChange(event.target.value);
                }}
                onBlur={onBlur}
              />
            )}
          </FormControl>
        )}
      </Controller>
      <Controller
        name="toTime"
        control={control}
        rules={{
          validate: (value, { days, fromTime }) => {
            if (days.length === 0) return true;
            if (!value) return 'Enter the end time';
            if (fromTime && value <= fromTime) return 'End time must be after start time';
            return true;
          },
        }}
      >
        {({ field: { value, onChange, onBlur, ...field } }) => (
          <FormControl label="To time" {...field}>
            {({ isDisabled, ...controlProps }) => (
              <input
                {...controlProps}
                type="time"
                value={value}
                readOnly={isDisabled}
                onChange={(event) => {
                  if (!isDisabled) onChange(event.target.value);
                }}
                onBlur={onBlur}
              />
            )}
          </FormControl>
        )}
      </Controller>
    </Form>
  );
}
