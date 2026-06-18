import { citationLibrary, type Citation, type CitationKey } from './citations'
import { withComparison } from './comparison'

export type Movement = 'build' | 'buy' | 'outsource' | null
export type Stage = 'experimental' | 'emerging' | 'established' | 'settled'
export type SectionId = 'household' | 'system' | 'external' | 'meta'

export type WardleyComponent = {
  id: string
  label: string
  x: number
  y: number
  stage?: Stage
  movement?: Movement
  note?: string
  sharedGroup?: SharedGroupId
  comparison?: ComponentComparison
}

export type FactCheck = {
  claim: string
  claimant: 'labor' | 'coalition'
  status: 'supported' | 'contested' | 'unsupported' | 'unverifiable'
  evidenceNote: string
  factualAuUrl?: string
}

export type ComponentComparison = {
  divergence: 'agree' | 'differ' | 'repeal' | 'coalition-only' | 'no-position'
  positionBasis: 'stated' | 'inferred' | 'none'
  coalitionLabel?: string
  coalitionX?: number
  coalitionStage?: Stage
  coalitionNote?: string
  sourceKey?: CitationKey
  factCheck?: FactCheck
}

export type WardleyEdge = {
  from: string
  to: string
  kind?: 'dependency' | 'flow'
}

export type PolicyId =
  | 'cgt-ng'
  | 'div-296'
  | 'cost-of-living'
  | 'housing'
  | 'migration'
  | 'productivity'
  | 'energy'
  | 'defence'
  | 'ndis'
  | 'federal-state'

export type Policy = {
  id: PolicyId
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 9 | 11 | 13
  section: SectionId
  sectionPath: string
  path: string
  title: string
  anchorNeed: string
  summary: string
  cardSummary: string
  stakeholders: string
  evidence: string
  sentiment: string
  thresholds: string[]
  pressurePoints: string[]
  components: WardleyComponent[]
  edges: WardleyEdge[]
  citationKeys: CitationKey[]
  citations: Citation[]
}

export type SectionMeta = {
  id: Exclude<SectionId, 'meta'>
  path: string
  title: string
  description: string
  intro: string
  sharedConcerns: string
  motif: string
}

export type SharedGroupId =
  | 'ato'
  | 'state-planning'
  | 'trades'
  | 'services-au'
  | 'treasury-model'
  | 'state-bilateral'
  | 'state-revenue'
  | 'state-health'
  | 'migration-act'

export type SharedGroup = {
  id: SharedGroupId
  label: string
  rowsLabel: string
  references: { policyId: PolicyId; componentId: string; label: string }[]
}

const buildCitations = (keys: readonly CitationKey[]) => keys.map((key) => citationLibrary[key])

export const sections: SectionMeta[] = [
  {
    id: 'household',
    path: '/household',
    title: 'Household-facing',
    description: 'What voters feel directly in rent, tax, bills, and the odds of buying a home.',
    intro:
      'These maps cover the parts of the Budget that households experience immediately. They are politically salient because they touch prices, mortgage pressure, rents, and the sense that the system is or is not fair.',
    sharedConcerns:
      'Shared concerns: Treasury tax delivery, Services Australia payments, and whether housing supply and inflation pressures reinforce each other.',
    motif: 'Motif: warmer paper tones and domestic life pressures.',
  },
  {
    id: 'system',
    path: '/system',
    title: 'System rewiring',
    description: 'Institutional reforms that touch fewer people directly but reset long-run incentives.',
    intro:
      'These maps sit deeper in the state machinery. They are lower-salience politically, but they reshape how capital, retirement savings, disability supports, and firm investment are governed over time.',
    sharedConcerns:
      'Shared concerns: ATO and Treasury infrastructure, state cooperation, and whether structural reform survives the next election cycle.',
    motif: 'Motif: structural, architectural, rules-and-institutions language.',
  },
  {
    id: 'external',
    path: '/external',
    title: 'External pressure',
    description: 'Global shocks and strategic pressures that force domestic policy choices.',
    intro:
      'These maps track the forces coming in from outside the household budget frame: migration, energy insecurity, and defence strategy. They are driven by global constraints but delivered through domestic institutions.',
    sharedConcerns:
      'Shared concerns: state approvals, workforce bottlenecks, and the tension between sovereignty, openness, and cost control.',
    motif: 'Motif: outward force, inward pressure, regional and global exposure.',
  },
]

