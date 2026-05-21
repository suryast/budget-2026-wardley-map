const stageLabels = [
  'I. Experimental',
  'II. Emerging',
  'III. Established',
  'IV. Settled',
]

export function EvolutionAxis() {
  return (
    <>
      <div className="evolution-axis" aria-hidden="true">
        {stageLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <p className="axis-caption">
        Components evolve left to right over time. Position reflects current maturity, not future
        state.
      </p>
    </>
  )
}
