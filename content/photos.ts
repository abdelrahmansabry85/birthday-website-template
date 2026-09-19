export interface PhotoItem {
  id: string;
  src: string;
  caption: string;
  arabicCaption?: string;
  subtitle?: string;
  start?: number;
  end?: number;
  kenBurnsOrigin?: "center" | "top" | "bottom" | "left" | "right";
}

// ✏️ EDIT ME — tell your own photo story.
// 1. Drop your photos into `public/images/` (jpg, png, svg...).
// 2. Point each entry's `src` at your file and write your own captions.
// These 8 entries use neutral placeholder images and EMPTY captions on purpose:
// fill them in with your own words, or delete the caption lines you don't want.

export const photos: PhotoItem[] = [
  {
    id: "memory-01",
    src: "/images/memory-01.svg",
    caption: "",
    // caption: "✏️ Your caption for photo 1...",
    // arabicCaption: "✏️ تعليقك على الصورة الأولى...",
    subtitle: "Memory 1",
    start: 0,
    end: 6,
    kenBurnsOrigin: "center",
  },
  {
    id: "memory-02",
    src: "/images/memory-02.svg",
    caption: "",
    subtitle: "Memory 2",
    start: 6,
    end: 12,
    kenBurnsOrigin: "top",
  },
  {
    id: "memory-03",
    src: "/images/memory-03.svg",
    caption: "",
    subtitle: "Memory 3",
    start: 12,
    end: 18,
    kenBurnsOrigin: "center",
  },
  {
    id: "memory-04",
    src: "/images/memory-04.svg",
    caption: "",
    subtitle: "Memory 4",
    start: 18,
    end: 24,
    kenBurnsOrigin: "bottom",
  },
  {
    id: "memory-05",
    src: "/images/memory-05.svg",
    caption: "",
    subtitle: "Memory 5",
    start: 24,
    end: 30,
    kenBurnsOrigin: "left",
  },
  {
    id: "memory-06",
    src: "/images/memory-06.svg",
    caption: "",
    subtitle: "Memory 6",
    start: 30,
    end: 36,
    kenBurnsOrigin: "center",
  },
  {
    id: "memory-07",
    src: "/images/memory-07.svg",
    caption: "",
    subtitle: "Memory 7",
    start: 36,
    end: 42,
    kenBurnsOrigin: "bottom",
  },
  {
    id: "memory-08",
    src: "/images/memory-08.svg",
    caption: "",
    subtitle: "Memory 8",
    start: 42,
    end: 48,
    kenBurnsOrigin: "top",
  },
];
