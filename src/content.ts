export type ComparisonRow = {
  dimension: string
  vanillaExtract: string
  stylex: string
  read: string
}

export type CompositionPanel = {
  tool: string
  stance: string
  summary: string
  strengths: string[]
  caveats: string[]
  snippet: string
  sourceHref: string
}

export const versionSnapshot = [
  ['@vanilla-extract/css', '1.21.1'],
  ['@vanilla-extract/vite-plugin', '5.2.3'],
  ['@stylexjs/stylex', '0.19.0'],
  ['@stylexjs/unplugin', '0.19.0'],
  ['@emotion/css', '11.13.5'],
  ['vite-plus', '0.2.2'],
  ['vite', '8.1.3'],
]

export const comparisonRows: ComparisonRow[] = [
  {
    dimension: 'Core model',
    vanillaExtract:
      'CSS files are authored in TypeScript through .css.ts modules. The output is ordinary scoped CSS classes and CSS variables processed by the bundler.',
    stylex:
      'Styles are authored with stylex.create and compiled into atomic CSS. Components apply compiled style objects through stylex.props or attrs.',
    read:
      'vanilla-extract feels closer to typed CSS modules. StyleX feels closer to an atomic styling compiler with a runtime merge API.',
  },
  {
    dimension: 'Runtime cost',
    vanillaExtract:
      'Core style() output has no style-generation runtime. Optional Recipes and Sprinkles can run class selection helpers, but still do not inject styles at runtime.',
    stylex:
      'No runtime style injection, but StyleX intentionally keeps a small runtime for deterministic class and inline variable merging.',
    read:
      'Both target static CSS. If "zero runtime" is literal, vanilla-extract core is cleaner. If deterministic runtime composition is acceptable, StyleX buys stronger override semantics.',
  },
  {
    dimension: 'Static constraints',
    vanillaExtract:
      'Anything in .css.ts must be serializable by the integration. Arrays of style objects can be deep merged at build time.',
    stylex:
      'Raw style objects must be statically analyzable. Imported arbitrary values and object spreads are disallowed, except StyleX variable modules and allowed expressions.',
    read:
      'StyleX is stricter because it optimizes atomic output and deterministic composition. vanilla-extract gives more room for build-time utilities.',
  },
  {
    dimension: 'Composition',
    vanillaExtract:
      'style([className, styleObject]) returns a single classlist string. Composed classes can still be treated as one selector identity inside vanilla-extract selectors.',
    stylex:
      'stylex.props(a, condition && b, styleProp) merges in callsite order. The last applied style wins, independent of declaration order.',
    read:
      'StyleX has the stronger callsite composition story. vanilla-extract has stronger build-time class composition and selector identity.',
  },
  {
    dimension: 'Variants',
    vanillaExtract:
      'Recipes provides a type-safe multi-variant API with base styles, variants, compound variants, and default variants generated at build time.',
    stylex:
      'Variants are a recommended pattern built from object lookups plus stylex.props. Compound behavior usually comes from deterministic merge order.',
    read:
      'vanilla-extract has a more explicit variant DSL. StyleX keeps variants closer to plain TypeScript and composition rules.',
  },
  {
    dimension: 'Theming',
    vanillaExtract:
      'createTheme, createThemeContract, createGlobalTheme, and typed CSS variables support scoped themes and design-token contracts.',
    stylex:
      'defineVars and createTheme model tokens like providers for subtrees. Variables must follow .stylex.* file and named-export rules.',
    read:
      'Both are strong. vanilla-extract is more flexible across file shapes; StyleX is more opinionated and compiler-checked.',
  },
  {
    dimension: 'Responsive and state styles',
    vanillaExtract:
      'Uses @media, @supports, @container, pseudo selectors, and complex selectors in style objects with generated CSS rule ordering.',
    stylex:
      'Represents pseudo states and media queries inside property values. Conditions compose at property level and require explicit default cases in contextual styles.',
    read:
      'vanilla-extract maps more directly to CSS structure. StyleX normalizes conditions around atomic property rules.',
  },
  {
    dimension: 'Framework fit',
    vanillaExtract:
      'Framework agnostic with integrations for Vite, Webpack, Next.js, Remix, Astro, Rollup, Parcel, Gatsby, esbuild, and more.',
    stylex:
      'Deepest fit is React and Meta-style component systems, but it exposes attrs for non-React frameworks and ships Vite, Webpack, Rspack, esbuild, and PostCSS paths.',
    read:
      'vanilla-extract is the safer cross-framework design-system default. StyleX is compelling for React-heavy apps that value atomic CSS and override determinism.',
  },
  {
    dimension: 'Ecosystem maturity',
    vanillaExtract:
      'Older and widely adopted in TypeScript design-system work. Recipes and Sprinkles are established optional packages.',
    stylex:
      'Newer public ecosystem, backed by Meta. The docs and plugin surface are moving fast, with recent Vite and RSC-focused guides.',
    read:
      'Choose vanilla-extract for lower adoption risk today. Choose StyleX when its model matches your app architecture strongly enough to absorb churn.',
  },
  {
    dimension: 'Debugging output',
    vanillaExtract:
      'Vite plugin identifiers can be short hashes, debug names, or custom generated names.',
    stylex:
      'Atomic output can be less semantically grouped, but merge order is intentionally deterministic and compiler/lint rules catch non-static code.',
    read:
      'vanilla-extract is easier to map back to author intent. StyleX optimizes for consistent runtime application and compiler discipline.',
  },
]

