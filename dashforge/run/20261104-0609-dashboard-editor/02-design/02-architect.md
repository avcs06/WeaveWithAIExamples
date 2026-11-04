# DashForge: frames, screens and dialogs

## FR01 Public site frame (frame)
Surrounds the landing page and authentication pages for visitors who are not signed in, providing access to sign in and sign up.
Flows: F01, F03

1. Sees the logo, which leads to /.
2. Can choose "Sign in", which goes to /sign-in.

When the user is signed in:
   1. Sees "Go to dashboards" which goes to /dashboards instead of "Sign in".

## FR02 App frame (frame)
Surrounds the dashboards list, editor and account pages for signed-in users, providing navigation, creation and account controls.
Flows: F04, F07, F20

1. Sees the logo, which leads to /dashboards.
2. Can open Dashboards and Account from the navigation, in that order.
3. Can choose "Create dashboard", the main action, which creates a new dashboard with default name "Untitled Dashboard" numbered if needed and goes to /dashboards/[dashboardId].
4. Can open the account menu, which shows their email and lets them sign out, which goes to /.

When the user is signed out:
   1. Sees a prompt to sign in, which goes to /sign-in, and the navigation is hidden.

When signing out fails:
   1. Reads "Could not sign out. Try again." and stays signed in.

## S01 Your personal console, finally in one place (/)
Help visitors understand DashForge is a single private space for notes, numbers, tasks and links and give them a clear path to start.
Roles: user · Frame: FR01 · Flows: F01, F02

1. Reads the headline "Your personal console, finally in one place" and the line under it "Your notes, numbers, tasks and links — together in a glowing dashboard that saves itself."
2. Can choose "Create your first dashboard", the main action, which goes to /sign-up.
3. Sees a preview of a dashboard showing a note called "Launch plan", a counter showing 12, a checklist with "Review the draft" checked, and a link list with "Figma" linking to https://figma.com. The preview changes no records.
4. Reads "Capture everything" "Add notes, counters, checklists and links in one ordered grid."
5. Reads "Stay in flow" "Every change saves automatically with a clear Saving and Saved status."
6. Reads "Make it yours" "Rename, resize and reorder widgets to fit how you think."
7. Reads "Always private" "Your dashboards stay yours alone and survive every refresh."

## S02 Create your account (/sign-up)
Create a private account to own dashboards.
Roles: user · Frame: FR01 · Flows: F02

1. Signs up with email (FD01) and password (FD02) via the auth form (FM01), which creates the account, signs them in with a persistent session and goes to /dashboards.

When the email is not a valid email address, or the password is shorter than 8 characters or longer than 128 characters:
   1. Sees the field marked as wrong, explains what is required and keeps what was typed.

When the email already has an account:
   1. Reads "An account with that email already exists." and can choose "Sign in" which goes to /sign-in.

When creating the account fails:
   1. Reads "Could not create account. Try again." and what was typed is kept except passwords are cleared.

## S03 Sign in (/sign-in)
Sign in to access private dashboards.
Roles: user · Frame: FR01 · Flows: F03

1. Signs in with email (FD01) and password (FD02) via the auth form (FM01), which verifies credentials, restores the persistent session and goes to /dashboards.

When the email is not a valid email address or the password is empty:
   1. Sees the field marked as wrong, explains what is required and keeps what was typed.

When the email and password do not match any account:
   1. Reads "Email or password is incorrect." and keeps the email while clearing the password.

When signing in fails:
   1. Reads "Could not sign in. Try again." and what was typed is kept.

## S04 Your dashboards (/dashboards)
See all dashboards sorted by last edited, search by name, open, duplicate, rename or delete them, or create a new one.
Roles: user · Frame: FR02 · Flows: F05, F06, F07, F08, F09, F10

1. Sees the title "Your dashboards".
2. Sees the search field labeled "Search" (FD14) to filter dashboards by name.
3. Sees the list of dashboards as table rows sorted by last edited most recent first, each row shows the dashboard name (FD03) as the link that opens the dashboard and when it was last edited as relative time with full timestamp on hover.
4. Can type in the search field (FD14) to filter the list to only dashboards whose name contains the typed text.
5. Can open a dashboard by choosing its name, which goes to /dashboards/[dashboardId].
6. Can open the row menu on a dashboard to choose "Duplicate", which creates a copy named "{original name} Copy" with all widgets, order, sizes, titles and content copied exactly and goes to /dashboards/[dashboardId] of the copy and shows a toast.
7. Can open the row menu on a dashboard to choose "Delete", which opens D01.
8. Can rename the dashboard name in place by choosing the edit icon, which turns the name into a field with save and cancel icon buttons, saving validates required and max 80 characters, shows Saving then Saved, updates lastEditedAt and shows a toast.
9. Sees a toast confirming every save.

