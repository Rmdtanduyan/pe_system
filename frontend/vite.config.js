import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import daisyui from 'daisyui'; // Import the daisyui plugin

export default defineConfig({
  plugins: [react(), daisyui],
});
