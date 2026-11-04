'use client';

import { bookingsForSlot } from '@app/blocks/Slots/slots';
import { LoadError } from '@app/components/LoadError';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { useListBookings, type Booking } from '@app/entities/booking';
import { useGetSessionType } from '@app/entities/sessionType';
import { useListSlots, type Slot } from '@app/entities/slot';
import { Numeral } from '@packages/ui/Numeral';
import { Section } from '@packages/ui/Section';
import { createTable } from '@packages/ui/Table';
import { Tag } from '@packages/ui/Tag';
import { Truncate } from '@packages/ui/Truncate';
import { Paragraph, Time } from '@packages/ui/Typography';
import { useRouter } from 'next/navigation';
import React from 'react';

type SlotRow = {
  id: string;
  sessionTypeId: string;
  startAt: string;
  bookingCount: number;
  bookings: Booking[];
};

const SlotTable = createTable<SlotRow>();

/** A slot's session type name, read through the single-slot operation. */
function SlotTypeName({ sessionTypeId }: { sessionTypeId: string }) {
  const sessionType = useGetSessionType(sessionTypeId);
  return <Truncate>{sessionType.data?.name ?? 'Session'}</Truncate>;
}

/** How many of a slot's seats are taken, and whether it is full. */
function SlotSeats({ booked, sessionTypeId }: { booked: number; sessionTypeId: string }) {
  const sessionType = useGetSessionType(sessionTypeId);
  const maximum = sessionType.data?.maximumPeople ?? 1;
  return (
    <span className="flex-row-gap-2 items-center">
      <Numeral>{`${booked} of ${maximum}`}</Numeral>
      {booked >= maximum ? (
        <Tag
          size="xs" // Fits the table row without stretching it.
          variant="info" // Full is a state worth noticing, not a warning.
        >
          Full
        </Tag>
      ) : null}
    </span>
  );
}

/** A slot's booker names, each opening its booking. */
function SlotBookers({ bookings }: { bookings: Booking[] }) {
  if (bookings.length === 0) return <Paragraph color="muted">No bookings</Paragraph>;
  return (
    <>
      {bookings.map((booking, index) => (
        <React.Fragment key={booking.id}>
          {index > 0 ? ', ' : null}
          <NextLink className="inline-block max-w-full" href={`/bookings/${booking.id}`}>
            <Truncate>{booking.name}</Truncate>
          </NextLink>
        </React.Fragment>
      ))}
    </>
  );
}

/** Builds the row for one slot from the bookings still holding a seat. */
function toRow(slot: Slot, bookings: Booking[]): SlotRow {
  const held = bookingsForSlot(bookings, slot.id);
  return {
    id: slot.id,
    sessionTypeId: slot.sessionType,
    startAt: slot.startAt,
    bookingCount: held.length,
    bookings: held,
  };
}

/**
 * S11 Sessions: upcoming sessions and who booked them, with past sessions
 * kept separate.
 */
export default function SessionsPage() {
  const router = useRouter();
  const slots = useListSlots();
  const bookings = useListBookings();
  const now = Date.now();

  const openSlot = (row: SlotRow) => router.push(`/sessions/${row.id}`);

  const upcoming: SlotRow[] = slots.data
    .filter((slot) => new Date(slot.startAt).getTime() >= now)
    .map((slot) => toRow(slot, bookings.data))
    .sort((a, b) => (a.startAt < b.startAt ? -1 : a.startAt > b.startAt ? 1 : 0));
  const past: SlotRow[] = slots.data
    .filter((slot) => new Date(slot.startAt).getTime() < now)
    .map((slot) => toRow(slot, bookings.data))
    .sort((a, b) => (a.startAt < b.startAt ? 1 : a.startAt > b.startAt ? -1 : 0));

  const loading = slots.loading || bookings.loading;
  const failed = slots.error ?? bookings.error;
  if (failed) {
    return (
      <>
        <PageHeader title="Sessions" />
        <LoadError
          message="The sessions could not be loaded."
          onRetry={() => {
            slots.retry();
            bookings.retry();
          }}
        />
      </>
    );
  }

  if (loading && slots.data.length === 0 && bookings.data.length === 0) {
    return (
      <>
        <PageHeader title="Sessions" />
        <Paragraph>Loading sessions.</Paragraph>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Sessions" description="Upcoming sessions and who booked them." />
      {upcoming.length === 0 ? (
        <div className="flex-col-gap-3 items-start">
          <Paragraph>No upcoming sessions yet. New sessions appear here when guests book open times.</Paragraph>
          <nav aria-label="Booking setup" className="flex-col-gap-2 items-start">
            <NextLink look="plain" href="/availability">
              Availability
            </NextLink>
            <NextLink look="plain" href="/session-types">
              Session types
            </NextLink>
          </nav>
        </div>
      ) : (
        <Section title="Upcoming sessions">
          <SlotTable
            caption="Upcoming sessions"
            data={upcoming}
            rowKey={(row) => row.id}
            loading={slots.loading || bookings.loading}
            onRowClick={(row, click) => {
              openSlot(row);
              click.currentTarget.querySelector('a')?.click();
            }}
          >
            <SlotTable.Column id="session" rowHeader title="Session" dataKey="sessionTypeId" width={220}>
              {(_, row) => (
                <NextLink className="inline-block max-w-full" href={`/sessions/${row.id}`}>
                  <SlotTypeName sessionTypeId={row.sessionTypeId} />
                </NextLink>
              )}
            </SlotTable.Column>
            <SlotTable.Column id="time" title="Date and time" dataKey="startAt" width={220}>
              {(startAt) => <Time value={startAt} withTime />}
            </SlotTable.Column>
            <SlotTable.Column id="seats" title="Bookings" dataKey="bookingCount" width={160}>
              {(_, row) => <SlotSeats booked={row.bookingCount} sessionTypeId={row.sessionTypeId} />}
            </SlotTable.Column>
            <SlotTable.Column id="bookers" title="Bookers" dataKey="id" width={240}>
              {(_, row) => <SlotBookers bookings={row.bookings} />}
            </SlotTable.Column>
          </SlotTable>
        </Section>
      )}
      <Section title="Past sessions">
        {past.length === 0 ? (
          <Paragraph color="muted">No past sessions yet.</Paragraph>
        ) : (
          <SlotTable
            caption="Past sessions"
            data={past}
            rowKey={(row) => row.id}
            loading={loading}
            onRowClick={(row, click) => {
              openSlot(row);
              click.currentTarget.querySelector('a')?.click();
            }}
          >
            <SlotTable.Column id="session" rowHeader title="Session" dataKey="sessionTypeId" width={220}>
              {(_, row) => (
                <NextLink className="inline-block max-w-full" href={`/sessions/${row.id}`}>
                  <SlotTypeName sessionTypeId={row.sessionTypeId} />
                </NextLink>
              )}
            </SlotTable.Column>
            <SlotTable.Column id="time" title="Date and time" dataKey="startAt" width={220}>
              {(startAt) => <Time value={startAt} withTime />}
            </SlotTable.Column>
            <SlotTable.Column id="bookers" title="Bookers" dataKey="id" width={240}>
              {(_, row) => <SlotBookers bookings={row.bookings} />}
            </SlotTable.Column>
          </SlotTable>
        )}
      </Section>
    </>
  );
}
