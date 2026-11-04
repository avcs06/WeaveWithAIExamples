import { mockCall } from '../mock';

import { useWidgetStore } from './store';

/** Remove all widgets belonging to a dashboard, via entity layer (no direct store access from UI). */
export async function deleteWidgetsByDashboard(dashboardId: string): Promise<void> {
  await mockCall('deleteWidgetsByDashboard');
  useWidgetStore.setState(({ records }) => ({
    records: records.filter((w) => w.dashboard !== dashboardId),
  }));
}
