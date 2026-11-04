'use client';

import { formatSlotTime, formatSlotTitle } from '@app/blocks/Format/format';
import { LoadError } from '@app/components/LoadError';
import { NextLink } from '@app/components/NextLink';
import { NotFound } from '@app/components/NotFound';
import { PageHeader } from '@app/components/PageHeader';
import { cancelBooking, useGetBooking } from '@app/entities/booking';
import { useGetSessionType } from '@app/entities/sessionType';
import { useGetSlot } from '@app/entities/slot';
import { Button } from '@packages/ui/Button';
import { DialogResult, openConfirmationDialog } from '@packages/ui/Dialog';
import { Section } from '@packages/ui/Section';
import { toast } from '@packages/ui/Toast';
import { Truncate } from '@packages/ui/Truncate';
import { DescriptionDetails, DescriptionList, DescriptionTerm, Paragraph } from '@packages/ui/Typography';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

/**
 * S15 The booking's session type name and time: check a booking from its
 * private link and cancel only that booking.
 */
export default function MyBookingPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const booking = useGetBooking(bookingId);
  const slot = useGetSlot(booking.data?.slot ?? '');
  const sessionType = useGetSessionType(booking.data?.sessionType ?? '');
  const [busy, setBusy] = useState(false);

  if (booking.error) {
    return (
      <>
        <PageHeader title="Your booking" />
        <LoadError message="Your booking could not be loaded." onRetry={() => booking.retry()} />
      </>
    );
  }

  if (booking.loading && !booking.data) {
    return (
      <>
        <PageHeader title="Your booking" />
        <Paragraph>Loading your booking.</Paragraph>
      </>
    );
  }

  if (!booking.data) {
    return (
      <NotFound
        title="This link is not recognised."
        description="The booking may have been removed, or the link is wrong."
        back={{ label: 'Book a session', href: '/book' }}
      />
    );
  }

  const record = booking.data;
  const title = slot.data?.startAt
    ? formatSlotTitle(sessionType.data?.name ?? 'Session', slot.data.startAt)
    : 'Your booking';

  const confirmCancel = async () => {
    const result = await openConfirmationDialog({
      title: 'Cancel your booking?',
      content: `${title}. Only this booking will be cancelled and the seat will be freed.`,
      footer: (closeDialog) => (
        <>
          <Button
            variant="base" // Keeping the booking is the quiet way out.
            onClick={() => closeDialog(DialogResult.cancel)}
          >
            Cancel
          </Button>
          <Button
            variant="danger" // The filled confirm button cancels only this booking.
            onClick={() => closeDialog(DialogResult.confirm)}
          >
            Cancel booking
          </Button>
        </>
      ),
    });
    if (result !== DialogResult.confirm) return;
    setBusy(true);
    try {
      await cancelBooking(record.id, { isCancelled: true });
      toast({ title: 'Booking cancelled', status: 'success' });
    } catch {
      toast({ title: 'Cancelling failed. Try cancelling again.', status: 'error' });
    } finally {
      setBusy(false);
    }
  };

  if (record.isCancelled) {
    return (
      <>
        <PageHeader
          title={<Truncate>{title}</Truncate>}
          description="This booking was cancelled."
          actions={
            <Button as={NextLink} href="/book">
              Book another time
            </Button>
          }
        />
        <Section title="Details">
          <BookingDetails
            name={record.name}
            email={record.email}
            sessionTypeName={sessionType.data?.name ?? 'Session'}
            startAt={slot.data?.startAt}
            status="Cancelled"
          />
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={<Truncate>{title}</Truncate>}
        actions={
          <Button
            variant="danger" // Cancelling is the destructive action of this view.
            loadingWithReason={busy ? 'Cancelling your booking' : undefined}
            onClick={() => void confirmCancel()}
          >
            Cancel booking
          </Button>
        }
      />
      <Section title="Details">
        <BookingDetails
          name={record.name}
          email={record.email}
          sessionTypeName={sessionType.data?.name ?? 'Session'}
          startAt={slot.data?.startAt}
          status="Booked"
        />
      </Section>
    </>
  );
}

function BookingDetails({
  name,
  email,
  sessionTypeName,
  startAt,
  status,
}: {
  name: string;
  email: string;
  sessionTypeName: string;
  startAt?: string;
  status: string;
}) {
  return (
    <DescriptionList>
      <div>
        <DescriptionTerm>Session type</DescriptionTerm>
        <DescriptionDetails>
          <Truncate>{sessionTypeName}</Truncate>
        </DescriptionDetails>
      </div>
      <div>
        <DescriptionTerm>Time</DescriptionTerm>
        <DescriptionDetails>
          <Truncate>{startAt ? formatSlotTime(startAt) : '—'}</Truncate>
        </DescriptionDetails>
      </div>
      <div>
        <DescriptionTerm>Status</DescriptionTerm>
        <DescriptionDetails>
          <Truncate>{status}</Truncate>
        </DescriptionDetails>
      </div>
      <div>
        <DescriptionTerm>Name</DescriptionTerm>
        <DescriptionDetails>
          <Truncate>{name}</Truncate>
        </DescriptionDetails>
      </div>
      <div>
        <DescriptionTerm>Email</DescriptionTerm>
        <DescriptionDetails>
          <Truncate>{email}</Truncate>
        </DescriptionDetails>
      </div>
    </DescriptionList>
  );
}
