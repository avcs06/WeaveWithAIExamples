# DashForge: user flows

## F01 Visit landing page and get started
User · landing · Goal: Understand what DashForge is for and start creating dashboards.
Starts: On the public landing page (not signed in)
Before: Not signed in.

1. The visitor views the public landing page. The website shows what DashForge is for — a single personal space for notes, numbers, tasks and links — with a preview of the dark glowing console style with neon controls, edges, numbers, monospace figures and faint grid behind widgets, and a clear Create / Get Started call to action to sign up or sign in.
2. The visitor chooses to get started to create an account. The website shows the sign-up form.

Other paths
- F01.A01 (from 1, other) The visitor already has an account and chooses to sign in instead:
  1. The visitor chooses to sign in. The website shows the sign-in form.
  Flow ends.

Outcome: Visitor has seen what DashForge does, the dark glowing console preview, and has a clear path to sign up or sign in.

## F02 Sign up
User · auth · Goal: Create a private account to own dashboards.
Starts: On the landing page
Before: Not signed in.

1. The visitor chooses to sign up. The website shows the sign-up form.
2. The visitor fills in the form and submits it. (Auth form)
   - Email (required, up to 254 characters), e.g. "alex@example.com"
   - Password (required, 8 to 128 characters), e.g. "correct-horse-battery"
   The website creates the account, signs the user in with a persistent session and shows the home dashboard list.

Other paths
- F02.A01 (from 2, invalid) The email is not a valid email address, or the password is shorter than 8 characters or longer than 128 characters:
  1. (system) The website marks the field that is wrong, explains what is required and keeps what was typed.
  Back to 2.
- F02.A02 (from 2, conflict) The email already has an account:
  1. (system) The website says an account with that email already exists and offers to sign in instead.
  2. The visitor chooses to sign in. The website shows the sign-in form.
  Flow ends.
- F02.A03 (from 2, failure) Creating the account fails:
  1. (system) The website keeps the values and offers to try again.
  Back to 2.

Outcome: Account created, user is signed in with persistent session and taken to their dashboard list (home); refresh keeps them signed in.

## F03 Sign in
User · auth · Goal: Sign in to access private dashboards.
Starts: On the landing page
Before: Not signed in.; Account already exists.

1. The visitor chooses to sign in. The website shows the sign-in form.
2. The visitor fills in the form and submits it. (Auth form)
   - Email (required, up to 254 characters), e.g. "alex@example.com"
   - Password (required, 8 to 128 characters), e.g. "correct-horse-battery"
   The website verifies the credentials, restores the persistent session and shows the home dashboard list sorted by last edited most recent first.

Other paths
- F03.A01 (from 2, invalid) The email is not a valid email address or the password is empty:
  1. (system) The website marks the field that is wrong, explains what is required and keeps what was typed.
  Back to 2.
- F03.A02 (from 2, denied) The email and password do not match any account:
  1. (system) The website says the email or password is incorrect and keeps the email while clearing the password.
  Back to 2.
- F03.A03 (from 2, failure) Signing in fails:
  1. (system) The website keeps the values and offers to try again.
  Back to 2.

Outcome: User is signed in with persistent session and sees their dashboard list; refresh keeps them signed in.

## F04 Sign out
User · auth · Goal: End the session securely.
Starts: On any signed-in page (home or editor)
Before: Signed in.

1. The user chooses to sign out. The website ends the persistent session and shows the public landing page.

Other paths
- F04.A01 (from 1, failure) Signing out fails:
  1. (system) The website keeps the user signed in and offers to try again.
  Back to 1.

Outcome: Session ended, user is returned to the public landing page; dashboards are no longer accessible until sign in again.

## F05 See my dashboards (home)
User · home · Goal: See all my dashboards last-edited first and open one or create a new one.
Starts: After signing in or navigating to home
Before: Signed in.

1. The user navigates to home.
   - Search (optional, up to 80 characters), e.g. "Morning"
   The website shows the list of the user's dashboards sorted by last edited most recent first, each showing dashboard name and when it was last edited as relative time with full timestamp on hover, and a search field to filter by name and an action to create a new dashboard.
   Changes: lists Dashboard.
2. The user chooses a dashboard from the list to open it. The website opens that dashboard in the editor.
   Changes: reads Dashboard.

