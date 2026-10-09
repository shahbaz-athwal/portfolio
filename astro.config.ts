import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  // Single canonical origin; `site.url` in src/data/site.ts reads it via import.meta.env.SITE.
  site: "https://shbz-me.vercel.app",
  output: "static",
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [mdx(), sitemap()],
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Inter",
      cssVariable: "--font-inter",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/inter-variable.woff2"],
            weight: "100 900",
            style: "normal",
          },
        ],
      },
    },
  ],
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark-default" },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
