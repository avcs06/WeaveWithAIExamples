'use client';

import { AddProjectDialog } from '@app/blocks/ProjectDialogs/AddProjectDialog';
import { ClientStatusTag } from '@app/components/ClientStatusTag';
import { LoadError } from '@app/components/LoadError';
import { NextLink } from '@app/components/NextLink';
import { NotFound } from '@app/components/NotFound';
import { PageHeader } from '@app/components/PageHeader';
import { useListBookings } from '@app/entities/booking';
import { deleteClient, useGetClient, useListClients } from '@app/entities/client';
import { deleteNote, useListNotes, type Note } from '@app/entities/note';
import { deleteProject, useListProjects } from '@app/entities/project';
import { useListSessionTypes } from '@app/entities/sessionType';
import { useListSlots } from '@app/entities/slot';
import { deleteTask, useListTasks } from '@app/entities/task';
import { Button, IconButton } from '@packages/ui/Button';
import { CardList } from '@packages/ui/Card';
import { DialogResult, openConfirmationDialog } from '@packages/ui/Dialog';
import { Section } from '@packages/ui/Section';
import { createTable } from '@packages/ui/Table';
import { toast } from '@packages/ui/Toast';
import { Truncate } from '@packages/ui/Truncate';
import { DescriptionDetails, DescriptionList, DescriptionTerm, Paragraph, Time } from '@packages/ui/Typography';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { AddNoteDialog } from './components/AddNoteDialog';
import { EditClientDialog } from './components/EditClientDialog';
import { EditNoteDialog } from './components/EditNoteDialog';

type BookingRow = {
  id: string;
  sessionTypeName: string;
  startAt: string;
  name: string;
  email: string;
};

const BookingTable = createTable<BookingRow>();

/**
 * S06 The client's name: one client's details, notes, projects and bookings
 * in one place.
 */
