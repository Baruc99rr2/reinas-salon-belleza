// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // URL pública del sitio: ÚNICO lugar donde está escrita. Canonical, Open Graph, JSON-LD, sitemap y
  // robots.txt la toman de acá (Astro.site / context.site).
  site: "https://reinas-salon-belleza.vercel.app",
  integrations: [
    sitemap({
      // La 404 no es una página para indexar.
      filter: (page) => !/\/404\/?$/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
