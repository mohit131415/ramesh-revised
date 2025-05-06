import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Adding proxy configuration to handle CORS issues
  server: {
    proxy: {
      // Proxy all requests to /api to the backend
      "/api": {
        target: "http://localhost/ramesh-be/be",
        changeOrigin: true,
        secure: false,
        // Rewrite the path to avoid duplicated "api" in the path
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
})
