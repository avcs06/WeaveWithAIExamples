# DashForge: flows catalog

## Flows
- F01 Visit landing page and get started (User, landing, starts On the public landing page (not signed in)): Visitor arrives on the public landing page that explains personal dashboards for notes, numbers, tasks and links, previews the dark screen-like glowing console with neon controls, edges, numbers, monospace figures and faint grid behind widgets. The page shows a clear Create / Get Started call to action. Visitor chooses to sign up or sign in and is taken to the appropriate auth form. No fields are collected on the landing page itself.
- F02 Sign up (User, auth, starts On the landing page): Visitor chooses to sign up from the landing page, sees the sign-up form FM01, fills in Email (FD01) and Password (FD02) and submits. On success the website creates the account, establishes a persistent session, and shows the home dashboard list. Validation, conflict and failure alternatives are handled.
- F03 Sign in (User, auth, starts On the landing page): Visitor chooses to sign in, sees the sign-in form FM01, fills in Email (FD01) and Password (FD02) and submits. On success the website restores the session and shows the home dashboard list sorted by lastEditedAt descending.
- F04 Sign out (User, auth, starts On any signed-in page (home or editor)): Signed-in user chooses to sign out from the account menu. The website clears the persistent session and shows the public landing page. No fields are required.
- F05 See my dashboards (home) (User, home, starts After signing in or navigating to home): User lands on home which lists all dashboards they own showing Dashboard name (FD03) and lastEditedAt as relative time with full timestamp on hover, sorted by lastEditedAt descending. The list includes a Search (FD14) field to filter dashboards by name as the user types. From here they can open any dashboard in the editor, create a new dashboard, or use dashboard row actions (rename, duplicate, delete). Empty state shows a message and a Create dashboard action when no dashboards exist; when search yields no matches the website shows no results and offers to clear the search.
- F06 Open dashboard in editor (User, view Dashboard, starts On the home dashboard list): User selects a dashboard from the home list. The website opens the editor for that Dashboard, showing its name (FD03), auto-save indicator, and all its Widgets in relative order rendered in a responsive grid. User can then interact with widgets, configure them, or rename/duplicate/delete the dashboard. Handles notFound if dashboard was deleted.
- F07 Create a new dashboard (User, create Dashboard, starts On the home dashboard list or from the editor): User chooses Create dashboard. The website creates a new Dashboard with default name (FD03) set to Untitled Dashboard plus number if needed, lastEditedAt set to now, no widgets, and immediately lands the user in the editor for that dashboard with Saving/Saved indicator visible. No fields are filled by user before creation; renaming is a separate edit flow.
- F08 Rename dashboard (User, edit Dashboard, starts In the dashboard editor or from the home list row action): User chooses to rename the Dashboard, sees the dashboard name field (FD03) in place or in a rename form FM02, edits the name and confirms. The website validates required and max 80 chars, auto-saves with debounce and updates lastEditedAt. Invalid and failure alternatives keep typed value and offer retry.
- F09 Duplicate dashboard (User, act Dashboard, starts On the home dashboard list or in the dashboard editor): User chooses Duplicate on a Dashboard. The website creates a copy with name (FD03) set to '{original} Copy', copies all Widgets including Widget title (FD04), Widget size (FD06), Widget type (FD05), position order and all type-specific content, sets lastEditedAt to now, and shows it at top of home list and optionally opens it in editor.
- F10 Delete dashboard (User, delete Dashboard, starts On the home dashboard list or in the dashboard editor): User chooses Delete on a Dashboard. The website asks for confirmation. On confirm it permanently deletes the Dashboard and all its Widgets with no trash/undo, updates the home list, and navigates to home if needed. Cancel leaves everything unchanged. Handles notFound if already deleted.
- F11 Add a widget to dashboard (User, create Widget, starts In the dashboard editor): User chooses Add widget, picks Widget type (FD05) from note/counter/checklist/linkList, optionally sets initial Widget title (FD04) and Widget size (FD06) defaulting to medium. On save the website creates the Widget with type-specific defaults (note text empty, counter 0 with empty label, checklist empty, link list empty), assigns next order position, auto-saves and shows it in the grid with Saving/Saved indicator.
- F12 Configure widget title (User, edit Widget, starts In the dashboard editor on an existing widget): User opens widget configuration for a Widget and edits Widget title (FD04) optional max 60 chars defaulting to type name. User saves; website validates, auto-saves with debounce, updates lastEditedAt and shows Saved. Counter label/value and checklist/link list item management are handled in separate act flows F17, F18 and F19.
- F13 Reposition widget (User, act Widget, starts In the dashboard editor on an existing widget): User changes Widget position using up/down controls or drag handle to reorder. The website updates the widget's order index, re-renders the grid in new order, auto-saves the dashboard's widget order and updates lastEditedAt with Saving/Saved feedback. No fields are typed.
- F14 Resize widget (User, act Widget, starts In the dashboard editor on an existing widget): User picks Widget size (FD06) as small, medium or large via size control. The website applies the size to the widget's visual footprint only, auto-saves and updates lastEditedAt with Saving/Saved indicator.
- F15 Remove widget (User, delete Widget, starts In the dashboard editor on an existing widget): User chooses Remove on a Widget, confirms when asked. The website permanently deletes the Widget and its type-specific content, reflows remaining widgets, auto-saves and updates lastEditedAt. Cancel leaves widget unchanged. Handles notFound if already deleted.
- F16 Edit note widget text (User, act Widget, starts In the dashboard editor on a note widget): User types or edits Note text (FD07) plain text up to 5000 chars directly in the note widget. The website auto-saves on change with ~500ms debounce showing Saving/Saved and updates lastEditedAt. Validation for max length is shown inline.
- F17 Increase or decrease counter (User, act Widget, starts In the dashboard editor on a counter widget): User taps increase or decrease controls on the counter widget to change its value by 1; can go negative with no min/max. User can also edit Counter label (FD08) max 40 chars via inline edit. Each change auto-saves with Saving/Saved feedback and updates lastEditedAt.
- F18 Manage checklist items (User, act Widget, starts In the dashboard editor on a checklist widget): User manages items inside a checklist widget: adds a new item by filling Checklist item text (FD09) via form FM06 and submitting, ticks/unticks an item toggling Checklist item checked (FD10), edits item text inline (FD09), and removes an item. The website maintains ordered items, auto-saves each change with Saving/Saved indicator and updates lastEditedAt. Validation ensures text required and max 120 chars.
- F19 Manage link list items (User, act Widget, starts In the dashboard editor on a link list widget): User manages links inside a link list widget: adds a link by filling Link title (FD11) and Link URL (FD12) via form FM03, edits existing link's title/URL, removes a link, and clicks a link to open its URL in a new tab. The website validates title required max 80 and URL required valid http/https, maintains order, auto-saves each change with Saving/Saved feedback and updates lastEditedAt.
- F20 Manage account (User, account, starts On any signed-in page via account menu): User opens account settings, sees their Email (FD01) read-only, and can change password by filling Current password (FD13) and New password (FD02) in form FM04 and submitting. The website validates new password length and updates credentials with success feedback. No dashboard data is affected.

