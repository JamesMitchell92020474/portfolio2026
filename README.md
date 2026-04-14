# James Mitchell — Portfolio 2026

**Repo:** https://github.com/JamesMitchell92020474/portfolio2026

Personal portfolio website for James Mitchell, front-end developer and graphic designer based in Christchurch, NZ.

## Structure

```
portfolio2026/
├── index.html                    # Single-page site — hero, portfolio grid, about, contact
├── projects/
│   ├── 4for40.html               # Islam Is… 4for40
│   ├── homerow.html              # HomeRow — Touch Typing Tutor
│   ├── claudes-gambit.html       # Claude's Gambit — AI chess game
│   ├── pwm-law.html              # PW Mitchell Law
│   ├── asqs.html                 # Asset Sure Quantity Surveyors
│   ├── step-up.html              # E3 Business Accountants — Step Up
│   ├── community-brochures.html  # Christchurch City Council — Community Brochures
│   ├── cuppa-joes.html           # Cuppa Joe's
│   └── greenworld.html           # Greenworld
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
```

## Features

- Single-page layout — hero, portfolio grid, about, and contact all on index.html
- Section backgrounds graduate from warm cream → light teal → teal → deep teal footer
- 3×3 portfolio grid with filter buttons (All / Web / Print / UI/UX) and staggered fade-in animation
- Nav shrinks on scroll — logo starts large, compresses to compact size
- Scroll-to-top button — appears after 400px scroll, fixed bottom-right
- Page fade-in on load across all pages
- Project pages with image carousel (auto-advancing, thumbnail nav, stops after manual interaction)
- Lightbox viewer on carousel main image with prev/next and keyboard support (← → Esc)
- Inline nav links on desktop (Work / About / Contact), hamburger overlay on mobile
- Sticky nav with scroll shadow
- Contact form via Formspree

## Design

- Colour palette: `#FAF8F3` background, `#00b7b5` accent, `#018790` / `#005461` section/footer teal
- Typography: Jost (Google Fonts, weights 300/400/500), 18px base, 16px project descriptions
- Logo: uppercase, weight 400, letter-spacing 0.18em, `#018790` teal
- Content constrained to 1200px max-width
- Fully responsive — single column below 768px, hamburger nav on mobile

## Setup

No build step. Open `index.html` directly in a browser, or serve with any static file server:

```bash
npx serve .
```

## Contact form

The form uses [Formspree](https://formspree.io). Replace the placeholder in `index.html` with your actual form ID:

```html
action="https://formspree.io/f/REPLACE_WITH_YOUR_ID"
```

## To do

- [ ] Add more images for Islam Is… 4for40 project page
- [ ] Add CV file and wire up Download CV button
- [ ] Set up Formspree form ID
- [ ] Deploy
