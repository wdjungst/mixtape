import type { FontSize, Radius, Shadow, Space } from '../theme/types';

export const spaceVar = (s: Space | undefined) =>
  s === undefined ? undefined : `var(--mt-space-${s})`;
export const radiusVar = (r: Radius | undefined) =>
  r === undefined ? undefined : `var(--mt-radius-${r})`;
export const shadowVar = (s: Shadow | undefined) =>
  s === undefined ? undefined : `var(--mt-shadow-${s})`;
export const fontSizeVar = (s: FontSize | undefined) =>
  s === undefined ? undefined : `var(--mt-font-size-${s})`;

/** Drops undefined entries so inline `style` objects stay clean. */
export function compactStyle<T extends Record<string, unknown>>(style: T): T {
  return Object.fromEntries(Object.entries(style).filter(([, v]) => v !== undefined)) as T;
}
