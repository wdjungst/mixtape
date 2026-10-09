import type { Theme } from '../types';
import { baseTokens, darkStatus } from './base';

/** Late-night club energy: ultraviolet backgrounds, hot-pink accent, cyan focus, glowing shadows. */
export const neon: Theme = {
  ...baseTokens,
  name: 'neon',
  colorScheme: 'dark',
  radii: { none: '0', sm: '6px', md: '10px', lg: '16px', xl: '24px', full: '9999px' },
  shadows: {
    sm: '0 0 0 1px rgb(255 46 151 / 0.12), 0 2px 6px rgb(0 0 0 / 0.5)',
    md: '0 0 0 1px rgb(255 46 151 / 0.15), 0 6px 20px rgb(255 46 151 / 0.18)',
    lg: '0 0 0 1px rgb(255 46 151 / 0.2), 0 16px 48px rgb(255 46 151 / 0.28)',
  },
  colors: {
    bg: '#0a0612',
    bgSubtle: '#110a1f',
    surface: '#160d28',
    surfaceRaised: '#1e1236',
    overlay: 'rgb(5 2 12 / 0.75)',
    fg: '#f5f0ff',
    fgMuted: '#b8a9d9',
    fgSubtle: '#9a89c4',
    border: '#2c1c4d',
    borderStrong: '#7a62b5',
    focusRing: '#22d3ee',
    accent: {
      solid: '#ff2e97',
      solidHover: '#ff5cae',
      solidActive: '#ff85c2',
      onSolid: '#14001f',
      subtle: '#2a0b25',
      subtleHover: '#3a0f33',
      text: '#ff7ac0',
      border: '#7a1a55',
    },
    neutral: {
      solid: '#e9e2ff',
      solidHover: '#d6caff',
      solidActive: '#c2b2ff',
      onSolid: '#0a0612',
      subtle: '#1e1236',
      subtleHover: '#2a1a4a',
      text: '#e9e2ff',
      border: '#3c2a66',
    },
    ...darkStatus,
  },
};
