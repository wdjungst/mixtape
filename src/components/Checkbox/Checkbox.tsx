import { Checkbox as RadixCheckbox } from 'radix-ui';
import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { CheckIcon, MinusIcon } from '../../icons';
import choice from '../../styles/choice.module.css';
import { cx } from '../../utils/cx';
import styles from './Checkbox.module.css';
import { ChoiceLabel } from './ChoiceLabel';

export interface CheckboxProps extends Omit<
  ComponentPropsWithoutRef<typeof RadixCheckbox.Root>,
  'children' | 'asChild'
> {
  label?: ReactNode;
  description?: ReactNode;
  size?: 'sm' | 'md';
}

/**
 * A checkbox with an optional label. Supports `checked="indeterminate"`.
 * `className`/`style` apply to the outer wrapper; `ref` and other props go to the control.
 * Without a `label`, pass `aria-label`.
 */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
  { label, description, size = 'md', id, className, style, disabled, ...rest },
  ref,
) {
  const generated = useId();
  const controlId = id ?? `mt-checkbox-${generated}`;
  const descriptionId = `${controlId}-description`;
  return (
    <span
      className={cx(choice.wrapper, className)}
      style={style}
      data-disabled={disabled || undefined}
    >
      <RadixCheckbox.Root
        ref={ref}
        id={controlId}
        disabled={disabled}
        data-size={size}
        aria-describedby={description ? descriptionId : undefined}
        className={styles.box}
        {...rest}
      >
        <RadixCheckbox.Indicator className={styles.indicator}>
          <CheckIcon className={styles.check} />
          <MinusIcon className={styles.minus} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <ChoiceLabel
        htmlFor={controlId}
        label={label}
        description={description}
        descriptionId={descriptionId}
      />
    </span>
  );
});
