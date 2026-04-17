import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["moral-morgan-glen-impressed.trycloudflare.com"],
  },
  preview: {
    allowedHosts: ["moral-morgan-glen-impressed.trycloudflare.com"],
  },
});
