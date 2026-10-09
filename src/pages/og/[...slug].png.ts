import type { APIRoute, GetStaticPaths } from "astro";
import { pages } from "@/data/site";
import { renderOgImage } from "@/lib/og";
import { getPosts } from "@/lib/posts";

type Props = { title: string; description: string };

/** One image per `pages` entry and per post; Base links to them. */
export const getStaticPaths = (async () => {
  const staticPages = Object.entries(pages).map(([slug, props]) => ({
    slug,
    props,
  }));
  const posts = (await getPosts()).map((post) => ({
    slug: `blog/${post.id}`,
    props: { title: post.data.title, description: post.data.description },
  }));
  return [...staticPages, ...posts].map(({ slug, props }) => ({
    params: { slug },
    props,
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<Props> = async ({ props }) => {
  const png = await renderOgImage(props);
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
};
