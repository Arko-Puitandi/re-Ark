// examples/docs/pages/ComponentsPage.tsx
import React from 'react';
import ExampleCard from './ExampleCard';
import ButtonExplorer from '../components/ButtonExplorer';
import { ReBox } from '../../../src/core/ReBox';
import { ReButton } from '../../../src/core/ReButton';

export default function ComponentsPage() {
  return (
    <div>
      <h1>Components</h1>

      <ExampleCard title="Button Explorer (interactive)">
        <ButtonExplorer />
      </ExampleCard>

      <ExampleCard title="Basic buttons">
        <div style={{ display: 'flex', gap: 12 }}>
          <ReButton>Primary</ReButton>
          <ReButton variant="outline">Outline</ReButton>
          <ReButton variant="ghost">Ghost</ReButton>
        </div>
      </ExampleCard>

    </div>
  );
}
