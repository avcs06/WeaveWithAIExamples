# SoloStudio: flows catalog

## Flows
- F01 Visit the landing page (Designer, landing, starts On the public landing page): The visitor arrives on the public SoloStudio landing page that explains it is a single workspace for a solo freelance designer to manage clients, projects and bookings, and shows how to start with sign-up or sign-in and a link to the public booking page. The visitor chooses to sign up or sign in as designer, or follows the link to the public booking page as a guest.
- F02 Sign up (Designer, auth, starts On the landing page): The visitor chooses to sign up from the landing page, sees FM01, fills in Email (FD01) and Password (FD02) and submits. The website creates the private workspace with pre-created session types per A04 and empty weekly Availability per A11, signs the designer in and shows the home dashboard.
- F03 Sign in (Designer, auth, starts On the landing page): The visitor chooses to sign in, sees FM02, fills in Email (FD01) and Password (FD02) and submits. The website checks the account, signs the designer in and shows the home dashboard with today's sessions, follow-ups due this week and overdue tasks.
- F04 Sign out (Designer, auth, starts On any signed-in page): The signed-in designer chooses to sign out. The website signs her out and shows the public landing page.
- F05 See the home dashboard (Designer, home, starts On the home dashboard): The designer opens the home dashboard after signing in and sees today's sessions with their bookings, follow-ups due this week with overdue first, and overdue tasks. Each item links to its client, session or project. From here she can go to clients, projects, sessions, availability and session types.
- F06 Browse clients (Designer, browse Client, starts On the client list): The designer opens the client list and sees clients sorted with overdue follow-ups first then soonest due, each showing who is due for a follow-up. She can search by name or company (FD30) and filter by status (FD31), and from each row can mark a follow-up done or push it a week, which lead to F14 and F15.
- F07 View a client (Designer, view Client, starts On the client list): The designer opens a client from the list and sees its Name (FD03), Email (FD04), Company (FD05), Profile (FD06) and Status (FD07) together with its dated notes with follow-up dates, its projects and its bookings matched by email. From here she can edit the client, manage notes and projects, or delete the client.
- F08 Add a client (Designer, create Client, starts On the client list): The designer chooses to add a client, sees FM03, fills in Name (FD03) and Email (FD04) with optional Company (FD05), Profile (FD06) and Status (FD07, defaults to Lead per A01) and saves. The website creates the client and shows it in the list and as a detail page.
- F09 Edit a client (Designer, edit Client, starts On a client's page): The designer opens a client and chooses to edit it, sees FM03 with Name (FD03), Email (FD04), Company (FD05), Profile (FD06) and Status (FD07), changes values and saves. The website updates the client and shows the updated details.
- F10 Delete a client (Designer, delete Client, starts On a client's page): The designer chooses Delete on a client, confirms, and the website deletes the client with its notes, projects and their tasks per idea and A07, leaving its bookings visible in the session list without a client link, then shows the client list without the client.
- F11 Add a note with a follow-up date (Designer, create Note, starts On a client's page): The designer opens a client and chooses to add a note, sees FM04, fills in Note text (FD08) and Note date (FD09, defaults to today) with optional Follow-up date (FD10) and saves. The website creates the dated note under the client and shows it with the client, affecting follow-up sorting per A02.
- F12 Edit a note (Designer, edit Note, starts On a client's page): The designer opens a note under a client, chooses to edit it, sees FM04 with Note text (FD08), Note date (FD09) and Follow-up date (FD10), changes values and saves. The website updates the note and shows it under the client.
- F13 Delete a note (Designer, delete Note, starts On a client's page): The designer chooses Delete on a note under a client and confirms. The website deletes the note and shows the client's remaining notes.
- F14 Mark a follow-up done (Designer, act Note, starts On the client list): From the client list or home follow-ups, the designer marks a follow-up done with one click on the note's Follow-up date (FD10). The website clears the follow-up date per A02 and shows the client no longer due.
- F15 Push a follow-up a week (Designer, act Note, starts On the client list): From the client list or home follow-ups, the designer pushes a follow-up a week with one click on the note's Follow-up date (FD10). The website adds 7 days to the current follow-up date per A02 and shows the new due date in sorted order.
- F16 Browse projects (Designer, browse Project, starts On the projects view): The designer opens the projects view and sees all projects with how many tasks are still open per A03. She can search by name or client name (FD35). Each row links to its project and client.
- F17 View a project with its tasks (Designer, view Project, starts On the projects view): The designer opens a project and sees its Name (FD11), Description (FD12), Due date (FD13) and Client (FD14) with its tasks grouped by status, overdue tasks standing out per A03. She can search by title (FD32) and filter by status (FD33) and priority (FD34), and from here can add, tick done, edit or delete tasks.
- F18 Add a project (Designer, create Project, starts On the projects view): The designer chooses to add a project, sees FM05, fills in Name (FD11), Description (FD12), optional Due date (FD13) and Client (FD14) and saves. The website creates the project under the chosen client and shows it in the projects view.
- F19 Edit a project (Designer, edit Project, starts On a project's page): The designer opens a project and chooses to edit it, sees FM05 with Name (FD11), Description (FD12), Due date (FD13) and Client (FD14), changes values and saves. The website updates the project and shows the updated details.
- F20 Delete a project (Designer, delete Project, starts On a project's page): The designer chooses Delete on a project and confirms. The website deletes the project and its tasks, then shows the projects view without it.
- F21 Add a task (Designer, create Task, starts On a project's page): On a project's page the designer chooses to add a task, sees FM06, fills in Title (FD15) with Status (FD16, defaults to To do), Priority (FD17, defaults to Medium) and optional Due date (FD18) and saves. The website creates the task and shows it in the project's task list with overdue highlighting per A03.
- F22 Edit a task (Designer, edit Task, starts On a project's page): On a project's page the designer opens a task, sees FM06 with Title (FD15), Status (FD16), Priority (FD17) and Due date (FD18), changes values and saves. The website updates the task and shows the updated task list.
- F23 Delete a task (Designer, delete Task, starts On a project's page): On a project's page the designer chooses Delete on a task and confirms. The website deletes the task and shows the remaining tasks with updated open counts.
- F24 Tick a task done (Designer, act Task, starts On a project's page): On a project's page or home overdue list the designer ticks a task done with one click, changing its Status (FD16) to Done. The website marks it done, updates open counts and shows overdue styling removed.
- F25 Set weekly availability (Designer, edit Availability, starts On availability settings): The designer opens availability settings, sees FM07 with current Days (FD19), From time (FD20) and To time (FD21), changes which days and from what time to what time she can be booked and saves. The website updates weekly availability for future slots only per A08 and A05 and shows the saved hours.
- F26 Browse session types (Designer, browse SessionType, starts On session types): The designer opens session types and sees the three pre-created types per A04 with their Name (FD22), Duration in minutes (FD23), Displayed price (FD24) and Maximum people (FD25), including the 30 minute free discovery call, 60 minute design review and 2 hour workshop. From here she can add or edit a type.
- F27 Add a session type (Designer, create SessionType, starts On session types): The designer chooses to add a session type, sees FM08, fills in Name (FD22), Duration in minutes (FD23), Displayed price (FD24, information only) and Maximum people (FD25) and saves. The website creates the type and shows it in the session type list for future slots.
- F28 Edit a session type (Designer, edit SessionType, starts On session types): The designer opens a session type, sees FM08 with Name (FD22), Duration in minutes (FD23), Displayed price (FD24) and Maximum people (FD25), changes values and saves. The website updates the type for future slots only per A08 and shows the updated list.
- F29 See upcoming sessions (Designer, browse Slot, starts On upcoming sessions): The designer opens upcoming sessions and sees slots with their session type, time and bookings, including full slots. Past sessions remain visible separately. From here she can open a slot or cancel it.
- F30 View a slot (Designer, view Slot, starts On upcoming sessions): The designer opens a slot from upcoming sessions and sees its time, session type and the list of bookings with Name (FD26) and Email (FD27) and linked client. From here she can cancel the slot.
- F31 Cancel a slot (Designer, act Slot, starts On a slot's page): The designer chooses to cancel a slot on its page and confirms. The website cancels the slot and every booking on it per A06 and shows upcoming sessions without the slot, freeing the time from future offers.
- F32 View a booking as designer (Designer, view Booking, starts On upcoming sessions): The designer opens a booking from a slot or client and sees its Name (FD26), Email (FD27), Session type (FD28), Slot (FD29) time and linked client created by email match or as Lead per A07. From here she can go to the client or the slot.
- F33 Open the public booking page (Booking guest, landing, starts On the public booking page): A visitor without an account opens the designer's public booking page from its link and sees what booking is for and how to start by picking a session type. The visitor chooses to continue to open times.
- F34 Find an open slot (Booking guest, browse Slot, starts On the public booking page): On the public booking page the guest picks a Session type (FD28) and sees open Slots (FD29) for the next two weeks generated from availability per A05, with full slots no longer offered and overlapping booked times blocked per Q01 default. The guest picks an open slot to book.
- F35 Book a session (Booking guest, create Booking, starts On the public booking page): After picking Session type (FD28) and Slot (FD29), the guest fills in FM09 with Name (FD26) and Email (FD27) and confirms. The website creates the booking when the slot still has seats per its maximum, links it to the matching client by exact email or creates a new Lead client per A07, and shows a confirmation with the private cancellation link on screen; no emails are sent.
- F36 Open a booking via its link (Booking guest, view Booking, starts On the booking's private link): The guest opens the private cancellation link shown after booking and sees the booking's time, session type and status with Name (FD26) and Email (FD27). From here the guest can cancel the booking.
- F37 Cancel own booking (Booking guest, act Booking, starts On the booking's private link): On the booking's private link the guest chooses to cancel their own booking and confirms. The website cancels only that person's booking per A06, frees their seat for others, and shows the slot as cancelled for them.
- F38 Manage account (Designer, account, starts On account settings): The designer opens account settings and sees the current sign-in Email (FD01). She changes the email and/or Password (FD02) and saves. The website updates the account and shows the updated email.

## Skipped
- Designer, browse Note: Notes are listed under their client in F07 View a client; no separate all-notes list.
- Designer, browse Task: Tasks are found inside their project in F17 View a project with its tasks with search FD32 and filters FD33 FD34; no separate all-tasks list.
- Designer, browse Availability: Availability is a single weekly setting shown in F25 Set weekly availability; no list to browse.
- Designer, browse Booking: Bookings are seen with their slots in F29 See upcoming sessions; no separate all-bookings list.
- Designer, view Note: A note is read with its client in F07 View a client; no separate note page.
- Designer, view Task: A task is read with its project in F17 View a project with its tasks; no separate task page.
- Designer, view Availability: Availability is seen while editing in F25 Set weekly availability; no separate read-only page.
- Designer, view SessionType: A session type is read in the list in F26 Browse session types; no separate detail page needed.
- Designer, create Availability: Availability already exists as one weekly setting and is changed in F25; nothing to create.
- Designer, create Slot: Slots are generated from availability per A05, not created by hand.
- Designer, create Booking: Bookings are created by guests in F35 Book a session; the designer does not create them.
- Designer, edit Slot: Slots are generated; changing availability or session type affects future offers per A08 but does not edit a slot.
- Designer, edit Booking: Bookings are not edited; a wrong booking is cancelled via F31 or F37 and rebooked.
- Designer, delete Availability: Availability cannot be deleted; without hours no slots are offered.
- Designer, delete SessionType: Session types are kept to protect existing slots per A10; the designer edits in F28 or adds in F27 instead.
- Designer, delete Slot: A slot is removed by cancelling it in F31 Cancel a slot, not by delete.
- Designer, delete Booking: A booking is removed by cancelling its slot in F31 Cancel a slot; no separate delete.
- Designer, act Client: Clients have no action beyond create, view, edit and delete.
- Designer, act Project: Projects have no action beyond task work; archiving is out of MVP.
- Designer, act Availability: Availability has no action beyond setting it in F25.
- Designer, act SessionType: Session types have no action beyond adding and editing.
- Designer, act Booking: The designer cancels bookings by cancelling the whole slot in F31 Cancel a slot, which cancels everyone on it.
- Designer, settings: No preferences in MVP; availability and session types are managed in their own flows.
- Booking guest, auth: Booking guests never sign in; they book and cancel via the public page and private link.
- Booking guest, home: Booking guests have no dashboard; the public booking page in F33 is their entry.
- Booking guest, browse Client: Guests never see clients; matching by email happens automatically on booking per A07.
- Booking guest, browse Note: Guests never see notes.
- Booking guest, browse Project: Guests never see projects.
- Booking guest, browse Task: Guests never see tasks.
- Booking guest, browse Availability: Guests see only resulting open slots in F34, not the underlying availability.
- Booking guest, browse SessionType: Session types are picked as part of F34 Find an open slot; no separate type list.
- Booking guest, browse Booking: Guests have no bookings list; a booking is opened via its private link in F36.
- Booking guest, view Client: Guests never see clients.
- Booking guest, view Note: Guests never see notes.
- Booking guest, view Project: Guests never see projects.
- Booking guest, view Task: Guests never see tasks.
- Booking guest, view Availability: Guests never see availability.
- Booking guest, view SessionType: Session type details are shown while picking in F34; no separate page.
- Booking guest, view Slot: Slots are seen as open times in F34; details are confirmed on booking in F35.
- Booking guest, create Client: Guests do not create clients directly; a Lead is auto-created on booking per A07 when the email is new.
- Booking guest, create Note: Guests never create notes.
- Booking guest, create Project: Guests never create projects.
- Booking guest, create Task: Guests never create tasks.
- Booking guest, create Availability: Guests never set availability.
- Booking guest, create SessionType: Guests never create session types.
- Booking guest, create Slot: Slots are generated from availability; guests only book them in F35.
- Booking guest, edit Client: Guests never edit clients.
- Booking guest, edit Note: Guests never edit notes.
- Booking guest, edit Project: Guests never edit projects.
- Booking guest, edit Task: Guests never edit tasks.
- Booking guest, edit Availability: Guests never edit availability.
- Booking guest, edit SessionType: Guests never edit session types.
- Booking guest, edit Slot: Guests never edit slots.
- Booking guest, edit Booking: Bookings are not edited; a guest cancels in F37 and rebooks in F35 to change.
- Booking guest, delete Client: Guests never delete clients.
- Booking guest, delete Note: Guests never delete notes.
- Booking guest, delete Project: Guests never delete projects.
- Booking guest, delete Task: Guests never delete tasks.
- Booking guest, delete Availability: Guests never delete availability.
- Booking guest, delete SessionType: Guests never delete session types.
- Booking guest, delete Slot: Guests never delete slots.
- Booking guest, delete Booking: A booking is removed by cancelling in F37 Cancel own booking, not by delete.
- Booking guest, act Client: Guests have no action on clients.
- Booking guest, act Note: Guests have no action on notes.
- Booking guest, act Project: Guests have no action on projects.
- Booking guest, act Task: Guests have no action on tasks.
- Booking guest, act Availability: Guests have no action on availability.
- Booking guest, act SessionType: Guests have no action on session types beyond picking one in F34.
- Booking guest, act Slot: Guests do not act on slots; they book a seat in F35.
- Booking guest, account: Booking guests have no accounts.
- Booking guest, settings: Booking guests have no settings.

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
