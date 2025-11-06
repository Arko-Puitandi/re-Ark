// src/core/ResizableButton.tsx
import React from 'react';

type Props = {
  children: React.ReactElement<{ style?: React.CSSProperties }>;
  minWidth?: number;
  maxWidth?: number;
  step?: number; // keyboard step in px
};

export function ResizableButton({ children, minWidth = 40, maxWidth = 600, step = 8 }: Props) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const handleRef = React.useRef<HTMLDivElement | null>(null);

  // helper to set width safely on container
  const setContainerWidth = (w: number) => {
    const el = containerRef.current;
    if (!el) return;
    const clamped = Math.max(minWidth, Math.min(w, maxWidth));
    el.style.width = `${clamped}px`;
  };

  // pointer handlers added on pointerdown and removed on up
  React.useEffect(() => {
    const handle = handleRef.current;
    const container = containerRef.current;
    if (!handle || !container) return;

    let startX = 0;
    let startW = 0;
    let activePointerId: number | null = null;

    const onPointerMove = (ev: PointerEvent) => {
      if (activePointerId !== ev.pointerId) return;
      const dx = ev.clientX - startX;
      setContainerWidth(Math.round(startW + dx));
    };

    const onPointerUp = (ev: PointerEvent) => {
      if (activePointerId !== ev.pointerId) return;
      activePointerId = null;
      document.body.style.userSelect = '';
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    const onPointerDown = (ev: PointerEvent) => {
      // ensure left mouse button or touch/pointer
      if (ev.button && ev.button !== 0) return;
      // initialize
      startX = ev.clientX;
      // get starting width (explicit pixel width)
      const rect = container.getBoundingClientRect();
      startW = Math.max(minWidth, Math.min(rect.width || container.offsetWidth, maxWidth));
      // set explicit width if it was 'auto'
      container.style.width = `${startW}px`;

      activePointerId = ev.pointerId;
      document.body.style.userSelect = 'none';
      try { (ev.target as Element).setPointerCapture(ev.pointerId); } catch {}

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      ev.preventDefault();
    };

    // keyboard support: when handle is focused, allow arrow keys
    const onHandleKeyDown = (e: KeyboardEvent) => {
      if (!container) return;
      const cur = container.getBoundingClientRect().width || container.offsetWidth;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const mul = e.shiftKey ? 4 : 1;
        const delta = (e.key === 'ArrowRight' ? 1 : -1) * step * mul;
        setContainerWidth(Math.round(cur + delta));
        e.preventDefault();
      }
    };

    handle.addEventListener('pointerdown', onPointerDown);
    handle.addEventListener('keydown', onHandleKeyDown);

    return () => {
      handle.removeEventListener('pointerdown', onPointerDown);
      handle.removeEventListener('keydown', onHandleKeyDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [minWidth, maxWidth, step]);

  // Ensure child is inline-flex so width applies, and wrapper is inline-block
  const cloned = React.cloneElement(children, {
    style: { display: 'inline-flex', ...(children.props.style || {}) },
  });

  // Visible handle styles (you can remove background if you want it subtler)
  const handleStyle: React.CSSProperties = {
    display: 'inline-block',
    width: 12,
    height: '100%',
    cursor: 'ew-resize',
    marginLeft: 8,
    verticalAlign: 'middle',
    borderLeft: '1px solid rgba(0,0,0,0.06)',
    // visible hit area / debug:
    background: 'rgba(11,105,255,0.02)', // subtle tint so you can see it
    touchAction: 'none', // important for touch to avoid scrolling
  };

  return (
    <div
      ref={containerRef as any}
      style={{ display: 'inline-block', width: 'auto', verticalAlign: 'middle' }}
    >
      <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>{cloned}</div>

      <div
        ref={handleRef as any}
        role="separator"
        tabIndex={0}
        aria-orientation="vertical"
        title="Resize (drag or use left/right arrows)"
        style={handleStyle}
      />
    </div>
  );
}
