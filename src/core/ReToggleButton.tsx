import React from 'react';
import { ReButton, ReButtonProps } from './ReButton';
import { composeRefs } from './composeRefs';

export type ReToggleButtonProps<E extends React.ElementType = 'button'> =
  Omit<ReButtonProps<E>, 'onClick' | 'onKeyDown'> & {
    /**
     * Controlled pressed state. If provided, component is controlled.
     */
    pressed?: boolean;
    /**
     * Initial pressed state for uncontrolled mode.
     */
    defaultPressed?: boolean;
    /**
     * Called when pressed state should change.
     */
    onPressedChange?: (next: boolean) => void;
    /**
     * Optional `value` to identify the button when used in a group.
     */
    value?: any;
    /**
     * Accessibility label — recommended for icon-only toggle buttons.
     */
    'aria-label'?: string;
    as?: E;
  };

/**
 * ReToggleButton
 *
 * - Controlled/uncontrolled pressed state
 * - Forwards ref
 * - Adds aria-pressed and keyboard activation (Space/Enter)
 * - Built on top of ReButton so it inherits variants/sizes/colors
 */
const _ReToggleButton = <E extends React.ElementType = 'button'>(
  {
    pressed: pressedProp,
    defaultPressed = false,
    onPressedChange,
    value,
    children,
    as,
    onClick,
    onKeyDown,
    ...rest
  }: ReToggleButtonProps<E>,
  forwardedRef: React.Ref<any>
) => {
  // Controlled vs uncontrolled
  const isControlled = pressedProp !== undefined;
  const [internalPressed, setInternalPressed] = React.useState<boolean>(defaultPressed);
  const pressed = isControlled ? Boolean(pressedProp) : internalPressed;

  const localRef = React.useRef<HTMLElement | null>(null);
  const ref = composeRefs(forwardedRef as React.Ref<any>, localRef);

  const toggle = (e?: React.MouseEvent | React.KeyboardEvent) => {
    const next = !pressed;
    if (!isControlled) setInternalPressed(next);
    onPressedChange?.(next);
  };

  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e as any);
    toggle(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    onKeyDown?.(e as any);
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      toggle(e);
    }
  };

  const asTag = (as || 'button') as any;
  const isNativeButton = typeof asTag === 'string' && asTag.toLowerCase() === 'button';
  const a11yProps: Record<string, any> = {
    'aria-pressed': pressed,
  };

  if (!isNativeButton) {
    a11yProps.role = 'button';
    a11yProps.tabIndex = rest.tabIndex ?? 0;
  }

  return (
    <ReButton
      as={as}
      ref={ref as any}
      onClick={handleClick as any}
      onKeyDown={handleKeyDown as any}
      {...a11yProps}
      {...(rest as any)}
    >
      {children}
    </ReButton>
  );
};

type ReToggleButtonComponent = <E extends React.ElementType = 'button'>(
  props: ReToggleButtonProps<E> & { ref?: React.Ref<any> }
) => React.ReactElement | null;

const ForwardedReToggleButton = React.forwardRef(_ReToggleButton);
ForwardedReToggleButton.displayName = 'ReToggleButton';
export const ReToggleButton = ForwardedReToggleButton as ReToggleButtonComponent;
