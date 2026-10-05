import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Renderer } from "@takumi-rs/core";
import { container, image, text } from "@takumi-rs/helpers";
import { site } from "@/data/site";

/**
 * Open Graph images rendered at build time with Takumi
 * (https://takumi.kane.tw). Nodes accept Tailwind classes via `tw`.
 */

// Resolved from the project root: `import.meta.url` points into the bundle at build time.
const asset = (path: string) =>
  readFile(join(process.cwd(), "src/assets", path));

let renderer: Promise<{ renderer: Renderer; avatar: Buffer }> | undefined;

function setup() {
  renderer ??= (async () => {
    const [bold, regular, avatar] = await Promise.all([
      asset("fonts/Geist-Bold.ttf"),
      asset("fonts/Geist-Regular.ttf"),
      asset("images/profile.png"),
    ]);
    const r = new Renderer();
    await r.registerFont({ name: "Geist", data: bold, weight: 700 });
    await r.registerFont({ name: "Geist", data: regular, weight: 400 });
    return { renderer: r, avatar };
  })();
  return renderer;
}

export async function renderOgImage({
  title,
  description,
}: {
  title: string;
  description?: string | undefined;
}): Promise<Buffer> {
  const { renderer, avatar } = await setup();

  const node = container({
    tw: "flex h-full w-full flex-col justify-between bg-[#0c0a09] p-20 text-stone-50",
    style: {
      fontFamily: "Geist",
      backgroundImage:
        "radial-gradient(circle at 85% 0%, rgba(120,113,108,0.35), transparent 55%)",
    },
    children: [
      container({
        tw: "flex flex-col",
        children: [
          text(title, {}),
          ...(description ? [text(description, {})] : []),
        ].map((child, i) => ({
          ...child,
          tw:
            i === 0
              ? "text-[72px] font-bold leading-[1.05] tracking-tight"
              : "mt-6 max-w-[900px] text-[30px] leading-snug text-stone-400",
        })),
      }),
      container({
        tw: "flex items-center",
        children: [
          image({ src: avatar, width: 72, height: 72, tw: "rounded-full" }),
          container({
            tw: "ml-5 flex flex-col",
            children: [
              text({ text: site.name, tw: "text-[26px] font-bold" }),
              text({ text: site.role, tw: "text-[20px] text-stone-400" }),
            ],
          }),
        ],
      }),
    ],
  });

  return renderer.render(node, { width: 1200, height: 630, format: "png" });
}
