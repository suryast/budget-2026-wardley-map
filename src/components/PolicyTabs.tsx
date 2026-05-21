import type { Policy } from '../data/policies'

type PolicyTabsProps = {
  policies: Policy[]
  activeId: Policy['id']
  onSelect: (policyId: Policy['id']) => void
}

export function PolicyTabs({ policies, activeId, onSelect }: PolicyTabsProps) {
  return (
    <nav className="policy-tabs" aria-label="Policy views">
      {policies.map((policy) => {
        const active = policy.id === activeId
        return (
          <button
            key={policy.id}
            type="button"
            className={active ? 'is-active' : ''}
            onClick={() => onSelect(policy.id)}
            aria-current={active ? 'page' : undefined}
          >
            <span className="policy-tab-number">0{policy.number}</span>
            <span>{policy.title}</span>
          </button>
        )
      })}
    </nav>
  )
}
