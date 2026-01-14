import Link from "next/link";

import { getAllPostsMeta } from "@/lib/posts";

export const dynamic = "force-static";

function formatDate(date: Date | null) {
  if (!date) return null;
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export default async function Home() {
  const posts = await getAllPostsMeta();

  return (
    <main className="pt-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            文章
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Markdown 即源码，无后台，静态为主。
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
          >
            <Link href={`/posts/${post.slug}`} className="block">
              <div className="relative">
                <div className="h-44 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-zinc-200 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950" />
                  )}
                </div>

                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {post.pinned ? (
                    <span className="rounded-full bg-zinc-900/90 px-2.5 py-1 text-xs font-semibold text-white dark:bg-white/90 dark:text-zinc-900">
                      置顶
                    </span>
                  ) : null}
                  {post.category ? (
                    <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-zinc-900 backdrop-blur dark:bg-zinc-950/80 dark:text-zinc-50">
                      {post.category}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="px-5 py-5">
                <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {post.title}
                </h2>

                {post.description ? (
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {post.description}
                  </p>
                ) : null}

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  {formatDate(post.publishedAt) ? (
                    <span>{formatDate(post.publishedAt)}</span>
                  ) : null}

                  {post.tags?.length ? (
                    <span className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 dark:border-zinc-800 dark:bg-zinc-900"
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                  ) : null}
                </div>
              </div>
            </Link>
          </article>
        ))}

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
            还没有文章。请将 markdown 放到 <code>content/posts</code>。
          </div>
        ) : null}
      </div>
    </main>
  );
}