const rawPolicies = [
  {
    id: 'cgt-ng',
    number: 1,
    section: 'household',
    sectionPath: '/household',
    path: '/household/cgt-ng',
    title: 'CGT & Negative Gearing Reform',
    anchorNeed:
      'Affordable home ownership for working-age Australians and intergenerational tax fairness.',
    summary:
      'Generational rewrite, now with carve-outs. From 1 July 2027 the 50% CGT discount is replaced with cost-base indexation plus a 30% minimum tax on real capital gains, but the government has since proposed expanding the small-business active asset discount threshold to $10m turnover and consulting on a startup carve-out for founders, early investors and ESS employees. Negative gearing is limited to new builds for properties bought after 7:30pm AEST 12 May 2026; existing investors are grandfathered.',
    cardSummary: 'Housing tax preferences are narrowed to shift capital away from existing homes.',
    stakeholders:
      'Government framed it as worth any near-term political cost, then moved to contain backlash from startups and small business through carve-outs announced on 18 June. Grattan, ACOSS, and The Australia Institute endorsed the original direction. Property Council is conditionally supportive if the new-build incentive works; REIA is hostile and modelled roughly 25,500 fewer homes over five years. Coalition says it will repeal the package if elected. Greens call it tinkering. Wayne Swan publicly criticised the CGT competitiveness impact.',
    evidence:
      'Treasury models roughly a 2% house-price effect. Grattan estimates more than $20 billion a year in deficit reduction within a decade. The PBO costed the CGT discount at $247 billion over the next ten years. Treasury data says 89% of CGT discount benefits went to the top 20% of income earners in 2022-23.',
    sentiment:
      'Newspoll found 60% saying the housing measures were a step in the wrong direction or made no difference. Labor primary held at 31%, but Resolve had Angus Taylor ahead of Anthony Albanese as preferred prime minister, 33 to 30, for the first time. One Nation surged to 27%.',
    thresholds: [
      'Legislative amendment to the new-build definition, likely pushed by the Property Council.',
      'Senate negotiation outcome, especially if Greens trade support for renter protections.',
      'Behavioural overshoot from a pre-July-2027 rush of asset sales.',
      'Drafting of the $10m active asset threshold and the startup carve-out eligibility tests for “new, innovative” businesses.',
    ],
    pressurePoints: [
      'Shares the Treasury revenue model with Policies 2 and 6.',
      'Depends on ATO assessment systems also used in Policies 2, 3, and 6.',
      'Interacts politically with Policy 7’s foreign-resident CGT concession for renewables.',
    ],
    components: [
      { id: 'voter', label: 'Voter need: affordable housing + tax fairness', x: 0.97, y: 0.97 },
      { id: 'ng-restriction', label: 'Negative gearing restriction', x: 0.55, y: 0.78, stage: 'established', movement: 'build' },
      { id: 'cgt-mintax', label: 'CGT 30% minimum tax + indexation', x: 0.35, y: 0.78, stage: 'emerging', movement: 'build' },
      { id: 'home-exempt', label: 'Family home exemption', x: 0.92, y: 0.7, stage: 'settled' },
      { id: 'grandfathering', label: 'Grandfathering rules', x: 0.4, y: 0.55, stage: 'emerging' },
      { id: 'newbuild-def', label: 'New-build definition', x: 0.2, y: 0.55, stage: 'experimental' },
      { id: 'loss-quarantine', label: 'Loss quarantining + carry-forward', x: 0.5, y: 0.55, stage: 'emerging' },
      { id: 'btr-carveout', label: 'BTR / new-build / SMSF carve-outs', x: 0.55, y: 0.55, stage: 'emerging' },
      { id: 'small-business-startup-carveout', label: 'Small-business / startup CGT carve-outs', x: 0.25, y: 0.48, stage: 'experimental', movement: 'build' },
      { id: 'treasury-model', label: 'Treasury revenue model', x: 0.45, y: 0.3, stage: 'emerging', sharedGroup: 'treasury-model' },
      { id: 'inflation-index', label: 'Inflation index (cost-base)', x: 0.92, y: 0.2, stage: 'settled' },
      { id: 'ato-systems', label: 'ATO assessment systems', x: 0.88, y: 0.3, stage: 'settled', sharedGroup: 'ato' },
      { id: 'land-titles', label: 'State land titles registers', x: 0.9, y: 0.15, stage: 'settled' },
    ],
    edges: [
      { from: 'voter', to: 'ng-restriction' },
      { from: 'voter', to: 'cgt-mintax' },
      { from: 'voter', to: 'home-exempt' },
      { from: 'ng-restriction', to: 'grandfathering' },
      { from: 'ng-restriction', to: 'newbuild-def' },
      { from: 'ng-restriction', to: 'loss-quarantine' },
      { from: 'ng-restriction', to: 'btr-carveout' },
      { from: 'cgt-mintax', to: 'small-business-startup-carveout' },
      { from: 'cgt-mintax', to: 'grandfathering' },
      { from: 'cgt-mintax', to: 'inflation-index' },
      { from: 'cgt-mintax', to: 'treasury-model' },
      { from: 'treasury-model', to: 'ato-systems' },
      { from: 'loss-quarantine', to: 'ato-systems' },
      { from: 'ato-systems', to: 'land-titles' },
    ],
    citationKeys: ['budget-gov', 'abc-cgt-carveouts', 'grattan-budget', 'pbo-cgt', 'property-council', 'reia', 'greens-budget', 'newspoll', 'resolve'],
  },
  {
    id: 'div-296',
    number: 2,
    section: 'system',
    sectionPath: '/system',
    path: '/system/div-296',
    title: 'Superannuation Tax (Division 296)',
    anchorNeed: 'Super concessions should serve retirement, not estate planning.',
    summary:
      'Legislated. Royal Assent landed on 13 March 2026 and commencement is 1 July 2026. Two tiers apply: 30% on earnings attributable to balances above $3 million and 40% above $10 million. Thresholds are indexed, unrealised gains are excluded, and LISTO was boosted alongside the reform.',
    cardSummary: 'Retirement concessions are narrowed to curb tax-sheltered wealth transfer.',
    stakeholders:
      'SMSFA ended up largely satisfied after the unrealised-gains concession and farm concerns were defused. Industry Super and ASFA were supportive. Coalition opposed the bill and says it would revisit it if elected. Greens voted for the final version.',
    evidence:
      'Treasury forecasts about $2 billion a year in revenue. Around 80,000 people are affected initially, or roughly 0.5% of the population. SMSFA highlighted that 3,500 SMSFs holding primary-production land would have been caught under the original design, which was neutralised by the move to realised earnings.',
    sentiment:
      'Political salience fell sharply after the amendment excluding unrealised gains. Essential polling before passage still showed broad support for taxing balances above $3 million.',
    thresholds: [
      'A future government repealing the $10 million tier or freezing indexation.',
      'Pending APRA regulations on member-level earnings allocation.',
    ],
    pressurePoints: [
      'Shares ATO reporting infrastructure with Policies 1, 3, and 6.',
      'Shares the Treasury forecasting logic with Policies 1 and 6.',
      'Depends on member-level reporting that sits alongside broader tax administration reform.',
    ],
    components: [
      { id: 'voter', label: 'Voter need: super for retirement, not estates', x: 0.97, y: 0.97 },
      { id: 'div296', label: 'Two-tier Division 296 tax', x: 0.55, y: 0.78, stage: 'established', movement: 'build' },
      { id: 'listo', label: 'LISTO framework', x: 0.85, y: 0.72, stage: 'settled' },
      { id: 'conc-contrib', label: 'Concessional contributions framework', x: 0.92, y: 0.72, stage: 'settled' },
      { id: 'tsb-aggregation', label: 'TSB aggregation across funds', x: 0.65, y: 0.55, stage: 'established' },
      { id: 'higher-of', label: 'Higher-of start/end TSB measurement', x: 0.4, y: 0.55, stage: 'emerging' },
      { id: 'cost-base-reset', label: 'Cost-base reset election', x: 0.35, y: 0.55, stage: 'emerging' },
      { id: 'death-relief', label: 'Death-year relief', x: 0.4, y: 0.5, stage: 'emerging' },
      { id: 'apra-allocation', label: 'APRA fund earnings allocation', x: 0.45, y: 0.3, stage: 'emerging', movement: 'build', sharedGroup: 'treasury-model' },
      { id: 'actuarial-split', label: 'Actuarial member-split certification', x: 0.5, y: 0.25, stage: 'emerging' },
      { id: 'ato-reporting', label: 'ATO member-level reporting', x: 0.9, y: 0.3, stage: 'settled', sharedGroup: 'ato' },
      { id: 'smsf-audit', label: 'SMSF audit + annual return systems', x: 0.92, y: 0.2, stage: 'settled' },
    ],
    edges: [
      { from: 'voter', to: 'div296' },
      { from: 'voter', to: 'listo' },
      { from: 'voter', to: 'conc-contrib' },
      { from: 'div296', to: 'tsb-aggregation' },
      { from: 'div296', to: 'higher-of' },
      { from: 'div296', to: 'cost-base-reset' },
      { from: 'div296', to: 'death-relief' },
      { from: 'tsb-aggregation', to: 'apra-allocation' },
      { from: 'tsb-aggregation', to: 'ato-reporting' },
      { from: 'apra-allocation', to: 'actuarial-split' },
      { from: 'ato-reporting', to: 'smsf-audit' },
    ],
    citationKeys: ['budget-gov', 'div296-act', 'asfa-listo'],
  },
  {
    id: 'cost-of-living',
    number: 3,
    section: 'household',
    sectionPath: '/household',
    path: '/household/cost-of-living',
    title: 'Cost of Living & Monetary Nexus',
    anchorNeed: 'Make essentials affordable in 2026.',
    summary:
      'A mildly expansionary package landed into an RBA tightening cycle. The Working Australians Tax Offset, worth $250 a year for roughly 13.3 million workers, was deferred to 2027-28 to avoid stoking inflation. The PBS co-pay falls to $25, fuel excise is halved for three months from 1 April 2026, and bracket cuts move to 14% by 2027-28.',
    cardSummary: 'Relief is delivered carefully because inflation and interest rates still dominate the frame.',
    stakeholders:
      'ACOSS was critical because JobSeeker, DSP, and the Age Pension were untouched. The BCA welcomed productivity and regulatory measures but opposed the CGT changes. Governor Michele Bullock publicly flagged the demand effect before budget night. CBA Economics called the fiscal stance neutral-to-mildly expansionary. UBS tips the cash rate to 4.6% in August.',
    evidence:
      'Treasury forecasts CPI peaking at 5.0% annualised in Q2 2026 before falling to 3% in 2027-28. The RBA forecast peaks at 4.8%, while CBA estimated 4.7%. The cash rate is currently 4.35% after three hikes in 2026.',
    sentiment:
      'Focus groups say the most felt measures are the fuel excise cut, PBS $25 cap, and the 20% HECS change. The least recognised measure is the deferred WATO. Energy rebates appear to be yielding weaker political returns.',
    thresholds: [
      'An August RBA hike to 4.6% would move WATO from delivered relief to offset against higher mortgage costs.',
      'A material shift in Middle East conflict dynamics would alter the inflation path.',
    ],
    pressurePoints: [
      'Shares Services Australia delivery with Policy 11.',
      'Shares ATO PAYG infrastructure with Policies 1, 2, and 6 via the broader tax stack.',
      'Housing construction prices link this map back to Policy 4.',
    ],
    components: [
      { id: 'voter', label: 'Voter need: affordable essentials', x: 0.97, y: 0.97 },
      { id: 'wato', label: 'Working Australians Tax Offset (deferred)', x: 0.55, y: 0.78, stage: 'established', movement: 'buy' },
      { id: 'bracket-cuts', label: 'Income tax bracket cuts', x: 0.9, y: 0.72, stage: 'settled' },
      { id: 'bulk-billing', label: 'Bulk billing incentive', x: 0.62, y: 0.72, stage: 'established' },
      { id: 'pbs-cap', label: 'PBS $25 cap', x: 0.92, y: 0.65, stage: 'settled' },
      { id: 'fuel-excise', label: 'Fuel excise cut (temp)', x: 0.85, y: 0.65, stage: 'settled' },
      { id: 'energy-rebate', label: 'Energy bill rebate', x: 0.8, y: 0.7, stage: 'settled' },
      { id: 'offset-design', label: 'Targeted offset design', x: 0.4, y: 0.55, stage: 'emerging' },
      { id: 'medicare-pbs', label: 'Medicare + PBS schedules', x: 0.92, y: 0.45, stage: 'settled' },
      { id: 'fuel-reserve', label: 'Australian Fuel Security Reserve', x: 0.1, y: 0.4, stage: 'experimental', movement: 'build' },
      { id: 'ato-payg', label: 'ATO PAYG systems', x: 0.92, y: 0.25, stage: 'settled', sharedGroup: 'ato' },
      { id: 'services-au', label: 'Services Australia', x: 0.92, y: 0.2, stage: 'settled', sharedGroup: 'services-au' },
      { id: 'rba-framework', label: 'RBA monetary framework', x: 0.95, y: 0.1, stage: 'settled' },
    ],
    edges: [
      { from: 'voter', to: 'wato' },
      { from: 'voter', to: 'bracket-cuts' },
      { from: 'voter', to: 'bulk-billing' },
      { from: 'voter', to: 'pbs-cap' },
      { from: 'voter', to: 'fuel-excise' },
      { from: 'voter', to: 'energy-rebate' },
      { from: 'wato', to: 'offset-design' },
      { from: 'wato', to: 'ato-payg' },
      { from: 'bulk-billing', to: 'medicare-pbs' },
      { from: 'pbs-cap', to: 'medicare-pbs' },
      { from: 'fuel-excise', to: 'fuel-reserve' },
      { from: 'energy-rebate', to: 'services-au' },
      { from: 'ato-payg', to: 'rba-framework', kind: 'flow' },
    ],
    citationKeys: ['budget-gov', 'acoss-budget', 'cba-budget'],
  },
  {
    id: 'housing',
    number: 4,
    section: 'household',
    sectionPath: '/household',
    path: '/household/housing',
    title: 'Housing Supply & First Home Buyers',
    anchorNeed: 'Affordable home, owned or rented, within 30 minutes of where I work.',
    summary:
      'The package combines near-term political signals with slower supply bets. A $2 billion Local Infrastructure Fund aims to unlock around 65,000 homes. The foreign investor ban on established homes is extended to June 2029, Help to Buy expands to 40,000 capped places, and a $10 billion 100,000-home first-home-buyer program is positioned for 2028 onward. The Housing Accord target of 1.2 million homes is slipping to June 2030.',
    cardSummary: 'Housing politics combines delivery bottlenecks, approvals, and symbolic first-home-buyer support.',
    stakeholders:
      'Property Council gave a cautious welcome. REIA was hostile. Master Builders and HIA warned about trade shortages. Greens want rent caps plus a bigger social-housing build. NSW and Victoria are broadly supportive; Queensland under the LNP is more sceptical.',
    evidence:
      'The National Housing Supply and Affordability Council says the 1.2 million target is slipping by about 12 months. e61 argues supply effects on prices are modest in the short term. Help to Buy uptake was only 2,300 places in the first roughly five months against a 40,000 four-year cap.',
    sentiment:
      'The same Newspoll found 60% saying housing measures were heading in the wrong direction or making no difference. Inner-city renter support for rent caps remains strong, which helps the Greens in campaign terms.',
    thresholds: [
      'Trades workforce supply remains the binding constraint, and Policy 5 could move it materially.',
      'If state-federal approval moves in NSW and Victoria do not replicate in Queensland and Western Australia, the supply target slips further.',
    ],
    pressurePoints: [
      'Depends on Policy 5’s points-test rewrite for trades workforce.',
      'Depends on Policy 13’s state-federal planning approvals and bilaterals.',
      'Affects Policy 3’s CPI path via construction prices and rents.',
    ],
    components: [
      { id: 'voter', label: 'Voter need: affordable home near work', x: 0.97, y: 0.97 },
      { id: 'help-to-buy', label: 'Help to Buy shared equity', x: 0.6, y: 0.78, stage: 'established' },
      { id: 'fhb-100k', label: '100,000-home FHB program', x: 0.3, y: 0.78, stage: 'emerging', movement: 'build' },
      { id: 'fhg', label: 'First Home Guarantee (5% deposit)', x: 0.85, y: 0.72, stage: 'settled' },
      { id: 'foreign-ban', label: 'Foreign investor ban (established)', x: 0.9, y: 0.7, stage: 'settled' },
      { id: 'local-infra', label: '$2bn Local Infrastructure Fund', x: 0.45, y: 0.65, stage: 'emerging', movement: 'build' },
      { id: 'btr-tax', label: 'BTR tax concessions', x: 0.6, y: 0.62, stage: 'established' },
      { id: 'accord-targets', label: 'Housing Accord 1.2m targets', x: 0.4, y: 0.5, stage: 'emerging' },
      { id: 'mmc', label: 'Modern methods of construction', x: 0.3, y: 0.45, stage: 'emerging' },
      { id: 'apprenticeship', label: 'Trades apprenticeship stream', x: 0.25, y: 0.45, stage: 'emerging' },
      { id: 'state-bilateral', label: 'State-Federal bilateral approvals', x: 0.55, y: 0.4, stage: 'established', sharedGroup: 'state-bilateral' },
      { id: 'housing-australia', label: 'Housing Australia delivery vehicle', x: 0.65, y: 0.35, stage: 'established' },
      { id: 'nhsac', label: 'National Housing Supply Council', x: 0.8, y: 0.25, stage: 'settled' },
      { id: 'state-planning', label: 'State planning systems', x: 0.75, y: 0.15, stage: 'settled', sharedGroup: 'state-planning' },
      { id: 'trades-supply', label: 'Trades workforce supply', x: 0.85, y: 0.1, stage: 'settled', sharedGroup: 'trades' },
    ],
    edges: [
      { from: 'voter', to: 'help-to-buy' },
      { from: 'voter', to: 'fhb-100k' },
      { from: 'voter', to: 'fhg' },
      { from: 'voter', to: 'foreign-ban' },
      { from: 'help-to-buy', to: 'housing-australia' },
      { from: 'fhb-100k', to: 'housing-australia' },
      { from: 'housing-australia', to: 'accord-targets' },
      { from: 'housing-australia', to: 'btr-tax' },
      { from: 'local-infra', to: 'state-planning' },
      { from: 'state-bilateral', to: 'state-planning' },
      { from: 'accord-targets', to: 'mmc' },
      { from: 'accord-targets', to: 'apprenticeship' },
      { from: 'apprenticeship', to: 'trades-supply' },
      { from: 'accord-targets', to: 'nhsac' },
    ],
    citationKeys: ['budget-gov', 'property-council', 'reia', 'ahuri', 'newspoll'],
  },
  {
    id: 'migration',
    number: 5,
    section: 'external',
    sectionPath: '/external',
    path: '/external/migration',
    title: 'Immigration & Population Policy',
    anchorNeed: 'Migration that builds Australia without overloading housing and services.',
    summary:
      'The permanent program stays at 185,000 for a third year, with 70% onshore prioritisation. A points-test rewrite consultation opens in June 2026. Net overseas migration is forecast to fall from 295,000 in 2025-26 to 245,000 in 2026-27 and then stabilise at 225,000. International student commencements are capped through a national planning level of 295,000 for 2026.',
    cardSummary: 'Population pressure is moderated, but labour-market and housing trade-offs remain unresolved.',
    stakeholders:
      'Coalition wants deeper cuts but faces internal Liberal concern over labour shortages. One Nation is pushing harder and has surged partly on migration messaging. BCA and Ai Group support skills fast-tracking but worry about overall shortages. Universities Australia is alarmed by integrity tightening. ACTU supports stronger migrant worker protections.',
    evidence:
      'Budget Paper No. 1 shows net overseas migration down about 45% from the 2022-23 peak of 538,340. e61 and the Productivity Commission estimate net migration adds 0.5 to 1.0 percentage points to annual housing-demand growth. CBA says easing population growth subtracts 0.8 percentage points from its 2027 house-price forecast.',
    sentiment:
      'Essential polling through 2024-25 found about 60% wanting lower migration. Migration is the strongest driver of One Nation’s surge, with outer-suburban and renter cohorts showing the sharpest concern.',
    thresholds: [
      'The points-test rewrite is the highest-leverage experimental-stage uncertainty across the five maps.',
      'If the points test rewards in-demand construction trades, Policy 4 shifts materially.',
    ],
    pressurePoints: [
      'Points-test settings change Policy 4’s trades bottleneck materially.',
      'Character test and visa grounds overlap with Policy 9’s security settings.',
      'Skills fast-track links directly into Policy 6’s productivity and workforce narrative.',
    ],
    components: [
      { id: 'voter', label: 'Voter need: managed migration, no overload', x: 0.97, y: 0.97 },
      { id: 'perm-quota', label: 'Permanent program quota (185k)', x: 0.9, y: 0.78, stage: 'settled' },
      { id: 'onshore', label: 'Onshore migrant prioritisation', x: 0.4, y: 0.75, stage: 'emerging', movement: 'build' },
      { id: 'student-integrity', label: 'Student visa integrity', x: 0.6, y: 0.72, stage: 'established', movement: 'buy' },
      { id: 'skills-fast', label: 'Skills fast-track program', x: 0.65, y: 0.7, stage: 'established', sharedGroup: 'trades' },
      { id: 'points-test', label: 'Points test rewrite', x: 0.1, y: 0.55, stage: 'experimental', movement: 'build' },
      { id: 'npl-students', label: 'National Planning Level (students)', x: 0.45, y: 0.5, stage: 'emerging' },
      { id: 'tra-assessment', label: 'Skills assessment (TRA)', x: 0.65, y: 0.5, stage: 'established' },
      { id: 'char-test', label: 'Character test / Migration Act', x: 0.92, y: 0.45, stage: 'settled', sharedGroup: 'migration-act' },
      { id: 'home-affairs', label: 'Home Affairs case management', x: 0.85, y: 0.25, stage: 'settled' },
      { id: 'abf-systems', label: 'Australian Border Force systems', x: 0.85, y: 0.18, stage: 'settled' },
      { id: 'cricos', label: 'CRICOS accreditation', x: 0.9, y: 0.15, stage: 'settled' },
    ],
    edges: [
      { from: 'voter', to: 'perm-quota' },
      { from: 'voter', to: 'onshore' },
      { from: 'voter', to: 'student-integrity' },
      { from: 'voter', to: 'skills-fast' },
      { from: 'onshore', to: 'points-test' },
      { from: 'student-integrity', to: 'npl-students' },
      { from: 'skills-fast', to: 'tra-assessment' },
      { from: 'points-test', to: 'home-affairs' },
      { from: 'student-integrity', to: 'abf-systems' },
      { from: 'npl-students', to: 'cricos' },
      { from: 'tra-assessment', to: 'home-affairs' },
    ],
    citationKeys: ['budget-gov', 'cba-budget', 'bdo-migration'],
  },
  {
    id: 'productivity',
    number: 6,
    section: 'system',
    sectionPath: '/system',
    path: '/system/productivity',
    title: 'Productivity & Tax Architecture',
    anchorNeed: 'A tax and regulatory system that rewards productive investment and lifts living standards.',
    summary:
      'The other half of the tax narrative. R&D Tax Incentive reform from 1 July 2028, a permanent $20,000 instant asset write-off from 1 July 2026, two-year loss carry-back, startup loss refundability from 2028, VC threshold uplifts, a small-business/startup CGT carve-out track, $10.2 billion a year in regulatory reduction, a National Productivity Fund for state payroll tax harmonisation, 497 nuisance tariffs abolished, and $654.3 million for Digital ID expansion.',
    cardSummary: 'Low-salience but high-leverage reforms aimed at firm investment, compliance, and state coordination.',
    stakeholders:
      'BCA strongly supports the package and explicitly thanked the government for not introducing a cashflow tax or gas export tax. Ai Group and the Alliance of Industry Associations are positive. KPMG, Ashurst, and BDO caution that the R&D reforms need careful drafting. Small business is pleased by the instant asset write-off and loss carry-back; medium businesses feel squeezed. Greens are hostile to the corporate-tax-cuts framing.',
    evidence:
      'Treasury models a long-run GDP lift of roughly $13 billion a year from successful state cooperation, $400 million a year in additional R&D from young firms, and $890 million a year in small-business cashflow improvement. Ambitious Australia Report recommendations underpin much of the package.',
    sentiment:
      'Low public salience. AFR editorially supportive, business-aligned mastheads positive, and broader mainstream coverage limited because the package reads as wonk reform rather than lived-cost politics.',
    thresholds: [
      'State cooperation on payroll tax harmonisation remains an experimental-stage promise.',
      'Treasury consultation on R&D reform may materially change implementation design.',
      'A future government could remove the loss carry-back regime.',
    ],
    pressurePoints: [
      'Shares Treasury revenue modelling with Policies 1 and 2.',
      'Shares ATO systems with Policies 1, 2, and 3.',
      'State revenue offices and harmonisation logic feed directly into Policy 13.',
    ],
    components: [
      { id: 'voter', label: 'Voter need: productive economy, lifting living standards', x: 0.97, y: 0.97 },
      { id: 'rd-reform', label: 'R&D Tax Incentive reform', x: 0.45, y: 0.78, stage: 'emerging', movement: 'build' },
      { id: 'asset-writeoff', label: 'Instant asset write-off ($20k permanent)', x: 0.9, y: 0.72, stage: 'settled' },
      { id: 'loss-carryback', label: 'Two-year loss carry-back', x: 0.55, y: 0.72, stage: 'established' },
      { id: 'loss-refund', label: 'Loss refundability for startups', x: 0.3, y: 0.7, stage: 'emerging', movement: 'build' },
      { id: 'vc-thresholds', label: 'VCLP/ESVCLP threshold uplift', x: 0.6, y: 0.65, stage: 'established' },
      { id: 'startup-cgt-carveout', label: 'Startup CGT carve-out consultation', x: 0.38, y: 0.64, stage: 'experimental', movement: 'build' },
      { id: 'red-tape', label: '$10.2bn/yr regulatory reduction', x: 0.6, y: 0.6, stage: 'established' },
      { id: 'payroll-harmonise', label: 'State payroll tax harmonisation', x: 0.15, y: 0.55, stage: 'experimental', movement: 'build', sharedGroup: 'state-revenue' },
      { id: 'tariff-abolish', label: '497 nuisance tariffs abolished', x: 0.92, y: 0.55, stage: 'settled' },
      { id: 'productivity-fund', label: 'National Productivity Fund', x: 0.4, y: 0.45, stage: 'emerging', sharedGroup: 'trades' },
      { id: 'digital-id', label: 'Digital ID expansion ($654.3m)', x: 0.55, y: 0.4, stage: 'established', movement: 'build' },
      { id: 'treasury-model', label: 'Treasury revenue model', x: 0.5, y: 0.3, stage: 'emerging', sharedGroup: 'treasury-model' },
      { id: 'ato-systems', label: 'ATO assessment & compliance', x: 0.9, y: 0.25, stage: 'settled', sharedGroup: 'ato' },
      { id: 'state-revenue', label: 'State revenue offices', x: 0.85, y: 0.15, stage: 'settled', sharedGroup: 'state-revenue' },
    ],
    edges: [
      { from: 'voter', to: 'rd-reform' },
      { from: 'voter', to: 'asset-writeoff' },
      { from: 'voter', to: 'loss-carryback' },
      { from: 'voter', to: 'loss-refund' },
      { from: 'voter', to: 'vc-thresholds' },
      { from: 'voter', to: 'startup-cgt-carveout' },
      { from: 'voter', to: 'red-tape' },
      { from: 'voter', to: 'tariff-abolish' },
      { from: 'rd-reform', to: 'treasury-model' },
      { from: 'rd-reform', to: 'ato-systems' },
      { from: 'asset-writeoff', to: 'ato-systems' },
      { from: 'loss-carryback', to: 'treasury-model' },
      { from: 'loss-refund', to: 'treasury-model' },
      { from: 'vc-thresholds', to: 'ato-systems' },
      { from: 'startup-cgt-carveout', to: 'ato-systems' },
      { from: 'red-tape', to: 'productivity-fund' },
      { from: 'red-tape', to: 'digital-id' },
      { from: 'payroll-harmonise', to: 'productivity-fund' },
      { from: 'payroll-harmonise', to: 'state-revenue' },
      { from: 'productivity-fund', to: 'state-revenue' },
      { from: 'digital-id', to: 'ato-systems' },
    ],
    citationKeys: ['budget-gov', 'abc-cgt-carveouts', 'cba-budget'],
  },
  {
    id: 'energy',
    number: 7,
    section: 'external',
    sectionPath: '/external',
    path: '/external/energy',
    title: 'Energy Transition & Fuel Security',
    anchorNeed:
      "Affordable, secure energy that supports Australia's industries and homes through global instability and the net-zero transition.",
    summary:
      'The energy story shifted hard after the Iran-linked oil shock. The package includes a $14.8 billion Fuel Resilience Package, an $11.9 billion National Fuel Security Plan, a $7.5 billion Fuel & Fertiliser Security Facility, a $3.2 billion Australian Fuel Security Reserve, cleaner fuels funding, Hydrogen Headstart Round 2, Capacity Investment Scheme support, a Domestic Gas Reservation Mechanism from 1 July 2027, and a time-limited foreign-resident CGT concession for renewable infrastructure.',
    cardSummary: 'Security, reserves, and intervention now sit alongside the energy transition rather than beneath it.',
    stakeholders:
      'Government frames the package as energy sovereignty and Future Made in Australia. Manufacturing-heavy users support gas reservation. Gas producers are negotiating implementation. ACTU welcomed fuel security measures as job-saving. Climate groups and conservation organisations argue the package leans too hard toward fossil support. Coalition backs security but attacks the wider climate framework.',
    evidence:
      'Government estimates that reaching the IEA’s full 90-day reserve obligation would cost roughly $20 billion over four years. Discovery Alert analysis suggests gas reservation may weaken upstream investment over a five-to-ten-year horizon. CIS Tender 3 delivered 4.13 GW capacity and about 15.37 GWh of battery storage.',
    sentiment:
      'Fuel and energy security are broadly popular after the Iran shock. Gas reservation polls well in manufacturing seats. The pause in additional renewable investment is a sleeper political vulnerability likely to be used by teal and climate-aligned campaigns.',
    thresholds: [
      'Gas reservation could be pushed above 20% under Greens pressure.',
      'Iran conflict resolution would materially change the fuel-security calculus.',
      'State election outcomes will affect the pace of the renewables transition and planning approvals.',
      'Accelerated EV uptake would alter the balance of the package.',
    ],
    pressurePoints: [
      'State planning approvals are shared with Policy 4 housing delivery.',
      'Foreign-resident CGT concessions sit awkwardly beside Policy 1’s domestic CGT tightening.',
      'Grid delivery shares the same trades bottleneck mapped in Policies 4, 5, and 6.',
    ],
    components: [
      { id: 'voter', label: 'Voter need: affordable secure energy', x: 0.97, y: 0.97 },
      { id: 'fuel-reserve', label: 'Australian Fuel Security Reserve ($3.2bn)', x: 0.2, y: 0.78, stage: 'experimental', movement: 'build' },
      { id: 'gas-reservation', label: 'Domestic Gas Reservation (20% from July 2027)', x: 0.15, y: 0.75, stage: 'experimental', movement: 'build' },
      { id: 'fuel-facility', label: 'Fuel & Fertiliser Security Facility ($7.5bn)', x: 0.3, y: 0.72, stage: 'emerging', movement: 'build' },
      { id: 'cleaner-fuels', label: 'Cleaner Fuels Program ($1.1bn)', x: 0.45, y: 0.65, stage: 'emerging' },
      { id: 'hydrogen', label: 'Hydrogen Headstart Round 2 ($1bn)', x: 0.35, y: 0.6, stage: 'emerging' },
      { id: 'cis', label: 'Capacity Investment Scheme', x: 0.55, y: 0.65, stage: 'established' },
      { id: 'renewable-cgt', label: 'Foreign-resident CGT concession (renewables)', x: 0.4, y: 0.55, stage: 'emerging' },
      { id: 'stockholding', label: 'Minimum Stockholding Obligation (50 days)', x: 0.65, y: 0.55, stage: 'established' },
      { id: 'safeguard-mech', label: 'Safeguard Mechanism (carbon)', x: 0.7, y: 0.45, stage: 'established' },
      { id: 'gas-market-code', label: 'Gas Market Code', x: 0.75, y: 0.4, stage: 'established' },
      { id: 'aemo', label: 'AEMO / NEM operations', x: 0.9, y: 0.3, stage: 'settled' },
      { id: 'grid-infrastructure', label: 'Transmission grid infrastructure', x: 0.8, y: 0.2, stage: 'settled', sharedGroup: 'trades' },
      { id: 'state-planning', label: 'State planning approvals', x: 0.75, y: 0.15, stage: 'settled', sharedGroup: 'state-planning' },
      { id: 'iea-treaty', label: 'IEA 90-day reserve obligation', x: 0.92, y: 0.1, stage: 'settled' },
    ],
    edges: [
      { from: 'voter', to: 'fuel-reserve' },
      { from: 'voter', to: 'gas-reservation' },
      { from: 'voter', to: 'fuel-facility' },
      { from: 'voter', to: 'cleaner-fuels' },
      { from: 'voter', to: 'hydrogen' },
      { from: 'voter', to: 'cis' },
      { from: 'voter', to: 'renewable-cgt' },
      { from: 'voter', to: 'stockholding' },
      { from: 'fuel-reserve', to: 'stockholding' },
      { from: 'fuel-reserve', to: 'iea-treaty' },
      { from: 'gas-reservation', to: 'gas-market-code' },
      { from: 'fuel-facility', to: 'cleaner-fuels' },
      { from: 'cis', to: 'grid-infrastructure' },
      { from: 'cis', to: 'aemo' },
      { from: 'hydrogen', to: 'grid-infrastructure' },
      { from: 'renewable-cgt', to: 'state-planning' },
      { from: 'safeguard-mech', to: 'aemo' },
      { from: 'gas-market-code', to: 'aemo' },
      { from: 'grid-infrastructure', to: 'state-planning' },
    ],
    citationKeys: ['budget-gov', 'cba-budget'],
  },
  {
    id: 'defence',
    number: 9,
    section: 'external',
    sectionPath: '/external',
    path: '/external/defence',
    title: 'Defence & National Security',
    anchorNeed: 'National security and sovereign capability in a more contested region.',
    summary:
      'AUKUS Pillar 1 and 2 continue, ABF receives supplementary funding, antisemitism and extremism programs are expanded, visa cancellation and refusal grounds tighten, and sovereign capability funding continues for shipbuilding and guided weapons. Defence Strategic Review implementation remains the organising frame.',
    cardSummary: 'Low day-to-day salience but analytically important because it shares workforce and migration dependencies.',
    stakeholders:
      'Bipartisan support remains strong on AUKUS, while Greens oppose it. Defence industry is supportive. Refugee and civil liberties groups criticise the migration-security overlap. Defence industry networks support the sovereign-capability emphasis, and BCA backs it for industrial-policy reasons.',
    evidence:
      'AUKUS Pillar 1’s first Virginia-class pathway still points to the early 2030s. Workforce build-out for the nuclear submarine program is ongoing, and the Defence Strategic Review remains the core strategic reference point.',
    sentiment:
      'Defence remains a low-ranked voter issue in a cost-of-living cycle. AUKUS support sits in the mid-50s to mid-60s, with little short-term political contest despite deep long-run implications.',
    thresholds: [
      'US domestic politics remain a delivery risk for AUKUS Pillar 1.',
      'Greens-Senate dynamics could affect Pillar 2 export-control legislation.',
      'Defence workforce build-out intersects with migration and productivity decisions outside Defence itself.',
    ],
    pressurePoints: [
      'Character test and visa grounds overlap directly with Policy 5 migration.',
      'Nuclear submarine workforce depends on migration and skills settings in Policies 5 and 6.',
      'Defence industrial capacity competes for the same trades supply mapped in Policy 4.',
    ],
    components: [
      { id: 'voter', label: 'Voter need: national security, sovereign capability', x: 0.97, y: 0.97 },
      { id: 'aukus-p1', label: 'AUKUS Pillar 1 (nuclear submarines)', x: 0.2, y: 0.78, stage: 'experimental', movement: 'build' },
      { id: 'aukus-p2', label: 'AUKUS Pillar 2 (advanced capabilities)', x: 0.3, y: 0.72, stage: 'emerging', movement: 'build' },
      { id: 'sovereign-cap', label: 'Sovereign capability (shipbuilding, guided weapons)', x: 0.4, y: 0.68, stage: 'emerging', movement: 'build' },
      { id: 'abf-supp', label: 'ABF $270m supplementary', x: 0.85, y: 0.65, stage: 'settled' },
      { id: 'antisemitism-fund', label: '$207.4m antisemitism/extremism program', x: 0.55, y: 0.62, stage: 'established' },
      { id: 'character-test', label: 'Expanded character test (Migration Act)', x: 0.85, y: 0.55, stage: 'settled', sharedGroup: 'migration-act' },
      { id: 'visa-grounds', label: 'Expanded visa refusal/cancellation', x: 0.65, y: 0.5, stage: 'established' },
      { id: 'nuclear-workforce', label: 'Nuclear submarine workforce', x: 0.15, y: 0.4, stage: 'experimental', movement: 'build', sharedGroup: 'trades' },
      { id: 'defence-industry', label: 'Defence industrial base', x: 0.55, y: 0.35, stage: 'established' },
      { id: 'dsr-framework', label: 'Defence Strategic Review framework', x: 0.7, y: 0.25, stage: 'established' },
      { id: 'migration-act', label: 'Migration Act 1958', x: 0.92, y: 0.2, stage: 'settled', sharedGroup: 'migration-act' },
      { id: 'us-alliance', label: 'US alliance infrastructure', x: 0.9, y: 0.15, stage: 'settled' },
      { id: 'international-treaties', label: 'International treaty obligations', x: 0.92, y: 0.1, stage: 'settled' },
    ],
    edges: [
      { from: 'voter', to: 'aukus-p1' },
      { from: 'voter', to: 'aukus-p2' },
      { from: 'voter', to: 'sovereign-cap' },
      { from: 'voter', to: 'abf-supp' },
      { from: 'voter', to: 'antisemitism-fund' },
      { from: 'voter', to: 'character-test' },
      { from: 'voter', to: 'visa-grounds' },
      { from: 'aukus-p1', to: 'nuclear-workforce' },
      { from: 'aukus-p1', to: 'us-alliance' },
      { from: 'aukus-p1', to: 'international-treaties' },
      { from: 'aukus-p2', to: 'defence-industry' },
      { from: 'aukus-p2', to: 'us-alliance' },
      { from: 'sovereign-cap', to: 'defence-industry' },
      { from: 'sovereign-cap', to: 'dsr-framework' },
      { from: 'character-test', to: 'migration-act' },
      { from: 'visa-grounds', to: 'migration-act' },
    ],
    citationKeys: ['budget-gov', 'bdo-migration'],
  },
  {
    id: 'ndis',
    number: 11,
    section: 'system',
    sectionPath: '/system',
    path: '/system/ndis',
    title: 'NDIS & Social Security',
    anchorNeed: "Disability and income support that's adequate, sustainable, and reaches the people who need it.",
    summary:
      'Major NDIS structural reforms led by a taskforce under former Treasury official Anthea Long are the largest single savings source in the budget. JobSeeker, DSP, and Age Pension rates are unchanged. Remote Area Allowance remains frozen. Medicare levy low-income thresholds are lifted. Foundational Supports for children with developmental concerns continue to be built out.',
    cardSummary: 'The budget saves structurally through the NDIS while freezing the parts of the safety net most advocates wanted lifted.',
    stakeholders:
      'ACOSS is the sharpest critic, calling the fourth ignored Economic Inclusion Advisory Committee recommendation a moral failure. BCA supports structural NDIS reform for sustainability reasons. Disability advocates are split: some fear tightening, some support clearer Foundational Supports. ACTU and anti-poverty groups continue pushing for adequacy increases.',
    evidence:
      'NDIS spending growth had become one of the fastest-growing areas of federal expenditure. The Long taskforce path was reported as delivering more than $20 billion in structural savings over the forward estimates. The EIAC again recommended lifting JobSeeker to 90% of the Age Pension rate and was ignored.',
    sentiment:
      'Broad public salience is low, but the disability and welfare policy communities are highly activated. ACOSS framing has not cut through widely, while talkback sentiment is more supportive of NDIS restraint than of income-support increases.',
    thresholds: [
      'NDIS reform pace depends on state cooperation for Foundational Supports.',
      'Future EIAC recommendations could make JobSeeker adequacy a sharper political issue.',
      'Election timing matters because welfare settings are likely to be re-politicised in a campaign.',
    ],
    pressurePoints: [
      'Shares Services Australia / Centrelink infrastructure with Policy 3.',
      'State disability services overlap directly with Policy 13 federal-state coordination.',
      'Rent assistance settings interact with Policy 4 housing affordability pressure.',
    ],
    components: [
      { id: 'voter', label: 'Voter need: adequate sustainable disability + income support', x: 0.97, y: 0.97 },
      { id: 'ndis-reform', label: 'NDIS structural reform (Long taskforce)', x: 0.3, y: 0.78, stage: 'emerging', movement: 'build' },
      { id: 'foundational-supports', label: 'Foundational Supports framework', x: 0.25, y: 0.7, stage: 'experimental', movement: 'build' },
      { id: 'jobseeker-rate', label: 'JobSeeker rate (frozen)', x: 0.8, y: 0.7, stage: 'settled' },
      { id: 'dsp-rate', label: 'DSP rate (frozen)', x: 0.85, y: 0.65, stage: 'settled' },
      { id: 'age-pension', label: 'Age Pension rate (indexed)', x: 0.92, y: 0.65, stage: 'settled' },
      { id: 'medicare-levy', label: 'Medicare levy thresholds', x: 0.85, y: 0.55, stage: 'settled' },
      { id: 'rent-assistance', label: 'Commonwealth Rent Assistance', x: 0.78, y: 0.5, stage: 'settled' },
      { id: 'eiac', label: 'Economic Inclusion Advisory Committee', x: 0.55, y: 0.45, stage: 'established' },
      { id: 'ndia', label: 'National Disability Insurance Agency', x: 0.5, y: 0.35, stage: 'emerging' },
      { id: 'state-disability', label: 'State-led disability services', x: 0.4, y: 0.3, stage: 'emerging' },
      { id: 'services-au', label: 'Services Australia / Centrelink', x: 0.92, y: 0.2, stage: 'settled', sharedGroup: 'services-au' },
      { id: 'state-health', label: 'State health systems', x: 0.85, y: 0.15, stage: 'settled', sharedGroup: 'state-health' },
    ],
    edges: [
      { from: 'voter', to: 'ndis-reform' },
      { from: 'voter', to: 'foundational-supports' },
      { from: 'voter', to: 'jobseeker-rate' },
      { from: 'voter', to: 'dsp-rate' },
      { from: 'voter', to: 'age-pension' },
      { from: 'voter', to: 'medicare-levy' },
      { from: 'voter', to: 'rent-assistance' },
      { from: 'ndis-reform', to: 'ndia' },
      { from: 'ndis-reform', to: 'eiac' },
      { from: 'foundational-supports', to: 'state-disability' },
      { from: 'foundational-supports', to: 'ndia' },
      { from: 'jobseeker-rate', to: 'services-au' },
      { from: 'dsp-rate', to: 'services-au' },
      { from: 'age-pension', to: 'services-au' },
      { from: 'medicare-levy', to: 'services-au' },
      { from: 'rent-assistance', to: 'services-au' },
      { from: 'state-disability', to: 'state-health' },
    ],
    citationKeys: ['budget-gov', 'acoss-budget'],
  },
  {
    id: 'federal-state',
    number: 13,
    section: 'meta',
    sectionPath: '/federal-state',
    path: '/federal-state',
    title: 'Federal-State Financial Relations',
    anchorNeed: 'Coherent national delivery of services across nine state and territory jurisdictions.',
    summary:
      'Not a conventional policy area but a delivery layer under nearly every other map. GST distribution remains contested, hospital funding continues through the NHRA, housing bilaterals drive supply delivery, the National Skills Agreement and National Productivity Fund push cooperation, single-touch approvals aim to compress planning frictions, and Foundational Supports require state buy-in.',
    cardSummary: 'The common delivery substrate beneath tax, housing, migration, energy, and social policy.',
    stakeholders:
      'All state premiers and treasurers, the Council on Federal Financial Relations, the Commonwealth Grants Commission, Federal Treasury, state treasuries, and National Cabinet. State cooperation is uneven: NSW and Victoria are broadly constructive, Queensland is cooler, WA remains focused on funding speed and GST settings.',
    evidence:
      'GST distribution disputes continue around the WA top-up. Productivity Commission analysis suggests about a $13 billion annual GDP lift from successful state-cooperation reforms. States continue to argue the Commonwealth share of hospital funding is too low.',
    sentiment:
      'Low direct public salience, but high importance inside government. Federation friction becomes salient mostly when premiers and prime ministers openly disagree or when state elections change bargaining dynamics.',
    thresholds: [
      'The 2026 Victorian election could shift cooperation settings.',
      'Any GST distribution review reopens the core fiscal bargain.',
      'National Cabinet cadence and agenda discipline determine whether coordination is real or rhetorical.',
      'Federal election timing affects state leverage.',
    ],
    pressurePoints: [
      'This map is itself the shared delivery layer beneath Policies 4, 6, 7, and 11 most visibly.',
      'State planning, state revenue, and state health systems are all reused elsewhere.',
      'The matrix below surfaces which policy maps sit on the same institutional substrate.',
    ],
    components: [
      { id: 'voter', label: 'Voter need: coherent service delivery across federation', x: 0.97, y: 0.97 },
      { id: 'national-cabinet', label: 'National Cabinet', x: 0.55, y: 0.78, stage: 'established' },
      { id: 'nhra', label: 'National Health Reform Agreement', x: 0.65, y: 0.7, stage: 'established' },
      { id: 'housing-bilaterals', label: 'Housing Accord state bilaterals', x: 0.4, y: 0.68, stage: 'emerging', movement: 'build', sharedGroup: 'state-bilateral' },
      { id: 'skills-agreement', label: 'National Skills Agreement', x: 0.6, y: 0.65, stage: 'established' },
      { id: 'payroll-harmonise', label: 'Payroll tax harmonisation', x: 0.15, y: 0.6, stage: 'experimental', movement: 'build', sharedGroup: 'state-revenue' },
      { id: 'single-touch', label: 'Single-touch federal/state approvals', x: 0.25, y: 0.55, stage: 'experimental', movement: 'build' },
      { id: 'productivity-fund', label: 'National Productivity Fund', x: 0.4, y: 0.5, stage: 'emerging' },
      { id: 'foundational-supports', label: 'NDIS Foundational Supports', x: 0.2, y: 0.45, stage: 'experimental', movement: 'build' },
      { id: 'cffr', label: 'Council on Federal Financial Relations', x: 0.7, y: 0.4, stage: 'established' },
      { id: 'gst-distribution', label: 'GST distribution (CGC)', x: 0.85, y: 0.3, stage: 'settled' },
      { id: 'state-planning', label: 'State planning systems', x: 0.75, y: 0.25, stage: 'settled', sharedGroup: 'state-planning' },
      { id: 'state-revenue', label: 'State revenue offices', x: 0.85, y: 0.2, stage: 'settled', sharedGroup: 'state-revenue' },
      { id: 'state-health', label: 'State health systems', x: 0.8, y: 0.15, stage: 'settled', sharedGroup: 'state-health' },
      { id: 'state-education', label: 'State education systems', x: 0.85, y: 0.1, stage: 'settled' },
    ],
    edges: [
      { from: 'voter', to: 'national-cabinet' },
      { from: 'national-cabinet', to: 'nhra' },
      { from: 'national-cabinet', to: 'housing-bilaterals' },
      { from: 'national-cabinet', to: 'skills-agreement' },
      { from: 'national-cabinet', to: 'cffr' },
      { from: 'housing-bilaterals', to: 'productivity-fund' },
      { from: 'housing-bilaterals', to: 'single-touch' },
      { from: 'payroll-harmonise', to: 'productivity-fund' },
      { from: 'payroll-harmonise', to: 'cffr' },
      { from: 'single-touch', to: 'state-planning' },
      { from: 'foundational-supports', to: 'state-health' },
      { from: 'cffr', to: 'gst-distribution' },
      { from: 'gst-distribution', to: 'state-revenue' },
      { from: 'nhra', to: 'state-health' },
      { from: 'skills-agreement', to: 'state-education' },
    ],
    citationKeys: ['budget-gov', 'ahuri', 'cba-budget'],
  },
] satisfies Omit<Policy, 'citations'>[]

