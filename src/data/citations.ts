export type CitationKey =
  | 'budget-gov'
  | 'grattan-budget'
  | 'pbo-cgt'
  | 'acoss-budget'
  | 'property-council'
  | 'reia'
  | 'greens-budget'
  | 'cba-budget'
  | 'newspoll'
  | 'resolve'
  | 'div296-act'
  | 'asfa-listo'
  | 'ahuri'
  | 'bdo-migration'
  | 'coalition-budget-reply-hansard'
  | 'guardian-budget-reply'
  | 'abc-housing-cap'
  | 'abc-values-plan'
  | 'grattan-welfare-citizenship'
  | 'smsf-div296-article'

export type Citation = {
  key: CitationKey
  source: string
  url?: string
  note?: string
}

export const citationLibrary: Record<CitationKey, Citation> = {
  'budget-gov': {
    key: 'budget-gov',
    source: 'Treasury, Budget 2026–27 papers',
    url: 'https://budget.gov.au',
  },
  'grattan-budget': {
    key: 'grattan-budget',
    source: `Grattan Institute, "The budget we've been waiting for" (Sathanapally, 13 May 2026)`,
    url: 'https://grattan.edu.au/news/the-budget-weve-been-waiting-for/',
  },
  'pbo-cgt': {
    key: 'pbo-cgt',
    source: 'PBO Senate Select Committee analysis, 5 Feb 2026',
  },
  'acoss-budget': {
    key: 'acoss-budget',
    source: 'ACOSS budget response (Goldie)',
    url: 'https://www.echo.net.au/2026/05/acoss-responds-to-federal-budget/',
  },
  'property-council': {
    key: 'property-council',
    source: 'Property Council media release (Zorbas)',
    url: 'https://www.propertycouncil.com.au/media-releases/jury-out-on-budget-tax-hikes-boosting-new-home-supply-must-be-the-big-picture',
  },
  reia: {
    key: 'reia',
    source: 'REIA media release (Caine)',
    url: 'https://www.reia.com.au/industry-news/Media-Release-Budget-2026-27',
  },
  'greens-budget': {
    key: 'greens-budget',
    source: 'Australian Greens budget response (Waters, McKim, Pocock)',
    url: 'https://greens.org.au/news/media-release/labors-budget-backs-corporate-profits-1-over-people',
  },
  'cba-budget': {
    key: 'cba-budget',
    source: 'CBA Economics, "Big ambitions, mixed results" (Yeaman/Allen/Clarke)',
    url: 'https://www.commbank.com.au/articles/newsroom/2026/05/2026-federal-budget-analysis-australian-economy.html',
  },
  newspoll: {
    key: 'newspoll',
    source: 'Newspoll post-budget, week of 18 May 2026 (as reported by The Australian)',
  },
  resolve: {
    key: 'resolve',
    source: 'Resolve Strategic / SMH-Age post-budget poll',
  },
  'div296-act': {
    key: 'div296-act',
    source: 'Treasury Laws Amendment (Building a Stronger and Fairer Super System) Act 2026; Royal Assent 13 March 2026',
    url: 'https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/self-managed-super-funds-smsf/smsf-newsroom/better-targeted-super-concessions-is-law',
  },
  'asfa-listo': {
    key: 'asfa-listo',
    source: 'ASFA, LISTO + Division 296 explainer',
    url: 'https://www.superannuation.asn.au/understanding-the-listo-and-division-296-superannuation-tax-changes/',
  },
  ahuri: {
    key: 'ahuri',
    source: 'AHURI federal housing measures analysis',
    url: 'https://www.ahuri.edu.au/analysis/brief/federal-measures-tackle-australias-housing-challenges-explained',
  },
  'bdo-migration': {
    key: 'bdo-migration',
    source: 'BDO, "Migration Program 2026-27: A recalibrated system"',
    url: 'https://www.bdo.com.au/en-au/insights/migration-services/migration-program-2026-27-a-system-recalibrated-for-control-targeting-and-onshore-outcomes',
  },
  'coalition-budget-reply-hansard': {
    key: 'coalition-budget-reply-hansard',
    source: 'House of Representatives Hansard, Budget Reply speech by Angus Taylor, 14 May 2026',
    url: 'https://www.aph.gov.au/Parliamentary_Business/Hansard/Hansard_Display?bid=chamber%2Fhansardr%2F29156%2F&sid=0197',
  },
  'guardian-budget-reply': {
    key: 'guardian-budget-reply',
    source: 'The Guardian, Angus Taylor budget reply summary, 14 May 2026',
    url: 'https://www.theguardian.com/australia-news/2026/may/14/angus-taylor-budget-reply-coalition-plan-index-tax-brackets-inflation-resource-windfalls-fund',
  },
  'abc-housing-cap': {
    key: 'abc-housing-cap',
    source: 'ABC News, Coalition migration cap tied to housing construction, 14 May 2026',
    url: 'https://www.abc.net.au/news/2026-05-14/angus-taylor-ties-migration-cap-to-housing-budget-reply/106676622',
  },
  'abc-values-plan': {
    key: 'abc-values-plan',
    source: 'ABC News, Coalition Australian values migration plan, 14 April 2026',
    url: 'https://www.abc.net.au/news/2026-04-14/angus-taylor-coalition-migration-policy-plan-australian-values/106563718',
  },
  'grattan-welfare-citizenship': {
    key: 'grattan-welfare-citizenship',
    source: 'The Conversation quoting Grattan critique of Coalition welfare-citizenship restriction, 15 May 2026',
    url: 'https://theconversation.com/angus-taylors-budget-reply-offers-some-big-ideas-but-the-devil-will-be-in-the-detail-256295',
  },
  'smsf-div296-article': {
    key: 'smsf-div296-article',
    source: 'SMSF Adviser, Coalition vows to repeal Division 296, 23 Jan 2025',
    url: 'https://www.smsfadviser.com/news/24160-coalition-vows-to-repeal-div-296',
  },
}
