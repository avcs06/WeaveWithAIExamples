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
      "padding": "4",
      "gap": "4",
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
      "widthPx": 264,
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
      "maxWidthPx": 1400,
      "padding": "8",
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
      "end": "Cart, account",
      "padding": "6",
      "gap": "6",
      "separation": "none",
      "overlay": true,
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
      "content": "Studio pickup information and shop links",
      "padding": "8",
      "gap": "6",
      "separation": "divider"
    },
    "main": {
      "container": "fixed",
      "maxWidthPx": 1200,
      "padding": "10",
      "align": "center",
      "separation": "none"
    },
    "logo": "header",
    "account": "header"
  }
};
