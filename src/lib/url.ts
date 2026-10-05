/**
 * Normalise a pathname to its public form. The build uses `format: "file"`,
 * so `Astro.url.pathname` can be `/details.html` or `/index.html`.
 */
export function cleanPath(pathname: string): string {
  return pathname.replace(/(\/index)?\.html$|\/$/, "") || "/";
}
