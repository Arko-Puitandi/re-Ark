import React from 'react';
import { cx } from './cx';

export type ReButtonToolbarProps = {
  children?: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  gap?: number | string;
  className?: string;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

export default function ReButtonToolbar({ children, align = 'start', gap = 8, className, style, ...rest }: ReButtonToolbarProps) {
  const justify = align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center';

  const baseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: justify,
    gap: typeof gap === 'number' ? `${gap}px` : gap,
    flexWrap: 'nowrap',
    overflowX: 'auto',
    ...style,
  };

  return (
    <div className={cx('reark-button-toolbar', className)} style={baseStyle} {...rest}>
      {children}
    </div>
  );
}
