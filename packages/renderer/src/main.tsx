import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { DrawingPathProvider } from './context/drawing-path-context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DrawingPathProvider>
      <App />
    </DrawingPathProvider>
  </StrictMode>
);
