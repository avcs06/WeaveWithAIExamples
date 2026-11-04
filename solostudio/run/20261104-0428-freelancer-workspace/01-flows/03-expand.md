# SoloStudio: user flows

## F01 Visit the landing page
Designer · landing · Goal: Understand what SoloStudio is for and get started.
Starts: On the public landing page
Before: Not signed in.

1. The visitor opens the landing page. The website shows that SoloStudio is a single workspace for a solo freelance designer to manage clients, projects and bookings, with options to sign up, sign in, and a link to the public booking page.
2. The visitor chooses to sign up, sign in, or open the public booking page. The website shows the chosen starting point: the sign-up form, the sign-in form, or the public booking page.

Outcome: Nothing changes; the visitor knows how to sign up, sign in or open the booking page.

## F02 Sign up
Designer · auth · Goal: Create an account to get a private workspace.
Starts: On the landing page
Before: Not signed in.

1. The visitor chooses to sign up. The website shows the sign-up form.
2. The visitor fills in the form and submits it. (Sign-up form)
   - Email (required, up to 254 characters), e.g. "ana@example.com"
   - Password (required, 8 to 128 characters), e.g. "correct-horse-battery"
   The website creates the account and private workspace with the three pre-created session types and empty weekly availability, signs the designer in and shows the home dashboard.

Other paths
- F02.A01 (from 2, invalid) The email is not an address or the password is shorter than 8 characters:
  1. (system) The website marks the field that is wrong and keeps what was typed.
  Back to 2.
- F02.A02 (from 2, failure) Creating the account fails:
  1. (system) The website keeps the typed values and offers to try again.
  Back to 2.
- F02.A03 (from 2, conflict) The email already has an account:
  1. (system) The website says the email already has an account and offers to sign in instead.
  2. The visitor chooses to sign in. The website shows the sign-in form.
  Flow ends.

Outcome: The designer has an account and private workspace and is signed in; after refresh still signed in.

## F03 Sign in
Designer · auth · Goal: Sign in to the private workspace.
Starts: On the landing page
Before: Not signed in.; Has an account.

1. The visitor chooses to sign in. The website shows the sign-in form.
2. The visitor fills in the form and submits it. (Sign-in form)
   - Email (required, up to 254 characters), e.g. "ana@example.com"
   - Password (required, 8 to 128 characters), e.g. "correct-horse-battery"
   The website checks the account, signs the designer in and shows the home dashboard with today's sessions, follow-ups due this week and overdue tasks.

Other paths
- F03.A01 (from 2, invalid) The email is not an address or the password is shorter than 8 characters:
  1. (system) The website marks the field that is wrong and keeps what was typed.
  Back to 2.
- F03.A02 (from 2, failure) Signing in fails:
  1. (system) The website keeps the typed values and offers to try again.
  Back to 2.
- F03.A03 (from 2, denied) The email and password match no account:
  1. (system) The website says no account matches and offers to try again or sign up instead.
  2. The visitor chooses to sign up. The website shows the sign-up form.
  Flow ends.

Outcome: The designer is signed in and sees the home dashboard; after refresh still signed in.

## F04 Sign out
Designer · auth · Goal: Leave the workspace signed out.
Starts: On any signed-in page
Before: Signed in.

1. The designer chooses to sign out. The website signs her out and shows the public landing page.

Outcome: The designer is signed out; after refresh she stays signed out.

## F05 See the home dashboard
Designer · home · Goal: See what needs attention today in one place.
Starts: On the home dashboard
Before: Signed in.

1. The designer opens the home dashboard. The website shows today's sessions with their bookings, follow-ups due this week with overdue first, and overdue tasks, each linking to the relevant client, session or project.
   Changes: lists Slot, lists Booking, lists Note, lists Task.

Other paths
- F05.A01 (from 1, empty) There are no sessions today, no follow-ups due this week and no overdue tasks:
  1. (system) The website shows that everything is clear and offers to go to clients, projects, sessions, availability and session types.
  Flow ends.

Outcome: Nothing changes; the designer has seen today's sessions, follow-ups due this week and overdue tasks.

## F06 Browse clients
Designer · browse Client · Goal: Find clients and see who needs a follow-up first.
Starts: On the client list
Before: Signed in.

1. The designer opens the client list. The website shows all clients sorted with overdue follow-ups first then soonest due, each showing name, company, status and follow-up due state.
   Changes: lists Client, lists Note.
2. The designer searches by name or company and filters by status.
   - Search clients (optional, up to 120 characters), e.g. "maya"
   - Client status filter (optional, one of: All, Lead, Active, Past), e.g. "Active"
   The website shows only the matching clients in the same follow-up order.
   Changes: lists Client.
3. The designer opens a client from the list. The website shows that client's details, notes, projects and bookings.
   Changes: reads Client.

Other paths
- F06.A01 (from 1, empty) No clients exist yet:
  1. (system) The website says there are no clients yet and offers to add a client.
  Flow ends.
- F06.A02 (from 2, empty) No clients match the search or filter:
  1. (system) The website says nothing matches and offers to clear the search or filter.
  Back to 2.
- F06.A03 (from 3, notFound) The client was deleted in the meantime:
  1. (system) The website says the client is gone and shows the client list.
  Flow ends.

Outcome: Nothing changes; the designer has seen the sorted client list.

## F07 View a client
Designer · view Client · Goal: See one client's details, notes, projects and bookings in one place.
Starts: On the client list
Before: Signed in.; At least one client exists.

