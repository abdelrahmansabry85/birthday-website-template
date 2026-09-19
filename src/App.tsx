import React, { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { BirthdayIntro } from "../components/BirthdayIntro";
import { PhotoExperience } from "../components/PhotoExperience";
import { BirthdayMoment } from "../components/BirthdayMoment";
import { Letter } from "../components/Letter";
import { FinalScreen } from "../components/FinalScreen";
import { MusicController } from "../components/MusicController";
import { Balloons } from "../components/Balloons";
import { photos as defaultPhotos } from "../content/photos";

type ExperiencePhase = "intro" | "photos" | "moment" | "letter" | "final";

export default function App() {
  const [phase, setPhase] = useState<ExperiencePhase>("intro");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Trigger experience start when user clicks "Open Your Surprise"
  const handleStartExperience = () => {
    setHasStarted(true);
    setIsPlaying(true);
    setPhase("photos");
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main
      id="birthday-app-root"
      className="relative min-h-screen w-full bg-[#FAF8F5] text-[#1A1816] font-sans selection:bg-[#9E7444]/20 selection:text-[#1A1816] overflow-x-hidden"
    >
      {/* Floating Birthday Celebration Balloons */}
      <Balloons />

      {/* Experience Phased Transitions */}
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <BirthdayIntro key="intro" onStart={handleStartExperience} />
        )}

        {phase === "photos" && (
          <PhotoExperience
            key="photos"
            customPhotos={defaultPhotos}
            onComplete={() => setPhase("moment")}
          />
        )}

        {phase === "moment" && (
          <BirthdayMoment
            key="moment"
            onContinue={() => setPhase("letter")}
          />
        )}

        {phase === "letter" && (
          <Letter
            key="letter"
            onComplete={() => setPhase("final")}
          />
        )}

        {phase === "final" && (
          <FinalScreen
            key="final"
            onReplay={() => {
              setPhase("photos");
            }}
          />
        )}
      </AnimatePresence>

      {/* Floating subtle Music Controller in bottom-right */}
      <MusicController
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        hasStarted={hasStarted}
      />
    </main>
  );
}
