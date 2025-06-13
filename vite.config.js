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
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.js'],
    include: ['test/**/*.test.js'],
  },
  build: {
    lib: {
      entry: 'index.js',
      name: 'ArchimateJS',
      fileName: (format) => `archimate-js.${format}.js`
    },
    rollupOptions: {
      external: [
        'diagram-js',
        'diagram-js-direct-editing',
        'min-dash',
        'min-dom',
        'moddle',
        'moddle-xml'
      ]
    }
  }
});