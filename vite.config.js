import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // La misma base sirve al probar localmente y al publicar en GitHub Pages.
  base: '/PFY2201-Exp2-S6-tienda-videojuegos/',
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  preview: { host: '127.0.0.1', port: 4173, strictPort: true },
});
