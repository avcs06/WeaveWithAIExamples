'use client';

import { updateDashboard } from '@app/entities/dashboard';
import { updateNoteText } from '@app/entities/widget';
import { Textarea } from '@packages/ui/Textarea';
import { toast } from '@packages/ui/Toast';
import React, { useState } from 'react';

import type { Widget } from '@app/entities/widget/types';

export function NoteWidget({ widget, dashboardId, onSaved }: { widget: Widget; dashboardId: string; onSaved: () => void }) {
  const [error, setError] = useState<string | undefined>();
  const [pending, setPending] = useState(false);
  return (
    <div data-ds="" className="flex-col-gap-2">
      <Textarea
        label="Note"
        value={widget.noteText || ''}
        onChange={async (v) => {
          if (pending) return;
          if (v.length > 5000) { setError('Max 5000 characters'); return; }
          setError(undefined);
          setPending(true);
          try { await updateNoteText(widget.id, { noteText: v } as never); await updateDashboard(dashboardId, { lastEditedAt: new Date().toISOString() }); onSaved(); } catch { toast({ title: 'Saving failed. Try again.', status: 'error' }); } finally { setPending(false); }
        }}
        error={error}
      />
    </div>
  );
}
