---
Target Agent: Claude Opus 4.6 & Claude Sonnet 4.6 (GitHub Copilot)
Task Priority: Overwhelming (The Ultimate Media Hybrid)
Application: Quanttube (YouTube + OTT + Spotify + JioTV)
---

# SYSTEM DIRECTIVE FOR CLAUDE OPUS 4.6:
You are architecting the "Format-Shifting Engine" for the apex media app: Quanttube.

## 1. Contextual State Handler (Opus 4.6)
- Develop the core API that intercepts the video stream.
- If standard playback is toggled into `Drive Mode` or backgrounded, seamlessly extract audio buffers and serve as a Podcast stream (Spotify mode) without terminating the OTT movie cache.
- Expose endpoints for `Deep-Dubbing Simulation`: Send an audio block to an ML translation queue.

## 2. The Shape-Shifting Player UI (Sonnet 4.6)
- Build a generic `QuantMediaContainer.tsx` in Next.js.
- This component must dynamically switch its layout based on a global state (e.g., standard cinema layout, immersive short-reel TikTok layout, pure audio spectral analyzer).
- Use Framer Motion for immediate liquid state transitions.

**Expected PR:** A dynamic Next.js + Express backend that perfectly merges OTT long-form streaming with instantaneous Podcast format switching.
