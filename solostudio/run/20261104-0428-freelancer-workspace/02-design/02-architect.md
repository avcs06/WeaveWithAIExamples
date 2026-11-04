# SoloStudio: frames, screens and dialogs

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

## FR02 App frame (frame)
Surrounds the designer's private workspace screens so she can move between home, clients, projects, sessions, availability, session types and account settings.
Flows: F04

1. Sees the logo, which leads to /home.
2. Can open Home, Clients, Projects, Sessions, Availability and Session types from the navigation, in that order.
3. Can open the account menu, which shows their name and sign-in email, lets them open Account settings at /account, and lets them sign out, which goes to /.

When the designer is signed out:
   1. Sees no app frame and is shown the public landing page at /.

## S01 SoloStudio (/)
Explain SoloStudio to a solo freelance designer and let her sign up, sign in or reach the public booking page.
Roles: designer, bookingGuest · Frame: FR01 · Flows: F01

1. Reads the headline "Clients, projects and bookings, all in one calm place".
2. Reads the line under it: "SoloStudio is a single workspace for a solo freelance designer to manage clients, projects and bookings, without scattering them across email, notes and spreadsheets."
3. Can choose "Create your workspace", the main action, which goes to /sign-up.
4. Sees a preview of the home dashboard with a session called "Discovery call" today, a follow-up for Maya Sharma due this week and a task called "Draft hero section" marked overdue.
5. Reads "Follow-ups first" and the line "Your client list puts overdue follow-ups first, so you always know who to contact next."
6. Reads "Projects with clear next steps" and the line "Each project shows its tasks and how many are still open, with overdue tasks standing out."
7. Reads "Bookings without the back and forth" and the line "Visitors pick a session type and an open time, and you see who booked in your sessions."
8. Reads "Private to you" and the line "Your clients, notes, projects and bookings live in one private workspace only you can open."

## S02 Create your workspace (/sign-up)
Create the designer's account and private workspace.
Roles: designer · Frame: FR01 · Flows: F02

1. Signs up with their email using the sign-up form FM01, which creates the private workspace with the three pre-created session types and empty weekly availability and goes to /home.

When the email already has an account:
   1. Reads "This email already has an account. Sign in instead."
   2. Can choose "Sign in", which goes to /sign-in.

## S03 Sign in (/sign-in)
Sign the designer in to her private workspace.
Roles: designer · Frame: FR01 · Flows: F03

1. Signs in with their email using the sign-in form FM02, which goes to /home.

When no account matches:
   1. Reads "No account matches this email and password. Try again or sign up instead."
   2. Can try again with a corrected email and password, which stays on /sign-in.
   3. Can choose "Sign up", which goes to /sign-up.

## S04 Home (/home)
Show the designer what needs attention today and let her open the relevant client, session or project.
Roles: designer · Frame: FR02 · Flows: F05

1. Sees the count of today's sessions, the count of follow-ups due this week and the count of overdue tasks, each with its label.
2. Sees today's sessions, each showing the session type, time and booker names, and each opening the session at /sessions/[slotId].
3. Sees follow-ups due this week with overdue first, each showing the client's name and follow-up date, and each opening the client at /clients/[clientId].
4. Sees overdue tasks, each showing the task title, project name and due date, and each opening the project at /projects/[projectId].

When there are no sessions today, no follow-ups due this week and no overdue tasks:
   1. Reads "Everything is clear today. No sessions, follow-ups or overdue tasks need you."
   2. Can open Clients, which goes to /clients.
   3. Can open Projects, which goes to /projects.
   4. Can open Sessions, which goes to /sessions.
   5. Can open Availability, which goes to /availability.
   6. Can open Session types, which goes to /session-types.

When there are no sessions today:
   1. Sees the count of today's sessions, the count of follow-ups due this week and the count of overdue tasks, each with its label.
   2. Reads "No sessions today." in the today's sessions list.
   3. Sees follow-ups due this week with overdue first, each showing the client's name and follow-up date, and each opening the client at /clients/[clientId].
   4. Sees overdue tasks, each showing the task title, project name and due date, and each opening the project at /projects/[projectId].

