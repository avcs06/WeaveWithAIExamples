# SoloStudio: contract

The records the app keeps, the operations its screens call, and what each screen and dialog loads. Every record also has id, createdAt, updatedAt. Sign up, sign in and sign out are built in.

## Entities

### Client

Implements Client.

| Field | Kind | Required |
| ----- | ---- | -------- |
| name | text | yes |
| email | email | yes |
| company | text | no |
| profile | text | no |
| status | enum ClientStatus | yes |

### Note

Implements Note.

| Field | Kind | Required |
| ----- | ---- | -------- |
| noteText | text | yes |
| noteDate | date | yes |
| followUpDate | date | no |
| client | ref Client | yes |

### Project

Implements Project.

| Field | Kind | Required |
| ----- | ---- | -------- |
| name | text | yes |
| description | text | yes |
| dueDate | date | no |
| client | ref Client | yes |

### Task

Implements Task.

| Field | Kind | Required |
| ----- | ---- | -------- |
| title | text | yes |
| status | enum TaskStatus | yes |
| priority | enum TaskPriority | yes |
| dueDate | date | no |
| project | ref Project | yes |

### Availability

Implements Availability.

| Field | Kind | Required |
| ----- | ---- | -------- |
| days | enum DayOfWeek list | no |
| fromTime | time | no |
| toTime | time | no |

### SessionType

Implements SessionType.

| Field | Kind | Required |
| ----- | ---- | -------- |
| name | text | yes |
| durationInMinutes | int | yes |
| displayedPrice | money | yes |
| maximumPeople | int | yes |

### Slot

Implements Slot.

| Field | Kind | Required |
| ----- | ---- | -------- |
| sessionType | ref SessionType | yes |
| startAt | datetime | yes |

### Booking

Implements Booking.

| Field | Kind | Required |
| ----- | ---- | -------- |
| name | text | yes |
| email | email | yes |
| sessionType | ref SessionType | yes |
| slot | ref Slot | yes |
| client | ref Client | no |
| isCancelled | boolean | no |

## Enums

- ClientStatus: Lead (`lead`), Active (`active`), Past (`past`)
- TaskStatus: To do (`to_do`), In progress (`in_progress`), Done (`done`)
- TaskPriority: Low (`low`), Medium (`medium`), High (`high`)
- DayOfWeek: Monday (`monday`), Tuesday (`tuesday`), Wednesday (`wednesday`), Thursday (`thursday`), Friday (`friday`), Saturday (`saturday`), Sunday (`sunday`)

## Operations

