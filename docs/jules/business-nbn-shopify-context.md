# Business NBN Shopify Project Context

## Purpose

This repository supports the Shopify storefront design and implementation work for Remote Business Partner. It appears to contain theme files, Liquid sections, templates, snippets, JavaScript assets, and storefront UI patterns used to build and maintain customer-facing Shopify pages.

This context file exists to give Google Jules high-level project context before it works on future Business NBN fixes. It should help Jules understand what has already been built, which areas are fragile, and which pages, templates, and elements are relevant to the next implementation tasks.

The immediate Business NBN objective is to turn the existing landing-page and page-shell work into a complete, product-backed Business NBN signup experience inside Shopify.

## Business context

Remote Business Partner is building a Shopify-based Business NBN experience for business customers. The storefront needs to explain business internet options, let customers check or submit a business address for qualification, compare plan families, select a plan, provide business details, and move into a reviewed signup or order-intent process.

The Business NBN catalogue is expected to support three main product families:

1. **TotalBiz Business NBN**
   - Everyday business nbn style plans.
   - Speed-based plan variants.
   - Prices have previously been treated as GST-exclusive in Shopify because the Shopify store adds GST separately.

2. **ProBiz EA - Telstra Ethernet Access**
   - Enterprise-grade symmetrical fibre services over Telstra Ethernet Access.
   - Variants are based on speed, class of service, and contract term.

3. **ProBiz EE - nbn Enterprise Ethernet**
   - Enterprise-grade symmetrical fibre services over nbn Enterprise Ethernet.
   - Variants are based on speed, class of service, and contract term.

The intended commercial model discussed so far includes 24-month and month-to-month terms. Month-to-month pricing was calculated using a 25% loading over the 24-month Shopify price. Before activating products or checkout pathways, Jules should confirm the current task instructions, because earlier source material and sign-up mockups referenced 36-month-only flows. Do not hardcode a commercial term without checking the latest task prompt.

The Business NBN flow should avoid claiming confirmed serviceability until a live address validation and serviceability process exists. Temporary address-checking states must be worded carefully as preliminary, accepted for review, or subject to final confirmation.

## Application context

This repository appears to be a Shopify theme/design repository. The Business NBN work is centred around Shopify Online Store 2.0 theme assets and page templates.

Relevant Shopify pages include:

- `/pages/business-nbn`
- `/pages/business-nbn-plans`
- `/pages/business-nbn-support`
- `/pages/business-nbn-critical-information-summary`
- `/pages/business-nbn-sla`
- `/pages/business-nbn-terms`
- `/pages/business-nbn-privacy`
- `/pages/business-nbn-status`

Additional related legal or commercial pages may exist or need to be linked when finalised:

- `/pages/customer-terms-and-conditions`
- `/pages/business-nbn-totalbiz-service-schedule`
- `/pages/probiz-service-schedule`
- `/pages/totalbiz-critical-information-summary`
- `/pages/probiz-critical-information-summary`
- `/pages/pricing-and-fees-schedule`
- `/pages/acceptable-use-policy`

Important Business NBN theme files or expected areas include:

- `templates/page.business-nbn.json`
- `sections/rbp-business-nbn.liquid`
- `assets/rbp-business-nbn-checker.js`
- `snippets/rbp-nbn-faq-support.liquid`
- Any bridge/status/helper section referenced by the page template, such as an `rbp-bridge-status-helper` section if present.

The current implementation has included a polished Business NBN landing-page style with these UI elements:

- Hero section with Business NBN value proposition.
- Address checker panel.
- Plan cards.
- Connection status explanation panels.
- NBN technology explainer cards.
- Connection process timeline.
- FAQ accordion.
- Legal disclaimer.
- Final CTA band.

Important current implementation concerns:

- The `page.business-nbn` template may be shared by multiple Business NBN pages. If `sections/rbp-business-nbn.liquid` renders only the main landing page without checking the current page handle, then pages such as plans, support, SLA, terms, privacy, and status may accidentally render the same landing page instead of page-specific content.
- There have been two different address checker approaches: an external JavaScript asset and an inline script. Jules should consolidate this into one implementation and avoid mismatched element IDs.
- The external checker asset was designed around session storage keys such as `rbp_nbn_serviceability`, `rbp_nbn_address`, and `rbp_nbn_validation_mode`.
- The planned backend/app proxy path has been `/apps/rbp-bridge/api/check-address`.
- The current address checker should remain safe in temporary mode until live APIs are enabled.

Relevant Shopify data structures already discussed or expected:

- Product metafields under namespace `nbn`, including plan family, plan type, recommended plan, short description, feature summary, contract terms, and legal page references.
- Product variant metafields under namespace `nbn`, including plan ID, download speed, upload speed, ex-GST price, inc-GST price, setup fee, static IP inclusion, priority support, SLA uptime, technology eligibility, max contract cycles, and provisioning SKU.
- Order metafields under namespace `nbn`, including serviceability ID/status, technology type, provisioning status/reference, install window, payment plan type, and contract cycle limit.
- Customer metafields under namespace `nbn`, including business customer status, primary business name, app customer reference, active service count, and latest provisioning status.
- NBN metaobjects may exist or be expected for plan features, FAQs, legal documents, and service areas.

