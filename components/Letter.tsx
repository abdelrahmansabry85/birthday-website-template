import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Heart } from "lucide-react";
import { letter as defaultLetter, arabicLetter } from "../content/letter";
import { experienceConfig } from "../config/experience";

interface LetterProps {
  onComplete: () => void;
}

export const Letter: React.FC<LetterProps> = ({ onComplete }) => {
  const [language, setLanguage] = useState<"ar" | "en">("ar");

  const { name } = experienceConfig;
  const personalizedLetter = defaultLetter.replaceAll("{name}", name);
  const personalizedArabicLetter = arabicLetter.replaceAll("{name}", name);

  const englishParagraphs = personalizedLetter.trim().split("\n\n");
  const arabicParagraphs = personalizedArabicLetter.trim().split("\n\n");

  const currentParagraphs = language === "en" ? englishParagraphs : arabicParagraphs;

  return (
    <motion.div
      id="personal-letter-screen"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen w-full py-16 px-6 md:px-12 flex flex-col items-center justify-center overflow-x-hidden bg-[#FAF8F5] text-[#1A1816] selection:bg-[#9E7444]/20"
    >
      {/* Subtle dot matrix grid */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none light-dot-grid" />

      {/* Top & bottom 1px delicate accent lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-stone-300/80 to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-stone-300/80 to-transparent pointer-events-none z-20" />

      {/* Corner Editorial Badges */}
      <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20 text-left">
        <div className="flex flex-col space-y-1">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1A1816]">
            MEMORIES
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#9E7444] font-medium">
            A Birthday Tribute
          </span>
        </div>
      </div>

      <div className="absolute top-8 right-8 md:top-12 md:right-12 z-20 text-right">
        <div className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-medium">
          Birthday Edition
        </div>
      </div>

      {/* Bottom Left Chapter Indicator */}
      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20 text-left hidden lg:block">
        <div className="flex items-end space-x-6">
          <div className="flex flex-col">
            <span
              className="text-[28px] md:text-[32px] font-serif italic text-[#1A1816] leading-none"
              style={{ fontFamily: '"Georgia", serif' }}
            >
              04
            </span>
            <div className="w-12 h-px bg-stone-300 mt-2" />
          </div>
          <div className="pb-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium">
              THE LETTER
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl w-full mx-auto flex flex-col items-center mt-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-6 space-y-2"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#9E7444] font-semibold">
            From The Heart
          </span>
          <h2
            className="text-3xl sm:text-5xl font-serif italic font-light text-[#1A1816] tracking-tight"
            style={{ fontFamily: '"Georgia", serif' }}
          >
            One Last Thing...
          </h2>
          <p className="text-xs text-stone-500 font-light">
            ✏️ Your letter goes here — edit content/letter.ts
          </p>
        </motion.div>

        {/* Language selector switch */}
        <div className="mb-6 flex items-center gap-1 p-1 rounded-full bg-white border border-stone-200 shadow-sm">
          <button
            type="button"
            onClick={() => setLanguage("ar")}
            className={`px-4 py-1.5 rounded-full text-xs transition-all duration-300 font-arabic-luxury cursor-pointer ${
              language === "ar"
                ? "bg-[#9E7444] text-white font-medium shadow-sm"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            بالعربية
          </button>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={`px-4 py-1.5 rounded-full text-xs transition-all duration-300 font-sans cursor-pointer ${
              language === "en"
                ? "bg-[#9E7444] text-white font-medium shadow-sm"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            English
          </button>
        </div>

        {/* Luxury Letter Reading Card */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className={`w-full rounded-2xl bg-white border border-stone-200/90 p-8 sm:p-12 md:p-14 shadow-xl shadow-stone-800/5 relative overflow-hidden transition-all duration-500 ${
            language === "ar" ? "text-right font-arabic-luxury" : "text-left font-serif"
          }`}
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          {/* Subtle gold line accent */}
          <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#9E7444]/60 to-transparent" />

          {/* Letter Body with smooth language crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={language}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 sm:space-y-7"
            >
              {currentParagraphs.map((paragraph, index) => {
                const isGreeting = index === 0;
                const isClosing = index >= currentParagraphs.length - 2;

                return (
                  <p
                    key={`${language}-${index}`}
                    className={`leading-relaxed ${
                      isGreeting
                        ? "text-xl sm:text-2xl text-[#1A1816] font-medium tracking-wide"
                        : isClosing
                        ? "text-base sm:text-lg text-[#9E7444] font-medium"
                        : "text-base sm:text-lg text-stone-700 font-light"
                    }`}
                    style={language === "en" ? { fontFamily: '"Georgia", serif' } : undefined}
                  >
                    {paragraph}
                  </p>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Subtle sign-off seal */}
          <div className="mt-12 pt-8 border-t border-stone-200 flex items-center justify-between text-xs text-stone-400 font-mono">
            <span className="tracking-widest uppercase font-medium">Forever Grateful</span>
            <span className="flex items-center gap-1.5 text-[#9E7444] font-medium">
              <Heart size={13} fill="#9E7444" /> With Love
            </span>
          </div>
        </motion.article>

        {/* Transition to Final Screen button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <button
            id="finish-letter-button"
            type="button"
            onClick={onComplete}
            className="group relative px-10 py-4 overflow-hidden border border-stone-800 bg-[#1A1816] text-[#FAF8F5] rounded-full transition-all duration-300 hover:bg-stone-800 hover:shadow-xl active:scale-[0.98] cursor-pointer shadow-md"
          >
            <span className="relative z-10 text-[12px] uppercase tracking-[0.2em] font-medium flex items-center gap-2.5">
              Forever & Always
              <ArrowRight
                size={14}
                className="text-[#D4AF37] group-hover:translate-x-1 transition-transform duration-300"
              />
            </span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
