# Budget 2026 Wardley Map

An interactive Wardley-map explorer for Australia's 2026 federal budget debate.

Live:
- https://budget-2026-wardley-map.setiyaputra.me/
- https://budget-2026-wardley-map.setiyaputra.me/federal-state

Repository:
- https://github.com/suryast/budget-2026-wardley-map

## What this project does

This project maps budget measures as systems rather than headlines.

Each map starts from a voter-facing need, moves through visible policy commitments, and then drops into the delivery machinery underneath: Treasury models, ATO systems, state planning, health systems, migration settings, intergovernmental agreements, and other shared infrastructure.

The core idea is simple: a budget promise is only as real as the institutions that can carry it.

## Why Wardley maps here

Wardley maps are a good fit for budget analysis because they force two questions at the same time:

- What is visible to the voter?
- What hidden components actually determine whether the promise lands?

That framing matters for Budget 2026. A lot of the political fight happens at the level of tax, housing, cost of living, migration, and energy. A lot of the implementation risk sits somewhere else entirely: in legislation, administrative systems, state cooperation, and institutional bottlenecks.

This repo tries to make that gap visible.

## What's inside

The app has:

- 3 section routes: `household`, `system`, and `external`
- 9 policy maps across those sections
- 1 federal-state meta map at `/federal-state`
- 4 views for each mapped policy: `base`, `delta`, `compare`, and `factcheck`

The current numbered policy set is:

- Policy 1: CGT & Negative Gearing Reform
- Policy 2: Division 296 Superannuation Tax
- Policy 3: Cost of Living Relief
- Policy 4: Housing Supply and Delivery
- Policy 5: Migration Settings
- Policy 6: Productivity and Business Reform
- Policy 7: Energy and Industry
- Policy 9: Defence and Strategic Capacity
- Policy 11: NDIS and Foundational Supports
- Policy 13: Federal-State Financial Relations

The numbering reflects the editorial framing inside the project, not an attempt to cover every budget line item.

## How to read the app

There are two layers to the app.

The first layer is route-based navigation. You can enter through a broad section such as `/household` or jump straight into a specific policy route such as `/household/cgt-ng`.

The second layer is view mode:

- `Base map` shows the main Wardley map for that policy
- `Political Delta` shows what changes under Coalition positions
- `Side-by-Side` shows Labor and Coalition framing next to each other
- `Fact-Check` narrows the surface to claims that can actually be checked

The `/federal-state` route is different. It is not a normal policy page. It acts as a shared-substrate view across the rest of the app, showing how different budget promises depend on the same intergovernmental machinery.

## Structure

The project is deliberately data-heavy. Most of the editorial logic lives in typed data files rather than being scattered through components.

### App shell

- `src/App.tsx`
  Routing, route parsing, view switching, landing pages, and page composition.

### Core policy data

- `src/data/policies.ts`
  The main source of truth for sections, policy routes, card summaries, component positions, edges, shared infrastructure groups, and the federal-state matrix.

- `src/data/comparison.ts`
  Coalition/Labor comparison data, inference notes, and fact-check entries.

- `src/data/citations.ts`
  Citation library referenced by the policy and comparison layers.

### Rendering components

- `src/components/WardleyMap.tsx`
  SVG map rendering and component interaction.

- `src/components/PolicySidePanel.tsx`
  The explanatory side panel tied to the selected component.

- `src/components/ComparisonViews.tsx`
  Delta, side-by-side, and fact-check rendering.

- `src/components/AboutPanel.tsx`
  Editorial context for the landing experience.

- `src/components/CitationFootnotes.tsx`
  Source display for each map.

## Data model

Each policy is built from the same underlying pieces:

- an anchor need
- a summary
- stakeholder framing
- evidence notes
- sentiment notes
- threshold conditions
- pressure points
- components
- edges
- citations

Each component is positioned on the Wardley canvas using `x` and `y` coordinates. Components can also carry:

- `stage`
- `movement`
- `sharedGroup`
- `note`

That means the same dataset can drive:

- the base Wardley map
- the federal-state shared-infrastructure matrix
- the side panel
- the compare view
- the fact-check view

## Editorial approach

This is not a neutral encyclopedia of the budget.

It is an argument about policy implementation:

- visible commitments matter
- delivery dependencies matter just as much
- institutional reuse is a real analytical object
- political messaging and factual claims should not be collapsed into the same layer

The app separates those concerns on purpose. The compare view preserves party framing. The fact-check view only surfaces claims that can be tested. The federal-state map pulls attention away from campaign rhetoric and back onto delivery capacity.

## Local development

Requirements:

- Node.js
- pnpm

Install dependencies:

```bash
pnpm install
```

Start the dev server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Run linting:

```bash
pnpm lint
```

Preview the production build locally:

```bash
pnpm preview
```

## How to add or edit a policy map

If you want to extend the app, start with the data layer.

### Add a new policy

1. Add the policy entry in `src/data/policies.ts`
2. Give it a route, section, summary, components, edges, and citation keys
3. Add comparison and fact-check material in `src/data/comparison.ts` if needed
4. Add any new references to `src/data/citations.ts`
5. Build and inspect the route in the browser

### Update a component

Edit the relevant policy's `components` array in `src/data/policies.ts`.

Typical changes:

- move a component by adjusting `x` and `y`
- change `stage`
- attach a `sharedGroup`
- rewrite a label or note

### Update the shared substrate view

The federal-state meta map and the shared matrix pull from:

- the `federal-state` policy entry
- `matrixColumns`
- `matrixRows`
- `sharedGroupById`

If a new policy depends on a reused institutional component, wire that relationship there as well.

## Route conventions

The app uses clean path-based state:

- `/changes` for the cross-policy change scorecard
- `/<section>` for section landing pages
- `/<section>/<policy>` for policy pages
- `/<section>/<policy>/delta` for political delta
- `/<section>/<policy>/compare` for side-by-side comparison
- `/<section>/<policy>/factcheck` for fact-check mode
- `/federal-state` for the federation meta map

Focus state is encoded through the `focus` query parameter so a specific component can be deep-linked.

## Design notes

The visual system is intentionally loud.

This is not a minimalist policy dashboard. It uses bold color blocks, compressed headings, visible borders, and editorial labels to feel closer to a printed political briefing than a generic SaaS analytics screen.

The goal is not decorative novelty. The goal is to make policy navigation feel deliberate and memorable.

## Deployment

The site is deployed on Cloudflare Pages with the custom domain:

- `budget-2026-wardley-map.setiyaputra.me`

The build output is generated from Vite in `dist/`.

## Notes on scope

This project is about analytical framing, not live parliamentary tracking.

It does not try to be:

- a complete budget database
- a legislative status tracker
- a macroeconomic forecasting engine
- a neutral campaign explainer for every claim in circulation

It is narrower than that. It asks which promises matter, what systems sit underneath them, and where the real delivery constraints are likely to bite.

## License

No license file is currently included in this repository. Treat the contents as all rights reserved unless that changes.