export default function ClientPage() {
  const router = useRouter();
  const { clientId } = useParams<{ clientId: string }>();
  const client = useGetClient(clientId);
  const notes = useListNotes();
  const projects = useListProjects();
  const bookings = useListBookings();
  const slots = useListSlots();
  const sessionTypes = useListSessionTypes();
  const tasks = useListTasks();
  const clients = useListClients();

  const [editing, setEditing] = useState(false);
  const [addingNote, setAddingNote] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [addingProject, setAddingProject] = useState(false);
  const [busy, setBusy] = useState(false);

  const loading =
    client.loading ||
    notes.loading ||
    projects.loading ||
    bookings.loading ||
    slots.loading ||
    sessionTypes.loading ||
    tasks.loading;
  const failed =
    client.error ?? notes.error ?? projects.error ?? bookings.error ?? slots.error ?? sessionTypes.error ?? tasks.error;
  if (failed) {
    return (
      <>
        <PageHeader title="Client" breadcrumb={[{ label: 'Clients', href: '/clients' }]} />
        <LoadError
          message="The client could not be loaded."
          onRetry={() => {
            client.retry();
            notes.retry();
            projects.retry();
            bookings.retry();
            slots.retry();
            sessionTypes.retry();
            tasks.retry();
          }}
        />
      </>
    );
  }

  if (loading && !client.data) {
    return (
      <>
        <PageHeader title="Client" breadcrumb={[{ label: 'Clients', href: '/clients' }]} />
        <Paragraph>Loading client.</Paragraph>
      </>
    );
  }

  if (!client.data) {
    return (
      <NotFound
        title="This client is gone."
        description="It may have been deleted, or the link is wrong."
        back={{ label: 'Back to clients', href: '/clients' }}
      />
    );
  }

  const record = client.data;
  const clientNotes = notes.data.filter((note) => note.client === record.id);
  const clientProjects = projects.data.filter((project) => project.client === record.id);
  const openCount = (projectId: string) =>
    tasks.data.filter((task) => task.project === projectId && task.status !== 'done').length;

  const slotById = (slotId: string) => slots.data.find((slot) => slot.id === slotId);
  const sessionTypeName = (sessionTypeId: string) =>
    sessionTypes.data.find((type) => type.id === sessionTypeId)?.name ?? 'Session';
  const clientBookings: BookingRow[] = bookings.data
    .filter((booking) => booking.client === record.id || booking.email === record.email)
    .map((booking) => {
      const slot = slotById(booking.slot);
      return {
        id: booking.id,
        sessionTypeName: slot ? sessionTypeName(slot.sessionType) : 'Session',
        startAt: slot?.startAt ?? '',
        name: booking.name,
        email: booking.email,
      };
    })
    .sort((a, b) => (a.startAt < b.startAt ? -1 : a.startAt > b.startAt ? 1 : 0));

  const confirmDeleteClient = async () => {
    const result = await openConfirmationDialog({
      title: `Delete ${record.name}?`,
      content:
        'Deleting the client deletes its notes, projects and tasks. Its bookings stay visible without a client link.',
      status: 'error',
      footer: (closeDialog) => (
        <>
          <Button
            variant="base" // Keeping the client is the quiet way out.
            onClick={() => closeDialog(DialogResult.cancel)}
          >
            Cancel
          </Button>
          <Button
            variant="danger" // The filled confirm button destroys the client and everything under it.
            onClick={() => closeDialog(DialogResult.confirm)}
          >
            Delete
          </Button>
        </>
      ),
    });
    if (result !== DialogResult.confirm) return;
    setBusy(true);
    try {
      const projectIds = new Set(clientProjects.map((project) => project.id));
      for (const note of clientNotes) await deleteNote(note.id);
      for (const task of tasks.data.filter((task) => projectIds.has(task.project))) {
        await deleteTask(task.id);
      }
      for (const project of clientProjects) await deleteProject(project.id);
      await deleteClient(record.id);
      toast({ title: 'Client deleted', status: 'success' });
      router.push('/clients');
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        toast({ title: 'This client is already gone', status: 'info' });
        router.push('/clients');
      } else {
        toast({ title: 'Could not delete the client', status: 'error' });
      }
    } finally {
      setBusy(false);
    }
  };

  const confirmDeleteNote = async (note: Note) => {
    const result = await openConfirmationDialog({
      title: 'Delete this note?',
      content: `${note.noteText} (${note.noteDate})`,
      status: 'error',
      footer: (closeDialog) => (
        <>
          <Button
            variant="base" // Keeping the note is the quiet way out.
            onClick={() => closeDialog(DialogResult.cancel)}
          >
            Cancel
          </Button>
          <Button
            variant="danger" // The filled confirm button destroys the note.
            onClick={() => closeDialog(DialogResult.confirm)}
          >
            Delete
          </Button>
        </>
      ),
    });
    if (result !== DialogResult.confirm) return;
    try {
      await deleteNote(note.id);
      toast({ title: 'Note deleted', status: 'success' });
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        toast({ title: 'That note is gone', status: 'info' });
      } else {
        toast({ title: 'Could not delete the note', status: 'error' });
      }
    }
  };

  return (
    <>
      <PageHeader
        title={<Truncate>{record.name}</Truncate>}
        breadcrumb={[{ label: 'Clients', href: '/clients' }]}
        actions={
          <>
            <Button
              variant="base" // Edit is the secondary action beside the destructive Delete.
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
            <Button
              variant="danger" // Delete is the destructive action of this view.
              loadingWithReason={busy ? 'Deleting the client' : undefined}
              onClick={() => void confirmDeleteClient()}
            >
              Delete
            </Button>
          </>
        }
      />
      <Section title="Details">
        <DescriptionList>
          <div>
            <DescriptionTerm>Email</DescriptionTerm>
            <DescriptionDetails>{record.email}</DescriptionDetails>
          </div>
          {record.company && (
            <div>
              <DescriptionTerm>Company</DescriptionTerm>
              <DescriptionDetails>{record.company}</DescriptionDetails>
            </div>
          )}
          {record.profile && (
            <div>
              <DescriptionTerm>Profile</DescriptionTerm>
              <DescriptionDetails>{record.profile}</DescriptionDetails>
            </div>
          )}
          <div>
            <DescriptionTerm>Status</DescriptionTerm>
            <DescriptionDetails>
              <ClientStatusTag status={record.status} />
            </DescriptionDetails>
          </div>
        </DescriptionList>
      </Section>
      <Section
        title="Notes"
        headerAction={
          clientNotes.length > 0 ? (
            <Button
              variant="base" // Adding a note is the section's quiet action.
              leftIcon={<Plus />}
              onClick={() => setAddingNote(true)}
            >
              Add a note
            </Button>
          ) : undefined
        }
      >
        {clientNotes.length === 0 ? (
          <div className="flex-col-gap-3 items-start">
            <Paragraph>No notes yet.</Paragraph>
            <Button
              variant="base" // Adding a note is the section's quiet action.
              leftIcon={<Plus />}
              onClick={() => setAddingNote(true)}
            >
              Add a note
            </Button>
          </div>
        ) : (
          <CardList
            aria-label="Notes"
            items={clientNotes}
            renderItem={(note) => (
              <div className="flex-col-gap-2">
                <Paragraph>{note.noteText}</Paragraph>
                <Paragraph color="muted">
                  <Time value={note.noteDate} />
                  {note.followUpDate ? (
                    <>
                      {' · '}Follow-up <Time value={note.followUpDate} />
                    </>
                  ) : null}
                </Paragraph>
                <div className="flex-row-gap-2 items-center">
                  <IconButton
                    variant="base"
                    look="ghost"
                    size="xs"
                    tooltip="Edit note"
                    aria-label={`Edit note from ${note.noteDate}`}
                    onClick={() => setEditingNote(note)}
                  >
                    <Pencil />
                  </IconButton>
                  <IconButton
                    variant="base" // Row deletes stay as quiet as the row's other actions.
                    look="ghost"
                    size="xs"
                    tooltip="Delete note"
                    aria-label={`Delete note from ${note.noteDate}`}
                    onClick={() => void confirmDeleteNote(note)}
                  >
                    <Trash2 />
                  </IconButton>
                </div>
              </div>
            )}
          />
        )}
      </Section>
      <Section
        title="Projects"
        headerAction={
          clientProjects.length > 0 ? (
            <Button
              variant="base" // Adding a project is the section's quiet action.
              leftIcon={<Plus />}
              onClick={() => setAddingProject(true)}
            >
              Add a project
            </Button>
          ) : undefined
        }
      >
        {clientProjects.length === 0 ? (
          <div className="flex-col-gap-3 items-start">
            <Paragraph>No projects yet.</Paragraph>
            <Button
              variant="base" // Adding a project is the section's quiet action.
              leftIcon={<Plus />}
              onClick={() => setAddingProject(true)}
            >
              Add a project
            </Button>
          </div>
        ) : (
          <CardList
            aria-label="Projects"
            items={clientProjects}
            stretchLink
            renderItem={(project) => (
              <>
                <h3>
                  <NextLink look="plain" href={`/projects/${project.id}`}>
                    <Truncate>{project.name}</Truncate>
                  </NextLink>
                </h3>
                <Paragraph color="muted">
                  {project.dueDate ? (
                    <>
                      Due <Time value={project.dueDate} />
                      {' · '}
                    </>
                  ) : null}
                  {openCount(project.id)} open {openCount(project.id) === 1 ? 'task' : 'tasks'}
                </Paragraph>
              </>
            )}
          />
        )}
      </Section>
      <Section title="Bookings">
        <BookingTable
          caption="Bookings"
          data={clientBookings}
          rowKey={(row) => row.id}
          emptyMessage="No bookings yet."
          onRowClick={(row, click) => {
            void router.push(`/bookings/${row.id}`);
            click.currentTarget.querySelector('a')?.click();
          }}
        >
          <BookingTable.Column id="session" title="Session type" dataKey="sessionTypeName" width={200}>
            {(name) => <Truncate>{name}</Truncate>}
          </BookingTable.Column>
          <BookingTable.Column id="time" title="Time" dataKey="startAt" width={200}>
            {(startAt) => (startAt ? <Time value={startAt} withTime /> : '—')}
          </BookingTable.Column>
          <BookingTable.Column id="name" rowHeader title="Booker" dataKey="name" width={200}>
            {(name, row) => (
              <NextLink className="inline-block max-w-full" href={`/bookings/${row.id}`}>
                <Truncate>{name}</Truncate>
              </NextLink>
            )}
          </BookingTable.Column>
          <BookingTable.Column id="email" title="Email" dataKey="email" width={220}>
            {(email) => <Truncate>{email}</Truncate>}
          </BookingTable.Column>
        </BookingTable>
      </Section>
      {editing && (
        <EditClientDialog client={record} open onOpenChange={(open) => !open && setEditing(false)} />
      )}
      {addingNote && (
        <AddNoteDialog clientId={record.id} open onOpenChange={(open) => !open && setAddingNote(false)} />
      )}
      {editingNote && (
        <EditNoteDialog note={editingNote} onOpenChange={(open) => !open && setEditingNote(null)} />
      )}
      {addingProject && (
        <AddProjectDialog
          open
          onOpenChange={(open) => !open && setAddingProject(false)}
          onSaved={() => {
            setAddingProject(false);
            router.push('/projects');
          }}
          clients={clients.data}
          defaultClientId={record.id}
        />
      )}
    </>
  );
}