When there are no follow-ups due this week:
   1. Sees the count of today's sessions, the count of follow-ups due this week and the count of overdue tasks, each with its label.
   2. Sees today's sessions, each showing the session type, time and booker names, and each opening the session at /sessions/[slotId].
   3. Reads "No follow-ups due this week." in the follow-ups list.
   4. Sees overdue tasks, each showing the task title, project name and due date, and each opening the project at /projects/[projectId].

When there are no overdue tasks:
   1. Sees the count of today's sessions, the count of follow-ups due this week and the count of overdue tasks, each with its label.
   2. Sees today's sessions, each showing the session type, time and booker names, and each opening the session at /sessions/[slotId].
   3. Sees follow-ups due this week with overdue first, each showing the client's name and follow-up date, and each opening the client at /clients/[clientId].
   4. Reads "No overdue tasks." in the overdue tasks list.

## S05 Clients (/clients)
Find clients, see who needs a follow-up first, and act on a follow-up with one click.
Roles: designer · Frame: FR02 · Flows: F06, F14, F15

1. Sees each client in a table row showing the client's name, company, status and follow-up due state with its follow-up date, sorted with overdue follow-ups first and then follow-ups due soonest, with the follow-up date shown because the list is sorted by it.
2. Can open a client by its name or its row, which goes to /clients/[clientId].
3. Can use the mark follow-up done icon action on a client with a follow-up, which clears the follow-up date, shows a confirmation toast and shows the client no longer due for a follow-up.
4. Can use the push follow-up a week icon action on a client with a follow-up, which adds 7 days to the follow-up date, shows a confirmation toast and shows the new due date in sorted order.
5. Can choose "Add a client", which opens D01.
6. Fills in Search clients (FD30) to find clients by name or company.
7. Chooses Client status filter (FD31) to show only clients with the chosen status.

When no clients exist yet:
   1. Reads "No clients yet. Add the first one to start your list."
   2. Can choose "Add a client", which opens D01.

When no clients match the search or filter:
   1. Reads "Nothing matches your search or filter."
   2. Can clear the search or filter, which shows the client list again.

When the note is no longer there:
   1. Reads that the note is gone and shows the client list as it is.

## S06 The client's name (/clients/[clientId])
See one client's details, notes, projects and bookings in one place.
Roles: designer · Frame: FR02 · Flows: F07

1. Sees the client's name, email, company, profile and status.
2. Can choose "Edit", which opens D02.
3. Can choose "Delete", which opens D05.
4. Can choose "Add a note", which opens D03.
5. Sees each note in a card showing its note text, note date and follow-up date when one is set.
6. Can use the edit icon action on a note, which opens D04.
7. Can use the delete icon action on a note, which opens D06.
8. Can choose "Add a project", which opens D07 with this client chosen.
9. Sees each project in a card showing the project's name, due date and open task count, and can open a project, which goes to /projects/[projectId].
10. Sees each booking in a table row showing the session type, slot time and booker name and email, and can open a booking, which goes to /bookings/[bookingId].

When the client has no notes, projects or bookings yet:
   1. Sees the client's name, email, company, profile and status.
   2. Reads "No notes yet." and can choose "Add a note", which opens D03.
   3. Reads "No projects yet." and can choose "Add a project", which opens D07 with this client chosen.
   4. Reads "No bookings yet." in the bookings list.

When the client was deleted in the meantime:
   1. Reads "This client is gone."
   2. Can open Clients, which goes to /clients.

## S07 Projects (/projects)
See every project and how much work is still open.
Roles: designer · Frame: FR02 · Flows: F16

1. Sees each project in a table row showing the project's name, client name, due date and open task count.
2. Can open a project by its name or its row, which goes to /projects/[projectId].
3. Can open a project's client by the client name, which goes to /clients/[clientId].
4. Can choose "Add a project", which opens D07.
5. Fills in Search projects (FD35) to find projects by project name or client name.

When there are no projects yet:
   1. Reads "No projects yet. Add the first project to track your work."
   2. Can choose "Add a project", which opens D07.

When no project matches the search:
   1. Reads "Nothing matches your search."
   2. Can clear the search, which shows all projects again.
   3. Can choose "Add a project", which opens D07.

## S08 The project's name (/projects/[projectId])
See a project's tasks, narrow them down, and tick work done.
Roles: designer · Frame: FR02 · Flows: F17, F24

