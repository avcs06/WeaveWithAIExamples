'use client';

import { addDaysKey, todayKey, weekStartKey } from '@app/blocks/Format/format';
import { bookingsForSlot } from '@app/blocks/Slots/slots';
import { LoadError } from '@app/components/LoadError';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { useListBookings } from '@app/entities/booking';
import { useListClients } from '@app/entities/client';
import { useListNotes } from '@app/entities/note';
import { useListProjects } from '@app/entities/project';
import { useListSessionTypes } from '@app/entities/sessionType';
import { useListSlots } from '@app/entities/slot';
import { useListTasks } from '@app/entities/task';
import { CardList } from '@packages/ui/Card';
import { Numeral } from '@packages/ui/Numeral';
import { Section } from '@packages/ui/Section';
import { createTable } from '@packages/ui/Table';
import { Truncate } from '@packages/ui/Truncate';
import { Paragraph, Time } from '@packages/ui/Typography';
import { useRouter } from 'next/navigation';
import React from 'react';

type SessionRow = {
  id: string;
  sessionTypeName: string;
  startAt: string;
  bookers: string;
};

type FollowUpRow = {
  id: string;
  clientId: string;
  clientName: string;
  followUpDate: string;
};

type TaskRow = {
  id: string;
  title: string;
  projectId: string;
  projectName: string;
  dueDate: string;
};

const SessionTable = createTable<SessionRow>();
const FollowUpTable = createTable<FollowUpRow>();
const TaskTable = createTable<TaskRow>();

/**
 * S04 Home: what needs attention today — today's sessions, this week's
 * follow-ups and overdue tasks — each opening its record.
 */
