import { forwardRef, type CSSProperties, type ElementType } from 'react';
import type { FontSize, Theme } from '../../theme/types';
import { cx } from '../../utils/cx';
import {
  resolveAs,
  type PolymorphicComponent,
  type PolymorphicProps,
} from '../../utils/polymorphic';
import { compactStyle, fontSizeVar } from '../../utils/tokens';
import styles from './Text.module.css';

export type TextTone = 'default' | 'muted' | 'subtle' | 'accent' | 'danger' | 'success' | 'warning';

export interface TextOwnProps {
  size?: FontSize;
  weight?: keyof Theme['fontWeights'];
  tone?: TextTone;
  align?: CSSProperties['textAlign'];
  /** Clip to a single line with an ellipsis. */
  truncate?: boolean;
  /** Use the monospace font. */
  mono?: boolean;
}

export type TextProps<E extends ElementType = 'p'> = PolymorphicProps<E, TextOwnProps>;

/** Body text. Renders a `<p>` by default; use `as="span"` for inline text. */
export const Text = forwardRef(function Text(
  {
    as,
    size,
    weight,
    tone = 'default',
    align,
    truncate,
    mono,
    className,
    style,
    ...rest
  }: TextProps,
  ref,
) {
  const Comp = resolveAs(as, 'p');
  return (
    <Comp
      ref={ref}
      data-tone={tone}
      className={cx(styles.root, truncate && styles.truncate, mono && styles.mono, className)}
      style={compactStyle({
        fontSize: fontSizeVar(size),
        fontWeight: weight && `var(--mt-font-weight-${weight})`,
        textAlign: align,
        ...style,
      })}
      {...rest}
    />
  );
}) as PolymorphicComponent<'p', TextOwnProps>;
Text.displayName = 'Text';
