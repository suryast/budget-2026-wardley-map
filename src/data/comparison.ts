import type { CitationKey } from './citations'
import type { ComponentComparison, FactCheck, Policy, PolicyId, Stage, WardleyComponent } from './policies'

export type ComparisonView = 'base' | 'delta' | 'compare' | 'factcheck'

export type ComparisonExtra = {
  id: string
  label: string
  x: number
  y: number
  stage: Stage
  comparison: ComponentComparison
}

export type InferenceLogEntry = {
  policyId: PolicyId
  componentId: string
  inferredPosition: string
  basis: string
  confidence: 'high' | 'medium' | 'low'
  whyNotNoPosition: string
}

type PolicyComparisonData = {
  citations?: CitationKey[]
  components?: Record<string, ComponentComparison>
  extras?: ComparisonExtra[]
}

const unsupportedFactCheck = (claim: string, claimant: 'labor' | 'coalition', evidenceNote: string): FactCheck => ({
  claim,
  claimant,
  status: 'unsupported',
  evidenceNote,
})

const contestedFactCheck = (claim: string, claimant: 'labor' | 'coalition', evidenceNote: string): FactCheck => ({
  claim,
  claimant,
  status: 'contested',
  evidenceNote,
})

const comparisonData: Partial<Record<PolicyId, PolicyComparisonData>> = {
  'cgt-ng': {
    citations: ['coalition-budget-reply-hansard'],
    components: {
      'ng-restriction': {
        divergence: 'repeal',
        positionBasis: 'stated',
        coalitionLabel: 'Full repeal of negative gearing restriction',
        coalitionNote:
          'Taylor framed Labor’s housing tax changes as “toxic taxes” and committed to stop them becoming law.',
        sourceKey: 'coalition-budget-reply-hansard',
      },
      'cgt-mintax': {
        divergence: 'repeal',
        positionBasis: 'stated',
        coalitionLabel: 'Full repeal of CGT redesign',
        coalitionNote:
          'The Coalition committed to reverse the CGT discount rewrite rather than amend its settings.',
        sourceKey: 'coalition-budget-reply-hansard',
        factCheck: unsupportedFactCheck(
          'Labor’s housing tax changes are simply “toxic taxes.”',
          'coalition',
          'The repeal commitment is clear, but the budget reply rhetoric does not itself prove that repeal would improve housing outcomes.',
        ),
      },
      'newbuild-def': {
        divergence: 'repeal',
        positionBasis: 'stated',
        coalitionLabel: 'No new-build restriction',
        coalitionNote:
          'Because the Coalition would repeal the package, Labor’s new-build-only boundary would disappear with it.',
        sourceKey: 'coalition-budget-reply-hansard',
      },
      'loss-quarantine': {
        divergence: 'repeal',
        positionBasis: 'stated',
        coalitionLabel: 'No loss quarantining',
        coalitionNote: 'Loss quarantining falls away if the negative gearing change is repealed.',
        sourceKey: 'coalition-budget-reply-hansard',
      },
      'btr-carveout': {
        divergence: 'repeal',
        positionBasis: 'stated',
        coalitionLabel: 'No Labor carve-out structure',
        coalitionNote: 'Labor’s carve-out design would not survive a repeal path.',
        sourceKey: 'coalition-budget-reply-hansard',
      },
      'treasury-model': {
        divergence: 'differ',
        positionBasis: 'none',
        coalitionNote: 'The parties diverge on the package, but the Coalition did not offer an equivalent model here.',
      },
    },
    extras: [
      {
        id: 'bracket-indexation-tax',
        label: 'Bracket indexation “tax back guarantee”',
        x: 0.72,
        y: 0.76,
        stage: 'emerging',
        comparison: {
          divergence: 'coalition-only',
          positionBasis: 'stated',
          coalitionLabel: 'Bracket indexation',
          coalitionStage: 'emerging',
          coalitionNote:
            'The Coalition’s tax centrepiece indexes the lower two thresholds from 2028-29 and the upper two from 2031-32.',
          sourceKey: 'guardian-budget-reply',
          factCheck: contestedFactCheck(
            'Bracket indexation fully protects 85% of income earners.',
            'coalition',
            'The reply gives a headline estimate, but the distributional impact depends on inflation, wage growth, and later threshold changes.',
          ),
        },
      },
    ],
  },
  'div-296': {
    citations: ['smsf-div296-article'],
    components: {
      div296: {
        divergence: 'differ',
        positionBasis: 'inferred',
        coalitionLabel: 'Likely repeal or redesign',
        coalitionNote:
          'The reply did not restate a Division 296 position. Prior Coalition opposition suggests a future government would likely reopen or unwind the measure, but v1 treats that as inference, not a current promise.',
        sourceKey: 'smsf-div296-article',
      },
    },
  },
  'cost-of-living': {
    citations: ['guardian-budget-reply', 'coalition-budget-reply-hansard'],
    components: {
      'bracket-cuts': {
        divergence: 'differ',
        positionBasis: 'stated',
        coalitionLabel: 'Bracket indexation instead of episodic cuts',
        coalitionX: 0.74,
        coalitionStage: 'emerging',
        coalitionNote:
          'Labor offers legislated threshold changes; the Coalition would index thresholds to inflation as an automatic mechanism.',
        sourceKey: 'guardian-budget-reply',
        factCheck: contestedFactCheck(
          'Bracket indexation delivers about $250 in year one and more than $1,000 by year four.',
          'coalition',
          'Those projections depend on inflation and income growth assumptions that were not fully published in the reply.',
        ),
      },
      wato: {
        divergence: 'differ',
        positionBasis: 'stated',
        coalitionLabel: 'Bracket indexation, not a deferred offset',
        coalitionNote:
          'The Coalition framed its tax relief as structural bracket indexation rather than another offset-style mechanism.',
        sourceKey: 'guardian-budget-reply',
      },
      'bulk-billing': {
        divergence: 'no-position',
        positionBasis: 'none',
      },
      'pbs-cap': {
        divergence: 'no-position',
        positionBasis: 'none',
      },
      'energy-rebate': {
        divergence: 'no-position',
        positionBasis: 'none',
      },
      'fuel-excise': {
        divergence: 'no-position',
        positionBasis: 'none',
      },
    },
    extras: [
      {
        id: 'future-generations-fund',
        label: 'Future Generations Fund',
        x: 0.26,
        y: 0.7,
        stage: 'emerging',
        comparison: {
          divergence: 'coalition-only',
          positionBasis: 'stated',
          coalitionLabel: 'Future Generations Fund',
          coalitionStage: 'emerging',
          coalitionNote:
            'The Coalition would bank 80 cents of each resource-windfall dollar for debt reduction and nation-building infrastructure, with 25% for regional Australia.',
          sourceKey: 'guardian-budget-reply',
        },
      },
    ],
  },
  housing: {
    citations: ['abc-housing-cap', 'coalition-budget-reply-hansard'],
    components: {
      'help-to-buy': {
        divergence: 'repeal',
        positionBasis: 'stated',
        coalitionLabel: 'Abolish Help to Buy',
        coalitionNote: 'Taylor said the Coalition would abolish Help to Buy as part of its housing reset.',
        sourceKey: 'abc-housing-cap',
      },
      'housing-australia': {
        divergence: 'repeal',
        positionBasis: 'stated',
        coalitionLabel: 'Abolish HAFF structure',
        coalitionNote:
          'The Coalition would scrap the Housing Australia Future Fund architecture rather than work through it.',
        sourceKey: 'abc-housing-cap',
      },
      'local-infra': {
        divergence: 'differ',
        positionBasis: 'stated',
        coalitionLabel: '$5bn Housing Infrastructure Fund',
        coalitionX: 0.3,
        coalitionStage: 'emerging',
        coalitionNote:
          'Labor’s $2bn local infrastructure support becomes a larger Coalition housing-enabling fund aimed at unlocking up to 400,000 homes.',
        sourceKey: 'abc-housing-cap',
      },
      fhg: {
        divergence: 'agree',
        positionBasis: 'stated',
        coalitionLabel: 'Keep first-home-buyer support',
        coalitionNote:
          'The Coalition keeps first-home-buyer assistance in direction, while changing Labor’s institutional mix.',
        sourceKey: 'abc-housing-cap',
      },
      'state-planning': {
        divergence: 'differ',
        positionBasis: 'stated',
        coalitionLabel: 'Code rollback to change build costs',
        coalitionNote:
          'The Coalition would intervene through the National Construction Code and enabling infrastructure rather than Labor’s current housing bureaucracy.',
        sourceKey: 'abc-housing-cap',
      },
    },
    extras: [
      {
        id: 'housing-code-rollback',
        label: 'Wind back National Construction Code',
        x: 0.22,
        y: 0.62,
        stage: 'emerging',
        comparison: {
          divergence: 'coalition-only',
          positionBasis: 'stated',
          coalitionLabel: 'Construction code rollback',
          coalitionStage: 'emerging',
          coalitionNote:
            'Taylor said the Coalition would remove energy-efficiency requirements from the code, claiming it could cut build costs by up to $70,000 per home.',
          sourceKey: 'abc-housing-cap',
          factCheck: unsupportedFactCheck(
            'Rolling back code requirements could cut up to $70,000 from the cost of a home.',
            'coalition',
            'The reply gave the headline saving, but the costed basis was not published and likely conflates land, compliance, and build-type assumptions.',
          ),
        },
      },
    ],
  },
  migration: {
    citations: ['abc-housing-cap', 'abc-values-plan', 'coalition-budget-reply-hansard'],
    components: {
      'perm-quota': {
        divergence: 'differ',
        positionBasis: 'stated',
        coalitionLabel: 'NOM ceiling tied to annual home completions',
        coalitionX: 0.18,
        coalitionStage: 'experimental',
        coalitionNote:
          'Both parties seek lower migration pressure, but the Coalition would tie net migration directly to the number of homes completed.',
        sourceKey: 'abc-housing-cap',
      },
      'student-integrity': {
        divergence: 'agree',
        positionBasis: 'stated',
        coalitionLabel: 'Sharper student tightening',
        coalitionNote:
          'Both parties support tougher student-visa settings, with the Coalition pushing a harder version.',
        sourceKey: 'coalition-budget-reply-hansard',
      },
      'npl-students': {
        divergence: 'differ',
        positionBasis: 'stated',
        coalitionLabel: 'Hard housing-linked cap',
        coalitionNote:
          'Labor uses managed planning levels; the Coalition shifts to a more mechanical housing-linked ceiling.',
        sourceKey: 'abc-housing-cap',
      },
      'char-test': {
        divergence: 'differ',
        positionBasis: 'stated',
        coalitionLabel: 'Values condition + safe-country and overstayer crackdown',
        coalitionNote:
          'The reply restated stronger character, values, and deportation measures as part of a migration-control package.',
        sourceKey: 'coalition-budget-reply-hansard',
      },
      'home-affairs': {
        divergence: 'differ',
        positionBasis: 'stated',
        coalitionLabel: 'Overstayer removals and stronger screening',
        coalitionNote:
          'Coalition management emphasises deportations, values enforcement, and protection-claim curtailment.',
        sourceKey: 'coalition-budget-reply-hansard',
      },
    },
    extras: [
      {
        id: 'values-plan',
        label: 'Australian values visa condition',
        x: 0.28,
        y: 0.58,
        stage: 'emerging',
        comparison: {
          divergence: 'coalition-only',
          positionBasis: 'stated',
          coalitionLabel: 'Australian values migration plan',
          coalitionStage: 'emerging',
          coalitionNote:
            'The Coalition would make the values statement enforceable, require English for permanent visa holders, restore temporary protection visas, and target overstayer removals.',
          sourceKey: 'coalition-budget-reply-hansard',
        },
      },
    ],
  },
  productivity: {
    citations: ['guardian-budget-reply'],
    components: {
      'asset-writeoff': {
        divergence: 'differ',
        positionBasis: 'stated',
        coalitionLabel: 'Permanent $50k write-off for firms under $10m turnover',
        coalitionX: 0.83,
        coalitionStage: 'settled',
        coalitionNote:
          'Both parties back a permanent instant asset write-off, but the Coalition raises the cap from $20k to $50k.',
        sourceKey: 'guardian-budget-reply',
      },
      'red-tape': {
        divergence: 'agree',
        positionBasis: 'stated',
        coalitionLabel: 'Free the economy from the government’s chains',
        coalitionNote:
          'The Coalition repeated a deregulatory frame but did not publish a Labor-style quantified red-tape target in the reply.',
        sourceKey: 'coalition-budget-reply-hansard',
      },
    },
  },
  energy: {
    citations: ['coalition-budget-reply-hansard'],
    components: {
      'safeguard-mech': {
        divergence: 'repeal',
        positionBasis: 'stated',
        coalitionLabel: 'End safeguard mechanism and net-zero carbon taxes',
        coalitionNote:
          'The Coalition explicitly pledged to end the safeguard mechanism rather than tweak it.',
        sourceKey: 'coalition-budget-reply-hansard',
      },
      cis: {
        divergence: 'differ',
        positionBasis: 'stated',
        coalitionLabel: 'Coal extension over renewable-led replacement',
        coalitionNote:
          'Labor’s transition architecture remains contested because the Coalition argues renewables are not yet a rapid fossil-fuel replacement.',
        sourceKey: 'coalition-budget-reply-hansard',
      },
      'grid-infrastructure': {
        divergence: 'differ',
        positionBasis: 'stated',
        coalitionLabel: 'Keep dispatchable supply and prolong coal',
        coalitionNote:
          'The Coalition’s energy-security approach would slow Labor’s transition dependencies.',
        sourceKey: 'coalition-budget-reply-hansard',
      },
    },
    extras: [
      {
        id: 'coal-prolongation',
        label: 'Coal-fired generation prolongation',
        x: 0.82,
        y: 0.66,
        stage: 'established',
        comparison: {
          divergence: 'coalition-only',
          positionBasis: 'stated',
          coalitionLabel: 'Extend coal while transition slows',
          coalitionStage: 'established',
          coalitionNote:
            'Coal prolongation is a Coalition-only addition to Labor’s transition framing.',
          sourceKey: 'coalition-budget-reply-hansard',
        },
      },
      {
        id: 'rooftop-solar-agreement',
        label: 'Rooftop solar and batteries still have a role',
        x: 0.6,
        y: 0.58,
        stage: 'established',
        comparison: {
          divergence: 'agree',
          positionBasis: 'stated',
          coalitionLabel: 'Narrow agreement on household energy tech',
          coalitionStage: 'established',
          coalitionNote:
            'Taylor still acknowledged rooftop solar and home batteries as part of the mix, even while attacking the broader transition design.',
          sourceKey: 'coalition-budget-reply-hansard',
        },
      },
    ],
  },
  defence: {
    citations: ['coalition-budget-reply-hansard'],
    components: {
      'aukus-p1': {
        divergence: 'agree',
        positionBasis: 'stated',
        coalitionLabel: 'AUKUS remains bipartisan',
        coalitionNote: 'AUKUS support is bipartisan and survives a change of government.',
        sourceKey: 'coalition-budget-reply-hansard',
      },
      'aukus-p2': {
        divergence: 'agree',
        positionBasis: 'stated',
        coalitionLabel: 'AUKUS remains bipartisan',
        coalitionNote: 'Advanced-capability cooperation remains bipartisan.',
        sourceKey: 'coalition-budget-reply-hansard',
      },
      'dsr-framework': {
        divergence: 'differ',
        positionBasis: 'stated',
        coalitionLabel: 'National Security Strategy + adviser structure',
        coalitionNote:
          'The Coalition adds a new security-governance layer rather than just inheriting Labor’s strategic review framing.',
        sourceKey: 'coalition-budget-reply-hansard',
      },
    },
    extras: [
      {
        id: 'national-security-adviser',
        label: 'National Security Adviser + strategy',
        x: 0.58,
        y: 0.58,
        stage: 'emerging',
        comparison: {
          divergence: 'coalition-only',
          positionBasis: 'stated',
          coalitionLabel: 'National Security Adviser',
          coalitionStage: 'emerging',
          coalitionNote:
            'The Coalition adds an NSA role and a fresh national security strategy with energy security embedded as a priority.',
          sourceKey: 'coalition-budget-reply-hansard',
        },
      },
    ],
  },
  ndis: {
    citations: ['coalition-budget-reply-hansard', 'grattan-welfare-citizenship'],
    components: {
      'jobseeker-rate': {
        divergence: 'differ',
        positionBasis: 'stated',
        coalitionLabel: 'Citizens-only access for JobSeeker and other welfare payments',
        coalitionNote:
          'The sharpest divergence in this map is not rate-setting but eligibility: the Coalition would restrict multiple benefits to citizens.',
        sourceKey: 'coalition-budget-reply-hansard',
        factCheck: contestedFactCheck(
          'If you commit to Australia, then Australia will commit to you.',
          'coalition',
          'The slogan describes a citizenship test, but Grattan argued the operational policy detail was underdeveloped and could hit settled residents unpredictably.',
        ),
      },
      'services-au': {
        divergence: 'differ',
        positionBasis: 'stated',
        coalitionLabel: 'Eligibility gate hardened around citizenship',
        coalitionNote:
          'Services Australia would need to enforce a much tighter citizenship rule across multiple benefits.',
        sourceKey: 'coalition-budget-reply-hansard',
      },
      'ndis-reform': {
        divergence: 'differ',
        positionBasis: 'stated',
        coalitionLabel: 'Citizens-only NDIS access',
        coalitionNote:
          'The Coalition extended its citizenship restriction to the NDIS, making eligibility rather than fiscal architecture the main point of divergence.',
        sourceKey: 'coalition-budget-reply-hansard',
      },
    },
    extras: [
      {
        id: 'welfare-citizenship-test',
        label: 'Citizens-only welfare and NDIS access',
        x: 0.38,
        y: 0.66,
        stage: 'emerging',
        comparison: {
          divergence: 'coalition-only',
          positionBasis: 'stated',
          coalitionLabel: 'Citizenship eligibility restriction',
          coalitionStage: 'emerging',
          coalitionNote:
            'The Coalition would restrict the NDIS and 17 welfare payments to citizens, a social-security change without a Labor equivalent.',
          sourceKey: 'coalition-budget-reply-hansard',
        },
      },
    ],
  },
  'federal-state': {
    citations: ['abc-housing-cap', 'guardian-budget-reply'],
    components: {
      'housing-bilaterals': {
        divergence: 'differ',
        positionBasis: 'stated',
        coalitionLabel: 'Infrastructure-led housing unlock model',
        coalitionNote:
          'Coalition housing changes still hit the federal-state layer, but through infrastructure unlocking and migration caps rather than HAFF-style delivery.',
        sourceKey: 'abc-housing-cap',
      },
      'state-planning': {
        divergence: 'differ',
        positionBasis: 'stated',
        coalitionLabel: 'Migration cap and code rollback both lean on state delivery',
        coalitionNote:
          'State planning remains a pressure point under both parties, even though the Coalition articulated less about the intergovernmental mechanism itself.',
        sourceKey: 'abc-housing-cap',
      },
      'state-revenue': {
        divergence: 'no-position',
        positionBasis: 'none',
      },
      'state-health': {
        divergence: 'no-position',
        positionBasis: 'none',
      },
    },
  },
}