export const policies: Policy[] = rawPolicies.map((policy) => {
  const enriched = withComparison({
    ...policy,
    citations: [],
  })
  return {
    ...enriched,
    citations: buildCitations(enriched.citationKeys),
  }
})

export const policyById = Object.fromEntries(policies.map((policy) => [policy.id, policy])) as Record<
  PolicyId,
  Policy
>

export const policiesBySection = {
  household: policies.filter((policy) => policy.section === 'household'),
  system: policies.filter((policy) => policy.section === 'system'),
  external: policies.filter((policy) => policy.section === 'external'),
}

export const sharedGroups: SharedGroup[] = [
  {
    id: 'ato',
    label: 'Shared tax administration',
    rowsLabel: 'ATO assessment systems',
    references: [
      { policyId: 'cgt-ng', componentId: 'ato-systems', label: 'Policy 1 · ATO assessment systems' },
      { policyId: 'div-296', componentId: 'ato-reporting', label: 'Policy 2 · ATO member reporting' },
      { policyId: 'cost-of-living', componentId: 'ato-payg', label: 'Policy 3 · ATO PAYG systems' },
      { policyId: 'productivity', componentId: 'ato-systems', label: 'Policy 6 · ATO assessment & compliance' },
    ],
  },
  {
    id: 'state-planning',
    label: 'State planning systems',
    rowsLabel: 'State planning systems',
    references: [
      { policyId: 'housing', componentId: 'state-planning', label: 'Policy 4 · State planning systems' },
      { policyId: 'energy', componentId: 'state-planning', label: 'Policy 7 · State planning approvals' },
      { policyId: 'federal-state', componentId: 'state-planning', label: 'Policy 13 · State planning systems' },
    ],
  },
  {
    id: 'trades',
    label: 'Trades workforce supply',
    rowsLabel: 'Trades workforce supply',
    references: [
      { policyId: 'housing', componentId: 'trades-supply', label: 'Policy 4 · Trades workforce supply' },
      { policyId: 'migration', componentId: 'skills-fast', label: 'Policy 5 · Skills fast-track program' },
      { policyId: 'productivity', componentId: 'productivity-fund', label: 'Policy 6 · Productivity fund and training incentives' },
      { policyId: 'energy', componentId: 'grid-infrastructure', label: 'Policy 7 · Grid infrastructure delivery' },
      { policyId: 'defence', componentId: 'nuclear-workforce', label: 'Policy 9 · Nuclear submarine workforce' },
    ],
  },
  {
    id: 'services-au',
    label: 'Payments and transfer delivery',
    rowsLabel: 'Services Australia',
    references: [
      { policyId: 'cost-of-living', componentId: 'services-au', label: 'Policy 3 · Services Australia' },
      { policyId: 'ndis', componentId: 'services-au', label: 'Policy 11 · Services Australia / Centrelink' },
    ],
  },
  {
    id: 'treasury-model',
    label: 'Treasury forecasting engine',
    rowsLabel: 'Treasury revenue model',
    references: [
      { policyId: 'cgt-ng', componentId: 'treasury-model', label: 'Policy 1 · Treasury revenue model' },
      { policyId: 'div-296', componentId: 'apra-allocation', label: 'Policy 2 · Treasury-linked super allocation logic' },
      { policyId: 'productivity', componentId: 'treasury-model', label: 'Policy 6 · Treasury revenue model' },
    ],
  },
  {
    id: 'state-bilateral',
    label: 'State-federal bilateral agreements',
    rowsLabel: 'State-federal bilateral agreements',
    references: [
      { policyId: 'housing', componentId: 'state-bilateral', label: 'Policy 4 · Housing bilaterals' },
      { policyId: 'federal-state', componentId: 'housing-bilaterals', label: 'Policy 13 · Housing Accord bilaterals' },
    ],
  },
  {
    id: 'state-revenue',
    label: 'State revenue offices',
    rowsLabel: 'State revenue offices',
    references: [
      { policyId: 'productivity', componentId: 'state-revenue', label: 'Policy 6 · State revenue offices' },
      { policyId: 'federal-state', componentId: 'state-revenue', label: 'Policy 13 · State revenue offices' },
    ],
  },
  {
    id: 'state-health',
    label: 'State health systems',
    rowsLabel: 'State health systems',
    references: [
      { policyId: 'ndis', componentId: 'state-health', label: 'Policy 11 · State health systems' },
      { policyId: 'federal-state', componentId: 'state-health', label: 'Policy 13 · State health systems' },
    ],
  },
  {
    id: 'migration-act',
    label: 'Migration Act security infrastructure',
    rowsLabel: 'Migration Act 1958',
    references: [
      { policyId: 'migration', componentId: 'char-test', label: 'Policy 5 · Character test' },
      { policyId: 'defence', componentId: 'migration-act', label: 'Policy 9 · Migration Act 1958' },
    ],
  },
]

