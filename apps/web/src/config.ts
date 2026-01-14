declare global {
  interface Window {
    _env_?: {
      API_URL?: string;
    };
  }
}

export const API_URL =
  window._env_?.API_URL || import.meta.env.VITE_API_URL || 'http://localhost:3000';
