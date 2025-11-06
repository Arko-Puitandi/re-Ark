// src/core/DraggableButton.tsx
import React from 'react';

export function DraggableButton({ children, initialX = 0, initialY = 0 }: {
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const pos = React.useRef({ x: initialX, y: initialY });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.position = 'absolute';
    el.style.left = `${initialX}px`;
    el.style.top = `${initialY}px`;

    let dragging = false;
    let startX = 0;
    let startY = 0;

    const handlePointerDown = (ev: PointerEvent) => {
      dragging = true;
      startX = ev.clientX;
      startY = ev.clientY;
      try { el.setPointerCapture(ev.pointerId); } catch {}
    };
    const handlePointerMove = (ev: PointerEvent) => {
      if (!dragging) return;
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      let nx = pos.current.x + dx;
      let ny = pos.current.y + dy;

      // clamp into parent
      const parent = el.parentElement;
      if (parent) {
        const pRect = parent.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const minX = 0;
        const minY = 0;
        const maxX = pRect.width - elRect.width;
        const maxY = pRect.height - elRect.height;
        nx = Math.max(minX, Math.min(nx, maxX));
        ny = Math.max(minY, Math.min(ny, maxY));
      }

      el.style.left = `${nx}px`;
      el.style.top = `${ny}px`;
    };
    const handlePointerUp = (ev: PointerEvent) => {
      dragging = false;
      pos.current.x = parseInt(el.style.left || '0', 10);
      pos.current.y = parseInt(el.style.top || '0', 10);
      try { el.releasePointerCapture(ev.pointerId); } catch {}
    };

    el.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      el.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [initialX, initialY]);

  return <div ref={ref}>{children}</div>;
}
