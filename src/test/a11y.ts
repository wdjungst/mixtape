import axe from 'axe-core';
import { expect } from 'vitest';

/** Runs axe against a rendered container. Color contrast can't be computed in jsdom, so it's off. */
export async function expectNoA11yViolations(container: Element) {
  const results = await axe.run(container, {
    rules: { 'color-contrast': { enabled: false }, region: { enabled: false } },
  });
  const summary = results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`);
  expect(summary).toEqual([]);
}
