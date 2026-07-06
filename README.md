# Static Style Lab

A focused comparison of vanilla-extract, StyleX, and MUI Pigment CSS for
static CSS-in-JS decisions, with Emotion included as the composition and runtime
ergonomics baseline.

Site: <https://vdustr.dev/poc-static-style-lab/>

## Stack

- Vite+ with Vite, React, and TypeScript
- Build-time React prerendering into static HTML
- StyleX with Vite extraction for static CSS assets
- Shiki build-time syntax highlighting
- pnpm
- GitHub Actions deployment to GitHub Pages

## Local Development

```sh
pnpm install
pnpm dev
```

## Verification

```sh
pnpm lint
pnpm build
```

`pnpm build` runs type checking, Vite+ production build, then prerenders the
React page into `dist/index.html`. The shipped page is static HTML plus extracted
CSS, with a small client enhancer for the live demo controls.

## Research Scope

The comparison focuses on current official documentation and npm metadata for:

- vanilla-extract core, Vite integration, Recipes, and Sprinkles
- StyleX style creation, Vite integration, theming, variants, composition,
  override mechanics, and static-analysis constraints
- MUI Pigment CSS setup, migration guidance, theming, `sx`, project status, and
  package metadata
- Emotion composition, `css` prop behavior, and runtime flexibility tradeoffs
- Vite and GitHub Pages deployment guidance
- Vite+ project and CI guidance

## Licensing

Code is licensed under MIT.

Comparison prose, tables, diagrams, and research notes are dedicated under
CC0 1.0 Universal.
