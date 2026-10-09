// Bundles tsc's per-file declarations into one dist/index.d.ts, so consumers using any
// moduleResolution (bundler, node16/nodenext) resolve types without extensionless relative imports.
import { dts } from 'rollup-plugin-dts';

export default {
  input: 'build/types/index.d.ts',
  output: { file: 'dist/index.d.ts', format: 'es' },
  external: [/^react($|\/)/, /^radix-ui($|\/)/],
  plugins: [dts()],
};
