import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig(() => ({
  base: '/MTN-DNO/',
  plugins: [
    react(),
    ...(process.env.SINGLEFILE ? [viteSingleFile()] : [])
  ],
  build: process.env.SINGLEFILE
    ? {
        assetsInlineLimit: 100000000,
      }
    : {},
}))