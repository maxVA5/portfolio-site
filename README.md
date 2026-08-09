# Max Potenciano Portfolio — Virtual Assistant | Web Designer

A two-page portfolio site (cover/about/skills/projects/contact + a companion style guide),
built in plain HTML, CSS, and a single line of JS. No build step, no framework, no npm install.

## Folder structure

```
portfolio-site/
├── index.html          → the portfolio itself (Cover, Profile, Skills, Projects, Contact)
├── style-guide.html     → the live design-system reference page
├── css/
│   ├── base.css         → shared design tokens + reusable components (colors, fonts,
│   │                       textures, torn-edge divider, cutout/sticker/button system,
│   │                       nav, footer) — loaded by BOTH html pages
│   ├── portfolio.css    → layout rules only used on index.html
│   └── style-guide.css  → layout rules only used on style-guide.html
├── js/
│   └── main.js          → sets the footer's copyright year (the only JS on the site)
└── README.md            → this file
```

## How to view it

No server or build step required.

- **Fastest**: double-click `index.html` — it opens directly in your browser.
- **In VS Code**: install the "Live Server" extension, right-click `index.html` →
  "Open with Live Server". This gives you auto-refresh on save, which is worth it
  since you'll likely be tweaking CSS a lot.

## How to customize

**Change the color palette** — edit the six variables at the top of `css/base.css`:

```css
:root{
  --ink:#000000;
  --moss:#8DB355;
  --butter:#FFEA93;
  --signal:#D90000;
  --paper:#F4EFE1;
  --paper-dim:#e9e1cb;
}
```

Every color everywhere on the site is pulled from these — change one line here to re-theme
the whole thing.

**Change the fonts** — swap the Google Fonts `<link>` in the `<head>` of both HTML files,
then update the three `font-family` declarations near the top of `css/base.css`
(`h1,h2,h3`, `.eyebrow`, `body`).

**Change your name/bio/projects** — all in `index.html`, it's plain text and markup,
no data files or templating involved.

**Add a new page** — copy the `<head>` block from either existing HTML file (same font
links + `base.css`), add a new `css/your-page.css` for anything page-specific, and reuse
the existing classes (`.cutout`, `.sticker`, `.btn`, `.eyebrow`, `.torn-edge`, `.halftone`,
`.tape`, `mark`) to keep it visually consistent with the rest of the site.

## Notes

- Fonts (Anton, Space Mono, Work Sans) load from Google Fonts via CDN — you'll need an
  internet connection the first time each font loads (then it's cached by the browser).
- All animations respect `prefers-reduced-motion` and turn off automatically for anyone
  who has that OS setting enabled.
- No dependencies, no `package.json`, nothing to `npm install`.