1. The designer opens a client from the client list. The website shows the client's name, email, company, profile and status together with its dated notes with follow-up dates, its projects and its bookings matched by email.
   Changes: reads Client, lists Note, lists Project, lists Booking.

Other paths
- F07.A01 (from 1, empty) The client has no notes, projects or bookings yet:
  1. (system) The website shows empty notes, projects and bookings sections with offers to add a note or a project.
  Flow ends.
- F07.A02 (from 1, notFound) The client was deleted in the meantime:
  1. (system) The website says the client is gone and shows the client list.
  Flow ends.

Outcome: Nothing changes; the designer has seen the client's details, notes, projects and bookings.

## F08 Add a client
Designer · create Client · Goal: Remember a new client.
Starts: On the client list
Before: Signed in.

1. The designer chooses to add a client. The website shows an empty client form with status already set to Lead.
2. The designer fills in the client and saves it. (Client form)
   - Name (required, up to 120 characters), e.g. "Maya Sharma"
   - Email (required, up to 254 characters), e.g. "maya@acme.co"
   - Company (optional, up to 120 characters), e.g. "Acme"
   - Profile (optional, up to 2000 characters), e.g. "Runs a D2C skincare brand, met at a meetup, pays 80000 per project"
   - Status (required, one of: Lead, Active, Past), e.g. "Lead"
   The website saves the client and shows it in the client list and as a client page.
   Changes: creates Client.

Other paths
- F08.A01 (from 2, invalid) The name is empty, the email is not an address, or the status is missing:
  1. (system) The website marks what is wrong and keeps what was typed.
  Back to 2.
- F08.A02 (from 2, failure) Saving fails:
  1. (system) The website keeps the values and offers to try again.
  Back to 2.
- F08.A03 (from 1, cancel) The designer cancels:
  1. (system) Nothing is saved; the website shows the client list as it was.
  Flow ends.

Outcome: A new client is saved and still there after refresh.

## F09 Edit a client
Designer · edit Client · Goal: Change a client's details or status.
Starts: On a client's page
Before: Signed in.; At least one client exists.

1. The designer chooses to edit the client. The website shows the client form filled with the current name, email, company, profile and status.
   Changes: reads Client.
2. The designer changes values and saves them. (Client form)
   - Name (required, up to 120 characters), e.g. "Maya Sharma"
   - Email (required, up to 254 characters), e.g. "maya@acme.co"
   - Company (optional, up to 120 characters), e.g. "Acme"
   - Profile (optional, up to 2000 characters), e.g. "Runs a D2C skincare brand, met at a meetup, pays 80000 per project"
   - Status (required, one of: Lead, Active, Past), e.g. "Lead"
   The website updates the client and shows the updated client details.
   Changes: updates Client.

Other paths
- F09.A01 (from 1, notFound) The client was deleted in the meantime:
  1. (system) The website says the client is gone and shows the client list.
  Flow ends.
- F09.A02 (from 2, invalid) The name is empty, the email is not an address, or the status is missing:
  1. (system) The website marks what is wrong and keeps what was typed.
  Back to 2.
- F09.A03 (from 2, failure) Saving fails:
  1. (system) The website keeps the values and offers to try again.
  Back to 2.
- F09.A04 (from 2, cancel) The designer cancels:
  1. (system) Nothing is changed; the website shows the client again as it was.
  Flow ends.

Outcome: The client is updated and stays updated after refresh.

## F10 Delete a client
Designer · delete Client · Goal: Remove a client and everything under them.
Starts: On a client's page
Before: Signed in.; At least one client exists.

1. The designer chooses Delete on the client. The website asks the designer to confirm deleting the client with its notes, projects and tasks, explaining its bookings will stay visible without a client link.
   Changes: deletes Client, deletes Note, deletes Project, deletes Task.

Other paths
- F10.A01 (from 1, confirm) The designer confirmed the deletion:
  1. (system) The website shows the client list without the client.
  Flow ends.
- F10.A02 (from 1, cancel) The designer cancelled:
  1. (system) Nothing is deleted; the website shows the client again, unchanged.
  Flow ends.
- F10.A03 (from 1, notFound) The client was deleted in the meantime:
  1. (system) The website says the client is already gone and shows the client list.
  Flow ends.

Outcome: The client, its notes, projects and tasks are gone after refresh; its bookings remain unlinked.

## F11 Add a note with a follow-up date
Designer · create Note · Goal: Jot a dated note after a call and optionally set a follow-up.
Starts: On a client's page
Before: Signed in.; At least one client exists.

1. The designer chooses to add a note. The website shows an empty note form with the note date set to today.
2. The designer fills in the note and saves it. (Note form)
   - Note text (required, up to 5000 characters), e.g. "Call about homepage redo, likes calm layouts, send proposal"
   - Note date (required), e.g. "2026-11-02"
   - Follow-up date (optional), e.g. "2026-11-10"
   The website saves the note under the client and shows it with its follow-up date in the client's notes.
   Changes: creates Note.

Other paths
- F11.A01 (from 2, invalid) The note text is empty or a date cannot be understood:
  1. (system) The website marks the field that needs fixing and keeps what was typed.
  Back to 2.
- F11.A02 (from 2, failure) Saving the note fails:
  1. (system) The website keeps the entered values and offers to try again.
  Back to 2.
- F11.A03 (from 1, cancel) The designer cancels adding the note:
  1. (system) Nothing is saved; the website shows the client as it was.
  Flow ends.

