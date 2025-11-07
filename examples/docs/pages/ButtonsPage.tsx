// examples/docs/pages/ButtonsPage.tsx
import React from 'react';
import ButtonExplorer from '../components/ButtonExplorer';
import { ReBox } from '../../../src/core/ReBox';
import { ReButton } from '../../../src/core/ReButton';
import {
  ReSplitButton,
  ReButtonToolbar,
  ReIconButton,
  ReButtonGroup,
  ReToggleButton,
  DraggableButton,
  ResizableButton
} from '../../../src';

const DemoIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Terminal: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 6px 18px rgba(2,6,23,0.06)', marginTop: 12 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'linear-gradient(180deg, rgba(255,255,255,0.04), transparent)' }}>
      <div style={{ width: 12, height: 12, borderRadius: 999, background: '#ff5f56' }} />
      <div style={{ width: 12, height: 12, borderRadius: 999, background: '#ffbd2e' }} />
      <div style={{ width: 12, height: 12, borderRadius: 999, background: '#27c93f' }} />
    </div>
    <div style={{ background: '#0f1720', color: '#cfe8ff', padding: 12, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', monospace", fontSize: 13 }}>
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{children}</pre>
    </div>
  </div>
);

function generateManualContent() {
  return `# Re-ARK Button Components - User Manual

## Overview
Re-ARK provides a comprehensive set of button components with extensive customization options and interactive features.

## Table of Contents
1. [Basic Usage](#basic-usage)
2. [Props Reference](#props-reference)
3. [Button Features](#button-features)
4. [Component Variants](#component-variants)
5. [Examples](#examples)

## Basic Usage

\`\`\`tsx
import { ReButton } from '@re-ark/ui';

function App() {
  return (
    <ReButton variant="solid" color="primary" size="md">
      Click Me
    </ReButton>
  );
}
\`\`\`

## Props Reference

### ReButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'solid' \\| 'outline' \\| 'ghost' \\| 'soft' \\| 'text' \\| 'icon' | 'solid' | Visual style variant |
| color | 'primary' \\| 'success' \\| 'warning' \\| 'danger' \\| 'neutral' | 'primary' | Color intent |
| size | 'sm' \\| 'md' \\| 'lg' | 'md' | Button size |
| loading | boolean | false | Shows loading spinner |
| loadingText | string | - | Text shown during loading |
| loadingDelay | number | 0 | Delay before showing loading state |
| disabled | boolean | false | Disables button |
| startIcon | ReactNode | - | Icon before text |
| endIcon | ReactNode | - | Icon after text |
| async | boolean | false | Handle async onClick |
| tooltip | string | - | Tooltip text |
| haptic | boolean | false | Enable haptic feedback |
| animation | 'pulse' \\| 'pop' \\| 'slide' | - | Animation effect |
| gradient | boolean | false | Enable gradient background |
| glass | boolean | false | Enable glass effect |
| badge | number \\| string | - | Show badge counter |

## Button Features

### 1. Split Button
Allows users to select an action and choose from multiple options.

\`\`\`tsx
<ReSplitButton
  label="Export"
  options={['PDF', 'Excel', 'CSV']}
  onSelect={opt => exportData(opt)}
/>
\`\`\`

### 2. Button Toolbar
Group related actions in a horizontal toolbar.

\`\`\`tsx
<ReButtonToolbar align="end">
  <ReButton variant="outline">Cancel</ReButton>
  <ReButton color="primary">Save</ReButton>
</ReButtonToolbar>
\`\`\`

### 3. Icon Button
Compact button for icon-only actions.

\`\`\`tsx
<ReIconButton icon={<TrashIcon />} color="danger" tooltip="Delete" />
\`\`\`

### 4. Async & Loading States
Show loading spinner and handle async actions automatically.

\`\`\`tsx
<ReButton
  async
  loading
  onClick={async () => await submitForm()}
  loadingText="Submitting..."
>
  Submit
</ReButton>
\`\`\`

### 5. Badge
Display a badge counter on the button.

\`\`\`tsx
<ReButton badge={3} color="primary">
  Messages
</ReButton>
\`\`\`

### 6. Button Group
Group multiple buttons with shared styling.

\`\`\`tsx
<ReButtonGroup color="primary" size="md">
  <ReButton>Left</ReButton>
  <ReButton>Center</ReButton>
  <ReButton>Right</ReButton>
</ReButtonGroup>
\`\`\`

### 7. Toggle Button
Button with pressed/unpressed state.

\`\`\`tsx
<ReToggleButton
  pressed={isPressed}
  onPressedChange={setIsPressed}
>
  Toggle
</ReToggleButton>
\`\`\`

### 8. Draggable Button
Button that can be dragged within a container.

\`\`\`tsx
<DraggableButton initialX={20} initialY={20}>
  <ReButton variant="solid" color="primary">
    Drag me
  </ReButton>
</DraggableButton>
\`\`\`

### 9. Resizable Button
Button that can be resized horizontally.

\`\`\`tsx
<ResizableButton minWidth={120} maxWidth={400}>
  <ReButton variant="outline" color="primary">
    Resize me
  </ReButton>
</ResizableButton>
\`\`\`

## Advanced Examples

### Form Submit Button with Async Handling

\`\`\`tsx
function SubmitButton() {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitForm();
      // Success
    } catch (error) {
      // Error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReButton
      loading={loading}
      loadingText="Submitting..."
      onClick={handleSubmit}
      color="primary"
      size="lg"
      startIcon={<SaveIcon />}
    >
      Submit Form
    </ReButton>
  );
}
\`\`\`

### Button with Haptic Feedback and Animation

\`\`\`tsx
<ReButton
  variant="solid"
  color="primary"
  animation="pop"
  haptic
  gradient
  onClick={() => console.log('Clicked with effects!')}
>
  Click for Effect
</ReButton>
\`\`\`

## Accessibility

All Re-ARK buttons are built with accessibility in mind:
- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader support

### Icon Button Accessibility

\`\`\`tsx
<ReButton variant="icon" aria-label="Close dialog">
  <CloseIcon />
</ReButton>
\`\`\`

## Best Practices

1. **Loading States**: Use \`loadingDelay\` to prevent flickering for quick operations
2. **Async Operations**: Use the \`async\` prop for automatic loading states
3. **Icon Buttons**: Always provide an \`aria-label\`
4. **Button Groups**: Use for related actions
5. **Responsive Design**: Buttons adapt to their container

## Support

For more information, visit the Re-ARK documentation or contact support.

---

© 2025 Re-ARK Component Library`;
}

export default function ButtonsPage() {
  const handleDownloadManual = () => {
    const manualContent = generateManualContent();
    const blob = new Blob([manualContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Re-ARK-Button-Manual.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 16px' }}>
      <h1 style={{ marginBottom: 8 }}>Buttons</h1>
      <p style={{ marginBottom: 24 }}>Explore our comprehensive button components with various styles and functionalities.</p>
      <button
        onClick={handleDownloadManual}
        style={{
          display: 'inline-block',
          marginBottom: 32,
          padding: '10px 20px',
          background: 'var(--re-color-primary)',
          color: '#fff',
          borderRadius: 8,
          border: 'none',
          cursor: 'pointer',
          fontWeight: 500,
          fontSize: 16,
          boxShadow: '0 2px 8px rgba(11,105,255,0.08)'
        }}
      >
        Download User Manual (Markdown)
      </button>
      <div style={{ marginBottom: 40 }}>
        <ButtonFeatures />
      </div>
      <ReBox css={{ marginTop: '32px', marginBottom: '32px' }}>
        <ReButton color="primary" variant="solid">Test Button</ReButton>
      </ReBox>
      <ReBox css={{ marginTop: '32px' }}>
        <ButtonExplorer />
      </ReBox>
    </div>
  );
}

function ButtonFeatures() {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ marginBottom: 24 }}>Button Features</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={{ marginBottom: 48 }}>
          <strong style={{ fontSize: 18, display: 'block', marginBottom: 4 }}>Split Button</strong>
          <div style={{ marginBottom: 12, color: '#444' }}>Allows users to select an action and choose from multiple options.</div>
          <div style={{ marginBottom: 20 }}>
            <ReSplitButton label="Export" options={['PDF', 'Excel', 'CSV']} onSelect={opt => alert(`Export as ${opt}`)} />
          </div>
          <Terminal>{`
<ReSplitButton
  label="Export"
  options={['PDF', 'Excel', 'CSV']}
  onSelect={opt => exportData(opt)}
/>
          `}</Terminal>
        </li>
        <li style={{ marginBottom: 48 }}>
          <strong style={{ fontSize: 18, display: 'block', marginBottom: 4 }}>Button Toolbar</strong>
          <div style={{ marginBottom: 12, color: '#444' }}>Group related actions in a horizontal toolbar.</div>
          <div style={{ marginBottom: 20 }}>
            <ReButtonToolbar align="end">
              <ReButton variant="outline">Cancel</ReButton>
              <ReButton color="primary">Save</ReButton>
            </ReButtonToolbar>
          </div>
          <Terminal>{`
<ReButtonToolbar align="end">
  <ReButton variant="outline">Cancel</ReButton>
  <ReButton color="primary">Save</ReButton>
</ReButtonToolbar>
          `}</Terminal>
        </li>
        <li style={{ marginBottom: 48 }}>
          <strong style={{ fontSize: 18, display: 'block', marginBottom: 4 }}>Icon Button</strong>
          <div style={{ marginBottom: 12, color: '#444' }}>Compact button for icon-only actions.</div>
          <div style={{ marginBottom: 20 }}>
            <ReIconButton icon={<DemoIcon />} color="danger" tooltip="Delete" />
          </div>
          <Terminal>{`
<ReIconButton icon={<DemoIcon />} color="danger" tooltip="Delete" />
          `}</Terminal>
        </li>
        <li style={{ marginBottom: 48 }}>
          <strong style={{ fontSize: 18, display: 'block', marginBottom: 4 }}>Async & Loading</strong>
          <div style={{ marginBottom: 12, color: '#444' }}>Show loading spinner and handle async actions.</div>
          <div style={{ marginBottom: 20 }}>
            <ReButton loading async onClick={async () => await new Promise(r => setTimeout(r, 1000))} loadingText="Loading...">Async Button</ReButton>
          </div>
          <Terminal>{`
<ReButton loading async onClick={async () => await doAsync()} loadingText="Loading...">Async Button</ReButton>
          `}</Terminal>
        </li>
        <li style={{ marginBottom: 48 }}>
          <strong style={{ fontSize: 18, display: 'block', marginBottom: 4 }}>Badge</strong>
          <div style={{ marginBottom: 12, color: '#444' }}>Display a badge counter on the button.</div>
          <div style={{ marginBottom: 20 }}>
            <ReButton badge={3} color="primary">Inbox</ReButton>
          </div>
          <Terminal>{`
<ReButton badge={3} color="primary">Inbox</ReButton>
          `}</Terminal>
        </li>
        <li style={{ marginBottom: 48 }}>
          <strong style={{ fontSize: 18, display: 'block', marginBottom: 4 }}>Button Group</strong>
          <div style={{ marginBottom: 12, color: '#444' }}>Group multiple buttons with shared styling.</div>
          <div style={{ marginBottom: 20 }}>
            <ReButtonGroup color="success" size="md">
              <ReButton>Left</ReButton>
              <ReButton>Center</ReButton>
              <ReButton>Right</ReButton>
            </ReButtonGroup>
          </div>
          <Terminal>{`
<ReButtonGroup color="success" size="md">
  <ReButton>Left</ReButton>
  <ReButton>Center</ReButton>
  <ReButton>Right</ReButton>
</ReButtonGroup>
          `}</Terminal>
        </li>
        <li style={{ marginBottom: 48 }}>
          <strong style={{ fontSize: 18, display: 'block', marginBottom: 4 }}>Toggle Button</strong>
          <div style={{ marginBottom: 12, color: '#444' }}>Button with pressed/unpressed state.</div>
          <div style={{ marginBottom: 20 }}>
            <ReToggleButton pressed={true} onPressedChange={() => {}}>Toggle</ReToggleButton>
          </div>
          <Terminal>{`
<ReToggleButton pressed={true} onPressedChange={setPressed}>Toggle</ReToggleButton>
          `}</Terminal>
        </li>
        <li style={{ marginBottom: 48 }}>
          <strong style={{ fontSize: 18, display: 'block', marginBottom: 4 }}>Draggable Button</strong>
          <div style={{ marginBottom: 12, color: '#444' }}>Button that can be dragged within a container.</div>
          <div style={{ marginBottom: 20, position: 'relative', width: 320, height: 80, overflow: 'hidden', background: '#f8fafc', borderRadius: 12, border: '1px dashed #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DraggableButton initialX={20} initialY={20}>
              <ReButton variant="solid" color="primary">Drag me</ReButton>
            </DraggableButton>
          </div>
          <Terminal>{`
<DraggableButton initialX={20} initialY={20}>
  <ReButton variant="solid" color="primary">Drag me</ReButton>
</DraggableButton>
          `}</Terminal>
        </li>
        <li style={{ marginBottom: 48 }}>
          <strong style={{ fontSize: 18, display: 'block', marginBottom: 4 }}>Resizable Button</strong>
          <div style={{ marginBottom: 12, color: '#444' }}>Button that can be resized horizontally.</div>
          <div style={{ marginBottom: 20 }}>
            <ResizableButton minWidth={120} maxWidth={400}>
              <ReButton variant="outline" color="primary">Resize me</ReButton>
            </ResizableButton>
          </div>
          <Terminal>{`
<ResizableButton minWidth={120} maxWidth={400}>
  <ReButton variant="outline" color="primary">Resize me</ReButton>
</ResizableButton>
          `}</Terminal>
        </li>
      </ul>
    </div>
  );
}