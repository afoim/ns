import Link from "next/link";

export default function NotFound() {
  return (
    <main className="pt-16">
      <div className="rounded-2xl border border-zinc-200 bg-white p-10 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          页面不存在
        </h1>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          你访问的内容可能被移动或删除。
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          返回首页
        </Link>
      </div>
    </main>
  );
}
