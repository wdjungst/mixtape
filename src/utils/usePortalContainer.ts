import { useTheme } from '../theme/ThemeContext';

/**
 * Where overlays should portal to: the nearest ThemeProvider's element, so scoped themes apply
 * to dialogs, popovers and tooltips. Falls back to `document.body` (Radix's default).
 */
export function usePortalContainer(): HTMLElement | undefined {
  return useTheme().portalContainer ?? undefined;
}
