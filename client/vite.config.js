import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['@apollo/client', 'graphql']
  },
  optimizeDeps: {
    exclude: ['@apollo/client']
  }

})