Other paths
- F05.A01 (from 1, empty) The user has no dashboards yet:
  1. (system) The website shows an empty state message that no dashboards exist yet and invites the user to create the first dashboard via the Create dashboard action that starts creating a new dashboard.
  Flow ends.
- F05.A02 (from 1, other) The user filters dashboards by name:
  1. The user types in the search field to filter dashboards by name.
     - Search (optional, up to 80 characters), e.g. "Morning"
     The website filters the list to only dashboards whose name contains the typed text and shows the matching results.
  Back to 1.
- F05.A03 (from 1, empty) No dashboard name matches the search text:
  1. (system) The website shows that no results match the search and offers to clear the search to see all dashboards again.
  2. The user clears the search. The website restores the full list of dashboards sorted by last edited most recent first.
  Back to 1.
- F05.A04 (from 2, notFound) The dashboard was deleted in the meantime:
  1. (system) The website says the dashboard is no longer available and shows the home list again.
  Flow ends.

Outcome: User sees the list of their dashboards with name and last edited time, sorted most recent first; empty state invites creating first dashboard; refresh shows same list.

## F06 Open dashboard in editor
User · view Dashboard · Goal: Open a dashboard to view and work with its widgets.
Starts: On the home dashboard list
Before: Signed in.; At least one dashboard exists.

1. The user selects a dashboard from the list. The website opens the editor for that Dashboard showing its name, Saving/Saved status, and its Widgets in relative order in the glowing console grid.
   Changes: reads Dashboard, lists Widget.

Other paths
- F06.A01 (from 1, notFound) The dashboard was deleted in the meantime:
  1. (system) The website says the dashboard is gone and shows the home dashboard list.
  Flow ends.
- F06.A02 (from 1, empty) The dashboard has no widgets yet:
  1. (system) The website shows the editor with the dashboard name and Saving/Saved status and an empty state inviting the user to add a widget.
  Flow ends.

Outcome: Dashboard editor is open showing dashboard name, Saving/Saved status, and its ordered widgets in the glowing console grid; refresh restores same state.

## F07 Create a new dashboard
User · create Dashboard · Goal: Start a new empty dashboard and begin editing immediately.
Starts: On the home dashboard list or from the editor
Before: Signed in.

1. The user chooses to create a dashboard. The website creates a new Dashboard with default name Untitled Dashboard (numbered if needed), sets lastEditedAt to now with no widgets, and opens it in the editor showing its name and Saving/Saved status.
   Changes: creates Dashboard.

Other paths
- F07.A01 (from 1, failure) Creating the dashboard fails:
  1. (system) The website keeps the user where they were and offers to try again.
  Back to 1.

Outcome: New Dashboard created with default name Untitled Dashboard (numbered if needed) and empty widget list, opened in editor; it appears in the home list sorted by lastEditedAt descending; refresh keeps it.

## F08 Rename dashboard
User · edit Dashboard · Goal: Change the dashboard's name.
Starts: In the dashboard editor or from the home list row action
Before: Signed in.; At least one dashboard exists and is open or listed.

1. The user chooses to rename the dashboard. The website shows the dashboard name field with the current name ready to edit.
   Changes: reads Dashboard.
2. The user edits the name and confirms. (Dashboard name form)
   - Name (required, 1 to 80 characters), e.g. "Morning Focus"
   The website validates the name, auto-saves with Saving then Saved status, updates lastEditedAt, and shows the new name in the editor and home list.
   Changes: updates Dashboard.

Other paths
- F08.A01 (from 2, invalid) The name is empty or longer than 80 characters:
  1. (system) The website marks the name field as invalid, explains it is required and max 80 characters, and keeps what was typed.
  Back to 2.
- F08.A02 (from 2, failure) Saving the new name fails:
  1. (system) The website keeps the typed name and offers to try again.
  Back to 2.
- F08.A03 (from 1, notFound) The dashboard was deleted in the meantime:
  1. (system) The website says the dashboard is gone and shows the home dashboard list.
  Flow ends.
- F08.A04 (from 1, cancel) The user cancels renaming:
  1. (system) Nothing is changed; the website shows the dashboard with its previous name.
  Flow ends.

Outcome: Dashboard name (FD03) updated, lastEditedAt refreshed, auto-saved with Saved status; new name appears in editor and home list and survives refresh.

## F09 Duplicate dashboard
User · act Dashboard · Goal: Make a copy of a dashboard with all widgets to start a new one from it.
Starts: On the home dashboard list or in the dashboard editor
Before: Signed in.; At least one dashboard exists.

