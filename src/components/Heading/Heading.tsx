import { forwardRef, type CSSProperties, type ElementType } from 'react';
import type { FontSize } from '../../theme/types';
import { cx } from '../../utils/cx';
import {
  resolveAs,
  type PolymorphicComponent,
  type PolymorphicProps,
} from '../../utils/polymorphic';
import { compactStyle, fontSizeVar } from '../../utils/tokens';
import styles from './Heading.module.css';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingOwnProps {
  /** Semantic level; picks the `h1`–`h6` element and a default size. */
  level?: HeadingLevel;
  /** Visual size, independent of the semantic level. */
  size?: FontSize;
  align?: CSSProperties['textAlign'];
}

export type HeadingProps<E extends ElementType = 'h2'> = PolymorphicProps<E, HeadingOwnProps>;

const defaultSize: Record<HeadingLevel, FontSize> = {
  1: '4xl',
  2: '3xl',
  3: '2xl',
  4: 'xl',
  5: 'lg',
  6: 'md',
};

/** Section headings in the theme's heading font. */
export const Heading = forwardRef(function Heading(
  { as, level = 2, size, align, className, style, ...rest }: HeadingProps,
  ref,
) {
  const Comp = resolveAs(as, `h${level}`);
  return (
    <Comp
      ref={ref}
      className={cx(styles.root, className)}
      style={compactStyle({
        fontSize: fontSizeVar(size ?? defaultSize[level]),
        textAlign: align,
        ...style,
      })}
      {...rest}
    />
  );
}) as PolymorphicComponent<'h2', HeadingOwnProps>;
Heading.displayName = 'Heading';
