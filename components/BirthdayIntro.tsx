import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { experienceConfig } from "../config/experience";

interface BirthdayIntroProps {
  onStart: () => void;
}

export const BirthdayIntro: React.FC<BirthdayIntroProps> = ({ onStart }) => {
  const { name } = experienceConfig;
  return (
    <motion.div
      id="intro-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.985, y: -10 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAF8F5] text-[#1A1816] font-sans text-center px-6 selection:bg-[#9E7444]/20"
    >
      {/* Lightweight subtle dot matrix grid */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none light-dot-grid" />

      {/* Top & bottom 1px delicate accent borders */}
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
      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20 text-left hidden sm:block">
        <div className="flex items-end space-x-6">
          <div className="flex flex-col">
            <span
              className="text-[28px] md:text-[32px] font-serif italic text-[#1A1816] leading-none"
              style={{ fontFamily: '"Georgia", serif' }}
            >
              01
            </span>
            <div className="w-12 h-px bg-stone-300 mt-2" />
          </div>
          <div className="pb-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium">
              THE INTRO
            </span>
          </div>
        </div>
      </div>

      {/* Center Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto my-auto">
        {/* Eyebrow and Headline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-[13px] md:text-[14px] uppercase tracking-[0.4em] mb-4 text-stone-500 font-light">
            Happy Birthday,
          </span>
          <h1
            className="text-[64px] sm:text-[90px] md:text-[110px] leading-[0.9] font-serif italic font-light text-[#1A1816] select-none break-words"
            style={{ fontFamily: '"Georgia", serif' }}
          >
            {name}.
          </h1>
        </motion.div>

        {/* Subtitle — ✏️ EDIT ME: your own one-line message (optional) */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-[16px] md:text-[18px] text-stone-600 max-w-[420px] font-light tracking-wide leading-relaxed"
        >
          {""}
        </motion.p>

        {/* Interactive Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="pt-6"
        >
          <button
            id="open-surprise-button"
            type="button"
            onClick={onStart}
            className="group relative px-10 py-4 overflow-hidden border border-stone-800 bg-[#1A1816] text-[#FAF8F5] rounded-full transition-all duration-300 hover:bg-stone-800 hover:shadow-xl active:scale-[0.98] cursor-pointer shadow-md"
          >
            <span className="relative z-10 text-[12px] uppercase tracking-[0.2em] font-medium flex items-center gap-2.5">
              Open Your Surprise
              <ArrowRight
                size={14}
                className="text-[#D4AF37] group-hover:translate-x-1 transition-transform duration-300"
              />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Subtle bottom cue */}
      <div className="absolute bottom-6 sm:bottom-12 right-6 sm:right-12 z-20 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-mono">
        Sound Recommended
      </div>
    </motion.div>
  );
};
