import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: il sito e' pubblicato su https://<utente>.github.io/volley-schemi/
export default defineConfig({
  base: '/volley-schemi/',
  plugins: [react()],
})
