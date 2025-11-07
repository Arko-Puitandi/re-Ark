import { useCallback, useRef } from 'react';

interface UseLongPressOptions {
  onLongPress: () => void;
  onClick?: () => void;
  duration?: number;
}

export const useLongPress = ({
  onLongPress,
  onClick,
  duration = 600
}: UseLongPressOptions) => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const target = useRef<EventTarget | null>(null);

  const start = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    // persist for older React versions; safe to call in modern too
    // @ts-ignore
    event.persist?.();
    target.current = event.target;

    timeout.current = setTimeout(() => {
      onLongPress();
    }, duration);
  }, [onLongPress, duration]);

  const clear = useCallback((event: React.MouseEvent | React.TouchEvent, shouldTriggerClick = true) => {
    if (timeout.current) {
      clearTimeout(timeout.current as ReturnType<typeof setTimeout>);
      timeout.current = null;
    }
    shouldTriggerClick && target.current && onClick?.();
    target.current = null;
  }, [onClick]);

  return {
    onMouseDown: (e: React.MouseEvent) => start(e),
    onTouchStart: (e: React.TouchEvent) => start(e),
    onMouseUp: (e: React.MouseEvent) => clear(e),
    onMouseLeave: (e: React.MouseEvent) => clear(e, false),
    onTouchEnd: (e: React.TouchEvent) => clear(e),
  };
};