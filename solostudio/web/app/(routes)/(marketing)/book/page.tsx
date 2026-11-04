'use client';

import { formatPrice, formatSlotTime } from '@app/blocks/Format/format';
import { openSlotsFor } from '@app/blocks/Slots/slots';
import { LoadError } from '@app/components/LoadError';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { createBooking, useListBookings, type Booking } from '@app/entities/booking';
import { createClient, getClient } from '@app/entities/client';
import { useGetSessionType, useListSessionTypes, type SessionType } from '@app/entities/sessionType';
import { getSlot, useGetSlot, useListSlots } from '@app/entities/slot';
import { Button } from '@packages/ui/Button';
import { Card, CardGroup } from '@packages/ui/Card';
import { Controller, Form } from '@packages/ui/Form';
import { Input } from '@packages/ui/Input';
import { Section } from '@packages/ui/Section';
import { Truncate } from '@packages/ui/Truncate';
import { Paragraph } from '@packages/ui/Typography';
import React, { useId, useState } from 'react';
import { useForm } from 'react-hook-form';

/** One session type as a pickable card. */
function TypeOption({ sessionType }: { sessionType: SessionType }) {
  const titleId = useId();
  return (
    <Card value={sessionType.id} aria-labelledby={titleId}>
      <strong id={titleId}>
        <Truncate>{sessionType.name}</Truncate>
      </strong>
      <span>
        {sessionType.durationInMinutes} min · {formatPrice(sessionType.displayedPrice)}
      </span>
    </Card>
  );
}

/** One open slot as a pickable card. */
function SlotOption({ slotId, startAt }: { slotId: string; startAt: string }) {
  const titleId = useId();
  return (
    <Card value={slotId} aria-labelledby={titleId}>
      <strong id={titleId}>
        <Truncate>{formatSlotTime(startAt)}</Truncate>
      </strong>
    </Card>
  );
}

/** The chosen session type's duration and displayed price. */
function TypeSummary({ sessionTypeId }: { sessionTypeId: string }) {
  const sessionType = useGetSessionType(sessionTypeId);
  if (!sessionType.data) return null;
  return (
    <Paragraph>
      {sessionType.data.name} · {sessionType.data.durationInMinutes} min ·{' '}
      {formatPrice(sessionType.data.displayedPrice)}
    </Paragraph>
  );
}

/** The chosen slot's date and time, read fresh from the store. */
function SlotSummary({ slotId }: { slotId: string }) {
  const slot = useGetSlot(slotId);
  if (!slot.data) return null;
  return <Paragraph>{formatSlotTime(slot.data.startAt)}</Paragraph>;
}

type BookingFlowValues = {
  sessionType: string;
  slot: string;
  name: string;
  email: string;
};

/**
 * S14 Book a session: pick a session type and an open time, book with name
 * and email, and keep the private cancellation link.
 */
