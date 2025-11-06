// examples/docs/components/ButtonExplorer.tsx
import React from 'react';
import { ReButton } from '../../../src/core/ReButton';
import { ReButtonGroup } from '../../../src/core/ReButtonGroup';
import { ReToggleButton } from '../../../src/core/ReToggleButton';
import { ReToggleButtonGroup } from '../../../src/core/ReToggleButtonGroup';
import { ReBox } from '../../../src/core/ReBox';

const DemoIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type Variant = 'solid' | 'outline' | 'ghost' | 'soft' | 'text' | 'icon';
type Color = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
type Size = 'sm' | 'md' | 'lg';

export default function ButtonExplorer() {
  const [variant, setVariant] = React.useState<Variant>('solid');
  const [color, setColor] = React.useState<Color>('primary');
  const [size, setSize] = React.useState<Size>('md');
  const [loading, setLoading] = React.useState(false);
  const [loadingDelay, setLoadingDelay] = React.useState(150);
  const [disabled, setDisabled] = React.useState(false);
  const [startIcon, setStartIcon] = React.useState(true);
  const [endIcon, setEndIcon] = React.useState(false);
  const [iconOnly, setIconOnly] = React.useState(false);
  const [groupMode, setGroupMode] = React.useState(false);
  const [toggleMode, setToggleMode] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const variants: Variant[] = ['solid', 'outline', 'ghost', 'soft', 'text', 'icon'];
  const colors: Color[] = ['primary', 'success', 'warning', 'danger', 'neutral'];
  const sizes: Size[] = ['sm', 'md', 'lg'];

  // helper to produce a prop string (JSX-friendly)
  const propStr = (name: string, value: any) => {
    if (typeof value === 'string') return `${name}="${value}"`;
    if (typeof value === 'boolean') return value ? name : '';
    return `${name}={${JSON.stringify(value)}}`;
  };

  // generate code depending on current preview mode
  const generateCode = (): string => {
    const imports: string[] = [];
    const props: string[] = [];
    // common props for single button
    if (variant && variant !== 'solid') props.push(`variant="${variant}"`);
    if (color && color !== 'primary') props.push(`color="${color}"`);
    if (size && size !== 'md') props.push(`size="${size}"`);
    if (loading) props.push(`loading${loadingDelay !== 150 ? ` loadingDelay={${loadingDelay}}` : ''}`);
    if (disabled) props.push('disabled');
    if (startIcon && !iconOnly) props.push('startIcon={<DemoIcon />}');
    if (endIcon && !iconOnly) props.push('endIcon={<DemoIcon />}');
    if (iconOnly) props.push('aria-label="icon"');

    // If both group and toggle active -> show ReToggleButtonGroup example
    if (groupMode && toggleMode) {
      imports.push("import React from 'react';", "import { ReToggleButton } from '@reark/ui';", "import { ReToggleButtonGroup } from '@reark/ui';");
      return [
        ...imports,
        '',
        'function ToggleGroupExample() {',
        '  const [value, setValue] = React.useState("b");',
        '  return (',
        `    <ReToggleButtonGroup value={value} onChange={(v) => setValue(v)} ariaLabel="toggle group">`,
        `      <ReToggleButton value="a" ${props.join(' ')}>A</ReToggleButton>`,
        `      <ReToggleButton value="b" ${props.join(' ')}>B</ReToggleButton>`,
        `      <ReToggleButton value="c" ${props.join(' ')}>C</ReToggleButton>`,
        '    </ReToggleButtonGroup>',
        '  );',
        '}',
      ].join('\n');
    }

    // If only group mode -> ReButtonGroup example
    if (groupMode) {
      imports.push("import React from 'react';", "import { ReButton } from '@reark/ui';", "import { ReButtonGroup } from '@reark/ui';");
      return [
        ...imports,
        '',
        'function ButtonGroupExample() {',
        '  return (',
        `    <ReButtonGroup buttonVariant="outline" color="${color}" size="${size}">`,
        `      <ReButton ${props.join(' ')}>Left</ReButton>`,
        `      <ReButton ${props.join(' ')}>Center</ReButton>`,
        `      <ReButton ${props.join(' ')}>Right</ReButton>`,
        '    </ReButtonGroup>',
        '  );',
        '}',
      ].join('\n');
    }

    // If only toggle mode -> controlled ReToggleButton example
    if (toggleMode) {
      imports.push("import React from 'react';", "import { ReToggleButton } from '@reark/ui';");
      return [
        ...imports,
        '',
        'function ToggleExample() {',
        '  const [pressed, setPressed] = React.useState(false);',
        '  return (',
        `    <ReToggleButton pressed={pressed} onPressedChange={(v) => setPressed(v)} ${props.join(' ')}>`,
        '      {pressed ? "On" : "Off"}',
        '    </ReToggleButton>',
        '  );',
        '}',
      ].join('\n');
    }

    // default single button example
    imports.push("import React from 'react';", "import { ReButton } from '@reark/ui';");
    return [
      ...imports,
      '',
      'function ButtonExample() {',
      '  return (',
      `    <ReButton ${props.join(' ')}>Label</ReButton>`,
      '  );',
      '}',
    ].join('\n');
  };

  // preview renderer
  const PreviewSingle = () => {
    const props: any = {
      variant,
      color,
      size,
      loading,
      loadingDelay,
      disabled,
    };
    if (startIcon) props.startIcon = <DemoIcon />;
    if (endIcon) props.endIcon = <DemoIcon />;
    if (iconOnly) props['aria-label'] = 'icon';
    return (
      <div>
        <ReButton {...props}>{iconOnly ? null : 'Button'}</ReButton>
      </div>
    );
  };

  const PreviewGroup = () => {
    return (
      <ReButtonGroup buttonVariant="outline" color={color} size={size}>
        <ReButton {...{ variant, color, size, loading, loadingDelay, disabled }} startIcon={<DemoIcon />}>
          Left
        </ReButton>
        <ReButton {...{ variant, color, size, loading, loadingDelay, disabled }}>Center</ReButton>
        <ReButton {...{ variant, color, size, loading, loadingDelay, disabled }} endIcon={<DemoIcon />}>
          Right
        </ReButton>
      </ReButtonGroup>
    );
  };

  const PreviewToggle = () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <ReToggleButton pressed={pressed} onPressedChange={(v) => setPressed(v)} variant={variant} color={color} size={size}>
        {pressed ? 'On' : 'Off'}
      </ReToggleButton>
      <span>Pressed: {String(pressed)}</span>
    </div>
  );

  const code = React.useMemo(() => generateCode(), [variant, color, size, loading, loadingDelay, disabled, startIcon, endIcon, iconOnly, groupMode, toggleMode]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      // small visual feedback
      // eslint-disable-next-line no-alert
      // use non-blocking small UI. For now alert to confirm success.
      // In real docs use toast; here quick alert is fine.
      alert('Code copied to clipboard');
    } catch {
      alert('Copy failed — select & copy manually');
    }
  };

  // terminal-style window header
  const Terminal = ({ children }: { children: React.ReactNode }) => (
    <div style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 6px 18px rgba(2,6,23,0.06)', marginTop: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'linear-gradient(180deg, rgba(255,255,255,0.04), transparent)' }}>
        <div style={{ width: 12, height: 12, borderRadius: 999, background: '#ff5f56' }} />
        <div style={{ width: 12, height: 12, borderRadius: 999, background: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: 999, background: '#27c93f' }} />
        <div style={{ marginLeft: 'auto' }}>
          <button onClick={copyToClipboard} style={{ padding: '6px 10px', borderRadius: 8, border: 'none', background: 'var(--re-color-primary)', color: '#fff', cursor: 'pointer' }}>
            Copy
          </button>
        </div>
      </div>
      <div style={{ background: '#0f1720', color: '#cfe8ff', padding: 12, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", monospace', fontSize: 13 }}>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{code}</pre>
      </div>
    </div>
  );

  return (
    <div>
      <h2>Button Explorer</h2>

      <ReBox css={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <div style={{ minWidth: 260 }}>
          <h4 style={{ marginTop: 0 }}>Variants</h4>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {variants.map((v) => (
              <button
                key={v}
                onClick={() => {
                  setVariant(v);
                  if (v === 'icon') setIconOnly(true);
                  else setIconOnly(false);
                }}
                style={{
                  padding: '6px 10px',
                  borderRadius: 6,
                  border: variant === v ? '2px solid var(--re-color-primary)' : '1px solid rgba(0,0,0,0.06)',
                  background: variant === v ? 'var(--re-color-primary)' : 'transparent',
                  color: variant === v ? '#fff' : 'inherit',
                  cursor: 'pointer',
                }}
              >
                {v}
              </button>
            ))}
          </div>

          <h4>Colors</h4>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{
                  padding: '6px 10px',
                  borderRadius: 6,
                  border: color === c ? '2px solid var(--re-color-primary)' : '1px solid rgba(0,0,0,0.06)',
                  background: `var(--re-color-${c})`,
                  color: c === 'warning' || c === 'neutral' ? 'black' : 'white',
                  cursor: 'pointer',
                }}
              >
                {c}
              </button>
            ))}
          </div>

          <h4>Sizes</h4>
          <div style={{ display: 'flex', gap: 8 }}>
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  padding: '6px 10px',
                  borderRadius: 6,
                  border: size === s ? '2px solid var(--re-color-primary)' : '1px solid rgba(0,0,0,0.06)',
                  background: size === s ? 'var(--re-color-primary)' : 'transparent',
                  color: size === s ? '#fff' : 'inherit',
                  cursor: 'pointer',
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <h4>Options</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="checkbox" checked={loading} onChange={(e) => setLoading(e.target.checked)} /> loading
            </label>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> disabled
            </label>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="checkbox" checked={startIcon} onChange={(e) => setStartIcon(e.target.checked)} /> startIcon
            </label>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="checkbox" checked={endIcon} onChange={(e) => setEndIcon(e.target.checked)} /> endIcon
            </label>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="checkbox" checked={iconOnly} onChange={(e) => setIconOnly(e.target.checked)} /> iconOnly
            </label>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="checkbox" checked={groupMode} onChange={(e) => setGroupMode(e.target.checked)} /> group
            </label>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="checkbox" checked={toggleMode} onChange={(e) => setToggleMode(e.target.checked)} /> toggle
            </label>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              delay:{' '}
              <input
                type="number"
                value={loadingDelay}
                onChange={(e) => setLoadingDelay(Number(e.target.value) || 0)}
                style={{ width: 80 }}
              />
            </label>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h4 style={{ marginTop: 0 }}>Preview</h4>
          <div style={{ padding: 12, borderRadius: 8, background: 'var(--re-surface)' }}>
            {groupMode ? <PreviewGroup /> : toggleMode ? <PreviewToggle /> : <PreviewSingle />}
          </div>

          <h4 style={{ marginTop: 12 }}>Generated code</h4>
          <Terminal>
            {code}
          </Terminal>
        </div>
      </ReBox>

      <hr />
    </div>
  );
}
