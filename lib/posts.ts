import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { cache } from "react";

export type PostFrontMatter = {
  title: string;
  image?: string;
  published?: string;
  pinned?: boolean;
  category?: string;
  tags?: string[];
  description?: string;
};

export type PostMeta = PostFrontMatter & {
  slug: string;
  publishedAt: Date | null;
};

export type Post = {
  meta: PostMeta;
  content: string;
};

const postsDir = path.join(process.cwd(), "content", "posts");

function toDate(value: unknown): Date | null {
  if (typeof value !== "string") return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function normalizeFrontMatter(
  slug: string,
  data: Record<string, unknown>,
): PostMeta {
  const title = typeof data.title === "string" ? data.title : slug;

  const tags = Array.isArray(data.tags)
    ? data.tags.filter((t): t is string => typeof t === "string")
    : undefined;

  const published = typeof data.published === "string" ? data.published : undefined;

  return {
    slug,
    title,
    image: typeof data.image === "string" ? data.image : undefined,
    published,
    publishedAt: toDate(published),
    pinned: Boolean(data.pinned),
    category: typeof data.category === "string" ? data.category : undefined,
    tags,
    description: typeof data.description === "string" ? data.description : undefined,
  };
}

async function readPostFile(slug: string): Promise<Post> {
  const candidates = [
    path.join(postsDir, `${slug}.md`),
    path.join(postsDir, `${slug}.mdx`),
  ];

  const filePath = await (async () => {
    for (const candidate of candidates) {
      try {
        await fs.access(candidate);
        return candidate;
      } catch {
        // try next
      }
    }

    return null;
  })();

  if (!filePath) {
    throw new Error(`Post not found: ${slug}`);
  }

  const raw = await fs.readFile(filePath, "utf8");
  const parsed = matter(raw);

  return {
    meta: normalizeFrontMatter(slug, parsed.data as Record<string, unknown>),
    content: parsed.content.trim(),
  };
}

export const getAllPostSlugs = cache(async (): Promise<string[]> => {
  let entries: string[] = [];
  try {
    entries = await fs.readdir(postsDir);
  } catch {
    return [];
  }

  return entries
    .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
    .map((name) => name.replace(/\.(md|mdx)$/, ""))
    .sort();
});

export const getAllPostsMeta = cache(async (): Promise<PostMeta[]> => {
  const slugs = await getAllPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => readPostFile(slug)));

  return posts
    .map((p) => p.meta)
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;

      const aTime = a.publishedAt?.getTime() ?? 0;
      const bTime = b.publishedAt?.getTime() ?? 0;
      return bTime - aTime;
    });
});

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  try {
    return await readPostFile(slug);
  } catch {
    return null;
  }
});