const fallbackComparison: ComponentComparison = {
  divergence: 'no-position',
  positionBasis: 'none',
}

export const comparisonMethodology = {
  provenance:
    'Stated positions come from the Coalition Budget Reply on 14 May 2026 or dated follow-up reporting on explicit commitments. Inferred positions are only used where a prior Coalition policy clearly carries forward into the same component. Everything else stays honestly silent as no-position.',
  evenHandedness:
    'The compare view presents each party’s case in its own framing. Divergence classes describe the relationship between positions; they do not tell the reader which side is correct. The fact-check view evaluates checkable claims from both parties and links out when factual-au already covers the claim.',
  updateNote:
    'Last updated: 18 June 2026 UTC. Added the ABC-reported small-business/startup CGT carve-out consultation as a policy-update log item; Coalition reply positions still predate later legislative and consultation detail unless explicitly sourced otherwise.',
}

export const inferenceLog: InferenceLogEntry[] = [
  {
    policyId: 'div-296',
    componentId: 'div296',
    inferredPosition: 'Likely repeal or redesign of Division 296 rather than support for the enacted two-tier model.',
    basis: 'SMSF Adviser, “Coalition vows to repeal Division 296”, 23 Jan 2025.',
    confidence: 'medium',
    whyNotNoPosition:
      'The Coalition previously ran a clear repeal line on the earlier design, so a reopened stance is more plausible than pure silence, but the 14 May 2026 reply did not restate it explicitly.',
  },
]

