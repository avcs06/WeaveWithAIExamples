# DashForge: scope

For individuals who want a single personal space for notes, numbers, tasks and links. They struggle to keep scattered information visible and actionable in one place. DashForge lets them create dashboards, add and arrange note, counter, checklist and link-list widgets in a glowing console editor, with every change saved automatically.

Audience: Individuals building personal dashboards for themselves

Kinds of app: editor

## Roles
- User (user, signs in): Owner of personal dashboards who creates and edits dashboards and widgets

## Vocabulary
- Dashboard (owned by User): A personal dashboard that contains an ordered set of widgets
- Widget (owned by User): A block inside a dashboard of type note, counter, checklist or linkList with title, position, size and type-specific settings

## In scope
- Public landing page that explains personal dashboards, previews the dark glowing console style with neon controls and grid, and has a clear Create / Get Started call to action to sign up or sign in
- Account sign up with email and password, sign in, sign out and persistent session so dashboards are private to their owner
- Create a new dashboard with a default name and immediately land in the editor; editor saves all changes automatically with visible Saving/Saved status
- List all of my dashboards showing dashboard name and when each was last edited, sorted by most recently edited first, with empty state that invites creating the first dashboard
- Open any dashboard from the list in the editor, rename the dashboard, duplicate it including all widgets and their content, and delete it with confirmation
- Add widgets to a dashboard: note widget (plain text), counter widget (number with label and increase/decrease controls), checklist widget (items that can be added and ticked/unticked), link list widget (titles and web addresses)
- Configure any widget: edit its title, edit its type-specific settings, change its position relative to other widgets, resize it between small, medium and large, and remove it from the dashboard
- Interact with widget content in the editor: type and edit note text, increase or decrease counter value by 1, add/tick/untick/edit/remove checklist items, add/edit/remove links and open links in a new tab
- Automatic saving of dashboard name, widget order, size, titles, settings and content; last edited timestamp updates on any change and survives a page refresh
- Business rules: dashboard name is required; widget title is optional and defaults to widget type; widget size defaults to medium and is one of small/medium/large; counter starts at 0 and changes by 1 and can go negative; checklist items have text and checked state; links require title and valid http/https URL; deleting a dashboard or widget permanently removes it and its contents; position is relative order rendered by design

## Out of scope
- Public sharing, shared links or collaboration on dashboards: Idea describes personal dashboards only with a private list per user; no sharing is mentioned Instead: All dashboards remain private to their owner; no share links, invites or public views
- Custom widget types beyond the four listed and widget marketplace/templates: MVP focuses on one core loop with four widget types done well Instead: Only note, counter, checklist and link list widgets are available; users start from a blank dashboard
- Free-form canvas positioning with pixel coordinates: Idea says position relative to other widgets and where widgets sit on screen is up to the design Instead: Widgets are ordered in a single ordered list/grid; position is changed via move up/down or drag to reorder within that order
- Import/export, teams/workspaces and native mobile apps: Not mentioned in idea and not needed for core personal-dashboard loop Instead: No import/export, no teams, web only

## Assumptions
- A01 (data, affects Dashboard name, Duplicate naming): Dashboard name is required, defaults to 'Untitled Dashboard' plus number (e.g., Untitled Dashboard 2) on create, max 80 characters, uniqueness not required
- A02 (behavior, affects Create dashboard): New dashboard starts empty with no widgets
- A03 (behavior, affects Duplicate dashboard): Duplicate creates a copy named '{original name} Copy' with all widgets, their order, sizes, titles and content copied exactly, placed at top of list
- A04 (behavior, affects Delete dashboard): Delete dashboard requires confirmation and permanently removes the dashboard and all its widgets with no trash or undo in MVP
- A05 (behavior, affects Dashboard list): lastEditedAt updates on any dashboard or widget change, list is sorted by lastEditedAt descending, shown as relative time (just now, 2m ago) with full timestamp on hover
- A06 (behavior, affects Editor, Auto-save): Auto-save triggers on every change with ~500ms debounce, shows Saving/Saved indicator; refresh restores last saved state; no manual save button
- A07 (data, affects Widget configuration): Widget title is optional, defaults to capitalized type name (Note, Counter, Checklist, Link List), max 60 characters, can be renamed at any time
- A08 (data, affects Note widget): Note widget stores plain text only with no formatting, max 5000 characters
- A09 (behavior, affects Counter widget): Counter widget has optional label (max 40 chars) and integer value starting at 0, increased/decreased by 1 per click, can go negative, no min/max in MVP
- A10 (data, affects Checklist widget): Checklist widget stores ordered items each with text (max 120 chars) and checked boolean; users can add, tick/untick, edit text and remove items
- A11 (data, affects Link list widget): Link list widget stores ordered links each with title (max 80 chars, required) and URL (required, must be valid http:// or https://); clicking opens in new tab
- A12 (behavior, affects Widget position): Widget position is relative order (integer order index); changing position reorders the list via up/down controls or drag handle; design renders order in a responsive grid
- A13 (presentation, affects Widget resize): Widget size is one of small, medium, large, defaults to medium on add, affects visual footprint only
- A14 (permission, affects Ownership, Privacy): All dashboards and widgets are private to the signed-in user who created them; no sharing, no teams, no public views
- A15 (scope, affects Sign up, Sign in): Authentication is email and password only for MVP; session persists until sign out
- A16 (presentation, affects Theming, Styling): Visual style is a single dark, screen-like glowing console with neon edges/numbers, monospace figures and faint grid behind widgets; no theme switcher in MVP but all widgets remain easy to read

## Questions
- Q01: Should deleted dashboards be recoverable via trash/undo? Why: Changes delete from permanent to soft-delete and requires trash UI and retention rules Default: No, permanent delete with confirmation is sufficient for MVP
- Q02: Should there be a hard limit on number of dashboards per user or widgets per dashboard? Why: Affects limits, validation messages and performance safeguards Default: No hard limit enforced in UI for MVP; assume soft guard of 50 dashboards and 20 widgets per dashboard
- Q03: Should checklist items support editing and deleting after creation, or only add and tick? Why: Idea says add and tick off, silent on edit/delete which changes widget interactions Default: Allow add, tick/untick, edit text and remove items for a complete checklist loop
- Q04: Should counter support custom step size or min/max constraints? Why: Changes counter settings and validation beyond simple increase/decrease Default: No, fixed step of 1 with no min/max for MVP
