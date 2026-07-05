import './App.css'
import {
  comparisonRows,
  compositionPanels,
  decisionCards,
  sources,
  versionSnapshot,
} from './content'

function App() {
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
            <a href="#matrix">Compare surfaces</a>
            <a href="#composition">Study composition</a>
            <a href="#decision">Pick a direction</a>
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
