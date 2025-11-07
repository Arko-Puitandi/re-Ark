// examples/docs/examples/ButtonBasicExample.tsx
import React from 'react';
import { ReBox } from '../../../src/core/ReBox';
import { ReButton } from '../../../src/core/ReButton';

export function ButtonBasicExample() {
  return (
    <ReBox css={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <ReButton>Default</ReButton>
      <ReButton variant="outline">Outline</ReButton>
      <ReButton variant="ghost">Ghost</ReButton>
      <ReButton variant="soft">Soft</ReButton>
      <ReButton variant="text">Text</ReButton>
    </ReBox>
  );
}