1. The user chooses Duplicate on a dashboard. The website creates a copy named '{original name} Copy' with all Widgets, their order, sizes, titles and content copied exactly, sets lastEditedAt to now, shows it in the home list sorted by lastEditedAt descending and opens it in the editor.
   Changes: creates Dashboard, creates Widget.

Other paths
- F09.A01 (from 1, notFound) The dashboard was deleted in the meantime:
  1. (system) The website says the dashboard is gone and shows the home dashboard list.
  Flow ends.
- F09.A02 (from 1, failure) Duplicating the dashboard fails:
  1. (system) The website keeps the original dashboard unchanged and offers to try again.
  Back to 1.

Outcome: New Dashboard created named '{original name} Copy' with all Widgets, their order, sizes, titles and content copied exactly, with fresh lastEditedAt and shown in the home list sorted by lastEditedAt descending; refresh keeps both.

## F10 Delete dashboard
User · delete Dashboard · Goal: Permanently remove a dashboard and its widgets.
Starts: On the home dashboard list or in the dashboard editor
Before: Signed in.; At least one dashboard exists.

1. The user chooses Delete on a dashboard. The website asks the user to confirm permanently deleting the dashboard and all its widgets.
   Changes: deletes Dashboard, deletes Widget.

Other paths
- F10.A01 (from 1, confirm) The user confirms the deletion:
  1. (system) The website permanently deletes the dashboard and all its widgets, removes it from the home list, and if the user was in the editor returns them to the home list.
  Flow ends.
- F10.A02 (from 1, cancel) The user cancels:
  1. (system) Nothing is deleted; the website shows the dashboard as it was.
  Flow ends.
- F10.A03 (from 1, notFound) The dashboard was already deleted:
  1. (system) The website says the dashboard is already gone and shows the home dashboard list.
  Flow ends.
- F10.A04 (from 1, failure) Deleting fails after confirmation:
  1. (system) The website keeps the dashboard and offers to try again.
  Back to 1.

Outcome: Dashboard and all its Widgets permanently deleted, removed from home list; if deleted from editor user returns to home; refresh keeps it gone.

## F11 Add a widget to dashboard
User · create Widget · Goal: Add a new note, counter, checklist or link list block to the dashboard.
Starts: In the dashboard editor
Before: Signed in.; A dashboard is open in the editor.

1. The user chooses to add a widget. The website shows the widget create form with type, title and size.
2. The user picks a widget type, optionally edits the title and size, and submits. (Widget create form)
   - Type (required, one of: note, counter, checklist, linkList), e.g. "note"
   - Title (optional, up to 60 characters), e.g. "Daily Notes"
   - Size (required, one of: small, medium, large), e.g. "medium"
   The website creates the widget with the chosen type, title defaulting to capitalized type name if left empty, size defaulting to medium, assigns it the next order position with type-specific defaults (note text empty, counter 0 with empty label, checklist empty, link list empty), shows it in the grid, shows Saving then Saved, and updates lastEditedAt.
   Changes: creates Widget, updates Dashboard.

Other paths
- F11.A01 (from 2, invalid) The title is longer than 60 characters or no type is selected:
  1. (system) The website marks the field that is wrong, explains the limit, and keeps what was typed.
  Back to 2.
- F11.A02 (from 2, failure) Creating the widget fails:
  1. (system) The website keeps the values and offers to try again.
  Back to 2.
- F11.A03 (from 1, cancel) The user cancels adding the widget:
  1. (system) Nothing is created; the website shows the editor as it was.
  Flow ends.

Outcome: New Widget created with chosen type, default title, size medium, appended in order; auto-saved and lastEditedAt updated; refresh keeps it.

## F12 Configure widget title
User · edit Widget · Goal: Change a widget's title.
Starts: In the dashboard editor on an existing widget
Before: Signed in.; Dashboard open with at least one widget.

1. The user opens the title for editing on the widget. The website shows the widget title field editable with the current title or the default type name.
   Changes: reads Widget.
2. The user edits the title and confirms.
   - Title (optional, up to 60 characters), e.g. "Daily Notes"
   The website saves the new title, shows Saving then Saved, updates lastEditedAt, and shows the updated title on the widget.
   Changes: updates Widget, updates Dashboard.

