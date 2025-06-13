import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server :{
    // host: "24.144.126.228",
    host: "10.0.60.125",
    port: "3000",
  }
})
