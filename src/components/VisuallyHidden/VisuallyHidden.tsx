import { VisuallyHidden as RadixVisuallyHidden } from 'radix-ui';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';

export type VisuallyHiddenProps = ComponentPropsWithoutRef<typeof RadixVisuallyHidden.Root>;

/** Hides content visually while keeping it available to screen readers. */
export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  function VisuallyHidden(props, ref) {
    return <RadixVisuallyHidden.Root ref={ref} {...props} />;
  },
);
