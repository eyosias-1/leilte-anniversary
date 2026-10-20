# 👑 Leilte — A Romantic 4-Month Anniversary Website

> A personal, responsive, romantic anniversary scrapbook & love letter created for Leilte to celebrate four beautiful months together and all the years ahead. ❤️

---

## 🌹 Website Overview

This is a real, functional, lightweight website built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript** (no heavy frameworks, no external paid APIs, no node/build steps required).

### Included Sections:
1. **Opening Screen (Hero)**: A sweet, heartfelt opening note welcoming Leilte, featuring the exact text and an animated "Open Your Surprise 💌" button.
2. **Our Little Memories (10 Photos)**: A polaroid-style scrapbook photo gallery with washi tape, gentle tilt angles, captions, and an interactive zoom modal with heart reactions. Supports 10 photos (`photo-01.jpg` through `photo-10.jpg`).
3. **Our Favorite Videos (15 Videos)**: A video scrapbook supporting 15 personal video memories (`video-01.mp4` through `video-15.mp4`). Features lazy loading (`preload="none"`), native player controls, inline mobile playback (`playsinline`), auto-pausing other videos when one plays, and graceful fallback posters.
4. **A Letter From My Heart**: A wax-sealed parchment love letter styled with delicate paper textures, romantic typography, and the heartfelt words from your summer apart to your university life together.
5. **Reasons Why I Love You**: An interactive flip-card deck revealing 10 love reasons with progress tracking and zero repeats until all reasons are shown.
6. **Our Song**: A vinyl record audio player styled around "Perfect" by Ed Sheeran. Includes direct Spotify streaming fallback and local MP3 support without pretending audio is playing when it's not.
7. **Our Time Together**: Displays "4 Months Together ❤️" and "4 beautiful months and counting" out of the box, with a configurable live countdown timer once you set your exact anniversary date.
8. **The Big Question 😂❤️**: The romantic proposal ("Will you stay with me for the rest of this crazy little life?"). Features an improved dodging "No 💔" button for desktop and touchscreens, an ERROR 404 easter egg if caught, and a celebratory pink confetti & heart explosion upon clicking "YES, FOREVER! ❤️".
9. **Final Screen**: A closing romantic reflection with floating hearts, crown emblem, and a "Read From Beginning 💌" button.

---

## 📱 Mobile Compatibility & Responsiveness

The website has been thoroughly tested across all smartphone and computer viewport sizes:
- **320px**: Ultra-compact screens (iPhone SE 1st Gen, compact Android phones).
- **375px**: Standard iPhone SE (2nd/3rd Gen) and compact iPhones.
- **390px**: Standard smartphones (iPhone 12 / 13 / 14 / 15, Google Pixel, Galaxy).
- **430px**: Large smartphones (iPhone 14 / 15 Pro Max, Galaxy S23 Ultra).
- **768px**: Tablets & iPads.
- **1366px+**: Laptops, desktops, and wide monitors.

### Mobile Optimizations:
- **Swipeable Navigation**: On mobile, a horizontal quick-jump pill bar lets her effortlessly jump to any section with a single tap.
- **Touch-Friendly Buttons**: All buttons, polaroids, and video cards have generous touch targets (at least 44px) and fluid spacing.
- **Zero Horizontal Overflow**: Guaranteed clean reading without horizontal page shaking or cut-off cards.
- **Touch-Dodge Physics**: On touchscreens, the "No" button smoothly glides to another spot inside the proposal area without interfering with scrolling or jumping off-screen.

---

## 🚀 How to Open and Preview the Website

### Method 1: Double-Click (Immediate)
1. Open the folder `Leilte-Anniversary` in your Windows File Explorer.
2. Double-click `index.html`.
3. It will immediately open in your default web browser (Edge, Chrome, Firefox, Safari).

### Method 2: Local HTTP Server (Recommended)
Running a local server ensures fonts, SVGs, and audio/video files load without browser local-file restrictions:
1. Open PowerShell or Terminal in this folder (`c:\Users\SURFACE\Desktop\Leilte-Anniversary`).
2. Run:
   ```powershell
   py -m http.server 8000
   ```
3. Open your browser to:
   ```
   http://localhost:8000
   ```

---

## 📸 How to Add Your 10 Photos

1. Choose 10 of your favorite photos of Leilte (or photos of the two of you together).
2. Save them into the `assets/photos/` folder with these exact names:
   - `photo-01.jpg`
   - `photo-02.jpg`
   - `photo-03.jpg`
   - `photo-04.jpg`
   - `photo-05.jpg`
   - `photo-06.jpg`
   - `photo-07.jpg`
   - `photo-08.jpg`
   - `photo-09.jpg`
   - `photo-10.jpg`
