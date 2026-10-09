import { Tabs as RadixTabs } from 'radix-ui';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cx } from '../../utils/cx';
import styles from './Tabs.module.css';

export interface TabsProps extends ComponentPropsWithoutRef<typeof RadixTabs.Root> {
  /** `line`: underlined tabs. `pill`: segmented control. */
  variant?: 'line' | 'pill';
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { variant = 'line', className, ...rest },
  ref,
) {
  return (
    <RadixTabs.Root
      ref={ref}
      data-variant={variant}
      className={cx(styles.root, className)}
      {...rest}
    />
  );
});

export const TabsList = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof RadixTabs.List>>(
  function TabsList({ className, ...rest }, ref) {
    return <RadixTabs.List ref={ref} className={cx(styles.list, className)} {...rest} />;
  },
);

export const TabsTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>(function TabsTrigger({ className, ...rest }, ref) {
  return <RadixTabs.Trigger ref={ref} className={cx(styles.trigger, className)} {...rest} />;
});

export const TabsContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof RadixTabs.Content>
>(function TabsContent({ className, ...rest }, ref) {
  return <RadixTabs.Content ref={ref} className={cx(styles.content, className)} {...rest} />;
});
