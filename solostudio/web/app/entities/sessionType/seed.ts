import type { SessionType } from './types';

export const sessionTypeSeed: SessionType[] = [
  {
    "id": "sessionType-1",
    "createdAt": "2026-10-26T23:36:45.424Z",
    "updatedAt": "2026-10-27T00:36:45.424Z",
    "name": "Discovery call",
    "durationInMinutes": 30,
    "displayedPrice": 0,
    "maximumPeople": 1
  },
  {
    "id": "sessionType-2",
    "createdAt": "2026-10-28T23:36:45.424Z",
    "updatedAt": "2026-10-29T01:36:45.424Z",
    "name": "Design review",
    "durationInMinutes": 60,
    "displayedPrice": 75,
    "maximumPeople": 1
  },
  {
    "id": "sessionType-3",
    "createdAt": "2026-10-30T23:36:45.424Z",
    "updatedAt": "2026-10-31T02:36:45.424Z",
    "name": "Figma workshop",
    "durationInMinutes": 90,
    "displayedPrice": 150,
    "maximumPeople": 4
  },
  {
    "id": "sessionType-4",
    "createdAt": "2026-11-01T23:36:45.424Z",
    "updatedAt": "2026-11-02T03:36:45.424Z",
    "name": "Portfolio audit",
    "durationInMinutes": 45,
    "displayedPrice": 50,
    "maximumPeople": 2
  }
];