## Skipped
- User, browse Dashboard: Covered by F05 home flow which is the dashboard list sorted by lastEditedAt with search by name (FD14); separate browse would duplicate home (must-have home satisfied by F05)
- User, browse Widget: Widgets are not browsed globally; they are viewed and managed inside their Dashboard editor (F06, F11-F19)
- User, view Widget: Widgets have no standalone detail page; they are viewed inline in the dashboard editor (F06)
- User, settings: No user preferences or theme switcher in MVP per A16; visual style is fixed dark glowing console

## Fields

### Dashboard
- FD03 Name (required, 1 to 80 characters), e.g. "Morning Focus". How the user refers to the dashboard; required and shown in list and editor

### Widget
- FD04 Title (optional, up to 60 characters), e.g. "Daily Notes". Optional heading for the widget; defaults to capitalized type name
- FD05 Type (required, one of: note, counter, checklist, linkList), e.g. "note". Kind of widget to add: note, counter, checklist or link list
- FD06 Size (required, one of: small, medium, large), e.g. "medium". Visual footprint of the widget
- FD07 Note text (optional, up to 5000 characters), e.g. "Remember to review PRs at 10am". Plain text content of a note widget
- FD08 Counter label (optional, up to 40 characters), e.g. "Coffees". Optional label describing what the counter counts
- FD09 Checklist item text (required, 1 to 120 characters), e.g. "Buy milk". Text of a single checklist item
- FD10 Checked (required), e.g. "false". Whether the checklist item is ticked off
- FD11 Link title (required, 1 to 80 characters), e.g. "Figma". Display title for a link in a link list widget
- FD12 Link URL (required, up to 2048 characters), e.g. "https://figma.com". Web address for the link; must be http or https

### Kept by no record
- FD01 Email (required, up to 254 characters), e.g. "alex@example.com". Account email used to sign in and own dashboards
- FD02 Password (required, 8 to 128 characters), e.g. "correct-horse-battery". Secret protecting the account; new password when changing
- FD13 Current password (required, 8 to 128 characters), e.g. "old-password-123". Existing password to verify identity before changing
- FD14 Search (optional, up to 80 characters), e.g. "Morning". Filter dashboards by name

## Forms
- FM01 Auth form: FD01, FD02
- FM02 Dashboard name form: FD03
- FM03 Link form: FD11, FD12
- FM04 Change password form: FD13, FD02
- FM05 Widget create form: FD05, FD04, FD06
- FM06 Checklist item form: FD09

## New assumptions
- A17 (behavior, affects Home, Browse): Home dashboard list doubles as browse and includes search by dashboard name (FD14) to satisfy the editor must-have browse/search expectation and P08 for lists that can grow to 50 dashboards; no additional filters or pagination beyond search in MVP
- A18 (behavior, affects View Dashboard, Editor): Editor is the view for dashboards; there is no separate read-only view. Interacting with widget content happens directly in the editor with auto-save
- A19 (behavior, affects Widget type): Widget create flow covers all four types via a type picker; type cannot be changed after creation, user must delete and re-add to change type
- A20 (scope, affects Account): Account page shows email read-only and allows password change; email change and account deletion are out of scope for MVP
- A21 (scope, affects Dashboard act, Widget act): Publish, share, export, undo/redo and template/marketplace features are out of scope for MVP per outOfScope; no flows are provided for these acts beyond duplicate (F09) and widget reposition/resize/content acts
