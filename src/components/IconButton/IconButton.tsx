import { forwardRef, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button, type ButtonProps } from '../Button';
import buttonStyles from '../Button/Button.module.css';

export interface IconButtonProps extends Omit<
  ButtonProps,
  'startIcon' | 'endIcon' | 'fullWidth' | 'children'
> {
  /** The icon to show. Should be decorative (`aria-hidden`); the name comes from `aria-label`. */
  icon: ReactNode;
  /** Required: icon-only buttons need an accessible name. */
  'aria-label': string;
}

/** A square button containing only an icon. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { icon, variant = 'ghost', tone = 'neutral', className, ...rest },
  ref,
) {
  return (
    <Button
      ref={ref}
      variant={variant}
      tone={tone}
      className={cx(buttonStyles.iconOnly, className)}
      {...rest}
    >
      {icon}
    </Button>
  );
});
