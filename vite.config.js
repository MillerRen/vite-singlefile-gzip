import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import viteCompression from 'vite-plugin-compression'

// 1.inline assets in index.html
// 2.compressed it to index.html.gz
// 3.remove unused assets

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    brotliSize: false,
    rollupOptions: {
      inlineDynamicImports: true,
      output: {
        manualChunks: () => 'everything.js'
      }
    }
  },
  plugins: [viteSingleFile(), viteCompression({
    deleteOriginFile: true
  }), viteClean()]
})

// clean up unused assets
function viteClean() {
  return {
      name: "vite:clean",
      transformIndexHtml: {
          enforce: "post",
          transform(html, ctx) {
              // Only use this plugin during build
              if (!ctx || !ctx.bundle)
                  return html;
              // Get the bundle
              for (const [, value] of Object.entries(ctx.bundle)) {
                  delete ctx.bundle[value.fileName]
              }
              return html
          },
      },
  };
}
