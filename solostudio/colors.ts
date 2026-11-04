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
      bg: '#FBEFEA',
      fg: '#291811',
      fgMuted: '#744D3C',
      border: '#865E4C',
      hoverBg: '#F5E4DD',
      accentBg: '#865E4C',
      accentFg: '#FFF9F6',
      accentBorder: '#865E4C',
      accentHoverBg: '#744D3C',
      focus: '#744D3C',
      accentFocus: '#FFF9F6',
      shadow: '#291811',
    } satisfies ColorSet,
    dark: {
      bg: '#1C1410',
      fg: '#FFE9E0',
      fgMuted: '#C29683',
      border: '#886656',
      hoverBg: '#2A1F19',
      accentBg: '#B28774',
      accentFg: '#130E0C',
      accentBorder: '#B28774',
      accentHoverBg: '#C29683',
      focus: '#C29683',
      accentFocus: '#130E0C',
      shadow: '#130E0C',
    } satisfies ColorSet,
  },
  surface: {
    light: {
      pageBackground: '#FAF6F0',
      logo: '#584995',
      pageBg: '#FFF9F6',
      frameBg: '#F5E4DD',
      pageFg: '#291811',
      pageFgMuted: '#744D3C',
      divider: '#EBD6CC',
      backdrop: '#291811',
      skeleton: '#EBD6CC',
    } satisfies SurfaceColors,
    dark: {
      pageBackground: '#26211D',
      logo: '#A194E7',
      pageBg: '#2A1F19',
      frameBg: '#1C1410',
      pageFg: '#FFE9E0',
      pageFgMuted: '#C29683',
      divider: '#372720',
      backdrop: '#130E0C',
      skeleton: '#443027',
    } satisfies SurfaceColors,
  },
  primary: {
    light: {
      bg: '#F1F0FF',
      fg: '#1D1737',
      fgMuted: '#584995',
      border: '#695BA9',
      hoverBg: '#E7E4FF',
      accentBg: '#695BA9',
      accentFg: '#FAF9FF',
      accentBorder: '#695BA9',
      accentHoverBg: '#584995',
      focus: '#584995',
      accentFocus: '#FAF9FF',
      shadow: '#1D1737',
    } satisfies ColorSet,
    dark: {
      bg: '#161423',
      fg: '#EEECFF',
      fgMuted: '#A194E7',
      border: '#6E63A6',
      hoverBg: '#211E34',
      accentBg: '#9284D6',
      accentFg: '#0F0E17',
      accentBorder: '#9284D6',
      accentHoverBg: '#A194E7',
      focus: '#A194E7',
      accentFocus: '#0F0E17',
      shadow: '#0F0E17',
    } satisfies ColorSet,
  },
  status: {
    light: {
      success: {
        bg: '#E3F8E9',
        fg: '#002410',
        fgMuted: '#006A3A',
        border: '#187C49',
        hoverBg: '#D3F1DC',
        accentBg: '#187C49',
        accentFg: '#F1FEF5',
        accentBorder: '#187C49',
        accentHoverBg: '#006A3A',
        focus: '#006A3A',
        accentFocus: '#F1FEF5',
        shadow: '#002410',
      } satisfies ColorSet,
      warning: {
        bg: '#FBF1DC',
        fg: '#271B00',
        fgMuted: '#715200',
        border: '#866200',
        hoverBg: '#F5E6C9',
        accentBg: '#866200',
        accentFg: '#FFFAEF',
        accentBorder: '#866200',
        accentHoverBg: '#715200',
        focus: '#715200',
        accentFocus: '#FFFAEF',
        shadow: '#271B00',
      } satisfies ColorSet,
      error: {
        bg: '#FFEDEA',
        fg: '#34100B',
        fgMuted: '#8F382E',
        border: '#A34A3F',
        hoverBg: '#FFE0DA',
        accentBg: '#A34A3F',
        accentFg: '#FFF8F7',
        accentBorder: '#A34A3F',
        accentHoverBg: '#8F382E',
        focus: '#8F382E',
        accentFocus: '#FFF8F7',
        shadow: '#34100B',
      } satisfies ColorSet,
      info: {
        bg: '#E6F4FF',
        fg: '#001F33',
        fgMuted: '#005E8C',
        border: '#0070A6',
        hoverBg: '#D2ECFF',
        accentBg: '#0070A6',
        accentFg: '#F6FBFF',
        accentBorder: '#0070A6',
        accentHoverBg: '#005E8C',
        focus: '#005E8C',
        accentFocus: '#F6FBFF',
        shadow: '#001F33',
      } satisfies ColorSet,
    },
    dark: {
      success: {
        bg: '#0A1A10',
        fg: '#D0FBDD',
        fgMuted: '#5DB780',
        border: '#358054',
        hoverBg: '#0F2819',
        accentBg: '#4CA871',
        accentFg: '#09120C',
        accentBorder: '#4CA871',
        accentHoverBg: '#5DB780',
        focus: '#5DB780',
        accentFocus: '#09120C',
        shadow: '#09120C',
      } satisfies ColorSet,
      warning: {
        bg: '#1C1506',
        fg: '#FFECC8',
        fgMuted: '#C59A3E',
        border: '#8B6918',
        hoverBg: '#2B2007',
        accentBg: '#B58B2B',
        accentFg: '#130F07',
        accentBorder: '#B58B2B',
        accentHoverBg: '#C59A3E',
        focus: '#C59A3E',
        accentFocus: '#130F07',
        shadow: '#130F07',
      } satisfies ColorSet,
      error: {
        bg: '#22110E',
        fg: '#FFE9E5',
        fgMuted: '#E28376',
        border: '#A2564B',
        hoverBg: '#331916',
        accentBg: '#D17467',
        accentFg: '#170C0B',
        accentBorder: '#D17467',
        accentHoverBg: '#E28376',
        focus: '#E28376',
        accentFocus: '#170C0B',
        shadow: '#170C0B',
      } satisfies ColorSet,
      info: {
        bg: '#081822',
        fg: '#DFF1FF',
        fgMuted: '#52ABE5',
        border: '#2B76A4',
        hoverBg: '#0C2434',
        accentBg: '#419BD4',
        accentFg: '#081016',
        accentBorder: '#419BD4',
        accentHoverBg: '#52ABE5',
        focus: '#52ABE5',
        accentFocus: '#081016',
        shadow: '#081016',
      } satisfies ColorSet,
    },
  },
  entity: {
    light: {
      client: {
        bg: '#DCF9F8',
        fg: '#002223',
        fgMuted: '#006566',
        border: '#007879',
        hoverBg: '#C9F1F0',
        accentBg: '#007879',
        accentFg: '#EDFEFE',
        accentBorder: '#007879',
        accentHoverBg: '#006566',
        focus: '#006566',
        accentFocus: '#EDFEFE',
        shadow: '#002223',
      } satisfies ColorSet,
      project: {
        bg: '#FFEEE4',
        fg: '#311300',
        fgMuted: '#894100',
        border: '#9D5218',
        hoverBg: '#FFE1CF',
        accentBg: '#9D5218',
        accentFg: '#FFF9F5',
        accentBorder: '#9D5218',
        accentHoverBg: '#894100',
        focus: '#894100',
        accentFocus: '#FFF9F5',
        shadow: '#311300',
      } satisfies ColorSet,
      sessionType: {
        bg: '#FEEBFC',
        fg: '#2B112B',
        fgMuted: '#7B3C79',
        border: '#8D4D8C',
        hoverBg: '#F8DFF6',
        accentBg: '#8D4D8C',
        accentFg: '#FFF7FE',
        accentBorder: '#8D4D8C',
        accentHoverBg: '#7B3C79',
        focus: '#7B3C79',
        accentFocus: '#FFF7FE',
        shadow: '#2B112B',
      } satisfies ColorSet,
    },
    dark: {
      client: {
        bg: '#031A1A',
        fg: '#C0FCFB',
        fgMuted: '#0AB8B9',
        border: '#007F7F',
        hoverBg: '#012828',
        accentBg: '#00A7A7',
        accentFg: '#061212',
        accentBorder: '#00A7A7',
        accentHoverBg: '#0AB8B9',
        focus: '#0AB8B9',
        accentFocus: '#061212',
        shadow: '#061212',
      } satisfies ColorSet,
      project: {
        bg: '#211209',
        fg: '#FFEADD',
        fgMuted: '#DC8B56',
        border: '#9C5C31',
        hoverBg: '#311C0D',
        accentBg: '#CB7C47',
        accentFg: '#160D08',
        accentBorder: '#CB7C47',
        accentHoverBg: '#DC8B56',
        focus: '#DC8B56',
        accentFocus: '#160D08',
        shadow: '#160D08',
      } satisfies ColorSet,
      sessionType: {
        bg: '#1D111D',
        fg: '#FFE5FD',
        fgMuted: '#CA86C7',
        border: '#8E588D',
        hoverBg: '#2C1A2C',
        accentBg: '#BA76B7',
        accentFg: '#140D13',
        accentBorder: '#BA76B7',
        accentHoverBg: '#CA86C7',
        focus: '#CA86C7',
        accentFocus: '#140D13',
        shadow: '#140D13',
      } satisfies ColorSet,
    },
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
