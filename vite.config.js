// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path from "path";

// Get the directory name in an ESM-compatible way
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],

  // Path Resolution Settings
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@styles": path.resolve(__dirname, "./src/styles"),
    },
  },

  // Development Server Settings
  server: {
    port: 3000, // Set the development server port
    open: true, // Automatically open the browser
    host: true, // Listen on all local IPs
    strictPort: false, // Allow fallback to another port if 3000 is taken
  },

  // Build Options
  build: {
    outDir: "dist", // Output directory for production build
    sourcemap: true, // Generate source maps for debugging
    // Optimize chunking strategy
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          router: ["react-router-dom"],
        },
      },
    },
  },

  // CSS Processing
  css: {
    // Enable CSS modules for .module.css files
    modules: {
      localsConvention: "camelCase",
    },
    // Enable source maps for CSS
    devSourcemap: true,
  },
});
