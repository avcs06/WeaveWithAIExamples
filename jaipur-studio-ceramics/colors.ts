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
      bg: '#FFF9F5',
      fg: '#28190F',
      fgMuted: '#734F38',
      border: '#9F7E6A',
      hoverBg: '#FAEFE9',
      accentBg: '#573B2A',
      accentFg: '#FFF9F5',
      accentBorder: '#573B2A',
      accentHoverBg: '#28190F',
      focus: '#734F38',
      accentFocus: '#FFF9F5',
      shadow: '#28190F',
    } satisfies ColorSet,
    dark: {
      bg: '#18181B',
      fg: '#FAFAFA',
      fgMuted: '#ABABB2',
      border: '#52525B',
      hoverBg: '#27272A',
      accentBg: '#FAFAFA',
      accentFg: '#18181B',
      accentBorder: '#FAFAFA',
      accentHoverBg: '#D9D9DE',
      focus: '#FAFAFA',
      accentFocus: '#FAFAFA',
      shadow: '#000000',
    } satisfies ColorSet,
  },
  surface: {
    light: {
      pageBackground: 'oklch(0.985 0.009 53)',
      logo: '#894100',
      pageBg: '#FFF9F5',
      frameBg: '#FAEFE9',
      pageFg: '#28190F',
      pageFgMuted: '#734F38',
      divider: '#EAD6CB',
      backdrop: '#28190F',
      skeleton: '#EAD6CB',
    } satisfies SurfaceColors,
    dark: {
      pageBackground: '#18181B',
      logo: '#FAFAFA',
      pageBg: '#18181B',
      frameBg: '#1F1F23',
      pageFg: '#FAFAFA',
      pageFgMuted: '#ABABB2',
      divider: '#2A2926',
      backdrop: '#000000',
      skeleton: '#3F3F46',
    } satisfies SurfaceColors,
  },
  primary: {
    light: {
      bg: '#FFF9F5',
      fg: '#311300',
      fgMuted: '#894100',
      border: '#B67449',
      hoverBg: '#FFEEE4',
      accentBg: '#9D5218',
      accentFg: '#FFF9F5',
      accentBorder: '#9D5218',
      accentHoverBg: '#894100',
      focus: '#894100',
      accentFocus: '#FFF9F5',
      shadow: '#311300',
    } satisfies ColorSet,
    dark: {
      bg: '#301C3B',
      fg: '#ECD9FA',
      fgMuted: '#D19DFF',
      border: '#8457AA',
      hoverBg: '#3D224E',
      accentBg: '#8E4EC6',
      accentFg: '#FFFFFF',
      accentBorder: '#9051C8',
      accentHoverBg: '#8347B9',
      focus: '#8E4EC6',
      accentFocus: '#A573D2',
      shadow: '#000000',
    } satisfies ColorSet,
  },
  status: {
    light: {
      success: {
        bg: '#F2FEF4',
        fg: '#02240C',
        fgMuted: '#0F6A31',
        border: '#569765',
        hoverBg: '#E4F8E7',
        accentBg: '#287C42',
        accentFg: '#F2FEF4',
        accentBorder: '#287C42',
        accentHoverBg: '#0F6A31',
        focus: '#0F6A31',
        accentFocus: '#F2FEF4',
        shadow: '#02240C',
      } satisfies ColorSet,
      warning: {
        bg: '#FFFAEF',
        fg: '#271B00',
        fgMuted: '#715200',
        border: '#A38035',
        hoverBg: '#FBF1DC',
        accentBg: '#866200',
        accentFg: '#FFFAEF',
        accentBorder: '#866200',
        accentHoverBg: '#715200',
        focus: '#715200',
        accentFocus: '#FFFAEF',
        shadow: '#271B00',
      } satisfies ColorSet,
      error: {
        bg: '#FFF8F7',
        fg: '#34100B',
        fgMuted: '#8F382E',
        border: '#BC6D62',
        hoverBg: '#FFEDEA',
        accentBg: '#A34A3F',
        accentFg: '#FFF8F7',
        accentBorder: '#A34A3F',
        accentHoverBg: '#8F382E',
        focus: '#8F382E',
        accentFocus: '#FFF8F7',
        shadow: '#34100B',
      } satisfies ColorSet,
      info: {
        bg: '#F6FBFF',
        fg: '#001F37',
        fgMuted: '#005C95',
        border: '#4E8CC0',
        hoverBg: '#E7F4FF',
        accentBg: '#1D6EA9',
        accentFg: '#F6FBFF',
        accentBorder: '#1D6EA9',
        accentHoverBg: '#005C95',
        focus: '#005C95',
        accentFocus: '#F6FBFF',
        shadow: '#001F37',
      } satisfies ColorSet,
    },
    dark: {
      success: {
        bg: '#132D21',
        fg: '#B1F1CB',
        fgMuted: '#73CE9A',
        border: '#73CE9A',
        hoverBg: '#113B29',
        accentBg: '#589E76',
        accentFg: '#0E1512',
        accentBorder: '#73CE9A',
        accentHoverBg: '#5EA97F',
        focus: '#589E76',
        accentFocus: '#8ED7AD',
        shadow: '#000000',
      } satisfies ColorSet,
      warning: {
        bg: '#302008',
        fg: '#FFE7B3',
        fgMuted: '#F1CE6F',
        border: '#F1CE6F',
        hoverBg: '#3F2700',
        accentBg: '#F1C978',
        accentFg: '#16120C',
        accentBorder: '#F1CE6F',
        accentHoverBg: '#F3D872',
        focus: '#F1C978',
        accentFocus: '#F3D78B',
        shadow: '#000000',
      } satisfies ColorSet,
      error: {
        bg: '#3B1219',
        fg: '#FFD1D9',
        fgMuted: '#ECA19E',
        border: '#ECA19E',
        hoverBg: '#500F1C',
        accentBg: '#D76360',
        accentFg: '#FFFFFF',
        accentBorder: '#DB6C69',
        accentHoverBg: '#DE7370',
        focus: '#D76360',
        accentFocus: '#E18886',
        shadow: '#000000',
      } satisfies ColorSet,
      info: {
        bg: '#0D2847',
        fg: '#C2E6FF',
        fgMuted: '#87B7E9',
        border: '#87B7E9',
        hoverBg: '#003362',
        accentBg: '#4B92DE',
        accentFg: '#0D1520',
        accentBorder: '#87B7E9',
        accentHoverBg: '#619FE2',
        focus: '#4B92DE',
        accentFocus: '#9EC4EC',
        shadow: '#000000',
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
