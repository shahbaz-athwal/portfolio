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

const [font, avatar] = await Promise.all([
  asset("fonts/inter-variable.woff2"),
  asset("images/profile.png"),
]);
const renderer = new Renderer();
await renderer.registerFont({ name: "Inter", data: font });

export async function renderOgImage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const node = container({
    tw: "flex h-full w-full flex-col justify-between bg-[#0c0a09] p-20 text-stone-50",
    style: {
      fontFamily: "Inter",
      backgroundImage:
        "radial-gradient(circle at 85% 0%, rgba(120,113,108,0.35), transparent 55%)",
    },
    children: [
      container({
        tw: "flex flex-col",
        children: [
          text({
            text: title,
            tw: "text-[72px] font-bold leading-[1.05] tracking-tight",
          }),
          text({
            text: description,
            tw: "mt-6 max-w-[900px] text-[30px] leading-snug text-stone-400",
          }),
        ],
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
