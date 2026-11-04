'use client';

import { DashboardHeader } from '@app/blocks/DashboardHeader';
import { DeleteDashboardDialog } from '@app/blocks/DeleteDashboardDialog';
import { NotFound } from '@app/components/NotFound';
import { PageHeader } from '@app/components/PageHeader';
import { deleteDashboard, duplicateDashboard, updateDashboard, useGetDashboard } from '@app/entities/dashboard';
import { addLink, createWidget, deleteWidget, removeLink, repositionWidget, updateLink, updateWidgetTitle, useListWidgets } from '@app/entities/widget';
import { Button, IconButton } from '@packages/ui/Button';
import { CardList } from '@packages/ui/Card';
import { Dialog } from '@packages/ui/Dialog';
import { Dropdown } from '@packages/ui/Dropdown';
import { Input } from '@packages/ui/Input';
import { Select, SelectOption } from '@packages/ui/Select';
import { toast } from '@packages/ui/Toast';
import { Check, ChevronDown, ChevronUp, Pencil, Settings, Trash2, X } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { ChecklistWidget } from './components/ChecklistWidget';
import { CounterWidget } from './components/CounterWidget';
import { LinkListWidget } from './components/LinkListWidget';
import { NoteWidget } from './components/NoteWidget';

import type { Widget } from '@app/entities/widget/types';

const sizeSpan: Record<string, string> = { small: 'span 4', medium: 'span 6', large: 'span 12' };