Outcome: The new dated note with its follow-up date is saved under the client after refresh.

## F12 Edit a note
Designer · edit Note · Goal: Correct or update a note and its follow-up date.
Starts: On a client's page
Before: Signed in.; At least one note exists.

1. The designer chooses to edit a note under the client. The website shows the note form filled with the note's current text, note date and follow-up date.
   Changes: reads Note.
2. The designer changes the values and saves the note. (Note form)
   - Note text (required, up to 5000 characters), e.g. "Call about homepage redo, likes calm layouts, send proposal"
   - Note date (required), e.g. "2026-11-02"
   - Follow-up date (optional), e.g. "2026-11-10"
   The website updates the note and shows it under the client with its new follow-up date.
   Changes: updates Note.

Other paths
- F12.A01 (from 2, invalid) The note text is empty or a date cannot be understood:
  1. (system) The website marks the field that needs fixing and keeps what was typed.
  Back to 2.
- F12.A02 (from 2, failure) Saving the note fails:
  1. (system) The website keeps the entered values and offers to try again.
  Back to 2.
- F12.A03 (from 1, cancel) The designer cancels editing the note:
  1. (system) Nothing is changed; the website shows the note as it was.
  Flow ends.
- F12.A04 (from 1, notFound) The note is no longer there:
  1. (system) The website says the note is gone and shows the client's remaining notes.
  Flow ends.

Outcome: The note is updated and stays updated after refresh.

## F13 Delete a note
Designer · delete Note · Goal: Remove a note that is no longer needed.
Starts: On a client's page
Before: Signed in.; At least one note exists.

1. The designer chooses Delete on a note under the client. The website asks the designer to confirm deleting the note.
   Changes: deletes Note.

Other paths
- F13.A01 (from 1, confirm) The designer confirms the deletion:
  1. (system) The website shows the client's remaining notes without the deleted note.
  Flow ends.
- F13.A02 (from 1, cancel) The designer cancels the deletion:
  1. (system) The website shows the note again, unchanged.
  Flow ends.
- F13.A03 (from 1, notFound) The note is already gone:
  1. (system) The website says the note is gone and shows the client's remaining notes.
  Flow ends.

Outcome: The note is gone and stays gone after refresh.

## F14 Mark a follow-up done
Designer · act Note · Goal: Mark a follow-up done with one click.
Starts: On the client list
Before: Signed in.; At least one note with a follow-up date exists.

1. The designer marks a follow-up done with one click. The website clears the follow-up date and shows the client no longer due for a follow-up.
   Changes: updates Note.

Other paths
- F14.A01 (from 1, failure) Clearing the follow-up date fails:
  1. (system) The website keeps the follow-up date and offers to try again.
  Back to 1.
- F14.A02 (from 1, notFound) The note is no longer there:
  1. (system) The website says the note is gone and shows the client list as it is.
  Flow ends.

Outcome: The follow-up date is cleared and stays cleared after refresh.

## F15 Push a follow-up a week
Designer · act Note · Goal: Push a follow-up a week with one click.
Starts: On the client list
Before: Signed in.; At least one note with a follow-up date exists.

1. The designer pushes a follow-up a week with one click. The website adds 7 days to the follow-up date and shows the new due date in sorted order.
   Changes: updates Note.

Other paths
- F15.A01 (from 1, failure) Pushing the follow-up date fails:
  1. (system) The website keeps the follow-up date and offers to try again.
  Back to 1.
- F15.A02 (from 1, notFound) The note is no longer there:
  1. (system) The website says the note is gone and shows the client list as it is.
  Flow ends.

Outcome: The follow-up date is 7 days later and stays so after refresh.

## F16 Browse projects
Designer · browse Project · Goal: See every project and how much work is left.
Starts: On the projects view
Before: Signed in.

1. The designer opens the projects view. The website shows all projects with their name, client name, due date and open task count and that each row links to its project and client.
   Changes: lists Project, lists Task.
2. The designer searches by project name or client name.
   - Search projects (optional, up to 120 characters), e.g. "acme"
   The website shows only projects whose name or client name matches.
   Changes: lists Project.

Other paths
- F16.A01 (from 1, empty) There are no projects yet:
  1. (system) The website shows that there are no projects yet and offers to add a project.
  Flow ends.
- F16.A02 (from 2, empty) No project matches the search:
  1. (system) The website shows that nothing matches and offers to clear the search or add a project.
  Back to 2.

Outcome: Nothing changes; the designer has seen all projects with open task counts.

## F17 View a project with its tasks
Designer · view Project · Goal: See a project's tasks and narrow them down.
Starts: On the projects view
Before: Signed in.; At least one project exists.

1. The designer opens a project from the projects view. The website shows the project's name, description, due date and client together with its tasks grouped by status, with overdue tasks standing out.
   Changes: reads Project, lists Task.
2. The designer searches by title and filters by status and priority.
   - Search tasks (optional, up to 120 characters), e.g. "hero"
   - Task status filter (optional, one of: All, To do, In progress, Done), e.g. "To do"
   - Task priority filter (optional, one of: All, Low, Medium, High), e.g. "High"
   The website shows only tasks whose title matches and whose status and priority match the chosen filters.
   Changes: lists Task.

Other paths
- F17.A01 (from 1, notFound) The project was deleted in the meantime:
  1. (system) The website says the project is gone and shows the projects view.
  Flow ends.
- F17.A02 (from 1, empty) The project has no tasks yet:
  1. (system) The website shows that there are no tasks yet and offers to add a task.
  Flow ends.
