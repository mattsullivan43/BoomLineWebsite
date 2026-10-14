import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Custom domain (boomline.co) → root base.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  // Manifest lets scripts/prerender.mjs preload each page's own chunk.
  build: { manifest: true },
})
