# Static Style Lab

A focused comparison of vanilla-extract and StyleX for static CSS-in-JS
decisions, with Emotion included as the composition ergonomics baseline.

Site: <https://vdustr.dev/poc-static-style-lab/>

## Stack

- Vite+ with Vite, React, and TypeScript
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

## Research Scope

The comparison focuses on current official documentation and npm metadata for:

- vanilla-extract core, Vite integration, Recipes, and Sprinkles
- StyleX style creation, Vite integration, theming, variants, and composition
- Emotion composition and `@emotion/css` composition helpers
- Vite and GitHub Pages deployment guidance
- Vite+ project and CI guidance

## Licensing

Code is licensed under MIT.

Comparison prose, tables, diagrams, and research notes are dedicated under
CC0 1.0 Universal.
