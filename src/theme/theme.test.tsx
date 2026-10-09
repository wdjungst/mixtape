import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createTheme } from './createTheme';
import { themeToCss, themeToCssVars, vars } from './cssVars';
import { dark, light, neon, presets } from './presets';
import { useTheme } from './ThemeContext';
import { ThemeProvider } from './ThemeProvider';
import { generateTokensCss } from './tokensCss';

describe('createTheme', () => {
  it('deep-merges overrides onto the light theme by default', () => {
    const theme = createTheme({ name: 'brand', colors: { accent: { solid: '#123456' } } });
    expect(theme.name).toBe('brand');
    expect(theme.colors.accent.solid).toBe('#123456');
    expect(theme.colors.accent.solidHover).toBe(light.colors.accent.solidHover);
    expect(theme.colors.bg).toBe(light.colors.bg);
    expect(theme.space).toEqual(light.space);
  });

  it('accepts a preset name as the base and does not mutate it', () => {
    const before = structuredClone(dark);
    const theme = createTheme({ name: 'x', radii: { md: '20px' } }, 'dark');
    expect(theme.colorScheme).toBe('dark');
    expect(theme.radii.md).toBe('20px');
    expect(dark).toEqual(before);
  });
});

describe('themeToCssVars', () => {
  it('flattens tokens into kebab-case --mt- variables', () => {
    const v = themeToCssVars(light);
    expect(v['--mt-color-accent-solid-hover']).toBe(light.colors.accent.solidHover);
    expect(v['--mt-font-size-2xl']).toBe(light.fontSizes['2xl']);
    expect(v['--mt-space-4']).toBe('1rem');
    expect(v['--mt-radius-full']).toBe('9999px');
    expect(v['--mt-z-tooltip']).toBe(light.zIndices.tooltip);
    expect(v['--mt-color-scheme']).toBe('light');
  });

  it('produces the same variable names for every preset', () => {
    const names = Object.keys(themeToCssVars(light)).sort();
    for (const theme of Object.values(presets)) {
      expect(Object.keys(themeToCssVars(theme)).sort()).toEqual(names);
    }
  });

  it('serializes to a CSS rule', () => {
    expect(themeToCss(neon, '.x')).toMatch(/^\.x \{\n {2}--mt-color-scheme: dark;/);
  });
});

describe('vars', () => {
  it('exposes typed var() references', () => {
    expect(vars.colors.accent.solid).toBe('var(--mt-color-accent-solid)');
    expect(vars.space['4']).toBe('var(--mt-space-4)');
    expect(vars.fontSizes['2xl']).toBe('var(--mt-font-size-2xl)');
  });
});

describe('tokens.css', () => {
  it('is in sync with the presets (run `npm run tokens` if this fails)', () => {
    const onDisk = readFileSync(resolve(process.cwd(), 'src/styles/tokens.css'), 'utf8');
    expect(onDisk).toBe(generateTokensCss());
  });
});

function ThemeName() {
  return <span data-testid="name">{useTheme().theme.name}</span>;
}

describe('ThemeProvider', () => {
  it('applies presets via data attribute only', () => {
    const { container } = render(
      <ThemeProvider theme="vinyl">
        <ThemeName />
      </ThemeProvider>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute('data-mt-theme', 'vinyl');
    expect(root).toHaveClass('mt-root');
    expect(root.getAttribute('style')).toBeNull();
    expect(screen.getByTestId('name')).toHaveTextContent('vinyl');
  });

  it('applies custom themes as inline CSS variables', () => {
    const brand = createTheme({ name: 'brand', colors: { accent: { solid: '#ff0000' } } });
    const { container } = render(<ThemeProvider theme={brand} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveAttribute('data-mt-theme', 'brand');
    expect(root.style.getPropertyValue('--mt-color-accent-solid')).toBe('#ff0000');
  });

  it('nests, and inherits the parent theme when none is given', () => {
    render(
      <ThemeProvider theme="neon">
        <ThemeProvider>
          <ThemeName />
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(screen.getByTestId('name')).toHaveTextContent('neon');
  });

  it('picks darkTheme when colorMode is dark', () => {
    render(
      <ThemeProvider theme="vinyl" darkTheme="neon" colorMode="dark">
        <ThemeName />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('name')).toHaveTextContent('neon');
  });

  it('follows the system preference by default when darkTheme is set', () => {
    // setup.ts stubs matchMedia to report light.
    render(
      <ThemeProvider theme="light" darkTheme="dark">
        <ThemeName />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('name')).toHaveTextContent('light');
  });

  it('supports asChild', () => {
    const { container } = render(
      <ThemeProvider theme="dark" asChild>
        <main />
      </ThemeProvider>,
    );
    expect(container.firstElementChild?.tagName).toBe('MAIN');
    expect(container.firstElementChild).toHaveAttribute('data-mt-theme', 'dark');
  });
});
