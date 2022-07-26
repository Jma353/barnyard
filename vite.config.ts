import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({exportAsDefault: true})],
  server: {
    proxy: {
      '/v2/': {
        changeOrigin: true,
        target: 'https://barn.joepegs.com/',
      },
    },
  },
});
