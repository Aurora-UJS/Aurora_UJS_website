// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Deploy target: GitHub Pages project site.
// https://aurora-ujs.github.io/Aurora_UJS_website/
// If you later move to a custom domain, set `site` to that domain, change
// `base` to "/", and add a single-line `public/CNAME`.
export default defineConfig({
  site: "https://aurora-ujs.github.io",
  base: "/Aurora_UJS_website",
  trailingSlash: "ignore",
  integrations: [sitemap()],
  vite: {
    // Cast silences a harmless type clash between Astro's bundled Vite and
    // @tailwindcss/vite's Vite peer (build is unaffected).
    plugins: [/** @type {any} */ (tailwindcss())],
    resolve: {
      alias: {
        "@": new URL("./src", import.meta.url).pathname,
      },
    },
  },
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      wrap: true,
    },
  },
});
