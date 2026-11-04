'use client';

import { isTaskOverdue } from '@app/blocks/Slots/slots';
import { LoadError } from '@app/components/LoadError';
import { NextLink } from '@app/components/NextLink';
import { NotFound } from '@app/components/NotFound';
import { PageHeader } from '@app/components/PageHeader';
import { useListClients } from '@app/entities/client';
import { deleteProject, useGetProject } from '@app/entities/project';
import { completeTask, deleteTask, useListTasks, type Task } from '@app/entities/task';
import { Button, IconButton } from '@packages/ui/Button';
import { DialogResult, openConfirmationDialog } from '@packages/ui/Dialog';
import { SearchInput } from '@packages/ui/Input';
import { Section } from '@packages/ui/Section';
import { Select, SelectOption } from '@packages/ui/Select';
import { createTable } from '@packages/ui/Table';
import { Tag } from '@packages/ui/Tag';
import { toast } from '@packages/ui/Toast';
import { Truncate } from '@packages/ui/Truncate';
import { DescriptionDetails, DescriptionList, DescriptionTerm, Paragraph, Time } from '@packages/ui/Typography';
import { Check, Pencil, Plus, Trash2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { AddTaskDialog } from './components/AddTaskDialog';
import { EditProjectDialog } from './components/EditProjectDialog';
import { EditTaskDialog } from './components/EditTaskDialog';
import { TaskPriorityTag, TaskStatusTag } from './components/TaskStatusTag';

const statusOrder = ['to_do', 'in_progress', 'done'];

type TaskRow = {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate?: string;
  overdue: boolean;
};

const TaskTable = createTable<TaskRow>();

/**
 * S08 The project's name: a project's tasks, narrowed down and ticked done.
 */
export default function ProjectPage() {
  const router = useRouter();
  const { projectId } = useParams<{ projectId: string }>();
  const project = useGetProject(projectId);
  const tasks = useListTasks();
  const clients = useListClients();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [priority, setPriority] = useState('all');
  const [editing, setEditing] = useState(false);
  const [addingTask, setAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [busy, setBusy] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const loading = project.loading || tasks.loading || clients.loading;
  const failed = project.error ?? tasks.error ?? clients.error;
  if (failed) {
    return (
      <>
        <PageHeader title="Project" breadcrumb={[{ label: 'Projects', href: '/projects' }]} />
        <LoadError
          message="The project could not be loaded."
          onRetry={() => {
            project.retry();
            tasks.retry();
            clients.retry();
          }}
        />
      </>
    );
  }

  if (loading && !project.data) {
    return (
      <>
        <PageHeader title="Project" breadcrumb={[{ label: 'Projects', href: '/projects' }]} />
        <Paragraph>Loading project.</Paragraph>
      </>
    );
  }

  if (!project.data) {
    return (
      <NotFound
        title="This project is gone."
        description="It may have been deleted, or the link is wrong."
        back={{ label: 'Back to projects', href: '/projects' }}
      />
    );
  }

  const record = project.data;
  const query = search.trim().toLowerCase();
  const rows: TaskRow[] = tasks.data
    .filter((task) => task.project === record.id)
    .filter((task) => {
      const matchesQuery = !query || task.title.toLowerCase().includes(query);
      const matchesStatus = status === 'all' || task.status === status;
      const matchesPriority = priority === 'all' || task.priority === priority;
      return matchesQuery && matchesStatus && matchesPriority;
    })
    .map((task) => ({
      id: task.id,
      title: task.title,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      overdue: isTaskOverdue(task, today),
    }))
    .sort((a, b) => {
      // Grouped by status, then by due date.
      const orderDiff = statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      if (orderDiff !== 0) return orderDiff;
      return (a.dueDate ?? '') < (b.dueDate ?? '')
        ? -1
        : (a.dueDate ?? '') > (b.dueDate ?? '')
          ? 1
          : 0;
    });

  const hasTasks = tasks.data.some((task) => task.project === record.id);
  const clearFilters = () => {
    setSearch('');
    setStatus('all');
    setPriority('all');
  };

  const tickDone = async (row: TaskRow) => {
    try {
      await completeTask(row.id, { status: 'done' });
      toast({ title: 'Task marked as done', status: 'success' });
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        toast({ title: 'That task is gone', status: 'info' });
      } else {
        toast({ title: 'Could not mark the task as done', status: 'error' });
      }
    }
  };

  const confirmDeleteProject = async () => {
    const result = await openConfirmationDialog({
      title: `Delete ${record.name}?`,
      content: 'Deleting the project deletes its tasks.',
      status: 'error',
      footer: (closeDialog) => (
        <>
          <Button
            variant="base" // Keeping the project is the quiet way out.
            onClick={() => closeDialog(DialogResult.cancel)}
          >
            Cancel
          </Button>
          <Button
            variant="danger" // The filled confirm button destroys the project and its tasks.
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
      const recordCheck = project.data;
      if (!recordCheck) {
        toast({ title: 'This project is already gone', status: 'info' });
        router.push('/projects');
        return;
      }
      for (const task of tasks.data.filter((task) => task.project === record.id)) {
        await deleteTask(task.id);
      }
      await deleteProject(record.id);
      toast({ title: 'Project deleted', status: 'success' });
      router.push('/projects');
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        toast({ title: 'This project is already gone', status: 'info' });
        router.push('/projects');
      } else {
        toast({ title: 'Could not delete the project', status: 'error' });
      }
    } finally {
      setBusy(false);
    }
  };

  const confirmDeleteTask = async (task: Task) => {
    const result = await openConfirmationDialog({
      title: `Delete ${task.title}?`,
      content: 'Deleting the task removes it from the project.',
      status: 'error',
      footer: (closeDialog) => (
        <>
          <Button
            variant="base" // Keeping the task is the quiet way out.
            onClick={() => closeDialog(DialogResult.cancel)}
          >
            Cancel
          </Button>
          <Button
            variant="danger" // The filled confirm button destroys the task.
            onClick={() => closeDialog(DialogResult.confirm)}
          >
            Delete
          </Button>
        </>
      ),
    });
    if (result !== DialogResult.confirm) return;
    try {
      await deleteTask(task.id);
      toast({ title: 'Task deleted', status: 'success' });
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        toast({ title: 'That task is gone', status: 'info' });
      } else {
        toast({ title: 'Could not delete the task', status: 'error' });
      }
    }
  };

  const clientName = clients.data.find((client) => client.id === record.client)?.name ?? 'Client';

  return (
    <>
      <PageHeader
        title={<Truncate>{record.name}</Truncate>}
        description={record.description}
        breadcrumb={[{ label: 'Projects', href: '/projects' }]}
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
              loadingWithReason={busy ? 'Deleting the project' : undefined}
              onClick={() => void confirmDeleteProject()}
            >
              Delete
            </Button>
          </>
        }
      />
      <Section title="Details">
        <DescriptionList>
          {record.dueDate && (
            <div>
              <DescriptionTerm>Due date</DescriptionTerm>
              <DescriptionDetails>
                <Time value={record.dueDate} />
              </DescriptionDetails>
            </div>
          )}
          <div>
            <DescriptionTerm>Client</DescriptionTerm>
            <DescriptionDetails>
              <NextLink href={`/clients/${record.client}`}>{clientName}</NextLink>
            </DescriptionDetails>
          </div>
        </DescriptionList>
      </Section>
      <Section
        title="Tasks"
        headerAction={
          hasTasks ? (
            <Button
              variant="base" // Adding a task is the section's quiet action.
              leftIcon={<Plus />}
              onClick={() => setAddingTask(true)}
            >
              Add a task
            </Button>
          ) : undefined
        }
      >
        {!hasTasks ? (
          <div className="flex-col-gap-3 items-start">
            <Paragraph>No tasks yet. Add the first task to plan this project.</Paragraph>
            <Button leftIcon={<Plus />} onClick={() => setAddingTask(true)}>
              Add a task
            </Button>
          </div>
        ) : (
          <div className="flex-col-gap-3">
            <div role="search" className="flex-row-gap-3 flex-wrap items-end">
              <SearchInput label="Search tasks" placeholder="Task title" value={search} onChange={setSearch} />
              <Select label="Status" allowSearch={false} value={status} onChange={(next) => next && setStatus(next)}>
                <SelectOption value="all" label="All" />
                <SelectOption value="to_do" label="To do" />
                <SelectOption value="in_progress" label="In progress" />
                <SelectOption value="done" label="Done" />
              </Select>
              <Select label="Priority" allowSearch={false} value={priority} onChange={(next) => next && setPriority(next)}>
                <SelectOption value="all" label="All" />
                <SelectOption value="low" label="Low" />
                <SelectOption value="medium" label="Medium" />
                <SelectOption value="high" label="High" />
              </Select>
            </div>
            <TaskTable
              caption="Tasks"
              data={rows}
              rowKey={(row) => row.id}
              loading={tasks.loading}
              emptyMessage="Nothing matches your search or filters."
            >
              <TaskTable.Column id="done" title={<span className="sr-only">Mark done</span>} width={48}>
                {(_, row) =>
                  row.status !== 'done' ? (
                    <IconButton
                      variant="base"
                      look="ghost"
                      size="xs"
                      tooltip="Mark as done"
                      aria-label={`Mark ${row.title} as done`}
                      onClick={() => void tickDone(row)}
                    >
                      <Check />
                    </IconButton>
                  ) : null
                }
              </TaskTable.Column>
              <TaskTable.Column id="title" rowHeader title="Title" dataKey="title" width={240}>
                {(title) => <Truncate>{title}</Truncate>}
              </TaskTable.Column>
              <TaskTable.Column id="status" title="Status" dataKey="status" width={130}>
                {(value: string) => <TaskStatusTag status={value} />}
              </TaskTable.Column>
              <TaskTable.Column id="priority" title="Priority" dataKey="priority" width={120}>
                {(value: string) => <TaskPriorityTag priority={value} />}
              </TaskTable.Column>
              <TaskTable.Column id="due" title="Due date" dataKey="dueDate" width={220}>
                {(_, row) =>
                  row.dueDate ? (
                    <span className="flex-row-gap-2 items-center">
                      {row.overdue ? (
                        <Tag
                          size="xs" // Fits the table row without stretching it.
                          variant="warning" // Overdue tasks stand out in the warning color.
                        >
                          Overdue
                        </Tag>
                      ) : null}
                      <Time value={row.dueDate} />
                    </span>
                  ) : (
                    '—'
                  )
                }
              </TaskTable.Column>
              <TaskTable.Column id="actions" title={<span className="sr-only">Task actions</span>} width={88} align="right">
                {(_, row) => {
                  const task = tasks.data.find((entry) => entry.id === row.id);
                  if (!task) return null;
                  return (
                    <span className="flex-row-gap-2 items-center justify-end">
                      <IconButton
                        variant="base"
                        look="ghost"
                        size="xs"
                        tooltip="Edit task"
                        aria-label={`Edit ${row.title}`}
                        onClick={() => setEditingTask(task)}
                      >
                        <Pencil />
                      </IconButton>
                      <IconButton
                        variant="base" // Row deletes stay as quiet as the row's other actions.
                        look="ghost"
                        size="xs"
                        tooltip="Delete task"
                        aria-label={`Delete ${row.title}`}
                        onClick={() => void confirmDeleteTask(task)}
                      >
                        <Trash2 />
                      </IconButton>
                    </span>
                  );
                }}
              </TaskTable.Column>
            </TaskTable>
            {rows.length === 0 && (
              <Button
                variant="base" // The quiet way out beside the empty message, not the page's main action.
                onClick={clearFilters}
              >
                Clear the search and filters
              </Button>
            )}
          </div>
        )}
      </Section>
      {editing && (
        <EditProjectDialog
          project={record}
          onOpenChange={(open) => !open && setEditing(false)}
          clients={clients.data}
        />
      )}
      {addingTask && (
        <AddTaskDialog projectId={record.id} open onOpenChange={(open) => !open && setAddingTask(false)} />
      )}
      {editingTask && (
        <EditTaskDialog task={editingTask} onOpenChange={(open) => !open && setEditingTask(null)} />
      )}
    </>
  );
}
