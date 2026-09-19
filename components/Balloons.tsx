import React, { useMemo } from "react";
import { motion } from "motion/react";

interface BalloonData {
  id: number;
  x: number; // percentage across screen (0 to 95)
  size: number; // width in px
  color: string;
  shineColor: string;
  delay: number;
  duration: number;
  swingDuration: number;
  swingAmount: number;
}

const BALLOON_PALETTES = [
  { color: "#E07A5F", shine: "#F4A261" }, // warm coral
  { color: "#D4AF37", shine: "#F3E5AB" }, // gold
  { color: "#B5838D", shine: "#E5989B" }, // dusty rose
  { color: "#6B705C", shine: "#A5A58D" }, // sage
  { color: "#E5989B", shine: "#FFCDB2" }, // blush pink
  { color: "#C19A6B", shine: "#E6CCB2" }, // champagne
  { color: "#8B5E83", shine: "#C29BBD" }, // soft violet
  { color: "#D97706", shine: "#FDE68A" }, // golden amber
  { color: "#BE185D", shine: "#FBCFE8" }, // rose luxury
];

export const Balloons: React.FC = () => {
  // Generate random balloons for natural festive floating
  const balloons: BalloonData[] = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => {
      const palette = BALLOON_PALETTES[i % BALLOON_PALETTES.length];
      return {
        id: i,
        x: (i * 6.2 + (i % 3) * 2.5) % 94 + 2, // spread evenly across width
        size: 42 + (i % 4) * 10, // 42px to 72px
        color: palette.color,
        shineColor: palette.shine,
        delay: (i * 1.8) % 18, // staggered initial appearance
        duration: 14 + (i % 5) * 3, // 14s to 26s drift
        swingDuration: 3 + (i % 3) * 1.2,
        swingAmount: 18 + (i % 3) * 10,
      };
    });
  }, []);

  return (
    <div
      id="festive-balloons-container"
      className="fixed inset-0 pointer-events-none z-[5] overflow-hidden"
      style={{
        maskImage: "linear-gradient(to top, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
      aria-hidden="true"
    >
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{ left: `${b.x}%`, bottom: "-120px" }}
          animate={{
            y: ["0vh", "-130vh"],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: "linear",
          }}
        >
          {/* Gentle side-to-side sway */}
          <motion.div
            animate={{
              x: [-b.swingAmount, b.swingAmount, -b.swingAmount],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: b.swingDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ width: b.size, height: b.size * 1.28 }}
            className="relative drop-shadow-md opacity-85"
          >
            {/* Balloon SVG Body */}
            <svg
              viewBox="0 0 100 130"
              className="w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Balloon string */}
              <path
                d="M50 104 C48 112 53 118 49 126 C46 132 52 138 50 145"
                stroke="#A8A29E"
                strokeWidth="1.5"
                fill="none"
                opacity="0.75"
              />

              {/* Balloon knot */}
              <polygon
                points="47,100 53,100 50,105"
                fill={b.color}
              />

              {/* Balloon shape */}
              <ellipse
                cx="50"
                cy="52"
                rx="44"
                ry="50"
                fill={b.color}
              />

              {/* Inner gradient/depth shadow */}
              <ellipse
                cx="50"
                cy="52"
                rx="44"
                ry="50"
                fill="url(#balloon-depth)"
                opacity="0.2"
              />

              {/* Highlights for 3D realism */}
              <ellipse
                cx="34"
                cy="32"
                rx="14"
                ry="22"
                transform="rotate(-25 34 32)"
                fill={b.shineColor}
                opacity="0.55"
              />
              <circle
                cx="30"
                cy="22"
                r="4.5"
                fill="#FFFFFF"
                opacity="0.8"
              />

              <defs>
                <radialGradient id="balloon-depth" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                  <stop offset="70%" stopColor="#000000" stopOpacity="0.4" />
                </radialGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
