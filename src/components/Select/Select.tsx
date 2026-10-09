import { Select as RadixSelect } from 'radix-ui';
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '../../icons';
import controls from '../../styles/controls.module.css';
import { cx } from '../../utils/cx';
import { usePortalContainer } from '../../utils/usePortalContainer';
import { useFieldControl } from '../Field';
import styles from './Select.module.css';

type RootProps = ComponentPropsWithoutRef<typeof RadixSelect.Root>;

export interface SelectProps extends Omit<RootProps, 'children'> {
  placeholder?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  id?: string;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  /** `SelectItem`s, optionally grouped with `SelectGroup` / `SelectLabel` / `SelectSeparator`. */
  children: ReactNode;
}

/**
 * A styled, accessible replacement for `<select>`. Works inside `Field`, and in forms via `name`.
 *
 * ```tsx
 * <Select placeholder="Pick a genre" onValueChange={setGenre}>
 *   <SelectItem value="house">House</SelectItem>
 *   <SelectItem value="techno">Techno</SelectItem>
 * </Select>
 * ```
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    placeholder,
    size = 'md',
    className,
    children,
    id,
    invalid,
    required,
    disabled,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    ...rootProps
  },
  ref,
) {
  const container = usePortalContainer();
  const control = useFieldControl({
    id,
    invalid,
    required,
    disabled,
    'aria-describedby': ariaDescribedBy,
  });

  return (
    <RadixSelect.Root {...rootProps} required={control.required} disabled={control.disabled}>
      <RadixSelect.Trigger
        ref={ref}
        id={control.id}
        aria-label={ariaLabel}
        aria-describedby={control['aria-describedby']}
        aria-invalid={control['aria-invalid']}
        data-size={size}
        className={cx(controls.control, styles.trigger, className)}
      >
        <span className={styles.value}>
          <RadixSelect.Value placeholder={placeholder} />
        </span>
        <RadixSelect.Icon className={styles.chevron}>
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal container={container}>
        <RadixSelect.Content position="popper" sideOffset={4} className={styles.content}>
          <RadixSelect.ScrollUpButton className={styles.scrollButton}>
            <ChevronUpIcon />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className={styles.viewport}>{children}</RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className={styles.scrollButton}>
            <ChevronDownIcon />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
});

export type SelectItemProps = ComponentPropsWithoutRef<typeof RadixSelect.Item>;

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { className, children, ...rest },
  ref,
) {
  return (
    <RadixSelect.Item ref={ref} className={cx(styles.item, className)} {...rest}>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className={styles.itemIndicator}>
        <CheckIcon />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
});

export const SelectGroup = RadixSelect.Group;

export const SelectLabel = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RadixSelect.Label>
>(function SelectLabel({ className, ...rest }, ref) {
  return <RadixSelect.Label ref={ref} className={cx(styles.groupLabel, className)} {...rest} />;
});

export const SelectSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RadixSelect.Separator>
>(function SelectSeparator({ className, ...rest }, ref) {
  return <RadixSelect.Separator ref={ref} className={cx(styles.separator, className)} {...rest} />;
});
