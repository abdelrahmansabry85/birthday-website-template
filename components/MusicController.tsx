import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, Volume2, VolumeX, Sparkles } from "lucide-react";
import { experienceConfig } from "../config/experience";

interface MusicControllerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  hasStarted: boolean;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export const MusicController: React.FC<MusicControllerProps> = ({
  isPlaying,
  onTogglePlay,
  hasStarted,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [audioSource, setAudioSource] = useState<"local" | "youtube">("local");
  const [ytReady, setYtReady] = useState(false);
  const [activePlaybackState, setActivePlaybackState] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytPlayerRef = useRef<any>(null);
  const ytContainerRef = useRef<HTMLDivElement | null>(null);

  // Initialize YouTube Iframe Player
  useEffect(() => {
    let isSubscribed = true;

    function initYT() {
      if (!window.YT || !window.YT.Player) return;
      try {
        ytPlayerRef.current = new window.YT.Player("yt-audio-player", {
          height: "1",
          width: "1",
          videoId: experienceConfig.audio.youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            start: experienceConfig.audio.startTimeSeconds, // 190s = 3:10
          },
          events: {
            onReady: (event: any) => {
              if (!isSubscribed) return;
              setYtReady(true);
              event.target.setVolume(Math.round(experienceConfig.audio.volume * 100));
            },
            onStateChange: (event: any) => {
              // 1 = playing, 2 = paused, 0 = ended
              if (event.data === 1) {
                setActivePlaybackState(true);
              } else if (event.data === 2 || event.data === 0) {
                setActivePlaybackState(false);
              }
            },
            onError: (err: any) => {
              console.warn("YouTube player fallback to local audio:", err);
              setAudioSource("local");
            },
          },
        });
      } catch (e) {
        console.warn("Failed to create YouTube player:", e);
        setAudioSource("local");
      }
    }

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => {
        initYT();
      };
    } else if (window.YT && window.YT.Player) {
      initYT();
    }

    return () => {
      isSubscribed = false;
      if (ytPlayerRef.current && ytPlayerRef.current.destroy) {
        try {
          ytPlayerRef.current.destroy();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Handle Play/Pause synchronization
  useEffect(() => {
    if (!hasStarted) return;

    if (isPlaying) {
      if (audioSource === "youtube" && ytPlayerRef.current?.playVideo && ytReady) {
        try {
          ytPlayerRef.current.playVideo();
          setActivePlaybackState(true);
        } catch {
          audioRef.current?.play().catch(() => {});
        }
      } else {
        if (audioRef.current) {
          audioRef.current.currentTime = audioRef.current.currentTime || 0;
          audioRef.current.play().catch(() => {});
          setActivePlaybackState(true);
        }
      }
    } else {
      if (ytPlayerRef.current?.pauseVideo) {
        try {
          ytPlayerRef.current.pauseVideo();
        } catch {}
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setActivePlaybackState(false);
    }
  }, [isPlaying, hasStarted, ytReady, audioSource]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = experienceConfig.audio.volume;
    }
  }, []);

  // Handle Mute
  useEffect(() => {
    if (ytPlayerRef.current?.mute) {
      try {
        if (isMuted) {
          ytPlayerRef.current.mute();
        } else {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(Math.round(experienceConfig.audio.volume * 100));
        }
      } catch {}
    }
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <>
      {/* Hidden YouTube and HTML5 audio engines - permanently mounted to preserve iframe state */}
      <div className="fixed -top-96 -left-96 opacity-0 pointer-events-none" aria-hidden="true">
        <div id="yt-audio-player" ref={ytContainerRef} />
        <audio
          ref={audioRef}
          src={experienceConfig.audio.src}
          loop
          preload="auto"
          onPlay={() => setActivePlaybackState(true)}
          onPause={() => setActivePlaybackState(false)}
        />
      </div>

      {/* Floating luxury music controller - appears smoothly once user starts the journey */}
      <AnimatePresence>
        {hasStarted && (
          <motion.div
            id="music-controller-container"
            initial={{ opacity: 0, y: 25, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex items-center select-none"
          >
            <div className="flex items-center space-x-3 bg-white/95 backdrop-blur-md px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border border-stone-200/90 shadow-xl shadow-stone-800/10 transition-all duration-300 hover:border-stone-300">
              {/* Track metadata */}
              <div className="flex flex-col items-end mr-2 sm:mr-3 text-right">
                <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-medium">
                  {isPlaying ? "Currently Playing" : "Music Paused"}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px] tracking-wide font-medium text-[#9E7444]">
                    {experienceConfig.audio.title}
                  </span>
                  <span className="text-[10px] text-stone-400 font-medium">
                    {experienceConfig.audio.artist}
                  </span>
                </div>
              </div>

              {/* Animated waveform bars in #9E7444 */}
              <div
                className="flex items-center space-x-1 h-4 w-7 justify-center"
                title={isPlaying ? "Playing" : "Paused"}
              >
                {[
                  { base: 8, anim: "h-2 sm:h-3" },
                  { base: 16, anim: "h-4" },
                  { base: 12, anim: "h-3 sm:h-4" },
                  { base: 20, anim: "h-4 sm:h-5" },
                ].map((bar, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isPlaying ? "bg-[#9E7444]" : "bg-[#9E7444]/30"
                    }`}
                    style={{
                      height: isPlaying ? undefined : "3px",
                      animation: isPlaying
                        ? `pulse-artistic 1.${i + 2}s ease-in-out infinite alternate`
                        : "none",
                    }}
                  />
                ))}
              </div>

              {/* Controls: Mute button */}
              <button
                id="music-mute-toggle"
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 active:scale-95 transition-all duration-200 focus:outline-none cursor-pointer"
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>

              {/* Play/Pause primary circular button */}
              <button
                id="music-play-toggle"
                type="button"
                onClick={onTogglePlay}
                className="w-9 h-9 rounded-full bg-[#1A1816] text-white flex items-center justify-center ml-1 shadow-md hover:bg-stone-800 active:scale-95 transition-transform duration-200 focus:outline-none cursor-pointer"
                aria-label={isPlaying ? "Pause music" : "Play music"}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause size={13} className="fill-white text-white" />
                ) : (
                  <Play size={13} className="fill-white text-white translate-x-0.5" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse-artistic {
          0% { height: 4px; }
          50% { height: 18px; }
          100% { height: 6px; }
        }
      `}</style>
    </>
  );
};
