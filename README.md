# Mixtape 📼

A themable, accessible React design system. It's tokens-first, built on
[Radix Primitives](https://www.radix-ui.com/primitives), and styled with plain CSS custom properties.
It has no runtime CSS-in-JS and works with SSR.

```bash
npm install mixtape-ui
```

```tsx
import 'mixtape-ui/styles.css';
import { ThemeProvider, ToastProvider, Button } from 'mixtape-ui';

export function App() {
  return (
    <ThemeProvider theme="light" darkTheme="dark">
      <ToastProvider>
        <Button>Drop the beat</Button>
      </ToastProvider>
    </ThemeProvider>
  );
}
```

Requires React 18 or 19.

## Theming

Mixtape ships five presets: `light`, `dark`, `vinyl`, `neon` and `studio`. You can also build your own:

```tsx
import { createTheme, ThemeProvider } from 'mixtape-ui';

const brand = createTheme(
  {
    name: 'brand',
    colors: { accent: { solid: '#0057ff', solidHover: '#0047d4' } },
    radii: { md: '12px' },
  },
  'light', // base theme to merge onto
);

<ThemeProvider theme={brand}>…</ThemeProvider>;
```

- Providers **nest**. Overlays (Dialog, Popover, Tooltip, Select) portal into the nearest provider, so scoped themes apply to them too.
- Presets are pure CSS, so `<html data-mt-theme="neon">` works without React.
- Every token is a CSS variable (`var(--mt-color-accent-solid)`). The same tokens are available in TypeScript as `vars.colors.accent.solid`.
- `themeToCss(theme, selector)` generates a stylesheet for SSR or static use.

See the **Theming** page in Storybook for the full guide.

## Components

| Area     | Components                                                                                                             |
| -------- | ---------------------------------------------------------------------------------------------------------------------- |
| Layout   | `Box`, `Stack` / `HStack` / `VStack`, `Grid`, `Container`, `Card`, `Text`, `Heading`, `VisuallyHidden`                 |
| Forms    | `Button`, `IconButton`, `Field` / `Label`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup` / `Radio`, `Switch` |
| Overlays | `Dialog`, `Popover`, `Tooltip`, `Tabs`                                                                                 |
| Feedback | `Alert`, `Toast` (`ToastProvider` + `useToast`), `Badge`, `Spinner`                                                    |

## Development

This repo uses [pnpm](https://pnpm.io). The version is pinned by the `packageManager` field in `package.json`.

```bash
pnpm install
pnpm storybook         # component workshop at http://localhost:6006
pnpm test              # Vitest + Testing Library + axe
pnpm typecheck
pnpm lint
pnpm build             # dist/: ESM + CJS + bundled index.d.ts + mixtape.css
```

### Project layout

```
src/
  theme/        Theme types, presets, createTheme, ThemeProvider, CSS-variable helpers
  styles/       tokens.css (generated), base.css (tone mapping, keyframes), shared control styles
  components/   One folder per component: Component.tsx, .module.css, .stories.tsx, .test.tsx
  docs/         Storybook MDX pages (Introduction, Theming, Tokens)
  index.ts      Public API (lib.ts adds the CSS for the package build)
scripts/        build-tokens.ts regenerates src/styles/tokens.css from the presets
```

### Conventions

- Components use **semantic tokens only** (`--mt-color-*`, `--mt-space-*`, …), never raw values.
- Variants and state are exposed as data attributes (`data-variant`, `data-size`, `data-mt-tone`).
  Tone colors come from `[data-mt-tone]` in `base.css` as `--mt-tone-*` variables, so one stylesheet works for every tone.
- Class names are stable: `.mt-<Component>-<class>`.
- After changing a preset, run `pnpm tokens`. The build and tests fail if `tokens.css` is stale.
- Every component ships with stories and tests. Use the Storybook **Accessibility** panel to run axe.

### Releasing

Releases use [Changesets](https://github.com/changesets/changesets). Run `pnpm changeset` in your PR.
On `main`, the Release workflow opens a version PR, and merging it publishes to npm. This needs an `NPM_TOKEN` secret.
