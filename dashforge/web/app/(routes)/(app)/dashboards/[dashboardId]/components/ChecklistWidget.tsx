'use client';

import { addChecklistItem, removeChecklistItem, toggleChecklistItem, updateChecklistItem } from '@app/entities/widget';
import { Button, IconButton } from '@packages/ui/Button';
import { Checkbox } from '@packages/ui/Checkbox';
import { Input } from '@packages/ui/Input';
import { toast } from '@packages/ui/Toast';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';

import type { Widget } from '@app/entities/widget/types';

export function ChecklistWidget({ widget, onSaved }: { widget: Widget; onSaved: () => void }) {
  const [newItem, setNewItem] = useState('');
  const [newError, setNewError] = useState<string | undefined>();
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [draft, setDraft] = useState('');
  const [editError, setEditError] = useState<string | undefined>();
  const [pending, setPending] = useState(false);

  return (
    <div data-ds="" className="flex-col-gap-3">
      {(widget.checklistItemText || []).map((text, idx) => (
        // Key uses text + index as stable as available; checklist items have no id in model
        <div key={`${widget.id}-item-${idx}-${text}`} data-ds="" className="flex-row-gap-2 items-center">
          <Checkbox checked={widget.checklistChecked?.[idx] ?? false} onCheckedChange={(c) => {
            if (pending) return;
            const next = [...(widget.checklistChecked || [])];
            (next as boolean[])[idx] = c;
            setPending(true);
            toggleChecklistItem(widget.id, { checklistChecked: next } as never).then(() => onSaved()).catch(() => toast({ title: 'Saving failed. Try again.', status: 'error' })).finally(() => setPending(false));
          }} value={text} aria-label={text} />
          {editIdx === idx ? (
            <>
              <Input aria-label="Checklist item text" value={draft} onChange={setDraft} autoComplete="off" error={editError} />
              <IconButton tooltip="Save" onClick={async () => {
                if (!draft.trim() || draft.length > 120) { setEditError('Text is required and max 120 characters'); return; }
                setEditError(undefined);
                if (pending) return; setPending(true);
                const nt = [...(widget.checklistItemText || [])]; nt[idx] = draft;
                try { await updateChecklistItem(widget.id, { checklistItemText: nt } as never); onSaved(); setEditIdx(null); } catch { toast({ title: 'Saving failed. Try again.', status: 'error' }); } finally { setPending(false); }
              }}><Check /></IconButton>
              <IconButton tooltip="Cancel" onClick={() => setEditIdx(null)}><X /></IconButton>
            </>
          ) : (
            <>
              <span>{text}</span>
              <IconButton tooltip="Edit" onClick={() => { setEditIdx(idx); setDraft(text); setEditError(undefined); }}><Pencil /></IconButton>
              <IconButton tooltip="Remove" onClick={async () => {
                if (pending) return; setPending(true);
                const nt = (widget.checklistItemText || []).filter((_, i) => i !== idx);
                const nc = (widget.checklistChecked || []).filter((_, i) => i !== idx);
                try { await removeChecklistItem(widget.id, { checklistItemText: nt, checklistChecked: nc } as never); onSaved(); } catch { toast({ title: 'Saving failed. Try again.', status: 'error' }); } finally { setPending(false); }
              }}><Trash2 /></IconButton>
            </>
          )}
        </div>
      ))}
      <span className="flex-row-gap-2 items-center">
        <Input aria-label="New checklist item" value={newItem} onChange={setNewItem} autoComplete="off" error={newError} />
        <Button onClick={async () => {
          const v = newItem.trim(); if (!v || v.length > 120) { setNewError('Text is required and max 120 characters'); return; }
          setNewError(undefined);
          if (pending) return; setPending(true);
          try { await addChecklistItem(widget.id, { checklistItemText: [...(widget.checklistItemText || []), v], checklistChecked: [...(widget.checklistChecked || []), false] } as never); setNewItem(''); onSaved(); } catch { toast({ title: 'Saving failed. Try again.', status: 'error' }); } finally { setPending(false); }
        }}>Add</Button>
      </span>
    </div>
  );
}
