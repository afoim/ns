import { unified } from "unified";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";

export type MarkdownImage = {
  src: string;
  alt?: string;
};

export function normalizeAssetUrl(url: string): string {
  if (!url) return url;

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:") ||
    url.startsWith("blob:") ||
    /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(url)
  ) {
    return url;
  }

  if (url.startsWith("/") || url.startsWith("#")) return url;

  const withoutDots = url.replace(/^(\.\/)+/, "").replace(/^(\.\.\/)+/, "");
  return `/${withoutDots}`;
}

export function extractImages(markdown: string): MarkdownImage[] {
  const images: MarkdownImage[] = [];

  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown);

  visit(tree, "image", (node) => {
    if (!node || typeof node !== "object") return;

    const url = (node as { url?: unknown }).url;
    const alt = (node as { alt?: unknown }).alt;

    if (typeof url !== "string") return;

    const src = normalizeAssetUrl(url);
    const existing = images.find((img) => img.src === src);
    if (existing) return;

    images.push({
      src,
      alt: typeof alt === "string" ? alt : undefined,
    });
  });

  return images;
}
