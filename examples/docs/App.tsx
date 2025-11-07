// examples/docs/App.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import NavBar from './components/NavBar';
import { ReThemeProvider } from '../../src/themes/ReThemeProvider';
import { ReBox } from '../../src/core/ReBox';
import { ReButton } from '../../src/core/ReButton';
import ComponentsPage from './pages/ComponentsPage';
import ButtonsPage from './pages/ButtonsPage';
import PlaygroundPage from './pages/Playground';

// Expose components to window for playground
(window as any).__REARK__ = {
  ReBox,
  ReButton,
  React,
  createRoot
};

export default function App() {
  const [route, setRoute] = React.useState<'buttons' | 'components' | 'playground' | 'about'>('components');
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  function toggleTheme() {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  }

  function handleSetRoute(r: string) {
    setRoute(r as 'buttons' | 'components' | 'playground' | 'about');
  }

  return (
    <ReThemeProvider theme={theme}>
      <div className="docs-app">
       <aside className="docs-sidebar">
  <NavBar route={route} setRoute={handleSetRoute} onToggleTheme={toggleTheme} version="v0.1.0" theme={theme} />
</aside>

        <main className="docs-main" role="main">
          {route === 'buttons' && <ButtonsPage />}
          {route === 'components' && <ComponentsPage onNavigate={handleSetRoute} />}
          {route === 'playground' && <PlaygroundPage />}
          {route === 'about' && (
            <div>
              <h1>About Re-ARK</h1>
              <p>Re-ARK is a dependency-free React UI library built from first principles.</p>
            </div>
          )}
        </main>
      </div>
    </ReThemeProvider>
  );
}
