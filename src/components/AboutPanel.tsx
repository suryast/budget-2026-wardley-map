import { aboutContext } from '../data/policies'

export function AboutPanel() {
  return (
    <section className="about-panel" aria-labelledby="about-heading">
      <div className="section-kicker">Cross-cutting context</div>
      <h2 id="about-heading">One budget, five maps, the same argument about fairness</h2>
      <div className="about-grid">
        <article>
          <h3>Design coherence</h3>
          <p>{aboutContext.designCoherence}</p>
        </article>
        <article>
          <h3>Fiscal stance</h3>
          <p>{aboutContext.fiscalStance}</p>
        </article>
        <article>
          <h3>Polling shock</h3>
          <p>{aboutContext.pollingShock}</p>
        </article>
        <article>
          <h3>Senate dynamics</h3>
          <p>{aboutContext.senateDynamics}</p>
        </article>
        <article>
          <h3>Personnel notes</h3>
          <p>{aboutContext.personnelNotes}</p>
        </article>
      </div>
    </section>
  )
}
