'use client';

import { DeleteDashboardDialog } from '@app/blocks/DeleteDashboardDialog';
import { NextLink } from '@app/components/NextLink';
import { PageHeader } from '@app/components/PageHeader';
import { createDashboard, deleteDashboard, duplicateDashboard, updateDashboard, useListDashboards } from '@app/entities/dashboard';
import { createWidget, deleteWidgetsByDashboard, useListWidgets } from '@app/entities/widget';
import { Button, IconButton } from '@packages/ui/Button';
import { Dropdown } from '@packages/ui/Dropdown';
import { Input, SearchInput } from '@packages/ui/Input';
import { createTable } from '@packages/ui/Table';
import { toast } from '@packages/ui/Toast';
import { Tooltip } from '@packages/ui/Tooltip';
import { Time } from '@packages/ui/Typography';
import { Check, EllipsisVertical, Pencil, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';

import type { Dashboard } from '@app/entities/dashboard/types';

const DashTable = createTable<Dashboard>();

export default function DashboardsPage() {
  const { data: dashboards, loading, error, retry } = useListDashboards();
  const { data: allWidgets } = useListWidgets();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editError, setEditError] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Dashboard | null>(null);
  const [goneMessage, setGoneMessage] = useState<string | null>(null);

  const sorted = useMemo(() => {
    if (!dashboards) return [];
    return [...dashboards].sort((a, b) => new Date(b.lastEditedAt).getTime() - new Date(a.lastEditedAt).getTime());
  }, [dashboards]);

  const filtered = useMemo(() => {
    if (!search.trim()) return sorted;
    const q = search.toLowerCase();
    return sorted.filter((d) => d.name.toLowerCase().includes(q));
  }, [sorted, search]);

  const isEmpty = !loading && !error && sorted.length === 0;
  const noResults = !loading && !error && sorted.length > 0 && filtered.length === 0;

  const handleCreate = async () => {
    if (pendingId) return;
    setPendingId('create');
    setGoneMessage(null);
    try {
      const base = 'Untitled Dashboard';
      let name = base;
      let n = 2;
      const names = new Set(sorted.map((r) => r.name));
      while (names.has(name)) { name = `${base} ${n}`; n += 1; }
      const d = await createDashboard({ name, lastEditedAt: new Date().toISOString() });
      router.push(`/dashboards/${d.id}`);
    } catch {
      toast({ title: 'Could not create dashboard. Try again.', status: 'error' });
    } finally { setPendingId(null); }
  };

  const startEdit = (d: Dashboard) => { setEditingId(d.id); setEditName(d.name); setEditError(undefined); };
  const cancelEdit = () => { setEditingId(null); setEditName(''); setEditError(undefined); };
  const saveEdit = async (d: Dashboard) => {
    if (saving) return;
    if (!editName.trim() || editName.length > 80) { setEditError('Name is required and max 80 characters'); return; }
    setSaving(true);
    try {
      await updateDashboard(d.id, { name: editName, lastEditedAt: new Date().toISOString() });
      toast({ title: 'Dashboard saved' });
      setEditingId(null);
    } catch (e: unknown) {
      const msg = (e as Error).message;
      if (msg.includes('not found')) {
        setGoneMessage('This dashboard is no longer available.');
        setEditingId(null);
      } else {
        setEditError('Could not save. Try again.');
      }
    } finally { setSaving(false); }
  };
  const handleDuplicate = async (d: Dashboard) => {
    if (pendingId) return;
    setPendingId(d.id);
    let copy: Dashboard | null = null;
    const createdWidgetIds: string[] = [];
    try {
      copy = await duplicateDashboard({ name: `${d.name} Copy`, lastEditedAt: new Date().toISOString() });
      for (const w of (allWidgets || []).filter((x) => x.dashboard === d.id)) {
        const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = w;
        const created = await createWidget({ ...rest, dashboard: copy.id } as never);
        createdWidgetIds.push(created.id);
      }
      toast({ title: 'Dashboard duplicated' });
      router.push(`/dashboards/${copy.id}`);
    } catch {
      // Rollback partial widgets + dashboard on failure (T65)
      if (copy) {
        for (const wid of createdWidgetIds) { try { await (await import('@app/entities/widget')).deleteWidget(wid); } catch { /* ignore */ } }
        try { await deleteDashboard(copy.id); } catch { /* ignore */ }
        await deleteWidgetsByDashboard(copy.id).catch(() => {});
      }
      toast({ title: 'Could not duplicate. Try again.', status: 'error' });
    } finally { setPendingId(null); }
  };

  if (loading) return <PageHeader title="Your dashboards" />;
  if (error) return <><PageHeader title="Your dashboards" /><p role="alert">Failed to load. </p><Button onClick={retry}>Retry</Button></>;
  if (isEmpty) {
    return (
      <>
        <PageHeader title="Your dashboards" />
        <div data-ds="" className="flex-col-gap-4 items-start">
          <p>No dashboards yet. Create your first dashboard to start your console.</p>
          <Button onClick={handleCreate} loadingWithReason={pendingId === 'create' ? 'Creating dashboard' : undefined}>Create dashboard</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Your dashboards" />
      {goneMessage ? <p role="alert">{goneMessage}</p> : null}
      <div data-ds="" className="flex-col-gap-4">
        <div data-ds="" className="flex-row-gap-3 items-center">
          <SearchInput label="Search" value={search} onChange={setSearch} />
        </div>
        {noResults ? (
          <div data-ds="" className="flex-col-gap-3 items-start">
            <p>No results for your search. Try another name.</p>
            <Button onClick={() => setSearch('')}>Clear search</Button>
          </div>
        ) : (
          <DashTable data={filtered} rowKey={(d) => d.id} caption="Your dashboards" onRowClick={(d) => router.push(`/dashboards/${d.id}`)}>
            <DashTable.Column id="name" rowHeader title="Name" dataKey="name" width={300}>
              {(name: string, d: Dashboard) =>
                editingId === d.id ? (
                  <span className="flex-row-gap-2 items-center">
                    <Input aria-label="Dashboard name" value={editName} onChange={setEditName} autoComplete="off" error={editError} />
                    <IconButton tooltip="Save" onClick={() => saveEdit(d)} loadingWithReason={saving ? 'Saving' : undefined}>
                      <Check />
                    </IconButton>
                    <IconButton tooltip="Cancel" onClick={cancelEdit}><X /></IconButton>
                  </span>
                ) : (
                  <span className="flex-row-gap-2 items-center">
                    <NextLink href={`/dashboards/${d.id}`}>{name}</NextLink>
                    <IconButton tooltip="Rename" onClick={(e: React.MouseEvent) => { e.stopPropagation(); startEdit(d); }}><Pencil /></IconButton>
                  </span>
                )
              }
            </DashTable.Column>
            <DashTable.Column id="lastEditedAt" title="Last edited" dataKey="lastEditedAt" width={200}>
              {(val: string) => (
                <Tooltip tooltip={new Date(val).toLocaleString()}>
                  <Time value={val} />
                </Tooltip>
              )}
            </DashTable.Column>
            <DashTable.Column id="actions" title="" width={80}>
              {(_: unknown, d: Dashboard) => (
                <Dropdown menu={<><Dropdown.Item onSelect={() => handleDuplicate(d)}>Duplicate</Dropdown.Item><Dropdown.Item onSelect={() => setDeleteTarget(d)}>Delete</Dropdown.Item></>}>
                  <IconButton tooltip="More actions" loadingWithReason={pendingId === d.id ? 'Duplicating' : undefined}><EllipsisVertical /></IconButton>
                </Dropdown>
              )}
            </DashTable.Column>
          </DashTable>
        )}
      </div>
      {deleteTarget ? <DeleteDashboardDialog dashboardId={deleteTarget.id} dashboardName={deleteTarget.name} open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)} onDeleted={() => setDeleteTarget(null)} /> : null}
    </>
  );
}
