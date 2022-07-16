import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "./src/interface",
  base: "./",
  build: {
    outDir: "./../../dist/resources/main/interface",
    emptyOutDir: false,
  },
});
