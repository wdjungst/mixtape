import { dark } from './dark';
import { light } from './light';
import { neon } from './neon';
import { studio } from './studio';
import { vinyl } from './vinyl';

export { dark, light, neon, studio, vinyl };

export const presets = { light, dark, vinyl, neon, studio } as const;

export type PresetName = keyof typeof presets;

export function isPresetName(value: unknown): value is PresetName {
  return typeof value === 'string' && Object.hasOwn(presets, value);
}
