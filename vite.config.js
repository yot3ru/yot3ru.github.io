import { defineConfig } from "vite";

export default defineConfig({
  // Relative URLs keep the built site working from a GitHub Pages project path
  // (for example /lufi/) as well as from the domain root.
  base: "./",
  build: { target: "es2020", assetsInlineLimit: 2048 },
  server: { host: true },
});
