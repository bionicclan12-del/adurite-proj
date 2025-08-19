import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',   // ✅ this is the correct place for the base setting
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'], // keep this if Bolt added it
  },
})