export const sharedGroupById = Object.fromEntries(
  sharedGroups.map((group) => [group.id, group]),
) as Record<SharedGroupId, SharedGroup>

export const sectionRoutes = new Set([
  '/',
  '/household',
  '/system',
  '/external',
  '/federal-state',
  ...policies.map((policy) => policy.path),
])

export const aboutContext = {
  designCoherence:
    'Treasury packaged the reforms as a rebalancing story: a system that had become more generous to assets than labour. This expanded version makes the same claim across household pressure, institutional rewiring, external shocks, and the federal-state delivery layer beneath them.',
  fiscalStance:
    'The broader budget stance is mildly expansionary inside an RBA tightening cycle. The cash rate sits at 4.35%, and UBS has flagged a possible August move to 4.6%.',
  pollingShock:
    'Newspoll in May 2026 rated this the worst budget for the economy since Labor’s 1993 post-election budget. Fifty-two percent expect to be worse off. Labor’s primary held at 31%, but anger is leaking to One Nation rather than the Coalition.',
  senateDynamics:
    'Only Division 296 is fully legislated. Many other reforms still require Greens or Coalition support. Greens called the package tinkering and may trade support for renter protections and more social housing. The Coalition opposes most of the contested reform agenda.',
  personnelNotes:
    'Larissa Waters leads the Greens, Barbara Pocock handles housing, Angus Taylor is Opposition Leader, Ted O’Brien is Shadow Treasurer, Jacob Caine leads REIA, Brendan Coates moved from Grattan to Treasury in April 2026, and Aruna Sathanapally is the lead Grattan voice.',
}

