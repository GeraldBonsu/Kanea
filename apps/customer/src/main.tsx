import React from 'react';
import ReactDOM from 'react-dom/client';
import './tokens.css';
import './app.css';
import App from './App';

async function prepare() {
  if (import.meta.env.DEV) {
    const { setupWorker } = await import('msw/browser');
    const { handlers } = await import('./mock/handlers');
    const worker = setupWorker(...handlers);
    await worker.start({ onUnhandledRequest: 'bypass' });
  }
}

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode><App /></React.StrictMode>
  );
});
