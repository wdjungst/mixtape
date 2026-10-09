/** A coordinated set of colors for one intent (accent, danger, …). Every tone has the same shape. */
export interface ToneColors {
  /** Filled backgrounds: solid buttons, badges, checked controls. */
  solid: string;
  solidHover: string;
  solidActive: string;
  /** Text/icons placed on top of `solid`. */
  onSolid: string;
  /** Tinted backgrounds: soft buttons, alerts, selected rows. */
  subtle: string;
  subtleHover: string;
  /** Tone-colored text on the page background. */
  text: string;
  border: string;
}

export type Tone = 'accent' | 'neutral' | 'danger' | 'success' | 'warning';

export interface ThemeColors extends Record<Tone, ToneColors> {
  bg: string;
  bgSubtle: string;
  surface: string;
  surfaceRaised: string;
  /** Backdrop behind modals. */
  overlay: string;
  fg: string;
  fgMuted: string;
  fgSubtle: string;
  border: string;
  /** Borders on form controls; must hit 3:1 contrast against `bg`. */
  borderStrong: string;
  focusRing: string;
}

export type FontSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
export type Space = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type Shadow = 'sm' | 'md' | 'lg';

export interface Theme {
  /** Identifies the theme; rendered as `data-mt-theme` on the provider element. */
  name: string;
  colorScheme: 'light' | 'dark';
  colors: ThemeColors;
  fonts: { body: string; heading: string; mono: string };
  fontSizes: Record<FontSize, string>;
  fontWeights: { regular: string; medium: string; semibold: string; bold: string };
  lineHeights: { tight: string; normal: string; relaxed: string };
  space: Record<Space, string>;
  radii: Record<Radius, string>;
  shadows: Record<Shadow, string>;
  motion: { durationFast: string; durationNormal: string; durationSlow: string; easing: string };
  zIndices: {
    dropdown: string;
    overlay: string;
    modal: string;
    popover: string;
    toast: string;
    tooltip: string;
  };
}

export type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };

export type ThemeOverrides = DeepPartial<Omit<Theme, 'name'>> & { name: string };
