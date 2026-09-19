import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { experienceConfig } from "../config/experience";

interface BirthdayMomentProps {
  onContinue: () => void;
}

export const BirthdayMoment: React.FC<BirthdayMomentProps> = ({ onContinue }) => {
  const { name } = experienceConfig;
  return (
    <motion.div
      id="birthday-moment-screen"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FAF8F5] text-[#1A1816] text-center px-6 md:px-12 selection:bg-[#9E7444]/20"
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
              03
            </span>
            <div className="w-12 h-px bg-stone-300 mt-2" />
          </div>
          <div className="pb-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-medium">
              THE MOMENT
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center space-y-10 md:space-y-12 py-12">
        {/* Line 1: Happy Birthday, {name}. */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="space-y-2"
        >
          <span className="block text-[11px] md:text-xs font-mono tracking-[0.3em] uppercase text-[#9E7444] font-semibold">
            Today & Always
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#1A1816] tracking-tight">
            Happy Birthday,{" "}
            <span
              className="font-serif italic font-light text-[#1A1816]"
              style={{ fontFamily: '"Georgia", serif' }}
            >
              {name}.
            </span>
          </h1>
        </motion.div>

        {/* Message line — ✏️ EDIT ME: write your own short message here (optional) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="space-y-2 max-w-xl"
        >
          <p
            className="text-2xl sm:text-3xl md:text-4xl font-serif italic font-light text-[#1A1816] leading-relaxed"
            style={{ fontFamily: '"Georgia", serif' }}
          >
            {""}
          </p>
        </motion.div>

        {/* Second message line — ✏️ EDIT ME (optional) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
          className="space-y-2 max-w-2xl"
        >
          <p className="text-lg sm:text-xl md:text-2xl text-stone-700 font-light leading-relaxed tracking-wide">
            {""}
          </p>
        </motion.div>

        {/* Next step button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
          className="pt-6"
        >
          <button
            id="continue-to-letter-button"
            type="button"
            onClick={onContinue}
            className="group relative px-10 py-4 overflow-hidden border border-stone-800 bg-[#1A1816] text-[#FAF8F5] rounded-full transition-all duration-300 hover:bg-stone-800 hover:shadow-xl active:scale-[0.98] cursor-pointer shadow-md"
          >
            <span className="relative z-10 text-[12px] uppercase tracking-[0.2em] font-medium flex items-center gap-2.5">
              One Last Thing...
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
