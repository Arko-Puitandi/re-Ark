// src/core/mergeProps.ts
import { cx } from './cx';

type AnyFn = (...args: any[]) => any;

function isEventHandler(key: string, val: any) {
  return typeof val === 'function' && key.startsWith('on');
}

/**
 * mergeProps(...propsList)
 * - merges objects in order (later objects override earlier)
 * - merges className via cx
 * - merges style objects shallowly
 * - chains event handlers (onClick, onFocus...) so both are called
 */
export function mergeProps<T extends Record<string, any>>(...propsList: Array<T | undefined>): T {
  const result: Record<string, any> = {};

  for (const props of propsList) {
    if (!props) continue;
    for (const key of Object.keys(props)) {
      const val = props[key];
      if (key === 'className') {
        result.className = cx(result.className, val);
        continue;
      }
      if (key === 'style') {
        result.style = { ...(result.style || {}), ...(val || {}) };
        continue;
      }
      if (isEventHandler(key, val) && isEventHandler(key, result[key])) {
        // chain handlers
        const prev = result[key] as AnyFn;
        const next = val as AnyFn;
        result[key] = function chainedEventHandler(...args: any[]) {
          try {
            prev(...args);
          } finally {
            next(...args);
          }
        };
        continue;
      }
      // otherwise override
      result[key] = val;
    }
  }

  return result as T;
}
