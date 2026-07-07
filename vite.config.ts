import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  base: '/Gulaboo-s-Birthday/',
  plugins: [
    react(),
    imagetools({
      defaultDirectives: () =>
        new URLSearchParams('w=800&format=webp&quality=80'),
    }),
  ],
})
