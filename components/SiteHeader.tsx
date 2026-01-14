import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 mb-10 border-b border-zinc-200 bg-zinc-50/80 px-6 py-4 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70">
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          2x Blog
        </Link>

        <nav className="flex items-center gap-4 text-sm text-zinc-700 dark:text-zinc-300">
          <Link
            href="/"
            className="hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            文章
          </Link>
          <Link
            href="/links"
            className="hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            友链
          </Link>
          <Link
            href="/sponsors"
            className="hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            赞助
          </Link>
        </nav>
      </div>
    </header>
  );
}