Other paths
- F12.A01 (from 2, invalid) The title is longer than 60 characters:
  1. (system) The website marks the title field, explains the 60 character limit, and keeps what was typed.
  Back to 2.
- F12.A02 (from 2, failure) Saving the title fails:
  1. (system) The website keeps the typed title and offers to try again.
  Back to 2.
- F12.A03 (from 1, notFound) The widget was deleted in the meantime:
  1. (system) The website says the widget is gone and shows the editor without it.
  Flow ends.

Outcome: Widget title updated, auto-saved, lastEditedAt refreshed; change survives refresh.

## F13 Reposition widget
User · act Widget · Goal: Change the widget's position relative to other widgets.
Starts: In the dashboard editor on an existing widget
Before: Signed in.; Dashboard open with at least one widget.

1. The user moves the widget to a new position using up/down controls or drag handle. The website updates the widget's order index, re-renders the grid in the new relative order, shows Saving then Saved, and updates lastEditedAt.
   Changes: updates Widget, updates Dashboard.

Other paths
- F13.A01 (from 1, failure) Saving the new order fails:
  1. (system) The website keeps the previous order, shows that saving failed, and offers to try again.
  Back to 1.
- F13.A02 (from 1, notFound) The widget was deleted in the meantime:
  1. (system) The website says the widget is gone and shows the editor without it.
  Flow ends.
- F13.A03 (from 1, other) There is only one widget so there is nowhere to move:
  1. (system) The website shows the widget in place and indicates that reordering needs at least two widgets.
  Flow ends.

Outcome: Widget order updated, new relative order rendered in grid, auto-saved and lastEditedAt refreshed; order survives refresh.

## F14 Resize widget
User · act Widget · Goal: Change the widget's visual footprint between small, medium and large.
Starts: In the dashboard editor on an existing widget
Before: Signed in.; Dashboard open with at least one widget.

1. The user opens the size control on the widget. The website shows the size options small, medium and large with the current size selected.
   Changes: reads Widget.
2. The user picks a size.
   - Size (required, one of: small, medium, large), e.g. "medium"
   The website applies the new visual footprint to the widget, shows Saving then Saved, and updates lastEditedAt.
   Changes: updates Widget, updates Dashboard.

Other paths
- F14.A01 (from 2, failure) Saving the new size fails:
  1. (system) The website keeps the previous size, shows that saving failed, and offers to try again.
  Back to 2.
- F14.A02 (from 1, notFound) The widget was deleted in the meantime:
  1. (system) The website says the widget is gone and shows the editor without it.
  Flow ends.

Outcome: Widget size updated to small/medium/large, visual footprint changes, auto-saved and lastEditedAt refreshed; size survives refresh.

## F15 Remove widget
User · delete Widget · Goal: Permanently remove a widget and its contents from the dashboard.
Starts: In the dashboard editor on an existing widget
Before: Signed in.; Dashboard open with at least one widget.

1. The user chooses Remove on the widget. The website asks the user to confirm permanently deleting the widget and its contents.
   Changes: deletes Widget.

Other paths
- F15.A01 (from 1, confirm) The user confirms the deletion:
  1. (system) The website permanently deletes the widget and its content, compacts the order of remaining widgets, shows Saving then Saved, updates lastEditedAt, and shows the editor without the widget.
  Flow ends.
- F15.A02 (from 1, cancel) The user cancels:
  1. (system) The website closes the confirmation and shows the widget unchanged.
  Flow ends.
- F15.A03 (from 1, notFound) The widget was already deleted:
  1. (system) The website says the widget is already gone and shows the editor without it.
  Flow ends.

Outcome: Widget and its content permanently deleted, order of remaining widgets compacted, auto-saved and lastEditedAt refreshed; deletion survives refresh.

## F16 Edit note widget text
User · act Widget · Goal: Type and edit plain text in a note widget.
Starts: In the dashboard editor on a note widget
Before: Signed in.; Dashboard open with at least one note widget.

1. The user focuses the note text area in the note widget. The website shows the note text field editable with the current plain text.
   Changes: reads Widget.
2. The user types or edits the note text.
   - Note text (optional, up to 5000 characters), e.g. "Remember to review PRs at 10am"
   The website auto-saves the change with debounce, shows Saving then Saved, and updates lastEditedAt.
   Changes: updates Widget, updates Dashboard.

Other paths
- F16.A01 (from 2, invalid) The note text is longer than 5000 characters:
  1. (system) The website marks the field, explains the 5000 character limit, and keeps what was typed without saving.
  Back to 2.
