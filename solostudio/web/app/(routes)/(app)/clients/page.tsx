'use client';

import { followUpNoteFor } from '@app/blocks/Slots/slots';
import { ClientStatusTag } from '@app/components/ClientStatusTag';
import { LoadError } from '@app/components/LoadError';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { useListClients } from '@app/entities/client';
import { ClientStatusOptions } from '@app/entities/enums';
import { markFollowUpDone, pushFollowUpWeek, useListNotes } from '@app/entities/note';
import { Button, IconButton } from '@packages/ui/Button';
import { SearchInput } from '@packages/ui/Input';
import { Select, SelectOption } from '@packages/ui/Select';
import { createTable } from '@packages/ui/Table';
import { Tag } from '@packages/ui/Tag';
import { toast } from '@packages/ui/Toast';
import { Truncate } from '@packages/ui/Truncate';
import { Paragraph, Time } from '@packages/ui/Typography';
import { CalendarPlus, Check, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { AddClientDialog } from './components/AddClientDialog';

type ClientRow = {
  id: string;
  name: string;
  company: string;
  status: string;
  followUpId?: string;
  followUpDate?: string;
};

const ClientTable = createTable<ClientRow>();

function addDays(dateKey: string, days: number): string {
  const date = new Date(`${dateKey}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/**
 * S05 Clients: find clients, see who needs a follow-up first, and act on a
 * follow-up with one click.
 */
export default function ClientsPage() {
  const router = useRouter();
  const clients = useListClients();
  const notes = useListNotes();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [adding, setAdding] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const query = search.trim().toLowerCase();
  const rows: ClientRow[] = clients.data
    .filter((client) => {
      const matchesQuery =
        !query ||
        client.name.toLowerCase().includes(query) ||
        (client.company ?? '').toLowerCase().includes(query);
      const matchesStatus = status === 'all' || client.status === status;
      return matchesQuery && matchesStatus;
    })
    .map((client) => {
      const followUp = followUpNoteFor(notes.data, client.id);
      return {
        id: client.id,
        name: client.name,
        company: client.company ?? '',
        status: client.status,
        followUpId: followUp?.id,
        followUpDate: followUp?.followUpDate,
      };
    })
    .sort((a, b) => {
      // Overdue first, then due soonest; clients without a follow-up last.
      const rank = (row: ClientRow) =>
        !row.followUpDate ? 2 : row.followUpDate < today ? 0 : 1;
      const rankDiff = rank(a) - rank(b);
      if (rankDiff !== 0) return rankDiff;
      return (a.followUpDate ?? '') < (b.followUpDate ?? '')
        ? -1
        : (a.followUpDate ?? '') > (b.followUpDate ?? '')
          ? 1
          : 0;
    });

  const markDone = async (row: ClientRow) => {
    if (!row.followUpId) return;
    try {
      await markFollowUpDone(row.followUpId, { followUpDate: undefined });
      toast({ title: 'Follow-up marked as done', status: 'success' });
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        toast({ title: 'That note is gone', status: 'info' });
      } else {
        toast({ title: 'Could not mark the follow-up as done', status: 'error' });
      }
    }
  };

  const pushWeek = async (row: ClientRow) => {
    if (!row.followUpId || !row.followUpDate) return;
    try {
      await pushFollowUpWeek(row.followUpId, { followUpDate: addDays(row.followUpDate, 7) });
      toast({ title: 'Follow-up pushed by a week', status: 'success' });
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        toast({ title: 'That note is gone', status: 'info' });
      } else {
        toast({ title: 'Could not push the follow-up', status: 'error' });
      }
    }
  };

  const loading = clients.loading || notes.loading;
  const failed = clients.error ?? notes.error;
  if (failed) {
    return (
      <>
        <PageHeader title="Clients" />
        <LoadError
          message="The client list could not be loaded."
          onRetry={() => {
            clients.retry();
            notes.retry();
          }}
        />
      </>
    );
  }

  if (loading && clients.data.length === 0) {
    return (
      <>
        <PageHeader title="Clients" />
        <Paragraph>Loading clients.</Paragraph>
      </>
    );
  }

  const filtering = query !== '' || status !== 'all';
  const clearFilters = () => {
    setSearch('');
    setStatus('all');
  };

  return (
    <>
      <PageHeader
        title="Clients"
        description="Overdue follow-ups first, so you always know who to contact next."
        actions={
          rows.length > 0 || filtering ? (
            <Button leftIcon={<Plus />} onClick={() => setAdding(true)}>
              Add a client
            </Button>
          ) : undefined
        }
      />
      {clients.data.length === 0 ? (
        <div className="flex-col-gap-3 items-start">
          <Paragraph>No clients yet. Add the first one to start your list.</Paragraph>
          <Button leftIcon={<Plus />} onClick={() => setAdding(true)}>
            Add a client
          </Button>
        </div>
      ) : (
        <div className="flex-col-gap-3">
          <div role="search" className="flex-row-gap-3 flex-wrap items-end">
            <SearchInput label="Search clients" placeholder="Name or company" value={search} onChange={setSearch} />
            <Select aria-label="Client status filter" allowSearch={false} value={status} onChange={(next) => next && setStatus(next)}>
              <SelectOption value="all" label="All" />
              {ClientStatusOptions.map((option) => (
                <SelectOption key={option.key} value={option.key} label={option.label} />
              ))}
            </Select>
          </div>
          <ClientTable
            caption="Clients"
            data={rows}
            rowKey={(row) => row.id}
            loading={clients.loading || notes.loading}
            emptyMessage="Nothing matches your search or filter."
            onRowClick={(row, click) => {
              void router.push(`/clients/${row.id}`);
              click.currentTarget.querySelector('a')?.click();
            }}
          >
            <ClientTable.Column id="name" rowHeader title="Name" dataKey="name" width={220}>
              {(name, row) => (
                <NextLink className="inline-block max-w-full" href={`/clients/${row.id}`}>
                  <Truncate>{name}</Truncate>
                </NextLink>
              )}
            </ClientTable.Column>
            <ClientTable.Column id="company" title="Company" dataKey="company" width={180}>
              {(company) => (company ? <Truncate>{company}</Truncate> : '—')}
            </ClientTable.Column>
            <ClientTable.Column id="status" title="Status" dataKey="status" width={120}>
              {(value: string) => <ClientStatusTag status={value} size="xs" />}
            </ClientTable.Column>
            <ClientTable.Column id="followUp" title="Follow-up" dataKey="followUpDate" width={220}>
              {(_, row) =>
                !row.followUpDate ? (
                  <Paragraph color="muted">No follow-up</Paragraph>
                ) : (
                  <span className="flex-row-gap-2 items-center">
                    {row.followUpDate < today ? (
                      <Tag
                        size="xs" // Fits the table row without stretching it.
                        variant="warning" // Overdue needs the warning color to stand out.
                      >
                        Overdue
                      </Tag>
                    ) : (
                      <Tag
                        size="xs" // Fits the table row without stretching it.
                        variant="info" // A coming follow-up keeps the calm info color.
                      >
                        Due
                      </Tag>
                    )}
                    <Time value={row.followUpDate} />
                  </span>
                )
              }
            </ClientTable.Column>
            <ClientTable.Column id="actions" title={<span className="sr-only">Follow-up actions</span>} width={88} align="right">
              {(_, row) =>
                row.followUpId ? (
                  <span className="flex-row-gap-2 items-center justify-end">
                    <IconButton
                      variant="base"
                      look="ghost"
                      size="xs"
                      tooltip="Mark follow-up done"
                      aria-label={`Mark follow-up done for ${row.name}`}
                      onClick={() => void markDone(row)}
                    >
                      <Check />
                    </IconButton>
                    <IconButton
                      variant="base"
                      look="ghost"
                      size="xs"
                      tooltip="Push follow-up a week"
                      aria-label={`Push follow-up a week for ${row.name}`}
                      onClick={() => void pushWeek(row)}
                    >
                      <CalendarPlus />
                    </IconButton>
                  </span>
                ) : null
              }
            </ClientTable.Column>
          </ClientTable>
          {rows.length === 0 && (
            <Button
              variant="base" // The quiet way out beside the empty message, not the page's main action.
              onClick={clearFilters}
            >
              Clear the search or filter
            </Button>
          )}
        </div>
      )}
      {adding && (
        <AddClientDialog
          open
          onOpenChange={(open) => {
            if (!open) setAdding(false);
          }}
          onSaved={(client) => {
            setAdding(false);
            router.push(`/clients/${client.id}`);
          }}
        />
      )}
    </>
  );
}
