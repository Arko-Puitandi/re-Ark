// src/core/ButtonContext.tsx
import React from 'react';

export type ButtonContextValue = {
  variant?: 'solid' | 'outline' | 'ghost' | 'soft' | 'text' | 'icon';
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  gradient?: boolean;
  glass?: boolean;
  animation?: 'pulse' | 'pop' | 'slide';
  // Button group functionality
  register?: (id: string) => void;
  unregister?: (id: string) => void;
  isSelected?: boolean;
  onSelect?: (value: string) => void;
  value?: string;
  exclusive?: boolean;
};

export const ButtonContext = React.createContext<ButtonContextValue | undefined>(undefined);

export function useButtonContext() {
  return React.useContext(ButtonContext);
}
