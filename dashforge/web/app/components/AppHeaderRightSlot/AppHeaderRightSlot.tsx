'use client';

import { useCurrentUser } from '@app/entities/auth';
import { createDashboard, useListDashboards } from '@app/entities/dashboard';
import { Button } from '@packages/ui/Button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

/**
 * The right end of the app's header bar.
 *
 * Put here, in this order:
 * - The app's main action, when the theme puts it here. Use a `Button` from
 *   `@packages/ui/Button`. Example: "New invoice".
 * - The account. Code places `UserMenu` here when the theme puts the
 *   account at the right. It shows Sign in to a visitor and the account
 *   menu to a member. Keep it last, as it is.
 *
 * PageLayout draws the bar and lays these items in a row. Return only the
 * items: no wrapper, height, padding, background or border.
 *
 * Never put here:
 * - A page's own actions. They go in the page's `PageHeader`.
 *
 * The line "The theme puts here" below names this app's items. Build those
 * and nothing else.
 *
 * The theme puts here: It holds: Create button.
 */
export const AppHeaderRightSlot = () => {
  const user = useCurrentUser();
  const { data: dashboards, loading } = useListDashboards();
  const router = useRouter();
  const [creating, setCreating] = useState(false);

  if (user === undefined || user === null) return null;
  // Hide Create while the list is still loading or confirmed empty (S04 empty-state requirement)
  if (!loading && (dashboards?.length ?? 0) === 0) return null;

  const handleCreate = async () => {
    if (creating) return;
    setCreating(true);
    try {
      const records = dashboards ?? [];
      const base = 'Untitled Dashboard';
      let name = base;
      let n = 2;
      const names = new Set(records.map((r) => r.name));
      while (names.has(name)) {
        name = `${base} ${n}`;
        n += 1;
      }
      const dashboard = await createDashboard({ name, lastEditedAt: new Date().toISOString() });
      router.push(`/dashboards/${dashboard.id}`);
    } finally {
      setCreating(false);
    }
  };

  return (
    <Button leftIcon={<Plus />} loading={creating} onClick={handleCreate}>
      Create dashboard
    </Button>
  );
};
