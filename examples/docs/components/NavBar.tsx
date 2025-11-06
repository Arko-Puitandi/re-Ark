// examples/docs/components/NavBar.tsx
import React from 'react';
import { cx } from '../../../src/core/cx';

const NAV_ITEMS = [
  { id: 'components', label: 'Components', route: 'components', description: 'Browse UI components' },
  { id: 'playground', label: 'Playground', route: 'playground', description: 'Live code sandbox' },
  { id: 'about', label: 'About', route: 'about', description: 'Project info' },
];

export default function NavBar({
  route,
  setRoute,
  onToggleTheme,
  version = 'v0.1.0',
  theme = 'light',
}: {
  route: string;
  setRoute: (r: string) => void;
  onToggleTheme?: () => void;
  version?: string;
  theme?: 'light' | 'dark';
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');

  const filtered = React.useMemo(() => {
    if (!query) return NAV_ITEMS;
    const q = query.toLowerCase();
    return NAV_ITEMS.filter((i) => i.label.toLowerCase().includes(q) || (i.description || '').toLowerCase().includes(q));
  }, [query]);

  React.useEffect(() => {
    setOpen(false);
  }, [route]);

  const themeIcon = theme === 'dark' ? '🌙' : '☀️';

  return (
    <div className="docs-navbar">
      <div className="docs-navbar-top">
        <div className="docs-brand" onClick={() => setRoute('components')} role="button" tabIndex={0}>
          <div className="brand-logo">Re-ARK</div>
          <div className="brand-meta">{version}</div>
        </div>

        <div className="docs-controls">
          <button
            className="theme-btn"
            onClick={() => {
              onToggleTheme?.();
            }}
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {themeIcon}
          </button>

          <button
            className="hamburger"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle navigation"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>

      <div className={cx('docs-navbar-body', open ? 'open' : '')}>
        <div className="nav-search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components..."
            aria-label="Search components"
          />
        </div>

        <nav className="docs-nav">
          {filtered.map((item) => {
            const active = route === item.route;
            return (
              <a
                key={item.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setRoute(item.route);
                }}
                className={cx('docs-nav-link', active && 'active')}
                title={item.description}
              >
                <span className="nav-label">{item.label}</span>
                <br/>
                <small className="nav-desc">{item.description}</small>
              </a>
            );
          })}
        </nav>

        <div className="docs-footer">
          <small>Built with Re-ARK</small>
        </div>
      </div>
    </div>
  );
}
