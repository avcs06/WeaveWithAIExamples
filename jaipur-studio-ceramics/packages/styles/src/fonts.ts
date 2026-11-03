import { DM_Mono, Fira_Sans, Fraunces } from 'next/font/google';

const firaSans = Fira_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ui',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const dMMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const fontClasses = [
  firaSans.className,
  firaSans.variable,
  fraunces.variable,
  dMMono.variable,
].join(' ');