- F17.A03 (from 2, empty) No task matches the search or filters:
  1. (system) The website shows that nothing matches and offers to clear the search and filters.
  Back to 2.

Outcome: Nothing changes; the designer has seen the project and its filtered tasks.

## F18 Add a project
Designer · create Project · Goal: Start a new project for a client.
Starts: On the projects view
Before: Signed in.; At least one client exists.

1. The designer chooses to add a project. The website shows an empty project form.
2. The designer fills in the project and saves it. (Project form)
   - Name (required, up to 200 characters), e.g. "Acme homepage"
   - Description (required, up to 2000 characters), e.g. "Redesign homepage and pricing page"
   - Due date (optional), e.g. "2026-12-15"
   - Client (required, one of the Client records), e.g. "Maya Sharma"
   The website saves the project under the chosen client and shows it in the projects view.
   Changes: creates Project.

Other paths
- F18.A01 (from 2, invalid) The name or description is empty, the due date is not a date, or no client is chosen:
  1. (system) The website marks what is missing or wrong and keeps what was typed.
  Back to 2.
- F18.A02 (from 2, failure) Saving the project fails:
  1. (system) The website keeps the values and offers to try again.
  Back to 2.
- F18.A03 (from 1, cancel) The designer cancels:
  1. (system) Nothing is saved; the website shows the projects view as it was.
  Flow ends.

Outcome: The new project is saved and still there after refresh.

## F19 Edit a project
Designer · edit Project · Goal: Change a project's details or move it to another client.
Starts: On a project's page
Before: Signed in.; At least one project exists.

1. The designer chooses to edit the project. The website shows the project form with the current name, description, due date and client.
   Changes: reads Project.
2. The designer changes the project and saves it. (Project form)
   - Name (required, up to 200 characters), e.g. "Acme homepage"
   - Description (required, up to 2000 characters), e.g. "Redesign homepage and pricing page"
   - Due date (optional), e.g. "2026-12-15"
   - Client (required, one of the Client records), e.g. "Maya Sharma"
   The website saves the changes and shows the updated project.
   Changes: updates Project.

Other paths
- F19.A01 (from 1, notFound) The project was deleted in the meantime:
  1. (system) The website says the project is gone and shows the projects view.
  Flow ends.
- F19.A02 (from 2, invalid) The name or description is empty, the due date is not a date, or no client is chosen:
  1. (system) The website marks what is missing or wrong and keeps what was typed.
  Back to 2.
- F19.A03 (from 2, failure) Saving the changes fails:
  1. (system) The website keeps the values and offers to try again.
  Back to 2.
- F19.A04 (from 1, cancel) The designer cancels:
  1. (system) Nothing is changed; the website shows the project as it was.
  Flow ends.

Outcome: The project is updated and stays updated after refresh.

## F20 Delete a project
Designer · delete Project · Goal: Remove a project and its tasks.
Starts: On a project's page
Before: Signed in.; At least one project exists.

1. The designer chooses to delete the project. The website asks the designer to confirm deleting the project and its tasks.
   Changes: deletes Project, deletes Task.

Other paths
- F20.A01 (from 1, confirm) The designer confirms the deletion:
  1. (system) The website deletes the project and its tasks and shows the projects view without the project.
  Flow ends.
- F20.A02 (from 1, cancel) The designer cancels:
  1. (system) Nothing is deleted; the website shows the project as it was.
  Flow ends.
- F20.A03 (from 1, notFound) The project was already deleted:
  1. (system) The website says the project is already gone and shows the projects view.
  Flow ends.

Outcome: The project and its tasks are gone after refresh.

## F21 Add a task
Designer · create Task · Goal: Add a task to a project.
Starts: On a project's page
Before: Signed in.; At least one project exists.

1. The designer chooses to add a task. The website shows an empty task form with status set to To do and priority set to Medium.
2. The designer fills in the task and saves it. (Task form)
   - Title (required, up to 200 characters), e.g. "Draft hero section"
   - Status (required, one of: To do, In progress, Done), e.g. "To do"
   - Priority (required, one of: Low, Medium, High), e.g. "High"
   - Due date (optional), e.g. "2026-11-08"
   The website saves the task and shows it in the project's task list, standing out when its due date is before today and it is not Done.
   Changes: creates Task.

Other paths
- F21.A01 (from 2, invalid) The title is empty:
  1. (system) The website marks the empty title and keeps what was typed.
  Back to 2.
- F21.A02 (from 2, failure) Saving the task fails:
  1. (system) The website keeps the entered values and offers to try again.
  Back to 2.
- F21.A03 (from 1, cancel) The designer cancels adding the task:
  1. (system) Nothing is saved; the website shows the project with its tasks as they were.
  Flow ends.

Outcome: The new task is saved under the project after refresh.

## F22 Edit a task
Designer · edit Task · Goal: Change a task's title, status, priority or due date.
Starts: On a project's page
Before: Signed in.; At least one task exists.

1. The designer opens a task from the project's task list. The website shows the task form with the task's current title, status, priority and due date.
   Changes: reads Task.
2. The designer changes the values and saves them. (Task form)
   - Title (required, up to 200 characters), e.g. "Draft hero section"
   - Status (required, one of: To do, In progress, Done), e.g. "To do"
   - Priority (required, one of: Low, Medium, High), e.g. "High"
   - Due date (optional), e.g. "2026-11-08"
   The website updates the task and shows the updated task list with updated open counts.
   Changes: updates Task.

