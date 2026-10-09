import { Switch as RadixSwitch } from 'radix-ui';
import { forwardRef, useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import choice from '../../styles/choice.module.css';
import { cx } from '../../utils/cx';
import { ChoiceLabel } from '../Checkbox/ChoiceLabel';
import styles from './Switch.module.css';

export interface SwitchProps extends Omit<
  ComponentPropsWithoutRef<typeof RadixSwitch.Root>,
  'children' | 'asChild'
> {
  label?: ReactNode;
  description?: ReactNode;
  size?: 'sm' | 'md';
}

/** An on/off toggle for settings that apply immediately. */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { label, description, size = 'md', id, className, style, disabled, ...rest },
  ref,
) {
  const generated = useId();
  const controlId = id ?? `mt-switch-${generated}`;
  const descriptionId = `${controlId}-description`;
  return (
    <span
      className={cx(choice.wrapper, className)}
      style={style}
      data-disabled={disabled || undefined}
    >
      <RadixSwitch.Root
        ref={ref}
        id={controlId}
        disabled={disabled}
        data-size={size}
        aria-describedby={description ? descriptionId : undefined}
        className={styles.track}
        {...rest}
      >
        <RadixSwitch.Thumb className={styles.thumb} />
      </RadixSwitch.Root>
      <ChoiceLabel
        htmlFor={controlId}
        label={label}
        description={description}
        descriptionId={descriptionId}
      />
    </span>
  );
});
