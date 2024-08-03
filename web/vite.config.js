import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "js/[name].js",
        assetFileNames: "css/[name].[ext]",
      },
    },
  },
});
