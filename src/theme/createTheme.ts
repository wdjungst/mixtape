import { isPresetName, light, presets, type PresetName } from './presets';
import type { Theme, ThemeOverrides } from './types';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function deepMerge<T>(base: T, overrides: unknown): T {
  if (!isObject(base) || !isObject(overrides)) return (overrides ?? base) as T;
  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined) continue;
    result[key] = isObject(value) && isObject(result[key]) ? deepMerge(result[key], value) : value;
  }
  return result as T;
}

export function resolveTheme(theme: Theme | PresetName): Theme {
  return isPresetName(theme) ? presets[theme] : theme;
}

/**
 * Builds a complete theme by deep-merging overrides onto a base (default: `light`).
 *
 * ```ts
 * const brand = createTheme({
 *   name: 'brand',
 *   colors: { accent: { solid: '#0057ff', solidHover: '#0047d4' } },
 *   radii: { md: '12px' },
 * }, 'dark');
 * ```
 */
export function createTheme(overrides: ThemeOverrides, base: Theme | PresetName = light): Theme {
  return deepMerge(resolveTheme(base), overrides);
}
