import React from 'react';
import { cx } from './cx';
import { ReButton } from './ReButton';

export type ReIconButtonProps = {
  icon: React.ReactNode;
  tooltip?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: any;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function ReIconButton({ icon, tooltip, size = 'md', className, ...rest }: ReIconButtonProps) {
  const dims = size === 'sm' ? 32 : size === 'lg' ? 44 : 38;

  return (
    <ReButton
      className={cx('reark-icon-button', className)}
      as="button"
      aria-label={typeof tooltip === 'string' ? tooltip : undefined}
      style={{ width: dims, height: dims, padding: 0, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
      {...(rest as any)}
    >
      {icon}
    </ReButton>
  );
}
