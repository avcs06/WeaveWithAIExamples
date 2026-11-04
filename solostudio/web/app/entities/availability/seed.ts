import type { Availability } from './types';

export const availabilitySeed: Availability[] = [
  {
    "id": "availability-1",
    "createdAt": "2026-10-26T23:36:45.424Z",
    "updatedAt": "2026-10-27T00:36:45.424Z",
    "days": [
      "monday",
      "tuesday"
    ],
    "fromTime": "10:00",
    "toTime": "17:00"
  },
  {
    "id": "availability-2",
    "createdAt": "2026-10-28T23:36:45.424Z",
    "updatedAt": "2026-10-29T01:36:45.424Z",
    "days": [
      "wednesday",
      "thursday"
    ],
    "fromTime": "10:00",
    "toTime": "15:00"
  },
  {
    "id": "availability-3",
    "createdAt": "2026-10-30T23:36:45.424Z",
    "updatedAt": "2026-10-31T02:36:45.424Z",
    "days": [
      "friday"
    ],
    "fromTime": "09:00",
    "toTime": "13:00"
  },
  {
    "id": "availability-4",
    "createdAt": "2026-11-01T23:36:45.424Z",
    "updatedAt": "2026-11-02T03:36:45.424Z",
    "days": [
      "saturday"
    ],
    "fromTime": "11:00",
    "toTime": "13:00"
  }
];
