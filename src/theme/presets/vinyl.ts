import type { Theme } from '../types';
import { baseTokens, lightStatus } from './base';

/** Warm, retro record-sleeve vibes: cream paper, burnt orange, serif headings, tighter corners. */
export const vinyl: Theme = {
  ...baseTokens,
  name: 'vinyl',
  colorScheme: 'light',
  fonts: {
    ...baseTokens.fonts,
    heading: "'Iowan Old Style', 'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif",
  },
  radii: { none: '0', sm: '2px', md: '4px', lg: '6px', xl: '10px', full: '9999px' },
  shadows: {
    sm: '0 1px 2px rgb(60 35 15 / 0.08), 0 1px 3px rgb(60 35 15 / 0.12)',
    md: '0 4px 10px -2px rgb(60 35 15 / 0.14)',
    lg: '0 18px 36px -10px rgb(60 35 15 / 0.28)',
  },
  colors: {
    bg: '#fbf6ee',
    bgSubtle: '#f4ecdf',
    surface: '#fffdf8',
    surfaceRaised: '#fffdf8',
    overlay: 'rgb(43 29 18 / 0.5)',
    fg: '#2b1d12',
    fgMuted: '#5e4a3a',
    fgSubtle: '#7a6553',
    border: '#e6d9c5',
    borderStrong: '#9a846c',
    focusRing: '#c2410c',
    accent: {
      solid: '#c2410c',
      solidHover: '#9a3412',
      solidActive: '#7c2d12',
      onSolid: '#ffffff',
      subtle: '#fdeee3',
      subtleHover: '#fbdcc6',
      text: '#9a3412',
      border: '#f0b58f',
    },
    neutral: {
      solid: '#3b2a1e',
      solidHover: '#4e3a2b',
      solidActive: '#2b1d12',
      onSolid: '#fffdf8',
      subtle: '#efe4d3',
      subtleHover: '#e6d6bf',
      text: '#4e3a2b',
      border: '#d9c7ac',
    },
    ...lightStatus,
  },
};
