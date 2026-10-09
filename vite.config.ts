/// <reference types="vitest/config" />
import { basename } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/** Stable, readable class names: `.mt-Button-root`. Lets consumers target parts if they must. */
function scopedName(local: string, filename: string) {
  const component = basename(filename).split('.')[0];
  return `mt-${component}-${local}`;
}

const external = /^(react|react-dom|radix-ui|@radix-ui)(\/|$)/;

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  css: {
    modules: { generateScopedName: scopedName },
  },
  // `vite build --mode lib` produces the npm package; Storybook reuses the rest of this config.
  build:
    mode === 'lib'
      ? {
          lib: {
            entry: 'src/lib.ts',
            formats: ['es', 'cjs'],
            fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
            cssFileName: 'mixtape',
          },
          rollupOptions: {
            external: (id) => external.test(id),
            // Components use hooks/context; mark the bundle as client code for React Server Components.
            output: { banner: "'use client';" },
          },
          // Leave minification to the consuming app's bundler; readable output is easier to debug.
          minify: false,
          sourcemap: true,
          emptyOutDir: true,
        }
      : undefined,
  test: {
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'scripts/**/*.test.ts'],
    css: { modules: { classNameStrategy: 'non-scoped' } },
  },
}));