export default function BookPage() {
  const sessionTypes = useListSessionTypes();
  const slots = useListSlots();
  const bookings = useListBookings();
  const [slotGone, setSlotGone] = useState(false);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFlowValues>({ defaultValues: { sessionType: '', slot: '', name: '', email: '' } });
  const [saving, setSaving] = useState(false);

  const pickedType = watch('sessionType');
  const pickedSlot = watch('slot');

  if (sessionTypes.error ?? slots.error ?? bookings.error) {
    return (
      <>
        <PageHeader title="Book a session" />
        <LoadError
          message="The booking page could not be loaded."
          onRetry={() => {
            sessionTypes.retry();
            slots.retry();
            bookings.retry();
          }}
        />
      </>
    );
  }

  if (
    (sessionTypes.loading && sessionTypes.data.length === 0) ||
    (slots.loading && slots.data.length === 0)
  ) {
    return (
      <>
        <PageHeader
          title="Book a session"
          description="Pick a session type and an open time. No account is needed, and nobody pays in the app. Displayed prices are shown for information only."
        />
        <Paragraph>Loading booking options.</Paragraph>
      </>
    );
  }

  if (sessionTypes.data.length === 0) {
    return (
      <>
        <PageHeader
          title="Book a session"
          description="Pick a session type and an open time. No account is needed, and nobody pays in the app. Displayed prices are shown for information only."
        />
        <Paragraph>No sessions are currently offered. Please check back later.</Paragraph>
      </>
    );
  }

  if (confirmed) {
    return (
      <>
        <PageHeader
          title="Book a session"
          description="Pick a session type and an open time. No account is needed, and nobody pays in the app. Displayed prices are shown for information only."
        />
        <Section title="You're booked.">
          <div className="flex-col-gap-3 items-start">
            <TypeSummary sessionTypeId={confirmed.sessionType} />
            <SlotSummary slotId={confirmed.slot} />
            <Paragraph>
              Keep this private cancellation link. It is the only way back to your booking, as no
              email is sent.
            </Paragraph>
            <NextLink href={`/my-booking/${confirmed.id}`}>
              {`Your booking: ${confirmed.id}`}
            </NextLink>
            <Button
              variant="base" // Starting over is the quiet way out after booking.
              onClick={() => setConfirmed(null)}
            >
              Book another session
            </Button>
          </div>
        </Section>
      </>
    );
  }

  const open = pickedType
    ? openSlotsFor(slots.data, bookings.data, sessionTypes.data, pickedType)
    : [];

  const confirm = async (values: BookingFlowValues) => {
    setSaving(true);
    try {
      // The slot may have filled or gone since it was picked.
      const current = await getSlot(values.slot);
      const stillOpen =
        current &&
        openSlotsFor(slots.data, bookings.data, sessionTypes.data, values.sessionType).some(
          (slot) => slot.id === values.slot,
        );
      if (!stillOpen) {
        setValue('slot', '');
        setSlotGone(true);
        return;
      }
      const name = values.name.trim();
      const email = values.email.trim();
      const existing = await getClient(email);
      const clientId = existing?.id ?? (await createClient({ name, email, status: 'lead' })).id;
      const booking = await createBooking({
        name,
        email,
        sessionType: values.sessionType,
        slot: values.slot,
        client: clientId,
      });
      setConfirmed(booking);
    } catch {
      setError('root.server', { message: 'Creating the booking failed. Try again.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Book a session"
        description="Pick a session type and an open time. No account is needed, and nobody pays in the app. Displayed prices are shown for information only."
      />
      <Form
        onSubmit={(event) => {
          clearErrors('root');
          void handleSubmit(confirm)(event);
        }}
        error={errors.root?.server?.message}
        actions={
          pickedSlot ? (
            <>
              <Button
                variant="base" // Choosing another time is the quiet way out.
                onClick={() => {
                  setValue('slot', '');
                  setSlotGone(false);
                }}
              >
                Choose another time
              </Button>
              <Button
                type="submit"
                loadingWithReason={saving || isSubmitting ? 'Confirming your booking' : undefined}
              >
                Confirm booking
              </Button>
            </>
          ) : null
        }
      >
        <Controller
          name="sessionType"
          control={control}
          rules={{ required: 'Choose a session type' }}
        >
          {({ field }) => (
            <CardGroup
              mode="single"
              label="Session type"
              {...field}
              onChange={(next) => {
                field.onChange(next);
                setValue('slot', '');
                setSlotGone(false);
              }}
              className="flex-row-gap-3 flex-wrap"
            >
              {sessionTypes.data.map((sessionType) => (
                <TypeOption key={sessionType.id} sessionType={sessionType} />
              ))}
            </CardGroup>
          )}
        </Controller>
        {pickedType &&
          (open.length === 0 ? (
            <>
              <Paragraph>There are no open times for this session type in the next two weeks.</Paragraph>
              <Paragraph color="muted">Pick another session type to see its open times.</Paragraph>
            </>
          ) : (
            <Controller
              name="slot"
              control={control}
              rules={{ required: 'Choose an open time' }}
            >
              {({ field }) => (
                <CardGroup
                  mode="single"
                  label="Open times"
                  {...field}
                  className="flex-row-gap-3 flex-wrap"
                >
                  {open.map((slot) => (
                    <SlotOption key={slot.id} slotId={slot.id} startAt={slot.startAt} />
                  ))}
                </CardGroup>
              )}
            </Controller>
          ))}
        {slotGone && pickedSlot === '' && open.length > 0 && (
          <Paragraph>That time is no longer open.</Paragraph>
        )}
        {pickedSlot && (
          <>
            <TypeSummary sessionTypeId={pickedType} />
            <SlotSummary slotId={pickedSlot} />
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Enter your name' }}
            >
              {({ field }) => <Input label="Name" autoComplete="name" {...field} />}
            </Controller>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Enter your email',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Enter an email like name@example.com',
                },
              }}
            >
              {({ field }) => <Input label="Email" type="email" autoComplete="email" {...field} />}
            </Controller>
          </>
        )}
      </Form>
    </>
  );
}
