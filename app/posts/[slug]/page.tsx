import { notFound } from "next/navigation";

import LightboxGallery from "@/components/lightbox/LightboxGallery";
import Markdown from "@/components/markdown/Markdown";
import { extractImages } from "@/lib/markdown";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      images: post.meta.image ? [{ url: post.meta.image }] : undefined,
    },
  };
}

function formatDate(date: Date | null) {
  if (!date) return null;
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const slides = extractImages(post.content);

  return (
    <main className="pt-6">
      <article>
        {post.meta.image ? (
          <div className="mb-8 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <img
              src={post.meta.image}
              alt=""
              className="h-56 w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : null}

        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {post.meta.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            {post.meta.pinned ? (
              <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-xs font-semibold text-white dark:bg-white dark:text-zinc-900">
                置顶
              </span>
            ) : null}

            {post.meta.category ? (
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs dark:border-zinc-800 dark:bg-zinc-950">
                {post.meta.category}
              </span>
            ) : null}

            {formatDate(post.meta.publishedAt) ? (
              <span>{formatDate(post.meta.publishedAt)}</span>
            ) : null}

            {post.meta.tags?.length ? (
              <span className="flex flex-wrap gap-1">
                {post.meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            ) : null}
          </div>

          {post.meta.description ? (
            <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {post.meta.description}
            </p>
          ) : null}
        </header>

        <LightboxGallery slides={slides}>
          <div className="pb-4">
            <Markdown content={post.content} />
          </div>
        </LightboxGallery>
      </article>
    </main>
  );
}
