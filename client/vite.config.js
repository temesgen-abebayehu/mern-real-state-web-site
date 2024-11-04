import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // changeOrigin: true, // This will help to change the origin of the host header to the target URL
        secure: false, // You don't need this unless working with https, but it's fine to leave it for localhost
      },
    },
  },
  plugins: [react()],
});