| Operation | Kind | Entity | Summary | Inputs | Serves |
| --------- | ---- | ------ | ------- | ------ | ------ |
| listClients | list | Client | List clients sorted with overdue follow-ups first, with search and status filter. | FD30 Search clients as q, FD31 Client status filter as status | F06.S01, F06.S02 |
| getClient | get | Client | Load one client by id. | FD27 Email as email | F06.S03, F07.S01, F09.S01, F30.S01, F32.S01, F35.S03 |
| createClient | create | Client | Create a client, or a Lead client when a booking email is new. | FD03 Name as name, FD04 Email as email, FD05 Company as company, FD06 Profile as profile, FD07 Status as status, FD26 Name as name, FD27 Email as email | F08.S02, F35.S03 |
| updateClient | update | Client | Update a client's details and status. | FD03 Name as name, FD04 Email as email, FD05 Company as company, FD06 Profile as profile, FD07 Status as status | F09.S02 |
| deleteClient | delete | Client | Delete a client; its notes, projects and tasks are deleted with it. | none | F10.S01 |
| listNotes | list | Note | List notes for follow-ups, client sorting and client pages. | none | F05.S01, F06.S01, F07.S01 |
| getNote | get | Note | Load one note by id for editing. | none | F12.S01 |
| createNote | create | Note | Create a dated note with optional follow-up under a client. | FD08 Note text as noteText, FD09 Note date as noteDate, FD10 Follow-up date as followUpDate | F11.S02 |
| updateNote | update | Note | Update a note's text and dates. | FD08 Note text as noteText, FD09 Note date as noteDate, FD10 Follow-up date as followUpDate | F12.S02 |
| markFollowUpDone | update | Note | Clear a note's follow-up date with one click. | none | F14.S01 |
| pushFollowUpWeek | update | Note | Push a note's follow-up date 7 days later with one click. | none | F15.S01 |
| deleteNote | delete | Note | Delete a note. | none | F10.S01, F13.S01 |
| listProjects | list | Project | List projects with search by project or client name. | FD35 Search projects as q | F07.S01, F16.S01, F16.S02 |
| getProject | get | Project | Load one project by id. | none | F17.S01, F19.S01 |
| createProject | create | Project | Create a project under a client. | FD11 Name as name, FD12 Description as description, FD13 Due date as dueDate, FD14 Client as client | F18.S02 |
| updateProject | update | Project | Update a project or move it to another client. | FD11 Name as name, FD12 Description as description, FD13 Due date as dueDate, FD14 Client as client | F19.S02 |
| deleteProject | delete | Project | Delete a project and its tasks. | none | F10.S01, F20.S01 |
| listTasks | list | Task | List tasks with search by title and filters by status and priority. | FD32 Search tasks as q, FD33 Task status filter as status, FD34 Task priority filter as priority | F05.S01, F16.S01, F17.S01, F17.S02 |
| getTask | get | Task | Load one task by id for editing. | none | F22.S01 |
| createTask | create | Task | Create a task in a project. | FD15 Title as title, FD16 Status as status, FD17 Priority as priority, FD18 Due date as dueDate | F21.S02 |
| updateTask | update | Task | Update a task's title, status, priority and due date. | FD15 Title as title, FD16 Status as status, FD17 Priority as priority, FD18 Due date as dueDate | F22.S02 |
| completeTask | update | Task | Tick an open task Done quickly. | none | F24.S01 |
| deleteTask | delete | Task | Delete a task. | none | F10.S01, F20.S01, F23.S01 |
| getAvailability | get | Availability | Load the designer's weekly availability. | none | F25.S01 |
| updateAvailability | update | Availability | Save the weekly days and hours that can be booked. | FD19 Days as days, FD20 From time as fromTime, FD21 To time as toTime | F25.S01 |
| listSessionTypes | list | SessionType | List all session types. | none | F26.S01, F33.S01 |
| getSessionType | get | SessionType | Load one session type by id. | none | F28.S01, F29.S01, F30.S01, F34.S01, F35.S01 |
| createSessionType | create | SessionType | Create a new kind of bookable session. | FD22 Name as name, FD23 Duration in minutes as durationInMinutes, FD24 Displayed price as displayedPrice, FD25 Maximum people as maximumPeople | F27.S02 |
| updateSessionType | update | SessionType | Update a session type without changing existing bookings. | FD22 Name as name, FD23 Duration in minutes as durationInMinutes, FD24 Displayed price as displayedPrice, FD25 Maximum people as maximumPeople | F28.S02 |
| listSlots | list | Slot | List slots, filtered to open slots for a session type on the booking page. | FD28 Session type as sessionType | F05.S01, F29.S01, F34.S01, F35.S01 |
| getSlot | get | Slot | Load one slot by id with its time and session type. | none | F30.S01, F32.S01, F34.S02, F35.S02 |
| deleteSlot | delete | Slot | Cancel a slot and every booking on it. | none | F31.S01 |
| listBookings | list | Booking | List bookings for sessions, slots and clients. | none | F05.S01, F07.S01, F29.S01, F30.S01 |
| getBooking | get | Booking | Load one booking by id via designer view or private link. | none | F32.S01, F36.S01, F37.S01 |
| createBooking | create | Booking | Create a booking on an open slot and link or create the Lead client. | FD26 Name as name, FD27 Email as email, FD28 Session type as sessionType, FD29 Slot as slot | F35.S03 |
| cancelBooking | update | Booking | Cancel only the guest's own booking and free the seat. | none | F37.S02 |
| deleteBooking | delete | Booking | Delete bookings cancelled with their slot. | none | F31.S01 |

## What each screen loads

- FR01 Public site frame: none
- FR02 App frame: none
- S01 SoloStudio: none
- S02 Create your workspace: none
- S03 Sign in: none
- S04 Home: listSlots, listBookings, listNotes, listTasks, listSessionTypes, listClients, listProjects
- S05 Clients: listClients, listNotes
- S06 The client's name: getClient, listNotes, listProjects, listBookings, listSlots, listSessionTypes, listTasks
- S07 Projects: listProjects, listTasks, listClients
- S08 The project's name: getProject, listTasks, getClient
- S09 Availability: getAvailability
- S10 Session types: listSessionTypes
- S11 Sessions: listSlots, listBookings, getSessionType
- S12 The slot's session type name and time, as in "Discovery call, 5 Nov at 10:00": getSlot, listBookings, getSessionType, getClient
- S13 The booker's name, as in "Ravi Patel's booking": getBooking, getSlot, getClient, getSessionType
- S14 Book a session: listSessionTypes, listSlots, getSessionType, getSlot
- S15 The booking's session type name and time, as in "Discovery call, 5 Nov at 10:00": getBooking, getSlot, getSessionType
- S16 Account settings: none
- D01 Add a client: none
- D02 The client's name, as in "Edit Maya Sharma": getClient
- D03 Add a note: none
- D04 Edit note: getNote
- D05 The client's name, as in "Delete Maya Sharma?": none
- D06 Delete this note?: none
- D07 Add a project: listClients
- D08 The project's name, as in "Edit Acme homepage": getProject, listClients
- D09 The project's name, as in "Delete Acme homepage?": none
- D10 Add a task: none
- D11 The task's title, as in "Edit Draft hero section": getTask
- D12 The task's title, as in "Delete Draft hero section?": none
- D13 Add a session type: none
- D14 The session type's name, as in "Edit Discovery call": getSessionType
- D15 Cancel this session?: none
- D16 Cancel your booking?: none
