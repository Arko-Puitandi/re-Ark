// src/themes/ReThemeProvider.tsx
import React, { useEffect } from 'react';
import { reTokens } from './reTokens';
import { useKeyboardModality } from '../core/useKeyboardModality';

export type ReTheme = 'light' | 'dark';

export const ReThemeProvider: React.FC<{ children?: React.ReactNode; theme?: ReTheme }> = ({
  children,
  theme = 'light',
}) => {
  useKeyboardModality();

  useEffect(() => {
    const root = document.documentElement;
    const t = reTokens;

    root.style.setProperty('--re-color-bg', t.colors.background);
    root.style.setProperty('--re-color-foreground', t.colors.foreground);
    root.style.setProperty('--re-color-primary', t.colors.primary);
    root.style.setProperty('--re-color-muted', t.colors.muted);

    root.style.setProperty('--re-color-success', t.colors.success);
    root.style.setProperty('--re-color-warning', t.colors.warning);
    root.style.setProperty('--re-color-danger', t.colors.danger);
    root.style.setProperty('--re-color-neutral', t.colors.neutral);

    root.style.setProperty('--re-surface', '#ffffff');
    root.style.setProperty('--re-sidebar-bg', '#ffffff');

    root.style.setProperty('--re-space-1', `${t.space[1]}px`);
    root.style.setProperty('--re-space-2', `${t.space[2]}px`);
    root.style.setProperty('--re-radii-md', `${t.radii.md}px`);
    root.style.setProperty('--re-font-body', t.fonts.body);

    if (theme === 'dark') {
      root.dataset.reTheme = 'dark';
      root.style.setProperty('--re-color-bg', '#071122');
      root.style.setProperty('--re-color-foreground', '#e6eef8');
      root.style.setProperty('--re-surface', '#0f1620');
      root.style.setProperty('--re-sidebar-bg', '#071226');

      root.style.setProperty('--re-color-primary', '#1e90ff');
      root.style.setProperty('--re-color-success', '#22c55e');
      root.style.setProperty('--re-color-warning', '#fbbf24');
      root.style.setProperty('--re-color-danger', '#fb7185');
      root.style.setProperty('--re-color-neutral', '#9aa4b2');
    } else {
      delete root.dataset.reTheme;
    }

    const styleId = 'reark-global-theme';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = `
      html, body, #root { height: 100%; }
      body {
        margin: 0;
        background: var(--re-color-bg);
        color: var(--re-color-foreground);
        font-family: var(--re-font-body);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      .reark-surface { background: var(--re-surface); color: var(--re-color-foreground); }

      /* focus ring: only show when keyboard modality detected */
      :root[data-reark-keyboard] button:focus {
        outline: 3px solid rgba(0,0,0,0.12);
        outline-offset: 2px;
      }

      /* ripple effect */
      .re-ripple {
        position: absolute;
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        pointer-events: none;
        opacity: 0.35;
        background: currentColor;
        animation: reark-ripple 540ms cubic-bezier(.22,.9,.3,1);
      }
      @keyframes reark-ripple {
        to { transform: translate(-50%, -50%) scale(3); opacity: 0; }
      }

      /* loading skeleton for buttons */
      .re-button-skeleton {
        position: relative;
        overflow: hidden;
        background: linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 100%);
      }
      .re-button-skeleton::after {
        content: "";
        position: absolute;
        left: -40%;
        top: 0;
        height: 100%;
        width: 40%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
        animation: reark-shimmer 1.1s linear infinite;
      }
      @keyframes reark-shimmer { 100% { transform: translateX(300%); } }
      
      /* ensure ripple children positioned */
      .re-button { position: relative; overflow: hidden; }
    `;
  }, [theme]);

  return <>{children}</>;
};
