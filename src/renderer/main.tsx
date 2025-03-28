import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

// Ensure Electron's IPC is available in the renderer context
// @ts-ignore
window.electron = window.electron || { ipcRenderer: require('electron').ipcRenderer };

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
); 