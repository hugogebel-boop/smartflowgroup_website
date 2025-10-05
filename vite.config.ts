import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/smartflow.website.new/', // 👈 important pour GitHub Pages
})