export function withComparison(policy: Policy): Policy {
  const data = comparisonData[policy.id]
  const comparisons = data?.components ?? {}
  return {
    ...policy,
    citationKeys: uniqueCitationKeys(policy.citationKeys, data?.citations ?? []),
    components: policy.components.map((component) => ({
      ...component,
      comparison: comparisons[component.id] ?? fallbackComparison,
    })),
  }
}

function uniqueCitationKeys(base: CitationKey[], extra: CitationKey[]) {
  return [...new Set([...base, ...extra])]
}

export function comparisonExtrasForPolicy(policyId: PolicyId) {
  return comparisonData[policyId]?.extras ?? []
}

export function comparisonSummary(policy: Policy) {
  const counts = {
    agree: 0,
    differ: 0,
    repeal: 0,
    'coalition-only': comparisonExtrasForPolicy(policy.id).length,
    'no-position': 0,
  } as Record<ComponentComparison['divergence'], number>

  for (const component of policy.components) {
    counts[component.comparison?.divergence ?? 'no-position'] += 1
  }

  return counts
}

export function factCheckEntries(policy: Policy) {
  const rows = [
    ...policy.components.map((component) => buildFactCheckEntry(component)),
    ...comparisonExtrasForPolicy(policy.id).map((extra) => buildFactCheckEntry(extra)),
  ]

  return rows.filter((row): row is NonNullable<typeof row> => Boolean(row))
}

