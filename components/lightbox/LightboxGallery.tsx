"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export type LightboxSlide = {
  src: string;
  alt?: string;
};

type LightboxContextValue = {
  openBySrc: (src: string) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox() {
  return useContext(LightboxContext);
}

export default function LightboxGallery({
  slides,
  children,
}: {
  slides: LightboxSlide[];
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const normalizedSlides = useMemo(
    () => slides.filter((s) => typeof s.src === "string" && s.src.length > 0),
    [slides],
  );

  const openBySrc = useCallback(
    (src: string) => {
      if (normalizedSlides.length === 0) return;

      const idx = normalizedSlides.findIndex((s) => s.src === src);
      setIndex(idx >= 0 ? idx : 0);
      setOpen(true);
    },
    [normalizedSlides],
  );

  const value = useMemo(() => ({ openBySrc }), [openBySrc]);

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={normalizedSlides.map((s) => ({
          src: s.src,
          alt: s.alt,
          title: s.alt,
        }))}
        plugins={[Zoom, Captions, Counter, Thumbnails]}
        carousel={{ finite: normalizedSlides.length <= 1 }}
        controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
        thumbnails={{ position: "bottom", border: 0, padding: 0, vignette: false }}
      />
    </LightboxContext.Provider>
  );
}
