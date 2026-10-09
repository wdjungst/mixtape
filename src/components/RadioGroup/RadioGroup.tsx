import { RadioGroup as RadixRadioGroup } from 'radix-ui';
import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import choice from '../../styles/choice.module.css';
import { cx } from '../../utils/cx';
import { ChoiceLabel } from '../Checkbox/ChoiceLabel';
import styles from './RadioGroup.module.css';

export interface RadioGroupProps extends ComponentPropsWithoutRef<typeof RadixRadioGroup.Root> {
  /** Visible group label. Without it, pass `aria-label` or `aria-labelledby`. */
  label?: ReactNode;
}

/** A set of mutually exclusive options. Arrow keys move between options. */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { label, orientation = 'vertical', className, children, ...rest },
  ref,
) {
  const labelId = `mt-radiogroup-${useId()}`;
  return (
    <div className={cx(styles.group, className)}>
      {label && (
        <span id={labelId} className={styles.groupLabel}>
          {label}
        </span>
      )}
      <RadixRadioGroup.Root
        ref={ref}
        orientation={orientation}
        aria-labelledby={label ? labelId : undefined}
        className={styles.items}
        {...rest}
      >
        {children}
      </RadixRadioGroup.Root>
    </div>
  );
});

export interface RadioProps extends Omit<
  ComponentPropsWithoutRef<typeof RadixRadioGroup.Item>,
  'children' | 'asChild'
> {
  label?: ReactNode;
  description?: ReactNode;
}

export const Radio = forwardRef<HTMLButtonElement, RadioProps>(function Radio(
  { label, description, id, className, style, disabled, ...rest },
  ref,
) {
  const generated = useId();
  const controlId = id ?? `mt-radio-${generated}`;
  const descriptionId = `${controlId}-description`;
  return (
    <span
      className={cx(choice.wrapper, className)}
      style={style}
      data-disabled={disabled || undefined}
    >
      <RadixRadioGroup.Item
        ref={ref}
        id={controlId}
        disabled={disabled}
        aria-describedby={description ? descriptionId : undefined}
        className={styles.radio}
        {...rest}
      >
        <RadixRadioGroup.Indicator className={styles.dot} />
      </RadixRadioGroup.Item>
      <ChoiceLabel
        htmlFor={controlId}
        label={label}
        description={description}
        descriptionId={descriptionId}
      />
    </span>
  );
});
