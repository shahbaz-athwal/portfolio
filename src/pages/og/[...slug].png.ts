import type { APIRoute, GetStaticPaths } from "astro";
import { site } from "@/data/site";
import { renderOgImage } from "@/lib/og";
import { getPosts } from "@/lib/posts";

type Props = { title: string; description?: string };

/** One image per page; keys match the `og` prop passed to `Base`. */
export const getStaticPaths = (async () => {
  const pages: { slug: string; props: Props }[] = [
    {
      slug: "index",
      props: { title: site.name, description: site.description },
    },
    {
      slug: "details",
      props: {
        title: "Details",
        description: "Experience, education, and tech stack.",
      },
    },
    {
      slug: "contact",
      props: {
        title: "Contact",
        description: "Get in touch for questions or collaborations.",
      },
    },
    {
      slug: "blog",
      props: { title: "Blog", description: "Thoughts, notes, and ideas." },
    },
  ];
  const posts = (await getPosts()).map((post) => ({
    slug: `blog/${post.id}`,
    props: { title: post.data.title, description: post.data.description },
  }));
  return [...pages, ...posts].map(({ slug, props }) => ({
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
