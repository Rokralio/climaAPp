import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const baseUrl = process.env.VITE_BASE_URL || '/climaapp/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: baseUrl,
  define: {
  'import.meta.env': import.meta.env,
  }
})
