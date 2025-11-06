import React from 'react';

export default function ExampleCard({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="example-card">
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <div>{children}</div>
    </div>
  );
}
