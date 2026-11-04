'use client';

import { AddProjectDialog } from '@app/blocks/ProjectDialogs/AddProjectDialog';
import { LoadError } from '@app/components/LoadError';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { useListClients } from '@app/entities/client';
import { useListProjects } from '@app/entities/project';
import { useListTasks } from '@app/entities/task';
import { Button } from '@packages/ui/Button';
import { SearchInput } from '@packages/ui/Input';
import { Numeral } from '@packages/ui/Numeral';
import { createTable } from '@packages/ui/Table';
import { Truncate } from '@packages/ui/Truncate';
import { Paragraph, Time } from '@packages/ui/Typography';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type ProjectRow = {
  id: string;
  name: string;
  clientId: string;
  clientName: string;
  dueDate?: string;
  openTasks: number;
};

const ProjectTable = createTable<ProjectRow>();

/**
 * S07 Projects: every project and how much work is still open.
 */
export default function ProjectsPage() {
  const router = useRouter();
  const projects = useListProjects();
  const tasks = useListTasks();
  const clients = useListClients();
  const [search, setSearch] = useState('');
  const [adding, setAdding] = useState(false);

  const clientName = (clientId: string) =>
    clients.data.find((client) => client.id === clientId)?.name ?? 'Client';

  const query = search.trim().toLowerCase();
  const rows: ProjectRow[] = projects.data
    .filter((project) => {
      if (!query) return true;
      return (
        project.name.toLowerCase().includes(query) ||
        clientName(project.client).toLowerCase().includes(query)
      );
    })
    .map((project) => ({
      id: project.id,
      name: project.name,
      clientId: project.client,
      clientName: clientName(project.client),
      dueDate: project.dueDate,
      openTasks: tasks.data.filter((task) => task.project === project.id && task.status !== 'done').length,
    }));

  const loading = projects.loading || tasks.loading || clients.loading;
  const failed = projects.error ?? tasks.error ?? clients.error;
  if (failed) {
    return (
      <>
        <PageHeader title="Projects" />
        <LoadError
          message="The project list could not be loaded."
          onRetry={() => {
            projects.retry();
            tasks.retry();
            clients.retry();
          }}
        />
      </>
    );
  }

  if (loading && projects.data.length === 0) {
    return (
      <>
        <PageHeader title="Projects" />
        <Paragraph>Loading projects.</Paragraph>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Projects"
        description="Every project and how much work is still open."
        actions={
          projects.data.length > 0 ? (
            <Button leftIcon={<Plus />} onClick={() => setAdding(true)}>
              Add a project
            </Button>
          ) : undefined
        }
      />
      {projects.data.length === 0 ? (
        <div className="flex-col-gap-3 items-start">
          <Paragraph>No projects yet. Add the first project to track your work.</Paragraph>
          <Button leftIcon={<Plus />} onClick={() => setAdding(true)}>
            Add a project
          </Button>
        </div>
      ) : (
        <div className="flex-col-gap-3">
          <div role="search">
            <SearchInput
              label="Search projects"
              placeholder="Project or client name"
              value={search}
              onChange={setSearch}
            />
          </div>
          <ProjectTable
            caption="Projects"
            data={rows}
            rowKey={(row) => row.id}
            loading={projects.loading || tasks.loading || clients.loading}
            emptyMessage="Nothing matches your search."
            onRowClick={(row, click) => {
              void router.push(`/projects/${row.id}`);
              click.currentTarget.querySelector('a')?.click();
            }}
          >
            <ProjectTable.Column id="name" rowHeader title="Name" dataKey="name" width={240}>
              {(name, row) => (
                <NextLink className="inline-block max-w-full" href={`/projects/${row.id}`}>
                  <Truncate>{name}</Truncate>
                </NextLink>
              )}
            </ProjectTable.Column>
            <ProjectTable.Column id="client" title="Client" dataKey="clientName" width={200}>
              {(name, row) => (
                <NextLink className="inline-block max-w-full" href={`/clients/${row.clientId}`}>
                  <Truncate>{name}</Truncate>
                </NextLink>
              )}
            </ProjectTable.Column>
            <ProjectTable.Column id="due" title="Due date" dataKey="dueDate" width={160}>
              {(dueDate: string | undefined) => (dueDate ? <Time value={dueDate} /> : '—')}
            </ProjectTable.Column>
            <ProjectTable.Column id="open" title="Open tasks" dataKey="openTasks" width={120} align="right">
              {(count: number) => <Numeral>{count}</Numeral>}
            </ProjectTable.Column>
          </ProjectTable>
          {rows.length === 0 && (
            <Button
              variant="base" // The quiet way out beside the empty message, not the page's main action.
              onClick={() => setSearch('')}
            >
              Clear the search
            </Button>
          )}
        </div>
      )}
      {adding && (
        <AddProjectDialog
          open
          onOpenChange={(open) => !open && setAdding(false)}
          onSaved={() => setAdding(false)}
          clients={clients.data}
        />
      )}
    </>
  );
}