1. Sees the project's name, description, due date and client name, and can open the client, which goes to /clients/[clientId].
2. Can choose "Edit", which opens D08.
3. Can choose "Delete", which opens D09.
4. Sees tasks grouped by status, each task in a table row showing its title, status, priority and due date, with overdue tasks marked "Overdue" when the due date is before today and the task is not Done.
5. Can tick an open task done, which marks it Done, updates the open task counts, no longer shows it as overdue and shows a confirmation toast.
6. Can use the edit icon action on a task, which opens D11.
7. Can use the delete icon action on a task, which opens D12.
8. Can choose "Add a task", which opens D10.
9. Fills in Search tasks (FD32) to find tasks by title.
10. Chooses Task status filter (FD33) and Task priority filter (FD34) to show only matching tasks.

When the project has no tasks yet:
   1. Sees the project's name, description, due date and client.
   2. Reads "No tasks yet. Add the first task to plan this project."
   3. Can choose "Add a task", which opens D10.

When no task matches the search or filters:
   1. Reads "Nothing matches your search or filters."
   2. Can clear the search and filters, which shows the project's tasks again.

When the project was deleted in the meantime:
   1. Reads "This project is gone."
   2. Can open Projects, which goes to /projects.

When the task was deleted:
   1. Reads that the task is gone and shows the project's remaining tasks.

## S09 Availability (/availability)
See and set the weekly days and hours that can be booked.
Roles: designer · Frame: FR02 · Flows: F25

1. Sees the saved Days (FD19), From time (FD20) and To time (FD21), or reads "No days set yet. No slots are offered until hours are set."
2. Reads that changing availability affects slots offered afterwards and does not move or cancel bookings already made.
3. Can choose "Edit", which shows the editing controls.

When editing:
   1. Fills in Days (FD19), From time (FD20) and To time (FD21).
   2. Reads the message that marks what is missing or wrong and keeps the entered days and times when a day is selected but a time is missing or To time is not after From time (F25.A01).
   3. Can choose "Done", which saves the weekly availability, shows a confirmation toast and shows the saved days and hours, with future open slots using the new hours and existing bookings unchanged.
   4. Can choose "Cancel", which shows the availability as it was and changes nothing.

## S10 Session types (/session-types)
See the kinds of sessions visitors can book and keep them up to date.
Roles: designer · Frame: FR02 · Flows: F26

1. Sees each session type in a table row showing its name, duration in minutes, displayed price and maximum people.
2. Reads that displayed prices are shown for information only and nobody pays in the app.
3. Can use the edit icon action on a session type, which opens D14.
4. Can choose "Add a session type", which opens D13.

When there are no session types yet:
   1. Reads "No session types yet. Add one so visitors can book."
   2. Can choose "Add a session type", which opens D13.

## S11 Sessions (/sessions)
See upcoming sessions and who booked them, with past sessions kept separate.
Roles: designer · Frame: FR02 · Flows: F29

1. Sees each upcoming slot in a table row showing its session type, date and time, how many bookings it holds and whether it is full, including full slots.
2. Can open a slot by its session type name or its row, which goes to /sessions/[slotId].
3. Can open a booking from a slot's booker names, which goes to /bookings/[bookingId].
4. Sees past sessions separately, each in a table row showing the session type, time and booker names, and can open a past slot, which goes to /sessions/[slotId].

When there are no upcoming slots:
   1. Reads "No upcoming sessions yet. New sessions appear here when guests book open times."
   2. Can open Availability, which goes to /availability.
   3. Can open Session types, which goes to /session-types.
   4. Sees past sessions separately, each showing the session type, time and booker names.

## S12 The slot's session type name and time, as in "Discovery call, 5 Nov at 10:00" (/sessions/[slotId])
See who booked a time slot and for what.
Roles: designer · Frame: FR02 · Flows: F30

1. Sees the slot's session type, date and time and how many of its maximum people are booked.
2. Sees each booking in a table row showing the booker's name, email and linked client name when one exists.
3. Can open a booking by its booker name or its row, which goes to /bookings/[bookingId].
4. Can open a linked client, which goes to /clients/[clientId].
5. Can choose "Cancel slot", which opens D15.

