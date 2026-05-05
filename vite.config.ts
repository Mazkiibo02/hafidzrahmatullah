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
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('react/jsx-runtime')) {
            return 'react-core';
          }
          if (id.includes('framer-motion') || id.includes('/gsap')) {
            return 'animation';
          }
          if (id.includes('@radix-ui')) {
            return 'ui';
          }
          if (id.includes('recharts')) {
            return 'charts';
          }
        },
      },
    },
  },
}));
