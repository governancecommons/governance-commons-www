import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://governancecommons.org",
  output: "static",
  srcDir: "./site/src",
  publicDir: "./public",
});
