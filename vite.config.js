import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import viteCompression from "vite-plugin-compression";

// 1.inline assets in index.html
// 2.compressed it to index.html.gz
// 3.remove unused assets

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "es2015",
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    brotliSize: false
  },
  plugins: [
    viteSingleFile({
      deleteInlinedFiles: true
    }),
    viteCompression({
      deleteOriginFile: true,
    }),
    // viteClean(),
  ],
});

