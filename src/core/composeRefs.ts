// src/core/composeRefs.ts
import React from 'react';

/**
 * Compose multiple refs into a single ref callback.
 * Accepts either a list of refs or a single array of refs.
 */
export function composeRefs<T>(...maybeRefs: Array<React.ForwardedRef<T> | React.RefObject<T> | undefined> | [Array<React.ForwardedRef<T> | undefined>]): React.RefCallback<T> {
  // Support either composeRefs(refA, refB) or composeRefs([refA, refB])
  let refs: Array<React.ForwardedRef<T> | React.RefObject<T> | undefined> = [];
  if (maybeRefs.length === 1 && Array.isArray(maybeRefs[0])) {
    refs = maybeRefs[0] as Array<React.ForwardedRef<T> | undefined>;
  } else {
    refs = maybeRefs as Array<React.ForwardedRef<T> | React.RefObject<T> | undefined>;
  }

  return (value: T) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        try {
          ref(value);
        } catch (e) {
          // ignore errors from user-provided refs
        }
      } else {
        try {
          (ref as React.MutableRefObject<T | null>).current = value;
        } catch (e) {
          // ignore
        }
      }
    });
  };
}