When the user has no dashboards yet:
   1. Reads "No dashboards yet. Create your first dashboard to start your console."
   2. Can choose "Create dashboard" which creates a new dashboard with default name and goes to /dashboards/[dashboardId].
   3. Sees that the "Create dashboard" action in the frame is hidden while the list is empty.

When no dashboard name matches the search text:
   1. Reads "No results for your search. Try another name."
   2. Can choose "Clear search" which restores the full list sorted by last edited most recent first.

When the dashboard was deleted in the meantime:
   1. Reads "This dashboard is no longer available."
   2. Sees the home list again.

When creating the dashboard fails:
   1. Reads "Could not create dashboard. Try again." and stays where they were.

When the name is empty or longer than 80 characters:
   1. Sees the name field marked as invalid with "Name is required and max 80 characters" and what was typed is kept.

When saving the new name fails:
   1. Reads "Could not save. Try again." and what was typed is kept.

When duplicating the dashboard fails:
   1. Reads "Could not duplicate. Try again." and the original dashboard is unchanged.

## S05 The dashboard's name, as in "Morning Focus" (/dashboards/[dashboardId])
View and interact with widgets and configure dashboard and widgets, with every change auto-saved.
Roles: user · Frame: FR02 · Flows: F06, F08, F09, F10, F11, F12, F13, F14, F15, F16, F17, F18, F19

1. Sees the dashboard's name (FD03) as the title and the Saving/Saved status indicator.
2. Sees the widgets in relative order, each widget shows its title (FD04) defaulting to capitalized type name and its size and type-specific content.
3. For a note widget, sees the plain text content (FD07) max 5000 characters in an editable text area.
4. For a counter widget, sees the counter value starting at 0 and can go negative with increase and decrease icon buttons and the optional label (FD08) max 40 characters.
5. For a checklist widget, sees the ordered list of items each with text (FD09) max 120 characters and checked state, with a field to add a new item (FM06) and controls to tick/untick, edit text inline and remove the item.
6. For a link list widget, sees the ordered list of links each with title (FD11) max 80 characters and URL (FD12) valid http/https, with controls to add, edit and remove links and each title opens in a new tab.
7. Can type and edit note text (FD07) which auto-saves with debounce, shows Saving then Saved, updates lastEditedAt and shows a toast.
8. Can choose increase or decrease on a counter widget, which changes the value by 1, shows the new number, shows Saving then Saved and updates lastEditedAt.
9. Can edit the counter label (FD08) inline, which saves the new label, shows Saving then Saved and updates lastEditedAt.
10. Can add a checklist item by filling item text (FD09) and submitting (FM06), which appends the item in order, shows Saving then Saved and updates lastEditedAt.
11. Can tick or untick a checklist item, which toggles checked state, shows Saving then Saved and updates lastEditedAt.
12. Can edit checklist item text inline (FD09) and confirm, which saves the updated text, shows Saving then Saved and updates lastEditedAt.
13. Can remove a checklist item, which removes it from the ordered list, shows Saving then Saved and updates lastEditedAt.
14. Can add a link via D04, edit a link via D04, remove a link, and open a link in a new tab.
15. Can choose "Edit", which shows the editing controls.
16. Can choose "Back to dashboards" which goes to /dashboards.

When editing:
   1. Sees the dashboard name field editable with current name ready to edit, with save and cancel icon buttons.
   2. Can edit the dashboard name (FD03) and confirm, which validates required and max 80 characters, auto-saves with Saving then Saved, updates lastEditedAt and shows a toast.
   3. Can choose "Duplicate" which creates a copy named "{original name} Copy" with all widgets, order, sizes, titles and content copied exactly, sets lastEditedAt to now and goes to /dashboards/[dashboardId] of the copy.
   4. Can choose "Delete" which opens D01.
   5. Can choose "Add widget" which opens D02.
   6. For each widget, can edit its title (FD04) in place, which validates max 60 characters, saves, shows Saving then Saved and updates lastEditedAt.
   7. Can move a widget to a new position using up/down icon buttons or drag handle, which updates order index, re-renders grid in new relative order, shows Saving then Saved and updates lastEditedAt.
   8. Can open size control on a widget to choose small, medium or large (FD06), which applies new visual footprint, shows Saving then Saved and updates lastEditedAt.
   9. Can choose "Remove" on a widget, which opens D03.
   10. Can choose "Done", which shows the page as it is now.

When the dashboard has no widgets yet:
   1. Reads "No widgets yet. Add your first widget to start building."
   2. Can choose "Add widget" which opens D02.

When the dashboard was deleted in the meantime:
   1. Reads "This dashboard is gone."
   2. Can choose "Go to your dashboards" which goes to /dashboards.

When the widget was deleted in the meantime:
   1. Reads "This widget is gone."
   2. Sees the editor without it.

