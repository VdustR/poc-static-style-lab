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

export type PlainLanguageCard = {
  term: string
  analogy: string
  translation: string
}

export type TimelineLane = {
  tool: string
  authoring: string
  build: string
  browser: string
  runtime: 'None' | 'Tiny merge helper' | 'Style generation'
}

export type ScenarioCard = {
  title: string
  plainEnglish: string
  conflict: string
  visualLayers: string[]
  vanillaExtract: string
  stylex: string
  emotion: string
}

export type CookbookExample = {
  title: string
  whyItMatters: string
  examples: {
    tool: string
    code: string
    takeaway: string
  }[]
}

export type CaseStudy = {
  title: string
  product: string
  bestFit: 'vanilla-extract' | 'StyleX' | 'Emotion'
  setup: string
  pressure: string
  whyItShowsTheTool: string
  visibleWin: string
  visibleRisk: string
  fit: {
    tool: 'vanilla-extract' | 'StyleX' | 'Emotion'
    score: number
    note: string
  }[]
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

export const plainLanguageCards: PlainLanguageCard[] = [
  {
    term: 'Styles',
    analogy:
      'Think of styles as the visual instructions for a product: color, spacing, size, state, and how it should react when someone points at it.',
    translation:
      'The code is not the feature itself. It is the instruction sheet the browser follows to make the feature look and feel right.',
  },
  {
    term: 'Build time vs runtime',
    analogy:
      'Build time is printing all labels before the shop opens. Runtime is writing or choosing labels while a customer is already waiting.',
    translation:
      'Static CSS tools try to finish as much visual work as possible before the page reaches the browser.',
  },
  {
    term: 'Composition',
    analogy:
      'Composition is stacking several instruction sheets for one object. If two sheets disagree, the important question is: which sheet wins?',
    translation:
      'vanilla-extract answers mostly while creating classes. StyleX and Emotion answer strongly at the place where the component is used.',
  },
  {
    term: 'Atomic CSS',
    analogy:
      'Instead of one large label that says everything, atomic CSS uses many tiny labels: one for color, one for padding, one for display.',
    translation:
      'StyleX leans into this model so repeated properties can be shared and overrides can be decided per property.',
  },
]

export const timelineLanes: TimelineLane[] = [
  {
    tool: 'vanilla-extract',
    authoring:
      'Write typed CSS in .css.ts files, often close to design-system tokens and recipes.',
    build:
      'The bundler evaluates those files and emits CSS classes, variables, and optional recipe helpers.',
    browser:
      'The browser mostly receives ordinary CSS files and class names. No runtime style injection is needed for core styles.',
    runtime: 'None',
  },
  {
    tool: 'StyleX',
    authoring:
      'Write stylex.create objects and pass compiled styles through stylex.props or attrs at component boundaries.',
    build:
      'The compiler extracts atomic CSS rules and replaces style objects with compiled references.',
    browser:
      'A small merge helper turns the applied style objects into the final className and inline variable output.',
    runtime: 'Tiny merge helper',
  },
  {
    tool: 'Emotion',
    authoring:
      'Write css objects, template strings, arrays, or cx class combinations inside regular application code.',
    build:
      'The build ships Emotion code and application code. Extraction is not the default mental model.',
    browser:
      'Styles are generated, merged, and inserted while JavaScript runs, which makes dynamic styling very flexible.',
    runtime: 'Style generation',
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

export const scenarioCards: ScenarioCard[] = [
  {
    title: 'A product button has base, size, and danger states',
    plainEnglish:
      'A button starts with house rules, then chooses a size, then may become a warning button.',
    conflict: 'The base says neutral border. The danger state says red border. The final button should be red.',
    visualLayers: ['Base button', 'Small size', 'Danger tone'],
    vanillaExtract:
      'Best expressed as a Recipe: base styles plus typed variants. The output is predictable class combinations for known button states.',
    stylex:
      'Best expressed as callsite composition: base first, size next, danger last. The last property-level style wins.',
    emotion:
      'Very ergonomic with css arrays: [base, small, danger]. It is clear and dynamic, but resolved at runtime.',
  },
  {
    title: 'A page theme changes from light to dark',
    plainEnglish:
      'The same room gets a different lighting plan, but the furniture does not need to be rebuilt.',
    conflict:
      'Components should keep using the same token names while the token values change under a parent theme.',
    visualLayers: ['Token contract', 'Theme class', 'Component styles'],
    vanillaExtract:
      'Strong fit: createTheme/createThemeContract make a typed token contract and theme classes can switch values for a subtree.',
    stylex:
      'Strong fit with defineVars and createTheme. The stricter .stylex.* variable file rules make the theme surface explicit.',
    emotion:
      'Usually comfortable with ThemeProvider or CSS variables, but theme values are consumed through runtime React context in common Emotion setups.',
  },
  {
    title: 'A reusable card lets the caller override spacing',
    plainEnglish:
      'A component ships with a default layout, but a page is allowed to tighten or loosen it for a specific use.',
    conflict:
      'The card default says padding 24. The caller says padding 12. The caller should win without changing the card source.',
    visualLayers: ['Card default', 'Page context', 'Caller override'],
    vanillaExtract:
      'Possible, but core class composition does not automatically give callsite-last semantics. Teams usually add conventions or use variant props.',
    stylex:
      'Native fit: pass props.style last to stylex.props and the caller override wins by application order.',
    emotion:
      'Native fit: css arrays and cx are built around callsite composition, with later styles overriding earlier Emotion styles.',
  },
]

export const caseStudies: CaseStudy[] = [
  {
    title: 'A SaaS dashboard design system with 80 components',
    product: 'Northwind Ops Console',
    bestFit: 'vanilla-extract',
    setup:
      'A B2B team maintains tables, filters, alerts, drawers, billing screens, and admin tools across multiple product squads.',
    pressure:
      'Design wants strict tokens and approved variants. Product squads want to ship without inventing one-off button, badge, and spacing rules.',
    whyItShowsTheTool:
      'This highlights vanilla-extract because most choices are known before runtime: tokens, recipes, variants, compound states, and CSS output.',
    visibleWin:
      'Recipes make the supported states explicit. A reviewer can quickly see whether a component uses approved sizes and tones.',
    visibleRisk:
      'When a page wants a one-off override, the team needs a variant, a class convention, or a wrapper. Callsite-last override is not the core superpower.',
    fit: [
      {
        tool: 'vanilla-extract',
        score: 95,
        note: 'Best for typed design-system contracts and static variant surfaces.',
      },
      {
        tool: 'StyleX',
        score: 78,
        note: 'Good if the app is React-heavy, but stricter compiler rules add adoption work.',
      },
      {
        tool: 'Emotion',
        score: 60,
        note: 'Flexible, but runtime styling is not the main goal for this stable system.',
      },
    ],
  },
  {
    title: 'A reusable feed card that appears in ten contexts',
    product: 'Launchpad Creator Feed',
    bestFit: 'StyleX',
    setup:
      'The same card appears in home feed, search results, promoted placements, compact sidebars, and partner embeds.',
    pressure:
      'Each context wants small differences: tighter padding, hidden metadata, different emphasis, or local color accents.',
    whyItShowsTheTool:
      'This highlights StyleX because the important question is not just "what is the card style?" but "which caller is allowed to override which property?"',
    visibleWin:
      'stylex.props can place the component default first and caller style last. The winning style is visible at the component boundary.',
    visibleRisk:
      'Teams must accept StyleX static-analysis rules. Arbitrary object spreading and imported dynamic style values become migration pain.',
    fit: [
      {
        tool: 'vanilla-extract',
        score: 68,
        note: 'Good for named variants, weaker when every caller needs local final say.',
      },
      {
        tool: 'StyleX',
        score: 96,
        note: 'Best for deterministic property-level overrides across component boundaries.',
      },
      {
        tool: 'Emotion',
        score: 86,
        note: 'Also strong for callsite overrides, but with runtime style generation.',
      },
    ],
  },
  {
    title: 'A campaign builder with user-picked colors and live previews',
    product: 'Signal Campaign Studio',
    bestFit: 'Emotion',
    setup:
      'Marketers drag blocks, choose brand colors, preview multiple layouts, and save experiments while the page updates instantly.',
    pressure:
      'The styling data is highly dynamic. Many values come from user input, CMS fields, or preview-only combinations that are not known at build time.',
    whyItShowsTheTool:
      'This highlights Emotion because runtime styling is not a weakness here; it is the reason the experience is easy to build.',
    visibleWin:
      'css arrays and dynamic objects can directly reflect user input. The implementation stays close to the live preview state.',
    visibleRisk:
      'If the same product later needs a strict static CSS budget, Emotion becomes the wrong default unless the dynamic area is isolated.',
    fit: [
      {
        tool: 'vanilla-extract',
        score: 54,
        note: 'Useful for the editor shell, but not ideal for arbitrary user-generated styling.',
      },
      {
        tool: 'StyleX',
        score: 58,
        note: 'Can use variables, but arbitrary dynamic style objects fight the compiler model.',
      },
      {
        tool: 'Emotion',
        score: 95,
        note: 'Best for highly dynamic preview surfaces and runtime style composition.',
      },
    ],
  },
  {
    title: 'A public marketing site plus an embedded app surface',
    product: 'Atlas Launch Pages',
    bestFit: 'vanilla-extract',
    setup:
      'A team ships documentation pages, landing pages, pricing pages, and a small logged-in widget from one shared design language.',
    pressure:
      'The public site wants static assets, predictable CSS, and low JavaScript. The widget still needs component-level consistency.',
    whyItShowsTheTool:
      'This highlights vanilla-extract because it lets the team treat styling as build output while keeping design tokens in TypeScript.',
    visibleWin:
      'The marketing site gets static CSS and shared token contracts without adopting a React-specific styling mental model everywhere.',
    visibleRisk:
      'If the embedded widget later becomes override-heavy, StyleX may fit that widget better than the shared site styling system.',
    fit: [
      {
        tool: 'vanilla-extract',
        score: 92,
        note: 'Best when cross-framework static output and typed tokens matter together.',
      },
      {
        tool: 'StyleX',
        score: 72,
        note: 'Strong inside the React widget, less compelling for non-React page surfaces.',
      },
      {
        tool: 'Emotion',
        score: 52,
        note: 'Convenient, but adds runtime styling where static output is the product goal.',
      },
    ],
  },
  {
    title: 'A legacy React app with many hand-written className overrides',
    product: 'LedgerFlow Back Office',
    bestFit: 'StyleX',
    setup:
      'An older internal app has dozens of components accepting className, style, and theme props from different product teams.',
    pressure:
      'Nobody fully trusts CSS order. A small change in one shared component can change spacing or colors in a distant screen.',
    whyItShowsTheTool:
      'This highlights StyleX because deterministic composition is a direct answer to "I passed an override, why did it not win?"',
    visibleWin:
      'The migration can make override order explicit: component defaults, feature state, then caller style. Reviewers can inspect the order in one place.',
    visibleRisk:
      'Legacy dynamic patterns may need cleanup before they compile. The migration may be more architectural than a search-and-replace.',
    fit: [
      {
        tool: 'vanilla-extract',
        score: 66,
        note: 'Good for rebuilding stable components, less direct for override-order cleanup.',
      },
      {
        tool: 'StyleX',
        score: 91,
        note: 'Best when override determinism is the migration goal.',
      },
      {
        tool: 'Emotion',
        score: 83,
        note: 'Very practical for incremental migration, but keeps runtime styling in place.',
      },
    ],
  },
  {
    title: 'A one-off prototype that changes every design review',
    product: 'Checkout Experiment Room',
    bestFit: 'Emotion',
    setup:
      'A product team is testing three checkout flows, four layouts, and several color treatments before committing to a design system change.',
    pressure:
      'The layout changes every week. Most style decisions are temporary, and developer speed matters more than long-term static output.',
    whyItShowsTheTool:
      'This highlights Emotion because its flexibility is valuable before the team knows which abstractions deserve to become permanent.',
    visibleWin:
      'Developers can compose temporary states directly in the component and delete them later without designing a full variant API first.',
    visibleRisk:
      'If prototype code hardens into production, temporary dynamic styles can become the design system by accident.',
    fit: [
      {
        tool: 'vanilla-extract',
        score: 62,
        note: 'Useful once the experiment stabilizes, heavier while ideas are still volatile.',
      },
      {
        tool: 'StyleX',
        score: 64,
        note: 'Good if the prototype already follows final app constraints.',
      },
      {
        tool: 'Emotion',
        score: 93,
        note: 'Best for speed and exploratory composition before rules stabilize.',
      },
    ],
  },
]

export const cookbookExamples: CookbookExample[] = [
  {
    title: 'Button variants',
    whyItMatters:
      'This is the design-system case: a small set of supported combinations should be easy to type, audit, and reuse.',
    examples: [
      {
        tool: 'vanilla-extract',
        code: `export const button = recipe({
  base: { borderRadius: 6, fontWeight: 700 },
  variants: {
    tone: {
      neutral: { background: vars.color.surface },
      danger: { background: vars.color.danger },
    },
    size: {
      sm: { padding: '6px 10px' },
      md: { padding: '10px 14px' },
    },
  },
})

<button className={button({ tone: 'danger', size: 'sm' })} />`,
        takeaway:
          'The API advertises allowed variants and keeps generated output static.',
      },
      {
        tool: 'StyleX',
        code: `const styles = stylex.create({
  base: { borderRadius: 6, fontWeight: 700 },
  danger: { backgroundColor: 'red' },
  small: { padding: '6px 10px' },
})

<button
  {...stylex.props(styles.base, isDanger && styles.danger, styles.small)}
/>`,
        takeaway:
          'The component decides the final stack at the element boundary.',
      },
      {
        tool: 'Emotion',
        code: `const base = css({ borderRadius: 6, fontWeight: 700 })
const danger = css({ backgroundColor: 'red' })
const small = css({ padding: '6px 10px' })

<button css={[base, isDanger && danger, small]} />`,
        takeaway:
          'The composition reads naturally, but style resolution is runtime work.',
      },
    ],
  },
  {
    title: 'Caller overrides',
    whyItMatters:
      'This is the component-library case: consumers need a controlled way to adjust one component without fighting CSS order.',
    examples: [
      {
        tool: 'vanilla-extract',
        code: `export const card = style({ padding: 24 })
export const compactCard = style([card, { padding: 12 }])

<section className={compactCard} />`,
        takeaway:
          'Excellent when the override is known while authoring the style module.',
      },
      {
        tool: 'StyleX',
        code: `function Card(props) {
  return <section {...stylex.props(styles.card, props.style)} />
}

<Card style={styles.compact} />`,
        takeaway:
          'Excellent when the caller should decide final overrides.',
      },
      {
        tool: 'Emotion',
        code: `function Card({ css: cssProp }) {
  return <section css={[card, cssProp]} />
}

<Card css={compact} />`,
        takeaway:
          'The caller override pattern is very direct, with runtime flexibility.',
      },
    ],
  },
  {
    title: 'Who wins when styles conflict?',
    whyItMatters:
      'Most styling bugs are not about setting a value. They are about understanding which value wins when two values collide.',
    examples: [
      {
        tool: 'vanilla-extract',
        code: `const base = style({ color: 'gray' })
const danger = style([base, { color: 'red' }])

// danger carries both classes, but the authored composition owns the result.`,
        takeaway:
          'The safest path is to compose the final class in the style module.',
      },
      {
        tool: 'StyleX',
        code: `stylex.props(styles.base, styles.primary, styles.danger)

// danger wins because it is applied last.`,
        takeaway:
          'The winning rule is visible where the element is rendered.',
      },
      {
        tool: 'Emotion',
        code: `css={[base, primary, danger]}
cx(baseClass, primaryClass, dangerClass)

// later Emotion styles win.`,
        takeaway:
          'The winning rule is also visible at the callsite, with runtime style insertion.',
      },
    ],
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
