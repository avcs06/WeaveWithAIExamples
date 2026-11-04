# Entities

## Client

`@app/entities/client`

- `name`: text
- `email`: email
- `company`: text, optional
- `profile`: text, optional
- `status`: enum ClientStatus

- `listClients()` or `useListClients()`: List clients sorted with overdue follow-ups first, with search and status filter.
- `getClient(email)` or `useGetClient(email)`: Load one client by id.
- `createClient(input)`: Create a client, or a Lead client when a booking email is new.
- `updateClient(id, changes)`: Update a client's details and status.
- `deleteClient(id)`: Delete a client; its notes, projects and tasks are deleted with it.

## Note

`@app/entities/note`

- `noteText`: text
- `noteDate`: date
- `followUpDate`: date, optional
- `client`: ref Client id

- `listNotes()` or `useListNotes()`: List notes for follow-ups, client sorting and client pages.
- `getNote(id)` or `useGetNote(id)`: Load one note by id for editing.
- `createNote(input)`: Create a dated note with optional follow-up under a client.
- `updateNote(id, changes)`: Update a note's text and dates.
- `markFollowUpDone(id, changes)`: Clear a note's follow-up date with one click.
- `pushFollowUpWeek(id, changes)`: Push a note's follow-up date 7 days later with one click.
- `deleteNote(id)`: Delete a note.

## Project

`@app/entities/project`

- `name`: text
- `description`: text
- `dueDate`: date, optional
- `client`: ref Client id

- `listProjects()` or `useListProjects()`: List projects with search by project or client name.
- `getProject(id)` or `useGetProject(id)`: Load one project by id.
- `createProject(input)`: Create a project under a client.
- `updateProject(id, changes)`: Update a project or move it to another client.
- `deleteProject(id)`: Delete a project and its tasks.

## Task

`@app/entities/task`

- `title`: text
- `status`: enum TaskStatus
- `priority`: enum TaskPriority
- `dueDate`: date, optional
- `project`: ref Project id

- `listTasks()` or `useListTasks()`: List tasks with search by title and filters by status and priority.
- `getTask(id)` or `useGetTask(id)`: Load one task by id for editing.
- `createTask(input)`: Create a task in a project.
- `updateTask(id, changes)`: Update a task's title, status, priority and due date.
- `completeTask(id, changes)`: Tick an open task Done quickly.
- `deleteTask(id)`: Delete a task.

## Availability

`@app/entities/availability`

- `days`: enum DayOfWeek, a list, optional
- `fromTime`: time, optional
- `toTime`: time, optional

- `getAvailability(id)` or `useGetAvailability(id)`: Load the designer's weekly availability.
- `updateAvailability(id, changes)`: Save the weekly days and hours that can be booked.

## SessionType

`@app/entities/sessionType`

- `name`: text
- `durationInMinutes`: int
- `displayedPrice`: money
- `maximumPeople`: int

- `listSessionTypes()` or `useListSessionTypes()`: List all session types.
- `getSessionType(id)` or `useGetSessionType(id)`: Load one session type by id.
- `createSessionType(input)`: Create a new kind of bookable session.
- `updateSessionType(id, changes)`: Update a session type without changing existing bookings.

## Slot

`@app/entities/slot`

- `sessionType`: ref SessionType id
- `startAt`: datetime

- `listSlots()` or `useListSlots()`: List slots, filtered to open slots for a session type on the booking page.
- `getSlot(id)` or `useGetSlot(id)`: Load one slot by id with its time and session type.
- `deleteSlot(id)`: Cancel a slot and every booking on it.

## Booking

`@app/entities/booking`

- `name`: text
- `email`: email
- `sessionType`: ref SessionType id
- `slot`: ref Slot id
- `client`: ref Client id, optional
- `isCancelled`: boolean, optional

- `listBookings()` or `useListBookings()`: List bookings for sessions, slots and clients.
- `getBooking(id)` or `useGetBooking(id)`: Load one booking by id via designer view or private link.
- `createBooking(input)`: Create a booking on an open slot and link or create the Lead client.
- `cancelBooking(id, changes)`: Cancel only the guest's own booking and free the seat.
- `deleteBooking(id)`: Delete bookings cancelled with their slot.

## Enums

`@app/entities/enums`

- `ClientStatus`: `lead` (Lead), `active` (Active), `past` (Past); options in `ClientStatusOptions`
- `TaskStatus`: `to_do` (To do), `in_progress` (In progress), `done` (Done); options in `TaskStatusOptions`
- `TaskPriority`: `low` (Low), `medium` (Medium), `high` (High); options in `TaskPriorityOptions`
- `DayOfWeek`: `monday` (Monday), `tuesday` (Tuesday), `wednesday` (Wednesday), `thursday` (Thursday), `friday` (Friday), `saturday` (Saturday), `sunday` (Sunday); options in `DayOfWeekOptions`

## Sign-in

`@app/entities/auth`: `signUp(email)`, `signIn(email)`, `signOut()`, `useCurrentUser()`.
