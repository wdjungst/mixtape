import type { Theme, ToneColors } from '../types';

/** Non-color tokens shared by every preset unless a preset overrides them. */
export const baseTokens = {
  fonts: {
    body: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    heading:
      "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  fontWeights: { regular: '400', medium: '500', semibold: '600', bold: '700' },
  lineHeights: { tight: '1.2', normal: '1.5', relaxed: '1.7' },
  space: {
    '0': '0',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
  },
  radii: { none: '0', sm: '4px', md: '6px', lg: '10px', xl: '16px', full: '9999px' },
  shadows: {
    sm: '0 1px 2px rgb(0 0 0 / 0.06), 0 1px 3px rgb(0 0 0 / 0.1)',
    md: '0 4px 8px -2px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.06)',
    lg: '0 16px 32px -8px rgb(0 0 0 / 0.18), 0 4px 8px -4px rgb(0 0 0 / 0.08)',
  },
  motion: {
    durationFast: '120ms',
    durationNormal: '200ms',
    durationSlow: '320ms',
    easing: 'cubic-bezier(0.2, 0, 0, 1)',
  },
  zIndices: {
    dropdown: '1000',
    overlay: '1100',
    modal: '1110',
    popover: '1200',
    toast: '1300',
    tooltip: '1400',
  },
} satisfies Omit<Theme, 'name' | 'colorScheme' | 'colors'>;

/** Status tones that read well on light backgrounds. */
export const lightStatus: Record<'danger' | 'success' | 'warning', ToneColors> = {
  danger: {
    solid: '#dc2626',
    solidHover: '#b91c1c',
    solidActive: '#991b1b',
    onSolid: '#ffffff',
    subtle: '#fef2f2',
    subtleHover: '#fee2e2',
    text: '#b91c1c',
    border: '#fca5a5',
  },
  success: {
    solid: '#15803d',
    solidHover: '#166534',
    solidActive: '#14532d',
    onSolid: '#ffffff',
    subtle: '#f0fdf4',
    subtleHover: '#dcfce7',
    text: '#15803d',
    border: '#86efac',
  },
  warning: {
    solid: '#f59e0b',
    solidHover: '#d97706',
    solidActive: '#b45309',
    onSolid: '#1c1917',
    subtle: '#fffbeb',
    subtleHover: '#fef3c7',
    text: '#b45309',
    border: '#fcd34d',
  },
};

/** Status tones that read well on dark backgrounds. */
export const darkStatus: Record<'danger' | 'success' | 'warning', ToneColors> = {
  danger: {
    solid: '#dc2626',
    solidHover: '#b91c1c',
    solidActive: '#991b1b',
    onSolid: '#ffffff',
    subtle: '#2a1414',
    subtleHover: '#3a1a1a',
    text: '#fca5a5',
    border: '#7f1d1d',
  },
  success: {
    solid: '#15803d',
    solidHover: '#166534',
    solidActive: '#14532d',
    onSolid: '#ffffff',
    subtle: '#0f2417',
    subtleHover: '#14321f',
    text: '#86efac',
    border: '#166534',
  },
  warning: {
    solid: '#fbbf24',
    solidHover: '#f59e0b',
    solidActive: '#d97706',
    onSolid: '#1c1917',
    subtle: '#2a2010',
    subtleHover: '#3a2c12',
    text: '#fcd34d',
    border: '#78590f',
  },
};
