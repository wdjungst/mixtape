import { forwardRef, type ElementType } from 'react';
import { cx } from '../../utils/cx';
import {
  resolveAs,
  type PolymorphicComponent,
  type PolymorphicProps,
} from '../../utils/polymorphic';
import styles from './Container.module.css';

export interface ContainerOwnProps {
  /** Maximum content width. */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export type ContainerProps<E extends ElementType = 'div'> = PolymorphicProps<E, ContainerOwnProps>;

/** Centers content horizontally with a max width and responsive side padding. */
export const Container = forwardRef(function Container(
  { as, size = 'lg', className, ...rest }: ContainerProps,
  ref,
) {
  const Comp = resolveAs(as, 'div');
  return <Comp ref={ref} data-size={size} className={cx(styles.root, className)} {...rest} />;
}) as PolymorphicComponent<'div', ContainerOwnProps>;
Container.displayName = 'Container';