When the slot has no bookings yet:
   1. Sees the slot's session type, date and time.
   2. Reads "No bookings yet. This time stays open for booking until the slot is cancelled."
   3. Can choose "Cancel slot", which opens D15.

When the slot no longer exists:
   1. Reads "This session is gone."
   2. Can open Sessions, which goes to /sessions.

## S13 The booker's name, as in "Ravi Patel's booking" (/bookings/[bookingId])
See who booked, for what and when, as the designer.
Roles: designer · Frame: FR02 · Flows: F32

1. Sees the booking's name, email, session type and slot date and time.
2. Sees the linked client's name when one exists, and reads that there is no linked client when the client was deleted.
3. Can open the linked client, which goes to /clients/[clientId].
4. Can open the slot, which goes to /sessions/[slotId].

When the booking was cancelled in the meantime:
   1. Reads "This booking is gone."
   2. Can open Sessions, which goes to /sessions.

## S14 Book a session (/book)
Let a visitor pick a session type, find an open time and book with name and email, then see the confirmation and cancellation link.
Roles: bookingGuest · Frame: FR01 · Flows: F33, F34, F35

1. Reads what booking is for and that no account is needed and nobody pays in the app, with displayed prices shown for information only.
2. Sees each session type in a card showing its name, duration and displayed price, and picks a session type (FD28) to start.
3. Sees the chosen session type's duration and displayed price and its open slots for the next two weeks in a list, excluding full slots and times blocked by overlapping bookings, each slot showing its date and time.
4. Picks an open slot (FD29), which shows the chosen session type and slot time with the booking details form FM09.
5. Fills in Name (FD26) and Email (FD27).
6. Can choose "Confirm booking", which creates the booking, links it to the client with the same email or creates a new Lead client when the email is new, and shows the confirmation for this screen.
7. Can choose "Choose another time", which shows the open slots for the chosen session type again and changes nothing.

When no session types are offered right now:
   1. Reads "No sessions are currently offered. Please check back later."

When there are no open slots for the chosen session type in the next two weeks:
   1. Reads "There are no open times for this session type in the next two weeks."
   2. Can pick another session type (FD28), which shows its open slots.

When the chosen slot became full or blocked by an overlapping booking:
   1. Reads "That time is no longer open."
   2. Sees the updated list of open slots for the chosen session type and can pick another open slot (FD29).

When the name is empty or the email is not an address in the booking details form:
   1. Reads the message that marks what is wrong and keeps what was typed when the name is empty or the email is not an address (F35.A02).
   2. Can correct the marked field and confirm the booking again.

When the booking is confirmed:
   1. Reads "You're booked." with the session type and slot time.
   2. Sees the private cancellation link for this booking and reads to keep it, as no email is sent.
   3. Can open the cancellation link, which goes to /my-booking/[bookingId].
   4. Can choose "Book another session", which shows the session types again.

## S15 The booking's session type name and time, as in "Discovery call, 5 Nov at 10:00" (/my-booking/[bookingId])
Let a guest check a booking from its private link and cancel only that booking.
Roles: bookingGuest · Frame: FR01 · Flows: F36, F37

1. Sees the booking's session type, slot date and time and status, with the name and email it was booked with.
2. Can choose "Cancel booking", which opens D16.

When the link is unknown or the booking no longer exists:
   1. Reads "This link is not recognised."
   2. Can open the public booking page, which goes to /book.

When the booking is already cancelled:
   1. Sees the booking as cancelled with its former session type and time.
   2. Can choose "Book another time", which goes to /book.

## S16 Account settings (/account)
See and change the sign-in email and password.
Roles: designer · Frame: FR02 · Flows: F38

1. Sees the current sign-in email.
2. Can choose "Edit", which shows the editing controls.

When editing:
   1. Sees the current sign-in email.
   2. Fills in Email (FD01) and Password (FD02).
   3. Reads the message that marks the field that is wrong and keeps what was typed when the email is not an address or the password is shorter than 8 characters (F38.A01).
   4. Reads that the email is already in use and keeps the current sign-in email unchanged when the new email already has another account (F38.A03).
   5. Can choose "Done", which saves the account changes, shows a confirmation toast and shows the updated sign-in email while staying signed in.
   6. Can choose "Cancel", which shows the account as it was and changes nothing.

