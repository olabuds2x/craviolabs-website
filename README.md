# Cravio Labs Website

Marketing site for [Cravio Labs](https://craviolabs.com), the creative performance studio for trading and fintech brands.

A fully static, dependency-free site built with vanilla HTML, CSS, and JavaScript. No framework, no build step, no external requests: fonts are self-hosted variable fonts subset by unicode range.

## Structure

```
index.html              Single-page site
assets/
  css/base.css          Design tokens, font faces, primitives (nav, buttons, footer)
  css/sections.css      Section-level styles (hero, services, work, process, CTA)
  js/main.js            Interactions: scroll reveals, nav state, smooth anchors
  fonts/                Self-hosted variable fonts (Schibsted Grotesk, Hanken Grotesk, Newsreader)
  favicon.svg           Brand favicon
  og.png                Social share image (1200 x 630)
```

## Run locally

Any static file server works. For example:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deployment

Deployed on Vercel as a static site. No build command; the output directory is the repository root.

## Notes

- Reveal animations respect `prefers-reduced-motion` and degrade safely without JavaScript (content is visible by default).
- The hero reel and work gallery contain illustrative concept creative, not client campaigns.
