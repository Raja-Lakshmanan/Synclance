Place optional UI sound files here if you want to keep source assets together:

- menu-open.mp3
- menu-close.mp3
- click.mp3

The current runtime paths are configured in `src/utils/sound.js` as `/audio/...`.
For production-ready static playback in Vite, copy these files to `public/audio/`
or update `SOUND_PATHS` in `src/utils/sound.js` to match your deployed asset paths.
