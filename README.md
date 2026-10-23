# Mengkoung Key — Portfolio

Personal portfolio for Mengkoung Key, Product Builder and Entrepreneur based in Barcelona.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion and next-themes. Fully static — every page prerenders at build time.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

```
src/
  app/                Routes (App Router)
    page.tsx          Home
    about/            About
    work/             Work list
    work/unilinks/    Unilinks case study
    work/linky/       Linky case study
    thinking/         Articles
    experiments/      Experiments
    contact/          Contact
    layout.tsx        Root layout (Inter, theme, nav, footer)
    globals.css       Design tokens (colors, spacing, motion)
  components/         Reusable primitives (Navbar, Footer, Button, Reveal, etc.)
  lib/content.ts      All copy, projects, articles, experiments
```

To add or edit a project: update `src/lib/content.ts`. Case-study pages live under `src/app/work/<slug>/page.tsx`.

## Design system

- **Font**: Inter (via `next/font/google`)
- **Themes**: light and dark, controlled by `next-themes` (`◐` toggle in nav)
- **Palette**: warm off-white, black, subtle green accent (`#35C878`) — used for status dots only
- **Motion**: quiet `cubic-bezier(0.16, 1, 0.3, 1)` easing; respects `prefers-reduced-motion`

## Deploy to Vercel

**Option A — via GitHub (recommended):**

1. Create a new repo on GitHub (e.g. `mengkoung-portfolio`).
2. From this folder:
   ```bash
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin git@github.com:<you>/<repo>.git
   git push -u origin main
   ```
3. On Vercel → **New Project** → import the repo. No env vars needed. Click Deploy.

**Option B — via Vercel CLI:**

```bash
npm i -g vercel
vercel        # first run links the project
vercel --prod # production deploy
```

## Adding Firebase later

Install when you're ready:

```bash
npm install firebase
```

Put your config in `.env.local` (`NEXT_PUBLIC_FIREBASE_*` vars) and initialise a client in `src/lib/firebase.ts`. Add the same env vars in Vercel → Project Settings → Environment Variables.

## Notes

- Placeholder product visuals live in `src/components/project-preview.tsx` — swap for real screenshots when available.
- Portrait placeholder in `src/components/portrait-placeholder.tsx` — replace with a monochrome photo (`public/portrait.jpg`) and update the About page.
