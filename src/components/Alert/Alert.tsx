import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { CloseIcon, DangerIcon, InfoIcon, SuccessIcon, WarningIcon } from '../../icons';
import type { Tone } from '../../theme/types';
import { cx } from '../../utils/cx';
import { IconButton } from '../IconButton';
import styles from './Alert.module.css';

const defaultIcons: Record<Tone, ReactNode> = {
  accent: <InfoIcon />,
  neutral: <InfoIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  danger: <DangerIcon />,
};

export interface AlertProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
  tone?: Tone;
  variant?: 'soft' | 'outline';
  title?: ReactNode;
  /** Replace the tone's default icon, or pass `false` to hide it. */
  icon?: ReactNode | false;
  /** Extra content on the trailing edge, e.g. a Button. */
  action?: ReactNode;
  /** Shows a dismiss button. */
  onDismiss?: () => void;
  dismissLabel?: string;
}

/**
 * An inline message. `danger` and `warning` alerts use `role="alert"` (announced immediately);
 * others use `role="status"`. Override with the `role` prop.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    tone = 'accent',
    variant = 'soft',
    title,
    icon,
    action,
    onDismiss,
    dismissLabel = 'Dismiss',
    className,
    children,
    ...rest
  },
  ref,
) {
  const shownIcon = icon === false ? null : (icon ?? defaultIcons[tone]);
  return (
    <div
      ref={ref}
      role={tone === 'danger' || tone === 'warning' ? 'alert' : 'status'}
      data-mt-tone={tone}
      data-variant={variant}
      className={cx(styles.root, className)}
      {...rest}
    >
      {shownIcon && <span className={styles.icon}>{shownIcon}</span>}
      <div className={styles.body}>
        {title && <div className={styles.title}>{title}</div>}
        {children && <div className={styles.message}>{children}</div>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
      {onDismiss && (
        <IconButton
          icon={<CloseIcon />}
          aria-label={dismissLabel}
          size="sm"
          tone={tone}
          onClick={onDismiss}
          className={styles.dismiss}
        />
      )}
    </div>
  );
});
