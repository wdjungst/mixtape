import { forwardRef, type ElementType } from 'react';
import type { Space } from '../../theme/types';
import { cx } from '../../utils/cx';
import {
  resolveAs,
  type PolymorphicComponent,
  type PolymorphicProps,
} from '../../utils/polymorphic';
import { compactStyle, spaceVar } from '../../utils/tokens';
import styles from './Card.module.css';

export interface CardOwnProps {
  variant?: 'outline' | 'elevated' | 'filled';
  padding?: Space;
}

export type CardProps<E extends ElementType = 'div'> = PolymorphicProps<E, CardOwnProps>;

/** A surface for grouping related content. Use `as="article"`/`"section"` for semantics. */
export const Card = forwardRef(function Card(
  { as, variant = 'outline', padding = '5', className, style, ...rest }: CardProps,
  ref,
) {
  const Comp = resolveAs(as, 'div');
  return (
    <Comp
      ref={ref}
      data-variant={variant}
      className={cx(styles.root, className)}
      style={compactStyle({ padding: spaceVar(padding), ...style })}
      {...rest}
    />
  );
}) as PolymorphicComponent<'div', CardOwnProps>;
Card.displayName = 'Card';
