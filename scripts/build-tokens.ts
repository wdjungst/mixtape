/**
 * Generates src/styles/tokens.css from the preset themes so presets work with zero JS.
 *
 *   npm run tokens          regenerate
 *   npm run tokens:check    fail if the committed file is stale (runs as part of `build`)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { generateTokensCss } from '../src/theme/tokensCss';

const tokensPath = fileURLToPath(new URL('../src/styles/tokens.css', import.meta.url));
const css = generateTokensCss();

if (process.argv.includes('--check')) {
  if (readFileSync(tokensPath, 'utf8') !== css) {
    console.error('src/styles/tokens.css is out of date. Run `npm run tokens`.');
    process.exit(1);
  }
  console.log('tokens.css is up to date.');
} else {
  writeFileSync(tokensPath, css);
  console.log(`Wrote ${tokensPath}`);
}
