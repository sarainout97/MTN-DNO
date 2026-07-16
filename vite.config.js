import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// SINGLEFILE=1 npm run build → one self-contained HTML (fonts inlined) for
// sharing/publishing; default build is a normal static bundle for hosting.
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(process.env.SINGLEFILE ? [viteSingleFile()] : [])],
  build: process.env.SINGLEFILE ? { assetsInlineLimit: 100000000 } : {},
}))
