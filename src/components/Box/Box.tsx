import { forwardRef, type ElementType } from 'react';
import type { Radius, Shadow, Space } from '../../theme/types';
import { cx } from '../../utils/cx';
import {
  resolveAs,
  type PolymorphicComponent,
  type PolymorphicProps,
} from '../../utils/polymorphic';
import { compactStyle, radiusVar, shadowVar, spaceVar } from '../../utils/tokens';
import styles from './Box.module.css';

export type BoxBackground = 'bg' | 'bgSubtle' | 'surface' | 'surfaceRaised';

export interface BoxOwnProps {
  /** Padding on all sides, from the space scale. */
  p?: Space;
  px?: Space;
  py?: Space;
  bg?: BoxBackground;
  radius?: Radius;
  shadow?: Shadow;
  /** Adds a 1px themed border. */
  bordered?: boolean;
}

export type BoxProps<E extends ElementType = 'div'> = PolymorphicProps<E, BoxOwnProps>;

const bgVar = (bg: BoxBackground | undefined) =>
  bg && `var(--mt-color-${bg.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)})`;

/** The lowest-level layout primitive: a themed `div` (or any element via `as`). */
export const Box = forwardRef(function Box(
  { as, p, px, py, bg, radius, shadow, bordered, className, style, ...rest }: BoxProps,
  ref,
) {
  const Comp = resolveAs(as, 'div');
  return (
    <Comp
      ref={ref}
      className={cx(styles.root, bordered && styles.bordered, className)}
      style={compactStyle({
        paddingBlock: spaceVar(py ?? p),
        paddingInline: spaceVar(px ?? p),
        backgroundColor: bgVar(bg),
        borderRadius: radiusVar(radius),
        boxShadow: shadowVar(shadow),
        ...style,
      })}
      {...rest}
    />
  );
}) as PolymorphicComponent<'div', BoxOwnProps>;

Box.displayName = 'Box';
