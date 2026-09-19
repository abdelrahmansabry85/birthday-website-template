import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from "lucide-react";
import { photos as defaultPhotos, PhotoItem } from "../content/photos";
import { experienceConfig } from "../config/experience";

interface PhotoExperienceProps {
  onComplete: () => void;
  customPhotos?: PhotoItem[];
}

export const PhotoExperience: React.FC<PhotoExperienceProps> = ({
  onComplete,
  customPhotos,
}) => {
  const photosList = customPhotos && customPhotos.length > 0 ? customPhotos : defaultPhotos;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const filmstripRef = useRef<HTMLDivElement | null>(null);
  const slideDuration = experienceConfig.slideDuration;

  const currentPhoto = photosList[currentIndex];

  // Efficient automatic slideshow without frequent 50ms re-renders
  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      if (currentIndex < photosList.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        onComplete();
      }
    }, slideDuration);

    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, slideDuration, photosList.length, onComplete]);

  // Smoothly center active thumbnail in filmstrip
  useEffect(() => {
    if (filmstripRef.current) {
      const activeThumb = filmstripRef.current.children[currentIndex] as HTMLElement | undefined;
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < photosList.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <motion.div
      id="photo-experience-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen w-full overflow-hidden bg-[#FAF8F5] text-[#1A1816] flex flex-col justify-between select-none"
    >
      {/* Subtle dot matrix grid */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none light-dot-grid" />

      {/* Top & bottom 1px delicate accent borders */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-stone-300/80 to-transparent pointer-events-none z-30" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-stone-300/80 to-transparent pointer-events-none z-30" />

      {/* Top Bar: Editorial badges & story timeline */}
      <header className="relative z-30 pt-6 px-6 md:px-12 flex items-center justify-between">
        <div className="flex flex-col space-y-0.5 text-left">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A1816]">
            MEMORIES
          </span>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#9E7444] font-medium font-mono">
            {String(currentIndex + 1).padStart(2, "0")} / {String(photosList.length).padStart(2, "0")}
          </span>
        </div>

        {/* Minimal progress dashes */}
        <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-stone-200 shadow-sm">
          {photosList.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className="py-1 focus:outline-none cursor-pointer"
              aria-label={`Go to memory ${idx + 1}`}
            >
              <div
                className={`h-1 rounded-full transition-all duration-500 ease-out ${
                  idx === currentIndex
                    ? "w-7 bg-[#9E7444]"
                    : idx < currentIndex
                    ? "w-3 bg-stone-400"
                    : "w-3 bg-stone-200 hover:bg-stone-300"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Skip to letter/moment button */}
        <button
          type="button"
          onClick={onComplete}
          className="text-[11px] uppercase tracking-[0.2em] text-stone-500 hover:text-stone-900 font-medium transition-colors duration-300 focus:outline-none cursor-pointer"
        >
          Skip to Moment
        </button>
      </header>

      {/* Main Photographic Presentation - Fast, Clean, Natural with Silky Transition */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhoto.id || currentIndex}
            initial={{ opacity: 0, scale: 0.985, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.01, y: -8 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center max-w-4xl w-full"
          >
            {/* Fine Art Gallery Mount Frame */}
            <div className="relative p-2.5 sm:p-3.5 bg-white rounded-2xl shadow-xl shadow-stone-800/8 border border-stone-200/90 max-h-[58vh] sm:max-h-[62vh] flex items-center justify-center transition-all duration-500">
              <img
                src={currentPhoto.src}
                alt={currentPhoto.caption}
                referrerPolicy="no-referrer"
                loading="eager"
                className="max-h-[54vh] sm:max-h-[58vh] w-auto object-contain rounded-xl"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Side navigation arrows */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 border border-stone-200 shadow-md transition-all duration-300 active:scale-95 z-20 cursor-pointer ${
            currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "opacity-90 hover:opacity-100 hover:scale-105"
          }`}
          aria-label="Previous memory"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-stone-950 border border-stone-200 shadow-md transition-all duration-300 active:scale-95 z-20 cursor-pointer opacity-90 hover:opacity-100 hover:scale-105"
          aria-label="Next memory"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Bottom Editorial Caption, 8-Photo Filmstrip & Controls */}
      <footer className="relative z-30 pb-6 pt-1 px-4 md:px-12 max-w-4xl mx-auto w-full text-center flex flex-col items-center">
        {/* Captions with synchronized fluid crossfade */}
        <div className="min-h-[90px] flex flex-col items-center justify-center max-w-2xl px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhoto.id || currentIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center space-y-1.5"
            >
              {currentPhoto.subtitle && (
                <p className="text-[11px] font-mono tracking-[0.2em] text-[#9E7444] uppercase font-semibold">
                  {currentPhoto.subtitle}
                </p>
              )}

              <h2
                className="text-base sm:text-xl font-serif italic text-[#1A1816] tracking-wide leading-snug font-normal"
                style={{ fontFamily: '"Georgia", serif' }}
              >
                "{currentPhoto.caption}"
              </h2>

              {currentPhoto.arabicCaption && (
                <p className="font-arabic-luxury text-base sm:text-lg text-[#9E7444] font-medium tracking-normal">
                  {currentPhoto.arabicCaption}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 8-Photo Interactive Filmstrip (Allows viewing all 8 photos directly as they are) */}
        <div
          ref={filmstripRef}
          className="mt-3 w-full flex items-center justify-center gap-2 overflow-x-auto py-1.5 px-2 no-scrollbar scroll-smooth"
        >
          {photosList.map((photo, idx) => (
            <button
              key={photo.id || idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ease-out cursor-pointer ${
                idx === currentIndex
                  ? "border-[#9E7444] scale-105 shadow-md ring-2 ring-[#9E7444]/20"
                  : "border-stone-200 opacity-60 hover:opacity-100 hover:border-stone-400 hover:scale-102"
              }`}
              title={`Memory ${idx + 1}`}
            >
              <img
                src={photo.src}
                alt={`Thumb ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <span className="absolute bottom-0 right-0 bg-black/60 text-[8px] text-white px-1 font-mono rounded-tl">
                {idx + 1}
              </span>
            </button>
          ))}
        </div>

        {/* Play/Pause toggle */}
        <div className="mt-3 flex items-center justify-center">
          <button
            type="button"
            onClick={togglePause}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 hover:bg-white border border-stone-200 text-xs text-stone-700 hover:text-stone-950 transition-all duration-300 shadow-sm cursor-pointer active:scale-95"
          >
            {isPaused ? <Play size={12} className="fill-[#9E7444] text-[#9E7444]" /> : <Pause size={12} />}
            <span className="text-[10px] font-mono tracking-wider uppercase font-medium">
              {isPaused ? "Resume Story" : "Pause Story"}
            </span>
          </button>
        </div>
      </footer>
    </motion.div>
  );
};
