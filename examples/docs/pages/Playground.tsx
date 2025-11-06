// examples/docs/pages/PlaygroundPage.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';

const defaultCode = `import React from 'react';
import { createRoot } from 'react-dom/client';
import { ReBox } from '../../src/core/ReBox';
import { ReButton } from '../../src/core/ReButton';

function Demo() {
  return (
    <div style={{ padding: 12 }}>
      <h3>Playground Demo</h3>
      <ReBox css={{ display: 'flex', gap: 12 }}>
        <ReButton onClick={() => alert('hello')}>Say hello</ReButton>
        <ReButton variant="outline">Outline</ReButton>
      </ReBox>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<Demo />);`;

export default function PlaygroundPage() {
  const [code, setCode] = React.useState(defaultCode);
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

  // build the inner iframe HTML
  const buildPreview = (codeStr: string) => `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <style>
          html,body,#root{height:100%;margin:0;padding:0;}
          body{font-family:sans-serif;background:#fff;color:#111;}
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          (function() {
            const lib = window.parent && window.parent.__REARK__;
            if (!lib) {
              document.getElementById('root').innerText =
                'Playground requires Re-ARK runtime from parent.';
              return;
            }
            const { React, createRoot, ReBox, ReButton } = lib;
            try {
              const fn = new Function('React','createRoot','ReBox','ReButton', ${JSON.stringify(
                codeStr
              )});
              fn(React, createRoot, ReBox, ReButton);
            } catch (err) {
              const pre = document.createElement('pre');
              pre.style.color = 'crimson';
              pre.innerText = String(err);
              document.body.appendChild(pre);
            }
          })();
        </script>
      </body>
    </html>`;

  function runPreview() {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument;
    if (!doc) return;
    doc.open();
    doc.write(buildPreview(code));
    doc.close();
  }

  // expose runtime for iframe use
  React.useEffect(() => {
    (async () => {
      const { ReBox } = await import('../../../src/core/ReBox');
      const { ReButton } = await import('../../../src/core/ReButton');
      // expose React and createRoot + components
      (window as any).__REARK__ = { React, createRoot, ReBox, ReButton };
    })();
  }, []);

  return (
    <div>
      <h1>Playground</h1>
      <div style={{ marginBottom: 10 }}>
        <button onClick={runPreview}>Run</button>
      </div>
      <div className="playground">
        <textarea value={code} onChange={(e) => setCode(e.target.value)} />
        <iframe ref={iframeRef} title="preview" />
      </div>
      <p style={{ marginTop: 8, color: '#666', fontSize: 13 }}>
        Tip: Edit the code on the left and click <b>Run</b> to render inside the
        preview. The iframe uses React + your Re-ARK components from the parent
        window.
      </p>
    </div>
  );
}
