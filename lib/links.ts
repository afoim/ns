import fs from "node:fs/promises";
import path from "node:path";

import { cache } from "react";

export type FriendLink = {
  name: string;
  avatar?: string;
  description?: string;
  url: string;
};

const linksDir = path.join(process.cwd(), "content", "links");

function normalizeLink(data: unknown): FriendLink | null {
  if (!data || typeof data !== "object") return null;
  const record = data as Record<string, unknown>;

  const name = typeof record.name === "string" ? record.name.trim() : "";
  const url = typeof record.url === "string" ? record.url.trim() : "";

  if (!name || !url) return null;

  return {
    name,
    url,
    avatar: typeof record.avatar === "string" ? record.avatar : undefined,
    description:
      typeof record.description === "string" ? record.description : undefined,
  };
}

export const getAllFriendLinks = cache(async (): Promise<FriendLink[]> => {
  let entries: string[] = [];

  try {
    entries = await fs.readdir(linksDir);
  } catch {
    return [];
  }

  const files = entries.filter((name) => name.toLowerCase().endsWith(".json"));

  const links = await Promise.all(
    files.map(async (file) => {
      try {
        const raw = await fs.readFile(path.join(linksDir, file), "utf8");
        return normalizeLink(JSON.parse(raw));
      } catch {
        return null;
      }
    }),
  );

  return links
    .filter((l): l is FriendLink => Boolean(l))
    .sort((a, b) => a.name.localeCompare(b.name, "en"));
});
