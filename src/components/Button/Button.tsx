import { Slot } from 'radix-ui';
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import type { Tone } from '../../theme/types';
import { cx } from '../../utils/cx';
import { Spinner } from '../Spinner';
import styles from './Button.module.css';

export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  tone?: Tone;
  size?: ButtonSize;
  /** Shows a spinner, sets `aria-busy`, and disables the button while keeping its width. */
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  /** Render the single child (e.g. a router `<Link>`) with button styles instead of a `<button>`. */
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'solid',
    tone = 'accent',
    size = 'md',
    loading = false,
    startIcon,
    endIcon,
    fullWidth,
    asChild,
    disabled,
    type,
    className,
    children,
    ...rest
  },
  ref,
) {
  const Comp = asChild ? Slot.Root : 'button';
  const content = asChild ? (
    children
  ) : (
    <>
      {loading && <Spinner decorative size="sm" className={styles.spinner} />}
      {startIcon && <span className={styles.icon}>{startIcon}</span>}
      {children}
      {endIcon && <span className={styles.icon}>{endIcon}</span>}
    </>
  );

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : (type ?? 'button')}
      disabled={asChild ? undefined : disabled || loading}
      aria-busy={loading || undefined}
      data-variant={variant}
      data-mt-tone={tone}
      data-size={size}
      data-loading={loading || undefined}
      className={cx(styles.root, fullWidth && styles.fullWidth, className)}
      {...rest}
    >
      {asChild ? content : <span className={styles.content}>{content}</span>}
    </Comp>
  );
});