## D01 Add a client (dialog)
Add a new client with status set to Lead by default.
Opened from: S05 · Flows: F08

1. Sees the client form FM03 with Status (FD07) already set to Lead.
2. Fills in Name (FD03) and Email (FD04).
3. Can fill in Company (FD05) and Profile (FD06), covering what they do, how we met and what they pay.
4. Can change Status (FD07) to Lead, Active or Past.
5. Can choose "Save", which saves the client, shows a confirmation toast, closes the dialog and goes to /clients/[clientId].
6. Can choose "Cancel", which closes the dialog and changes nothing.

When the name is empty, the email is not an address, or the status is missing:
   1. Reads the message that marks what is wrong and keeps what was typed (F08.A01).
   2. Can correct the marked field and choose "Save" again.

When saving fails:
   1. Reads that saving failed and can choose "Save" to try again (F08.A02).

## D02 The client's name, as in "Edit Maya Sharma" (dialog)
Change a client's details or status.
Opened from: S06 · Flows: F09

1. Sees the client form FM03 filled with the current Name (FD03), Email (FD04), Company (FD05), Profile (FD06) and Status (FD07).
2. Can change Name (FD03), Email (FD04), Company (FD05), Profile (FD06) and Status (FD07).
3. Can choose "Save", which updates the client, shows a confirmation toast and closes the dialog, showing the updated client.
4. Can choose "Cancel", which closes the dialog and changes nothing.

When the name is empty, the email is not an address, or the status is missing:
   1. Reads the message that marks what is wrong and keeps what was typed (F09.A02).
   2. Can correct the marked field and choose "Save" again.

When saving fails:
   1. Reads that saving failed and can choose "Save" to try again (F09.A03).

When the client was deleted in the meantime:
   1. Reads that the client is gone.
   2. Can choose "Cancel", which closes the dialog and goes to /clients.

## D03 Add a note (dialog)
Jot a dated note after a call and optionally set a follow-up date.
Opened from: S06 · Flows: F11

1. Sees the note form FM04 with Note date (FD09) set to today.
2. Fills in Note text (FD08).
3. Can change Note date (FD09) and can set Follow-up date (FD10).
4. Can choose "Save", which saves the note under the client, shows a confirmation toast and closes the dialog, showing the note with its follow-up date.
5. Can choose "Cancel", which closes the dialog and changes nothing.

When the note text is empty or a date cannot be understood:
   1. Reads the message that marks the field that needs fixing and keeps what was typed (F11.A01).
   2. Can correct the marked field and choose "Save" again.

When saving fails:
   1. Reads that saving failed and can choose "Save" to try again (F11.A02).

## D04 Edit note (dialog)
Correct or update a note and its follow-up date.
Opened from: S06 · Flows: F12

1. Sees the note form FM04 filled with the current Note text (FD08), Note date (FD09) and Follow-up date (FD10).
2. Can change Note text (FD08), Note date (FD09) and Follow-up date (FD10).
3. Can choose "Save", which updates the note, shows a confirmation toast and closes the dialog, showing the note with its new follow-up date.
4. Can choose "Cancel", which closes the dialog and changes nothing.

When the note text is empty or a date cannot be understood:
   1. Reads the message that marks the field that needs fixing and keeps what was typed (F12.A01).
   2. Can correct the marked field and choose "Save" again.

When saving fails:
   1. Reads that saving failed and can choose "Save" to try again (F12.A02).

When the note is no longer there:
   1. Reads that the note is gone.
   2. Can choose "Cancel", which closes the dialog and shows the client's remaining notes.

## D05 The client's name, as in "Delete Maya Sharma?" (dialog)
Confirm deleting a client and everything under them.
Opened from: S06 · Flows: F10

1. Reads that deleting the client deletes its notes, projects and tasks, and that its bookings will stay visible without a client link.
2. Can choose "Delete", which deletes the client, its notes, projects and tasks, shows a confirmation toast and goes to /clients.
3. Can choose "Cancel", which closes the dialog and changes nothing.

When the client was deleted in the meantime:
   1. Reads that the client is already gone.
   2. Can choose "Cancel", which closes the dialog and goes to /clients.

