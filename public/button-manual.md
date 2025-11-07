# Re-ARK Button Components Documentation

## Table of Contents
- [ReButton](#rebutton)
  - [Basic Usage](#basic-usage)
  - [Props Reference](#props-reference)
  - [Features](#features)
- [Button Variants](#button-variants)
- [ReButtonGroup](#rebuttongroup)
- [ReToggleButton](#retogglebutton)
- [Interactive Features](#interactive-features)
- [Styling & Effects](#styling--effects)
- [Accessibility](#accessibility)

## ReButton

The core button component with extensive customization options and interactive features.

### Basic Usage

```tsx
import { ReButton } from '@re-ark/ui';

function App() {
  return (
    <ReButton 
      variant="solid"
      color="primary"
      size="md"
      onClick={() => console.log('clicked')}
    >
      Click Me
    </ReButton>
  );
}
```

### Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'solid' \| 'outline' \| 'ghost' \| 'soft' \| 'text' \| 'icon' | 'solid' | Visual style variant |
| color | 'primary' \| 'success' \| 'warning' \| 'danger' \| 'neutral' | 'primary' | Color intent |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |
| loading | boolean | false | Shows loading spinner |
| loadingText | string | - | Text shown during loading |
| loadingDelay | number | 0 | Delay before showing loading state |
| disabled | boolean | false | Disables button |
| startIcon | ReactNode | - | Icon before text |
| endIcon | ReactNode | - | Icon after text |
| async | boolean | false | Handle async onClick |
| tooltip | string | - | Tooltip text |
| haptic | boolean | false | Enable haptic feedback |
| animation | 'pulse' \| 'pop' \| 'slide' | - | Animation effect |
| gradient | boolean | false | Enable gradient background |
| glass | boolean | false | Enable glass effect |
| badge | number \| string | - | Show badge counter |
| feedback | { success?: string; error?: string } | - | Async feedback text |

### Features

#### 1. Button Variants

```tsx
// Solid (Default)
<ReButton variant="solid">Solid Button</ReButton>

// Outline
<ReButton variant="outline">Outline Button</ReButton>

// Ghost
<ReButton variant="ghost">Ghost Button</ReButton>

// Soft
<ReButton variant="soft">Soft Button</ReButton>

// Text
<ReButton variant="text">Text Button</ReButton>

// Icon
<ReButton variant="icon" aria-label="add">
  <PlusIcon />
</ReButton>
```

#### 2. Color Intents

```tsx
<ReButton color="primary">Primary</ReButton>
<ReButton color="success">Success</ReButton>
<ReButton color="warning">Warning</ReButton>
<ReButton color="danger">Danger</ReButton>
<ReButton color="neutral">Neutral</ReButton>
```

#### 3. Loading States

```tsx
// Basic loading
<ReButton loading>Loading...</ReButton>

// With custom loading text
<ReButton loading loadingText="Please wait...">Submit</ReButton>

// With loading delay
<ReButton loading loadingDelay={300}>Process</ReButton>
```

#### 4. Async Actions

```tsx
function AsyncExample() {
  const handleSubmit = async () => {
    // Automatic loading state and error handling
    await submitForm();
  };

  return (
    <ReButton 
      async 
      onClick={handleSubmit}
      feedback={{
        success: "Saved!",
        error: "Failed to save"
      }}
    >
      Save Changes
    </ReButton>
  );
}
```

#### 5. Icons & Badge

```tsx
// Start icon
<ReButton startIcon={<SearchIcon />}>Search</ReButton>

// End icon
<ReButton endIcon={<ArrowRightIcon />}>Next</ReButton>

// Badge
<ReButton badge="3">Messages</ReButton>

// Icon only
<ReButton variant="icon" aria-label="settings">
  <SettingsIcon />
</ReButton>
```

#### 6. Interactive Effects

```tsx
// Haptic feedback
<ReButton haptic onClick={() => console.log('clicked with haptic')}>
  Click Me
</ReButton>

// Animations
<ReButton animation="pulse">Pulse</ReButton>
<ReButton animation="pop">Pop</ReButton>
<ReButton animation="slide">Slide</ReButton>

// Visual effects
<ReButton gradient>Gradient</ReButton>
<ReButton glass>Glass Effect</ReButton>
```

## ReButtonGroup

Group multiple buttons with shared context and styling.

```tsx
<ReButtonGroup color="primary" size="md">
  <ReButton>Left</ReButton>
  <ReButton>Center</ReButton>
  <ReButton>Right</ReButton>
</ReButtonGroup>
```

### ReButtonGroup Props

| Prop | Type | Description |
|------|------|-------------|
| color | ColorIntent | Shared color for all buttons |
| size | Size | Shared size for all buttons |
| variant | Variant | Shared variant for all buttons |
| disabled | boolean | Disable all buttons |

## ReToggleButton

Button with toggle state, perfect for boolean controls.

```tsx
function ToggleExample() {
  const [pressed, setPressed] = React.useState(false);

  return (
    <ReToggleButton
      pressed={pressed}
      onPressedChange={setPressed}
      color="primary"
    >
      {pressed ? 'On' : 'Off'}
    </ReToggleButton>
  );
}
```

### Special Components

#### 1. DraggableButton

```tsx
<DraggableButton initialX={20} initialY={20}>
  <ReButton>Drag Me</ReButton>
</DraggableButton>
```

#### 2. ResizableButton

```tsx
<ResizableButton minWidth={120} maxWidth={400}>
  <ReButton>Resize Me</ReButton>
</ResizableButton>
```

## Styling & Effects

### 1. Glass Effect
```tsx
<ReButton glass>
  Glass Button
</ReButton>
```

### 2. Gradient Colors
```tsx
<ReButton gradient color="primary">
  Gradient Button
</ReButton>
```

### 3. Custom Styling
```tsx
<ReButton
  className="custom-button"
  style={{ 
    borderRadius: '20px',
    textTransform: 'uppercase' 
  }}
>
  Custom Style
</ReButton>
```

## Accessibility

Re-ARK buttons are built with accessibility in mind:

- Proper ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader support

```tsx
// Icon button with aria-label
<ReButton
  variant="icon"
  aria-label="Close dialog"
>
  <CloseIcon />
</ReButton>

// Loading state announcement
<ReButton
  loading
  loadingText="Submitting..."
  aria-live="polite"
>
  Submit
</ReButton>
```

## Tips & Best Practices

1. **Loading States**: Use `loadingDelay` to prevent flickering for quick operations:
```tsx
<ReButton loading loadingDelay={300}>Submit</ReButton>
```

2. **Async Operations**: Use the `async` prop for automatic loading states:
```tsx
<ReButton
  async
  onClick={async () => {
    await saveData();
  }}
>
  Save
</ReButton>
```

3. **Icon Buttons**: Always provide an aria-label:
```tsx
<ReButton variant="icon" aria-label="Add to favorites">
  <HeartIcon />
</ReButton>
```

4. **Button Groups**: Use for related actions:
```tsx
<ReButtonGroup>
  <ReButton>Save</ReButton>
  <ReButton variant="outline">Cancel</ReButton>
</ReButtonGroup>
```

5. **Responsive Design**: Buttons adapt to their container:
```tsx
<ReButton
  style={{
    width: '100%', // Full width on mobile
    maxWidth: '200px' // Max width on larger screens
  }}
>
  Responsive Button
</ReButton>
```

## Examples

### 1. Form Submit Button
```tsx
function SubmitButton() {
  const [isSubmitting, setSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await submitForm();
      // Success handling
    } catch (error) {
      // Error handling
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ReButton
      loading={isSubmitting}
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
```

### 2. Toggle Button Group
```tsx
function ToggleGroup() {
  const [view, setView] = React.useState('list');

  return (
    <ReButtonGroup>
      <ReToggleButton
        pressed={view === 'list'}
        onPressedChange={() => setView('list')}
      >
        List View
      </ReToggleButton>
      <ReToggleButton
        pressed={view === 'grid'}
        onPressedChange={() => setView('grid')}
      >
        Grid View
      </ReToggleButton>
    </ReButtonGroup>
  );
}
```

### 3. Animated Action Button
```tsx
function ActionButton() {
  return (
    <ReButton
      variant="solid"
      color="primary"
      animation="pop"
      haptic
      gradient
      onClick={() => {
        console.log('Animated click!');
      }}
    >
      Click for Effect
    </ReButton>
  );
}
```