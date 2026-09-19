export interface AudioConfig {
  src: string;
  youtubeId: string;
  startTimeSeconds: number; // 3:10 -> 190 seconds as requested by the user
  title: string;
  artist: string;
  volume: number;
}

export interface ExperienceConfig {
  /** ⭐ EDIT THIS ONE LINE to personalize the whole site */
  name: string;
  slideDuration: number;
  transitionDuration: number;
  audio: AudioConfig;
  animations: {
    enableGrain: boolean;
    kenBurnsScale: number;
  };
}

export const experienceConfig: ExperienceConfig = {
  name: "[Name]",
  slideDuration: 6500, // 6.5 seconds per memory
  transitionDuration: 1400, // 1.4 seconds smooth cinematic dissolve
  audio: {
    src: "/audio/song.mp3",
    youtubeId: "8uw0esid_TM",
    startTimeSeconds: 0,
    title: "سنة حلوة يا جميل",
    artist: "محمد عبد الوهاب",
    volume: 0.9,
  },
  animations: {
    enableGrain: true,
    kenBurnsScale: 1.05,
  },
};
