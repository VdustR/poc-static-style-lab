import * as stylex from '@stylexjs/stylex'
import type { CSSProperties, ReactNode } from 'react'
import { highlightedCode } from 'virtual:highlighted-code'
import {
  caseStudies,
  cookbookExamples,
  comparisonRows,
  compositionPanels,
  constraintComparisons,
  decisionCards,
  plainLanguageCards,
  scenarioCards,
  sources,
  stylexMechanics,
  timelineLanes,
  versionSnapshot,
} from './content'
import { demoTools, getDemoModel, initialDemoState, themeTokens } from './demoModel'
import { styles } from './pageStyles.stylex'

type SectionProps = {
  children: ReactNode
  description?: string
  eyebrow: string
  id?: string
  title: string
  titleId: string
  tone?: 'paper' | 'surface'
}

type CssVars = CSSProperties & Record<`--${string}`, string | number>

const decisionBorderStyles = [
  undefined,
  styles.decisionCardBlue,
  styles.decisionCardOrange,
  styles.decisionCardFocus,
]
const fitFillStyles = [undefined, styles.fitFillBlue, styles.fitFillOrange, styles.fitFillInk]
const layerStyles = [undefined, styles.layerItemBlue, styles.layerItemOrange]

function Section({
  children,
  description,
  eyebrow,
  id,
  title,
  titleId,
  tone = 'paper',
}: SectionProps) {
  return (
    <section
      {...stylex.props(styles.section, tone === 'surface' && styles.sectionSurface)}
      aria-labelledby={titleId}
      id={id}
    >
      <div {...stylex.props(styles.sectionHeading)}>
        <p {...stylex.props(styles.eyebrow)}>{eyebrow}</p>
        <h2 {...stylex.props(styles.sectionTitle)} id={titleId}>
          {title}
        </h2>
        {description === undefined ? null : (
          <p {...stylex.props(styles.sectionDescription)}>{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

function CodeBlock({ code }: { code: string }) {
  const highlightedHtml = highlightedCode[code]

  if (highlightedHtml === undefined) {
    return (
      <pre {...stylex.props(styles.codeBlock)}>
        <code>{code}</code>
      </pre>
    )
  }

  const codeBlockProps = stylex.props(styles.codeBlock)
  return (
    <div
      {...codeBlockProps}
      className={[codeBlockProps.className, 'code-block'].filter(Boolean).join(' ')}
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
    />
  )
}

function TableCell({ children, last = false }: { children: ReactNode; last?: boolean }) {
  return <p {...stylex.props(styles.tableCell, last && styles.tableCellLast)}>{children}</p>
}

function StackedTableCell({
  children,
  highlight = false,
  last = false,
}: {
  children: ReactNode
  highlight?: boolean
  last?: boolean
}) {
  return (
    <p
      {...stylex.props(
        styles.tableCell,
        styles.tableCellStacked,
        highlight && styles.tableCellHighlight,
        last && styles.tableCellLast,
      )}
    >
      {children}
    </p>
  )
}

function App() {
  const { demoTool, isDanger, callerOverride, density, brandColor, tokenColor } =
    initialDemoState
  const { dynamicTokenName, demoPadding, demoBorder, demoBackground, demoWinner, demoNote } =
    getDemoModel(initialDemoState)

  return (
    <main {...stylex.props(styles.main)}>
      <section {...stylex.props(styles.hero)} aria-labelledby="page-title">
        <div {...stylex.props(styles.heroCopy)}>
          <p {...stylex.props(styles.eyebrow)}>Static CSS-in-JS research snapshot</p>
          <h1 {...stylex.props(styles.heroTitle)} id="page-title">
            vanilla-extract vs StyleX vs Pigment CSS
          </h1>
          <p {...stylex.props(styles.lede)}>
            A focused comparison for teams choosing a static styling system in 2026, with
            Emotion kept as the runtime composition control so the tradeoffs stay visible.
          </p>
          <div {...stylex.props(styles.heroActions)} aria-label="Primary sections">
            <a {...stylex.props(styles.linkButton)} href="#plain-language">
              Start simple
            </a>
            <a {...stylex.props(styles.linkButton)} href="#live-demo">
              Try live demo
            </a>
            <a {...stylex.props(styles.linkButton)} href="#stylex-mechanics">
              StyleX mechanics
            </a>
            <a {...stylex.props(styles.linkButton)} href="#examples">
              See examples
            </a>
            <a {...stylex.props(styles.linkButton)} href="#case-lab">
              Read cases
            </a>
            <a {...stylex.props(styles.linkButton)} href="#matrix">
              Compare surfaces
            </a>
            <a {...stylex.props(styles.linkButton)} href="#composition">
              Study composition
            </a>
          </div>
        </div>

        <figure {...stylex.props(styles.pipeline)} aria-label="Static styling pipeline">
          <div {...stylex.props(styles.pipelineNode)}>
            <span {...stylex.props(styles.pipelineNodeLabel)}>Typed style source</span>
            <strong {...stylex.props(styles.pipelineNodeStrong)}>
              stylex.create / .css.ts / sx
            </strong>
          </div>
          <div {...stylex.props(styles.pipelineRail)} aria-hidden="true" />
          <div {...stylex.props(styles.pipelineNode, styles.pipelineNodeBuild)}>
            <span {...stylex.props(styles.pipelineNodeLabel)}>Build pass</span>
            <strong {...stylex.props(styles.pipelineNodeStrong)}>Vite+ + prerender</strong>
          </div>
          <div {...stylex.props(styles.pipelineRail)} aria-hidden="true" />
          <div {...stylex.props(styles.pipelineNode, styles.pipelineNodeOutput)}>
            <span {...stylex.props(styles.pipelineNodeLabel)}>Browser output</span>
            <strong {...stylex.props(styles.pipelineNodeStrong)}>
              HTML + static CSS assets
            </strong>
          </div>
        </figure>
      </section>

      <section {...stylex.props(styles.summaryGrid)} aria-label="Key findings">
        {[
          {
            title: 'Three static contracts',
            body:
              'vanilla-extract optimizes for typed CSS artifacts, StyleX for atomic output and deterministic application order, and Pigment CSS for MUI-like authoring under build-time extraction.',
          },
          {
            title: 'Composition is the real fork',
            body:
              'vanilla-extract composes classes while authoring styles. StyleX composes at the element boundary, where later applied styles override earlier ones even across component props.',
          },
          {
            title: 'Pigment CSS is a risk call',
            body:
              "Its technical idea is relevant for MUI and RSC pressure, but MUI's 2026 roadmap says the project remains alpha and currently on hold.",
          },
          {
            title: 'This page now practices the claim',
            body:
              'The shipped page is prerendered HTML with StyleX-extracted static CSS. Only the playground controls use a small enhancer after load.',
          },
        ].map((card, index) => (
          <article
            {...stylex.props(styles.card, styles.summaryCard)}
            key={card.title}
          >
            <span {...stylex.props(styles.metric)}>{String(index + 1).padStart(2, '0')}</span>
            <h2 {...stylex.props(styles.cardTitle)}>{card.title}</h2>
            <p {...stylex.props(styles.paragraph)}>{card.body}</p>
          </article>
        ))}
      </section>

      <Section
        description="These are simulations of the styling models, not package sandboxes. They make the decision mechanics visible: known variants, caller overrides, and dynamic user-provided values."
        eyebrow="Live demos"
        id="live-demo"
        title="Change the inputs and watch the model behave"
        titleId="live-demo-title"
        tone="surface"
      >
        <div {...stylex.props(styles.liveDemoGrid)} data-live-demo>
          <article {...stylex.props(styles.card, styles.playground)}>
            <div {...stylex.props(styles.playgroundHeading)}>
              <p {...stylex.props(styles.scenarioLabel)}>Demo 1</p>
              <h3 {...stylex.props(styles.playgroundTitle)}>Composition winner</h3>
              <span {...stylex.props(styles.badge)} data-demo-winner>
                {demoWinner}
              </span>
            </div>

            <div {...stylex.props(styles.controlGrid)} aria-label="Composition demo controls">
              <fieldset {...stylex.props(styles.fieldBox)}>
                <legend {...stylex.props(styles.legend)}>Tool model</legend>
                {demoTools.map((tool, index) => (
                  <label
                    {...stylex.props(styles.optionLabel, index > 0 && styles.optionLabelStacked)}
                    key={tool}
                  >
                    <input
                      data-demo-tool={tool}
                      defaultChecked={demoTool === tool}
                      name="demo-tool"
                      type="radio"
                    />
                    <span>{tool}</span>
                  </label>
                ))}
              </fieldset>
              <fieldset {...stylex.props(styles.fieldBox)}>
                <legend {...stylex.props(styles.legend)}>State</legend>
                <label {...stylex.props(styles.optionLabel)}>
                  <input data-demo-danger defaultChecked={isDanger} type="checkbox" />
                  <span>Danger variant</span>
                </label>
                <label {...stylex.props(styles.optionLabel, styles.optionLabelStacked)}>
                  <input
                    data-demo-caller-override
                    defaultChecked={callerOverride}
                    type="checkbox"
                  />
                  <span>Caller override</span>
                </label>
              </fieldset>
              <fieldset {...stylex.props(styles.fieldBox)}>
                <legend {...stylex.props(styles.legend)}>Density</legend>
                <label {...stylex.props(styles.optionLabel)}>
                  <input
                    data-demo-density="comfortable"
                    defaultChecked={density === 'comfortable'}
                    name="density"
                    type="radio"
                  />
                  <span>Comfortable</span>
                </label>
                <label {...stylex.props(styles.optionLabel, styles.optionLabelStacked)}>
                  <input
                    data-demo-density="compact"
                    defaultChecked={density === 'compact'}
                    name="density"
                    type="radio"
                  />
                  <span>Compact</span>
                </label>
              </fieldset>
              <label {...stylex.props(styles.colorControl)}>
                <span {...stylex.props(styles.legend)}>Caller color</span>
                <input data-demo-brand-color defaultValue={brandColor} type="color" />
              </label>
            </div>

            <div {...stylex.props(styles.demoStage)}>
              <div {...stylex.props(styles.styleStack)} aria-label="Active style stack">
                <span {...stylex.props(styles.stackItem, styles.stackItemActive)}>Base card</span>
                <span
                  {...stylex.props(styles.stackItem, isDanger && styles.stackItemActive)}
                  data-stack-item="danger"
                >
                  Danger variant
                </span>
                <span
                  {...stylex.props(
                    styles.stackItem,
                    density === 'compact' && styles.stackItemActive,
                  )}
                  data-stack-item="density"
                >
                  Density
                </span>
                <span
                  {...stylex.props(styles.stackItem, callerOverride && styles.stackItemActive)}
                  data-stack-item="caller-override"
                >
                  Caller override
                </span>
              </div>
              <div
                {...stylex.props(styles.demoCardPreview)}
                data-demo-card
                style={
                  {
                    '--demo-bg': demoBackground,
                    '--demo-border': demoBorder,
                    '--demo-padding': `${demoPadding}px`,
                  } as CssVars
                }
              >
                <strong {...stylex.props(styles.demoCardTitle)}>Payment failed</strong>
                <p {...stylex.props(styles.paragraph)}>
                  The final border and spacing show which instruction wins for the selected
                  model.
                </p>
                <button {...stylex.props(styles.demoButton)} type="button">
                  Retry payment
                </button>
              </div>
            </div>
            <p {...stylex.props(styles.callout)} data-demo-note>
              {demoNote}
            </p>
          </article>

          <article {...stylex.props(styles.card, styles.playground)}>
            <div {...stylex.props(styles.playgroundHeading)}>
              <p {...stylex.props(styles.scenarioLabel)}>Demo 2</p>
              <h3 {...stylex.props(styles.playgroundTitle)}>Dynamic brand color</h3>
              <span {...stylex.props(styles.badge)}>User input pressure</span>
            </div>
            <div {...stylex.props(styles.dynamicControls)}>
              <label {...stylex.props(styles.colorControl)}>
                <span {...stylex.props(styles.legend)}>User-picked color</span>
                <input data-demo-brand-color defaultValue={brandColor} type="color" />
              </label>
              <label {...stylex.props(styles.colorControl)}>
                <span {...stylex.props(styles.legend)}>Static token</span>
                <select data-demo-token-color defaultValue={tokenColor}>
                  {themeTokens.map((token) => (
                    <option key={token.name} value={token.color}>
                      {token.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div {...stylex.props(styles.dynamicPreviewGrid)}>
              <div
                {...stylex.props(styles.dynamicPreview)}
                data-token-preview="vanilla-extract"
                style={{ '--demo-border': tokenColor } as CssVars}
              >
                <h4 {...stylex.props(styles.dynamicPreviewTitle)}>vanilla-extract</h4>
                <span {...stylex.props(styles.dynamicPreviewBadge)} data-token-name>
                  {dynamicTokenName}
                </span>
                <p {...stylex.props(styles.paragraph)}>
                  Best when this color is promoted into a token or theme contract.
                </p>
              </div>
              {[
                ['StyleX', 'Variable bridge', 'Works well when dynamic values flow through explicit variables.'],
                [
                  'Pigment CSS',
                  'CSS variable wrapper',
                  'Required when a value is truly unknown at build time.',
                ],
                [
                  'Emotion',
                  'Direct runtime style',
                  'Most natural when arbitrary values are part of the product.',
                ],
              ].map(([title, badge, body]) => (
                <div
                  {...stylex.props(styles.dynamicPreview)}
                  data-brand-preview
                  key={title}
                  style={{ '--demo-border': brandColor } as CssVars}
                >
                  <h4 {...stylex.props(styles.dynamicPreviewTitle)}>{title}</h4>
                  <span {...stylex.props(styles.dynamicPreviewBadge)}>{badge}</span>
                  <p {...stylex.props(styles.paragraph)}>{body}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </Section>

      <Section
        description="The important distinction is that StyleX avoids runtime CSS generation, not every byte of runtime JavaScript. It prebuilds atomic CSS, then uses deterministic property-level merging when styles cross component boundaries."
        eyebrow="StyleX mechanics"
        id="stylex-mechanics"
        title="How StyleX keeps static CSS but still composes well"
        titleId="stylex-mechanics-title"
      >
        <div {...stylex.props(styles.grid4)}>
          {stylexMechanics.map((item) => (
            <article
              {...stylex.props(styles.card, styles.mechanicCard)}
              key={item.title}
            >
              <span {...stylex.props(styles.mechanicStep)}>{item.step}</span>
              <h3 {...stylex.props(styles.cardTitle)}>{item.title}</h3>
              <p {...stylex.props(styles.paragraph)}>{item.body}</p>
              <strong {...stylex.props(styles.mechanicOutput)}>{item.output}</strong>
            </article>
          ))}
        </div>

        <div {...stylex.props(styles.card, styles.panel)}>
          <div {...stylex.props(styles.panelHeading)}>
            <p {...stylex.props(styles.eyebrow)}>Limitation comparison</p>
            <h3 {...stylex.props(styles.panelTitle)}>
              StyleX restrictions versus Emotion flexibility
            </h3>
            <p {...stylex.props(styles.sectionDescription)}>
              StyleX moves friction to authoring and build time. Emotion keeps more runtime
              freedom, which is why it remains the useful control group for composition.
            </p>
          </div>
          <div {...stylex.props(styles.table)}>
            <div {...stylex.props(styles.tableHead4)} aria-hidden="true">
              {['Pressure', 'StyleX', 'Emotion', 'Tradeoff'].map((label, index) => (
                <span
                  {...stylex.props(styles.tableCell, index === 3 && styles.tableCellLast)}
                  key={label}
                >
                  {label}
                </span>
              ))}
            </div>
            {constraintComparisons.map((row) => (
              <article {...stylex.props(styles.tableRow4)} key={row.pressure}>
                <h4 {...stylex.props(styles.tableCell, styles.tableHeading)}>
                  {row.pressure}
                </h4>
                <StackedTableCell>{row.stylex}</StackedTableCell>
                <StackedTableCell>{row.emotion}</StackedTableCell>
                <StackedTableCell highlight last>
                  {row.tradeoff}
                </StackedTableCell>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section
        description="The shortest version: these tools help teams decide how a page should look. The difference is when those decisions are finalized, which values are allowed to change later, and how much project risk comes with the styling engine."
        eyebrow="Plain language layer"
        id="plain-language"
        title="If you do not write frontend code"
        titleId="plain-language-title"
        tone="surface"
      >
        <div {...stylex.props(styles.autoGrid)}>
          {plainLanguageCards.map((card) => (
            <article {...stylex.props(styles.card, styles.simpleCard)} key={card.term}>
              <h3 {...stylex.props(styles.cardTitle)}>{card.term}</h3>
              <p {...stylex.props(styles.paragraph)}>{card.analogy}</p>
              <strong {...stylex.props(styles.simpleCardStrong)}>{card.translation}</strong>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Visual mental model"
        title="Where the styling work happens"
        titleId="visual-model-title"
      >
        <div {...stylex.props(styles.card, styles.timeline)}>
          <div {...stylex.props(styles.timelineHead)} aria-hidden="true">
            {['Tool', 'Authoring', 'Build', 'Browser', 'Runtime work'].map((label, index) => (
              <span
                {...stylex.props(styles.tableCell, index === 4 && styles.tableCellLast)}
                key={label}
              >
                {label}
              </span>
            ))}
          </div>
          {timelineLanes.map((lane) => (
            <article {...stylex.props(styles.timelineRow)} key={lane.tool}>
              <h3 {...stylex.props(styles.tableCell, styles.tableHeading)}>{lane.tool}</h3>
              <TableCell>{lane.authoring}</TableCell>
              <TableCell>{lane.build}</TableCell>
              <TableCell>{lane.browser}</TableCell>
              <strong
                {...stylex.props(
                  styles.tableCell,
                  styles.tableCellLast,
                  styles.timelineStrong,
                )}
              >
                {lane.runtime}
              </strong>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Concrete situations"
        id="examples"
        title="Four examples that explain the tradeoff"
        titleId="examples-title"
        tone="surface"
      >
        <div {...stylex.props(styles.grid3)}>
          {scenarioCards.map((scenario) => (
            <article {...stylex.props(styles.card, styles.simpleCard)} key={scenario.title}>
              <div>
                <p {...stylex.props(styles.scenarioLabel)}>Everyday version</p>
                <h3 {...stylex.props(styles.cardTitle)}>{scenario.title}</h3>
                <p {...stylex.props(styles.paragraph)}>{scenario.plainEnglish}</p>
              </div>
              <div {...stylex.props(styles.layerStack)} aria-label={`${scenario.title} layers`}>
                {scenario.visualLayers.map((layer, index) => (
                  <span
                    {...stylex.props(styles.layerItem, layerStyles[index])}
                    key={layer}
                    style={{ '--layer-index': index } as CssVars}
                  >
                    {layer}
                  </span>
                ))}
              </div>
              <p {...stylex.props(styles.conflict)}>{scenario.conflict}</p>
              <dl {...stylex.props(styles.toolRead)}>
                {[
                  ['vanilla-extract', scenario.vanillaExtract],
                  ['StyleX', scenario.stylex],
                  ['Pigment CSS', scenario.pigmentCss],
                  ['Emotion', scenario.emotion],
                ].map(([term, description]) => (
                  <div {...stylex.props(styles.toolReadItem)} key={term}>
                    <dt {...stylex.props(styles.term)}>{term}</dt>
                    <dd {...stylex.props(styles.description)}>{description}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </Section>

      <Section
        description="These are fictional but realistic product situations. The point is to make each tool's advantage and failure mode visible without pretending one answer is always correct."
        eyebrow="Pseudo-real case lab"
        id="case-lab"
        title="Where each tool wins or starts to hurt"
        titleId="case-lab-title"
      >
        <div {...stylex.props(styles.grid2)}>
          {caseStudies.map((study) => (
            <article {...stylex.props(styles.card, styles.caseCard)} key={study.title}>
              <div {...stylex.props(styles.caseTop)}>
                <p {...stylex.props(styles.scenarioLabel)}>{study.product}</p>
                <h3 {...stylex.props(styles.playgroundTitle)}>{study.title}</h3>
                <span {...stylex.props(styles.badge)}>{study.bestFit} fit</span>
              </div>
              <div {...stylex.props(styles.caseBody)}>
                {[
                  ['Setup', study.setup],
                  ['Pressure', study.pressure],
                  ['Why this case matters', study.whyItShowsTheTool],
                ].map(([title, body]) => (
                  <div {...stylex.props(styles.insetCard)} key={title}>
                    <h4 {...stylex.props(styles.smallHeading)}>{title}</h4>
                    <p {...stylex.props(styles.paragraph)}>{body}</p>
                  </div>
                ))}
              </div>
              <div {...stylex.props(styles.caseSignals)}>
                <div {...stylex.props(styles.insetCard, styles.insetWin)}>
                  <h4 {...stylex.props(styles.smallHeading)}>Visible win</h4>
                  <p {...stylex.props(styles.paragraph)}>{study.visibleWin}</p>
                </div>
                <div {...stylex.props(styles.insetCard, styles.insetRisk)}>
                  <h4 {...stylex.props(styles.smallHeading)}>Visible risk</h4>
                  <p {...stylex.props(styles.paragraph)}>{study.visibleRisk}</p>
                </div>
              </div>
              <div {...stylex.props(styles.fitBars)} aria-label={`${study.title} fit scores`}>
                {study.fit.map((fit, index) => (
                  <div {...stylex.props(styles.fitRow)} key={`${study.title}-${fit.tool}`}>
                    <div {...stylex.props(styles.fitLabel)}>
                      <strong>{fit.tool}</strong>
                      <span {...stylex.props(styles.fitScore)}>{fit.score}/100</span>
                    </div>
                    <div {...stylex.props(styles.fitTrack)} aria-hidden="true">
                      <span
                        {...stylex.props(styles.fitFill, fitFillStyles[index])}
                        style={{ '--fit-score': `${fit.score}%` } as CssVars}
                      />
                    </div>
                    <p {...stylex.props(styles.fitNote)}>{fit.note}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Comparison matrix"
        id="matrix"
        title="Practical differences by decision surface"
        titleId="matrix-title"
        tone="surface"
      >
        <div {...stylex.props(styles.card, styles.timeline)}>
          <div {...stylex.props(styles.tableHead5)} aria-hidden="true">
            {['Dimension', 'vanilla-extract', 'StyleX', 'Pigment CSS', 'Read'].map(
              (label, index) => (
                <span
                  {...stylex.props(styles.tableCell, index === 4 && styles.tableCellLast)}
                  key={label}
                >
                  {label}
                </span>
              ),
            )}
          </div>
          {comparisonRows.map((row, index) => (
            <article
              {...stylex.props(styles.tableRow5, index === 0 && styles.tableRow5First)}
              key={row.dimension}
            >
              <h3 {...stylex.props(styles.tableCell, styles.tableHeading)}>{row.dimension}</h3>
              <StackedTableCell>{row.vanillaExtract}</StackedTableCell>
              <StackedTableCell>{row.stylex}</StackedTableCell>
              <StackedTableCell>{row.pigmentCss}</StackedTableCell>
              <StackedTableCell highlight last>
                {row.read}
              </StackedTableCell>
            </article>
          ))}
        </div>
      </Section>

      <Section
        description="These are intentionally small examples. They are not exhaustive production snippets; they are meant to make the composition model visible."
        eyebrow="Example cookbook"
        title="Code patterns side by side"
        titleId="cookbook-title"
        tone="surface"
      >
        <div {...stylex.props(styles.cookbookList)}>
          {cookbookExamples.map((entry) => (
            <article {...stylex.props(styles.card, styles.cookbookEntry)} key={entry.title}>
              <div {...stylex.props(styles.cookbookHeading)}>
                <h3 {...stylex.props(styles.cardTitle)}>{entry.title}</h3>
                <p {...stylex.props(styles.paragraph)}>{entry.whyItMatters}</p>
              </div>
              <div {...stylex.props(styles.codeGrid)}>
                {entry.examples.map((example) => (
                  <div
                    {...stylex.props(styles.card, styles.codeCard)}
                    key={`${entry.title}-${example.tool}`}
                  >
                    <h4 {...stylex.props(styles.codeCardTitle)}>{example.tool}</h4>
                    <CodeBlock code={example.code} />
                    <p {...stylex.props(styles.codeTakeaway)}>{example.takeaway}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Composition deep dive"
        id="composition"
        title={'What "compose" means in each model'}
        titleId="composition-title"
      >
        <div {...stylex.props(styles.autoGridWide)}>
          {compositionPanels.map((panel) => (
            <article
              {...stylex.props(styles.card, styles.compositionCard)}
              key={panel.tool}
            >
              <div>
                <p {...stylex.props(styles.scenarioLabel)}>{panel.stance}</p>
                <h3 {...stylex.props(styles.cardTitle)}>{panel.tool}</h3>
              </div>
              <p {...stylex.props(styles.paragraph)}>{panel.summary}</p>
              <div {...stylex.props(styles.splitList)}>
                <div>
                  <h4 {...stylex.props(styles.smallHeading)}>Strengths</h4>
                  <ul>
                    {panel.strengths.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 {...stylex.props(styles.smallHeading)}>Caveats</h4>
                  <ul>
                    {panel.caveats.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <CodeBlock code={panel.snippet} />
              <a
                {...stylex.props(styles.linkButton, styles.sourceLink)}
                href={panel.sourceHref}
                rel="noreferrer"
                target="_blank"
              >
                Official composition source
              </a>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Recommendation"
        id="decision"
        title="Decision guide"
        titleId="decision-title"
        tone="surface"
      >
        <div {...stylex.props(styles.grid4)}>
          {decisionCards.map((card, index) => (
            <article
              {...stylex.props(styles.card, styles.decisionCard, decisionBorderStyles[index])}
              key={card.title}
            >
              <h3 {...stylex.props(styles.cardTitle)}>{card.title}</h3>
              <p {...stylex.props(styles.paragraph)}>{card.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Evidence"
        title="Versions and primary sources"
        titleId="evidence-title"
        tone="surface"
      >
        <div {...stylex.props(styles.evidenceGrid)}>
          <article {...stylex.props(styles.card, styles.simpleCard)}>
            <h3 {...stylex.props(styles.cardTitle)}>npm snapshot</h3>
            <dl {...stylex.props(styles.versions)}>
              {versionSnapshot.map(([name, version], index) => (
                <div
                  {...stylex.props(
                    styles.versionRow,
                    index === versionSnapshot.length - 1 && styles.versionRowLast,
                  )}
                  key={name}
                >
                  <dt {...stylex.props(styles.versionName)}>{name}</dt>
                  <dd {...stylex.props(styles.versionValue)}>{version}</dd>
                </div>
              ))}
            </dl>
          </article>
          <article {...stylex.props(styles.card, styles.simpleCard)}>
            <h3 {...stylex.props(styles.cardTitle)}>Docs consulted</h3>
            <ul {...stylex.props(styles.sourceList)}>
              {sources.map(([label, href]) => (
                <li {...stylex.props(styles.sourceItem)} key={href}>
                  <a
                    {...stylex.props(styles.sourceItemLink)}
                    href={href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      <footer {...stylex.props(styles.footer)} aria-label="Project links and licenses">
        <p {...stylex.props(styles.footerText)}>
          2026 VdustR, ViPro. Code is MIT. Content is CC0 1.0 Universal.
        </p>
        <nav {...stylex.props(styles.footerNav)} aria-label="Footer links">
          <a
            {...stylex.props(styles.footerLink)}
            href="https://github.com/VdustR/poc-static-style-lab"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
          <a
            {...stylex.props(styles.footerLink)}
            href="https://github.com/VdustR/poc-static-style-lab/blob/main/LICENSE"
            rel="noreferrer"
            target="_blank"
          >
            MIT License
          </a>
          <a
            {...stylex.props(styles.footerLink)}
            href="https://github.com/VdustR/poc-static-style-lab/blob/main/LICENSE-CONTENT.md"
            rel="noreferrer"
            target="_blank"
          >
            CC0 Content License
          </a>
        </nav>
      </footer>
    </main>
  )
}

export default App
