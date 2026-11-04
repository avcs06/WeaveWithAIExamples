import type { PageLayoutConfig } from './PageLayout.types';

// The theme's page layouts: the scaffold writes the run's theme over these.
export const layouts: Record<'app' | 'marketing', PageLayoutConfig> = {
  "app": {
    "docksFirst": "sidebars",
    "header": {
      "needed": true,
      "start": "",
      "center": "",
      "end": "Create button",
      "separation": "divider",
      "overlay": false,
      "sticky": false
    },
    "sidebar": {
      "needed": true,
      "side": "left",
      "top": "logo",
      "items": "navigation",
      "bottom": "account",
      "widthPx": 260,
      "separation": "divider"
    },
    "footer": {
      "needed": false,
      "start": "",
      "center": "",
      "end": "",
      "padding": "4",
      "gap": "4",
      "separation": "none"
    },
    "main": {
      "container": "fluid",
      "maxWidthPx": 0,
      "padding": "6",
      "align": "start",
      "separation": "none"
    },
    "logo": "sidebar",
    "account": "sidebar"
  },
  "marketing": {
    "docksFirst": "header",
    "header": {
      "needed": true,
      "start": "logo",
      "center": "navigation",
      "end": "account",
      "separation": "divider",
      "overlay": false,
      "sticky": true
    },
    "sidebar": {
      "needed": false,
      "side": "left",
      "top": "",
      "items": "",
      "bottom": "",
      "widthPx": 0,
      "separation": "none"
    },
    "footer": {
      "needed": true,
      "content": "Product links, Resources, Legal and small print",
      "padding": "8",
      "gap": "6",
      "separation": "divider"
    },
    "main": {
      "container": "fixed",
      "maxWidthPx": 1200,
      "padding": "9",
      "align": "center",
      "separation": "none"
    },
    "logo": "header",
    "account": "header"
  }
};
