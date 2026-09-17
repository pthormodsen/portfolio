import react from '@vitejs/plugin-react'
import process from 'node:process'
import { defineConfig } from 'vite'

const apiProxyTarget = process.env.VITE_API_PROXY_TARGET || 'http://localhost:3001'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { '/api/wpm': apiProxyTarget },
  },
})
