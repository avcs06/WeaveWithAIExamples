'use client';

import { updateDashboard } from '@app/entities/dashboard';
import { incrementCounter, updateCounterLabel } from '@app/entities/widget';
import { IconButton } from '@packages/ui/Button';
import { Input } from '@packages/ui/Input';
import { Numeral } from '@packages/ui/Numeral';
import { toast } from '@packages/ui/Toast';
import { Check, Minus, Pencil, Plus, X } from 'lucide-react';
import React, { useState } from 'react';

import type { Widget } from '@app/entities/widget/types';

export function CounterWidget({ widget, dashboardId, onSaved }: { widget: Widget; dashboardId: string; onSaved: () => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [pending, setPending] = useState(false);

  const change = async (delta: number) => {
    if (pending) return;
    setPending(true);
    try { await incrementCounter(widget.id, { counterValue: (widget.counterValue ?? 0) + delta } as never); await updateDashboard(dashboardId, { lastEditedAt: new Date().toISOString() }); onSaved(); } catch { toast({ title: 'Saving failed. Try again.', status: 'error' }); } finally { setPending(false); }
  };

  return (
    <div data-ds="" className="flex-col-gap-3">
      {editing ? (
        <span className="flex-row-gap-2 items-center">
          <Input aria-label="Counter label" value={draft} onChange={setDraft} autoComplete="off" error={error} />
          <IconButton tooltip="Save" onClick={async () => {
            if (draft.length > 40) { setError('Max 40 characters'); return; }
            setError(undefined);
            try { await updateCounterLabel(widget.id, { counterLabel: draft } as never); onSaved(); setEditing(false); } catch { toast({ title: 'Saving failed. Try again.', status: 'error' }); }
          }}><Check /></IconButton>
          <IconButton tooltip="Cancel" onClick={() => setEditing(false)}><X /></IconButton>
        </span>
      ) : (
        <span className="flex-row-gap-2 items-center">
          <span>{widget.counterLabel || 'Count'}</span>
          <IconButton tooltip="Edit label" onClick={() => { setEditing(true); setDraft(widget.counterLabel || ''); setError(undefined); }}><Pencil /></IconButton>
        </span>
      )}
      <div data-ds="" className="flex-row-gap-3 items-center">
        <IconButton tooltip="Decrease" onClick={() => change(-1)} loadingWithReason={pending ? 'Saving' : undefined}><Minus /></IconButton>
        <Numeral>{widget.counterValue ?? 0}</Numeral>
        <IconButton tooltip="Increase" onClick={() => change(1)} loadingWithReason={pending ? 'Saving' : undefined}><Plus /></IconButton>
      </div>
    </div>
  );
}
