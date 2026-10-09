import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import controls from '../../styles/controls.module.css';
import { cx } from '../../utils/cx';
import { useFieldControl } from '../Field';
import styles from './Textarea.module.css';

export interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
  size?: 'sm' | 'md' | 'lg';
  invalid?: boolean;
  resize?: 'none' | 'vertical' | 'both';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { size = 'md', resize = 'vertical', rows = 3, className, style, ...props },
  ref,
) {
  const controlProps = useFieldControl(props);
  return (
    <textarea
      ref={ref}
      rows={rows}
      data-size={size}
      className={cx(controls.control, styles.root, className)}
      style={{ resize, ...style }}
      {...controlProps}
    />
  );
});
