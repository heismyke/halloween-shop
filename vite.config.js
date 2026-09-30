import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Page routes must load the same root-level assets, including on a direct visit.
export default defineConfig({ plugins: [react()], base: '/' })
