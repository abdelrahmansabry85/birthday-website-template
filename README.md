# 🎂 Birthday Website Template

A cinematic, editorial, interactive birthday website — built as a **reusable, privacy-friendly template**. It ships **EMPTY on purpose**: no personal names, no messages, no photos of anyone. You personalize it in minutes by editing a couple of files.

> 🎬 **Live demo of the structure**: the site works out of the box with placeholder images and a `[Name]` placeholder — replace everything with your own content.

---

## ⚡ Quick Start (Local)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## ✏️ Make It Yours (The Only 2 Files You Need)

### 1. `config/experience.ts` — the name + song

```ts
export const experienceConfig: ExperienceConfig = {
  name: "[Name]", // ⭐ CHANGE THIS — used across the whole site (letter too, via {name})
  ...
};
```

### 2. `content/letter.ts` — the letter (English + Arabic)

The letter ships **empty** — write your own from scratch. Anywhere you write `{name}` it is automatically replaced with the name from step 1:

```ts
export const letter = `Dear {name},

Your English message here...

Happy Birthday, {name}!

With love,
Your name`;

export const arabicLetter = `{name} العزيزة،

رسالتك بالعربية هنا...

كل عام وأنتِ بخير يا {name}!`;
```

> **That's it.** The intro headline, moment screen, final screen, and letter all update automatically.

---

## 🗺️ Where Everything Lives

| What | File |
|---|---|
| The birthday person's name | `config/experience.ts` → `name` |
| The letter (EN + AR) | `content/letter.ts` |
| Photos + captions | `content/photos.ts` |
| Intro subtitle (optional line under the name) | `components/BirthdayIntro.tsx` → search `EDIT ME` |
| Moment screen messages (optional) | `components/BirthdayMoment.tsx` → search `EDIT ME` |
| Final screen closing line (optional) | `components/FinalScreen.tsx` → search `EDIT ME` |
| Slide duration / transitions | `config/experience.ts` → `slideDuration`, `transitionDuration` |
| Music (song file / YouTube ID / volume) | `config/experience.ts` → `audio` |
| Page title / social share text | `index.html` and `app/layout.tsx` |

Every customizable spot is marked with a `✏️ EDIT ME` comment in the code.

---

## 📸 How to Add Photos

1. Drop your photos into `public/images/` (jpg, png, svg...).
2. Edit `content/photos.ts`: point each entry's `src` at your file and write your captions:

```ts
{
  id: "memory-01",
  src: "/images/photo-01.jpg",
  caption: "Your caption in English...",
  arabicCaption: "تعليقك بالعربية...",
  subtitle: "A short label",
  kenBurnsOrigin: "center",
},
```

- The template ships with 8 neutral placeholder illustrations (`public/images/memory-*.svg`) so the slideshow works before you add your own. Overwrite or replace them freely.
- Add or remove entries — the slideshow and filmstrip adapt automatically.

---

## 🎵 How to Change the Music

Open `config/experience.ts`:

```ts
audio: {
  src: "/audio/song.mp3",       // Local file in public/audio/
  youtubeId: "8uw0esid_TM",     // YouTube video ID played first
  startTimeSeconds: 0,          // Start offset in seconds
  title: "Track title",         // Shown in the music controller
  artist: "Artist name",
  volume: 0.9,
},
```

- The player tries YouTube first and falls back to `/public/audio/song.mp3` automatically.
- To use your own MP3, replace the file at `public/audio/song.mp3`.

---

## 🌍 Bilingual (Arabic / English)

The letter screen has an Arabic/English toggle built in. Fill in **both** `letter` and `arabicLetter` in `content/letter.ts` — or leave either one with just a birthday greeting. `{name}` works in both.

---

## ⏱️ Timings & Animation

```ts
slideDuration: 6500,        // ms each photo is shown
transitionDuration: 1400,   // fade between slides
```

---

## 🧹 Privacy Checklist (what was removed from this template)

This template is published with **all personal content stripped**:
- ✅ No personal names anywhere (`[Name]` is a placeholder you fill in)
- ✅ No personal photos (replaced by neutral illustrations)
- ✅ No personal letters or messages (everything ships empty, marked `✏️ EDIT ME`)
- ✅ No personal dedications, signatures, or Arabic dedications
- The music track metadata in `config/experience.ts` is the only pre-filled media reference — replace it with your own song if you prefer.

---

## 🚀 Deploy (free, ~2 minutes)

### Vercel

1. Push this project to your GitHub (see below).
2. Go to [vercel.com](https://vercel.com) → **Add New... > Project** → select your repo.
3. Framework preset: **Vite**. Click **Deploy** — you get a shareable link instantly.

### Building locally

```bash
npm run build     # outputs to dist/
npm run preview   # serves the production build
```

---

## 🛠️ Tech Stack

React 19 + Vite 6 + Tailwind CSS 4 + Motion (Framer Motion) + Lucide icons + YouTube IFrame API.

## 📄 License

MIT — do whatever you like, make someone's day. 💛
