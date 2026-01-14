"use client";

import { useLightbox } from "@/components/lightbox/LightboxGallery";

export default function LightboxImage({
  src,
  alt,
}: {
  src: string;
  alt?: string;
}) {
  const lightbox = useLightbox();

  return (
    <span className="my-5 block">
      <button
        type="button"
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 shadow-sm transition dark:border-zinc-800 dark:bg-zinc-950"
        onClick={() => lightbox?.openBySrc(src)}
      >
        <img
          src={src}
          alt={alt ?? ""}
          loading="lazy"
          className="h-auto w-full object-contain transition group-hover:opacity-95"
        />
      </button>
      {alt ? (
        <span className="mt-2 block text-center text-xs text-zinc-500 dark:text-zinc-400">
          {alt}
        </span>
      ) : null}
    </span>
  );
}
