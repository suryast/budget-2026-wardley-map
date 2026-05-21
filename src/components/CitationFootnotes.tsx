import { useRef } from 'react'
import type { Citation } from '../data/citations'

type CitationFootnotesProps = {
  citations: Citation[]
}

export function CitationFootnotes({ citations }: CitationFootnotesProps) {
  const refs = useRef<Record<string, HTMLLIElement | null>>({})

  const scrollToCitation = (key: string) => {
    refs.current[key]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    refs.current[key]?.classList.add('citation-flash')
    window.setTimeout(() => refs.current[key]?.classList.remove('citation-flash'), 1200)
  }

  return (
    <section className="footnotes" aria-labelledby="footnotes-heading">
      <div className="section-kicker">References</div>
      <div className="footnote-links" aria-label="Footnote shortcuts">
        {citations.map((citation, index) => (
          <button key={citation.key} type="button" onClick={() => scrollToCitation(citation.key)}>
            [{index + 1}]
          </button>
        ))}
      </div>
      <h3 id="footnotes-heading">Policy bibliography</h3>
      <ol>
        {citations.map((citation, index) => (
          <li
            key={citation.key}
            ref={(node) => {
              refs.current[citation.key] = node
            }}
          >
            <span className="citation-index">[{index + 1}]</span>
            <span>
              {citation.url ? (
                <a href={citation.url} target="_blank" rel="noreferrer">
                  {citation.source}
                </a>
              ) : (
                citation.source
              )}
              {citation.note ? ` — ${citation.note}` : ''}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
