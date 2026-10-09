import { Dialog as RadixDialog } from 'radix-ui';
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { CloseIcon } from '../../icons';
import { cx } from '../../utils/cx';
import { usePortalContainer } from '../../utils/usePortalContainer';
import { IconButton } from '../IconButton';
import styles from './Dialog.module.css';

/** Root of a modal dialog. Control with `open`/`onOpenChange`, or use `DialogTrigger`. */
export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;

export interface DialogContentProps extends Omit<
  ComponentPropsWithoutRef<typeof RadixDialog.Content>,
  'title'
> {
  /** Convenience: renders a `DialogTitle`. Every dialog needs a title for screen readers. */
  title?: ReactNode;
  /** Convenience: renders a `DialogDescription`. */
  description?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  hideCloseButton?: boolean;
  closeLabel?: string;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  {
    title,
    description,
    size = 'md',
    hideCloseButton,
    closeLabel = 'Close',
    className,
    children,
    ...rest
  },
  ref,
) {
  const container = usePortalContainer();
  return (
    <RadixDialog.Portal container={container}>
      <RadixDialog.Overlay className={styles.overlay} />
      <RadixDialog.Content
        ref={ref}
        data-size={size}
        className={cx(styles.content, className)}
        // Without a description, tell Radix not to expect one rather than warn.
        {...(description ? {} : { 'aria-describedby': undefined })}
        {...rest}
      >
        {title && <DialogTitle>{title}</DialogTitle>}
        {description && <DialogDescription>{description}</DialogDescription>}
        {children}
        {!hideCloseButton && (
          <RadixDialog.Close asChild>
            <IconButton
              icon={<CloseIcon />}
              aria-label={closeLabel}
              size="sm"
              className={styles.close}
            />
          </RadixDialog.Close>
        )}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
});

export const DialogTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(function DialogTitle({ className, ...rest }, ref) {
  return <RadixDialog.Title ref={ref} className={cx(styles.title, className)} {...rest} />;
});

export const DialogDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(function DialogDescription({ className, ...rest }, ref) {
  return (
    <RadixDialog.Description ref={ref} className={cx(styles.description, className)} {...rest} />
  );
});

/** Right-aligned row for dialog actions. */
export const DialogFooter = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  function DialogFooter({ className, ...rest }, ref) {
    return <div ref={ref} className={cx(styles.footer, className)} {...rest} />;
  },
);
