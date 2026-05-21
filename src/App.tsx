import { useEffect, useMemo, useState } from 'react'
import './index.css'
import { AboutPanel } from './components/AboutPanel'
import { CitationFootnotes } from './components/CitationFootnotes'
import {
  ChangesScorecard,
  ComparisonLegend,
  FactCheckView,
  MethodologyAddendum,
  PoliticalDeltaSummary,
  SideBySideView,
  ViewSwitcher,
} from './components/ComparisonViews'
import { PolicySidePanel } from './components/PolicySidePanel'
import { WardleyMap } from './components/WardleyMap'
import type { ComparisonView } from './data/comparison'
import {
  matrixColumns,
  matrixRows,
  metaHeader,
  mostExperimentalComponent,
  policies,
  policiesBySection,
  policyById,
  sectionRoutes,
  sections,
  sharedGroupById,
  type Policy,
  type SectionId,
  type WardleyComponent,
} from './data/policies'

type RouteState = {
  path: string
  view: ComparisonView
  focusComponentId?: string
}

type PanelSection = 'anchor' | 'stakeholders' | 'evidence' | 'sentiment' | 'thresholds'

function normalizePath(pathname: string) {
  const stripped = pathname.replace(/\/+$/, '')
  return stripped === '' ? '/' : stripped
}

function splitPolicyView(pathname: string) {
  const path = normalizePath(pathname)
  if (path === '/changes') return { path, view: 'delta' as ComparisonView }
  const suffixMap: Record<string, ComparisonView> = {
    '/delta': 'delta',
    '/compare': 'compare',
    '/factcheck': 'factcheck',
  }
  for (const [suffix, view] of Object.entries(suffixMap)) {
    if (path.endsWith(suffix)) {
      const basePath = path.slice(0, -suffix.length) || '/'
      return { path: basePath, view }
    }
  }
  return { path, view: 'base' as ComparisonView }
}

function readRouteState(): RouteState {
  const url = new URL(window.location.href)
  const parsed = splitPolicyView(url.pathname)
  return {
    path: sectionRoutes.has(parsed.path) || parsed.path === '/changes' ? parsed.path : '/',
    view: parsed.path === '/changes' ? 'delta' : parsed.view,
    focusComponentId: url.searchParams.get('focus') ?? undefined,
  }
}

