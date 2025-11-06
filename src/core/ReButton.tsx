// src/core/ReButton.tsx
import React from 'react';
import { cx } from './cx';
import { composeRefs } from './composeRefs';
import { useButtonContext } from './ButtonContext';

type ColorIntent = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
type Variant = 'solid' | 'outline' | 'ghost' | 'soft' | 'text' | 'icon';
type Size = 'sm' | 'md' | 'lg';

export type ReButtonProps<E extends React.ElementType = 'button'> = {
  children?: React.ReactNode;
  loading?: boolean;
  loadingDelay?: number;
  variant?: Variant;
  color?: ColorIntent;
  size?: Size;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  draggable?: boolean; // just forward, wrapper will implement behavior
  resizable?: boolean; // just forward, wrapper will implement behavior
  'aria-label'?: string;
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
  ref: React.Ref<any>
) => {
  const context = useButtonContext();

  const {
    as,
    children,
    loading = false,
    loadingDelay = 150,
    variant: variantProp,
    color: colorProp,
    size: sizeProp,
    startIcon,
    endIcon,
    className,
    disabled,
    onPointerDown,
    onClick,
    ...rest
  } = props;

  const variant = variantProp ?? context?.variant ?? 'solid';
  const color = colorProp ?? (context?.color as ColorIntent) ?? 'primary';
  const size = sizeProp ?? (context?.size as Size) ?? 'md';
  const Comp: React.ElementType = as || 'button';
  const isNativeButton = typeof Comp === 'string' && Comp.toLowerCase() === 'button';

  const { padding, fontSize, iconSize } = sizeTokens[size];

  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding,
    fontSize,
    borderRadius: 8,
    lineHeight: 1,
    transition: 'background .12s ease, transform .06s ease, opacity .12s ease',
    userSelect: 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    position: 'relative',
  };

  const intentVar = `--re-color-${color}`;
  const resolved: React.CSSProperties = { ...base };

  if (variant === 'solid') {
    resolved.background = `var(${intentVar})`;
    resolved.color = 'white';
    resolved.border = 'none';
  } else if (variant === 'outline') {
    resolved.background = 'transparent';
    resolved.color = `var(${intentVar})`;
    resolved.border = `1px solid rgba(0,0,0,0.08)`;
  } else if (variant === 'ghost') {
    resolved.background = 'transparent';
    resolved.color = `var(${intentVar})`;
    resolved.border = 'none';
  } else if (variant === 'soft') {
    resolved.background = `rgba(0,0,0,0.03)`;
    resolved.color = `var(${intentVar})`;
    resolved.border = 'none';
  } else if (variant === 'text') {
    resolved.background = 'transparent';
    resolved.color = `var(${intentVar})`;
    resolved.border = 'none';
    (resolved as any).padding = 0;
  } else if (variant === 'icon') {
    const sizePx = size === 'sm' ? 32 : size === 'lg' ? 44 : 36;
    resolved.width = sizePx;
    resolved.height = sizePx;
    resolved.padding = 0;
    resolved.borderRadius = 9999;
    resolved.background = 'transparent';
    resolved.color = `var(${intentVar})`;
    resolved.border = 'none';
  }

  // smart loading: show spinner only after delay
  const [showSpinner, setShowSpinner] = React.useState(false);
  React.useEffect(() => {
    let timer: number | undefined;
    if (loading) {
      timer = window.setTimeout(() => setShowSpinner(true), loadingDelay);
    } else {
      setShowSpinner(false);
    }
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [loading, loadingDelay]);

  // ripple effect: create a span at pointer location
  const localRef = React.useRef<HTMLElement | null>(null);
  const combinedRef = composeRefs(ref as React.Ref<any>, localRef);

  const createRipple = (ev: React.PointerEvent) => {
    const el = localRef.current as HTMLElement | null;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const ripple = document.createElement('span');
    ripple.className = 're-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = `${Math.max(rect.width, rect.height) * 0.3}px`;
    ripple.style.height = ripple.style.width;
    ripple.style.background = getComputedStyle(el).color || 'currentColor';
    el.appendChild(ripple);
    window.setTimeout(() => {
      ripple.remove();
    }, 700);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    // only left clicks/touch
    if (e.button === 0) createRipple(e);
    onPointerDown?.(e);
  };

  const extraProps: Record<string, any> = {};
  if (isNativeButton && (rest as any).type === undefined) extraProps.type = 'button';

  const ariaProps: Record<string, any> = {};
  if (loading) ariaProps['aria-busy'] = true;

  const isIconOnly = variant === 'icon' || (!children && (startIcon || endIcon));

  // skeleton style applied while showSpinner true and variant is ghost/outline? We'll always show skeleton overlay
  const skeletonClass = showSpinner ? 're-button-skeleton' : undefined;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Comp
      ref={combinedRef as any}
      className={cx('re-button', skeletonClass, className)}
      style={resolved}
      disabled={disabled || loading}
      onPointerDown={handlePointerDown}
      onClick={onClick}
      {...(rest as any)}
      {...extraProps}
      {...ariaProps}
    >
      {showSpinner ? (
        <span aria-hidden style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <Spinner size={iconSize} />
        </span>
      ) : (
        <>
          {startIcon ? <span style={{ display: 'inline-flex', width: iconSize, height: iconSize }}>{startIcon}</span> : null}
          {children ? <span>{children}</span> : null}
          {endIcon ? <span style={{ display: 'inline-flex', width: iconSize, height: iconSize }}>{endIcon}</span> : null}
        </>
      )}
    </Comp>
  );
};

type PolymorphicReButton = {
  <E extends React.ElementType = 'button'>(props: ReButtonProps<E> & { ref?: React.Ref<any> }): React.ReactElement | null;
  displayName?: string;
};

export const ReButton = React.forwardRef(_ReButton) as PolymorphicReButton;
ReButton.displayName = 'ReButton';
