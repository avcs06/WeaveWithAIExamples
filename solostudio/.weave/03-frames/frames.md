# Frames

## FR01 Public site frame (frame)
Surrounds the landing page, sign-in, sign-up and public booking pages for visitors and booking guests.

1. Sees the logo, which leads to /.
2. Can open Book a session, which goes to /book.
3. Can choose "Sign in", which goes to /sign-in.
4. Sees site links in the footer, including Book a session, which goes to /book.

When the designer is signed in:
   1. Sees the logo, which leads to /.
   2. Can open Book a session, which goes to /book.
   3. Can choose "Open workspace", which goes to /home.

Route group: `web/app/(routes)/(marketing)/`. Screens inside it: S01 /, S02 /sign-up, S03 /sign-in, S14 /book, S15 /my-booking/[bookingId].
Loads its records through: nothing.

## FR02 App frame (frame)
Surrounds the designer's private workspace screens so she can move between home, clients, projects, sessions, availability, session types and account settings.
Flows: F04

1. Sees the logo, which leads to /home.
2. Can open Home, Clients, Projects, Sessions, Availability and Session types from the navigation, in that order.
3. Can open the account menu, which shows their name and sign-in email, lets them open Account settings at /account, and lets them sign out, which goes to /.

When the designer is signed out:
   1. Sees no app frame and is shown the public landing page at /.

Route group: `web/app/(routes)/(app)/`. Screens inside it: S04 /home, S05 /clients, S06 /clients/[clientId], S07 /projects, S08 /projects/[projectId], S09 /availability, S10 /session-types, S11 /sessions, S12 /sessions/[slotId], S13 /bookings/[bookingId], S16 /account.
Loads its records through: nothing.
