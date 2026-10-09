import { Label as RadixLabel } from 'radix-ui';
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import styles from './Field.module.css';

interface FieldContextValue {
  id: string;
  descriptionId?: string;
  errorId?: string;
  invalid: boolean;
  required: boolean;
  disabled: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

export interface LabelProps extends ComponentPropsWithoutRef<typeof RadixLabel.Root> {
  /** Shows a required indicator (decorative; set `required` on the control itself). */
  required?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { required, className, children, ...rest },
  ref,
) {
  return (
    <RadixLabel.Root ref={ref} className={cx(styles.label, className)} {...rest}>
      {children}
      {required && (
        <span className={styles.required} aria-hidden="true">
          *
        </span>
      )}
    </RadixLabel.Root>
  );
});

export interface FieldProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  label: ReactNode;
  /** Help text shown under the control and linked via `aria-describedby`. */
  description?: ReactNode;
  /** Error message. When present, the control is marked `aria-invalid`. */
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  /** id for the control; generated when omitted. */
  controlId?: string;
  /** A single Mixtape control (Input, Textarea, Select), which picks up ids and state automatically. */
  children: ReactNode;
}

/**
 * Wires a label, description and error message to a form control, with correct ids and ARIA.
 *
 * ```tsx
 * <Field label="Email" error={errors.email}><Input type="email" /></Field>
 * ```
 */
export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  {
    label,
    description,
    error,
    required = false,
    disabled = false,
    controlId,
    className,
    children,
    ...rest
  },
  ref,
) {
  const generated = useId();
  const id = controlId ?? `mt-field-${generated}`;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <FieldContext.Provider
      value={{ id, descriptionId, errorId, invalid: !!error, required, disabled }}
    >
      <div
        ref={ref}
        className={cx(styles.root, className)}
        data-disabled={disabled || undefined}
        {...rest}
      >
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
        {children}
        {description && (
          <p id={descriptionId} className={styles.description}>
            {description}
          </p>
        )}
        {error && (
          <p id={errorId} className={styles.error}>
            {error}
          </p>
        )}
      </div>
    </FieldContext.Provider>
  );
});

interface ControlProps {
  id?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling';
  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
}

/** Merges a control's own props with the surrounding `Field`'s ids and state. */
export function useFieldControl<P extends ControlProps>(props: P) {
  const field = useContext(FieldContext);
  const { invalid, ...rest } = props;
  const isInvalid = !!(
    invalid ||
    field?.invalid ||
    props['aria-invalid'] === true ||
    props['aria-invalid'] === 'true'
  );
  const describedBy =
    [field?.descriptionId, field?.errorId, props['aria-describedby']].filter(Boolean).join(' ') ||
    undefined;

  return {
    ...rest,
    id: props.id ?? field?.id,
    'aria-describedby': describedBy,
    'aria-invalid': isInvalid || undefined,
    required: props.required ?? (field?.required || undefined),
    disabled: props.disabled ?? (field?.disabled || undefined),
  };
}
