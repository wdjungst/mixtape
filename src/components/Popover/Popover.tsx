import { Popover as RadixPopover } from 'radix-ui';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cx } from '../../utils/cx';
import { usePortalContainer } from '../../utils/usePortalContainer';
import styles from './Popover.module.css';

export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;
export const PopoverAnchor = RadixPopover.Anchor;
export const PopoverClose = RadixPopover.Close;

export interface PopoverContentProps extends ComponentPropsWithoutRef<typeof RadixPopover.Content> {
  /** Show a pointer arrow toward the trigger. */
  arrow?: boolean;
}

/** Floating, non-modal content anchored to a trigger: menus of options, quick edits, details. */
export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent(
    { arrow = false, sideOffset = 8, collisionPadding = 8, className, children, ...rest },
    ref,
  ) {
    const container = usePortalContainer();
    return (
      <RadixPopover.Portal container={container}>
        <RadixPopover.Content
          ref={ref}
          sideOffset={sideOffset}
          collisionPadding={collisionPadding}
          className={cx(styles.content, className)}
          {...rest}
        >
          {children}
          {arrow && <RadixPopover.Arrow className={styles.arrow} width={12} height={6} />}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    );
  },
);
