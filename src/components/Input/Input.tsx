import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import controls from '../../styles/controls.module.css';
import { cx } from '../../utils/cx';
import { useFieldControl } from '../Field';
import styles from './Input.module.css';

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  /** Marks the input invalid. Set automatically inside a `Field` with an `error`. */
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'md', className, ...props },
  ref,
) {
  const controlProps = useFieldControl(props);
  return (
    <input
      ref={ref}
      data-size={size}
      className={cx(controls.control, styles.root, className)}
      {...controlProps}
    />
  );
});
