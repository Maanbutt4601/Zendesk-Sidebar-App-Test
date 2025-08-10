import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'app/assets',
    rollupOptions: {
      input: 'index.html', // Changed from 'src/main.jsx'
      output: {
        entryFileNames: 'index.js',
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'index.css') return 'index.css'
          return assetInfo.name
        }
      }
    }
  },
  server: {
    port: 3000,
    host: true
  }
})