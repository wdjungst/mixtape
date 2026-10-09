import { Toast as RadixToast } from 'radix-ui';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { CloseIcon } from '../../icons';
import type { Tone } from '../../theme/types';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import styles from './Toast.module.css';

export interface ToastOptions {
  title: ReactNode;
  description?: ReactNode;
  tone?: Tone;
  /** Milliseconds before auto-dismiss. Defaults to the provider's `duration`. */
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
    /** Describes how to do the action without the toast, for screen readers. Defaults to `label`. */
    altText?: string;
  };
}

interface ToastRecord extends ToastOptions {
  id: number;
  open: boolean;
}

interface ToastApi {
  /** Shows a toast and returns its id. */
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

/** Shows toasts from anywhere under a `ToastProvider`. */
export function useToast(): ToastApi {
  const api = useContext(ToastContext);
  if (!api) throw new Error('useToast must be used within a <ToastProvider>.');
  return api;
}

export interface ToastProviderProps {
  children?: ReactNode;
  /** Default auto-dismiss time in ms. */
  duration?: number;
  /** Screen-reader label for the toast region; `{hotkey}` is replaced with the shortcut. */
  label?: string;
}

const EXIT_ANIMATION_MS = 250;

/**
 * Enables `useToast()`. Place it inside your `ThemeProvider` so toasts pick up the theme.
 */
export function ToastProvider({ children, duration = 5000, label }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => {
    setToasts((all) => all.map((t) => (t.id === id ? { ...t, open: false } : t)));
    setTimeout(() => setToasts((all) => all.filter((t) => t.id !== id)), EXIT_ANIMATION_MS);
  }, []);

  const toast = useCallback((options: ToastOptions) => {
    const id = nextId.current++;
    setToasts((all) => [...all, { ...options, id, open: true }]);
    return id;
  }, []);

  const api = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={api}>
      <RadixToast.Provider duration={duration} label={label}>
        {children}
        {toasts.map(({ id, open, title, description, tone = 'neutral', duration: d, action }) => (
          <RadixToast.Root
            key={id}
            open={open}
            onOpenChange={(isOpen) => !isOpen && dismiss(id)}
            duration={d}
            data-mt-tone={tone}
            className={styles.root}
          >
            <div className={styles.body}>
              <RadixToast.Title className={styles.title}>{title}</RadixToast.Title>
              {description && (
                <RadixToast.Description className={styles.description}>
                  {description}
                </RadixToast.Description>
              )}
            </div>
            {action && (
              <RadixToast.Action altText={action.altText ?? action.label} asChild>
                <Button size="sm" variant="soft" tone={tone} onClick={action.onClick}>
                  {action.label}
                </Button>
              </RadixToast.Action>
            )}
            <RadixToast.Close asChild>
              <IconButton icon={<CloseIcon />} aria-label="Dismiss notification" size="sm" />
            </RadixToast.Close>
          </RadixToast.Root>
        ))}
        <RadixToast.Viewport className={styles.viewport} />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}
