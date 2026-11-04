'use client';

import { DeleteDashboardDialog } from '@app/blocks/DeleteDashboardDialog';
import { PageHeader } from '@app/components/PageHeader';
import { updateDashboard } from '@app/entities/dashboard';
import { Button, IconButton } from '@packages/ui/Button';
import { Dropdown } from '@packages/ui/Dropdown';
import { Input } from '@packages/ui/Input';
import { toast } from '@packages/ui/Toast';
import { Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import type { Dashboard } from '@app/entities/dashboard/types';

export function DashboardHeader({
  dashboard,
  editing,
  onToggleEditing,
  onDuplicate,
  savingText,
}: {
  dashboard: Dashboard;
  editing: boolean;
  onToggleEditing: (v: boolean) => void;
  onDuplicate: () => void;
  savingText: string;
}) {
  const [dashName, setDashName] = useState(dashboard.name);
  const [dashErr, setDashErr] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (saving) return;
    if (!dashName.trim() || dashName.length > 80) { setDashErr('Name is required and max 80 characters'); return; }
    setSaving(true);
    try { await updateDashboard(dashboard.id, { name: dashName, lastEditedAt: new Date().toISOString() }); toast({ title: 'Dashboard saved' }); } catch { setDashErr('Could not save. Try again.'); } finally { setSaving(false); }
  };

  return (
    <>
      <PageHeader
        title={
          <span className="flex-row-gap-2 items-center">
            <span>{dashboard.name}</span>
            <span aria-live="polite" className="opacity-60">{savingText}</span>
          </span>
        }
        breadcrumb={[{ label: 'Back to dashboards', href: '/dashboards' }]}
        actions={
          editing ? (
            <>
              <Dropdown menu={<><Dropdown.Item onSelect={onDuplicate}>Duplicate</Dropdown.Item><Dropdown.Item onSelect={() => setShowDelete(true)}>Delete</Dropdown.Item></>}>
                <Button>More</Button>
              </Dropdown>
              <Button onClick={() => onToggleEditing(false)}>Done</Button>
            </>
          ) : (
            <Button onClick={() => onToggleEditing(true)}>Edit</Button>
          )
        }
      />
      {editing ? (
        <div data-ds="" className="flex-row-gap-2 items-center">
          <Input aria-label="Dashboard name" value={dashName} onChange={setDashName} autoComplete="off" error={dashErr} />
          <IconButton tooltip="Save" onClick={handleSave} loadingWithReason={saving ? 'Saving' : undefined}><Check /></IconButton>
          <IconButton tooltip="Cancel" onClick={() => setDashName(dashboard.name)}><X /></IconButton>
        </div>
      ) : null}
      {showDelete ? <DeleteDashboardDialog dashboardId={dashboard.id} dashboardName={dashboard.name} open={showDelete} onOpenChange={setShowDelete} onDeleted={() => router.push('/dashboards')} /> : null}
    </>
  );
}