function App() {
  const initialRoute = readRouteState()
  const initialSelection = deriveSelection(initialRoute)
  const [route, setRoute] = useState<RouteState>(initialRoute)
  const [selectedComponent, setSelectedComponent] = useState<WardleyComponent | undefined>(
    initialSelection.component,
  )
  const [focusedSection, setFocusedSection] = useState<PanelSection>(initialSelection.section)
  const [showEdges, setShowEdges] = useState(true)
  const [showMovement, setShowMovement] = useState(true)

  useEffect(() => {
    const handlePopState = () => {
      const nextRoute = readRouteState()
      const nextSelection = deriveSelection(nextRoute)
      setRoute(nextRoute)
      setSelectedComponent(nextSelection.component)
      setFocusedSection(nextSelection.section)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const activePolicy = useMemo(
    () => policies.find((policy) => policy.path === route.path),
    [route.path],
  )

  const navigate = (path: string, focusComponentId?: string, view: ComparisonView = 'base') => {
    const url = new URL(window.location.origin)
    url.pathname = buildPath(path, view)
    if (focusComponentId) {
      url.searchParams.set('focus', focusComponentId)
    }
    window.history.pushState({}, '', `${url.pathname}${url.search}`)
    const nextRoute = { path, view, focusComponentId }
    const nextSelection = deriveSelection(nextRoute)
    setRoute(nextRoute)
    setSelectedComponent(nextSelection.component)
    setFocusedSection(nextSelection.section)
  }

  const handleSelectComponent = (component: WardleyComponent) => {
    setSelectedComponent(component)
    setFocusedSection(inferPanelSection(component))
  }

  return (
    <div className="app-shell">
      <header className="page-header">
        <button type="button" className="brand-link" onClick={() => navigate('/')}>
          Australian Federal Budget 2026
        </button>
        <h1>The Australian Federal Budget 2026, mapped.</h1>
        <p className="page-summary">
          A route-based field guide to the Budget’s household politics, institutional rewiring, and
          external pressures. Each map starts from a voter need, traces visible policy capability,
          and follows the chain down into mechanisms and shared delivery infrastructure.
        </p>
        <div className="project-links" aria-label="Project links">
          <a href="https://budget-2026-wardley-map.setiyaputra.me/federal-state" target="_blank" rel="noreferrer">
            Live project
          </a>
          <a href="https://github.com/suryast/budget-2026-wardley-map" target="_blank" rel="noreferrer">
            GitHub repo
          </a>
        </div>
      </header>

      <nav className="top-nav" aria-label="Primary navigation">
        <button type="button" className={route.path === '/' ? 'is-active' : ''} onClick={() => navigate('/')}>
          Home
        </button>
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={route.path.startsWith(section.path) ? 'is-active' : ''}
            onClick={() => navigate(section.path)}
          >
            {section.title}
          </button>
        ))}
        <button
          type="button"
          className={route.path === '/changes' ? 'is-active' : ''}
          onClick={() => navigate('/changes', undefined, 'delta')}
        >
          What Changes
        </button>
        <button
          type="button"
          className={route.path === '/federal-state' ? 'is-active' : ''}
          onClick={() => navigate('/federal-state')}
        >
          Federal-State
        </button>
      </nav>

      {route.path === '/' ? (
        <LandingPage navigate={navigate} />
      ) : route.path === '/changes' ? (
        <ChangesScorecard onNavigate={(policyId) => navigate(policyById[policyId].path, undefined, 'delta')} />
      ) : route.path === '/household' || route.path === '/system' || route.path === '/external' ? (
        <SectionLandingPage
          sectionId={route.path.slice(1) as SectionId}
          navigate={navigate}
        />
      ) : activePolicy ? (
        activePolicy.id === 'federal-state' ? (
          <FederalStatePage
            policy={activePolicy}
            selectedComponent={selectedComponent}
            focusedSection={focusedSection}
            navigate={navigate}
            view={route.view}
            showEdges={showEdges}
            showMovement={showMovement}
            onSelectComponent={handleSelectComponent}
            onToggleEdges={setShowEdges}
            onToggleMovement={setShowMovement}
          />
        ) : (
          <PolicyPage
            policy={activePolicy}
            selectedComponent={selectedComponent}
            focusedSection={focusedSection}
            navigate={navigate}
            view={route.view}
            showEdges={showEdges}
            showMovement={showMovement}
            onSelectComponent={handleSelectComponent}
            onToggleEdges={setShowEdges}
            onToggleMovement={setShowMovement}
          />
        )
      ) : (
        <LandingPage navigate={navigate} />
      )}

      <footer className="site-footer">
        <button type="button" onClick={() => navigate('/')}>
          About
        </button>
        <button type="button" onClick={() => navigate('/federal-state')}>
          Methodology
        </button>
        <button type="button" onClick={() => navigate('/federal-state')}>
          Citations
        </button>
        <a href="https://github.com/suryast/budget-2026-wardley-map" target="_blank" rel="noreferrer">
          GitHub repo
        </a>
      </footer>
    </div>
  )
}

type NavigateFn = (path: string, focusComponentId?: string) => void
type NavigateWithViewFn = (path: string, focusComponentId?: string, view?: ComparisonView) => void

function LandingPage({ navigate }: { navigate: NavigateFn }) {
  return (
    <main className="policy-page">
      <section className="landing-sections">
        {sections.map((section) => {
          const sectionPolicies = policiesBySection[section.id]
          const experimental = sectionPolicies
            .map((policy) => mostExperimentalComponent(policy))
            .filter(Boolean)[0]
          return (
            <article
              key={section.id}
              className={`section-card section-card-${section.id}`}
              onClick={() => navigate(section.path)}
            >
              <div className="section-kicker">{section.title}</div>
              <h2>{section.description}</h2>
              <p>{section.intro}</p>
              <ul className="section-policy-list">
                {sectionPolicies.map((policy) => (
                  <li key={policy.id}>
                    <span>{policy.title}</span>
                    <span aria-hidden="true">↗</span>
                  </li>
                ))}
              </ul>
              <div className="section-badge">
                {sectionPolicies.length} maps · most experimental:{' '}
                {experimental ? experimental.label : 'none named'}
              </div>
            </article>
          )
        })}
      </section>

      <section className="meta-card" onClick={() => navigate('/federal-state')}>
        <div className="section-kicker">Cross-cutting</div>
        <h2>Federal-State Financial Relations</h2>
        <p>{metaHeader}</p>
      </section>

      <AboutPanel />
    </main>
  )
}

