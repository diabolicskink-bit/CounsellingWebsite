import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: isSsrBuild
    ? {
        copyPublicDir: false,
        emptyOutDir: true,
        outDir: ".prerender/server",
        rollupOptions: {
          output: {
            entryFileNames: "entry-server.js",
          },
        },
      }
    : undefined,
  server: {
    allowedHosts: [".trycloudflare.com"],
  },
  preview: {
    allowedHosts: [".trycloudflare.com"],
  },
}));