The Shopify product catalogue may need to be re-added or repaired as part of future work. The expected product structure is:

1. `TotalBiz Business NBN`
   - Options: `Speed`, `Contract Term`.
   - Expected variants: 8 speed combinations times 2 contract terms = 16 variants.

2. `ProBiz EA - Telstra Ethernet Access`
   - Options: `Speed`, `Class of Service`, `Contract Term`.
   - Expected variants: 4 speed combinations times 2 class options times 2 contract terms = 16 variants.

3. `ProBiz EE - nbn Enterprise Ethernet`
   - Options: `Speed`, `Class of Service`, `Contract Term`.
   - Expected variants: 4 speed combinations times 2 class options times 2 contract terms = 16 variants.

Expected total: 48 variants across 3 products. Products should remain draft until the full qualification/signup flow is implemented and reviewed.

The product-backed UI should eventually replace generic placeholder plan cards such as Essential, Business, and Enterprise with actual product families and product/variant-driven pricing or calls to action.

The intended signup journey from uploaded design material is a multi-step Business NBN flow:

1. Address / availability check.
2. Plan selection.
3. Modem or hardware choice.
4. Business details.
5. Review summary.
6. Payment setup, draft order, checkout, or order-intent handoff.
7. Confirmation / success.

This wizard is not the same as a basic product page. It may require Shopify theme work plus backend/app proxy work. Future tasks should be clear about which part is being implemented.

## Key goals

Jules should keep these goals in mind when making future changes:

- Preserve and improve the Business NBN landing page so it feels polished, modern, and conversion-focused.
- Ensure each Business NBN page renders the correct content for its handle and purpose.
- Make the Business NBN UI product-backed, not just static marketing copy.
- Re-add or repair the three NBN product families when requested, keeping them as draft products until launch readiness is confirmed.
- Populate or preserve NBN metafields so products and variants can support plan comparison, filtering, provisioning, setup fee logic, and future serviceability results.
- Create or support smart collections for Business NBN, TotalBiz, ProBiz EA, and ProBiz EE when requested.
- Consolidate the address checker into one maintainable implementation.
- Keep temporary address validation wording accurate: do not claim live NBN serviceability or guaranteed speeds until live APIs confirm it.
- Prepare for future Google Places autocomplete, Google Address Validation, and NBN serviceability API integration without exposing private API keys in Liquid or browser JavaScript.
- Support the future `/apps/rbp-bridge` app proxy/backend flow for address checking, manual review, order intents, and order status.
- Implement the multi-step signup flow incrementally and safely, starting with address and plan selection before payment or provisioning automation.
- Keep GST display consistent. Shopify pricing has been treated as GST-exclusive, with GST added separately by Shopify.
- Ensure installation/setup fees are displayed and stored clearly. Avoid charging setup fees automatically until address qualification and the commercial process are confirmed.
- Keep mobile UX strong. The Business NBN pages must work well on common mobile widths and should avoid horizontal overflow except where intentional table scrolling is used.

## Important constraints

- Read `AGENTS.md` before implementation work and follow its instructions.
- Keep changes scoped to the task. Do not perform broad theme refactors unless the prompt explicitly asks for them.
- Do not modify unrelated services, pages, collections, products, or theme areas while working on Business NBN tasks.
- Do not add credentials, API keys, tokens, private URLs, generated build artifacts, dependency caches, or local environment files.
- Do not expose server-side API keys in Liquid, JavaScript, templates, or static assets.
- Preserve Shopify Online Store 2.0 compatibility.
- Preserve existing storefront behaviour unless the task explicitly requires changing it.
- Prefer small, reviewable commits over large multi-area changes.
- Avoid duplicate logic. In particular, do not maintain both an inline address checker and a separate address-checker asset unless there is a clear reason.
- Avoid hardcoding final serviceability claims in the UI.
- Avoid hardcoding product IDs or variant IDs unless the task explicitly provides current IDs and asks for those exact references.
- Avoid relying on stale product IDs. Products may have been deleted and re-added during the project.
- If product creation is required, keep products in draft until the launch checklist is complete.
- If a task involves live Shopify product creation or page publication, report exactly what changed.
- If changing shared templates, verify every page using that template still renders appropriate content.
- If legal, CIS, SLA, pricing schedule, or terms pages are linked in the UI, confirm whether the pages are published or keep the links hidden/unpromoted until ready.
- Do not add additional Jules context files unless specifically requested.

## How Jules should use this file

Jules should read this file alongside `AGENTS.md` before starting future Business NBN implementation tasks.

Use this file as high-level project context only. It is not a substitute for the specific task prompt, the current repository contents, or the current Shopify store state. When a future task asks Jules to make changes, Jules should:

1. Read `AGENTS.md`.
2. Read this Business NBN context file.
3. Inspect the current repository files before editing.
4. Confirm whether the task targets the landing page, plans page, products, metafields, signup wizard, address checker, app proxy, or legal pages.
5. Make the smallest safe change that satisfies the task.
6. Report files changed, validation performed, assumptions made, and any skipped checks.

This file should help Jules avoid rediscovering the same project context every time, because apparently even robots need onboarding notes now.
