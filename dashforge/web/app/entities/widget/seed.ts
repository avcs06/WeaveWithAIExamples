import type { Widget } from './types';

export const widgetSeed: Widget[] = [
  {
    "id": "widget-1",
    "createdAt": "2026-10-23T00:54:23.228Z",
    "updatedAt": "2026-10-23T01:54:23.228Z",
    "title": "Daily Notes",
    "type": "note",
    "size": "medium",
    "noteText": "Remember to review PRs at 10am",
    "counterValue": 0,
    "position": 1,
    "dashboard": "dashboard-1",
    "checklistItemText": [],
    "checklistChecked": [],
    "linkTitle": [],
    "linkUrl": []
  },
  {
    "id": "widget-2",
    "createdAt": "2026-10-25T00:54:23.228Z",
    "updatedAt": "2026-10-25T02:54:23.228Z",
    "title": "Coffees",
    "type": "counter",
    "size": "small",
    "counterLabel": "Coffees",
    "counterValue": 4,
    "position": 2,
    "dashboard": "dashboard-1",
    "checklistItemText": [],
    "checklistChecked": [],
    "linkTitle": [],
    "linkUrl": []
  },
  {
    "id": "widget-3",
    "createdAt": "2026-10-27T00:54:23.228Z",
    "updatedAt": "2026-10-27T03:54:23.228Z",
    "title": "Weekly Groceries",
    "type": "checklist",
    "size": "large",
    "counterValue": 0,
    "position": 1,
    "dashboard": "dashboard-2",
    "checklistItemText": [
      "Buy milk",
      "Buy eggs",
      "Whole grain bread",
      "Almond milk"
    ],
    "checklistChecked": [
      true,
      false,
      false,
      true
    ],
    "linkTitle": [],
    "linkUrl": []
  },
  {
    "id": "widget-4",
    "createdAt": "2026-10-29T00:54:23.228Z",
    "updatedAt": "2026-10-29T04:54:23.228Z",
    "title": "Design Resources",
    "type": "link_list",
    "size": "medium",
    "counterValue": 0,
    "position": 1,
    "dashboard": "dashboard-3",
    "checklistItemText": [],
    "checklistChecked": [],
    "linkTitle": [
      "Figma",
      "Linear",
      "Notion"
    ],
    "linkUrl": [
      "https://figma.com",
      "https://linear.app",
      "https://notion.so"
    ]
  },
  {
    "id": "widget-5",
    "createdAt": "2026-10-31T00:54:23.228Z",
    "updatedAt": "2026-10-31T05:54:23.228Z",
    "title": "Push-ups",
    "type": "counter",
    "size": "large",
    "counterLabel": "Push-ups",
    "counterValue": 42,
    "position": 1,
    "dashboard": "dashboard-4",
    "checklistItemText": [],
    "checklistChecked": [],
    "linkTitle": [],
    "linkUrl": []
  },
  {
    "id": "widget-6",
    "createdAt": "2026-11-02T00:54:23.228Z",
    "updatedAt": "2026-11-02T06:54:23.228Z",
    "title": "Reading List",
    "type": "link_list",
    "size": "small",
    "counterValue": 0,
    "position": 1,
    "dashboard": "dashboard-5",
    "checklistItemText": [],
    "checklistChecked": [],
    "linkTitle": [
      "Goodreads",
      "Medium Daily Reads"
    ],
    "linkUrl": [
      "https://goodreads.com",
      "https://medium.com"
    ]
  }
];
