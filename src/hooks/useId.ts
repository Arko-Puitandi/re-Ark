import React from 'react';

/**
 * useId - SSR-safe id generator
 * Accepts an optional idFromProps to prefer provided id.
 * Uses React.useId() when available, otherwise falls back to an incremental generator.
 */

let idCounter = 0;

export function useId(idFromProps?: string) {
  // React.useId exists in React 18+
  const reactId = (React as any).useId ? (React as any).useId() : undefined;
  const generated = React.useMemo(() => `re-${++idCounter}`, []);
  return idFromProps ?? reactId ?? generated;
}
