import rss from "@astrojs/rss";
import { getPosts } from "../utils/posts";
import site from "../data/site.json";

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: site.title,
    description: site.description,
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.dek || "",
      pubDate: p.data.date,
      link: `/posts/${p.slug}`,
    })),
  });
}
