import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { site } from "@/data/site";
import { getPosts } from "@/lib/posts";

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  return rss({
    title: site.name,
    description: site.description,
    site: site.url,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
    })),
  });
};
