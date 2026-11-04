# DashForge: contract

The records the app keeps, the operations its screens call, and what each screen and dialog loads. Every record also has id, createdAt, updatedAt. Sign up, sign in and sign out are built in.

## Entities

### Dashboard

Implements Dashboard.

| Field | Kind | Required |
| ----- | ---- | -------- |
| name | text | yes |
| lastEditedAt | datetime | yes |

### Widget

Implements Widget.

| Field | Kind | Required |
| ----- | ---- | -------- |
| title | text | no |
| type | enum WidgetType | yes |
| size | enum WidgetSize | yes |
| noteText | text | no |
| counterLabel | text | no |
| counterValue | int | no |
| position | int | yes |
| dashboard | ref Dashboard | yes |
| checklistItemText | text list | no |
| checklistChecked | boolean list | no |
| linkTitle | text list | no |
| linkUrl | url list | no |

## Enums

- WidgetType: note (`note`), counter (`counter`), checklist (`checklist`), linkList (`link_list`)
- WidgetSize: small (`small`), medium (`medium`), large (`large`)

## Operations

| Operation | Kind | Entity | Summary | Inputs | Serves |
| --------- | ---- | ------ | ------- | ------ | ------ |
| listDashboards | list | Dashboard | List user's dashboards sorted by lastEditedAt descending, filtered by name search | FD14 Search as q | F05.S01 |
| getDashboard | get | Dashboard | Get single dashboard by id | none | F05.S02, F06.S01, F08.S01 |
| createDashboard | create | Dashboard | Create new dashboard with default name Untitled Dashboard | none | F07.S01 |
| duplicateDashboard | create | Dashboard | Duplicate dashboard as '{original name} Copy' with all widgets copied | none | F09.S01 |
| updateDashboard | update | Dashboard | Update dashboard name and refresh lastEditedAt | FD03 Name as name | F08.S02 |
| deleteDashboard | delete | Dashboard | Permanently delete dashboard and all its widgets | none | F10.S01 |
| listWidgets | list | Widget | List widgets of a dashboard in relative order | FD03 Name as dashboard | F06.S01 |
| getWidget | get | Widget | Get single widget by id | none | F12.S01, F14.S01, F16.S01, F18.S01, F19.S01 |
| createWidget | create | Widget | Create widget with type, title, size and type-specific defaults | FD05 Type as type, FD04 Title as title, FD06 Size as size | F11.S02 |
| deleteWidget | delete | Widget | Permanently delete widget and its contents | none | F10.S01, F15.S01 |
| touchDashboard | update | Dashboard | Touch dashboard to refresh lastEditedAt after widget changes | none | F11.S02, F12.S02, F13.S01, F14.S02, F16.S02, F17.S01, F17.S02, F18.S02, F18.S03, F18.S04, F18.S05, F19.S02, F19.S03, F19.S04 |
| updateWidgetTitle | update | Widget | Update widget title | FD04 Title as title | F12.S02 |
| repositionWidget | update | Widget | Reposition widget to new order index | none | F13.S01 |
| resizeWidget | update | Widget | Resize widget to small/medium/large | FD06 Size as size | F14.S02 |
| updateNoteText | update | Widget | Update note widget text | FD07 Note text as noteText | F16.S02 |
| incrementCounter | update | Widget | Increase or decrease counter value by 1 | none | F17.S01 |
| updateCounterLabel | update | Widget | Update counter label | FD08 Counter label as counterLabel | F17.S02 |
| addChecklistItem | update | Widget | Add checklist item to ordered list | FD09 Checklist item text as checklistItemText | F18.S02 |
| toggleChecklistItem | update | Widget | Toggle checklist item checked state | none | F18.S03 |
| updateChecklistItem | update | Widget | Update checklist item text | FD09 Checklist item text as checklistItemText | F18.S04 |
| removeChecklistItem | update | Widget | Remove checklist item from ordered list | none | F18.S05 |
| addLink | update | Widget | Add link to link list | FD11 Link title as linkTitle, FD12 Link URL as linkUrl | F19.S02 |
| updateLink | update | Widget | Update link title and URL | FD11 Link title as linkTitle, FD12 Link URL as linkUrl | F19.S03 |
| removeLink | update | Widget | Remove link from ordered list | none | F19.S04 |

## What each screen loads

- FR01 Public site frame: none
- FR02 App frame: none
- S01 Your personal console, finally in one place: none
- S02 Create your account: none
- S03 Sign in: none
- S04 Your dashboards: listDashboards
- S05 The dashboard's name, as in "Morning Focus": getDashboard, listWidgets, getWidget
- S06 Account: none
- D01 Delete dashboard?: getDashboard
- D02 Add widget: none
- D03 Remove widget?: getWidget
- D04 Link details: getWidget