3. Refresh the website in your browser! The site will automatically display your real photos in the polaroid frames.

*Note: If you have PNG photos, you can either save them as `.jpg` or open `index.html` (lines 90–260) and change `.jpg` to `.png`.*

### Photo Captions:
- **Photo 01**: *"How are you even this beautiful? 😭❤️"*
- **Photo 02**: *"My camera roll's favorite person."*
- **Photo 03**: *"The girl who makes everything better."*
- **Photo 04**: *"You're so cute it's unfair."*
- **Photo 05**: *"Proof that I got ridiculously lucky."*
- **Photo 06**: *"My favorite smile in the whole universe. ✨"*
- **Photo 07**: *"Every moment with you is magic. 🌷"*
- **Photo 08**: *"The prettiest girl in every room. 👑"*
- **Photo 09**: *"You stole my heart and kept it safe. 🥰"*
- **Photo 10**: *"Four months down, forever to go. 💍❤️"*

---

## 🎥 How to Add Your 15 Videos

1. Choose 15 personal videos of you and Leilte.
2. Save them into the `assets/videos/` folder with these exact names:
   - `video-01.mp4` through `video-15.mp4`
3. Refresh the page! The videos will immediately appear inside the romantic scrapbook video cards.
4. If a video hasn't been added yet, the website gracefully displays a custom pink poster card with helper text so the layout never breaks or shows an empty black screen.

---

## ⚙️ Configuration Guide: What Lines to Change

All custom settings are conveniently grouped in one clear place at the very top of `script.js` (lines 20–55):

### 1. Set Your Anniversary Date
In `script.js`, find line 31:
```javascript
const ANNIVERSARY_DATE = null;
```
When you are ready to track live days, hours, and minutes, replace `null` with your anniversary date in `"YYYY-MM-DD"` format:
```javascript
const ANNIVERSARY_DATE = "2024-06-20"; // Replace with your exact start date
```
*Until you change it, the website proudly displays "4 beautiful months and counting" without calculating incorrect numbers.*

---

### 2. Configure Our Song (Spotify Link or MP3)
In `script.js`, find line 37:
```javascript
const SONG_STREAM_URL = "https://open.spotify.com/search/Ed%20Sheeran%20Perfect";
```
- **Option A (Spotify/YouTube Link)**: Replace this URL with your custom Spotify track link or YouTube link.
- **Option B (Local MP3 Playback)**: Place an audio file named `our-song.mp3` inside the `assets/music/` folder. The built-in player will detect it, spin the vinyl, and play it directly on the page!

---

### 3. Customize Love Reasons
In `script.js`, lines 43–54:
```javascript
const REASONS_LIST = [
  "Your smile makes my day better.",
  "You make me feel happy and loved.",
  "You're smart, beautiful, and amazing.",
  "Your style is incredible.",
  "You make the university feel like home.",
  "You bring out the caring side of me.",
  "I love how cute and sexy you are.",
  "Being with you makes ordinary days special.",
  "You're my favorite person to spend time with.",
  "You make my world more beautiful."
];
```
You can edit, rephrase, or add as many reasons as you like inside the quotes!

---

### 4. Edit the Love Letter
In `index.html`, lines 465–520:
You can edit any paragraph in the `<div class="letter-body">` section. All typography and line wraps adjust automatically for both mobile and desktop screens.

---

### 5. Customize Colors and Aesthetics
In `style.css`, lines 12–35:
All color variables are defined in the `:root` section. You can easily adjust the pink shades, gold accents, and card shadows.

---

## 📁 Project Structure

```text
Leilte-Anniversary/
│
├── index.html               # Main semantic HTML structure & content
├── style.css                # Romantic styling, typography, and responsive layouts
├── script.js                # Interactive logic (dodging button, confetti, video controls, etc.)
├── README.md                # This setup and customization guide
│
└── assets/
    ├── photos/
    │   ├── README.txt       # Instructions for adding 10 photos
    │   ├── placeholder-01.svg through placeholder-10.svg # Fallback vector art
    │
    ├── videos/
    │   ├── README.txt       # Instructions for adding 15 videos
    │   ├── poster-01.svg through poster-15.svg           # Fallback video posters
    │
    └── music/
        └── README.txt       # Instructions for adding our-song.mp3
```

Made with all the love in the world for Leilte! 👑❤️