export default function HomePage() {
  const router = useRouter();
  const slots = useListSlots();
  const bookings = useListBookings();
  const notes = useListNotes();
  const tasks = useListTasks();
  const sessionTypes = useListSessionTypes();
  const clients = useListClients();
  const projects = useListProjects();

  const today = todayKey();
  const weekEnd = addDaysKey(weekStartKey(today), 6);

  const typeName = (sessionTypeId: string) =>
    sessionTypes.data.find((type) => type.id === sessionTypeId)?.name ?? 'Session';
  const clientName = (clientId: string) =>
    clients.data.find((client) => client.id === clientId)?.name ?? 'Client';
  const projectName = (projectId: string) =>
    projects.data.find((project) => project.id === projectId)?.name ?? 'Project';

  const todaysSessions: SessionRow[] = slots.data
    .filter((slot) => slot.startAt.slice(0, 10) === today)
    .map((slot) => ({
      id: slot.id,
      sessionTypeName: typeName(slot.sessionType),
      startAt: slot.startAt,
      bookers: bookingsForSlot(bookings.data, slot.id)
        .map((booking) => booking.name)
        .join(', '),
    }))
    .sort((a, b) => (a.startAt < b.startAt ? -1 : a.startAt > b.startAt ? 1 : 0));

  const followUps: FollowUpRow[] = notes.data
    .filter((note) => note.followUpDate && note.followUpDate <= weekEnd)
    .map((note) => ({
      id: `${note.id}-${note.client}`,
      clientId: note.client,
      clientName: clientName(note.client),
      followUpDate: note.followUpDate!,
    }))
    .sort((a, b) => {
      const aOverdue = a.followUpDate < today ? 0 : 1;
      const bOverdue = b.followUpDate < today ? 0 : 1;
      if (aOverdue !== bOverdue) return aOverdue - bOverdue;
      return a.followUpDate < b.followUpDate ? -1 : a.followUpDate > b.followUpDate ? 1 : 0;
    });

  const overdueTasks: TaskRow[] = tasks.data
    .filter((task) => task.dueDate && task.dueDate < today && task.status !== 'done')
    .map((task) => ({
      id: task.id,
      title: task.title,
      projectId: task.project,
      projectName: projectName(task.project),
      dueDate: task.dueDate!,
    }))
    .sort((a, b) => (a.dueDate < b.dueDate ? -1 : a.dueDate > b.dueDate ? 1 : 0));

  const loading =
    slots.loading || bookings.loading || notes.loading || tasks.loading;
  const failed = slots.error ?? bookings.error ?? notes.error ?? tasks.error;
  if (failed) {
    return (
      <>
        <PageHeader title="Home" />
        <LoadError
          message="The home dashboard could not be loaded."
          onRetry={() => {
            slots.retry();
            bookings.retry();
            notes.retry();
            tasks.retry();
          }}
        />
      </>
    );
  }

  if (
    loading &&
    slots.data.length === 0 &&
    bookings.data.length === 0 &&
    notes.data.length === 0 &&
    tasks.data.length === 0
  ) {
    return (
      <>
        <PageHeader title="Home" />
        <Paragraph>Loading your day.</Paragraph>
      </>
    );
  }

  if (todaysSessions.length === 0 && followUps.length === 0 && overdueTasks.length === 0) {
    return (
      <>
        <PageHeader title="Home" />
        <Paragraph>Everything is clear today. No sessions, follow-ups or overdue tasks need you.</Paragraph>
        <nav aria-label="Workspace" className="flex-col-gap-2 items-start">
          <NextLink look="plain" href="/clients">
            Clients
          </NextLink>
          <NextLink look="plain" href="/projects">
            Projects
          </NextLink>
          <NextLink look="plain" href="/sessions">
            Sessions
          </NextLink>
          <NextLink look="plain" href="/availability">
            Availability
          </NextLink>
          <NextLink look="plain" href="/session-types">
            Session types
          </NextLink>
        </nav>
      </>
    );
  }

  const stats = [
    { id: 'sessions', label: "Today's sessions", count: todaysSessions.length },
    { id: 'follow-ups', label: 'Follow-ups due this week', count: followUps.length },
    { id: 'tasks', label: 'Overdue tasks', count: overdueTasks.length },
  ];

  return (
    <>
      <PageHeader title="Home" />
      <CardList
        aria-label="What needs attention"
        items={stats}
        layout="grid" // Three fixed counts browsed side by side, not records read one by one.
        columns={3} // Three counts in one row.
        renderItem={(stat) => (
          <>
            <span className="text-heading">
              <Numeral>{stat.count}</Numeral>
            </span>
            <p>{stat.label}</p>
          </>
        )}
      />
      <Section title="Today's sessions">
        <SessionTable
          caption="Today's sessions"
          data={todaysSessions}
          rowKey={(row) => row.id}
          loading={loading}
          emptyMessage="No sessions today."
          onRowClick={(row, click) => {
            void router.push(`/sessions/${row.id}`);
            click.currentTarget.querySelector('a')?.click();
          }}
        >
          <SessionTable.Column id="session" rowHeader title="Session" dataKey="sessionTypeName" width={220}>
            {(name, row) => (
              <NextLink className="inline-block max-w-full" href={`/sessions/${row.id}`}>
                <Truncate>{name}</Truncate>
              </NextLink>
            )}
          </SessionTable.Column>
          <SessionTable.Column id="time" title="Time" dataKey="startAt" width={180}>
            {(startAt) => <Time value={startAt} withTime />}
          </SessionTable.Column>
          <SessionTable.Column id="bookers" title="Bookers" dataKey="bookers" width={240}>
            {(bookers) => (bookers ? <Truncate>{bookers}</Truncate> : 'No bookings yet')}
          </SessionTable.Column>
        </SessionTable>
      </Section>
      <Section title="Follow-ups due this week">
        <FollowUpTable
          caption="Follow-ups due this week"
          data={followUps}
          rowKey={(row) => row.id}
          loading={loading}
          emptyMessage="No follow-ups due this week."
          onRowClick={(row, click) => {
            void router.push(`/clients/${row.clientId}`);
            click.currentTarget.querySelector('a')?.click();
          }}
        >
          <FollowUpTable.Column id="client" rowHeader title="Client" dataKey="clientName" width={220}>
            {(name, row) => (
              <NextLink className="inline-block max-w-full" href={`/clients/${row.clientId}`}>
                <Truncate>{name}</Truncate>
              </NextLink>
            )}
          </FollowUpTable.Column>
          <FollowUpTable.Column id="date" title="Follow-up date" dataKey="followUpDate" width={160}>
            {(date) => <Time value={date} />}
          </FollowUpTable.Column>
        </FollowUpTable>
      </Section>
      <Section title="Overdue tasks">
        <TaskTable
          caption="Overdue tasks"
          data={overdueTasks}
          rowKey={(row) => row.id}
          loading={loading}
          emptyMessage="No overdue tasks."
          onRowClick={(row, click) => {
            void router.push(`/projects/${row.projectId}`);
            click.currentTarget.querySelector('a')?.click();
          }}
        >
          <TaskTable.Column id="task" rowHeader title="Task" dataKey="title" width={240}>
            {(title, row) => (
              <NextLink className="inline-block max-w-full" href={`/projects/${row.projectId}`}>
                <Truncate>{title}</Truncate>
              </NextLink>
            )}
          </TaskTable.Column>
          <TaskTable.Column id="project" title="Project" dataKey="projectName" width={220}>
            {(name) => <Truncate>{name}</Truncate>}
          </TaskTable.Column>
          <TaskTable.Column id="due" title="Due date" dataKey="dueDate" width={160}>
            {(date) => <Time value={date} />}
          </TaskTable.Column>
        </TaskTable>
      </Section>
    </>
  );
}
