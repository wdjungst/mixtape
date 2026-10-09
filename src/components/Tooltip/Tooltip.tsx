import { Tooltip as RadixTooltip } from 'radix-ui';
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import { usePortalContainer } from '../../utils/usePortalContainer';
import styles from './Tooltip.module.css';

type ContentProps = ComponentPropsWithoutRef<typeof RadixTooltip.Content>;

export interface TooltipProps {
  content: ReactNode;
  /** A single focusable element (e.g. a Button) that triggers the tooltip. */
  children: ReactElement;
  side?: ContentProps['side'];
  align?: ContentProps['align'];
  /** Milliseconds before showing on hover. Focus shows immediately. */
  delayDuration?: number;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * A short label shown on hover and keyboard focus. Not for essential information:
 * touch users can't see it.
 */
export function Tooltip({
  content,
  children,
  side = 'top',
  align = 'center',
  delayDuration = 300,
  open,
  defaultOpen,
  onOpenChange,
}: TooltipProps) {
  const container = usePortalContainer();
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal container={container}>
          <RadixTooltip.Content
            side={side}
            align={align}
            sideOffset={6}
            collisionPadding={8}
            className={styles.content}
          >
            {content}
            <RadixTooltip.Arrow className={styles.arrow} width={10} height={5} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