function SectionLandingPage({
  sectionId,
  navigate,
}: {
  sectionId: SectionId
  navigate: NavigateFn
}) {
  const section = sections.find((item) => item.id === sectionId)
  if (!section) return null
  const sectionPolicies = policiesBySection[section.id]

  return (
    <main className="policy-page">
      <section className={`section-landing section-landing-${section.id}`}>
        <div className="section-kicker">{section.title}</div>
        <h2>{section.description}</h2>
        <p>{section.intro}</p>
        <p className="shared-concerns">{section.sharedConcerns}</p>
      </section>

      <section className="policy-card-grid">
        {sectionPolicies.map((policy) => {
          const experimental = mostExperimentalComponent(policy)
          return (
            <article key={policy.id} className="policy-card" onClick={() => navigate(policy.path)}>
              <div className="policy-card-header">
                <span className="policy-card-number">Policy {policy.number}</span>
                <span className={`stage-pill stage-${experimental?.stage ?? 'settled'}`}>
                  {experimental?.stage ?? 'settled'}
                </span>
              </div>
              <h3>{policy.title}</h3>
              <p className="policy-card-anchor">{policy.anchorNeed}</p>
              <p>{policy.cardSummary}</p>
              <div className="policy-card-meta">
                Most experimental: {experimental ? experimental.label : 'Not specified'}
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}

type PolicyPageProps = {
  policy: Policy
  selectedComponent?: WardleyComponent
  focusedSection: 'anchor' | 'stakeholders' | 'evidence' | 'sentiment' | 'thresholds'
  navigate: NavigateWithViewFn
  view: ComparisonView
  showEdges: boolean
  showMovement: boolean
  onSelectComponent: (component: WardleyComponent) => void
  onToggleEdges: (value: boolean) => void
  onToggleMovement: (value: boolean) => void
}

function PolicyPage({
  policy,
  selectedComponent,
  focusedSection,
  navigate,
  view,
  showEdges,
  showMovement,
  onSelectComponent,
  onToggleEdges,
  onToggleMovement,
}: PolicyPageProps) {
  return (
    <main className="policy-page">
      <section className="policy-detail-header">
        <button type="button" className="back-link" onClick={() => navigate(policy.sectionPath)}>
          Back to section
        </button>
        <div className="section-kicker">Policy {policy.number}</div>
        <h2>{policy.title}</h2>
        <p>{policy.summary}</p>
      </section>

      <ViewSwitcher policy={policy} currentView={view} onNavigate={(nextView) => navigate(policy.path, selectedComponent?.id, nextView)} />

      {view !== 'base' ? <ComparisonLegend view={view} /> : null}
      {view === 'delta' ? <PoliticalDeltaSummary policy={policy} /> : null}

      <div className="map-utility-bar">
        <div className="utility-copy">
          <span className="section-kicker">Map controls</span>
          <p>Export, trace dependencies, and follow reused infrastructure into other maps.</p>
        </div>
        <div className="utility-toggles">
          <label>
            <input
              type="checkbox"
              checked={showEdges}
              onChange={(event) => onToggleEdges(event.target.checked)}
            />
            <span>Show edges</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={showMovement}
              onChange={(event) => onToggleMovement(event.target.checked)}
            />
            <span>Show movement</span>
          </label>
        </div>
      </div>

      <section className="policy-layout">
        <div className="policy-main">
          {view === 'compare' ? (
            <SideBySideView policy={policy} />
          ) : view === 'factcheck' ? (
            <FactCheckView policy={policy} />
          ) : (
            <WardleyMap
              policy={policy}
              view={view}
              selectedId={selectedComponent?.id}
              showEdges={showEdges}
              showMovement={showMovement}
              onSelect={onSelectComponent}
              onJumpToPolicy={(policyId, focusId) => navigate(policyById[policyId].path, focusId, view)}
            />
          )}
          <PolicySidePanel
            policy={policy}
            selectedComponent={selectedComponent}
            focusedSection={focusedSection}
            view={view}
          />
        </div>
      </section>

      <CitationFootnotes citations={policy.citations} />
    </main>
  )
}

function FederalStatePage(props: PolicyPageProps) {
  return (
    <main className="policy-page">
      <section className="policy-detail-header federal-header">
        <div className="section-kicker">Meta map</div>
        <h2>{props.policy.title}</h2>
        <p>{metaHeader}</p>
      </section>

      <ViewSwitcher
        policy={props.policy}
        currentView={props.view}
        onNavigate={(nextView) => props.navigate(props.policy.path, props.selectedComponent?.id, nextView)}
      />

      {props.view !== 'base' ? <ComparisonLegend view={props.view} /> : null}
      {props.view === 'delta' ? <PoliticalDeltaSummary policy={props.policy} /> : null}

      <div className="map-utility-bar">
        <div className="utility-copy">
          <span className="section-kicker">Map controls</span>
          <p>Trace the common delivery substrate beneath the nine policy maps.</p>
        </div>
        <div className="utility-toggles">
          <label>
            <input
              type="checkbox"
              checked={props.showEdges}
              onChange={(event) => props.onToggleEdges(event.target.checked)}
            />
            <span>Show edges</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={props.showMovement}
              onChange={(event) => props.onToggleMovement(event.target.checked)}
            />
            <span>Show movement</span>
          </label>
        </div>
      </div>

      <section className="policy-layout">
        <div className="policy-main">
          {props.view === 'compare' ? (
            <SideBySideView policy={props.policy} />
          ) : props.view === 'factcheck' ? (
            <FactCheckView policy={props.policy} />
          ) : (
            <WardleyMap
              policy={props.policy}
              view={props.view}
              selectedId={props.selectedComponent?.id}
              showEdges={props.showEdges}
              showMovement={props.showMovement}
              onSelect={props.onSelectComponent}
              onJumpToPolicy={(policyId, focusId) => props.navigate(policyById[policyId].path, focusId, props.view)}
            />
          )}
          <PolicySidePanel
            policy={props.policy}
            selectedComponent={props.selectedComponent}
            focusedSection={props.focusedSection}
            view={props.view}
          />
        </div>
      </section>

      <CitationFootnotes citations={props.policy.citations} />

      <section className="matrix-panel">
        <div className="section-kicker">Shared infrastructure matrix</div>
        <h2>Which policies sit on the same delivery substrate</h2>
        <div className="matrix-scroll">
          <table className="shared-matrix">
            <thead>
              <tr>
                <th>Infrastructure component</th>
                {matrixColumns.map((policyId) => (
                  <th key={policyId}>{policyById[policyId].number}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrixRows.map((row) => (
                <tr key={row.label}>
                  <th>{row.label}</th>
                  {matrixColumns.map((policyId) => {
                    const active = row.policies.includes(policyId)
                    const target =
                      active &&
                      sharedGroupById[row.groupId].references.find(
                        (reference) => reference.policyId === policyId,
                      )
                    return (
                      <td key={`${row.label}-${policyId}`}>
                        {active && target ? (
                          <button
                            type="button"
                            className="matrix-dot"
                            onClick={() => props.navigate(policyById[policyId].path, target.componentId)}
                          >
                            ●
                          </button>
                        ) : (
                          <span className="matrix-empty">·</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <MethodologyAddendum />
    </main>
  )
}

function buildPath(path: string, view: ComparisonView) {
  if (path === '/changes') return '/changes'
  if (view === 'delta') return `${path}/delta`
  if (view === 'compare') return `${path}/compare`
  if (view === 'factcheck') return `${path}/factcheck`
  return path
}

function inferPanelSection(component: WardleyComponent) {
  if (component.id === 'voter') return 'anchor'
  if (component.y >= 0.7) return 'stakeholders'
  if (component.stage === 'experimental' || component.y <= 0.3) return 'thresholds'
  if (component.y >= 0.5) return 'evidence'
  return 'sentiment'
}

function deriveSelection(route: RouteState) {
  const policy = policies.find((item) => item.path === route.path)
  if (!policy || !route.focusComponentId) {
    return {
      component: undefined,
      section: 'anchor' as PanelSection,
    }
  }
  const component = policy.components.find((item) => item.id === route.focusComponentId)
  return {
    component,
    section: component ? inferPanelSection(component) : ('anchor' as PanelSection),
  }
}

export default App
