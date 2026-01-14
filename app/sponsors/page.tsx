import { getAllSponsors } from "@/lib/sponsors";

import { normalizeAssetUrl } from "@/lib/markdown";

export const dynamic = "force-static";

export default async function SponsorsPage() {
  const sponsors = await getAllSponsors();

  return (
    <main className="pt-6">
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        赞助
      </h1>
      <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        仓库内 <code>content/sponsors</code> 下每一个 JSON 代表一个赞助者，按名称 A~Z 排序。
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.name}
            className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="h-12 w-12 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
              {sponsor.avatar ? (
                <img
                  src={normalizeAssetUrl(sponsor.avatar)}
                  alt={sponsor.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : null}
            </div>

            <div className="min-w-0">
              <div className="truncate font-semibold text-zinc-900 dark:text-zinc-50">
                {sponsor.name}
              </div>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                {sponsor.amount ? <span>金额：{sponsor.amount}</span> : null}
                {sponsor.date ? <span>日期：{sponsor.date}</span> : null}
              </div>
            </div>
          </div>
        ))}

        {sponsors.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400 sm:col-span-2">
            暂无赞助者。
          </div>
        ) : null}
      </div>
    </main>
  );
}
