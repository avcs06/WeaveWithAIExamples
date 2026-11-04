'use client';

import { Hero } from '@app/components/Hero';
import { NextLink } from '@app/components/NextLink';
import { Button } from '@packages/ui/Button';
import { Card, CardList } from '@packages/ui/Card';
import { Paragraph } from '@packages/ui/Typography';
import { BellRing, CalendarCheck, FolderKanban, Lock } from 'lucide-react';
import React from 'react';

const reasons = [
  {
    id: 'follow-ups',
    icon: <BellRing aria-hidden />,
    title: 'Follow-ups first',
    line: 'Your client list puts overdue follow-ups first, so you always know who to contact next.',
  },
  {
    id: 'projects',
    icon: <FolderKanban aria-hidden />,
    title: 'Projects with clear next steps',
    line: 'Each project shows its tasks and how many are still open, with overdue tasks standing out.',
  },
  {
    id: 'bookings',
    icon: <CalendarCheck aria-hidden />,
    title: 'Bookings without the back and forth',
    line: 'Visitors pick a session type and an open time, and you see who booked in your sessions.',
  },
  {
    id: 'private',
    icon: <Lock aria-hidden />,
    title: 'Private to you',
    line: 'Your clients, notes, projects and bookings live in one private workspace only you can open.',
  },
];

/**
 * S01 SoloStudio: what the workspace is for, with a read-only preview of the
 * home dashboard and the four reasons to use it.
 */
export default function LandingPage() {
  return (
    <>
      <Hero
        title="Clients, projects and bookings, all in one calm place"
        description="SoloStudio is a single workspace for a solo freelance designer to manage clients, projects and bookings, without scattering them across email, notes and spreadsheets."
        actions={
          <Button as={NextLink} href="/sign-up">
            Create your workspace
          </Button>
        }
        media={
          <Card aria-label="Preview of the home dashboard">
            <div className="flex-col-gap-3">
              <div className="flex-row-gap-2 items-center">
                <CalendarCheck aria-hidden />
                <div>
                  <Paragraph>Discovery call</Paragraph>
                  <Paragraph color="muted">Today</Paragraph>
                </div>
              </div>
              <div className="flex-row-gap-2 items-center">
                <BellRing aria-hidden />
                <div>
                  <Paragraph>Maya Sharma</Paragraph>
                  <Paragraph color="muted">Follow-up due this week</Paragraph>
                </div>
              </div>
              <div className="flex-row-gap-2 items-center">
                <FolderKanban aria-hidden />
                <div>
                  <Paragraph>Draft hero section</Paragraph>
                  <Paragraph color="muted">Overdue</Paragraph>
                </div>
              </div>
            </div>
          </Card>
        }
      />
      <CardList
        aria-label="Why SoloStudio"
        items={reasons}
        layout="grid" // Four fixed reasons browsed side by side, not records read one by one.
        columns={2} // Two columns keep the four reasons in two even rows.
        renderItem={(reason) => (
          <>
            {reason.icon}
            <h3>{reason.title}</h3>
            <p>{reason.line}</p>
          </>
        )}
      />
    </>
  );
}
