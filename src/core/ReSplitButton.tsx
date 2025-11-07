import React from 'react';
import { ReButton } from './ReButton';
import { cx } from './cx';

export type ReSplitButtonProps = {
  label?: React.ReactNode;
  options: string[];
  onSelect?: (option: string) => void;
  onClick?: () => void;
  className?: string;
};

export default function ReSplitButton({ label, options, onSelect, onClick, className }: ReSplitButtonProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  return (
    <div ref={ref} className={cx('reark-split-button', className)} style={{ display: 'inline-flex', position: 'relative' }}>
      <ReButton onClick={() => { onClick?.(); setOpen(false); }}>{label}</ReButton>
      <ReButton aria-label="open menu" onClick={() => setOpen((s) => !s)} style={{ borderLeft: '1px solid rgba(0,0,0,0.08)' }}>
        ▾
      </ReButton>

      {open && (
        <ul className="reark-split-menu" style={{ position: 'absolute', top: '100%', right: 0, marginTop: 6, listStyle: 'none', padding: 6, background: 'white', boxShadow: '0 6px 18px rgba(0,0,0,0.08)', borderRadius: 6 }}>
          {options.map((opt) => (
            <li key={opt} style={{ margin: 0 }}>
              <button
                style={{ display: 'block', width: '100%', padding: '8px 12px', background: 'transparent', border: 0, textAlign: 'left' }}
                onClick={() => { onSelect?.(opt); setOpen(false); }}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
