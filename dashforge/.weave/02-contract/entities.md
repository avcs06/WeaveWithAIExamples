# Entities

## Dashboard

`@app/entities/dashboard`

- `name`: text
- `lastEditedAt`: datetime

- `listDashboards()` or `useListDashboards()`: List user's dashboards sorted by lastEditedAt descending, filtered by name search
- `getDashboard(id)` or `useGetDashboard(id)`: Get single dashboard by id
- `createDashboard(input)`: Create new dashboard with default name Untitled Dashboard
- `duplicateDashboard(input)`: Duplicate dashboard as '{original name} Copy' with all widgets copied
- `updateDashboard(id, changes)`: Update dashboard name and refresh lastEditedAt
- `deleteDashboard(id)`: Permanently delete dashboard and all its widgets
- `touchDashboard(id, changes)`: Touch dashboard to refresh lastEditedAt after widget changes

## Widget

`@app/entities/widget`

- `title`: text, optional
- `type`: enum WidgetType
- `size`: enum WidgetSize
- `noteText`: text, optional
- `counterLabel`: text, optional
- `counterValue`: int, optional
- `position`: int
- `dashboard`: ref Dashboard id
- `checklistItemText`: text, a list, optional
- `checklistChecked`: boolean, a list, optional
- `linkTitle`: text, a list, optional
- `linkUrl`: url, a list, optional

- `listWidgets()` or `useListWidgets()`: List widgets of a dashboard in relative order
- `getWidget(id)` or `useGetWidget(id)`: Get single widget by id
- `createWidget(input)`: Create widget with type, title, size and type-specific defaults
- `deleteWidget(id)`: Permanently delete widget and its contents
- `updateWidgetTitle(id, changes)`: Update widget title
- `repositionWidget(id, changes)`: Reposition widget to new order index
- `resizeWidget(id, changes)`: Resize widget to small/medium/large
- `updateNoteText(id, changes)`: Update note widget text
- `incrementCounter(id, changes)`: Increase or decrease counter value by 1
- `updateCounterLabel(id, changes)`: Update counter label
- `addChecklistItem(id, changes)`: Add checklist item to ordered list
- `toggleChecklistItem(id, changes)`: Toggle checklist item checked state
- `updateChecklistItem(id, changes)`: Update checklist item text
- `removeChecklistItem(id, changes)`: Remove checklist item from ordered list
- `addLink(id, changes)`: Add link to link list
- `updateLink(id, changes)`: Update link title and URL
- `removeLink(id, changes)`: Remove link from ordered list

## Enums

`@app/entities/enums`

- `WidgetType`: `note` (note), `counter` (counter), `checklist` (checklist), `link_list` (linkList); options in `WidgetTypeOptions`
- `WidgetSize`: `small` (small), `medium` (medium), `large` (large); options in `WidgetSizeOptions`

## Sign-in

`@app/entities/auth`: `signUp(email)`, `signIn(email)`, `signOut()`, `useCurrentUser()`.
