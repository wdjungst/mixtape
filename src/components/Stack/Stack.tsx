import { forwardRef, type CSSProperties, type ElementType } from 'react';
import type { Space } from '../../theme/types';
import { cx } from '../../utils/cx';
import {
  resolveAs,
  type PolymorphicComponent,
  type PolymorphicProps,
} from '../../utils/polymorphic';
import { compactStyle, spaceVar } from '../../utils/tokens';
import styles from './Stack.module.css';

export interface StackOwnProps {
  direction?: 'row' | 'column';
  /** Space between children, from the space scale. */
  gap?: Space;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: boolean;
}

export type StackProps<E extends ElementType = 'div'> = PolymorphicProps<E, StackOwnProps>;

/** Lays children out in a row or column with consistent spacing. */
export const Stack = forwardRef(function Stack(
  {
    as,
    direction = 'column',
    gap = '3',
    align,
    justify,
    wrap,
    className,
    style,
    ...rest
  }: StackProps,
  ref,
) {
  const Comp = resolveAs(as, 'div');
  return (
    <Comp
      ref={ref}
      className={cx(styles.root, className)}
      style={compactStyle({
        flexDirection: direction,
        gap: spaceVar(gap),
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? ('wrap' as const) : undefined,
        ...style,
      })}
      {...rest}
    />
  );
}) as PolymorphicComponent<'div', StackOwnProps>;
Stack.displayName = 'Stack';

type DirectionalStack = PolymorphicComponent<'div', Omit<StackOwnProps, 'direction'>>;

/** A horizontal `Stack`, vertically centered by default. */
export const HStack = forwardRef(function HStack(props: StackProps, ref) {
  return <Stack ref={ref} align="center" {...props} direction="row" />;
}) as DirectionalStack;
HStack.displayName = 'HStack';

/** A vertical `Stack`. */
export const VStack = forwardRef(function VStack(props: StackProps, ref) {
  return <Stack ref={ref} {...props} direction="column" />;
}) as DirectionalStack;
VStack.displayName = 'VStack';
