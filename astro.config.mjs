import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// ⬇️ ПОСЛЕ ДЕПЛОЯ замени на реальный адрес сайта (например https://meridian.netlify.app
// или свой домен). От него зависят RSS, карта сайта и canonical-ссылки для поиска.
const SITE = "https://portfolio-blog-mehdi.netlify.app";

export default defineConfig({
  site: SITE,
  integrations: [sitemap()],
});
