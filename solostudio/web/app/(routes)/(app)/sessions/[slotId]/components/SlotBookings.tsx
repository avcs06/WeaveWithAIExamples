'use client';

import { formatSlotTitle } from '@app/blocks/Format/format';
import { NextLink } from '@app/components/NextLink';
import { useGetClient } from '@app/entities/client';
import { useGetSessionType } from '@app/entities/sessionType';
import { Numeral } from '@packages/ui/Numeral';
import { createTable } from '@packages/ui/Table';
import { Truncate } from '@packages/ui/Truncate';
import { Paragraph } from '@packages/ui/Typography';
import React from 'react';

import type { Booking } from '@app/entities/booking';

type SlotBookingRow = {
  id: string;
  name: string;
  email: string;
  clientId?: string;
};

const SlotBookingTable = createTable<SlotBookingRow>();

/** A booking's linked client: its name opening the client, or nothing to open. */
function BookingRow({ booking }: { booking: Booking }) {
  const linked = useGetClient(booking.client ?? '');
  if (!booking.client || !linked.data) return <Paragraph color="muted">No linked client</Paragraph>;
  return (
    <NextLink className="inline-block max-w-full" href={`/clients/${booking.client}`}>
      <Truncate>{linked.data.name}</Truncate>
    </NextLink>
  );
}

/**
 * A slot's bookings as a table: booker, email and linked client, each
 * opening its record.
 */
export function SlotBookings({
  bookings,
  onOpenBooking,
}: {
  bookings: Booking[];
  onOpenBooking: (bookingId: string) => void;
}) {
  const rows: SlotBookingRow[] = bookings.map((booking) => ({
    id: booking.id,
    name: booking.name,
    email: booking.email,
    clientId: booking.client,
  }));
  return (
    <SlotBookingTable
      caption="Bookings"
      data={rows}
      rowKey={(row) => row.id}
      emptyMessage="No bookings yet. This time stays open for booking until the slot is cancelled."
      onRowClick={(row, click) => {
        onOpenBooking(row.id);
        click.currentTarget.querySelector('a')?.click();
      }}
    >
      <SlotBookingTable.Column id="name" rowHeader title="Booker" dataKey="name" width={200}>
        {(name, row) => (
          <NextLink className="inline-block max-w-full" href={`/bookings/${row.id}`}>
            <Truncate>{name}</Truncate>
          </NextLink>
        )}
      </SlotBookingTable.Column>
      <SlotBookingTable.Column id="email" title="Email" dataKey="email" width={240}>
        {(email) => <Truncate>{email}</Truncate>}
      </SlotBookingTable.Column>
      <SlotBookingTable.Column id="client" title="Linked client" dataKey="clientId" width={220}>
        {(_, row) => {
          const booking = bookings.find((entry) => entry.id === row.id);
          if (!booking) return <Paragraph color="muted">No linked client</Paragraph>;
          return <BookingRow booking={booking} />;
        }}
      </SlotBookingTable.Column>
    </SlotBookingTable>
  );
}

/** A slot's booked seats as "2 of 4". */
export function SlotSeatCount({
  booked,
  sessionTypeId,
}: {
  booked: number;
  sessionTypeId: string;
}) {
  const sessionType = useGetSessionType(sessionTypeId);
  const maximum = sessionType.data?.maximumPeople ?? 1;
  return <Numeral>{`${booked} of ${maximum}`}</Numeral>;
}

/** A slot's session type name and time, formatted the same as the page title. */
export function SlotSessionLine({ sessionTypeId, startAt }: { sessionTypeId: string; startAt: string }) {
  const sessionType = useGetSessionType(sessionTypeId);
  return <Truncate>{formatSlotTitle(sessionType.data?.name ?? 'Session', startAt)}</Truncate>;
}
