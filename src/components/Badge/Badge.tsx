import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import type { Tone } from '../../theme/types';
import { cx } from '../../utils/cx';
import styles from './Badge.module.css';

export interface BadgeProps extends ComponentPropsWithoutRef<'span'> {
  variant?: 'solid' | 'soft' | 'outline';
  tone?: Tone;
  size?: 'sm' | 'md';
}

/** A compact label for status, counts, or categories. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'soft', tone = 'accent', size = 'md', className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      data-variant={variant}
      data-mt-tone={tone}
      data-size={size}
      className={cx(styles.root, className)}
      {...rest}
    />
  );
});
