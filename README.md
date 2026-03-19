# James Mitchell — Portfolio 2026

**Repo:** https://github.com/JamesMitchell92020474/portfolio2026

Personal portfolio website for James Mitchell, front-end developer and graphic designer based in Christchurch, NZ.

## Structure

```
portfolio2026/
├── index.html       # Homepage — hero + portfolio grid
├── work.html        # Full project grid with filter
├── about.html       # Bio, skills, and education
├── contact.html     # Contact form and direct links
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
```

## Pages

- **index.html** — Hero with label bar and 5-card portfolio grid
- **work.html** — Full portfolio grid, filterable by Web Development / Graphic Design
- **about.html** — Two-column layout with bio, skill pills, and education
- **contact.html** — Two-column layout with Formspree contact form

## Design

- Colour palette: `#FAF8F3` background, `#00B4FF` accent, `#222222` headings
- Typography: system font stack, weight 400–500
- Content constrained to 1200px max-width
- Fully responsive — single column below 768px, mobile hamburger nav

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

- [ ] Replace placeholder project thumbnails with real images
- [ ] Add CV file and wire up Download CV button
- [ ] Set up Formspree form ID
- [ ] Deploy
