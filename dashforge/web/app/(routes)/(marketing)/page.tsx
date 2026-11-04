'use client';

import { Hero } from '@app/components/Hero';
import { NextLink } from '@app/components/NextLink';
import { Button } from '@packages/ui/Button';
import { Card } from '@packages/ui/Card';
import { Checkbox } from '@packages/ui/Checkbox';
import { Link } from '@packages/ui/Link';
import { Numeral } from '@packages/ui/Numeral';
import { Section } from '@packages/ui/Section';
import { Caption, Paragraph } from '@packages/ui/Typography';
import { FileText, Grid3X3, Lock, Zap } from 'lucide-react';
import React from 'react';


import * as styles from './page.css';

const reasons = [
  {
    icon: <FileText className="icon-size-body" aria-hidden />,
    title: 'Capture everything',
    description: 'Add notes, counters, checklists and links in one ordered grid.',
  },
  {
    icon: <Zap className="icon-size-body" aria-hidden />,
    title: 'Stay in flow',
    description: 'Every change saves automatically with a clear Saving and Saved status.',
  },
  {
    icon: <Grid3X3 className="icon-size-body" aria-hidden />,
    title: 'Make it yours',
    description: 'Rename, resize and reorder widgets to fit how you think.',
  },
  {
    icon: <Lock className="icon-size-body" aria-hidden />,
    title: 'Always private',
    description: 'Your dashboards stay yours alone and survive every refresh.',
  },
];

function DashboardPreview() {
  return (
    <div data-ds="" className={styles.preview}>
      {/* Row 1: note + counter */}
      <div data-ds="" className={styles.previewCard}>
        <Caption>Launch plan</Caption>
        <Paragraph>Outline for Q1 launch with goals and timeline.</Paragraph>
      </div>
      <div data-ds="" className={styles.previewCounter}>
        <Caption>Tasks completed</Caption>
        <Numeral>12</Numeral>
      </div>
      {/* Row 2: checklist + links */}
      <div data-ds="" className={styles.previewCard}>
        <Caption>To do</Caption>
          <div data-ds="" className="flex-col-gap-2">
            <div data-ds="" className="flex-row-gap-2 items-center">
              <Checkbox checked onCheckedChange={() => undefined} aria-label="Review the draft checked" />
              <span className={styles.previewStrike}>Review the draft</span>
            </div>
            <div data-ds="" className="flex-row-gap-2 items-center">
              <Checkbox value="ship" aria-label="Ship beta unchecked" />
              <span>Ship beta</span>
            </div>
          </div>
      </div>
      <div data-ds="" className={styles.previewCard}>
        <Caption>Links</Caption>
        <div data-ds="" className="flex-col-gap-2">
          <Link href="https://figma.com" target="_blank" rel="noreferrer">
            Figma
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero
        title="Your personal console, finally in one place"
        description="Your notes, numbers, tasks and links — together in a glowing dashboard that saves itself."
        actions={
          <Button as={NextLink} href="/sign-up">
            Create your first dashboard
          </Button>
        }
        media={<DashboardPreview />}
      />
      <Section title="Why DashForge">
        <div data-ds="" className={styles.reasonsGrid}>
          {reasons.map((reason) => (
            <div key={reason.title} data-ds="" className="flex-col-gap-3">
              <div data-ds="" className="flex-row-gap-2 items-center">
                <span data-ds="">{reason.icon}</span>
                <h3 className={styles.reasonTitle}>{reason.title}</h3>
              </div>
              <Paragraph color="muted">{reason.description}</Paragraph>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