## D06 Delete this note? (dialog)
Confirm deleting a note.
Opened from: S06 · Flows: F13

1. Reads the note text and its note date so the designer can check which note will be deleted.
2. Can choose "Delete", which deletes the note, shows a confirmation toast and closes the dialog, showing the client's remaining notes.
3. Can choose "Cancel", which closes the dialog and changes nothing.

When the note is already gone:
   1. Reads that the note is gone.
   2. Can choose "Cancel", which closes the dialog and shows the client's remaining notes.

## D07 Add a project (dialog)
Start a new project for a client.
Opened from: S07, S06 · Flows: F18

1. Sees the empty project form FM05.
2. Fills in Name (FD11) and Description (FD12).
3. Chooses Client (FD14) from the designer's clients.
4. Can set Due date (FD13).
5. Can choose "Save", which saves the project under the chosen client, shows a confirmation toast, closes the dialog and goes to /projects.
6. Can choose "Cancel", which closes the dialog and changes nothing.

When the name or description is empty, the due date is not a date, or no client is chosen:
   1. Reads the message that marks what is missing or wrong and keeps what was typed (F18.A01).
   2. Can correct the marked field and choose "Save" again.

When saving fails:
   1. Reads that saving failed and can choose "Save" to try again (F18.A02).

When no client exists yet:
   1. Reads "No clients yet. Add a client before starting a project."
   2. Can choose "Cancel", which closes the dialog and changes nothing.

## D08 The project's name, as in "Edit Acme homepage" (dialog)
Change a project's details or move it to another client.
Opened from: S08 · Flows: F19

1. Sees the project form FM05 filled with the current Name (FD11), Description (FD12), Due date (FD13) and Client (FD14).
2. Can change Name (FD11), Description (FD12), Due date (FD13) and Client (FD14).
3. Can choose "Save", which saves the changes, shows a confirmation toast and closes the dialog, showing the updated project.
4. Can choose "Cancel", which closes the dialog and changes nothing.

When the name or description is empty, the due date is not a date, or no client is chosen:
   1. Reads the message that marks what is missing or wrong and keeps what was typed (F19.A02).
   2. Can correct the marked field and choose "Save" again.

When saving fails:
   1. Reads that saving failed and can choose "Save" to try again (F19.A03).

When the project was deleted in the meantime:
   1. Reads that the project is gone.
   2. Can choose "Cancel", which closes the dialog and goes to /projects.

## D09 The project's name, as in "Delete Acme homepage?" (dialog)
Confirm deleting a project and its tasks.
Opened from: S08 · Flows: F20

1. Reads that deleting the project deletes its tasks.
2. Can choose "Delete", which deletes the project and its tasks, shows a confirmation toast and goes to /projects.
3. Can choose "Cancel", which closes the dialog and changes nothing.

When the project was already deleted:
   1. Reads that the project is already gone.
   2. Can choose "Cancel", which closes the dialog and goes to /projects.

## D10 Add a task (dialog)
Add a task to a project.
Opened from: S08 · Flows: F21

1. Sees the empty task form FM06 with Status (FD16) set to To do and Priority (FD17) set to Medium.
2. Fills in the task's Title (FD15).
3. Can change Status (FD16) and Priority (FD17) and can set Due date (FD18).
4. Can choose "Save", which saves the task, shows a confirmation toast and closes the dialog, showing the task in the project's task list and marking it overdue when its due date is before today and it is not Done.
5. Can choose "Cancel", which closes the dialog and changes nothing.

When the title is empty:
   1. Reads the message that marks the empty title and keeps what was typed (F21.A01).
   2. Can correct the title and choose "Save" again.

When saving fails:
   1. Reads that saving failed and can choose "Save" to try again (F21.A02).

## D11 The task's title, as in "Edit Draft hero section" (dialog)
Change a task's title, status, priority or due date.
Opened from: S08 · Flows: F22

1. Sees the task form FM06 filled with the current Title (FD15), Status (FD16), Priority (FD17) and Due date (FD18).
2. Can change Title (FD15), Status (FD16), Priority (FD17) and Due date (FD18).
3. Can choose "Save", which updates the task, shows a confirmation toast and closes the dialog, showing the updated task list with updated open counts.
4. Can choose "Cancel", which closes the dialog and changes nothing.

