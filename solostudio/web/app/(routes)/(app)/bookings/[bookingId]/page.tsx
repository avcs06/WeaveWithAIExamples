'use client';

import { formatSlotTitle } from '@app/blocks/Format/format';
import { LoadError } from '@app/components/LoadError';
import { NextLink } from '@app/components/NextLink';
import { NotFound } from '@app/components/NotFound';
import { PageHeader } from '@app/components/PageHeader';
import { useGetBooking } from '@app/entities/booking';
import { useGetClient } from '@app/entities/client';
import { useGetSessionType } from '@app/entities/sessionType';
import { useGetSlot } from '@app/entities/slot';
import { Section } from '@packages/ui/Section';
import { Truncate } from '@packages/ui/Truncate';
import { DescriptionDetails, DescriptionList, DescriptionTerm, Paragraph } from '@packages/ui/Typography';
import { useParams } from 'next/navigation';
import React from 'react';

/** The booking's slot as a link, with its session type name and time. */
function SlotLink({ slotId }: { slotId: string }) {
  const slot = useGetSlot(slotId);
  if (!slot.data) return <>—</>;
  return <SlotNameLink slotId={slotId} startAt={slot.data.startAt} sessionTypeId={slot.data.sessionType} />;
}

function SlotNameLink({
  slotId,
  startAt,
  sessionTypeId,
}: {
  slotId: string;
  startAt: string;
  sessionTypeId: string;
}) {
  const sessionType = useGetSessionType(sessionTypeId);
  return (
    <NextLink className="inline-block max-w-full" href={`/sessions/${slotId}`}>
      <Truncate>{formatSlotTitle(sessionType.data?.name ?? 'Session', startAt)}</Truncate>
    </NextLink>
  );
}

/** The booking's linked client: its name, or that there is none. */
function ClientLink({ clientId }: { clientId?: string }) {
  const linked = useGetClient(clientId ?? '');
  if (!clientId || !linked.data) return <Paragraph color="muted">There is no linked client.</Paragraph>;
  return (
    <NextLink className="inline-block max-w-full" href={`/clients/${clientId}`}>
      <Truncate>{linked.data.name}</Truncate>
    </NextLink>
  );
}

/**
 * S13 The booker's name: who booked, for what and when, as the designer.
 */
export default function BookingPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const booking = useGetBooking(bookingId);

  if (booking.error) {
    return (
      <>
        <PageHeader title="Booking" breadcrumb={[{ label: 'Sessions', href: '/sessions' }]} />
        <LoadError message="The booking could not be loaded." onRetry={() => booking.retry()} />
      </>
    );
  }

  if (booking.loading && !booking.data) {
    return (
      <>
        <PageHeader title="Booking" breadcrumb={[{ label: 'Sessions', href: '/sessions' }]} />
        <Paragraph>Loading booking.</Paragraph>
      </>
    );
  }

  if (!booking.data || booking.data.isCancelled) {
    return (
      <NotFound
        title="This booking is gone."
        description="It may have been cancelled, or the link is wrong."
        back={{ label: 'Back to sessions', href: '/sessions' }}
      />
    );
  }

  const record = booking.data;

  return (
    <>
      <PageHeader
        title={<Truncate>{`${record.name}'s booking`}</Truncate>}
        breadcrumb={[{ label: 'Sessions', href: '/sessions' }]}
      />
      <Section title="Details">
        <DescriptionList>
          <div>
            <DescriptionTerm>Name</DescriptionTerm>
            <DescriptionDetails>
              <Truncate>{record.name}</Truncate>
            </DescriptionDetails>
          </div>
          <div>
            <DescriptionTerm>Email</DescriptionTerm>
            <DescriptionDetails>
              <Truncate>{record.email}</Truncate>
            </DescriptionDetails>
          </div>
          <div>
            <DescriptionTerm>Linked client</DescriptionTerm>
            <DescriptionDetails>
              <ClientLink clientId={record.client} />
            </DescriptionDetails>
          </div>
          <div>
            <DescriptionTerm>Slot</DescriptionTerm>
            <DescriptionDetails>
              <SlotLink slotId={record.slot} />
            </DescriptionDetails>
          </div>
        </DescriptionList>
      </Section>
    </>
  );
}
