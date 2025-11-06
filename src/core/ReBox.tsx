// src/core/ReBox.tsx
import React from 'react';
import { cx } from './cx';
import { mergeProps } from './mergeProps';
import { composeRefs } from './composeRefs';

export type ReBoxOwnProps = {
  css?: React.CSSProperties;
};

export type ReBoxProps<E extends React.ElementType = 'div'> = ReBoxOwnProps &
  Omit<React.ComponentPropsWithRef<E>, keyof ReBoxOwnProps | 'as'> & {
    as?: E;
  };

const _ReBox = <E extends React.ElementType = 'div'>(
  { as, css, style, children, className, ...rest }: ReBoxProps<E>,
  ref: React.Ref<any>
) => {
  const Comp: React.ElementType = as || 'div';
  const mergedStyle = { ...(style || {}), ...(css || {}) } as React.CSSProperties;

  // internal fallback props (if needed in future)
  const internal = {
    className: '', // can set internal classes later
    style: mergedStyle,
  };

  const merged = mergeProps(internal, { className, ...rest, style: mergedStyle });

  // If consumers pass a ref and we also want an internal ref, we can compose them:
  const localRef = React.useRef<HTMLElement | null>(null);
  const combinedRef = composeRefs(ref as React.Ref<HTMLElement>, localRef);

  // spread merged props; cast to any for JSX spreading
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Comp ref={combinedRef as any} {...(merged as any)}>
      {children}
    </Comp>
  );
};

type PolymorphicReBox = {
  <E extends React.ElementType = 'div'>(props: ReBoxProps<E> & { ref?: React.Ref<any> }): React.ReactElement | null;
  displayName?: string;
};

export const ReBox = React.forwardRef(_ReBox) as PolymorphicReBox;

ReBox.displayName = 'ReBox';
