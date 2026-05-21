import { useEffect, useRef } from 'react'
import type { Policy, WardleyComponent } from '../data/policies'
import type { ComparisonView } from '../data/comparison'
import { citationLibrary } from '../data/citations'

type PolicySidePanelProps = {
  policy: Policy
  selectedComponent?: WardleyComponent
  focusedSection?: 'anchor' | 'stakeholders' | 'evidence' | 'sentiment' | 'thresholds'
  view?: ComparisonView
}

export function PolicySidePanel({
  policy,
  selectedComponent,
  focusedSection = 'anchor',
  view = 'base',
}: PolicySidePanelProps) {
  const insightRef = useRef<HTMLDivElement | null>(null)
  const anchorRef = useRef<HTMLDivElement | null>(null)
  const stakeholdersRef = useRef<HTMLDivElement | null>(null)
  const evidenceRef = useRef<HTMLDivElement | null>(null)
  const sentimentRef = useRef<HTMLDivElement | null>(null)
  const thresholdsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!selectedComponent) return
    insightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [selectedComponent])

  useEffect(() => {
    if (!selectedComponent) return
    const refMap = {
      anchor: anchorRef,
      stakeholders: stakeholdersRef,
      evidence: evidenceRef,
      sentiment: sentimentRef,
      thresholds: thresholdsRef,
    }
    refMap[focusedSection].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }, [focusedSection, selectedComponent])

  return (
    <aside className="policy-side-panel">
      <div className="info-cards-header">
        <div className="section-kicker">Info cards</div>
        <h2>{policy.title}</h2>
      </div>
      <div
        ref={anchorRef}
        className={`panel-block ${focusedSection === 'anchor' ? 'panel-focus' : ''}`}
      >
        <div className="section-kicker">Anchor need</div>
        <h2>{policy.anchorNeed}</h2>
        <p className="lede">{policy.summary}</p>
      </div>

      <div
        ref={insightRef}
        className={`panel-block panel-insight ${selectedComponent ? 'is-highlighted' : ''}`}
      >
        <div className="section-kicker">Selected component</div>
        <p className="selection-name">
          {selectedComponent ? selectedComponent.label : 'Select a node to trace its role in the map.'}
        </p>
        {selectedComponent?.stage ? (
          <p className="selection-meta">
            {selectedComponent.stage}
            {selectedComponent.movement ? ` · ${selectedComponent.movement}` : ''}
          </p>
        ) : null}
        {selectedComponent?.note ? <p>{selectedComponent.note}</p> : null}
        {view !== 'base' && selectedComponent?.comparison ? (
          <div className="comparison-note">
            <p>
              <strong>{selectedComponent.comparison.divergence}</strong>
              {' · '}
              {selectedComponent.comparison.positionBasis}
            </p>
            {selectedComponent.comparison.coalitionLabel ? (
              <p>{selectedComponent.comparison.coalitionLabel}</p>
            ) : null}
            {selectedComponent.comparison.coalitionNote ? (
              <p>{selectedComponent.comparison.coalitionNote}</p>
            ) : null}
            {selectedComponent.comparison.sourceKey ? (
              <p>
                Source:{' '}
                <a href={citationLibrary[selectedComponent.comparison.sourceKey].url} target="_blank" rel="noreferrer">
                  {citationLibrary[selectedComponent.comparison.sourceKey].source}
                </a>
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <div
        ref={stakeholdersRef}
        className={`panel-block ${focusedSection === 'stakeholders' ? 'panel-focus' : ''}`}
      >
        <div className="section-kicker">Stakeholders</div>
        <p>{policy.stakeholders}</p>
      </div>

      <div
        ref={evidenceRef}
        className={`panel-block ${focusedSection === 'evidence' ? 'panel-focus' : ''}`}
      >
        <div className="section-kicker">Evidence base</div>
        <p>{policy.evidence}</p>
      </div>

      <div
        ref={sentimentRef}
        className={`panel-block ${focusedSection === 'sentiment' ? 'panel-focus' : ''}`}
      >
        <div className="section-kicker">Public sentiment</div>
        <p>{policy.sentiment}</p>
      </div>

      <div
        ref={thresholdsRef}
        className={`panel-block ${focusedSection === 'thresholds' ? 'panel-focus' : ''}`}
      >
        <div className="section-kicker">Threshold conditions</div>
        <ul>
          {policy.thresholds.map((threshold) => (
            <li key={threshold}>{threshold}</li>
          ))}
        </ul>
      </div>

      <div className="panel-block">
        <div className="section-kicker">Cross-map pressure points</div>
        <ul>
          {policy.pressurePoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