Other paths
- F22.A01 (from 1, notFound) The task was deleted in the meantime:
  1. (system) The website says the task is gone and shows the project's remaining tasks.
  Flow ends.
- F22.A02 (from 2, invalid) The title is empty:
  1. (system) The website marks the empty title and keeps what was typed.
  Back to 2.
- F22.A03 (from 2, failure) Saving the changes fails:
  1. (system) The website keeps the entered values and offers to try again.
  Back to 2.
- F22.A04 (from 2, cancel) The designer cancels without saving:
  1. (system) Nothing is changed; the website shows the project with its tasks as they were.
  Flow ends.

Outcome: The task is updated and stays updated after refresh.

## F23 Delete a task
Designer · delete Task · Goal: Remove a task that is no longer needed.
Starts: On a project's page
Before: Signed in.; At least one task exists.

1. The designer chooses Delete on a task. The website asks the designer to confirm deleting the task.
   Changes: deletes Task.

Other paths
- F23.A01 (from 1, confirm) The designer confirmed the deletion:
  1. (system) The website shows the project's remaining tasks with updated open counts.
  Flow ends.
- F23.A02 (from 1, cancel) The designer cancelled:
  1. (system) Nothing is deleted; the website shows the project with its tasks as they were.
  Flow ends.
- F23.A03 (from 1, notFound) The task was already gone:
  1. (system) The website says the task is gone and shows the project's remaining tasks.
  Flow ends.

Outcome: The task is gone and stays gone after refresh.

## F24 Tick a task done
Designer · act Task · Goal: Tick a task done quickly.
Starts: On a project's page
Before: Signed in.; At least one open task exists.

1. The designer ticks an open task done. The website marks the task Done, updates the open task counts and no longer shows it as overdue.
   Changes: updates Task.

Other paths
- F24.A01 (from 1, failure) Marking the task done fails:
  1. (system) The website keeps the task as it was and offers to try again.
  Back to 1.
- F24.A02 (from 1, notFound) The task was deleted in the meantime:
  1. (system) The website says the task is gone and shows the project's remaining tasks.
  Flow ends.
- F24.A03 (from 1, other) The task is already Done:
  1. (system) The website shows the task as Done with updated open counts.
  Flow ends.

Outcome: The task is Done and stays Done after refresh.

## F25 Set weekly availability
Designer · edit Availability · Goal: Set the weekly days and hours that can be booked.
Starts: On availability settings
Before: Signed in.

1. The designer changes the days, from time and to time and saves them. (Availability form)
   - Days (optional, any of: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday), e.g. "Monday"
   - From time (optional), e.g. "10:00"
   - To time (optional), e.g. "17:00"
   The website saves the weekly availability and shows the saved days and hours; future open slots use the new hours and existing bookings are unchanged.
   Changes: updates Availability.

Other paths
- F25.A01 (from 1, invalid) At least one day is selected but From time or To time is missing, or To time is not after From time:
  1. (system) The website marks what is missing or wrong, keeps the entered days and times, and offers to correct them.
  Back to 1.
- F25.A02 (from 1, failure) Saving the availability fails:
  1. (system) The website keeps the entered days and times and offers to try again.
  Back to 1.

Outcome: Availability is updated and still shows after refresh; existing bookings are unchanged.

## F26 Browse session types
Designer · browse SessionType · Goal: See the kinds of sessions visitors can book.
Starts: On session types
Before: Signed in.

1. The designer opens session types. The website shows all session types with their name, duration in minutes, displayed price and maximum people.
   Changes: lists SessionType.

Other paths
- F26.A01 (from 1, empty) There are no session types yet:
  1. (system) The website says there are no session types yet and offers to add one.
  Flow ends.

Outcome: Nothing changes; the designer has seen all session types.

## F27 Add a session type
Designer · create SessionType · Goal: Offer a new kind of bookable session.
Starts: On session types
Before: Signed in.

1. The designer chooses to add a session type. The website shows an empty session type form.
2. The designer fills in the session type and saves it. (Session type form)
   - Name (required, up to 120 characters), e.g. "Discovery call"
   - Duration in minutes (required, 15 to 480), e.g. "30"
   - Displayed price (required, at least 0), e.g. "0"
   - Maximum people (required, 1 to 20), e.g. "1"
   The website saves the session type and shows it in the session type list.
   Changes: creates SessionType.

Other paths
- F27.A01 (from 2, invalid) The name is empty, the duration is not a whole number or is below 15 or above 480, the displayed price is not a number or is negative, or the maximum people is not a whole number or is below 1 or above 20:
  1. (system) The website marks what is wrong and keeps what was typed.
  Back to 2.
- F27.A02 (from 2, failure) Saving fails:
  1. (system) The website keeps the values and offers to try again.
  Back to 2.
- F27.A03 (from 1, cancel) The designer cancels without saving:
  1. (system) Nothing is saved; the website shows the session type list as it was.
  Flow ends.

Outcome: The new session type is saved and still there after refresh.

## F28 Edit a session type
Designer · edit SessionType · Goal: Change a session's length, displayed price or seats.
Starts: On session types
Before: Signed in.; At least one session type exists.

1. The designer opens a session type to edit it. The website shows the session type with its current name, duration in minutes, displayed price and maximum people in the session type form.
   Changes: reads SessionType.