export const metaHeader =
  'Every policy in this Budget ultimately runs through the same set of state, federal, and joint institutions. This view surfaces those shared dependencies.'

export const matrixColumns: PolicyId[] = [
  'cgt-ng',
  'div-296',
  'cost-of-living',
  'housing',
  'migration',
  'productivity',
  'energy',
  'defence',
  'ndis',
]

export const matrixRows = [
  { label: 'ATO assessment systems', groupId: 'ato' as const, policies: ['cgt-ng', 'div-296', 'cost-of-living', 'productivity'] as PolicyId[] },
  { label: 'Services Australia', groupId: 'services-au' as const, policies: ['cost-of-living', 'ndis'] as PolicyId[] },
  { label: 'State planning systems', groupId: 'state-planning' as const, policies: ['housing', 'energy'] as PolicyId[] },
  { label: 'Trades workforce supply', groupId: 'trades' as const, policies: ['housing', 'migration', 'productivity', 'energy', 'defence'] as PolicyId[] },
  { label: 'Treasury revenue model', groupId: 'treasury-model' as const, policies: ['cgt-ng', 'div-296', 'productivity'] as PolicyId[] },
  { label: 'State revenue offices', groupId: 'state-revenue' as const, policies: ['productivity'] as PolicyId[] },
  { label: 'State health systems', groupId: 'state-health' as const, policies: ['cost-of-living', 'ndis'] as PolicyId[] },
  { label: 'Migration Act 1958', groupId: 'migration-act' as const, policies: ['migration', 'defence'] as PolicyId[] },
]

export function mostExperimentalComponent(policy: Policy) {
  const rank: Record<Stage, number> = {
    experimental: 0,
    emerging: 1,
    established: 2,
    settled: 3,
  }
  return [...policy.components]
    .filter((component): component is WardleyComponent & { stage: Stage } => Boolean(component.stage))
    .sort((a, b) => rank[a.stage] - rank[b.stage])[0]
}
