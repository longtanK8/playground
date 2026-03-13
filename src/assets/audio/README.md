# Background Music Setup

## Currently Using

**Audio files auto-loading from this folder**

- System scans `src/assets/audio/` for `.mp3` files
- If no files found, falls back to Pixabay CDN URL
- Supports unlimited tracks (loops through playlist)

## How to Add Music

### Option 1: Add Local MP3 Files (Recommended)

1. Download free music from:
   - **Incompetech** - https://incompetech.com/
   - **Pixabay Music** - https://pixabay.com/music/
   - **Free Music Archive** - https://freemusicarchive.org/

2. Place `.mp3` files in this folder: `src/assets/audio/`

3. Files will auto-load on next app restart

### Option 2: Use URL Fallback

- If no local files found, uses: Pixabay CDN (CORS-friendly)
- Change the `FALLBACK_URL` in `src/components/BackgroundMusic/BackgroundMusic.tsx`

### Option 3: Use Public Folder (Legacy)

1. Place `background-music.mp3` in `public/music/`
2. Update source path in BackgroundMusic.tsx

## Project Structure

```
src/
├── components/
│   ├── BackgroundMusic/
│   │   ├── BackgroundMusic.tsx  ← Main audio component
│   │   └── index.ts
│   └── MuteButton/
│       ├── MuteButton.tsx
│       ├── MuteButton.css
│       └── index.ts
├── hooks/
│   ├── useAudioControl.ts
│   └── index.ts
├── assets/
│   └── audio/
│       ├── README.md
│       └── *.mp3  ← Add MP3 files here
└── ...
```

## Features

- 🎵 **Music Detection** - Auto-scans audio folder
- 🔊 **Toggle Mute** - Click bubble button to mute/unmute
- 🔁 **Playlist Loop** - Cycles through multiple tracks
- 📡 **CORS-Safe** - Fallback URL supports cross-origin
- ✨ **Animations** - Floating bubble with glow effects

## Debug Console

When app loads, check browser console (F12):

```
🎵 Audio files found: 2
Playing: /src/assets/audio/relaxing-music.mp3
```

## Troubleshooting

**No sound playing?**

- Check browser console for errors (F12 > Console)
- Verify browser allows audio autoplay (some require user interaction first)
- Click mute button to unmute

**CORS Error?**

- Only happens with remote URLs
- Local files don't have CORS issues
- Add `crossOrigin="anonymous"` to audio element if needed

**Want different music?**

- Add more `.mp3` files to `src/assets/audio/`
- System will auto-detect and cycle through them
