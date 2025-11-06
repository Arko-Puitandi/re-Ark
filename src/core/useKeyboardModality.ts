// src/core/useKeyboardModality.ts
import { useEffect } from 'react';

/**
 * Adds/removes "reark-keyboard" data attribute on documentElement when the user
 * interacts with the keyboard (Tab) vs pointer. Allows CSS to show focus rings only for keyboard users.
 */
export function useKeyboardModality() {
  useEffect(() => {
    const doc = document.documentElement;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Tab' || e.key === 'Shift' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        doc.dataset.rearkKeyboard = 'true';
      }
    }
    function handlePointer() {
      delete doc.dataset.rearkKeyboard;
    }

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('pointerdown', handlePointer, true);
    window.addEventListener('mousedown', handlePointer, true);
    window.addEventListener('touchstart', handlePointer, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('pointerdown', handlePointer, true);
      window.removeEventListener('mousedown', handlePointer, true);
      window.removeEventListener('touchstart', handlePointer, true);
    };
  }, []);
}
