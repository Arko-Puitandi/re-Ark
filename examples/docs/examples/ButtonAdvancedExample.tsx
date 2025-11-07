// examples/docs/examples/ButtonAdvancedExample.tsx
import React from 'react';
import { ReBox } from '../../../src/core/ReBox';
import { ReButton } from '../../../src/core/ReButton';

export function ButtonAdvancedExample() {
  const [count, setCount] = React.useState(0);

  const handleAsyncAction = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCount(prev => prev + 1);
  };

  return (
    <ReBox css={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
      <ReBox css={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <ReButton
          async
          onClick={handleAsyncAction}
          feedback={{
            success: 'Done!',
            error: 'Failed'
          }}
        >
          Async Action ({count})
        </ReButton>
        <ReButton
          gradient
          color="primary"
          tooltip="Click me!"
        >
          Gradient Button
        </ReButton>
        <ReButton
          glass
          badge="3"
        >
          Glass Button
        </ReButton>
      </ReBox>
      
      <ReBox css={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <ReButton
          onLongPress={() => alert('Long press!')}
          longPressDuration={600}
          haptic
        >
          Hold Me
        </ReButton>
        <ReButton
          animation="pop"
          startIcon="→"
          endIcon="←"
        >
          Animated
        </ReButton>
      </ReBox>
    </ReBox>
  );
}