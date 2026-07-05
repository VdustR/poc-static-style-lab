export type ComparisonRow = {
  dimension: string
  vanillaExtract: string
  stylex: string
  pigmentCss: string
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

export type StyleXMechanic = {
  step: string
  title: string
  body: string
  output: string
}

export type ConstraintComparison = {
  pressure: string
  stylex: string
  emotion: string
  tradeoff: string
}

export type TimelineLane = {
  tool: string
  authoring: string
  build: string
  browser: string
  runtime: string
}

export type ScenarioCard = {
  title: string
  plainEnglish: string
  conflict: string
  visualLayers: string[]
  vanillaExtract: string
  stylex: string
  pigmentCss: string
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
  bestFit: 'vanilla-extract' | 'StyleX' | 'Pigment CSS' | 'Emotion'
  setup: string
  pressure: string
  whyItShowsTheTool: string
  visibleWin: string
  visibleRisk: string
  fit: {
    tool: 'vanilla-extract' | 'StyleX' | 'Pigment CSS' | 'Emotion'
    score: number
    note: string
  }[]
}

export const versionSnapshot = [
  ['@vanilla-extract/css', '1.21.1'],
  ['@vanilla-extract/vite-plugin', '5.2.3'],
  ['@stylexjs/stylex', '0.19.0'],
  ['@stylexjs/unplugin', '0.19.0'],
  ['@pigment-css/react', '0.0.31'],
  ['@pigment-css/vite-plugin', '0.0.31'],
  ['@mui/material-pigment-css', '9.2.0'],
  ['@emotion/react', '11.14.0'],
  ['vite-plus', '0.2.2'],
  ['vite', '8.1.3'],
]

export const comparisonRows: ComparisonRow[] = [
  {
    dimension: 'Current status',
    vanillaExtract:
      'Established zero-runtime CSS-in-TypeScript project with official integrations and companion packages such as Recipes and Sprinkles.',
    stylex:
      'Actively developed Meta styling system with static atomic CSS, compiler plugins, and recent public docs around scale and composition.',
    pigmentCss:
      'MUI docs still mark it as early alpha, and the January 2026 MUI roadmap says Pigment CSS is currently on hold.',
    read:
      'Pigment CSS should be evaluated as a promising MUI migration experiment, not as the same adoption-risk class as vanilla-extract or StyleX.',
  },
  {
    dimension: 'Core model',
    vanillaExtract:
      'Author styles in .css.ts files. The bundler turns TypeScript objects, variables, themes, and recipes into regular CSS assets.',
    stylex:
      'Author stylex.create objects. The compiler emits atomic CSS, and components apply compiled references with stylex.props.',
    pigmentCss:
      'Author with Emotion-like css, styled, variants, and sx APIs. The Pigment plugin extracts supported styles into CSS at build time.',
    read:
      'vanilla-extract feels like typed CSS Modules. StyleX feels like an atomic compiler. Pigment CSS feels like a build-time MUI/Emotion adapter.',
  },
  {
    dimension: 'Runtime cost',
    vanillaExtract:
      'Core style output does not generate or inject CSS in the browser. Optional helpers may select prebuilt classes.',
    stylex:
      'No runtime style injection. A small merge helper remains for non-trivial composition, and the compiler can remove create/props calls when usage is local and static.',
    pigmentCss:
      'Targets zero-runtime CSS extraction, but dynamic escape hatches move values through CSS variables or inline style props.',
    read:
      'All three static candidates reduce browser-side style generation. StyleX is better described as zero runtime CSS generation, not zero JavaScript in every path.',
  },
  {
    dimension: 'Setup and framework fit',
    vanillaExtract:
      'Official integrations cover Vite, Next.js, Webpack, Rollup, esbuild, Parcel, Astro, Gatsby, Remix, and more.',
    stylex:
      'Best documented for React-heavy apps, with Vite, webpack/Rspack, esbuild, Babel, and PostCSS paths.',
    pigmentCss:
      'Official MUI migration docs list Vite and Next.js App Router with webpack v5; Turbopack is not supported yet, and a pnpm plugin issue is called out.',
    read:
      'For a generic Vite app, vanilla-extract has the broadest low-risk fit. For MUI migration, Pigment CSS is relevant but carries toolchain constraints.',
  },
  {
    dimension: 'Composition',
    vanillaExtract:
      'style([...]) composes while defining classes. It can combine class names and style objects into a reusable classlist.',
    stylex:
      'stylex.props composes at the element boundary by merging compiled atomic property references. The last applied style wins regardless of declaration order.',
    pigmentCss:
      'Composition uses familiar styled/css/sx surfaces, but the compiler must be able to extract the result. sx supports arrays, theme callbacks, and build-time replacement.',
    read:
      'StyleX has the clearest callsite override story. vanilla-extract has the cleanest build-time class composition. Pigment CSS keeps familiar MUI ergonomics but adds extraction limits.',
  },
  {
    dimension: 'Variants and props',
    vanillaExtract:
      'Recipes gives an explicit, type-safe API for base styles, variants, compound variants, and defaults.',
    stylex:
      'Variants are usually plain TypeScript lookups and conditionals passed into stylex.props.',
    pigmentCss:
      'styled supports a variants key for build-time-known props, which maps well to MUI-style component variants.',
    read:
      'vanilla-extract is strongest for formal design-system variants. Pigment CSS is comfortable for MUI-like variants. StyleX keeps variant logic closest to component code.',
  },
  {
    dimension: 'Dynamic values',
    vanillaExtract:
      'Unknown runtime values generally need CSS variables through a contract or inline assignment; createTheme itself generates static CSS.',
    stylex:
      'Dynamic style functions are supported for simple runtime values, usually compiled to CSS variable references plus inline style output. The docs call this an advanced feature to use sparingly.',
    pigmentCss:
      'MUI migration docs explicitly say runtime-dependent dynamic values cannot be extracted and should be moved to CSS variables or inline style wrappers.',
    read:
      'Emotion is still the easiest model for arbitrary live values. Among static tools, StyleX has the most explicit dynamic function path; Pigment CSS requires the most migration discipline.',
  },
  {
    dimension: 'Override mechanics',
    vanillaExtract:
      'Overrides are safest when modeled as named variants or authored composition. A random caller class still depends on CSS order and specificity.',
    stylex:
      'Atomic output lets StyleX merge by CSS property rather than by opaque class string, so caller-last overrides stay predictable across component boundaries.',
    pigmentCss:
      'sx arrays and styled variants keep familiar MUI override ergonomics, but only extractable shapes can move into static CSS.',
    read:
      "This is StyleX's special advantage over many static tools: the override decision is a runtime class-selection problem, not runtime CSS generation.",
  },
  {
    dimension: 'Theming',
    vanillaExtract:
      'createTheme and createThemeContract define strongly typed CSS variable contracts and multiple theme classes.',
    stylex:
      'defineVars and theme variables are compiler-aware, with strict file rules that make token surfaces explicit.',
    pigmentCss:
      'Themes are configured in the plugin; extendTheme can generate vars and color schemes, but runtime theme usage is discouraged unless necessary.',
    read:
      'All three can use CSS variables well. Pigment CSS is most tied to MUI theme migration and precompiled theme shape.',
  },
  {
    dimension: 'CSS expressiveness',
    vanillaExtract:
      'Supports selectors, pseudos, media, supports, container queries, keyframes, font-face, layers, and global styles in typed objects.',
    stylex:
      'Optimizes around atomic property rules, pseudos, conditions, variables, and static constraints rather than arbitrary CSS object freedom.',
    pigmentCss:
      'Aims to preserve CSS-in-JS ergonomics with css, styled, keyframes, globalCss, sx, and nested selector support at build time.',
    read:
      'vanilla-extract is closest to writing typed CSS. StyleX is deliberately constrained for scale. Pigment CSS tries to keep Emotion-like authoring while extracting.',
  },
  {
    dimension: 'MUI migration',
    vanillaExtract:
      'Can be used beside MUI, but it does not try to preserve MUI styled/sx semantics or transform MUI internals.',
    stylex:
      'A separate styling system. Migrating from MUI Emotion styles would be an architectural migration, not a drop-in path.',
    pigmentCss:
      'Designed specifically to integrate with Material UI through @mui/material-pigment-css and transformLibraries.',
    read:
      'Pigment CSS has the unique MUI migration story. That story is useful, but the project status makes it a cautious bet.',
  },
  {
    dimension: 'Failure mode',
    vanillaExtract:
      'Teams may over-create variants or need conventions when a caller wants final say over a single property.',
    stylex:
      'Compiler restrictions can block imported dynamic values, object spreads, or patterns that were normal in runtime CSS-in-JS.',
    pigmentCss:
      'Build-time extraction can fail on runtime state, ownerState callbacks, pnpm/tooling edge cases, or unsupported framework paths.',
    read:
      'The question is not just "can it style this?" It is "where will the team feel friction after the first migration week?"',
  },
  {
    dimension: 'Best default',
    vanillaExtract:
      'Best default for typed design systems, cross-framework packages, stable variants, and predictable static CSS.',
    stylex:
      'Best default for React apps where property-level composition and caller override order are central.',
    pigmentCss:
      'Best candidate only when the problem is specifically MUI/Emotion migration and the alpha/on-hold risk is acceptable.',
    read:
      'If starting fresh today, choose vanilla-extract or StyleX first. Reach for Pigment CSS only with a concrete MUI migration reason and a fallback plan.',
  },
]

export const compositionPanels: CompositionPanel[] = [
  {
    tool: 'vanilla-extract',
    stance: 'Build-time classlist composition',
    summary:
      'Composition happens while authoring styles. style([...]) accepts existing class names and style objects, then returns a classlist that consuming code treats as a single exported class.',
    strengths: [
      'Excellent for reusable design-system primitives.',
      'Composed classes can still participate in selectors as a single generated identity.',
      'Deep merging style objects is useful for typed style utilities.',
    ],
    caveats: [
      'Callsite overrides are still ordinary class and rule-order behavior unless the team adds a convention.',
      'Runtime conditional composition usually happens through class joining, Recipes, Sprinkles, or wrapper components.',
    ],
    snippet: `const base = style({ padding: 12 })
const primary = style([base, { background: 'blue' }])

// primary is a reusable classlist string
// built before the browser runs.`,
    sourceHref: 'https://vanilla-extract.style/documentation/api/style/',
  },
  {
    tool: 'StyleX',
    stance: 'Callsite-first deterministic composition',
    summary:
      'Composition happens where the element is rendered. stylex.props receives styles, arrays, falsy conditionals, and style props, then merges by application order.',
    strengths: [
      'The last applied style wins, independent of declaration order.',
      'Nested arrays and style props work naturally across component boundaries.',
      'A component can put defaults first and caller styles last so the override policy is visible.',
    ],
    caveats: [
      'The merge helper is part of the runtime model when the compiler cannot erase the call, so it is not literally zero JavaScript.',
      'Static analyzability rules make arbitrary imported style objects, spreads, and direct runtime style values invalid.',
      'Dynamic style functions are available, but StyleX documentation frames them as advanced and sparing-use.',
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
    tool: 'Pigment CSS',
    stance: 'MUI-like composition under extraction rules',
    summary:
      'Composition uses familiar css, styled, variants, and sx APIs. The difference from Emotion is that Pigment CSS must extract supported style shapes during the bundler pass.',
    strengths: [
      'Preserves a familiar MUI/Emotion-style authoring surface.',
      'styled variants are comfortable when props are known at build time.',
      'sx can be used on Material UI components, HTML elements, and third-party JSX components after setup.',
    ],
    caveats: [
      'Runtime-dependent values must be moved to CSS variables or inline style wrappers.',
      'The project is alpha and currently on hold according to MUI 2026 roadmap communication.',
    ],
    snippet: `const Heading = styled('h1')({
  fontSize: '2rem',
  variants: [
    { props: { tone: 'danger' }, style: { color: 'red' } },
  ],
})

<div sx={[baseSx, compactSx]} />`,
    sourceHref: 'https://mui.com/material-ui/experimental-api/pigment-css/',
  },
  {
    tool: 'Emotion',
    stance: 'Runtime composition and insertion-order control',
    summary:
      'Emotion is not the static zero-runtime candidate here, but it is the useful control group: css arrays and Emotion-generated class names compose in the order you use them.',
    strengths: [
      'Very ergonomic for arbitrary dynamic values, object styles, template strings, and React css props.',
      'Composition order is explicit at the callsite.',
      'It is practical for prototypes, CMS-driven styling, and live previews.',
    ],
    caveats: [
      'It generates and inserts styles at runtime in the usual setup.',
      'It can accept arbitrary dynamic values more directly, but that flexibility is the runtime work static tools avoid.',
      'Composition is very ergonomic, but it does not provide StyleX-style static analyzability guarantees.',
    ],
    snippet: `<div css={[base, danger]}>Red wins</div>
<div css={[base, cssPropFromCaller]} />`,
    sourceHref: 'https://emotion.sh/docs/composition',
  },
]

export const stylexMechanics: StyleXMechanic[] = [
  {
    step: '01',
    title: 'Compile to atomic property classes',
    body:
      'StyleX does not keep one opaque class for a whole style object. The compiler breaks styles into property-level CSS rules, so color, padding, border, and display can be reasoned about separately.',
    output:
      'The browser receives static CSS. The app receives compiled references that point to prebuilt classes.',
  },
  {
    step: '02',
    title: 'Merge by property at the callsite',
    body:
      'stylex.props is not just string concatenation. It merges compiled style references so the last value for each CSS property wins, independent of where the styles were originally declared.',
    output:
      'Component defaults can come first, feature state next, and caller style last. The final override policy is visible in one line.',
  },
  {
    step: '03',
    title: 'Keep dynamic values explicit',
    body:
      'When a value is not known at build time, StyleX can route it through a dynamic style function. The compiler emits a CSS variable reference, and runtime writes the value through the style prop.',
    output:
      'No runtime stylesheet injection is needed, but there is still a small runtime bridge for the unknown value.',
  },
  {
    step: '04',
    title: 'Erase the easy cases',
    body:
      'For local, static usage, StyleX can compile away both stylex.create and stylex.props calls. More advanced composition keeps the small merge helper.',
    output:
      'That is why the right phrase is zero runtime CSS generation, not always zero runtime JavaScript.',
  },
]

export const constraintComparisons: ConstraintComparison[] = [
  {
    pressure: 'Arbitrary runtime values',
    stylex:
      'Allowed only through explicit dynamic style functions or variables, and the docs say to use dynamic styles sparingly.',
    emotion:
      'Directly ergonomic: object styles, template strings, and css props can read runtime values in normal component code.',
    tradeoff:
      'StyleX protects static output and bundle discipline. Emotion protects authoring freedom.',
  },
  {
    pressure: 'Object spread and imported style objects',
    stylex:
      'Constrained because the compiler must statically understand the style graph. Many runtime CSS-in-JS patterns become invalid.',
    emotion:
      'Usually fine because Emotion resolves the object graph while JavaScript runs.',
    tradeoff:
      'StyleX catches non-static patterns early. Emotion accepts more patterns, but moves work to runtime.',
  },
  {
    pressure: 'Caller overrides',
    stylex:
      'Strong: pass caller style last to stylex.props and the last value wins by property, across files and component boundaries.',
    emotion:
      'Also strong: css arrays and Emotion-generated className precedence make override composition convenient.',
    tradeoff:
      'Both have good DX. StyleX keeps prebuilt CSS; Emotion pays with runtime style generation and insertion.',
  },
  {
    pressure: 'Shorthand and longhand collisions',
    stylex:
      'Designed for deterministic merging even when properties overlap, such as margin versus marginTop.',
    emotion:
      'Works naturally inside generated CSS, but the resolution follows generated rule order and runtime insertion behavior.',
    tradeoff:
      'StyleX makes collision policy part of the style API. Emotion keeps the model closer to ordinary generated CSS.',
  },
  {
    pressure: 'Failure mode',
    stylex:
      'Compilation fails or styles must be rewritten when code is too dynamic for static analysis.',
    emotion:
      'The code usually runs, but the cost can appear as runtime style work, insertion ordering issues, or harder static optimization.',
    tradeoff:
      'StyleX front-loads friction into authoring and build. Emotion defers more decisions to the browser session.',
  },
]

export const plainLanguageCards: PlainLanguageCard[] = [
  {
    term: 'Static CSS-in-JS',
    analogy:
      'Like printing all store signs before opening the shop, instead of writing signs while customers are already inside.',
    translation:
      'The goal is to finish most visual work during build time, then ship normal CSS to the browser.',
  },
  {
    term: 'Composition',
    analogy:
      'Like stacking several instruction sheets for the same object. If two sheets disagree, the important question is which sheet wins.',
    translation:
      'StyleX and Emotion make the winning order obvious at the callsite. vanilla-extract prefers defining the finished class ahead of time.',
  },
  {
    term: 'StyleX trick',
    analogy:
      'Like giving every visual rule its own small label, then letting the checkout counter keep only the newest label for each category.',
    translation:
      'StyleX can preprint the labels as CSS, then do a tiny runtime merge to decide which preprinted class wins.',
  },
  {
    term: 'MUI migration',
    analogy:
      'Like keeping a familiar dashboard layout while changing the engine under it.',
    translation:
      'Pigment CSS matters because it tries to keep MUI styled/sx habits while moving style work to build time.',
  },
  {
    term: 'Runtime values',
    analogy:
      'A restaurant can print the menu before dinner, but cannot preprint every customer custom order.',
    translation:
      'Static tools handle known choices well. Arbitrary user-picked colors or CMS values often need CSS variables or a runtime styling tool.',
  },
  {
    term: 'Alpha/on hold',
    analogy:
      'A promising road that was surveyed but is not currently being extended.',
    translation:
      'Pigment CSS ideas are useful to study, but current adoption should treat project status as a first-class risk.',
  },
]

export const timelineLanes: TimelineLane[] = [
  {
    tool: 'vanilla-extract',
    authoring:
      'Write typed CSS in .css.ts files, usually near tokens, recipes, and package-level design-system code.',
    build:
      'The bundler evaluates the style modules and emits CSS classes, variables, themes, and optional helper mappings.',
    browser:
      'The browser receives ordinary CSS assets and class names. Core styles do not need runtime style injection.',
    runtime: 'None for core styles',
  },
  {
    tool: 'StyleX',
    authoring:
      'Write stylex.create objects and pass compiled style references through stylex.props at component boundaries.',
    build:
      'The compiler extracts atomic CSS rules and replaces authoring objects with compiled references.',
    browser:
      'A small helper merges the applied styles into final className and inline variable output.',
    runtime: 'Tiny merge helper',
  },
  {
    tool: 'Pigment CSS',
    authoring:
      'Write css, styled, variants, and sx in a MUI/Emotion-like style, with static extraction constraints in mind.',
    build:
      'The Pigment plugin intercepts supported styling APIs and extracts them into CSS during the framework build.',
    browser:
      'The page uses generated CSS, className, and style props for CSS-variable bridges instead of runtime style generation.',
    runtime: 'CSS variable bridge',
  },
  {
    tool: 'Emotion',
    authoring:
      'Write css objects, template strings, arrays, and component-local dynamic styles in normal React code.',
    build:
      'The build ships Emotion runtime code plus application styling logic unless separate extraction tooling is added.',
    browser:
      'Styles are generated, merged, and inserted while JavaScript runs, making arbitrary dynamic styling easy.',
    runtime: 'Style generation',
  },
]

export const decisionCards = [
  {
    title: 'Choose vanilla-extract when',
    body:
      'You are building a typed design system, need explicit variant APIs, want framework portability, and prefer CSS-module-like build artifacts.',
  },
  {
    title: 'Choose StyleX when',
    body:
      'Your app is React-heavy, component reuse is deep, override order matters at the element boundary, and strict compiler rules are acceptable.',
  },
  {
    title: 'Treat Pigment CSS as a migration bet when',
    body:
      'You are specifically evaluating a Material UI Emotion migration and can accept early-alpha, currently-on-hold project risk with a fallback path.',
  },
  {
    title: 'Keep Emotion when',
    body:
      'You need high dynamic styling flexibility, live preview ergonomics, or a prototype surface where runtime style generation is the feature, not the problem.',
  },
]

export const scenarioCards: ScenarioCard[] = [
  {
    title: 'A product button has base, size, and danger states',
    plainEnglish:
      'A button starts with house rules, chooses a size, and may become a warning button.',
    conflict:
      'The base says neutral border. The danger state says red border. The final button should be red.',
    visualLayers: ['Base button', 'Small size', 'Danger tone'],
    vanillaExtract:
      'Best expressed as a Recipe: base styles plus typed variants for known button states.',
    stylex:
      'Best expressed as callsite composition: base first, size next, danger last.',
    pigmentCss:
      'Good fit with styled variants when the prop values are known and extractable.',
    emotion:
      'Very ergonomic with css arrays: [base, small, danger], resolved at runtime.',
  },
  {
    title: 'A page theme changes from light to dark',
    plainEnglish:
      'The same room gets a different lighting plan, but the furniture does not need to be rebuilt.',
    conflict:
      'Components should keep using the same token names while the token values change under a parent theme.',
    visualLayers: ['Token contract', 'Theme class', 'Component styles'],
    vanillaExtract:
      'Strong fit: createTheme and createThemeContract make typed token contracts and theme classes.',
    stylex:
      'Strong fit with defineVars and compiler-aware theme variables.',
    pigmentCss:
      'Good MUI fit through plugin-configured themes, extendTheme vars, and color schemes, but runtime theme use is discouraged.',
    emotion:
      'Comfortable with ThemeProvider or CSS variables, but common theming relies on runtime React context.',
  },
  {
    title: 'A reusable card lets the caller override spacing',
    plainEnglish:
      'A component ships with a default layout, but a page can tighten it for a specific use.',
    conflict:
      'The card default says padding 24. The caller says padding 12. The caller should win without changing the card source.',
    visualLayers: ['Card default', 'Page context', 'Caller override'],
    vanillaExtract:
      'Possible, but core class composition does not automatically give callsite-last semantics.',
    stylex:
      'Native fit: pass props.style last to stylex.props and the caller override wins by application order.',
    pigmentCss:
      'Possible with sx arrays or wrapper conventions when the override is extractable; arbitrary runtime values need CSS variables.',
    emotion:
      'Native fit: css arrays make later caller styles override earlier defaults.',
  },
  {
    title: 'A user chooses a custom brand color in a live editor',
    plainEnglish:
      'The product cannot know every customer color before the page opens.',
    conflict:
      'A static build wants known values, but the customer can pick any hex color at runtime.',
    visualLayers: ['Static token', 'User input', 'CSS variable'],
    vanillaExtract:
      'Use a theme contract and assign CSS variables at runtime for the unknown value.',
    stylex:
      'Use dynamic style functions or variables, while keeping the shape compiler-friendly.',
    pigmentCss:
      'Move the runtime color into a CSS variable or inline style wrapper; direct runtime sx values are not extractable.',
    emotion:
      'Directly accepts the runtime value inside css or object styles.',
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
      'Recipes make supported states explicit. Reviewers can see whether a component uses approved sizes and tones.',
    visibleRisk:
      'When a page wants a one-off override, the team needs a variant, class convention, or wrapper.',
    fit: [
      {
        tool: 'vanilla-extract',
        score: 95,
        note: 'Best for typed design-system contracts and static variant surfaces.',
      },
      {
        tool: 'StyleX',
        score: 78,
        note: 'Good if React composition and override order become central.',
      },
      {
        tool: 'Pigment CSS',
        score: 56,
        note: 'Only compelling here if the system is already deeply MUI-based.',
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
      'This highlights StyleX because the important question is which caller is allowed to override which property.',
    visibleWin:
      'stylex.props can place component defaults first and caller style last. The winner is visible at the element boundary.',
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
        tool: 'Pigment CSS',
        score: 63,
        note: 'sx can help MUI consumers, but extraction limits still shape the API.',
      },
      {
        tool: 'Emotion',
        score: 86,
        note: 'Also strong for callsite overrides, but with runtime style generation.',
      },
    ],
  },
  {
    title: 'A Material UI app migrating away from Emotion pressure',
    product: 'Meridian Admin Suite',
    bestFit: 'Pigment CSS',
    setup:
      'A mature MUI app has hundreds of Box sx props, styled components, theme overrides, and Next.js App Router adoption pressure.',
    pressure:
      'The team wants fewer runtime style costs and better RSC alignment, but does not want to rewrite every component into a new styling model.',
    whyItShowsTheTool:
      'This highlights Pigment CSS because it is designed around MUI migration: @mui/material-pigment-css, transformLibraries, sx, styled, and theme config.',
    visibleWin:
      'Developers can keep familiar MUI authoring patterns while moving supported styles into build output.',
    visibleRisk:
      'The current alpha/on-hold status, pnpm caveat, and runtime-value migration rules make it risky as a default platform bet.',
    fit: [
      {
        tool: 'vanilla-extract',
        score: 58,
        note: 'Good static target, but not a MUI semantics migration path.',
      },
      {
        tool: 'StyleX',
        score: 61,
        note: 'Technically strong, but would be a larger architecture migration.',
      },
      {
        tool: 'Pigment CSS',
        score: 84,
        note: 'Best functional fit for this specific migration, with explicit adoption risk.',
      },
      {
        tool: 'Emotion',
        score: 70,
        note: 'Keeps today working, but does not solve the static/RSC pressure.',
      },
    ],
  },
  {
    title: 'A campaign builder with user-picked colors and live previews',
    product: 'Signal Campaign Studio',
    bestFit: 'Emotion',
    setup:
      'Marketers drag blocks, choose brand colors, preview layouts, and save experiments while the page updates instantly.',
    pressure:
      'Many values come from user input, CMS fields, or preview-only combinations that are not known at build time.',
    whyItShowsTheTool:
      'This highlights Emotion because runtime styling is not a weakness here; it is the reason the experience is easy to build.',
    visibleWin:
      'css arrays and dynamic objects can directly reflect user input. The implementation stays close to live preview state.',
    visibleRisk:
      'If prototype code hardens into production, temporary dynamic styles can become the design system by accident.',
    fit: [
      {
        tool: 'vanilla-extract',
        score: 54,
        note: 'Useful for the editor shell, but not ideal for arbitrary user-generated styling.',
      },
      {
        tool: 'StyleX',
        score: 58,
        note: 'Can use variables, but arbitrary dynamic objects fight the compiler model.',
      },
      {
        tool: 'Pigment CSS',
        score: 45,
        note: 'Runtime values must be reworked into CSS variables or wrapper styles.',
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
      'A team ships docs pages, landing pages, pricing pages, and a small logged-in widget from one shared design language.',
    pressure:
      'The public site wants static assets, predictable CSS, and low JavaScript. The widget still needs component-level consistency.',
    whyItShowsTheTool:
      'This highlights vanilla-extract because it treats styling as build output while keeping design tokens in TypeScript.',
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
        note: 'Strong inside the React widget, less compelling for non-React surfaces.',
      },
      {
        tool: 'Pigment CSS',
        score: 48,
        note: 'Hard to justify unless the pages are already MUI-centered.',
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
      'This highlights StyleX because deterministic composition directly answers "I passed an override, why did it not win?"',
    visibleWin:
      'The migration can make override order explicit: component defaults, feature state, then caller style.',
    visibleRisk:
      'Legacy dynamic patterns may need cleanup before they compile. The migration may be architectural, not a search-and-replace.',
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
        tool: 'Pigment CSS',
        score: 57,
        note: 'Useful only if the legacy app is specifically MUI/Emotion-based.',
      },
      {
        tool: 'Emotion',
        score: 83,
        note: 'Practical for incremental migration, but keeps runtime styling in place.',
      },
    ],
  },
  {
    title: 'A one-off prototype that changes every design review',
    product: 'Checkout Experiment Room',
    bestFit: 'Emotion',
    setup:
      'A product team is testing checkout flows, layouts, and color treatments before committing to a design-system change.',
    pressure:
      'The layout changes every week. Most style decisions are temporary, and developer speed matters more than long-term static output.',
    whyItShowsTheTool:
      'This highlights Emotion because its flexibility is valuable before the team knows which abstractions deserve to become permanent.',
    visibleWin:
      'Developers can compose temporary states directly in the component and delete them later without designing a full variant API.',
    visibleRisk:
      'If prototype code becomes production code, runtime styling can become the accidental design system.',
    fit: [
      {
        tool: 'vanilla-extract',
        score: 62,
        note: 'Useful once the experiment stabilizes, heavier while ideas are volatile.',
      },
      {
        tool: 'StyleX',
        score: 64,
        note: 'Good if the prototype already follows final app constraints.',
      },
      {
        tool: 'Pigment CSS',
        score: 50,
        note: 'Too much migration risk unless the prototype is testing MUI migration itself.',
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
    tone: { danger: { background: vars.color.danger } },
    size: { sm: { padding: '6px 10px' } },
  },
})

button({ tone: 'danger', size: 'sm' })`,
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

stylex.props(styles.base, isDanger && styles.danger, styles.small)`,
        takeaway:
          'The component decides the final style stack at the element boundary.',
      },
      {
        tool: 'Pigment CSS',
        code: `const Button = styled('button')({
  borderRadius: 6,
  fontWeight: 700,
  variants: [
    { props: { tone: 'danger' }, style: { background: 'red' } },
    { props: { size: 'sm' }, style: { padding: '6px 10px' } },
  ],
})`,
        takeaway:
          'The MUI-like variants shape is familiar, but values must stay extractable.',
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
        tool: 'Pigment CSS',
        code: `function Card(props) {
  return <section sx={[cardSx, props.sx]} />
}

<Card sx={{ padding: 12 }} />`,
        takeaway:
          'Familiar for MUI teams, as long as the sx values are extractable or variable-backed.',
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
    title: 'User-picked color',
    whyItMatters:
      'This is the runtime-value case: the value is not just conditional, it is unknown until a person or server sends it.',
    examples: [
      {
        tool: 'vanilla-extract',
        code: `export const brandColor = createVar()
export const badge = style({ color: brandColor })

<span
  className={badge}
  style={assignInlineVars({ [brandColor]: userColor })}
/>`,
        takeaway:
          'Promote the dynamic value into a CSS variable contract.',
      },
      {
        tool: 'StyleX',
        code: `const styles = stylex.create({
  badge: (color) => ({ color }),
})

<span {...stylex.props(styles.badge(userColor))} />`,
        takeaway:
          'Dynamic functions make the variable bridge explicit.',
      },
      {
        tool: 'Pigment CSS',
        code: `const Badge = styled('span')({
  color: 'var(--brand-color)',
})

<Badge style={{ '--brand-color': userColor }} />`,
        takeaway:
          'Move the unknown value to a CSS variable instead of direct runtime sx.',
      },
      {
        tool: 'Emotion',
        code: `<span css={{ color: userColor }} />

// Direct and ergonomic because Emotion can generate CSS at runtime.`,
        takeaway:
          'Best ergonomics when arbitrary runtime values are the product requirement.',
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

// The authored composition owns the result.`,
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
        tool: 'Pigment CSS',
        code: `<Button sx={[baseSx, primarySx, dangerSx]} />

// Familiar order, but only supported style shapes can be extracted.`,
        takeaway:
          'The model is ergonomic, but extraction errors are the hidden failure mode.',
      },
      {
        tool: 'Emotion',
        code: `<Button css={[base, primary, danger]} />

// Later Emotion styles win at runtime.`,
        takeaway:
          'The winning rule is also visible at the callsite, with runtime insertion.',
      },
    ],
  },
]

export const sources = [
  ['MUI Pigment CSS getting started', 'https://mui.com/material-ui/experimental-api/pigment-css/'],
  ['MUI migrating to Pigment CSS', 'https://mui.com/material-ui/migration/migrating-to-pigment-css/'],
  ['MUI 2026 project status update', 'https://mui.com/blog/2026-and-beyond/'],
  ['MUI Pigment CSS preview blog', 'https://mui.com/blog/introducing-pigment-css/'],
  ['StyleX Vite + React', 'https://stylexjs.com/docs/learn/installation/vite/vite-react'],
  ['StyleX thinking model', 'https://stylexjs.com/docs/learn/thinking-in-stylex/'],
  ['StyleX using styles', 'https://stylexjs.com/docs/learn/styling-ui/using-styles/'],
  ['StyleX defining styles', 'https://stylexjs.com/docs/learn/styling-ui/defining-styles/'],
  ['StyleX defining variables', 'https://stylexjs.com/docs/learn/theming/defining-variables/'],
  ['Meta Engineering StyleX at scale', 'https://engineering.fb.com/2025/11/11/web/stylex-a-styling-library-for-css-at-scale/'],
  ['vanilla-extract overview', 'https://vanilla-extract.style/'],
  ['vanilla-extract Vite', 'https://vanilla-extract.style/documentation/integrations/vite/'],
  ['vanilla-extract style API', 'https://vanilla-extract.style/documentation/api/style/'],
  ['vanilla-extract createThemeContract', 'https://vanilla-extract.style/documentation/api/create-theme-contract/'],
  ['vanilla-extract Recipes', 'https://vanilla-extract.style/documentation/packages/recipes/'],
  ['Emotion composition', 'https://emotion.sh/docs/composition'],
  ['Emotion css prop', 'https://emotion.sh/docs/css-prop'],
  ['Vite static deploy', 'https://vite.dev/guide/static-deploy.html#github-pages'],
  ['Vite+ create', 'https://viteplus.dev/guide/create'],
  ['Vite+ CI', 'https://viteplus.dev/guide/ci'],
  ['GitHub Pages custom workflows', 'https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages'],
]
