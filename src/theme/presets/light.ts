import type { Theme } from '../types';
import { baseTokens, lightStatus } from './base';

/** The default Mixtape theme: clean light surfaces with a violet accent. */
export const light: Theme = {
  ...baseTokens,
  name: 'light',
  colorScheme: 'light',
  colors: {
    bg: '#ffffff',
    bgSubtle: '#f7f7f8',
    surface: '#ffffff',
    surfaceRaised: '#ffffff',
    overlay: 'rgb(15 15 20 / 0.5)',
    fg: '#18181b',
    fgMuted: '#52525b',
    fgSubtle: '#71717a',
    border: '#e4e4e7',
    borderStrong: '#8b8b94',
    focusRing: '#7c3aed',
    accent: {
      solid: '#6d28d9',
      solidHover: '#5b21b6',
      solidActive: '#4c1d95',
      onSolid: '#ffffff',
      subtle: '#f3f0ff',
      subtleHover: '#e9e3ff',
      text: '#6d28d9',
      border: '#c4b5fd',
    },
    neutral: {
      solid: '#27272a',
      solidHover: '#3f3f46',
      solidActive: '#18181b',
      onSolid: '#ffffff',
      subtle: '#f4f4f5',
      subtleHover: '#e4e4e7',
      text: '#3f3f46',
      border: '#d4d4d8',
    },
    ...lightStatus,
  },
};
