import { css } from '../cx';

// Base button styles
export const buttonBaseStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: var(--re-radius-md, 0.375rem);
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:focus-visible {
    outline: 2px solid var(--re-color-primary);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Animation styles
export const buttonAnimations = {
  pulse: css`
    @keyframes re-button-pulse {
      0% { transform: scale(1); }
      50% { transform: scale(0.98); }
      100% { transform: scale(1); }
    }
    animation: re-button-pulse 0.3s ease-in-out;
  `,
  pop: css`
    @keyframes re-button-pop {
      0% { transform: scale(1); }
      50% { transform: scale(1.04); }
      100% { transform: scale(1); }
    }
    animation: re-button-pop 0.2s ease-out;
  `,
  slide: css`
    @keyframes re-button-slide {
      0% { transform: translateX(-2px); }
      100% { transform: translateX(0); }
    }
    animation: re-button-slide 0.2s ease-out;
  `
};

// Gradient styles
export const buttonGradients = {
  primary: 'linear-gradient(45deg, var(--re-color-primary) 0%, var(--re-color-primary-light) 100%)',
  success: 'linear-gradient(45deg, var(--re-color-success) 0%, var(--re-color-success-light) 100%)',
  warning: 'linear-gradient(45deg, var(--re-color-warning) 0%, var(--re-color-warning-light) 100%)',
  danger: 'linear-gradient(45deg, var(--re-color-danger) 0%, var(--re-color-danger-light) 100%)',
  neutral: 'linear-gradient(45deg, var(--re-color-neutral) 0%, var(--re-color-neutral-light) 100%)',
};

// Glass effect styles
export const glassStyles = css`
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// Badge styles
export const badgeStyles = css`
  position: relative;
  
  &[data-badge]::after {
    content: attr(data-badge);
    position: absolute;
    top: -8px;
    right: -8px;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: 9px;
    background: var(--re-color-danger);
    color: white;
    font-size: 11px;
    font-weight: 500;
    line-height: 18px;
    text-align: center;
  }
`;

// Loading spinner styles
export const spinnerStyles = css`
  @keyframes re-spin {
    to { transform: rotate(360deg); }
  }

  .button-spinner {
    animation: re-spin 0.9s linear infinite;
  }
`;

// Ripple effect styles
export const rippleStyles = css`
  .ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s linear;
    background-color: rgba(255, 255, 255, 0.3);
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;