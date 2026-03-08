"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useCallback, useEffect } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { zenDots } from "@/lib/fonts";
import Image from "next/image";

const CLOUD_THUMB = `https://res.cloudinary.com/dtxqfmc0h/image/upload/f_auto,q_auto,w_600`;
const CLOUD_FULL = `https://res.cloudinary.com/dtxqfmc0h/image/upload/f_auto,q_100,w_1600`;

const galleryData: Record<string, string[]> = {
  "techno bharati 2k25 inaugration ceremony": [
    `${CLOUD_THUMB}/v1772945517/bwwnkluqf5cvstauotyr.jpg`,
    `${CLOUD_THUMB}/v1772945517/sv3dvwjjsifampoqveck.jpg`,
    `${CLOUD_THUMB}/v1772945511/t5iwc7uvn9i2uxdsj12w.jpg`,
    `${CLOUD_THUMB}/v1772945511/jbpciej7pcw7tu0xjpwv.jpg`,
    `${CLOUD_THUMB}/v1772945511/tfqziw0nyjnivalnzar2.jpg`,
    `${CLOUD_THUMB}/v1772945512/ecysy4oyv20pcp9hsver.jpg`,
    `${CLOUD_THUMB}/v1772945513/e4rnwk5rcbumrb6kghcg.jpg`,
    `${CLOUD_THUMB}/v1772945513/uqebqqzzxiljuwqhw8db.jpg`,
  ],
  "mechanical department creanturous 2k25 inaugration": [
    `${CLOUD_THUMB}/v1772945513/kczcqgrua7wdl8gwlfzs.jpg`,
    `${CLOUD_THUMB}/v1772945514/a0wyqnw1qlobnvmfpfx7.jpg`,
    `${CLOUD_THUMB}/v1772945514/zrkiyrvjdoj7ed1bpfu7.jpg`,
  ],
  "civil department nirman 2k25 inaugration": [
    `${CLOUD_THUMB}/v1772945515/rb4s4gy0xyqusbfa69lg.jpg`,
  ],
  "general engineering techno science expo 2k25 inugration": [
    `${CLOUD_THUMB}/v1772945515/id8jd75whpxsudsjlwfk.jpg`,
    `${CLOUD_THUMB}/v1772945515/oa21usf1xkpwtoqtqem8.jpg`,
  ],
  "computer science coderace 2k25 inugration": [
    `${CLOUD_THUMB}/v1772945515/tsviyo6tw5kmivudwk3k.jpg`,
  ],
  "electronics and telecommunication techno spark 2k25 inugration": [
    `${CLOUD_THUMB}/v1772945516/qqlgitjrhty4hpj4xsug.jpg`,
  ],
  "cse aiml infusion ai 2k25 inugration": [
    `${CLOUD_THUMB}/v1772945516/etvb4nmn86rc7eb6cnsz.jpg`,
    `${CLOUD_THUMB}/v1772945518/ml1u70utttldkjtx6p1a.jpg`,
    `${CLOUD_THUMB}/v1772945518/oicmt9akzqgxqteusw90.jpg`,
    `${CLOUD_THUMB}/v1772945518/zrdqlzvimdzv5v1q6ra1.jpg`,
  ],
  other: [
    `${CLOUD_THUMB}/v1772945511/s6xg50icpyvjvbvdqepl.png`,
    `${CLOUD_THUMB}/v1772945513/uvd4sw1tp1lxrafflior.png`,
    `${CLOUD_THUMB}/v1772945511/tkmuqtpirhxoy09s8em7.jpg`,
    `${CLOUD_THUMB}/v1772945513/wtvdzesfyluiywqthejv.jpg`,
    `${CLOUD_THUMB}/v1772945513/oys7esljbqz8ehjbwooa.jpg`,
    `${CLOUD_THUMB}/v1772945513/nu1bsaizqtxmow3eabnu.jpg`,
    `${CLOUD_THUMB}/v1772945514/kijcgbzzamnemhb9tj6u.jpg`,
    `${CLOUD_THUMB}/v1772945515/c0sppyg406gp7xwym9lx.jpg`,
    `${CLOUD_THUMB}/v1772945516/tdbjhc5jigzghwzewnop.jpg`,
    `${CLOUD_THUMB}/v1772945519/s4zmzl79gou3p07ckmqw.jpg`,
  ],
};

