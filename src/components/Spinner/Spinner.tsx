import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cx } from '../../utils/cx';
import { VisuallyHidden } from '../VisuallyHidden';
import styles from './Spinner.module.css';

export interface SpinnerProps extends ComponentPropsWithoutRef<'span'> {
  size?: 'sm' | 'md' | 'lg';
  /** Announced to screen readers. Ignored when `decorative`. */
  label?: string;
  /** Hide from assistive tech, e.g. when a parent already conveys the busy state. */
  decorative?: boolean;
}

/** An indeterminate loading indicator. Inherits `color` from its parent. */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 'md', label = 'Loading', decorative, className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      role={decorative ? undefined : 'status'}
      aria-hidden={decorative || undefined}
      data-size={size}
      className={cx(styles.root, className)}
      {...rest}
    >
      <span className={styles.ring} />
      {!decorative && <VisuallyHidden>{label}</VisuallyHidden>}
    </span>
  );
});