function buildFactCheckEntry(component: WardleyComponent | ComparisonExtra) {
  if (component.comparison?.positionBasis !== 'stated' || !component.comparison.factCheck) {
    return null
  }

  return {
    componentId: component.id,
    label: component.label,
    divergence: component.comparison.divergence,
    factCheck: component.comparison.factCheck,
  }
}

export function coalitionColumnItems(policy: Policy) {
  const statedOrInferred = policy.components
    .filter((component) => component.comparison?.divergence !== 'no-position')
    .map((component) => ({
      id: component.id,
      label: component.comparison?.coalitionLabel ?? component.label,
      basis: component.comparison?.positionBasis ?? 'none',
      note: component.comparison?.coalitionNote ?? 'No stated Coalition position.',
      divergence: component.comparison?.divergence ?? 'no-position',
      sourceKey: component.comparison?.sourceKey,
      sourceLabel: component.comparison?.sourceKey,
    }))

  const extras = comparisonExtrasForPolicy(policy.id).map((extra) => ({
    id: extra.id,
    label: extra.comparison.coalitionLabel ?? extra.label,
    basis: extra.comparison.positionBasis,
    note: extra.comparison.coalitionNote ?? '',
    divergence: extra.comparison.divergence,
    sourceKey: extra.comparison.sourceKey,
    sourceLabel: extra.comparison.sourceKey,
  }))

  return [...statedOrInferred, ...extras]
}
