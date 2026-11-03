import type { PageLayoutConfig } from './PageLayout.types';

// The theme's page layouts: the scaffold writes the run's theme over these.
export const layouts: Record<'app' | 'marketing', PageLayoutConfig> = {
  "app": {
    "docksFirst": "sidebars",
    "header": {
      "needed": false,
      "start": "",
      "center": "",
      "end": "",
      "padding": "0",
      "gap": "0",
      "separation": "none",
      "overlay": false,
      "sticky": false
    },
    "sidebar": {
      "needed": true,
      "side": "left",
      "top": "logo",
      "items": "navigation",
      "bottom": "account",
      "widthPx": 248,
      "separation": "divider"
    },
    "footer": {
      "needed": false,
      "start": "",
      "center": "",
      "end": "",
      "padding": "0",
      "gap": "0",
      "separation": "none"
    },
    "main": {
      "container": "fixed",
      "maxWidthPx": 1000,
      "padding": "9",
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
      "end": "cart, account",
      "padding": "4",
      "gap": "4",
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
      "content": "Studio pickup information, then the Order lookup link",
      "padding": "6",
      "gap": "4",
      "separation": "divider"
    },
    "main": {
      "container": "fixed",
      "maxWidthPx": 1240,
      "padding": "10",
      "align": "center",
      "separation": "none"
    },
    "logo": "header",
    "account": "header"
  }
};