2. The designer changes the values and saves them. (Session type form)
   - Name (required, up to 120 characters), e.g. "Discovery call"
   - Duration in minutes (required, 15 to 480), e.g. "30"
   - Displayed price (required, at least 0), e.g. "0"
   - Maximum people (required, 1 to 20), e.g. "1"
   The website updates the session type and shows it in the session type list; existing bookings are unchanged.
   Changes: updates SessionType.

Other paths
- F28.A01 (from 1, notFound) The session type is gone:
  1. (system) The website says the session type is gone and shows the session type list.
  Flow ends.
- F28.A02 (from 2, invalid) The name is empty, the duration is not a whole number or is below 15 or above 480, the displayed price is not a number or is negative, or the maximum people is not a whole number or is below 1 or above 20:
  1. (system) The website marks what is wrong and keeps what was typed.
  Back to 2.
- F28.A03 (from 2, failure) Saving fails:
  1. (system) The website keeps the values and offers to try again.
  Back to 2.
- F28.A04 (from 1, cancel) The designer cancels without saving:
  1. (system) Nothing is changed; the website shows the session type list as it was.
  Flow ends.

Outcome: The session type is updated and stays updated after refresh; existing bookings are unchanged.

## F29 See upcoming sessions
Designer · browse Slot · Goal: See upcoming sessions and who booked them.
Starts: On upcoming sessions
Before: Signed in.

1. The designer opens upcoming sessions. The website shows upcoming slots with their session type, time and bookings, including full slots, and past sessions separately.
   Changes: lists Slot, lists Booking, reads SessionType.

Other paths
- F29.A01 (from 1, empty) There are no upcoming slots:
  1. (system) The website says there are no upcoming sessions yet and explains new sessions appear when guests book open times, and the designer can check availability and session types.
  Flow ends.

Outcome: Nothing changes; the designer has seen upcoming slots with their bookings.

## F30 View a slot
Designer · view Slot · Goal: See who booked a time slot and for what.
Starts: On upcoming sessions
Before: Signed in.; At least one slot with or without bookings exists.

1. The designer opens a slot from upcoming sessions. The website shows the slot's time and session type with its bookings showing name, email and linked client.
   Changes: reads Slot, lists Booking, reads SessionType, reads Client.

Other paths
- F30.A01 (from 1, empty) The slot has no bookings yet:
  1. (system) The website shows the slot with no bookings yet and says the time stays open for booking until the slot is cancelled.
  Flow ends.
- F30.A02 (from 1, notFound) The slot no longer exists:
  1. (system) The website says the slot is gone and shows upcoming sessions.
  Flow ends.

Outcome: Nothing changes; the designer has seen the slot and its bookings.

## F31 Cancel a slot
Designer · act Slot · Goal: Cancel a time slot and everyone booked on it.
Starts: On a slot's page
Before: Signed in.; At least one upcoming slot exists.

1. The designer chooses to cancel the slot. The website asks the designer to confirm cancelling the slot and every booking on it.
   Changes: deletes Slot, deletes Booking.

Other paths
- F31.A01 (from 1, confirm) The designer confirms the cancellation:
  1. (system) The website cancels the slot and every booking on it and shows upcoming sessions without the slot.
  Flow ends.
- F31.A02 (from 1, cancel) The designer does not confirm:
  1. (system) Nothing is cancelled; the website shows the slot again unchanged.
  Flow ends.
- F31.A03 (from 1, notFound) The slot was already cancelled:
  1. (system) The website says the slot is gone and shows upcoming sessions.
  Flow ends.

Outcome: The slot and its bookings are cancelled and stay cancelled after refresh.

## F32 View a booking as designer
Designer · view Booking · Goal: See who booked, for what and when.
Starts: On upcoming sessions
Before: Signed in.; At least one booking exists.

1. The designer opens a booking from the upcoming sessions. The website shows the booking's name, email, session type, slot time and linked client when one exists, with ways to open the client and the slot.
   Changes: reads Booking, reads Slot, reads Client.

Other paths
- F32.A01 (from 1, notFound) The booking was cancelled in the meantime:
  1. (system) The website says the booking is gone and shows the upcoming sessions.
  Flow ends.

Outcome: Nothing changes; the designer has seen the booking details.

## F33 Open the public booking page
Booking guest · landing · Goal: Arrive at the public booking page and get started.
Starts: On the public booking page
Before: Not signed in.

1. The visitor opens the public booking page using the designer's booking link. The website shows what booking is for, the session types with duration and displayed price, and how to start by picking a session type.
   Changes: lists SessionType.
2. The visitor chooses to continue to open times. The website shows the session type choice to continue toward finding an open time.

Other paths
- F33.A01 (from 1, empty) No session types are offered right now:
  1. (system) The website says no sessions are currently offered and to check back later.
  Flow ends.

Outcome: Nothing changes; the guest knows how to pick a session type and see open times.

## F34 Find an open slot
Booking guest · browse Slot · Goal: Pick a service and see which times are still open.
Starts: On the public booking page
Before: Not signed in.

1. The guest picks a session type.
   - Session type (required, one of the SessionType records), e.g. "Discovery call"
   The website shows the session type's duration and displayed price and lists its open slots for the next two weeks, excluding full slots and times blocked by overlapping bookings.
   Changes: reads SessionType, lists Slot.
2. The guest picks an open slot to book.
   - Slot (required, one of the Slot records), e.g. "2026-11-05 10:00"
   The website shows the chosen session type and slot with the booking details form.
   Changes: reads Slot.

