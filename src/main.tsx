
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeParse } from './services/back4app';

// Initialize Parse SDK before React app
const initializeApp = async () => {
  try {
    const initialized = initializeParse();
    if (!initialized) {
      console.warn('Back4App initialization failed. Some features may not work.');
    }
  } catch (error) {
    console.error('Error initializing Back4App:', error);
  }

  // Render the React app
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

initializeApp();
