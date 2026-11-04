'use client';

import { removeLink } from '@app/entities/widget';
import { Button, IconButton } from '@packages/ui/Button';
import { Link } from '@packages/ui/Link';
import { toast } from '@packages/ui/Toast';
import { Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react';

import type { Widget } from '@app/entities/widget/types';

function isSafeUrl(url: string): boolean {
  return /^https?:\/\//.test(url);
}

export function LinkListWidget({ widget, onAdd, onEdit }: { widget: Widget; onAdd: () => void; onEdit: (idx: number) => void }) {
  const [pendingIdx, setPendingIdx] = useState<number | null>(null);
  return (
    <div data-ds="" className="flex-col-gap-3">
      {(widget.linkTitle || []).map((title, idx) => {
        const url = widget.linkUrl?.[idx] || '';
        return (
          <div key={`${widget.id}-link-${idx}-${title}`} data-ds="" className="flex-row-gap-2 items-center">
            {isSafeUrl(url) ? <Link href={url} target="_blank" rel="noreferrer">{title}</Link> : <span>{title}</span>}
            <IconButton tooltip="Edit link" onClick={() => onEdit(idx)}><Pencil /></IconButton>
            <IconButton tooltip="Remove link" loadingWithReason={pendingIdx === idx ? 'Removing' : undefined} onClick={async () => {
              if (pendingIdx !== null) return; setPendingIdx(idx);
              const nt = (widget.linkTitle || []).filter((_, i) => i !== idx);
              const nu = (widget.linkUrl || []).filter((_, i) => i !== idx);
              try { await removeLink(widget.id, { linkTitle: nt, linkUrl: nu } as never); } catch { toast({ title: 'Saving failed. Try again.', status: 'error' }); } finally { setPendingIdx(null); }
            }}><Trash2 /></IconButton>
          </div>
        );
      })}
      <Button onClick={onAdd}>Add link</Button>
    </div>
  );
}