When there is only one widget:
   1. Sees reordering controls disabled with tooltip "Add another widget to reorder".

When the dashboard name is empty or longer than 80 characters:
   1. Sees the name field marked as invalid with "Name is required and max 80 characters" and what was typed is kept.

When the widget title is longer than 60 characters:
   1. Sees the title field marked with "Max 60 characters" and what was typed is kept without saving.

When the note text is longer than 5000 characters:
   1. Sees the field marked with "Max 5000 characters" and what was typed is kept without saving.

When the counter label is longer than 40 characters:
   1. Sees the label field marked with "Max 40 characters" and what was typed is kept without saving.

When the checklist item text is empty or longer than 120 characters:
   1. Sees the item text field marked with "Text is required and max 120 characters" and what was typed is kept.

When saving fails:
   1. Reads "Saving failed. Try again." and can try again, previous values are kept.

## S06 Account (/account)
View email and change password.
Roles: user · Frame: FR02 · Flows: F20

1. Sees the title "Account".
2. Reads their email (FD01) read-only.
3. Sees the change password form (FM04) with Current password (FD13) and New password (FD02) fields.
4. Fills in current password and new password and chooses "Save", which verifies current password, updates password, keeps session valid and shows toast "Password changed".
5. Can go back to dashboards via the navigation, which goes to /dashboards.

When the current password is empty or the new password is shorter than 8 characters or longer than 128 characters:
   1. Sees the field marked as wrong with "Current password is required and new password must be 8 to 128 characters" and passwords are cleared for security.

When the current password is incorrect:
   1. Reads "Current password is incorrect." and the form is cleared for retry.

When updating the password fails:
   1. Reads "Could not update password. Try again." and the form is cleared.

## D01 Delete dashboard? (dialog)
Confirm permanently deleting the dashboard and all its widgets.
Opened from: S04, S05 · Flows: F10

1. Reads "Delete this dashboard? This will permanently delete the dashboard and all its widgets. This cannot be undone."
2. Can choose "Delete", the danger action, which permanently deletes the dashboard and all its widgets, removes it from the home list, and if in the editor goes to /dashboards, and shows a toast.
3. Can choose "Cancel", which closes the dialog and changes nothing.

When the dashboard was already deleted:
   1. Reads "This dashboard is already gone."
   2. Can choose "Close" which goes to /dashboards.

When deleting fails after confirmation:
   1. Reads "Could not delete. Try again." and can try again.

## D02 Add widget (dialog)
Create a new widget with chosen type, title and size.
Opened from: S05 · Flows: F11

1. Chooses Type (FD05) from note, counter, checklist or linkList, required.
2. Fills in Title (FD04) optional max 60 characters, which defaults to capitalized type name if left empty.
3. Chooses Size (FD06) from small, medium or large, defaults to medium.
4. Can choose "Create", which creates the widget with type-specific defaults (note text empty, counter 0 with empty label, checklist empty, link list empty), assigns next order position, shows it in the grid, shows Saving then Saved, updates lastEditedAt, closes the dialog and shows a toast.
5. Can choose "Cancel", which closes the dialog and changes nothing.

When the title is longer than 60 characters or no type is selected:
   1. Sees the field marked as wrong with "Title max 60 characters and type is required" and what was typed is kept.

When creating the widget fails:
   1. Reads "Could not create widget. Try again." and what was typed is kept.

## D03 Remove widget? (dialog)
Confirm permanently deleting the widget and its contents.
Opened from: S05 · Flows: F15

1. Reads "Remove this widget? This will permanently delete the widget and its contents. This cannot be undone."
2. Can choose "Remove", the danger action, which permanently deletes the widget and its content, compacts order of remaining widgets, shows Saving then Saved, updates lastEditedAt, closes the dialog and shows a toast.
3. Can choose "Cancel", which closes the dialog and changes nothing.

When the widget was already deleted:
   1. Reads "This widget is already gone." and closes the dialog showing the editor without it.

When deleting fails:
   1. Reads "Could not remove widget. Try again." and can try again.

## D04 Link details (dialog)
Add or edit a link's title and URL.
Opened from: S05 · Flows: F19

1. Fills in Link title (FD11) required max 80 characters.
2. Fills in Link URL (FD12) required valid http:// or https:// URL.
3. Can choose "Save", which appends or updates the link in the ordered list, shows Saving then Saved, updates lastEditedAt, closes the dialog and shows a toast.
4. Can choose "Cancel", which closes the dialog and changes nothing.

When the title is empty or longer than 80 characters or the URL is empty or not a valid http:// or https:// URL:
   1. Sees the field marked as wrong with "Title is required max 80 and URL must be valid http/https" and what was typed is kept.

When saving the link fails:
   1. Reads "Could not save link. Try again." and what was typed is kept.
