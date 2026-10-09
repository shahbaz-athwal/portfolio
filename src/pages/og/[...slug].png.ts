import type { APIRoute, GetStaticPaths } from "astro";
import { pages } from "@/data/site";
import { renderOgImage } from "@/lib/og";
import { getPosts } from "@/lib/posts";

type Props = { title: string; description: string };

/** One image per `pages` entry and per post; Base links to them. */
export const getStaticPaths = (async () => [
  ...Object.entries(pages).map(([slug, props]) => ({
    params: { slug },
    props,
  })),
  ...(await getPosts()).map((post) => ({
    params: { slug: `blog/${post.id}` },
    props: { title: post.data.title, description: post.data.description },
  })),
]) satisfies GetStaticPaths;

export const GET: APIRoute<Props> = async ({ props }) => {
  return new Response(await renderOgImage(props), {
    headers: { "Content-Type": "image/png" },
  });
};
