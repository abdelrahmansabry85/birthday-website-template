import React from "react";
import { motion } from "motion/react";
import { Heart, RotateCcw } from "lucide-react";
import { experienceConfig } from "../config/experience";

interface FinalScreenProps {
  onReplay: () => void;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({ onReplay }) => {
  const { name } = experienceConfig;
  return (
    <motion.div
      id="final-screen"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAF8F5] text-[#1A1816] text-center px-6 selection:bg-[#9E7444]/20"
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
      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20 text-left hidden sm:block">
        <div className="flex items-end space-x-6">
          <div className="flex flex-col">
            <span
              className="text-[28px] md:text-[32px] font-serif italic text-[#1A1816] leading-none"
              style={{ fontFamily: '"Georgia", serif' }}
            >
              05
            </span>
            <div className="w-12 h-px bg-stone-300 mt-2" />
          </div>
          <div className="pb-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium">
              FOREVER
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-8 max-w-lg mx-auto">
        {/* The glowing heart */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative"
        >
          <Heart
            size={32}
            className="text-[#9E7444]"
            fill="#9E7444"
            strokeWidth={1}
          />
        </motion.div>

        {/* Happy Birthday, {name}. */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif italic font-light text-[#1A1816] tracking-tight leading-tight select-none"
          style={{ fontFamily: '"Georgia", serif' }}
        >
          Happy Birthday, {name}.
        </motion.h1>

        {/* Closing line — ✏️ EDIT ME: your own one-line closing (optional) */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-xs md:text-sm font-light tracking-[0.3em] text-stone-500 uppercase"
        >
          {""}
        </motion.p>

        {/* Replay button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="pt-4"
        >
          <button
            id="replay-experience-button"
            type="button"
            onClick={onReplay}
            className="group relative px-8 py-3.5 border border-stone-800 bg-[#1A1816] text-[#FAF8F5] rounded-full transition-all duration-300 hover:bg-stone-800 hover:shadow-lg active:scale-[0.98] cursor-pointer shadow-sm"
          >
            <span className="relative z-10 text-[11px] uppercase tracking-[0.2em] font-medium flex items-center gap-2">
              <RotateCcw size={13} className="text-[#D4AF37]" />
              Replay Experience
            </span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};
