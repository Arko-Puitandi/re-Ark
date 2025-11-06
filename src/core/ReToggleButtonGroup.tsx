// src/core/ReToggleButtonGroup.tsx
import React from 'react';
import { ReBox } from './ReBox';

export type ReToggleButtonGroupProps<T = string> = {
  children?: React.ReactNode;
  value?: T;
  defaultValue?: T;
  onChange?: (v: T) => void;
  orientation?: 'horizontal' | 'vertical';
  ariaLabel?: string;
};

export function ReToggleButtonGroup<T = string>({
  children,
  value,
  defaultValue,
  onChange,
  orientation = 'horizontal',
  ariaLabel,
}: ReToggleButtonGroupProps<T>) {
  const [internal, setInternal] = React.useState<T | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const selected = (isControlled ? value : internal) as T | undefined;

  const handleSelect = (v: T) => {
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  // We'll render children and for each child that is a React element, inject props:
  const items = React.Children.map(children, (child: any, idx) => {
    if (!React.isValidElement(child)) return child;
    const key = (child.key as string) ?? String(idx);

    // Expect child to set data-val or have value prop (convention: pass value prop)
    const childElement = child as React.ReactElement<{ value?: T }>;
    const childValue = childElement.props.value ?? key;
    const pressed = selected === childValue;

    const typedChild = child as React.ReactElement<{ value?: T; onClick?: (e: any) => void }>;
    return React.cloneElement(child, {
      'aria-pressed': pressed,
      onClick: (e: any) => {
        typedChild.props.onClick?.(e);
        handleSelect(childValue as T);
      },
    } as any);
  });

  return (
    <ReBox as="div" role="group" aria-label={ariaLabel} style={{ display: orientation === 'horizontal' ? 'inline-flex' : 'flex', gap: 4 }}>
      {items}
    </ReBox>
  );
}
