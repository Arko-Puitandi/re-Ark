// src/core/composeRefs.ts
export type Ref<T = any> = React.Ref<T>;

/**
 * composeRefs(...refs) -> returns a callback ref that updates all refs
 *
 * Works with:
 *  - function refs: (node) => void
 *  - object refs: { current: ... }
 *
 * Example:
 *  const localRef = useRef(null);
 *  const combined = composeRefs(forwardedRef, localRef);
 *  <div ref={combined} />
 */
export function composeRefs<T = any>(...refs: Array<Ref<T> | undefined>) {
  return (value: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') {
        try {
          ref(value);
        } catch {
          // swallow - calling user-provided refs shouldn't crash the library
        }
      } else {
        // object ref
        try {
          // @ts-ignore safe: RefObject has 'current'
          ref.current = value;
        } catch {
          // ignore
        }
      }
    }
  };
}