interface FlatImage {
  src: string;
  fullSrc: string;
  category: string;
  globalIndex: number;
}

function buildFlatList(data: Record<string, string[]>): FlatImage[] {
  const flat: FlatImage[] = [];
  for (const [category, srcs] of Object.entries(data)) {
    for (const src of srcs) {
      const fullSrc = src.replace(CLOUD_THUMB, CLOUD_FULL);
      flat.push({ src, fullSrc, category, globalIndex: flat.length });
    }
  }
  return flat;
}

const flatImages = buildFlatList(galleryData);
const categories = ["All", ...Object.keys(galleryData)];

function prettify(str: string) {
  return str
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function Lightbox({
  image,
  onClose,
  onPrev,
  onNext,
  current,
  total,
  allImages,
}: {
  image: FlatImage;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  current: number;
  total: number;
  allImages: FlatImage[];
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  // preload prev and next full res images
  useEffect(() => {
    const prevSrc = allImages[(current - 1 + total) % total]?.fullSrc;
    const nextSrc = allImages[(current + 1) % total]?.fullSrc;

    if (prevSrc) {
      const prev = new window.Image();
      prev.src = prevSrc;
    }
    if (nextSrc) {
      const next = new window.Image();
      next.src = nextSrc;
    }
  }, [current, total, allImages]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-3 md:left-6 z-10 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <motion.div
        key={image.fullSrc}
        initial={{ opacity: 0, scale: 0.93 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.93 }}
        transition={{ type: "spring", damping: 24, stiffness: 280 }}
        className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full bg-black">
          <img
            key={image.fullSrc}
            src={image.fullSrc}
            alt={image.category}
            className="w-full h-auto object-contain max-h-[80vh]"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />
        </div>

        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
          <p
            className={`text-white font-bold text-sm md:text-base ${zenDots.className} line-clamp-1`}
          >
            {prettify(image.category)}
          </p>
          <p className="text-white/50 text-xs mt-0.5">
            {current + 1} / {total}
          </p>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </motion.div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-3 md:right-6 z-10 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-all duration-200 hover:scale-110"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
        {total <= 12 &&
          Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`block rounded-full transition-all duration-200 ${
                i === current ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-white/30"
              }`}
            />
          ))}
      </div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages =
    activeCategory === "All"
      ? flatImages
      : flatImages.filter((img) => img.category === activeCategory);

  const openLightbox = (globalIndex: number) => {
    const posInFiltered = filteredImages.findIndex(
      (img) => img.globalIndex === globalIndex
    );
    setLightboxIndex(posInFiltered);
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null
        ? null
        : (i - 1 + filteredImages.length) % filteredImages.length
    );
  }, [filteredImages.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % filteredImages.length
    );
  }, [filteredImages.length]);

  const currentImage =
    lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-background">
      <section className="relative py-14 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1
              className={`text-4xl md:text-6xl font-bold mb-6 uppercase ${zenDots.className}`}
            >
              Gallery
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Relive the best moments from Techno Bharati events.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs md:text-sm font-semibold border transition-all duration-200 capitalize whitespace-nowrap sm:whitespace-normal sm:text-center ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat === "All" ? "All Photos" : prettify(cat)}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-3"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(index * 0.04, 0.6),
                }}
                className="break-inside-avoid group relative rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
                onClick={() => openLightbox(image.globalIndex)}
                onMouseEnter={() => {
                  // preload full res on hover so lightbox is instant
                  const img = new window.Image();
                  img.src = image.fullSrc;
                }}
              >
                <img
                  src={image.src}
                  alt={image.category}
                  loading={index < 8 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <p
                    className={`text-white font-bold text-xs ${zenDots.className} line-clamp-2`}
                  >
                    {prettify(image.category)}
                  </p>
                </div>

                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ZoomIn className="h-3.5 w-3.5 text-white" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredImages.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground py-20 text-lg"
          >
            No images in this category.
          </motion.p>
        )}
      </section>

      <AnimatePresence>
        {currentImage && lightboxIndex !== null && (
          <Lightbox
            image={currentImage}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
            current={lightboxIndex}
            total={filteredImages.length}
            allImages={filteredImages}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
