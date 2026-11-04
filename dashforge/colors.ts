/**
 * The one shape every color set shares: primary, base, each status and each
 * future entity. Default foregrounds work on the two default backgrounds;
 * `accentForeground` works on the two accent backgrounds. Nothing else is
 * guaranteed — check contrast before pairing colors across roles.
 */
export type ColorSet = {
  /** Regular/subtle container background. */
  bg: string;
  /** Main text and icons on default backgrounds. */
  fg: string;
  /** Supporting text and icons on default backgrounds. */
  fgMuted: string;
  /** Regular control/container boundary. */
  border: string;
  /** Default background on hover; also the selected fill. */
  hoverBg: string;
  /** Filled/emphasized container background. */
  accentBg: string;
  /** Text and icons on accent backgrounds. */
  accentFg: string;
  /** Filled/emphasized control boundary. */
  accentBorder: string;
  /** Accent background on hover; also the selected accent fill. */
  accentHoverBg: string;
  /** Focus ring on regular controls; the ring preset sets its opacity. */
  focus: string;
  /** Focus ring on filled accent controls; the ring preset sets its opacity. */
  accentFocus: string;
  /** Shadow color only; components own offset, blur, spread and opacity. */
  shadow: string;
};

/** Colors outside the color set roles: the page itself and one-off uses. */
export type SurfaceColors = {
  /** The page's background as one CSS value: a color, or gradients of colors. */
  pageBackground: string;
  /** The theme's wordmark color. */
  logo: string;
  /** The page's solid color: shown until the background paints, and the color disabled states fade into. Color sets are for controls and containers. */
  pageBg: string;
  /** Header and footer background, framing the page content. */
  frameBg: string;
  /** Page text and icons, on both the page and the frame. */
  pageFg: string;
  /** Supporting page text and icons, on both the page and the frame. */
  pageFgMuted: string;
  /** Separator lines; not a replacement for interactive boundaries. */
  divider: string;
  /** Overlay base color; components apply their own opacity. */
  backdrop: string;
  /** Placeholder shapes shown while content loads. */
  skeleton: string;
};