export const compositionPanels: CompositionPanel[] = [
  {
    tool: 'vanilla-extract',
    stance: 'Build-time classlist composition',
    summary:
      'Composition happens while defining classes. style([...]) accepts existing class names and style objects, then returns a classlist that consuming code treats as one class name.',
    strengths: [
      'Great for reusable design-system primitives.',
      'Composed classes can still participate in selectors as a single generated identity.',
      'Deep merge of style objects is useful for typed style utilities.',
    ],
    caveats: [
      'Callsite override behavior is still ordinary CSS class and rule-order behavior unless you add a helper.',
      'Conditional runtime composition is usually handled outside core style(), through class joining, Recipes, or Sprinkles.',
    ],
    snippet: `const base = style({ padding: 12 })
const primary = style([base, { background: 'blue' }])

// primary is a classlist string:
// "base_hash primary_hash"`,
    sourceHref: 'https://vanilla-extract.style/documentation/style-composition',
  },
  {
    tool: 'StyleX',
    stance: 'Callsite-first deterministic composition',
    summary:
      'Composition happens at the element boundary. stylex.props receives styles, arrays, falsy conditionals, and style props, then merges by application order.',
    strengths: [
      'The last applied style wins regardless of declaration order.',
      'Nested arrays and style props work naturally across component boundaries.',
      'Setting a property to null can unset an earlier StyleX value without extra generated CSS.',
    ],
    caveats: [
      'The merge API is part of the model, so it is not literally runtime-free.',
      'Static analyzability rules make arbitrary imported style objects and object spreads invalid.',
    ],
    snippet: `<div
  {...stylex.props(
    styles.base,
    isHighlighted && styles.highlighted,
    props.style,
  )}
/>`,
    sourceHref: 'https://stylexjs.com/docs/learn/styling-ui/using-styles/',
  },
  {
    tool: 'Emotion',
    stance: 'Runtime composition and insertion-order control',
    summary:
      'Emotion is not a static zero-runtime solution, but its composition model is the useful control case: css arrays and cx merge generated class names in the order you use them.',
    strengths: [
      'Very ergonomic for dynamic values, object styles, template strings, and React css props.',
      'Composition order is explicit at the callsite, avoiding many plain CSS class ordering traps.',
      'cx detects Emotion-generated class names and applies later values over earlier ones.',
    ],
    caveats: [
      'It generates and inserts styles at runtime unless you add separate extraction tooling.',
      'It is the flexible baseline, not the static CSS baseline.',
    ],
    snippet: `<div css={[base, danger]}>Red wins</div>
<div className={cx(cls1, cls2)} />`,
    sourceHref: 'https://emotion.sh/docs/composition',
  },
]

export const decisionCards = [
  {
    title: 'Choose vanilla-extract when',
    body:
      'You are building a typed design system, want CSS-module-like artifacts, need explicit variant APIs, or care about framework portability more than callsite override semantics.',
  },
  {
    title: 'Choose StyleX when',
    body:
      'Your app is component-heavy, override order matters at the element boundary, atomic CSS output is desirable, and your team is comfortable with stricter static-analysis rules.',
  },
  {
    title: 'Keep Emotion in scope when',
    body:
      'You need high dynamic styling flexibility, runtime theming ergonomics, or incremental migration. It is the best composition ergonomics baseline, but not the static CSS target.',
  },
]

export const sources = [
  ['StyleX Vite + React', 'https://stylexjs.com/docs/learn/installation/vite/vite-react'],
  ['StyleX using styles', 'https://stylexjs.com/docs/learn/styling-ui/using-styles/'],
  ['StyleX defining styles', 'https://stylexjs.com/docs/learn/styling-ui/defining-styles/'],
  ['StyleX defining variables', 'https://stylexjs.com/docs/learn/theming/defining-variables/'],
  ['vanilla-extract Vite', 'https://vanilla-extract.style/documentation/integrations/vite/'],
  ['vanilla-extract composition', 'https://vanilla-extract.style/documentation/style-composition'],
  ['vanilla-extract style API', 'https://vanilla-extract.style/documentation/api/style/'],
  ['vanilla-extract Recipes', 'https://vanilla-extract.style/documentation/packages/recipes/'],
  ['vanilla-extract Sprinkles', 'https://vanilla-extract.style/documentation/packages/sprinkles/'],
  ['Emotion composition', 'https://emotion.sh/docs/composition'],
  ['Emotion @emotion/css', 'https://emotion.sh/docs/@emotion/css'],
  ['Vite static deploy', 'https://vite.dev/guide/static-deploy.html#github-pages'],
  ['Vite+ create', 'https://viteplus.dev/guide/create'],
  ['Vite+ CI', 'https://viteplus.dev/guide/ci'],
  ['GitHub Pages custom workflows', 'https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages'],
]