Other paths
- F34.A01 (from 1, empty) There are no open slots for the chosen session type in the next two weeks:
  1. (system) The website says there are no open times for the chosen session type in the next two weeks and offers to try another session type.
  Back to 1.
- F34.A02 (from 2, other) The chosen slot became full or blocked by an overlapping booking before the guest picked it:
  1. (system) The website says that time is no longer open and shows the updated list of open slots for the chosen session type.
  Back to 2.

Outcome: Nothing changes; the guest has seen open slots for the chosen session type.

## F35 Book a session
Booking guest · create Booking · Goal: Book an open time and get a confirmation with a cancellation link.
Starts: On the public booking page
Before: Not signed in.

1. The guest chooses a session type.
   - Session type (required, one of the SessionType records), e.g. "Discovery call"
   The website shows open slots for the next two weeks for that session type with its duration and displayed price, hiding full slots and times blocked by another booking.
   Changes: reads SessionType, lists Slot.
2. The guest chooses an open slot.
   - Slot (required, one of the Slot records), e.g. "2026-11-05 10:00"
   The website shows the chosen session type and slot time with the booking details form.
   Changes: reads Slot.
3. The guest fills in name and email and confirms the booking. (Booking details form)
   - Name (required, up to 120 characters), e.g. "Ravi Patel"
   - Email (required, up to 254 characters), e.g. "ravi@example.com"
   The website creates the booking, links it to the client with the same email or creates a new Lead client when the email is new, and shows a confirmation with the booking time and the private cancellation link.
   Changes: creates Booking, reads Client, creates Client.

Other paths
- F35.A01 (from 1, empty) There are no open slots for the chosen session type in the next two weeks:
  1. (system) The website says no times are open for that session type and invites the guest to choose another session type.
  Back to 1.
- F35.A02 (from 3, invalid) The name is empty or the email is not an address:
  1. (system) The website marks what is wrong and keeps what was typed.
  Back to 3.
- F35.A03 (from 3, failure) Creating the booking fails:
  1. (system) The website keeps the entered values and offers to try again.
  Back to 3.
- F35.A04 (from 3, conflict) The slot became full or was cancelled before the booking was saved:
  1. (system) The website says the time is no longer open and invites the guest to choose another open slot.
  Back to 1.

Outcome: The booking is saved and the confirmation with cancellation link is shown; refresh still shows the booking as booked.

## F36 Open a booking via its link
Booking guest · view Booking · Goal: Check a booking's time and status.
Starts: On the booking's private link
Before: Not signed in.; Has the cancellation link.

1. The guest opens the private cancellation link. The website shows the booking's session type, slot time and status with the name and email it was booked with, and the option to cancel it.
   Changes: reads Booking.

Other paths
- F36.A01 (from 1, notFound) The link is unknown or the booking no longer exists:
  1. (system) The website says the link is not recognised and offers to open the public booking page.
  2. The guest chooses to open the public booking page. The website shows the public booking page with session types.
  Flow ends.
- F36.A02 (from 1, other) The booking is already cancelled:
  1. (system) The website shows the booking as cancelled with its former time and offers to book another time.
  Flow ends.

Outcome: Nothing changes; the guest has seen the booking details.

## F37 Cancel own booking
Booking guest · act Booking · Goal: Cancel a booking and free the seat.
Starts: On the booking's private link
Before: Not signed in.; Has the cancellation link for an active booking.

1. The guest opens the private cancellation link. The website shows the booking's session type, slot time and status with the option to cancel it.
   Changes: reads Booking.
2. The guest chooses to cancel the booking. The website asks the guest to confirm cancelling only this booking.
   Changes: updates Booking.

Other paths
- F37.A01 (from 1, notFound) The link is unknown or the booking no longer exists:
  1. (system) The website says the link is not recognised and offers to open the public booking page.
  2. The guest chooses to open the public booking page. The website shows the public booking page with session types.
  Flow ends.
- F37.A02 (from 1, other) The booking is already cancelled:
  1. (system) The website shows the booking as already cancelled with its former time and offers to book another time.
  Flow ends.
- F37.A03 (from 2, confirm) The guest confirms the cancellation:
  1. (system) The website cancels only that person's booking, frees the seat and shows the booking as cancelled.
  Flow ends.
- F37.A04 (from 2, cancel) The guest does not confirm:
  1. (system) Nothing is cancelled; the website shows the booking again unchanged.
  Flow ends.
- F37.A05 (from 2, failure) Cancelling the booking fails:
  1. (system) The website keeps the booking unchanged and offers to try again.
  Back to 2.

Outcome: The booking is cancelled and stays cancelled after refresh; the seat is open again.

## F38 Manage account
Designer · account · Goal: See and change the sign-in email and password.
Starts: On account settings
Before: Signed in.

1. The designer opens account settings. The website shows the current sign-in email with options to change the email and password.
2. The designer changes the email and password and saves.
   - Email (required, up to 254 characters), e.g. "ana@example.com"
   - Password (required, 8 to 128 characters), e.g. "correct-horse-battery"
   The website updates the account and shows the updated sign-in email.

Other paths
- F38.A01 (from 2, invalid) The email is not an address or the password is shorter than 8 characters:
  1. (system) The website marks the field that is wrong and keeps what was typed.
  Back to 2.
- F38.A02 (from 2, failure) Saving the account changes fails:
  1. (system) The website keeps the typed values and offers to try again.
  Back to 2.
- F38.A03 (from 2, conflict) The new email already has another account:
  1. (system) The website says the email is already in use and keeps the current sign-in email unchanged.
  Back to 2.

