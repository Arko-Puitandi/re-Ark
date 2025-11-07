// src/core/ReButton.v2.tsx
import React from 'react';
import { cx } from './cx';
import { composeRefs } from './composeRefs';
import { useButtonContext } from './ButtonContext';
import { useLongPress } from '../hooks/useLongPress';
import { triggerHapticFeedback } from '../utils/haptics';
import { buttonGradients } from './styles/buttonStyles';
import { handleAsyncClick } from './buttonUtils';

type ColorIntent = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
type Variant = 'solid' | 'outline' | 'ghost' | 'soft' | 'text' | 'icon';
type Size = 'sm' | 'md' | 'lg';

export type ReButtonProps<E extends React.ElementType = 'button'> = {
  children?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  loadingDelay?: number;
  variant?: Variant;
  color?: ColorIntent;
  size?: Size;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  draggable?: boolean;
  resizable?: boolean;
  'aria-label'?: string;
  // New props
  async?: boolean;
  tooltip?: string;
  haptic?: boolean;
  animation?: 'pulse' | 'pop' | 'slide';
  gradient?: boolean;
  glass?: boolean;
  longPressDuration?: number;
  onLongPress?: () => void;
  badge?: number | string;
  feedback?: {
    success?: string;
    error?: string;
  };
} & Omit<React.ComponentPropsWithRef<E>, 'as' | 'children'> & {
    as?: E;
  };

const sizeTokens: Record<Size, { padding: string; fontSize: number; iconSize: number }> = {
  sm: { padding: '6px 10px', fontSize: 13, iconSize: 14 },
  md: { padding: '8px 12px', fontSize: 14, iconSize: 16 },
  lg: { padding: '10px 16px', fontSize: 15, iconSize: 18 },
};

const Spinner = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" aria-hidden focusable="false" style={{ display: 'block' }}>
    <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="31.415, 31.415" strokeDashoffset="0" fill="none" opacity="0.4" />
    <circle cx="25" cy="25" r="20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="31.415, 31.415" strokeDashoffset="20" fill="none" />
    <style>{`svg{animation:reark-spin .9s linear infinite}@keyframes reark-spin{100%{transform:rotate(360deg)}}`}</style>
  </svg>
);

const _ReButton = <E extends React.ElementType = 'button'>(
  props: ReButtonProps<E>,
  ref: React.ForwardedRef<any>
) => {
  const context = useButtonContext();
  const [asyncState, setAsyncState] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackText, setFeedbackText] = React.useState<string>('');

  const {
    as,
    children,
    loading = false,
    loadingText,
    loadingDelay = 0,
    variant = context?.variant || 'solid',
    color = context?.color || 'primary',
    size = context?.size || 'md',
    startIcon,
    endIcon,
    className,
    disabled = false,
    draggable,
    resizable,
    async = false,
    tooltip,
    haptic = false,
    animation,
    gradient = false,
    glass = false,
    longPressDuration,
    onLongPress,
    badge,
    feedback,
    ...rest
  } = props;

  const Component = as || 'button';
  const composedRef = composeRefs([ref]);
  const tokens = sizeTokens[size];

  // Handle long press
  const longPressProps = onLongPress
    ? useLongPress({
        onLongPress,
        onClick: rest.onClick as () => void,
        duration: longPressDuration,
      })
    : {};

  // Create ripple effect
  const createRipple = (event: React.MouseEvent) => {
    const button = event.currentTarget as HTMLElement;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = 'ripple';

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  // Handle async click
  const handleClick = async (e: React.MouseEvent) => {
    // Create ripple effect
    createRipple(e);
    if (haptic) {
      triggerHapticFeedback();
    }

    if (async && rest.onClick) {
      e.preventDefault();
      await handleAsyncClick(
        rest.onClick as (...args: any[]) => Promise<any>,
        setAsyncState,
        setFeedbackText,
        feedback
      );
    } else {
      rest.onClick?.(e);
    }
  };

  // Determine button text
  const buttonText = loading
    ? loadingText || children
    : feedbackText || children;

  const styles: React.CSSProperties = {
    padding: tokens.padding,
    fontSize: tokens.fontSize,
    background: gradient ? (buttonGradients as any)[color] : undefined,
    // glass inline styles (don't spread CSS string into style)
    ...(glass
      ? {
          backdropFilter: 'blur(8px)',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 6px 18px rgba(0,0,0,0.06)'
        }
      : {}),
  };

  return (
    <Component
      ref={composedRef}
      className={cx(
        'reark-button',
        className,
        loading && 'loading',
        disabled && 'disabled',
        variant && `variant-${variant}`,
        color && `color-${color}`,
        size && `size-${size}`,
        gradient && 'gradient',
        glass && 'glass',
        asyncState !== 'idle' && `async-${asyncState}`,
        badge && 'with-badge'
      )}
      disabled={disabled || loading || asyncState === 'loading'}
      data-draggable={draggable}
      data-resizable={resizable}
      data-badge={badge}
      title={tooltip}
      onClick={handleClick}
      style={styles}
      {...longPressProps}
      {...rest}
    >
      {/* Loading spinner */}
      {loading && (
        <span className="button-spinner">
          <Spinner size={tokens.iconSize} />
        </span>
      )}

      {/* Start icon */}
      {startIcon && !loading && (
        <span className="button-icon button-icon-start">{startIcon}</span>
      )}

      {/* Button text */}
      <span className="button-content">{buttonText}</span>

      {/* End icon */}
      {endIcon && !loading && (
        <span className="button-icon button-icon-end">{endIcon}</span>
      )}
    </Component>
  );
};

export const ReButton = React.forwardRef(_ReButton) as <E extends React.ElementType = 'button'>(
  props: ReButtonProps<E> & { ref?: React.ForwardedRef<any> }
) => React.ReactElement;