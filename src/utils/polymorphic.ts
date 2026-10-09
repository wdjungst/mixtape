import type {
  ComponentPropsWithoutRef,
  ComponentType,
  ElementType,
  ReactElement,
  Ref,
} from 'react';

/** Props for a component that renders as `E` (via the `as` prop) with its own props `P`. */
export type PolymorphicProps<E extends ElementType, P = object> = P & {
  as?: E;
} & Omit<ComponentPropsWithoutRef<E>, keyof P | 'as'>;

/** Signature of a `forwardRef` component whose element type can be changed with `as`. */
export type PolymorphicComponent<D extends ElementType, P = object> = {
  <E extends ElementType = D>(
    props: PolymorphicProps<E, P> & { ref?: Ref<Element> },
  ): ReactElement | null;
  displayName?: string;
};

type LooseComponent = ComponentType<Record<string, unknown> & { ref?: Ref<Element> }>;

/**
 * Resolves the element to render. Public props are strictly typed via `PolymorphicComponent`;
 * internally we loosen the type, since TS can't relate generic props to an arbitrary element.
 */
export function resolveAs(as: ElementType | undefined, fallback: ElementType): LooseComponent {
  return (as ?? fallback) as unknown as LooseComponent;
}
