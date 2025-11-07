// examples/docs/pages/ButtonsPage.tsx
import React from 'react';
import ButtonExplorer from '../components/ButtonExplorer';
import { ReBox } from '../../../src/core/ReBox';

export default function ButtonsPage() {
  return (
    <div>
      <h1>Buttons</h1>
      <p>Explore our comprehensive button components with various styles and functionalities.</p>
      
      <ReBox css={{ marginTop: '24px' }}>
        <ButtonExplorer />
      </ReBox>
    </div>
  );
}