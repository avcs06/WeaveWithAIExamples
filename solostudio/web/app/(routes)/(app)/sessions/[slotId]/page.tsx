'use client';

import { formatSlotTitle } from '@app/blocks/Format/format';
import { bookingsForSlot } from '@app/blocks/Slots/slots';
import { LoadError } from '@app/components/LoadError';
import { NotFound } from '@app/components/NotFound';
import { PageHeader } from '@app/components/PageHeader';
import { deleteBooking, useListBookings } from '@app/entities/booking';
import { useGetSessionType } from '@app/entities/sessionType';
import { deleteSlot, getSlot, useGetSlot } from '@app/entities/slot';
import { Button } from '@packages/ui/Button';
import { DialogResult, openConfirmationDialog } from '@packages/ui/Dialog';
import { Section } from '@packages/ui/Section';
import { toast } from '@packages/ui/Toast';
import { Truncate } from '@packages/ui/Truncate';
import { DescriptionDetails, DescriptionList, DescriptionTerm, Paragraph } from '@packages/ui/Typography';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { SlotBookings, SlotSeatCount, SlotSessionLine } from './components/SlotBookings';

/**
 * S12 The slot's session type name and time: who booked a time slot and
 * for what.
 */
export default function SlotPage() {
  const router = useRouter();
  const { slotId } = useParams<{ slotId: string }>();
  const slot = useGetSlot(slotId);
  const bookings = useListBookings();
  const sessionType = useGetSessionType(slot.data?.sessionType ?? '');
  const [busy, setBusy] = useState(false);

  const loading = slot.loading || bookings.loading || sessionType.loading;
  const failed = slot.error ?? bookings.error ?? sessionType.error;
  if (failed) {
    return (
      <>
        <PageHeader title="Session" breadcrumb={[{ label: 'Sessions', href: '/sessions' }]} />
        <LoadError
          message="The session could not be loaded."
          onRetry={() => {
            slot.retry();
            bookings.retry();
            sessionType.retry();
          }}
        />
      </>
    );
  }

  if (loading && !slot.data) {
    return (
      <>
        <PageHeader title="Session" breadcrumb={[{ label: 'Sessions', href: '/sessions' }]} />
        <Paragraph>Loading session.</Paragraph>
      </>
    );
  }

  if (!slot.data) {
    return (
      <NotFound
        title="This session is gone."
        description="It may have been cancelled, or the link is wrong."
        back={{ label: 'Back to sessions', href: '/sessions' }}
      />
    );
  }

  const record = slot.data;
  const held = bookingsForSlot(bookings.data, record.id);
  const title = formatSlotTitle(sessionType.data?.name ?? 'Session', record.startAt);

  const confirmCancelSlot = async () => {
    const result = await openConfirmationDialog({
      title: 'Cancel this session?',
      content: `${title}. Cancelling the slot cancels every booking on it.`,
      status: 'error',
      footer: (closeDialog) => (
        <>
          <Button
            variant="base" // Keeping the slot is the quiet way out.
            onClick={() => closeDialog(DialogResult.cancel)}
          >
            Cancel
          </Button>
          <Button
            variant="danger" // The filled confirm button cancels the slot and its bookings.
            onClick={() => closeDialog(DialogResult.confirm)}
          >
            Cancel slot
          </Button>
        </>
      ),
    });
    if (result !== DialogResult.confirm) return;
    setBusy(true);
    try {
      const current = await getSlot(record.id);
      if (!current) {
        toast({ title: 'This session is gone', status: 'info' });
        router.push('/sessions');
        return;
      }
      for (const booking of held) await deleteBooking(booking.id);
      await deleteSlot(record.id);
      toast({ title: 'Session cancelled', status: 'success' });
      router.push('/sessions');
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        toast({ title: 'This session is gone', status: 'info' });
        router.push('/sessions');
      } else {
        toast({ title: 'Could not cancel the session', status: 'error' });
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader
        title={<Truncate>{title}</Truncate>}
        breadcrumb={[{ label: 'Sessions', href: '/sessions' }]}
        actions={
          <Button
            variant="danger" // Cancelling the slot is the destructive action of this view.
            loadingWithReason={busy ? 'Cancelling the session' : undefined}
            onClick={() => void confirmCancelSlot()}
          >
            Cancel slot
          </Button>
        }
      />
      <Section title="Details">
        <DescriptionList>
          <div>
            <DescriptionTerm>Session</DescriptionTerm>
            <DescriptionDetails>
              <SlotSessionLine sessionTypeId={record.sessionType} startAt={record.startAt} />
            </DescriptionDetails>
          </div>
          <div>
            <DescriptionTerm>Booked</DescriptionTerm>
            <DescriptionDetails>
              <SlotSeatCount booked={held.length} sessionTypeId={record.sessionType} />
            </DescriptionDetails>
          </div>
        </DescriptionList>
      </Section>
      <Section title="Bookings">
        <SlotBookings bookings={held} onOpenBooking={(bookingId) => router.push(`/bookings/${bookingId}`)} />
      </Section>
    </>
  );
}


