import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import LightboxImage from "@/components/lightbox/LightboxImage";
import { normalizeAssetUrl } from "@/lib/markdown";

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mt-10 scroll-mt-24 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-8 scroll-mt-24 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-6 scroll-mt-24 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mt-4 leading-7 text-zinc-800 dark:text-zinc-100">
            {children}
          </p>
        ),
        a: ({ href, children }) => {
          const url = href ? normalizeAssetUrl(href) : "";

          const isInternal = url.startsWith("/") || url.startsWith("#");

          const className =
            "font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-500 dark:text-zinc-50 dark:decoration-zinc-700 dark:hover:decoration-zinc-400";

          if (isInternal) {
            return (
              <Link href={url} className={className}>
                {children}
              </Link>
            );
          }

          return (
            <a
              href={href}
              className={className}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          );
        },
        ul: ({ children }) => (
          <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-800 marker:text-zinc-400 dark:text-zinc-100 dark:marker:text-zinc-600">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-zinc-800 marker:text-zinc-400 dark:text-zinc-100 dark:marker:text-zinc-600">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-7">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
            {children}
          </blockquote>
        ),
        hr: () => (
          <hr className="my-10 border-zinc-200 dark:border-zinc-800" />
        ),
        img: ({ src, alt }) => {
          const rawSrc = typeof src === "string" ? src : "";
          const normalized = rawSrc ? normalizeAssetUrl(rawSrc) : "";
          return <LightboxImage src={normalized} alt={alt} />;
        },
        code: ({ className, children }) => {
          const isBlock = Boolean(className);

          if (isBlock) {
            return (
              <pre className="mt-5 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
                <code className={className}>{children}</code>
              </pre>
            );
          }

          return (
            <code className="rounded-md border border-zinc-200 bg-zinc-50 px-1 py-0.5 font-mono text-[0.9em] text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
              {children}
            </code>
          );
        },
        table: ({ children }) => (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-sm">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border-b border-zinc-200 px-3 py-2 text-left font-semibold text-zinc-900 dark:border-zinc-800 dark:text-zinc-50">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border-b border-zinc-200 px-3 py-2 align-top text-zinc-800 dark:border-zinc-800 dark:text-zinc-100">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
