Build every screen below, each from its file in `.weave/04-pages/` into its route folder. You build them all in this session. When two screens share something, build it once, in `web/app/blocks/` or `web/app/components/`, and use it on both. When you are done, a user can do every step of every screen with the seed data. Each screen puts what the user came for first.

Read `.weave/01-scaffold/guidelines.md` first. It says what to read in each folder. Your folders are `.weave/01-scaffold/`, `.weave/02-contract/`, `.weave/03-frames/` and `.weave/04-pages/`. Follow every guideline in them.

Build the screens in the order below. Before you build each one, decide its layout from what it holds, as the guidelines say under Layout and emphasis. Check each screen with its command once it is built. The command checks the desktop width. On a page behind sign-in, it signs in as a member first.

## The screens

- S01 (SoloStudio) at `/`, from `.weave/04-pages/S01.md`, in `web/app/(routes)/(marketing)`. Check it with `pnpm verify / --widths 1280`.
- S04 (Home) at `/home`, from `.weave/04-pages/S04.md`, in `web/app/(routes)/(app)/home`. Check it with `pnpm verify /home --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S05 (Clients) at `/clients`, from `.weave/04-pages/S05.md`, in `web/app/(routes)/(app)/clients`. Check it with `pnpm verify /clients --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S06 (The client's name) at `/clients/[clientId]`, from `.weave/04-pages/S06.md`, in `web/app/(routes)/(app)/clients/[clientId]`. Check it with `pnpm verify /clients/client-1 --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S07 (Projects) at `/projects`, from `.weave/04-pages/S07.md`, in `web/app/(routes)/(app)/projects`. Check it with `pnpm verify /projects --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S08 (The project's name) at `/projects/[projectId]`, from `.weave/04-pages/S08.md`, in `web/app/(routes)/(app)/projects/[projectId]`. Check it with `pnpm verify /projects/project-1 --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S09 (Availability) at `/availability`, from `.weave/04-pages/S09.md`, in `web/app/(routes)/(app)/availability`. Check it with `pnpm verify /availability --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S10 (Session types) at `/session-types`, from `.weave/04-pages/S10.md`, in `web/app/(routes)/(app)/session-types`. Check it with `pnpm verify /session-types --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S11 (Sessions) at `/sessions`, from `.weave/04-pages/S11.md`, in `web/app/(routes)/(app)/sessions`. Check it with `pnpm verify /sessions --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S12 (The slot's session type name and time, as in "Discovery call, 5 Nov at 10:00") at `/sessions/[slotId]`, from `.weave/04-pages/S12.md`, in `web/app/(routes)/(app)/sessions/[slotId]`. Check it with `pnpm verify /sessions/slot-1 --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S13 (The booker's name, as in "Ravi Patel's booking") at `/bookings/[bookingId]`, from `.weave/04-pages/S13.md`, in `web/app/(routes)/(app)/bookings/[bookingId]`. Check it with `pnpm verify /bookings/booking-1 --widths 1280 --storage .weave/02-contract/signed-in.json`.
- S14 (Book a session) at `/book`, from `.weave/04-pages/S14.md`, in `web/app/(routes)/(marketing)/book`. Check it with `pnpm verify /book --widths 1280`.
- S15 (The booking's session type name and time, as in "Discovery call, 5 Nov at 10:00") at `/my-booking/[bookingId]`, from `.weave/04-pages/S15.md`, in `web/app/(routes)/(marketing)/my-booking/[bookingId]`. Check it with `pnpm verify /my-booking/booking-1 --widths 1280`.
- S16 (Account settings) at `/account`, from `.weave/04-pages/S16.md`, in `web/app/(routes)/(app)/account`. Check it with `pnpm verify /account --widths 1280 --storage .weave/02-contract/signed-in.json`.
