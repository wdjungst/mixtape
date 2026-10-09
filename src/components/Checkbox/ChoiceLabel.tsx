import type { ReactNode } from 'react';
import choice from '../../styles/choice.module.css';

/** Label + optional description shown next to a checkbox, radio or switch. */
export function ChoiceLabel({
  htmlFor,
  label,
  description,
  descriptionId,
}: {
  htmlFor: string;
  label?: ReactNode;
  description?: ReactNode;
  descriptionId: string;
}) {
  if (!label && !description) return null;
  return (
    <span className={choice.text}>
      {label && (
        <label htmlFor={htmlFor} className={choice.label}>
          {label}
        </label>
      )}
      {description && (
        <span id={descriptionId} className={choice.description}>
          {description}
        </span>
      )}
    </span>
  );
}
