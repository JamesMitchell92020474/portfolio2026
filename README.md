# James Mitchell — Portfolio 2026

**Repo:** https://github.com/JamesMitchell92020474/portfolio2026

Personal portfolio website for James Mitchell, front-end developer and graphic designer based in Christchurch, NZ.

## Structure

```
portfolio2026/
├── index.html       # Single-page site
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
```

## Sections

- **Hero** — headline, CTA buttons, and quick stats
- **Work** — filterable project grid (Web Development / Graphic Design)
- **About** — bio, skills, and education
- **Contact** — contact form (Formspree) and direct contact links

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

- [ ] Replace placeholder project cards with real project images and details
- [ ] Add CV download link
- [ ] Set up Formspree form ID
- [ ] Deploy
