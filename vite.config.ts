import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// While the site lives at github.io/BoomLineWebsite/ we need the subpath base.
// Once boomline.co DNS is connected, change base back to '/'.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/BoomLineWebsite/',
  plugins: [react(), tailwindcss()],
})
