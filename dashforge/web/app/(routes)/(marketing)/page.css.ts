import { tokens } from '@packages/styles/tokens.css';
import { style } from '@vanilla-extract/css';

export const preview = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: tokens.spacing[3],
  padding: tokens.spacing[4],
  borderRadius: tokens.radius.surface,
  border: `1px solid ${tokens.color.surface.divider}`,
  background: tokens.color.surface.pageBg,
});

export const previewCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing[2],
  padding: tokens.spacing[4],
  borderRadius: tokens.radius.surface,
  border: `1px solid ${tokens.color.surface.divider}`,
  background: tokens.color.base.bg,
});

export const previewCounter = style({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing[2],
  padding: tokens.spacing[4],
  borderRadius: tokens.radius.surface,
  border: `1px solid ${tokens.color.surface.divider}`,
  background: tokens.color.base.bg,
  alignItems: 'center',
  justifyContent: 'center',
});

export const previewStrike = style({
  textDecoration: 'line-through',
  opacity: 0.6,
});

export const reasonsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: tokens.spacing[6],
});

export const reasonTitle = style({
  fontWeight: tokens.fontWeight.heading,
});
