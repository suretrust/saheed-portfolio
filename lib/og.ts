/**
 * Shared OG image helpers.
 *
 * Used by app/projects/[slug]/opengraph-image.tsx and
 * app/writing/[slug]/opengraph-image.tsx. Fonts are bundled with the repo
 * under public/fonts/ to avoid runtime dependency on Google Fonts.
 */

import { readFile } from "fs/promises";
import { join } from "path";

export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_COLORS = {
  bg: "#f5efe1",
  ink: "#3a382f",
  inkSoft: "#5b554b",
  inkFaint: "#7c7567",
  accent: "#9c5a3c",
  line: "#cdc6b5",
} as const;

type FontDef = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500;
  style: "normal";
};

/**
 * Load the brand fonts. Cached per process so multi-slug builds reuse the
 * same buffers.
 */
let _fontsPromise: Promise<FontDef[]> | null = null;

export function loadOgFonts(): Promise<FontDef[]> {
  if (_fontsPromise) return _fontsPromise;
  const fontsDir = join(process.cwd(), "public", "fonts");
  _fontsPromise = (async () => {
    const [newsreader500, newsreader400, inter500, mono500] = await Promise.all([
      readFile(join(fontsDir, "Newsreader-Medium.ttf")),
      readFile(join(fontsDir, "Newsreader-Regular.ttf")),
      readFile(join(fontsDir, "Inter-Medium.ttf")),
      readFile(join(fontsDir, "JetBrainsMono-Medium.ttf")),
    ]);
    return [
      {
        name: "Newsreader",
        data: newsreader500.buffer.slice(
          newsreader500.byteOffset,
          newsreader500.byteOffset + newsreader500.byteLength
        ),
        weight: 500,
        style: "normal",
      },
      {
        name: "Newsreader",
        data: newsreader400.buffer.slice(
          newsreader400.byteOffset,
          newsreader400.byteOffset + newsreader400.byteLength
        ),
        weight: 400,
        style: "normal",
      },
      {
        name: "Inter",
        data: inter500.buffer.slice(
          inter500.byteOffset,
          inter500.byteOffset + inter500.byteLength
        ),
        weight: 500,
        style: "normal",
      },
      {
        name: "JetBrainsMono",
        data: mono500.buffer.slice(
          mono500.byteOffset,
          mono500.byteOffset + mono500.byteLength
        ),
        weight: 500,
        style: "normal",
      },
    ];
  })();
  return _fontsPromise;
}

export function brandDomain(siteUrl: string): string {
  return siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "").toUpperCase();
}
