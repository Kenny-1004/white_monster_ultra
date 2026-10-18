# White Monster Ultra

A fan-made, scroll-driven landing page for Monster Energy Zero Ultra, built with React, TypeScript, Vite and [Motion](https://motion.dev).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run lint     # oxlint
```

## Structure

| Section | File | Motion |
| --- | --- | --- |
| Nav + mobile menu | `src/components/Navbar.tsx` | Scroll-aware glass bar, scroll-spy, animated full-screen menu |
| Hero | `src/components/Hero.tsx` | Line-by-line headline reveal, layered parallax, mouse tilt and sheen on the can |
| Marquee | `src/components/MarqueeStrip.tsx` | Infinite ticker |
| Why Ultra | `src/components/Features.tsx` | Staggered card reveals, parallax filigree |
| The Taste | `src/components/ScrollStory.tsx` | Pinned section: chapters cross-fade, ring rotates, filigree draws in |
| Nutrition | `src/components/Nutrition.tsx` | Scroll-scaled "0g", animated counters |
| Find It | `src/components/CallToAction.tsx` | Opposing text bands and floating cans |

Shared pieces: `CanImage.tsx` (responsive WebP can), `Filigree.tsx` (baroque scrollwork from the can art, optionally drawn by scroll progress). Design tokens live in `src/index.css`.

Animations respect the OS "reduce motion" setting via `MotionConfig reducedMotion="user"`.

## Assets

`public/white-monster-ultra*.webp` and `public/monster-claw.webp` are cut from a product photo of the can. Monster Energy names, logos and can artwork are trademarks of Monster Energy Company; this project is unofficial and not affiliated with them.
