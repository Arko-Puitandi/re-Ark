// src/core/ReButtonGroup.tsx
import React from 'react';
import { ReBox } from './ReBox';
import { ButtonContext } from './ButtonContext';
import { cx } from './cx';

export type ReButtonGroupProps = {
  children?: React.ReactNode;
  variant?: 'default' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  buttonVariant?: 'solid' | 'outline' | 'ghost' | 'soft' | 'text' | 'icon';
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
};

export function ReButtonGroup({
  children,
  variant = 'default',
  size = 'md',
  color = 'primary',
  buttonVariant,
  className,
  style,
  disabled = false,
}: ReButtonGroupProps) {
  // provide context to children
  const ctxValue = React.useMemo(
    () => ({
      variant: buttonVariant,
      color,
      size,
      disabled,
    }),
    [buttonVariant, color, size, disabled]
  );

  // render children as-is: ReButton will take context defaults
  // wrap to handle adjacent radii
  const items = React.Children.toArray(children);

  return (
    <ButtonContext.Provider value={ctxValue}>
      <ReBox as="div" className={cx('re-button-group', className)} style={{ display: 'inline-flex', gap: 0, ...style }}>
        {items.map((child, i) => {
          const isFirst = i === 0;
          const isLast = i === items.length - 1;
          const wrapperStyle: React.CSSProperties = { overflow: 'hidden' };
          if (isFirst) {
            wrapperStyle.borderTopLeftRadius = 8;
            wrapperStyle.borderBottomLeftRadius = 8;
          }
          if (isLast) {
            wrapperStyle.borderTopRightRadius = 8;
            wrapperStyle.borderBottomRightRadius = 8;
          }
          if (!isLast) {
            wrapperStyle.borderRight = '1px solid rgba(0,0,0,0.06)';
          }
          return (
            <span key={i} style={wrapperStyle}>
              {child}
            </span>
          );
        })}
      </ReBox>
    </ButtonContext.Provider>
  );
}