export const colors = {
  base: {
    light: {
      bg: '#FFFFFF',
      fg: '#18181B',
      fgMuted: '#5C5C64',
      border: '#C4C4CC',
      hoverBg: '#F4F4F5',
      accentBg: '#18181B',
      accentFg: '#FAFAFA',
      accentBorder: '#18181B',
      accentHoverBg: '#2F2F32',
      focus: '#64748B',
      accentFocus: '#18181B',
      shadow: '#000000',
    } satisfies ColorSet,
    dark: {
      bg: '#19232B',
      fg: '#E1F1FF',
      fgMuted: '#83A6C5',
      border: '#7496B5',
      hoverBg: '#202D38',
      accentBg: '#E1F1FF',
      accentFg: '#0C1013',
      accentBorder: '#ABC8E2',
      accentHoverBg: '#ABC8E2',
      focus: '#7496B5',
      accentFocus: '#0C1013',
      shadow: '#0C1013',
    } satisfies ColorSet,
  },
  surface: {
    light: {
      pageBackground: '#FFFFFF',
      logo: '#18181B',
      pageBg: '#FFFFFF',
      frameBg: '#FAFAFA',
      pageFg: '#18181B',
      pageFgMuted: '#5C5C64',
      divider: '#ECEBE7',
      backdrop: '#1A1A17',
      skeleton: '#E4E4E7',
    } satisfies SurfaceColors,
    dark: {
      pageBackground: 'radial-gradient(ellipse 900px 600px at 15% 10%, oklch(0.32 0.12 195 / 0.20) 0%, transparent 60%), radial-gradient(ellipse 700px 500px at 85% 90%, oklch(0.30 0.10 266 / 0.16) 0%, transparent 60%), repeating-linear-gradient(to right, oklch(0.30 0.03 246 / 0.35) 0 1px, transparent 1px 40px), repeating-linear-gradient(to bottom, oklch(0.30 0.03 246 / 0.35) 0 1px, transparent 1px 40px), oklch(0.20 0.02 246)',
      logo: '#00A7A7',
      pageBg: '#10171D',
      frameBg: '#1D222C',
      pageFg: '#E1F1FF',
      pageFgMuted: '#83A6C5',
      divider: '#42586C',
      backdrop: '#0C1013',
      skeleton: '#56728B',
    } satisfies SurfaceColors,
  },
  primary: {
    light: {
      bg: '#F7EDFE',
      fg: '#402060',
      fgMuted: '#8145B5',
      border: '#BE93E4',
      hoverBg: '#F2E2FC',
      accentBg: '#8E4EC6',
      accentFg: '#FFFFFF',
      accentBorder: '#8C4DC3',
      accentHoverBg: '#8347B9',
      focus: '#8E4EC6',
      accentFocus: '#7542A1',
      shadow: '#000000',
    } satisfies ColorSet,
    dark: {
      bg: '#002828',
      fg: '#B2FFFE',
      fgMuted: '#00B8B9',
      border: '#00A7A7',
      hoverBg: '#003333',
      accentBg: '#00A7A7',
      accentFg: '#021313',
      accentBorder: '#007F7F',
      accentHoverBg: '#00B8B9',
      focus: '#00A7A7',
      accentFocus: '#021313',
      shadow: '#021313',
    } satisfies ColorSet,
  },
  status: {
    light: {
      success: {
        bg: '#E6F6EB',
        fg: '#193B2D',
        fgMuted: '#34634A',
        border: '#447E5F',
        hoverBg: '#D6F1DF',
        accentBg: '#447E5F',
        accentFg: '#FFFFFF',
        accentBorder: '#34634A',
        accentHoverBg: '#3C7055',
        focus: '#447E5F',
        accentFocus: '#2E5441',
        shadow: '#000000',
      } satisfies ColorSet,
      warning: {
        bg: '#FFF2C2',
        fg: '#4F3422',
        fgMuted: '#7C562D',
        border: '#9D6B3B',
        hoverBg: '#FFEE9C',
        accentBg: '#F1C978',
        accentFg: '#4F3422',
        accentBorder: '#9D6B3B',
        accentHoverBg: '#EFC06A',
        focus: '#F1C978',
        accentFocus: '#825A35',
        shadow: '#000000',
      } satisfies ColorSet,
      error: {
        bg: '#FEEBEC',
        fg: '#641723',
        fgMuted: '#953D3B',
        border: '#B74D48',
        hoverBg: '#FFDBDC',
        accentBg: '#C44B46',
        accentFg: '#FFFFFF',
        accentBorder: '#BE4743',
        accentHoverBg: '#B63E39',
        focus: '#C44B46',
        accentFocus: '#9D3E3B',
        shadow: '#000000',
      } satisfies ColorSet,
      info: {
        bg: '#E6F4FE',
        fg: '#113264',
        fgMuted: '#305E90',
        border: '#3D76B3',
        hoverBg: '#D5EFFF',
        accentBg: '#3D76B3',
        accentFg: '#FFFFFF',
        accentBorder: '#305E90',
        accentHoverBg: '#366AA1',
        focus: '#3D76B3',
        accentFocus: '#2B5079',
        shadow: '#000000',
      } satisfies ColorSet,
    },
    dark: {
      success: {
        bg: '#00291B',
        fg: '#C1FFE1',
        fgMuted: '#00BE88',
        border: '#00AC7B',
        hoverBg: '#003523',
        accentBg: '#00AC7B',
        accentFg: '#05130C',
        accentBorder: '#00835C',
        accentHoverBg: '#00BE88',
        focus: '#00AC7B',
        accentFocus: '#05130C',
        shadow: '#05130C',
      } satisfies ColorSet,
      warning: {
        bg: '#2D1F00',
        fg: '#FFECC8',
        fgMuted: '#CC9800',
        border: '#B98A00',
        hoverBg: '#392800',
        accentBg: '#B98A00',
        accentFg: '#150E03',
        accentBorder: '#8D6800',
        accentHoverBg: '#CC9800',
        focus: '#B98A00',
        accentFocus: '#150E03',
        shadow: '#150E03',
      } satisfies ColorSet,
      error: {
        bg: '#391510',
        fg: '#FFE9E5',
        fgMuted: '#F97161',
        border: '#E86152',
        hoverBg: '#4A1914',
        accentBg: '#E86152',
        accentFg: '#190B09',
        accentBorder: '#B3463A',
        accentHoverBg: '#F97161',
        focus: '#E86152',
        accentFocus: '#190B09',
        shadow: '#190B09',
      } satisfies ColorSet,
      info: {
        bg: '#03233C',
        fg: '#E1F1FF',
        fgMuted: '#35A8FF',
        border: '#0098F2',
        hoverBg: '#002D4E',
        accentBg: '#0098F2',
        accentFg: '#06101A',
        accentBorder: '#0073BA',
        accentHoverBg: '#35A8FF',
        focus: '#0098F2',
        accentFocus: '#06101A',
        shadow: '#06101A',
      } satisfies ColorSet,
    },
  },
  entity: {
    light: {},
    dark: {},
  },
};