- F16.A02 (from 2, failure) Auto-saving fails:
  1. (system) The website keeps the typed text, shows that saving failed, and offers to try again.
  Back to 2.
- F16.A03 (from 1, notFound) The note widget was deleted in the meantime:
  1. (system) The website says the widget is gone and shows the editor without it.
  Flow ends.

Outcome: Note text updated, auto-saved with debounce and lastEditedAt refreshed; text survives refresh.

## F17 Increase or decrease counter
User · act Widget · Goal: Adjust the counter value by 1 and optionally set its label.
Starts: In the dashboard editor on a counter widget
Before: Signed in.; Dashboard open with at least one counter widget.

1. The user taps increase or decrease on the counter widget. The website changes the counter value by 1 (can go negative, starts at 0), shows the new number, shows Saving then Saved, and updates lastEditedAt.
   Changes: updates Widget, updates Dashboard.
2. The user edits the counter label inline.
   - Counter label (optional, up to 40 characters), e.g. "Coffees"
   The website saves the new label, shows Saving then Saved, and updates lastEditedAt.
   Changes: updates Widget, updates Dashboard.

Other paths
- F17.A01 (from 2, invalid) The counter label is longer than 40 characters:
  1. (system) The website marks the label field, explains the 40 character limit, and keeps what was typed without saving.
  Back to 2.
- F17.A02 (from 1, failure) Saving the new counter value fails:
  1. (system) The website keeps the previous value, shows that saving failed, and offers to try again.
  Back to 1.
- F17.A03 (from 2, failure) Saving the new label fails:
  1. (system) The website keeps the typed label and offers to try again.
  Back to 2.
- F17.A04 (from 1, notFound) The counter widget was deleted in the meantime:
  1. (system) The website says the widget is gone and shows the editor without it.
  Flow ends.

Outcome: Counter value changed by +/-1 per click (can go negative, starts at 0) and Counter label optionally updated, auto-saved and lastEditedAt refreshed; value survives refresh.

## F18 Manage checklist items
User · act Widget · Goal: Add, tick/untick, edit and remove tasks in a checklist.
Starts: In the dashboard editor on a checklist widget
Before: Signed in.; Dashboard open with at least one checklist widget.

1. The user views the checklist widget items. The website shows the ordered list of checklist items with text and checked state, or an empty state inviting to add the first item when there are none.
   Changes: reads Widget.
2. The user adds a new item by filling the item text and submitting. (Checklist item form)
   - Checklist item text (required, 1 to 120 characters), e.g. "Buy milk"
   The website appends the item to the checklist in order, shows Saving then Saved, and updates lastEditedAt.
   Changes: updates Widget, updates Dashboard.
3. The user ticks or unticks an item. The website toggles the checked state for that item, shows Saving then Saved, and updates lastEditedAt.
   Changes: updates Widget, updates Dashboard.
4. The user edits the text of an existing item inline and confirms.
   - Checklist item text (required, 1 to 120 characters), e.g. "Buy milk"
   The website saves the updated item text, shows Saving then Saved, and updates lastEditedAt.
   Changes: updates Widget, updates Dashboard.
5. The user removes an item. The website removes the item from the ordered list, shows Saving then Saved, and updates lastEditedAt.
   Changes: updates Widget, updates Dashboard.

Other paths
- F18.A01 (from 1, empty) The checklist has no items yet:
  1. (system) The website shows that there are no items yet and invites the user to add the first item.
  Back to 2.
- F18.A02 (from 2, invalid) The item text is empty or longer than 120 characters:
  1. (system) The website marks the item text field, explains that text is required and max 120 characters, and keeps what was typed.
  Back to 2.
- F18.A03 (from 2, failure) Saving the new item fails:
  1. (system) The website keeps the typed text and offers to try again.
  Back to 2.
- F18.A04 (from 4, invalid) The edited item text is empty or longer than 120 characters:
  1. (system) The website marks the field, explains the limit, and keeps what was typed without saving.
  Back to 4.
- F18.A05 (from 4, failure) Saving the edited text fails:
  1. (system) The website keeps the typed text and offers to try again.
  Back to 4.
- F18.A06 (from 3, failure) Saving the toggled state fails:
  1. (system) The website restores the previous checked state, shows that saving failed, and offers to try again.
  Back to 3.
