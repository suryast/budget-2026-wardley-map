import { useId, useMemo, useRef, useState } from 'react'
import { EvolutionAxis } from './EvolutionAxis'
import { sharedGroupById, type Policy, type PolicyId, type WardleyComponent } from '../data/policies'
import { comparisonExtrasForPolicy, type ComparisonView } from '../data/comparison'

const MAP_WIDTH = 1120
const MAP_HEIGHT = 640
const PADDING = { top: 60, right: 72, bottom: 56, left: 48 }

type WardleyMapProps = {
  policy: Policy
  selectedId?: string
  showEdges: boolean
  showMovement: boolean
  view?: ComparisonView
  onJumpToPolicy?: (policyId: PolicyId, focusComponentId?: string) => void
  onSelect: (component: WardleyComponent) => void
}

const stageClass: Record<string, string> = {
  experimental: 'node-experimental',
  emerging: 'node-emerging',
  established: 'node-established',
  settled: 'node-settled',
  anchor: 'node-anchor',
}

export function WardleyMap({
  policy,
  selectedId,
  showEdges,
  showMovement,
  view = 'base',
  onJumpToPolicy,
  onSelect,
}: WardleyMapProps) {
  const [hoveredId, setHoveredId] = useState<string>()
  const titleId = useId()
  const descriptionId = useId()
  const svgRef = useRef<SVGSVGElement | null>(null)

  const componentIndex = useMemo(
    () => Object.fromEntries(policy.components.map((component) => [component.id, component])),
    [policy.components],
  )

  const activeId = hoveredId ?? selectedId
  const activeComponent = activeId ? componentIndex[activeId] : undefined
  const activeSharedGroup =
    activeComponent?.sharedGroup ? sharedGroupById[activeComponent.sharedGroup] : undefined
  const sharedReferences =
    activeSharedGroup?.references.filter((reference) => reference.policyId !== policy.id) ?? []

  const connectedIds = useMemo(() => {
    if (!activeId) return new Set<string>()
    const linked = new Set<string>([activeId])
    for (const edge of policy.edges) {
      if (edge.from === activeId || edge.to === activeId) {
        linked.add(edge.from)
        linked.add(edge.to)
      }
    }
    return linked
  }, [activeId, policy.edges])

  const comparisonExtras = view === 'delta' ? comparisonExtrasForPolicy(policy.id) : []

  return (
    <figure className="map-frame">
      <figcaption>
        <div className="section-kicker">Wardley map</div>
        <h2>{policy.title}</h2>
        <p>
          Visible policy capability sits toward the top. Underlying infrastructure sinks toward the
          base. Evolution runs from experimental on the left to settled on the right.
        </p>
      </figcaption>

      <div className="map-toolbar" aria-label="Map controls">
        <div className="map-toggles">
          <label>
            <input type="checkbox" checked={showEdges} readOnly />
            <span>Edges on</span>
          </label>
          <label>
            <input type="checkbox" checked={showMovement} readOnly />
            <span>Movement on</span>
          </label>
        </div>
        <div className="map-actions">
          <button type="button" onClick={() => downloadSvg(svgRef.current, policy.id)}>
            Download SVG
          </button>
          <button type="button" onClick={() => downloadPng(svgRef.current, policy.id)}>
            Download PNG
          </button>
        </div>
      </div>

      {sharedReferences.length > 0 ? (
        <div className="shared-badge-panel">
          <div className="section-kicker">Shared component</div>
          <p>
            <strong>{activeComponent?.label}</strong> also appears in related maps.
          </p>
          <div className="shared-badge-links">
            {sharedReferences.map((reference) => (
              <button
                key={`${reference.policyId}-${reference.componentId}`}
                type="button"
                onClick={() => onJumpToPolicy?.(reference.policyId, reference.componentId)}
              >
                {reference.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <EvolutionAxis />

      <div className="map-scroll">
        <svg
          ref={svgRef}
          className="wardley-map"
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          role="img"
          aria-labelledby={`${titleId} ${descriptionId}`}
        >
          <title id={titleId}>{policy.title} Wardley map</title>
          <desc id={descriptionId}>{policy.anchorNeed}</desc>

          <g className="map-columns" aria-hidden="true">
            {[0.25, 0.5, 0.75].map((stop) => (
              <line
                key={stop}
                x1={projectX(stop)}
                x2={projectX(stop)}
                y1={PADDING.top}
                y2={MAP_HEIGHT - PADDING.bottom}
              />
            ))}
          </g>

          <g className="map-guides" aria-hidden="true">
            <text x={PADDING.left} y={PADDING.top - 20}>
              Visible to voter
            </text>
            <text x={PADDING.left} y={MAP_HEIGHT - 16}>
              Underlying infrastructure
            </text>
          </g>

          {showEdges ? (
            <g className="map-edges">
              {policy.edges.map((edge) => {
                const from = componentIndex[edge.from]
                const to = componentIndex[edge.to]
                const dimmed = activeId && !connectedIds.has(from.id) && !connectedIds.has(to.id)
                return (
                  <line
                    key={`${edge.from}-${edge.to}`}
                    className={edge.kind === 'flow' ? 'edge edge-flow' : 'edge'}
                    x1={projectX(from.x)}
                    y1={projectY(from.y)}
                    x2={projectX(to.x)}
                    y2={projectY(to.y)}
                    opacity={dimmed ? 0.18 : 0.7}
                  />
                )
              })}
            </g>
          ) : null}

          <g className="map-nodes">
            {policy.components.map((component) => {
              const x = projectX(component.x)
              const y = projectY(component.y)
              const nearRight = component.x > 0.82
              const active = activeId === component.id
              const connected = activeId ? connectedIds.has(component.id) : true
              const stage = component.stage ? stageClass[component.stage] : stageClass.anchor
              const labelX = nearRight ? x - 12 : x + 14
              const textAnchor = nearRight ? 'end' : 'start'
              const labelLines = wrapLabel(component.label, component.id === 'voter' ? 20 : 24)
              const labelStartY =
                component.id === 'voter'
                  ? -18 - (labelLines.length - 1) * 9
                  : labelLines.length > 1
                    ? -(labelLines.length - 1) * 8
                    : 5

              return (
                <g
                  key={component.id}
                  className={`node-group ${stage}`}
                  opacity={connected ? 1 : 0.28}
                  transform={`translate(${x} ${y})`}
                  onMouseEnter={() => setHoveredId(component.id)}
                  onMouseLeave={() => setHoveredId(undefined)}
                  onClick={() => onSelect(component)}
                >
                  <title>
                    {component.label}
                    {component.note ? ` — ${component.note}` : ''}
                  </title>
                  <circle
                    className={`${active ? 'node-circle is-active' : 'node-circle'} ${view === 'delta' ? `delta-${component.comparison?.divergence ?? 'no-position'}` : ''} ${component.comparison?.positionBasis === 'inferred' ? 'basis-inferred' : ''}`}
                    r={component.id === 'voter' ? 11 : 9}
                  />
                  {view === 'delta' && component.comparison?.divergence === 'repeal' ? (
                    <path className="delta-repeal-mark" d="M -10 -10 L 10 10 M 10 -10 L -10 10" />
                  ) : null}
                  {showMovement && component.movement === 'build' ? (
                    <path className="movement-build" d="M 14 -4 L 28 -4 L 28 -8 L 36 0 L 28 8 L 28 4 L 14 4 Z" />
                  ) : null}
                  {showMovement && component.movement === 'buy' ? (
                    <text className="movement-buy" x={14} y={-14}>
                      buy
                    </text>
                  ) : null}
                  <text
                    className="node-label"
                    x={labelX - x}
                    y={labelStartY}
                    textAnchor={textAnchor}
                    opacity={connected ? 1 : 0.22}
                  >
                    {labelLines.map((line, index) => (
                      <tspan
                        key={`${component.id}-line-${index}`}
                        x={labelX - x}
                        dy={index === 0 ? 0 : 18}
                      >
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              )
            })}
          </g>

          {view === 'delta' && comparisonExtras.length > 0 ? (
            <g className="map-nodes map-nodes-ghost">
              {comparisonExtras.map((component) => {
                const x = projectX(component.x)
                const y = projectY(component.y)
                return (
                  <g
                    key={component.id}
                    className="node-group node-ghost"
                    transform={`translate(${x} ${y})`}
                  >
                    <circle className="node-circle delta-coalition-only" r={9} />
                    <text className="ghost-glyph" y={4} textAnchor="middle">+</text>
                    <text className="node-label" x={14} y={5}>
                      {component.label}
                    </text>
                  </g>
                )
              })}
            </g>
          ) : null}
        </svg>
      </div>
    </figure>
  )
}

function wrapLabel(label: string, maxChars: number) {
  if (label.length <= maxChars) return [label]

  const words = label.split(' ')
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (next.length <= maxChars || current === '') {
      current = next
      continue
    }
    lines.push(current)
    current = word
    if (lines.length === 1) break
  }

  const remainingWords = words.slice(lines.join(' ').split(' ').filter(Boolean).length)
  const remaining = [current, ...remainingWords].filter(Boolean).join(' ')
  if (remaining) {
    lines.push(remaining.length > maxChars ? `${remaining.slice(0, maxChars - 1).trimEnd()}…` : remaining)
  }

  return lines.slice(0, 2)
}

function projectX(value: number) {
  return PADDING.left + value * (MAP_WIDTH - PADDING.left - PADDING.right)
}

function projectY(value: number) {
  return MAP_HEIGHT - PADDING.bottom - value * (MAP_HEIGHT - PADDING.top - PADDING.bottom)
}

function downloadSvg(svg: SVGSVGElement | null, policyId: string) {
  if (!svg) return
  const serializer = new XMLSerializer()
  const markup = serializer.serializeToString(svg)
  const blob = new Blob([markup], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  triggerDownload(url, `budget-2026-wardley-${policyId}.svg`)
  URL.revokeObjectURL(url)
}

function downloadPng(svg: SVGSVGElement | null, policyId: string) {
  if (!svg) return
  const serializer = new XMLSerializer()
  const markup = serializer.serializeToString(svg)
  const blob = new Blob([markup], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const image = new Image()
  image.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = MAP_WIDTH * 2
    canvas.height = MAP_HEIGHT * 2
    const context = canvas.getContext('2d')
    if (!context) return
    context.fillStyle = '#fbf8f2'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.drawImage(image, 0, 0, canvas.width, canvas.height)
    const pngUrl = canvas.toDataURL('image/png')
    triggerDownload(pngUrl, `budget-2026-wardley-${policyId}.png`)
    URL.revokeObjectURL(url)
  }
  image.src = url
}

function triggerDownload(url: string, filename: string) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
