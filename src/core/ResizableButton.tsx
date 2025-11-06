// src/core/ResizableButton.tsx
import React from 'react';

export function ResizableButton({ children, minWidth = 40, maxWidth = 600 }: {
  children: React.ReactElement<any>;
  minWidth?: number;
  maxWidth?: number;
}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const startX = React.useRef(0);
  const startW = React.useRef(0);
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handlePointerDown = (ev: PointerEvent) => {
      startX.current = ev.clientX;
      startW.current = el.getBoundingClientRect().width;
      el.setPointerCapture?.(ev.pointerId);
      document.body.style.userSelect = 'none';
    };
    const handlePointerMove = (ev: PointerEvent) => {
      if (!startW.current) return;
      const dx = ev.clientX - startX.current;
      let nw = startW.current + dx;
      if (nw < minWidth) nw = minWidth;
      if (nw > maxWidth) nw = maxWidth;
      el.style.width = `${nw}px`;
    };
    const handlePointerUp = (ev: PointerEvent) => {
      try { el.releasePointerCapture(ev.pointerId); } catch {}
      startW.current = 0;
      document.body.style.userSelect = '';
    };

    const handle = el.querySelector('.re-resize-handle') as HTMLElement;
    handle?.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      handle?.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [minWidth, maxWidth]);

  return (
    <div ref={containerRef} style={{ display: 'inline-block', width: 'auto' }}>
      {React.isValidElement(children) &&
        React.cloneElement(children as React.ReactElement<any>, {
          style: {
            ...(((children as React.ReactElement<any>).props?.style) || {}),
            display: 'inline-flex'
          }
        })
      }
      <div
        className="re-resize-handle"
        style={{
          display: 'inline-block',
          width: 10,
          cursor: 'ew-resize',
          height: '100%',
          verticalAlign: 'middle',
          marginLeft: 4,
          borderLeft: '1px solid rgba(0,0,0,0.06)',
        }}
        aria-hidden
      />
    </div>
  );
}
