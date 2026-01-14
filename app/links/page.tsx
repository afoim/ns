import Link from "next/link";

import { getAllFriendLinks } from "@/lib/links";
import { normalizeAssetUrl } from "@/lib/markdown";

export const dynamic = "force-static";

export default async function LinksPage() {
  const links = await getAllFriendLinks();

  return (
    <main className="pt-6">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        友链
      </h1>
      <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        仓库内 <code>content/links</code> 下每一个 JSON 代表一个友链，按名称 A~Z 排序。
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {links.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="h-12 w-12 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
              {item.avatar ? (
                <img
                  src={normalizeAssetUrl(item.avatar)}
                  alt={item.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : null}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className="truncate font-semibold text-zinc-900 dark:text-zinc-50">
                  {item.name}
                </div>
                <span className="text-xs text-zinc-400 group-hover:text-zinc-500 dark:text-zinc-600 dark:group-hover:text-zinc-400">
                  ↗
                </span>
              </div>
              {item.description ? (
                <div className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </div>
              ) : null}
              <div className="mt-1 truncate text-xs text-zinc-500 dark:text-zinc-500">
                {item.url}
              </div>
            </div>
          </a>
        ))}

        {links.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400 sm:col-span-2">
            暂无友链。
          </div>
        ) : null}
      </div>

      <div className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          返回 <Link href="/" className="underline">文章列表</Link>
        </p>
      </div>
    </main>
  );
}
