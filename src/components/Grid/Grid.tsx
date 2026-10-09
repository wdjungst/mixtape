import { forwardRef, type CSSProperties, type ElementType } from 'react';
import type { Space } from '../../theme/types';
import { cx } from '../../utils/cx';
import {
  resolveAs,
  type PolymorphicComponent,
  type PolymorphicProps,
} from '../../utils/polymorphic';
import { compactStyle, spaceVar } from '../../utils/tokens';
import styles from './Grid.module.css';

export interface GridOwnProps {
  /** A column count, or any `grid-template-columns` value. */
  columns?: number | string;
  /** Responsive auto-fill: as many columns as fit, each at least this wide (e.g. `"12rem"`). */
  minChildWidth?: string;
  gap?: Space;
  align?: CSSProperties['alignItems'];
}

export type GridProps<E extends ElementType = 'div'> = PolymorphicProps<E, GridOwnProps>;

function templateColumns({ columns, minChildWidth }: GridOwnProps) {
  if (minChildWidth) return `repeat(auto-fill, minmax(min(${minChildWidth}, 100%), 1fr))`;
  if (typeof columns === 'number') return `repeat(${columns}, minmax(0, 1fr))`;
  return columns;
}

/** CSS grid with token-based gaps and an easy responsive mode. */
export const Grid = forwardRef(function Grid(
  { as, columns, minChildWidth, gap = '4', align, className, style, ...rest }: GridProps,
  ref,
) {
  const Comp = resolveAs(as, 'div');
  return (
    <Comp
      ref={ref}
      className={cx(styles.root, className)}
      style={compactStyle({
        gridTemplateColumns: templateColumns({ columns, minChildWidth }),
        gap: spaceVar(gap),
        alignItems: align,
        ...style,
      })}
      {...rest}
    />
  );
}) as PolymorphicComponent<'div', GridOwnProps>;
Grid.displayName = 'Grid';