export const textVars: Record<string, string> = {}; // text-*
export const bgVars: Record<string, string> = {}; // bg-*
export const borderVars: Record<string, string> = {}; // border-*, outline-*
export const lightTheme: Record<string, string> = {};
export const darkTheme: Record<string, string> = {};

const kebab = (value: string) =>
  value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const processColors = (
  set: any,
  prefix: string[] = [],
  varObj: Record<string, unknown> = {},
  theme?: 'light' | 'dark',
) => {
  for (const [key, entry] of Object.entries(set)) {
    if (key === 'status' || key === 'entity') {
      processColors(entry, prefix, varObj, theme);
      continue;
    }

    if (key === 'light' || key === 'dark') {
      processColors(entry, prefix, varObj, key as 'light' | 'dark');
      continue;
    }

    const path = [...prefix, kebab(key)];
    if (entry && typeof entry === 'object') {
      varObj[key] = {};
      processColors(entry, path, varObj[key] as Record<string, unknown>, theme);
      continue;
    }

    const varName = `${path.join('-')}`;
    const cssVar = `var(--weave-color-${varName})`;
    let tailwindKey = varName;
    let tailwindSet: Record<string, string> = {};
    if (/(^|-)bg(-|$)/.test(varName)) {
      tailwindKey = varName.replace(/(^bg-|-bg$|bg-|^bg$)/, '');
      tailwindSet = bgVars;
    } else if (/(^|-)fg(-|$)/.test(varName)) {
      tailwindKey = varName.replace(/(^fg-|-fg$|fg-|^fg$)/, '');
      tailwindSet = textVars;
    } else if (/(^|-)border(-|$)/.test(varName)) {
      tailwindKey = varName.replace(/(^border-|-border$|border-|^border$)/, '');
      tailwindSet = borderVars;
    }

    if (tailwindKey === '') tailwindKey = 'default';
    tailwindSet[tailwindKey] = cssVar;

    const themeObj = theme === 'dark' ? darkTheme : lightTheme;
    themeObj[cssVar] = entry as string;
    varObj[key] = cssVar;
  }

  return varObj;
};

/** Each entity's color set by its name, from whichever modes define it. */
type EntitySets = Record<keyof typeof colors.entity.light | keyof typeof colors.entity.dark, ColorSet>;

export const colorTokens = processColors(colors) as {
  primary: ColorSet;
  base: ColorSet;
  surface: SurfaceColors;
  success: ColorSet;
  warning: ColorSet;
  error: ColorSet;
  info: ColorSet;
} & EntitySets;