export default function DashboardDetailPage() {
  const params = useParams<{ dashboardId: string }>();
  const dashboardId = params.dashboardId;
  const { data: dashboard, loading: dashLoading, error: dashError, retry } = useGetDashboard(dashboardId);
  const { data: allWidgets, loading: wLoading } = useListWidgets();
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timer2Ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); if (timer2Ref.current) clearTimeout(timer2Ref.current); }, []);

  const flash = () => {
    setSaving(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSaving(false); setSaved(true);
      timer2Ref.current = setTimeout(() => setSaved(false), 1500);
    }, 300);
  };

  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [nType, setNType] = useState('note');
  const [nTitle, setNTitle] = useState('');
  const [nSize, setNSize] = useState('medium');
  const [nErr, setNErr] = useState<string | undefined>();
  const [nPending, setNPending] = useState(false);
  const [remId, setRemId] = useState<string | null>(null);
  const [remPending, setRemPending] = useState(false);
  const [editLinkW, setEditLinkW] = useState<Widget | null>(null);
  const [editLinkIdx, setEditLinkIdx] = useState<number | null>(null);
  const [lTitle, setLTitle] = useState('');
  const [lUrl, setLUrl] = useState('');
  const [lErr, setLErr] = useState<string | undefined>();
  const [lPending, setLPending] = useState(false);
  const [editWTitle, setEditWTitle] = useState<string | null>(null);
  const [wTitleDraft, setWTitleDraft] = useState('');
  const [wTitleErr, setWTitleErr] = useState<string | undefined>();
  const [dupPending, setDupPending] = useState(false);

  const widgets = useMemo(() => {
    if (!allWidgets) return [];
    return allWidgets.filter((w) => w.dashboard === dashboardId).sort((a, b) => a.position - b.position);
  }, [allWidgets, dashboardId]);

  const [widgetGoneIds, setWidgetGoneIds] = useState<Set<string>>(new Set());
  // Detect widgets that disappeared (T48)
  const prevWidgetIdsRef = useRef<Set<string> | null>(null);
  useEffect(() => {
    const current = new Set(widgets.map((w) => w.id));
    if (prevWidgetIdsRef.current) {
      const gone = [...prevWidgetIdsRef.current].filter((id) => !current.has(id));
      if (gone.length) setWidgetGoneIds((s) => new Set([...s, ...gone]));
    }
    prevWidgetIdsRef.current = current;
  }, [widgets]);

  if (dashLoading || wLoading) return <PageHeader title="Loading" />;
  if (dashError) return <><PageHeader title="Error" /><p role="alert">Failed to load</p><Button onClick={retry}>Retry</Button></>;
  if (!dashboard) return <NotFound title="Dashboard not found" description="This dashboard is gone." back={{ label: 'Go to your dashboards', href: '/dashboards' }} />;
  const handleDup = async () => {
    if (dupPending) return; setDupPending(true);
    let copy: { id: string } | null = null;
    const createdIds: string[] = [];
    try {
      copy = await duplicateDashboard({ name: `${dashboard.name} Copy`, lastEditedAt: new Date().toISOString() });
      for (const w of widgets) { const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = w; const c = await createWidget({ ...rest, dashboard: copy.id } as never); createdIds.push(c.id); }
      router.push(`/dashboards/${copy.id}`);
    } catch {
      if (copy) {
        for (const wid of createdIds) { try { await deleteWidget(wid); } catch { /* ignore */ } }
        try { await deleteDashboard(copy.id); } catch { /* ignore */ }
      }
      toast({ title: 'Could not duplicate. Try again.', status: 'error' });
    } finally { setDupPending(false); }
  };
  const handleCreate = async () => {
    if (nPending) return;
    if (!nType) { setNErr('Title max 60 characters and type is required'); return; }
    if (nTitle.length > 60) { setNErr('Title max 60 characters and type is required'); return; }
    setNPending(true);
    let created: { id: string } | null = null;
    try {
      const title = nTitle || nType.charAt(0).toUpperCase() + nType.slice(1);
      created = await createWidget({ title, type: nType as Widget['type'], size: nSize as Widget['size'], position: widgets.length + 1, dashboard: dashboardId, noteText: '', counterLabel: '', counterValue: 0, checklistItemText: [], checklistChecked: [], linkTitle: [], linkUrl: [] } as never);
      await updateDashboard(dashboardId, { lastEditedAt: new Date().toISOString() }); flash(); toast({ title: 'Widget created' }); setShowAdd(false); setNTitle(''); setNErr(undefined);
    } catch {
      if (created) { try { await deleteWidget(created.id); } catch { /* rollback failed */ } }
      setNErr('Could not create widget. Try again.');
    } finally { setNPending(false); }
  };
  const handleRemoveW = async () => {
    if (!remId || remPending) return; setRemPending(true);
    try { await deleteWidget(remId); await updateDashboard(dashboardId, { lastEditedAt: new Date().toISOString() }); flash(); toast({ title: 'Widget removed' }); setRemId(null); } catch { toast({ title: 'Could not remove widget. Try again.', status: 'error' }); } finally { setRemPending(false); }
  };
  const [wTitleSaving, setWTitleSaving] = useState(false);
  const handleWTitle = async (w: Widget) => {
    if (wTitleSaving) return;
    if (wTitleDraft.length > 60) { setWTitleErr('Max 60 characters'); return; }
    setWTitleSaving(true);
    try { await updateWidgetTitle(w.id, { title: wTitleDraft } as never); await updateDashboard(dashboardId, { lastEditedAt: new Date().toISOString() }); flash(); setEditWTitle(null); setWTitleErr(undefined); } catch { setWTitleErr('Saving failed. Try again.'); } finally { setWTitleSaving(false); }
  };
  const handleMove = async (w: Widget, dir: number) => {
    const idx = widgets.findIndex((x) => x.id === w.id); const ni = idx + dir; if (ni < 0 || ni >= widgets.length) return;
    const other = widgets[ni];
    const origW = w.position; const origO = other.position;
    try { await repositionWidget(w.id, { position: origO } as never); await repositionWidget(other.id, { position: origW } as never); await updateDashboard(dashboardId, { lastEditedAt: new Date().toISOString() }); flash(); } catch {
      // Rollback: try to restore positions
      try { await repositionWidget(w.id, { position: origW } as never); await repositionWidget(other.id, { position: origO } as never); } catch { /* rollback failed */ }
      toast({ title: 'Could not reorder. Try again.', status: 'error' });
    }
  };

  return (
    <>
      <DashboardHeader dashboard={dashboard} editing={editing} onToggleEditing={setEditing} onDuplicate={handleDup} savingText={saving ? 'Saving' : saved ? 'Saved' : ''} />
      {widgetGoneIds.size > 0 ? <p role="status">This widget is gone.</p> : null}

      {widgets.length === 0 ? (
        <div data-ds="" className="flex-col-gap-3 items-start">
          <p>No widgets yet. Add your first widget to start building.</p>
          <Button onClick={() => setShowAdd(true)}>Add widget</Button>
        </div>
      ) : (
        <div data-ds="" className="grid gap-4" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
          {widgets.map((w) => (
            <div key={w.id} data-ds="" style={{ gridColumn: sizeSpan[w.size] || 'span 6' }}>
              <CardList
                // grid shows small/medium/large widgets with different footprints
                layout="grid"
                aria-label={w.title || w.type}
                items={[{ id: w.id }]}
                renderItem={() => (
                  <>
                    <div data-ds="" className="flex-row-gap-2 items-center">
                      {editing && editWTitle === w.id ? (
                        <>
                          <Input aria-label="Widget title" value={wTitleDraft} onChange={setWTitleDraft} autoComplete="off" error={wTitleErr} />
                          <IconButton tooltip="Save" onClick={() => handleWTitle(w)} loadingWithReason={wTitleSaving ? 'Saving' : undefined}><Check /></IconButton>
                          <IconButton tooltip="Cancel" onClick={() => setEditWTitle(null)}><X /></IconButton>
                        </>
                      ) : (
                        <>
                          <h3>{w.title || w.type.charAt(0).toUpperCase() + w.type.slice(1)}</h3>
                          {editing ? <IconButton tooltip="Edit title" onClick={() => { setEditWTitle(w.id); setWTitleDraft(w.title || ''); setWTitleErr(undefined); }}><Pencil /></IconButton> : null}
                        </>
                      )}
                      {editing ? (
                        <>
                          <IconButton tooltip={widgets.length === 1 ? 'Add another widget to reorder' : 'Move up'} disabledWithReason={widgets.length === 1 ? 'Add another widget to reorder' : undefined} onClick={() => handleMove(w, -1)}><ChevronUp /></IconButton>
                          <IconButton tooltip={widgets.length === 1 ? 'Add another widget to reorder' : 'Move down'} disabledWithReason={widgets.length === 1 ? 'Add another widget to reorder' : undefined} onClick={() => handleMove(w, 1)}><ChevronDown /></IconButton>
                          <Dropdown menu={<><Dropdown.Item onSelect={async () => { await repositionWidget(w.id, { size: 'small' } as never); flash(); }}>Small</Dropdown.Item><Dropdown.Item onSelect={async () => { await repositionWidget(w.id, { size: 'medium' } as never); flash(); }}>Medium</Dropdown.Item><Dropdown.Item onSelect={async () => { await repositionWidget(w.id, { size: 'large' } as never); flash(); }}>Large</Dropdown.Item></>}>
                            <IconButton tooltip="Size"><Settings /></IconButton>
                          </Dropdown>
                          <IconButton tooltip="Remove" onClick={() => setRemId(w.id)}><Trash2 /></IconButton>
                        </>
                      ) : null}
                    </div>
                    {w.type === 'note' ? <NoteWidget widget={w} dashboardId={dashboardId} onSaved={flash} /> : null}
                    {w.type === 'counter' ? <CounterWidget widget={w} dashboardId={dashboardId} onSaved={flash} /> : null}
                    {w.type === 'checklist' ? <ChecklistWidget widget={w} onSaved={flash} /> : null}
                    {w.type === 'link_list' ? <LinkListWidget widget={w} onAdd={() => { setEditLinkW(w); setEditLinkIdx(null); setLTitle(''); setLUrl(''); setLErr(undefined); }} onEdit={(idx) => { setEditLinkW(w); setEditLinkIdx(idx); setLTitle(w.linkTitle?.[idx] || ''); setLUrl(w.linkUrl?.[idx] || ''); setLErr(undefined); }} /> : null}
                  </>
                )}
              />
            </div>
          ))}
        </div>
      )}

      {showDelete ? <DeleteDashboardDialog dashboardId={dashboard.id} dashboardName={dashboard.name} open={showDelete} onOpenChange={setShowDelete} onDeleted={() => router.push('/dashboards')} /> : null}

      <Dialog title="Add widget" open={showAdd} onOpenChange={setShowAdd} footer={(close) => <><Button onClick={() => close()}>Cancel</Button><Button onClick={handleCreate} loadingWithReason={nPending ? 'Creating widget' : undefined}>Create</Button></>}>
        <div data-ds="" className="flex-col-gap-3">
          <Select label="Type" value={nType} onChange={setNType}><SelectOption value="note" label="Note" /><SelectOption value="counter" label="Counter" /><SelectOption value="checklist" label="Checklist" /><SelectOption value="link_list" label="Link list" /></Select>
          <Input label="Title" value={nTitle} onChange={setNTitle} autoComplete="off" />
          <Select label="Size" value={nSize} onChange={setNSize}><SelectOption value="small" label="Small" /><SelectOption value="medium" label="Medium" /><SelectOption value="large" label="Large" /></Select>
          {nErr ? <p role="alert">{nErr}</p> : null}
        </div>
      </Dialog>

      <Dialog title="Remove this widget?" open={!!remId} onOpenChange={(o) => !o && setRemId(null)} footer={(close) => <><Button onClick={() => close()}>Cancel</Button><Button
                // destructive confirm removes widget permanently
                variant="danger"
                onClick={handleRemoveW}
                loadingWithReason={remPending ? 'Removing widget' : undefined}
              >Remove</Button></>}>
        <p>This will permanently delete the widget and its contents. This cannot be undone.</p>
      </Dialog>

      <Dialog title={editLinkIdx !== null ? 'Edit link' : 'Add link'} open={!!editLinkW} onOpenChange={(o) => !o && setEditLinkW(null)} footer={(close) => <><Button onClick={() => close()}>Cancel</Button><Button onClick={async () => {
        if (lPending) return;
        if (!lTitle.trim() || lTitle.length > 80 || !lUrl.trim() || !/^https?:\/\//.test(lUrl)) { setLErr('Title is required max 80 and URL must be valid http/https'); return; }
        if (!editLinkW) return; setLPending(true);
        try {
          if (editLinkIdx !== null) { const nt = [...(editLinkW.linkTitle || [])]; const nu = [...(editLinkW.linkUrl || [])]; nt[editLinkIdx] = lTitle; nu[editLinkIdx] = lUrl; await updateLink(editLinkW.id, { linkTitle: nt, linkUrl: nu } as never); }
          else { await addLink(editLinkW.id, { linkTitle: [...(editLinkW.linkTitle || []), lTitle], linkUrl: [...(editLinkW.linkUrl || []), lUrl] } as never); }
          await updateDashboard(dashboardId, { lastEditedAt: new Date().toISOString() }); flash(); toast({ title: 'Link saved' }); setEditLinkW(null);
        } catch { setLErr('Could not save link. Try again.'); } finally { setLPending(false); }
      }} loadingWithReason={lPending ? 'Saving link' : undefined}>Save</Button></>}>
        <div data-ds="" className="flex-col-gap-3">
          <Input label="Link title" value={lTitle} onChange={setLTitle} autoComplete="off" />
          <Input label="Link URL" value={lUrl} onChange={setLUrl} autoComplete="off" placeholder="https://" />
          {lErr ? <p role="alert">{lErr}</p> : null}
        </div>
      </Dialog>
    </>
  );
}
