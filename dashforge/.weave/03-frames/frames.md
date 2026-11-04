# Frames

## FR01 Public site frame (frame)
Surrounds the landing page and authentication pages for visitors who are not signed in, providing access to sign in and sign up.
Flows: F01, F03

1. Sees the logo, which leads to /.
2. Can choose "Sign in", which goes to /sign-in.

When the user is signed in:
   1. Sees "Go to dashboards" which goes to /dashboards instead of "Sign in".

Route group: `web/app/(routes)/(marketing)/`. Screens inside it: S01 /, S02 /sign-up, S03 /sign-in.
Loads its records through: nothing.

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

Route group: `web/app/(routes)/(app)/`. Screens inside it: S04 /dashboards, S05 /dashboards/[dashboardId], S06 /account.
Loads its records through: nothing.
