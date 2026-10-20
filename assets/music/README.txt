🎵 HOW TO ADD YOUR SONG:
==========================
Default song selected: "Perfect" by Ed Sheeran

OPTION A: Add an MP3 file (local playback)
------------------------------------------
1. Place an audio file named `our-song.mp3` directly in this folder (`assets/music/`).
2. The built-in music player on the website will instantly detect it and play/pause it!

OPTION B: Use Spotify or YouTube (streaming link)
-------------------------------------------------
1. Open `script.js` in a text editor.
2. Locate the line:
     const SONG_STREAM_URL = "https://open.spotify.com/search/Ed%20Sheeran%20Perfect";
3. Paste in your favorite Spotify playlist/track link or YouTube link.
4. When Leilte clicks "Listen to Our Song", it will open your chosen song!

NOTE: The website intentionally never pretends to play music when no audio file is present. If no local audio file is found, it cleanly offers the direct music link.
