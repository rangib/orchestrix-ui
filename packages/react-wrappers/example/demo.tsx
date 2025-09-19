import React from 'react';
import { createRoot } from 'react-dom/client';
import { UxButton } from '../src/ux-button';
import '@orchestrix/components';

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h3>UxButton Demo</h3>
      <UxButton variant="primary">Hello</UxButton>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<App />);
}
