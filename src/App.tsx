import type { CSSProperties } from 'react'
import { useState } from 'react'
import './App.css'
import {
  caseStudies,
  cookbookExamples,
  comparisonRows,
  compositionPanels,
  decisionCards,
  plainLanguageCards,
  scenarioCards,
  sources,
  timelineLanes,
  versionSnapshot,
} from './content'

type DemoTool = 'vanilla-extract' | 'StyleX' | 'Emotion'
type DemoDensity = 'comfortable' | 'compact'

const demoTools: DemoTool[] = ['vanilla-extract', 'StyleX', 'Emotion']

const themeTokens = [
  { name: 'Blue token', color: '#3367a6' },
  { name: 'Teal token', color: '#16816d' },
  { name: 'Orange token', color: '#b4662b' },
]

function App() {
  const [demoTool, setDemoTool] = useState<DemoTool>('StyleX')
  const [isDanger, setIsDanger] = useState(true)
  const [callerOverride, setCallerOverride] = useState(true)
  const [density, setDensity] = useState<DemoDensity>('compact')
  const [brandColor, setBrandColor] = useState('#7c3aed')
  const [tokenColor, setTokenColor] = useState(themeTokens[0].color)

  const dynamicTokenName =
    themeTokens.find((token) => token.color === tokenColor)?.name ?? 'Custom token'
  const canCallerWin = demoTool !== 'vanilla-extract' && callerOverride
  const demoPadding =
    density === 'compact' && (demoTool !== 'vanilla-extract' || callerOverride) ? 12 : 20
  const demoBorder = canCallerWin ? brandColor : isDanger ? '#b4662b' : '#ded7cc'
  const demoBackground = isDanger ? '#fbefe0' : '#fffdf8'
  const demoWinner = canCallerWin
    ? 'Caller override wins'
    : isDanger
      ? 'Danger variant wins'
      : 'Base style wins'
  const demoNote =
    demoTool === 'vanilla-extract'
      ? 'The static variant is stable. A caller override needs a named variant, a wrapper, or a class-order convention.'
      : demoTool === 'StyleX'
        ? 'The component default can be applied first, then the caller style last. The callsite makes the winner visible.'
        : 'The array or cx order makes the winner visible, while Emotion generates and inserts styles at runtime.'

  return (
    <main>
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">Static CSS-in-JS research snapshot</p>
          <h1 id="page-title">vanilla-extract vs StyleX</h1>
          <p className="lede">
            A focused comparison for teams choosing a static styling system in
            2026, with a composition deep dive that also benchmarks Emotion as
            the runtime ergonomics control.
          </p>
          <div className="hero-actions" aria-label="Primary sections">
            <a href="#plain-language">Start simple</a>
            <a href="#live-demo">Try live demo</a>
            <a href="#examples">See examples</a>
            <a href="#case-lab">Read cases</a>
            <a href="#matrix">Compare surfaces</a>
            <a href="#composition">Study composition</a>
          </div>
        </div>

        <figure className="pipeline" aria-label="Static styling pipeline">
          <div className="pipeline-node source-node">
            <span>Typed style source</span>
            <strong>.css.ts / stylex.create</strong>
          </div>
          <div className="pipeline-rail" aria-hidden="true" />
          <div className="pipeline-node build-node">
            <span>Compiler pass</span>
            <strong>Vite + Vite+</strong>
          </div>
          <div className="pipeline-rail" aria-hidden="true" />
          <div className="pipeline-node output-node">
            <span>Browser output</span>
            <strong>Static CSS assets</strong>
          </div>
        </figure>
      </section>

      <section className="summary-grid" aria-label="Key findings">
        <article>
          <span className="metric">01</span>
          <h2>Same destination, different contract</h2>
          <p>
            Both tools move styles out of runtime injection and into build
            output. vanilla-extract optimizes for typed CSS artifacts; StyleX
            optimizes for atomic output and deterministic application order.
          </p>
        </article>
        <article>
          <span className="metric">02</span>
          <h2>Composition is the real fork</h2>
          <p>
            vanilla-extract composes classes while authoring styles. StyleX
            composes at the element boundary, where later applied styles
            override earlier ones even across component props.
          </p>
        </article>
        <article>
          <span className="metric">03</span>
          <h2>Emotion explains the trade</h2>
          <p>
            Emotion remains the ergonomic benchmark for runtime composition.
            The static tools intentionally trade some flexibility for extracted
            CSS and tighter compiler guarantees.
          </p>
        </article>
      </section>

      <section className="section-shell live-demo" id="live-demo" aria-labelledby="live-demo-title">
        <div className="section-heading">
          <p className="eyebrow">Live demos</p>
          <h2 id="live-demo-title">Change the inputs and watch the model behave</h2>
          <p>
            These are simulations of the styling models, not package sandboxes.
            They make the decision mechanics visible: known variants, caller
            overrides, and dynamic user-provided values.
          </p>
        </div>

        <div className="live-demo-grid">
          <article className="playground">
            <div className="playground-heading">
              <p className="scenario-label">Demo 1</p>
              <h3>Composition winner</h3>
              <span>{demoWinner}</span>
            </div>

            <div className="control-grid" aria-label="Composition demo controls">
              <fieldset>
                <legend>Tool model</legend>
                {demoTools.map((tool) => (
                  <label key={tool}>
                    <input
                      checked={demoTool === tool}
                      name="demo-tool"
                      onChange={() => setDemoTool(tool)}
                      type="radio"
                    />
                    <span>{tool}</span>
                  </label>
                ))}
              </fieldset>
              <fieldset>
                <legend>State</legend>
                <label>
                  <input
                    checked={isDanger}
                    onChange={(event) => setIsDanger(event.currentTarget.checked)}
                    type="checkbox"
                  />
                  <span>Danger variant</span>
                </label>
                <label>
                  <input
                    checked={callerOverride}
                    onChange={(event) => setCallerOverride(event.currentTarget.checked)}
                    type="checkbox"
                  />
                  <span>Caller override</span>
                </label>
              </fieldset>
              <fieldset>
                <legend>Density</legend>
                <label>
                  <input
                    checked={density === 'comfortable'}
                    name="density"
                    onChange={() => setDensity('comfortable')}
                    type="radio"
                  />
                  <span>Comfortable</span>
                </label>
                <label>
                  <input
                    checked={density === 'compact'}
                    name="density"
                    onChange={() => setDensity('compact')}
                    type="radio"
                  />
                  <span>Compact</span>
                </label>
              </fieldset>
              <label className="color-control">
                <span>Caller color</span>
                <input
                  onChange={(event) => setBrandColor(event.currentTarget.value)}
                  type="color"
                  value={brandColor}
                />
              </label>
            </div>

            <div className="demo-stage">
              <div className="style-stack" aria-label="Active style stack">
                <span className="active">Base card</span>
                <span className={isDanger ? 'active' : ''}>Danger variant</span>
                <span className={density === 'compact' ? 'active' : ''}>Density</span>
                <span className={callerOverride ? 'active' : ''}>Caller override</span>
              </div>
              <div
                className="demo-card-preview"
                style={
                  {
                    '--demo-bg': demoBackground,
                    '--demo-border': demoBorder,
                    '--demo-padding': `${demoPadding}px`,
                  } as CSSProperties
                }
              >
                <strong>Payment failed</strong>
                <p>
                  The final border and spacing show which instruction wins for
                  the selected model.
                </p>
                <button type="button">Retry payment</button>
              </div>
            </div>
            <p className="demo-note">{demoNote}</p>
          </article>

          <article className="playground dynamic-playground">
            <div className="playground-heading">
              <p className="scenario-label">Demo 2</p>
              <h3>Dynamic brand color</h3>
              <span>User input pressure</span>
            </div>
            <div className="dynamic-controls">
              <label className="color-control">
                <span>User-picked color</span>
                <input
                  onChange={(event) => setBrandColor(event.currentTarget.value)}
                  type="color"
                  value={brandColor}
                />
              </label>
              <label>
                <span>Static token</span>
                <select
                  onChange={(event) => setTokenColor(event.currentTarget.value)}
                  value={tokenColor}
                >
                  {themeTokens.map((token) => (
                    <option key={token.name} value={token.color}>
                      {token.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="dynamic-preview-grid">
              <div
                className="dynamic-preview"
                style={{ '--demo-border': tokenColor } as CSSProperties}
              >
                <h4>vanilla-extract</h4>
                <span>{dynamicTokenName}</span>
                <p>Best when this color is promoted into a token or theme contract.</p>
              </div>
              <div
                className="dynamic-preview"
                style={{ '--demo-border': brandColor } as CSSProperties}
              >
                <h4>StyleX</h4>
                <span>Variable bridge</span>
                <p>Works well when dynamic values flow through explicit variables.</p>
              </div>
              <div
                className="dynamic-preview"
                style={{ '--demo-border': brandColor } as CSSProperties}
              >
                <h4>Emotion</h4>
                <span>Direct runtime style</span>
                <p>Most natural when arbitrary values are part of the product.</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section
        className="section-shell plain-language"
        id="plain-language"
        aria-labelledby="plain-language-title"
      >
        <div className="section-heading">
          <p className="eyebrow">Plain language layer</p>
          <h2 id="plain-language-title">If you do not write frontend code</h2>
          <p>
            The shortest version: all three tools help teams decide how a page
            should look. The difference is when those decisions are finalized,
            and how safely one component can combine visual instructions from
            many places.
          </p>
        </div>
        <div className="plain-grid">
          {plainLanguageCards.map((card) => (
            <article key={card.term}>
              <h3>{card.term}</h3>
              <p>{card.analogy}</p>
              <strong>{card.translation}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell visual-model" aria-labelledby="visual-model-title">
        <div className="section-heading">
          <p className="eyebrow">Visual mental model</p>
          <h2 id="visual-model-title">Where the styling work happens</h2>
        </div>
        <div className="timeline">
          <div className="timeline-head" aria-hidden="true">
            <span>Tool</span>
            <span>Authoring</span>
            <span>Build</span>
            <span>Browser</span>
            <span>Runtime work</span>
          </div>
          {timelineLanes.map((lane) => (
            <article className="timeline-row" key={lane.tool}>
              <h3>{lane.tool}</h3>
              <p>{lane.authoring}</p>
              <p>{lane.build}</p>
              <p>{lane.browser}</p>
              <strong>{lane.runtime}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell examples" id="examples" aria-labelledby="examples-title">
        <div className="section-heading">
          <p className="eyebrow">Concrete situations</p>
          <h2 id="examples-title">Three examples that explain the tradeoff</h2>
        </div>
        <div className="scenario-grid">
          {scenarioCards.map((scenario) => (
            <article className="scenario-card" key={scenario.title}>
              <div>
                <p className="scenario-label">Everyday version</p>
                <h3>{scenario.title}</h3>
                <p>{scenario.plainEnglish}</p>
              </div>
              <div className="layer-stack" aria-label={`${scenario.title} layers`}>
                {scenario.visualLayers.map((layer, index) => (
                  <span key={layer} style={{ '--layer-index': index } as CSSProperties}>
                    {layer}
                  </span>
                ))}
              </div>
              <p className="conflict">{scenario.conflict}</p>
              <dl className="tool-read">
                <div>
                  <dt>vanilla-extract</dt>
                  <dd>{scenario.vanillaExtract}</dd>
                </div>
                <div>
                  <dt>StyleX</dt>
                  <dd>{scenario.stylex}</dd>
                </div>
                <div>
                  <dt>Emotion</dt>
                  <dd>{scenario.emotion}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell case-lab" id="case-lab" aria-labelledby="case-lab-title">
        <div className="section-heading">
          <p className="eyebrow">Pseudo-real case lab</p>
          <h2 id="case-lab-title">Where each tool wins or starts to hurt</h2>
          <p>
            These are fictional but realistic product situations. The point is
            to make each tool's advantage and failure mode visible without
            pretending one answer is always correct.
          </p>
        </div>
        <div className="case-grid">
          {caseStudies.map((study) => (
            <article className="case-card" key={study.title}>
              <div className="case-card-top">
                <p className="case-product">{study.product}</p>
                <h3>{study.title}</h3>
                <span>{study.bestFit} fit</span>
              </div>
              <div className="case-body">
                <div>
                  <h4>Setup</h4>
                  <p>{study.setup}</p>
                </div>
                <div>
                  <h4>Pressure</h4>
                  <p>{study.pressure}</p>
                </div>
                <div>
                  <h4>Why this case matters</h4>
                  <p>{study.whyItShowsTheTool}</p>
                </div>
              </div>
              <div className="case-signals">
                <div>
                  <h4>Visible win</h4>
                  <p>{study.visibleWin}</p>
                </div>
                <div>
                  <h4>Visible risk</h4>
                  <p>{study.visibleRisk}</p>
                </div>
              </div>
              <div className="fit-bars" aria-label={`${study.title} fit scores`}>
                {study.fit.map((fit) => (
                  <div className="fit-row" key={`${study.title}-${fit.tool}`}>
                    <div className="fit-label">
                      <strong>{fit.tool}</strong>
                      <span>{fit.score}/100</span>
                    </div>
                    <div className="fit-track" aria-hidden="true">
                      <span style={{ '--fit-score': `${fit.score}%` } as CSSProperties} />
                    </div>
                    <p>{fit.note}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell" id="matrix" aria-labelledby="matrix-title">
        <div className="section-heading">
          <p className="eyebrow">Comparison matrix</p>
          <h2 id="matrix-title">Practical differences by decision surface</h2>
        </div>
        <div className="matrix">
          <div className="matrix-head" aria-hidden="true">
            <span>Dimension</span>
            <span>vanilla-extract</span>
            <span>StyleX</span>
            <span>Read</span>
          </div>
          {comparisonRows.map((row) => (
            <article className="matrix-row" key={row.dimension}>
              <h3>{row.dimension}</h3>
              <p>{row.vanillaExtract}</p>
              <p>{row.stylex}</p>
              <p className="read">{row.read}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell cookbook" aria-labelledby="cookbook-title">
        <div className="section-heading">
          <p className="eyebrow">Example cookbook</p>
          <h2 id="cookbook-title">Code patterns side by side</h2>
          <p>
            These are intentionally small examples. They are not exhaustive
            production snippets; they are meant to make the composition model
            visible.
          </p>
        </div>
        <div className="cookbook-list">
          {cookbookExamples.map((entry) => (
            <article className="cookbook-entry" key={entry.title}>
              <div className="cookbook-heading">
                <h3>{entry.title}</h3>
                <p>{entry.whyItMatters}</p>
              </div>
              <div className="code-grid">
                {entry.examples.map((example) => (
                  <div className="code-card" key={`${entry.title}-${example.tool}`}>
                    <h4>{example.tool}</h4>
                    <pre>
                      <code>{example.code}</code>
                    </pre>
                    <p>{example.takeaway}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section-shell composition-section"
        id="composition"
        aria-labelledby="composition-title"
      >
        <div className="section-heading">
          <p className="eyebrow">Composition deep dive</p>
          <h2 id="composition-title">What "compose" means in each model</h2>
        </div>
        <div className="composition-grid">
          {compositionPanels.map((panel) => (
            <article className="composition-card" key={panel.tool}>
              <div className="card-heading">
                <p>{panel.stance}</p>
                <h3>{panel.tool}</h3>
              </div>
              <p>{panel.summary}</p>
              <div className="split-list">
                <div>
                  <h4>Strengths</h4>
                  <ul>
                    {panel.strengths.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Caveats</h4>
                  <ul>
                    {panel.caveats.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <pre>
                <code>{panel.snippet}</code>
              </pre>
              <a className="source-link" href={panel.sourceHref} target="_blank" rel="noreferrer">
                Official composition source
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell" id="decision" aria-labelledby="decision-title">
        <div className="section-heading">
          <p className="eyebrow">Recommendation</p>
          <h2 id="decision-title">Decision guide</h2>
        </div>
        <div className="decision-grid">
          {decisionCards.map((card) => (
            <article key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell evidence" aria-labelledby="evidence-title">
        <div className="section-heading">
          <p className="eyebrow">Evidence</p>
          <h2 id="evidence-title">Versions and primary sources</h2>
        </div>
        <div className="evidence-grid">
          <article>
            <h3>npm snapshot</h3>
            <dl className="versions">
              {versionSnapshot.map(([name, version]) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{version}</dd>
                </div>
              ))}
            </dl>
          </article>
          <article>
            <h3>Docs consulted</h3>
            <ul className="source-list">
              {sources.map(([label, href]) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noreferrer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </main>
  )
}

export default App
