'use client';

import { formatPrice } from '@app/blocks/Format/format';
import { LoadError } from '@app/components/LoadError';
import { PageHeader } from '@app/components/PageHeader';
import { useListSessionTypes, type SessionType } from '@app/entities/sessionType';
import { Button, IconButton } from '@packages/ui/Button';
import { Numeral } from '@packages/ui/Numeral';
import { createTable } from '@packages/ui/Table';
import { Truncate } from '@packages/ui/Truncate';
import { Paragraph } from '@packages/ui/Typography';
import { Pencil, Plus } from 'lucide-react';
import React, { useState } from 'react';

import { AddSessionTypeDialog } from './components/AddSessionTypeDialog';
import { EditSessionTypeDialog } from './components/EditSessionTypeDialog';

type SessionTypeRow = {
  id: string;
  name: string;
  durationInMinutes: number;
  displayedPrice: number;
  maximumPeople: number;
};

const SessionTypeTable = createTable<SessionTypeRow>();

/**
 * S10 Session types: the kinds of sessions visitors can book, kept up to date.
 */
export default function SessionTypesPage() {
  const sessionTypes = useListSessionTypes();
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<SessionType | null>(null);

  const rows: SessionTypeRow[] = sessionTypes.data.map((type) => ({
    id: type.id,
    name: type.name,
    durationInMinutes: type.durationInMinutes,
    displayedPrice: type.displayedPrice,
    maximumPeople: type.maximumPeople,
  }));

  if (sessionTypes.error) {
    return (
      <>
        <PageHeader title="Session types" />
        <LoadError message="The session types could not be loaded." onRetry={() => sessionTypes.retry()} />
      </>
    );
  }

  if (sessionTypes.loading && sessionTypes.data.length === 0) {
    return (
      <>
        <PageHeader title="Session types" />
        <Paragraph>Loading session types.</Paragraph>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Session types"
        description="Displayed prices are shown for information only. Nobody pays in the app."
        actions={
          sessionTypes.data.length > 0 ? (
            <Button leftIcon={<Plus />} onClick={() => setAdding(true)}>
              Add a session type
            </Button>
          ) : undefined
        }
      />
      {sessionTypes.data.length === 0 ? (
        <div className="flex-col-gap-3 items-start">
          <Paragraph>No session types yet. Add one so visitors can book.</Paragraph>
          <Button leftIcon={<Plus />} onClick={() => setAdding(true)}>
            Add a session type
          </Button>
        </div>
      ) : (
        <SessionTypeTable
          caption="Session types"
          data={rows}
          rowKey={(row) => row.id}
          loading={sessionTypes.loading}
        >
          <SessionTypeTable.Column id="name" rowHeader title="Name" dataKey="name" width={220}>
            {(name) => <Truncate>{name}</Truncate>}
          </SessionTypeTable.Column>
          <SessionTypeTable.Column id="duration" title="Duration" dataKey="durationInMinutes" width={140} align="right">
            {(minutes: number) => <Numeral>{`${minutes} min`}</Numeral>}
          </SessionTypeTable.Column>
          <SessionTypeTable.Column id="price" title="Displayed price" dataKey="displayedPrice" width={150} align="right">
            {(price: number) => <Numeral>{formatPrice(price)}</Numeral>}
          </SessionTypeTable.Column>
          <SessionTypeTable.Column id="seats" title="Maximum people" dataKey="maximumPeople" width={150} align="right">
            {(seats: number) => <Numeral>{seats}</Numeral>}
          </SessionTypeTable.Column>
          <SessionTypeTable.Column id="actions" title={<span className="sr-only">Session type actions</span>} width={56} align="right">
            {(_, row) => {
              const sessionType = sessionTypes.data.find((type) => type.id === row.id);
              return sessionType ? (
                <IconButton
                  variant="base"
                  look="ghost"
                  size="xs"
                  tooltip="Edit session type"
                  aria-label={`Edit ${row.name}`}
                  onClick={() => setEditing(sessionType)}
                >
                  <Pencil />
                </IconButton>
              ) : null;
            }}
          </SessionTypeTable.Column>
        </SessionTypeTable>
      )}
      {adding && (
        <AddSessionTypeDialog open onOpenChange={(open) => !open && setAdding(false)} />
      )}
      {editing && (
        <EditSessionTypeDialog sessionType={editing} onOpenChange={(open) => !open && setEditing(null)} />
      )}
    </>
  );
}
