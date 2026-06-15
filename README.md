# Mohammad Ali Faizan — iOS 27 Liquid Glass SOC Portfolio

Rebuilt as a static production-style portfolio using the three practical liquid-glass layers described in the reference:

1. **CSS Glassmorphism** — `backdrop-filter`, translucent panels, highlight tracking, GPU layer promotion, and fallback styles.
2. **SVG Filter Distortion** — inline SVG displacement filter `#ios-liquid-distortion` applied to glass highlight layers for local refractive texture.
3. **WebGL / GLSL Depth Layer** — `scripts/glsl-liquid.js` renders a GPU-animated liquid/refraction veil. Three.js and Babylon.js add optional depth overlays.

## Stack

- HTML + CSS + modular JavaScript
- CSS `backdrop-filter` with fallback
- SVG displacement filter
- WebGL GLSL shader
- GSAP + ScrollTrigger
- Motion CDN layer for Framer Motion-style animation
- Three.js
- Babylon.js
- Uploaded background image: `assets/surface-liquid-bg.webp`

## Structure

```text
index.html
assets/surface-liquid-bg.webp
styles/base.css
styles/glass.css
styles/components.css
styles/responsive.css
scripts/main.js
scripts/ui.js
scripts/glsl-liquid.js
scripts/gsap-scenes.js
scripts/motion-layer.js
scripts/three-scene.js
scripts/babylon-scene.js
README.md
.nojekyll
```

## Wired content

- Name: Mohammad Ali Faizan
- Role: SOC Analyst L1 / Security Analyst Trainee
- Email: mohammadalifaizan123@gmail.com
- GitHub: https://github.com/Mohd-Ali2
- TryHackMe: https://tryhackme.com/p/chan4o
- Proof: 112+ rooms, Top 4%, 24 badges, 45-day streak

If GitHub Pages shows old styling, hard refresh with Ctrl + Shift + R because versioned CSS/JS files may still be cached briefly.
