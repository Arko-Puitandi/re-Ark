// src/themes/reTokens.ts
export const reTokens = {
  colors: {
    background: '#ffffff',
    foreground: '#0f172a',
    primary: '#0066ff',
    muted: '#6b7280',
    success: '#16a34a',
    warning: '#f59e0b',
    danger: '#ef4444',
    neutral: '#6b7280'
  },
  space: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 24
  },
  radii: {
    sm: 4,
    md: 8,
    lg: 12
  },
  fonts: {
    body: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
    heading: 'inherit'
  }
} as const;

export type ReTokens = typeof reTokens;
