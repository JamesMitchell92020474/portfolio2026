# James Mitchell — Portfolio 2026

**Repo:** https://github.com/JamesMitchell92020474/portfolio2026

Personal portfolio website for James Mitchell, front-end developer and graphic designer based in Christchurch, NZ.

## Structure

```
portfolio2026/
├── index.html                    # Homepage — hero + 3×3 portfolio grid
├── about.html                    # Bio, skills, and education
├── contact.html                  # Contact form and direct links
├── projects/
│   ├── homerow.html              # HomeRow — Touch Typing Tutor
│   ├── 4for40.html               # Islam Is… 4for40
│   ├── asqs.html                 # Asset Sure Quantity Surveyors
│   ├── community-brochures.html  # Christchurch City Council — Community Brochures
│   ├── cuppa-joes.html           # Cuppa Joe's
│   ├── greenworld.html           # Greenworld
│   ├── pwm-law.html              # Peter Mitchell Law
│   ├── step-up.html              # E3 Business Accountants — Step Up
│   └── claudes-gambit.html       # Claude's Gambit — AI chess game
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
```

## Features

- 3×3 portfolio grid on homepage
- Individual project pages with hero image, description, meta, and image gallery
- Lightbox image viewer with prev/next navigation and keyboard support (← → Esc)
- Sticky nav with scroll shadow
- Mobile hamburger nav overlay
- Contact form via Formspree

## Design

- Colour palette: `#FAF8F3` background, `#00B4FF` accent, `#222222` headings
- Typography: system font stack, weight 400–500
- Content constrained to 1200px max-width
- Fully responsive — single column below 768px, hamburger nav on mobile

## Setup

No build step. Open `index.html` directly in a browser, or serve with any static file server:

```bash
npx serve .
```

## Contact form

The form uses [Formspree](https://formspree.io). Replace the placeholder in `contact.html` with your actual form ID:

```html
action="https://formspree.io/f/REPLACE_WITH_YOUR_ID"
```

## To do

- [ ] Add real images and content for 4for40 project page
- [ ] Add screenshots for Claude's Gambit project page
- [ ] Add CV file and wire up Download CV button
- [ ] Set up Formspree form ID
- [ ] Deploy
