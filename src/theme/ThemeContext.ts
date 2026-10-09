import { createContext, useContext } from 'react';
import { light } from './presets';
import type { Theme } from './types';

export interface ThemeContextValue {
  /** The fully resolved theme in effect for this subtree. */
  theme: Theme;
  /** Whether the dark theme was chosen (from `colorMode` or the system preference). */
  isDark: boolean;
  /** Element overlays portal into, so they inherit this subtree's theme variables. */
  portalContainer: HTMLElement | null;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const fallback: ThemeContextValue = { theme: light, isDark: false, portalContainer: null };

/** Reads the nearest theme. Outside a `ThemeProvider`, returns the default `light` theme. */
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext) ?? fallback;
}
