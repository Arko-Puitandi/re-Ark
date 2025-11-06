// src/core/ButtonContext.tsx
import React from 'react';

export type ButtonContextValue = {
  variant?: 'solid' | 'outline' | 'ghost' | 'soft' | 'text' | 'icon';
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  // group can provide a function to notify children (unused now but available)
  register?: (id: string) => void;
  unregister?: (id: string) => void;
};

export const ButtonContext = React.createContext<ButtonContextValue | undefined>(undefined);

export function useButtonContext() {
  return React.useContext(ButtonContext);
}