When the title is empty:
   1. Reads the message that marks the empty title and keeps what was typed (F22.A02).
   2. Can correct the title and choose "Save" again.

When saving fails:
   1. Reads that saving failed and can choose "Save" to try again (F22.A03).

When the task was deleted in the meantime:
   1. Reads that the task is gone.
   2. Can choose "Cancel", which closes the dialog and shows the project's remaining tasks.

## D12 The task's title, as in "Delete Draft hero section?" (dialog)
Confirm deleting a task.
Opened from: S08 · Flows: F23

1. Reads the task title so the designer can check which task will be deleted.
2. Can choose "Delete", which deletes the task, shows a confirmation toast and closes the dialog, showing the project's remaining tasks with updated open counts.
3. Can choose "Cancel", which closes the dialog and changes nothing.

When the task was already gone:
   1. Reads that the task is gone.
   2. Can choose "Cancel", which closes the dialog and shows the project's remaining tasks.

## D13 Add a session type (dialog)
Offer a new kind of bookable session.
Opened from: S10 · Flows: F27

1. Sees the empty session type form FM08.
2. Fills in Name (FD22), Duration in minutes (FD23), Displayed price (FD24) and Maximum people (FD25).
3. Reads that the displayed price is shown for information only and nobody pays in the app.
4. Can choose "Save", which saves the session type, shows a confirmation toast and closes the dialog, showing it in the session type list.
5. Can choose "Cancel", which closes the dialog and changes nothing.

When the name is empty, the duration is not a whole number or is below 15 or above 480, the displayed price is not a number or is negative, or the maximum people is not a whole number or is below 1 or above 20:
   1. Reads the message that marks what is wrong and keeps what was typed (F27.A01).
   2. Can correct the marked field and choose "Save" again.

When saving fails:
   1. Reads that saving failed and can choose "Save" to try again (F27.A02).

## D14 The session type's name, as in "Edit Discovery call" (dialog)
Change a session type's length, displayed price or seats, without changing existing bookings.
Opened from: S10 · Flows: F28

1. Sees the session type form FM08 filled with the current Name (FD22), Duration in minutes (FD23), Displayed price (FD24) and Maximum people (FD25).
2. Can change Name (FD22), Duration in minutes (FD23), Displayed price (FD24) and Maximum people (FD25).
3. Reads that existing bookings are unchanged.
4. Can choose "Save", which updates the session type, shows a confirmation toast and closes the dialog, showing it in the session type list.
5. Can choose "Cancel", which closes the dialog and changes nothing.

When the name is empty, the duration is not a whole number or is below 15 or above 480, the displayed price is not a number or is negative, or the maximum people is not a whole number or is below 1 or above 20:
   1. Reads the message that marks what is wrong and keeps what was typed (F28.A02).
   2. Can correct the marked field and choose "Save" again.

When saving fails:
   1. Reads that saving failed and can choose "Save" to try again (F28.A03).

When the session type is gone:
   1. Reads that the session type is gone.
   2. Can choose "Cancel", which closes the dialog and shows the session type list.

## D15 Cancel this session? (dialog)
Confirm cancelling a slot and everyone booked on it.
Opened from: S12 · Flows: F31

1. Reads the slot's session type and time and that cancelling the slot cancels every booking on it.
2. Can choose "Cancel slot", which cancels the slot and every booking on it, shows a confirmation toast and goes to /sessions.
3. Can choose "Cancel", which closes the dialog and changes nothing.

When the slot was already cancelled:
   1. Reads that the slot is gone.
   2. Can choose "Cancel", which closes the dialog and goes to /sessions.

## D16 Cancel your booking? (dialog)
Confirm cancelling only the guest's own booking.
Opened from: S15 · Flows: F37

1. Reads the booking's session type and time and that only this booking will be cancelled and the seat will be freed.
2. Can choose "Cancel booking", which cancels only this booking, frees the seat, shows a confirmation toast and closes the dialog, showing the booking as cancelled.
3. Can choose "Cancel", which closes the dialog and changes nothing.

When cancelling the booking fails:
   1. Reads that cancelling failed and can choose "Cancel booking" to try again (F37.A05).