Outcome: The email and password are updated and stay updated after refresh; the designer stays signed in.

## Fields

### Client
- FD03 Name (required, up to 120 characters), e.g. "Maya Sharma". How the designer refers to the client
- FD04 Email (required, up to 254 characters), e.g. "maya@acme.co". How to reach the client and match bookings to the client
- FD05 Company (optional, up to 120 characters), e.g. "Acme". Client company when the client is a business
- FD06 Profile (optional, up to 2000 characters), e.g. "Runs a D2C skincare brand, met at a meetup, pays 80000 per project". What the client does, how they met and what they pay
- FD07 Status (required, one of: Lead, Active, Past), e.g. "Lead". Where the client is in the relationship

### Note
- FD08 Note text (required, up to 5000 characters), e.g. "Call about homepage redo, likes calm layouts, send proposal". What was discussed or observed after a call
- FD09 Note date (required), e.g. "2026-11-02". The day the note is about, defaults to today
- FD10 Follow-up date (optional), e.g. "2026-11-10". When to follow up next, empty when no follow-up is needed

### Project
- FD11 Name (required, up to 200 characters), e.g. "Acme homepage". How the designer refers to the project
- FD12 Description (required, up to 2000 characters), e.g. "Redesign homepage and pricing page". What the project covers in a few words
- FD13 Due date (optional), e.g. "2026-12-15". When the project should be finished, empty when none
- FD14 Client (required, one of the Client records), e.g. "Maya Sharma". Which client the project belongs to

### Task
- FD15 Title (required, up to 200 characters), e.g. "Draft hero section". What needs to be done
- FD16 Status (required, one of: To do, In progress, Done), e.g. "To do". Where the task is in the work
- FD17 Priority (required, one of: Low, Medium, High), e.g. "High". How urgent the task is
- FD18 Due date (optional), e.g. "2026-11-08". When the task should be done, empty when none

### Availability
- FD19 Days (optional, any of: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday), e.g. "Monday". Which weekdays the designer can be booked
- FD20 From time (optional), e.g. "10:00". When bookable hours start on the chosen days
- FD21 To time (optional), e.g. "17:00". When bookable hours end on the chosen days

### SessionType
- FD22 Name (required, up to 120 characters), e.g. "Discovery call". How visitors recognise the kind of session
- FD23 Duration in minutes (required, 15 to 480), e.g. "30". How long one slot of this type lasts
- FD24 Displayed price (required, at least 0), e.g. "0". Price shown for information only, nobody pays in the app
- FD25 Maximum people (required, 1 to 20), e.g. "1". How many bookings a slot takes before it is full

### Booking
- FD26 Name (required, up to 120 characters), e.g. "Ravi Patel". Who is booking the seat
- FD27 Email (required, up to 254 characters), e.g. "ravi@example.com". How to match the booking to a client and identify the booker
- FD28 Session type (required, one of the SessionType records), e.g. "Discovery call". Which kind of session the visitor wants to book
- FD29 Slot (required, one of the Slot records), e.g. "2026-11-05 10:00". Which open time the visitor books

### Kept by no record
- FD01 Email (required, up to 254 characters), e.g. "ana@example.com". How the designer signs in
- FD02 Password (required, 8 to 128 characters), e.g. "correct-horse-battery". Secret that protects the designer's workspace
- FD30 Search clients (optional, up to 120 characters), e.g. "maya". Finds clients by name or company
- FD31 Client status filter (optional, one of: All, Lead, Active, Past), e.g. "Active". Shows only clients with the chosen status
- FD32 Search tasks (optional, up to 120 characters), e.g. "hero". Finds tasks by title inside a project
- FD33 Task status filter (optional, one of: All, To do, In progress, Done), e.g. "To do". Shows only tasks with the chosen status
- FD34 Task priority filter (optional, one of: All, Low, Medium, High), e.g. "High". Shows only tasks with the chosen priority
- FD35 Search projects (optional, up to 120 characters), e.g. "acme". Finds projects by name or client name

## Forms
- FM01 Sign-up form: FD01, FD02
- FM02 Sign-in form: FD01, FD02
- FM03 Client form: FD03, FD04, FD05, FD06, FD07
- FM04 Note form: FD08, FD09, FD10
- FM05 Project form: FD11, FD12, FD13, FD14
- FM06 Task form: FD15, FD16, FD17, FD18
- FM07 Availability form: FD19, FD20, FD21
- FM08 Session type form: FD22, FD23, FD24, FD25
- FM09 Booking details form: FD26, FD27

## New assumptions
- A09 (behavior, affects Client, Task): Client list offers search by name or company and filter by status; project task list offers search by title and filters by status and priority. Client sorting follows A02 (overdue follow-ups first, then soonest due). Task overdue highlighting follows A03.
- A10 (data, affects Task, SessionType): New Tasks default to status To do and priority Medium unless the designer changes them. SessionTypes cannot be deleted in MVP to protect existing Slots and Bookings; the designer edits or adds types instead. There is no profile or preferences screen beyond sign-up and sign-in for the single designer.
- A11 (data, affects Availability): Weekly Availability is pre-created at sign-up as empty with no days selected and is managed only by editing in F25; until hours are set no Slots are offered.

## New questions
- Q04: Should past sessions and cancelled bookings remain visible to the designer? Why: This changes whether Slot and Booking history is kept or disappears after the time passes. Default: Past slots and bookings stay visible in a past list and cannot be booked or cancelled.
