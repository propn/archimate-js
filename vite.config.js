import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      'diagram-js': resolve(__dirname, 'node_modules/diagram-js')
    }
  },
  server: {
    port: 3000
  }
});