- F18.A07 (from 5, failure) Saving the removal fails:
  1. (system) The website keeps the item in place, shows that saving failed, and offers to try again.
  Back to 5.
- F18.A08 (from 1, notFound) The checklist widget was deleted in the meantime:
  1. (system) The website says the widget is gone and shows the editor without it.
  Flow ends.

Outcome: Checklist items updated (added, checked state toggled, text edited, removed) in order, auto-saved and lastEditedAt refreshed; changes survive refresh.

## F19 Manage link list items
User · act Widget · Goal: Add, edit, remove and open links in a link list.
Starts: In the dashboard editor on a link list widget
Before: Signed in.; Dashboard open with at least one link list widget.

1. The user views the link list widget items. The website shows the ordered list of links with title and URL, or an empty state inviting to add the first link when there are none.
   Changes: reads Widget.
2. The user adds a new link by filling title and URL and submitting. (Link form)
   - Link title (required, 1 to 80 characters), e.g. "Figma"
   - Link URL (required, up to 2048 characters), e.g. "https://figma.com"
   The website appends the link to the ordered list, shows Saving then Saved, and updates lastEditedAt.
   Changes: updates Widget, updates Dashboard.
3. The user edits an existing link's title or URL and confirms. (Link form)
   - Link title (required, 1 to 80 characters), e.g. "Figma"
   - Link URL (required, up to 2048 characters), e.g. "https://figma.com"
   The website saves the updated link, shows Saving then Saved, and updates lastEditedAt.
   Changes: updates Widget, updates Dashboard.
4. The user removes a link. The website removes the link from the ordered list, shows Saving then Saved, and updates lastEditedAt.
   Changes: updates Widget, updates Dashboard.
5. The user clicks a link to open it. The website opens the link's URL in a new tab.

Other paths
- F19.A01 (from 1, empty) The link list has no links yet:
  1. (system) The website shows that there are no links yet and invites the user to add the first link.
  Back to 2.
- F19.A02 (from 2, invalid) The title is empty or longer than 80 characters, or the URL is empty or not a valid http:// or https:// URL:
  1. (system) The website marks the field that is wrong, explains that title is required max 80 and URL must be valid http/https, and keeps what was typed.
  Back to 2.
- F19.A03 (from 2, failure) Saving the new link fails:
  1. (system) The website keeps the typed values and offers to try again.
  Back to 2.
- F19.A04 (from 3, invalid) The edited title is empty or longer than 80 characters, or the edited URL is empty or not a valid http:// or https:// URL:
  1. (system) The website marks the field that is wrong, explains the requirement, and keeps what was typed without saving.
  Back to 3.
- F19.A05 (from 3, failure) Saving the edited link fails:
  1. (system) The website keeps the typed values and offers to try again.
  Back to 3.
- F19.A06 (from 4, failure) Saving the removal fails:
  1. (system) The website keeps the link in place, shows that saving failed, and offers to try again.
  Back to 4.
- F19.A07 (from 1, notFound) The link list widget was deleted in the meantime:
  1. (system) The website says the widget is gone and shows the editor without it.
  Flow ends.

Outcome: Links updated (added, edited, removed) and can be opened in new tab; auto-saved and lastEditedAt refreshed; changes survive refresh.

## F20 Manage account
User · account · Goal: View my email and change my password.
Starts: On any signed-in page via account menu
Before: Signed in.

1. The user opens account settings. The website shows the user's email read-only and the change password form.
2. The user fills in current password and new password and submits the form. (Change password form)
   - Current password (required, 8 to 128 characters), e.g. "old-password-123"
   - Password (required, 8 to 128 characters), e.g. "correct-horse-battery"
   The website verifies the current password, updates the password, keeps the session valid and shows confirmation that the password was changed.

Other paths
- F20.A01 (from 2, invalid) The current password is empty or the new password is shorter than 8 characters or longer than 128 characters:
  1. (system) The website marks the field that is wrong, explains what is required and keeps what was typed except it clears passwords for security.
  Back to 2.
- F20.A02 (from 2, denied) The current password is incorrect:
  1. (system) The website says the current password is incorrect and keeps the form values cleared for retry.
  Back to 2.
- F20.A03 (from 2, failure) Updating the password fails:
  1. (system) The website keeps the values cleared and offers to try again.
  Back to 2.

Outcome: User sees their Email and can update Password; changes persist and survive refresh; session remains valid.

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
