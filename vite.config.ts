import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import viteImageMetaPlugin from "./src/utils/viteImageMetaPlugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    viteImageMetaPlugin(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2020',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          // React core — must be isolated, no catch-all fallback
          if (
            id.includes('/react-dom/') ||
            id.includes('/react/') ||
            id.includes('react/jsx-runtime') ||
            id.includes('react/jsx-dev-runtime') ||
            id.includes('scheduler')
          ) {
            return 'react-core';
          }
          // Router
          if (id.includes('react-router')) {
            return 'router';
          }
          // Animation libs
          if (id.includes('framer-motion')) {
            return 'framer-motion';
          }
          if (id.includes('/gsap') || id.includes('@gsap')) {
            return 'gsap';
          }
          if (id.includes('lenis')) {
            return 'lenis';
          }
          // UI primitives
          if (id.includes('@radix-ui')) {
            return 'ui';
          }
          // Heavy optional libs
          if (id.includes('recharts')) {
            return 'charts';
          }
          if (id.includes('react-pdf') || id.includes('pdfjs-dist')) {
            return 'pdf';
          }
          if (id.includes('@emailjs')) {
            return 'emailjs';
          }
          // Let Rollup handle remaining node_modules automatically (no explicit vendor chunk)
        },
      },
    },
  },
}));

