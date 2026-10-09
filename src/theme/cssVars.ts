import { light } from './presets/light';
import type { Theme } from './types';

/** Maps each theme group to its CSS custom property segment: `colors.accent.solid` → `--mt-color-accent-solid`. */
const GROUP_PREFIX = {
  colors: 'color',
  fonts: 'font',
  fontSizes: 'font-size',
  fontWeights: 'font-weight',
  lineHeights: 'line-height',
  space: 'space',
  radii: 'radius',
  shadows: 'shadow',
  motion: 'motion',
  zIndices: 'z',
} as const satisfies Record<Exclude<keyof Theme, 'name' | 'colorScheme'>, string>;

type TokenGroup = keyof typeof GROUP_PREFIX;

const kebab = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

function walk(
  node: unknown,
  path: string,
  visit: (name: string, value: string, keys: string[]) => void,
  keys: string[] = [],
) {
  if (typeof node === 'string') {
    visit(path, node, keys);
    return;
  }
  for (const [key, child] of Object.entries(node as Record<string, unknown>)) {
    walk(child, `${path}-${kebab(key)}`, visit, [...keys, key]);
  }
}

/** Flattens a theme into a `{ '--mt-…': value }` map suitable for a React `style` prop. */
export function themeToCssVars(theme: Theme): Record<`--mt-${string}`, string> {
  const vars: Record<`--mt-${string}`, string> = { '--mt-color-scheme': theme.colorScheme };
  for (const group of Object.keys(GROUP_PREFIX) as TokenGroup[]) {
    walk(theme[group], `--mt-${GROUP_PREFIX[group]}`, (name, value) => {
      vars[name as `--mt-${string}`] = value;
    });
  }
  return vars;
}

/** Serializes a theme to a CSS rule, e.g. for SSR, static stylesheets, or the generated `tokens.css`. */
export function themeToCss(theme: Theme, selector = ':root'): string {
  const body = Object.entries(themeToCssVars(theme))
    .map(([name, value]) => `  ${name}: ${value};`)
    .join('\n');
  return `${selector} {\n${body}\n}\n`;
}

type VarTree<T> = { readonly [K in keyof T]: T[K] extends string ? string : VarTree<T[K]> };

export type ThemeVars = VarTree<Omit<Theme, 'name' | 'colorScheme'>>;

function buildVars(theme: Theme): ThemeVars {
  const out: Record<string, unknown> = {};
  for (const group of Object.keys(GROUP_PREFIX) as TokenGroup[]) {
    walk(theme[group], `--mt-${GROUP_PREFIX[group]}`, (name, _value, keys) => {
      let target = (out[group] ??= {}) as Record<string, unknown>;
      keys.slice(0, -1).forEach((k) => (target = (target[k] ??= {}) as Record<string, unknown>));
      target[keys[keys.length - 1]!] = `var(${name})`;
    });
  }
  return out as ThemeVars;
}

// Every theme shares one shape, so any preset can supply the structure.
/**
 * Typed references to theme tokens for use in inline styles or CSS-in-JS:
 * `style={{ color: vars.colors.accent.text, padding: vars.space[4] }}`.
 */
export const vars: ThemeVars = buildVars(light);
