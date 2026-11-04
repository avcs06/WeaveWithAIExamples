# SoloStudio: scope

SoloStudio is for a solo freelance UX designer whose clients, notes, tasks and bookings are currently scattered across email, notes and spreadsheets. It brings clients, follow-up notes, projects and tasks, availability and public bookings into one private workspace. The designer tracks follow-ups and work from a home dashboard, while visitors book an available session from her public booking page.

Audience: A solo freelance UX designer managing her own clients, projects and bookings, and the people who book sessions with her without an account.

Kinds of app: crm, booking, project-management

## Roles
- Designer (designer, signs in): The solo freelance UX designer who owns the workspace and manages clients, projects, tasks, availability and sessions.
- Booking guest (bookingGuest, no sign-in): A person booking a session who never signs in and uses the public booking page and a cancellation link.

## Vocabulary
- Client (owned by Designer): A person or company the designer works with: name, email, optional company, short profile and status Lead, Active or Past.
- Note (owned by Designer): A dated note under a Client from a call, with an optional follow-up date that can be marked done or pushed a week.
- Project (owned by Designer): Work for a Client with a name, short description and optional due date, holding Tasks.
- Task (owned by Designer): A task in a Project with a title, status To do, In progress or Done, priority Low, Medium or High and an optional due date.
- Availability (owned by Designer): The designer's weekly availability: which days and from what time to what time she can be booked.
- SessionType (owned by Designer): A kind of bookable session with duration, displayed price and maximum people, such as a discovery call, design review or Figma workshop.
- Slot (owned by Designer): A bookable time for a SessionType generated from Availability, full when its Bookings reach the SessionType maximum; cancelling it cancels all its Bookings.
- Booking (owned by Designer): One person's place on a Slot, made with name and email, linked to a Client by matching email or creating a Lead, cancellable via its on-screen link.

## In scope
- Public landing page that explains SoloStudio is a single workspace for a solo freelance designer to manage clients, projects and bookings, with sign-up and sign-in for the designer and a link to her public booking page.
- The designer signs up and signs in to a private workspace that only she can access; all Clients, Notes, Projects, Tasks, Availability, SessionTypes, Slots and Bookings belong to her.
- Clients with name, email, optional company, a short profile (what they do, how we met, what they pay) and a status of Lead, Active or Past; the designer can create, view, edit and delete a Client.
- Dated Notes jotted under each Client after calls, each with an optional follow-up date; the designer can add, edit and delete Notes.
- Client list sorted so overdue follow-ups come first, then follow-ups due soonest, showing who is due for a follow-up; from the list the designer can mark a follow-up done or push it a week with one click.
- Projects that belong to a Client, with a name, a short description and an optional due date; the designer can create, view, edit and delete a Project.
- Tasks under a Project with a title, a status (To do, In progress, Done), a priority (Low, Medium, High) and an optional due date; the designer can create, edit, delete and tick a Task done quickly.
- A projects view showing all Projects with how many Tasks are still open; opening a Project shows its Tasks, which can be filtered by status and priority and searched by title, with overdue Tasks standing out.
- Deleting a Project deletes its Tasks, and deleting a Client deletes its Projects, Tasks and Notes.
- The designer sets weekly Availability (which days, from what time to what time) and defines SessionTypes with duration, displayed price and maximum people: a 30 minute discovery call (free, 1 person), a 60 minute design review (₹4,000 shown for information, 1 person) and a 2 hour Figma workshop (₹2,500 a seat, up to 8 people). Prices are only displayed; nobody pays in the app.
- Public booking page with no account needed: a visitor picks a SessionType, sees open Slots for the next two weeks, and books with only their name and email, then sees a confirmation and their cancellation link on screen; no emails are sent.
- A Slot is full when its Bookings reach the SessionType maximum and is then no longer offered; if a booking email matches a Client, the Booking lands under that Client, otherwise a new Client is created as a Lead.
- A visitor can cancel their own Booking using the cancellation link shown after booking, which frees their seat.
- The designer sees upcoming sessions (Slots with their Bookings) and can cancel a Slot, which cancels everyone booked on it.
- Home screen for the designer showing today's sessions, follow-ups due this week and overdue Tasks, each linking to the relevant Client, session or Project.

## Out of scope
- Taking payment for paid session types: The idea states prices are only displayed and nobody pays in the app. Instead: Prices are displayed as information only on the SessionType and booking page, and a Booking is confirmed without payment.
- Email confirmations, reminders or cancellation emails: The idea states no emails are sent and the cancellation link is shown on screen. Instead: The booking confirmation and cancellation link are shown on screen immediately after booking, and the designer checks upcoming sessions in the app.
- Accounts or a portal for clients and people booking: The idea states people booking don't have accounts and the app is just for the designer. Instead: Visitors book and cancel through the public booking page and their on-screen cancellation link without signing in.
- Team members, shared workspaces or other freelancers: The idea asks for one app just for her. Instead: The workspace is private to the single designer who signed up.
- Calendar sync, video-call links and invoicing: Not asked for in the idea; the profile records what clients pay as free text. Instead: Sessions, client payment notes in the profile and tasks are tracked inside SoloStudio only.

## Assumptions
- A01 (data, affects Client): A Client requires only name and email; company and profile are optional, and status defaults to Lead unless the designer changes it.
- A02 (behavior, affects Note): Marking a follow-up done clears its follow-up date; pushing it a week adds 7 days to the current follow-up date. A follow-up is overdue when its date is before today and it is not marked done, and due this week when its date falls within the current calendar week.
- A03 (behavior, affects Task): An open Task is any task whose status is not Done. A Task is overdue when it has a due date before today and is not Done.
- A04 (data, affects SessionType, Availability): The three session types named in the idea are pre-created for the designer (30 minute discovery call, free, maximum 1; 60 minute design review, ₹4,000 displayed, maximum 1; 2 hour Figma workshop, ₹2,500 a seat displayed, maximum 8) and the designer can edit them and her weekly Availability.
- A05 (behavior, affects Slot, Booking): Open Slots are generated from the designer's weekly Availability in her own time zone for the next 14 days, long enough for the chosen SessionType, and a Slot that already holds a Booking does not accept an overlapping Booking for a different session type.
- A06 (behavior, affects Booking): The cancellation link shown after booking is a unique private link for that Booking; using it cancels only that person's Booking and frees their seat, while cancelling a Slot as the designer cancels every Booking on it.
- A07 (behavior, affects Client, Booking): Client matching on booking is by exact email address, case-insensitive. Deleting a Client deletes its Notes, Projects and their Tasks as stated, and leaves its Bookings visible in the session list without a client link.
- A08 (behavior, affects Availability, Slot): Changing Availability or a SessionType affects Slots offered afterwards and does not move or cancel Bookings already made.

## Questions
- Q01 (blocking): When different session types share the same availability, can they be booked at overlapping times? Why: This changes when a Slot counts as open or full and whether the designer can be double-booked. Default: A booked time blocks overlapping Slots for every other session type, so the designer is never double-booked.
- Q02: Are the three session types fixed, or can the designer edit and add session types? Why: This changes whether SessionType is editable data or fixed configuration. Default: The three named session types are pre-created and the designer can edit their duration, displayed price and maximum people, and add her own.
- Q03: When a Client with Bookings is deleted, should those Bookings also be deleted? Why: This changes what deleting a Client removes beyond the projects and notes the idea names. Default: Bookings stay in the upcoming and past session list without a client link; the Client's Notes, Projects and Tasks are deleted.
