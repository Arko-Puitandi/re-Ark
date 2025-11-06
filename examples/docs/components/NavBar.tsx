// examples/docs/components/NavBar.tsx
import React from 'react';
import { cx } from '../../../src/core/cx';

const NAV_ITEMS = [
  { id: 'components', label: 'Components', route: 'components', description: 'Browse UI components', children: [
    { id: 'components-buttons', label: 'Buttons', route: 'components/buttons' }
  ] },
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
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const [query, setQuery] = React.useState('');

  React.useEffect(() => setOpen(false), [route]);

  const filtered = React.useMemo(() => {
    if (!query) return NAV_ITEMS;
    const q = query.toLowerCase();
    return NAV_ITEMS.filter((i) => i.label.toLowerCase().includes(q) || (i.description || '').toLowerCase().includes(q));
  }, [query]);

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
            onClick={() => onToggleTheme?.()}
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
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
            const active = route === item.route || route.startsWith(item.route + '/');
            return (
              <div key={item.id}>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setRoute(item.route); }}
                  className={cx('docs-nav-link', active && 'active')}
                  title={item.description}
                >
                  <span className="nav-label">{item.label}</span>
                  <br/>
                  <small className="nav-desc">{item.description}</small>
                </a>

                {/* children links */}
                {item.children?.length ? (
                  <div style={{ paddingLeft: 12, marginTop: 4 }}>
                    {item.children.map((c) => {
                      const activeChild = route === c.route;
                      return (
                        <a
                          key={c.id}
                          href="#"
                          onClick={(e) => { e.preventDefault(); setRoute(c.route); }}
                          className={cx('docs-nav-link', activeChild && 'active')}
                          style={{ fontSize: 13, padding: '6px 8px' }}
                        >
                          {c.label}
                        </a>
                      );
                    })}
                  </div>
                ) : null}
              </div>
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
