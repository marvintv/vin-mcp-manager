import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock de window.electron para los tests
Object.defineProperty(window, 'electron', {
  value: {
    ipcRenderer: {
      invoke: vi.fn()
    }
  },
  writable: true
}); 