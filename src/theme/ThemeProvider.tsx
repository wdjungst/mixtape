import { Slot } from 'radix-ui';
import { useContext, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import { resolveTheme } from './createTheme';
import { themeToCssVars } from './cssVars';
import { presets, type PresetName } from './presets';
import { ThemeContext, type ThemeContextValue } from './ThemeContext';
import type { Theme } from './types';
import { usePrefersDark } from './usePrefersDark';

export type ColorMode = 'light' | 'dark' | 'system';

export interface ThemeProviderProps {
  /** A preset name or a theme from `createTheme`. Inherits from the parent provider when omitted. */
  theme?: Theme | PresetName;
  /** Theme to use when the color mode resolves to dark. */
  darkTheme?: Theme | PresetName;
  /**
   * Chooses between `theme` and `darkTheme`. Defaults to `system` when `darkTheme` is given,
   * otherwise `light` (i.e. always `theme`).
   */
  colorMode?: ColorMode;
  /** Render no wrapper `div`; merge theme attributes onto the single child instead. */
  asChild?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/**
 * Applies a theme to its subtree via CSS custom properties. Providers can be nested to scope a
 * different theme (or color mode) to part of the page.
 *
 * Built-in presets are applied with a `data-mt-theme` attribute (their CSS ships in
 * `mixtape-ui/styles.css`), so they cost nothing at runtime and work with SSR. Custom themes are
 * applied as inline variables.
 */
export function ThemeProvider({
  theme,
  darkTheme,
  colorMode,
  asChild,
  className,
  style,
  children,
}: ThemeProviderProps) {
  const parent = useContext(ThemeContext);
  const prefersDark = usePrefersDark();
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  const mode = colorMode ?? (darkTheme ? 'system' : 'light');
  const isDark = mode === 'dark' || (mode === 'system' && prefersDark);
  const chosen = isDark && darkTheme ? darkTheme : (theme ?? parent?.theme ?? 'light');
  const resolved = resolveTheme(chosen);
  const isPreset = presets[resolved.name as PresetName] === resolved;

  const themeStyle = useMemo(
    () => (isPreset ? undefined : (themeToCssVars(resolved) as CSSProperties)),
    [isPreset, resolved],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ theme: resolved, isDark: resolved.colorScheme === 'dark', portalContainer }),
    [resolved, portalContainer],
  );

  const Comp = asChild ? Slot.Root : 'div';
  const rootClass = className ? `mt-root ${className}` : 'mt-root';

  return (
    <ThemeContext.Provider value={value}>
      <Comp
        ref={setPortalContainer}
        data-mt-theme={resolved.name}
        className={rootClass}
        style={themeStyle || style ? { ...themeStyle, ...style } : undefined}
      >
        {children}
      </Comp>
    </ThemeContext.Provider>
  );
}
