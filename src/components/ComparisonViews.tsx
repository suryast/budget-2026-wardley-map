import { citationLibrary } from '../data/citations'
import {
  coalitionColumnItems,
  comparisonExtrasForPolicy,
  comparisonMethodology,
  comparisonSummary,
  factCheckEntries,
  inferenceLog,
  type ComparisonView,
} from '../data/comparison'
import { policyById, type Policy, type PolicyId } from '../data/policies'

export function ViewSwitcher({
  policy,
  currentView,
  onNavigate,
}: {
  policy: Policy
  currentView: ComparisonView
  onNavigate: (view: ComparisonView) => void
}) {
  const items: { id: ComparisonView; label: string }[] = [
    { id: 'base', label: 'Base map' },
    { id: 'delta', label: 'Political Delta' },
    { id: 'compare', label: 'Side-by-Side' },
    { id: 'factcheck', label: 'Fact-Check' },
  ]

  return (
    <div className="view-switcher" aria-label={`${policy.title} views`}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={currentView === item.id ? 'is-active' : ''}
          onClick={() => onNavigate(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

export function ComparisonLegend({ view }: { view: Exclude<ComparisonView, 'base'> }) {
  return (
    <section className="comparison-legend">
      <div className="section-kicker">Comparison legend</div>
      <div className="legend-grid">
        <div><span className="legend-swatch delta-agree" />Agree</div>
        <div><span className="legend-swatch delta-differ" />Differ</div>
        <div><span className="legend-swatch delta-repeal" />Repeal</div>
        <div><span className="legend-swatch delta-coalition-only" />Coalition-only</div>
        <div><span className="legend-swatch delta-no-position" />No position</div>
        <div><span className="legend-swatch basis-stated" />Stated</div>
        <div><span className="legend-swatch basis-inferred" />Inferred</div>
        <div><span className="legend-swatch basis-none" />None</div>
      </div>
      <p className="legend-note">
        {view === 'factcheck'
          ? 'Fact-check rows only appear for stated positions with a checkable claim. Inferred and none positions are excluded by rule.'
          : 'Inferred positions use a visibly separate treatment and always carry an explicit prior-source citation.'}
      </p>
    </section>
  )
}

export function PoliticalDeltaSummary({ policy }: { policy: Policy }) {
  const summary = comparisonSummary(policy)
  return (
    <section className="comparison-summary-strip">
      <div className="section-kicker">On a change of government</div>
      <p>
        {summary.repeal} repealed · {summary.differ} contested · {summary['coalition-only']} Coalition-only additions · {summary['no-position']} unaddressed
      </p>
    </section>
  )
}

export function SideBySideView({ policy }: { policy: Policy }) {
  const coalitionItems = coalitionColumnItems(policy)
  const extras = comparisonExtrasForPolicy(policy.id)

  return (
    <section className="compare-grid">
      <article className="compare-column">
        <div className="section-kicker">Labor</div>
        <h3>Budget measures on the base map</h3>
        <ul className="compare-list">
          {policy.components.map((component) => (
            <li key={component.id}>
              <strong>{component.label}</strong>
              <p>{component.note ?? policy.summary}</p>
            </li>
          ))}
        </ul>
      </article>
      <article className="compare-column">
        <div className="section-kicker">Coalition</div>
        <h3>Reply positions in Coalition framing</h3>
        <ul className="compare-list">
          {coalitionItems.length > 0 ? (
            coalitionItems.map((item) => (
              <li key={item.id} className={`basis-${item.basis}`}>
                <div className="compare-item-header">
                  <strong>{item.label}</strong>
                  <span className={`basis-pill basis-${item.basis}`}>{item.basis}</span>
                </div>
                <p>{item.note}</p>
                {item.sourceKey ? (
                  <p className="compare-source">
                    Source: {citationLibrary[item.sourceKey].url ? (
                      <a href={citationLibrary[item.sourceKey].url} target="_blank" rel="noreferrer">
                        {citationLibrary[item.sourceKey].source}
                      </a>
                    ) : (
                      citationLibrary[item.sourceKey].source
                    )}
                  </p>
                ) : null}
              </li>
            ))
          ) : (
            <li>No stated Coalition position for this policy yet.</li>
          )}
          {extras.length === 0 ? null : (
            <li className="compare-note">
              Coalition-only additions appear as ghost components in the delta map and as standalone items here.
            </li>
          )}
        </ul>
      </article>
    </section>
  )
}

export function FactCheckView({ policy }: { policy: Policy }) {
  const rows = factCheckEntries(policy)

  return (
    <section className="factcheck-panel">
      <div className="section-kicker">Fact-Check</div>
      <h3>Checkable claims linked to this policy</h3>
      {rows.length === 0 ? (
        <p>No stated claims are wired into the fact-check view for this policy yet.</p>
      ) : (
        <div className="matrix-scroll">
          <table className="factcheck-table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Claimant</th>
                <th>Status</th>
                <th>Claim</th>
                <th>Evidence</th>
                <th>factual-au</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${policy.id}-${row.componentId}`}>
                  <td>{row.label}</td>
                  <td>{row.factCheck.claimant}</td>
                  <td><span className={`fact-status fact-${row.factCheck.status}`}>{row.factCheck.status}</span></td>
                  <td>{row.factCheck.claim}</td>
                  <td>{row.factCheck.evidenceNote}</td>
                  <td>
                    {row.factCheck.factualAuUrl ? (
                      <a href={row.factCheck.factualAuUrl} target="_blank" rel="noreferrer">
                        Open
                      </a>
                    ) : (
                      'Not linked yet'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export function ChangesScorecard({ onNavigate }: { onNavigate: (policyId: PolicyId) => void }) {
  const scorecardPolicies = Object.values(policyById).filter((policy) => policy.id !== 'federal-state')

  return (
    <main className="policy-page">
      <section className="policy-detail-header">
        <div className="section-kicker">Scorecard</div>
        <h2>What changes if government changes</h2>
        <p>
          The primary comparison artifact. It rolls up each policy’s delta into repeals, contested
          components, Coalition-only additions, and areas the reply still leaves unaddressed.
        </p>
      </section>

      <section className="matrix-panel">
        <div className="matrix-scroll">
          <table className="shared-matrix">
            <thead>
              <tr>
                <th>Policy</th>
                <th>Repeal</th>
                <th>Contested</th>
                <th>Coalition-only</th>
                <th>Unaddressed</th>
                <th>Open</th>
              </tr>
            </thead>
            <tbody>
              {scorecardPolicies.map((policy) => {
                const summary = comparisonSummary(policy)
                return (
                  <tr key={policy.id}>
                    <th>{policy.number} · {policy.title}</th>
                    <td>{summary.repeal}</td>
                    <td>{summary.differ}</td>
                    <td>{summary['coalition-only']}</td>
                    <td>{summary['no-position']}</td>
                    <td>
                      <button type="button" className="matrix-dot" onClick={() => onNavigate(policy.id)}>
                        View
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export function MethodologyAddendum() {
  return (
    <section className="methodology-panel">
      <div className="section-kicker">Methodology additions</div>
      <h2>Stated, inferred, and fact-checked positions</h2>
      <p>{comparisonMethodology.provenance}</p>
      <p>{comparisonMethodology.evenHandedness}</p>
      <p>{comparisonMethodology.updateNote}</p>

      <div className="methodology-log">
        <h3>Inference log</h3>
        {inferenceLog.length === 0 ? (
          <p>No inferred positions are currently shipped.</p>
        ) : (
          <ul>
            {inferenceLog.map((entry) => (
              <li key={`${entry.policyId}-${entry.componentId}`}>
                <strong>{policyById[entry.policyId].number} · {entry.componentId}</strong> — {entry.inferredPosition}
                <br />
                Basis: {entry.basis}
                <br />
                Confidence: {entry.confidence}
                <br />
                Why not no-position: {entry.whyNotNoPosition}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
