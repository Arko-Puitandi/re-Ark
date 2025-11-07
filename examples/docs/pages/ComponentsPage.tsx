// examples/docs/pages/ComponentsPage.tsx
import React from 'react';
import ExampleCard from './ExampleCard';
import ButtonExplorer from '../components/ButtonExplorer';
import { ReBox } from '../../../src/core/ReBox';
import { ReButton } from '../../../src/core/ReButton';

export default function ComponentsPage({ onNavigate }: { onNavigate?: (route: string) => void }) {
  return (
    <div>
      <h1>Components</h1>
      <p>Explore our component library:</p>

      <ExampleCard title="Available Components">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <h3>Buttons</h3>
            <p>Comprehensive button components with various styles and functionalities.</p>
            <ReButton onClick={() => onNavigate?.('buttons')}>View Buttons →</ReButton>
          </div>
          
          <div>
            <h3>More Components Coming Soon</h3>
            <p>We're working on adding more components to our library.</p>
          </div>
        </div>
      </ExampleCard>

    </div>
  );
}
