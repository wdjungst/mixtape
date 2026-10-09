import type { Theme } from '../types';
import { baseTokens, lightStatus } from './base';

/** Crisp, neutral, pro-audio-console feel: cool grays, teal accent, small radii. */
export const studio: Theme = {
  ...baseTokens,
  name: 'studio',
  colorScheme: 'light',
  radii: { none: '0', sm: '2px', md: '3px', lg: '6px', xl: '8px', full: '9999px' },
  colors: {
    bg: '#fcfcfd',
    bgSubtle: '#f1f3f5',
    surface: '#ffffff',
    surfaceRaised: '#ffffff',
    overlay: 'rgb(16 24 32 / 0.5)',
    fg: '#111827',
    fgMuted: '#4b5563',
    fgSubtle: '#6b7280',
    border: '#e5e7eb',
    borderStrong: '#8a919c',
    focusRing: '#0d9488',
    accent: {
      solid: '#0f766e',
      solidHover: '#115e59',
      solidActive: '#134e4a',
      onSolid: '#ffffff',
      subtle: '#effcf9',
      subtleHover: '#ccfbf1',
      text: '#0f766e',
      border: '#5eead4',
    },
    neutral: {
      solid: '#1f2937',
      solidHover: '#374151',
      solidActive: '#111827',
      onSolid: '#ffffff',
      subtle: '#f3f4f6',
      subtleHover: '#e5e7eb',
      text: '#374151',
      border: '#d1d5db',
    },
    ...lightStatus,
  },
};
