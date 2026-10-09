import type { Theme } from '../types';
import { baseTokens, darkStatus } from './base';

/** Dark counterpart of `light`: deep charcoal with a lavender accent. */
export const dark: Theme = {
  ...baseTokens,
  name: 'dark',
  colorScheme: 'dark',
  shadows: {
    sm: '0 1px 2px rgb(0 0 0 / 0.4)',
    md: '0 4px 12px -2px rgb(0 0 0 / 0.5)',
    lg: '0 16px 40px -8px rgb(0 0 0 / 0.7)',
  },
  colors: {
    bg: '#0f0f13',
    bgSubtle: '#16161c',
    surface: '#1b1b22',
    surfaceRaised: '#23232c',
    overlay: 'rgb(0 0 0 / 0.65)',
    fg: '#f4f4f5',
    fgMuted: '#a1a1aa',
    fgSubtle: '#8b8b94',
    border: '#2e2e38',
    borderStrong: '#6b6b78',
    focusRing: '#a78bfa',
    accent: {
      solid: '#a78bfa',
      solidHover: '#b9a2fb',
      solidActive: '#c4b5fd',
      onSolid: '#1e1033',
      subtle: '#221a35',
      subtleHover: '#2d2347',
      text: '#c4b5fd',
      border: '#4c3a80',
    },
    neutral: {
      solid: '#e4e4e7',
      solidHover: '#d4d4d8',
      solidActive: '#a1a1aa',
      onSolid: '#18181b',
      subtle: '#23232c',
      subtleHover: '#2e2e38',
      text: '#e4e4e7',
      border: '#3f3f46',
    },
    ...darkStatus,
  },
};
