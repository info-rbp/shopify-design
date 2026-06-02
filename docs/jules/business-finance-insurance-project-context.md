# Business Finance and Insurance Shopify Project Context

## Purpose

This repository supports the Shopify storefront design and implementation work for Remote Business Partner. It contains Shopify Online Store 2.0 theme files, Liquid sections, JSON templates, snippets, CSS, JavaScript assets, and storefront UI patterns used to build and maintain the customer-facing Shopify experience.

This file gives Google Jules high-level project context before it works on future fixes or implementation tasks related to the Business Finance and Business Insurance areas of the storefront. It is not a step-by-step ticket. It is a context brief so future changes are made against the intended product architecture instead of treating the current pages as finished simply because they exist.

The immediate objective is to move the Business Finance and Business Insurance areas from generic service-style pages into complete, usable storefront offerings with clear landing pages, structured product/provider content, enquiry forms, disclosure content, and conversion pathways.

## Business context

Remote Business Partner is building a Shopify-based business support platform for small businesses, sole traders, professionals, and growing businesses. The storefront is intended to combine business services, digital products, partner pathways, memberships, operational support, and business essentials into one coherent customer experience.

The wider site already treats areas such as Business NBN, Business Finance, Business Insurance, Marketplace, Offers, Membership, Applications, and Custom Solutions as part of a broader business operations ecosystem. Business Finance and Business Insurance should fit into that ecosystem rather than becoming separate microsites or isolated landing pages.

Business Finance is intended to become the capital, funding, banking, and financial-operations hub. It should support content and pathways for business loans, personal loans, car loans, equipment finance, asset finance, short-term or pay-advance products, business banking, provider pages, and finance resources. Known provider concepts discussed for this area include LoanOptions.ai, Beforepay, and Airwallex. The preferred provider/referral CTA pattern for finance is a Shopify enquiry form before any external provider handoff.

Business Insurance is intended to become the coverage, protection, and insurance guidance hub. It should support content and pathways for insurance types, industry-specific insurance needs, insurance resources, FAQs, partner/referral information, and an insurance enquiry or quote-intent flow. Known partner concepts discussed for this area include BizCover or an equivalent insurance referral partner.

The customer-facing goal is practical: users should be able to visit Business Finance or Business Insurance, understand the available pathways, select an appropriate product/category, submit the relevant enquiry details, and receive a clear next step. A page that only describes the service at a high level is not considered complete.

## Application context

This repository appears to contain a Shopify theme/design implementation for the Remote Business Partner storefront. It uses Liquid sections, JSON templates, snippets, and asset files rather than a separate application framework.

Relevant existing theme areas include:

- `sections/rbp-header.liquid`
- `sections/rbp-footer.liquid`
- `sections/rbp-home.liquid`
- `sections/rbp-service-page.liquid`
- `sections/rbp-landing-page.liquid`
- `sections/rbp-business-nbn.liquid`
- `assets/rbp-theme.css`
- `assets/rbp-components.css`
- `assets/rbp-business-nbn-checker.js`
- `templates/page.service.json`
- `templates/page.essentials.json`
- `templates/page.business-nbn.json`

The current service-page pattern includes hard-coded `page.handle` cases for pages such as `business-finance` and `business-insurance`. That makes the pages presentable, but it is not enough for a complete finance or insurance offering. Future work should avoid expanding the generic service page indefinitely if a dedicated section, template, or data-driven module is more appropriate.

Relevant current or expected Shopify pages include:

- `/pages/business-finance`
- `/pages/business-insurance`
- `/pages/business-nbn`
- `/pages/essentials`
- `/pages/marketplace`
- `/pages/offers`
- `/pages/membership`
- `/pages/applications`
- `/pages/custom-solutions`
- `/pages/contact`

Expected Business Finance page structure may include:

- `/pages/business-finance`
- `/pages/business-loans`
- `/pages/personal-loans`
- `/pages/car-loans`
- `/pages/equipment-finance`
- `/pages/asset-finance`
- `/pages/business-banking`
- `/pages/airwallex`
- `/pages/beforepay-pay-advance`
- `/pages/business-finance-resources`

Expected Business Insurance page structure may include:

- `/pages/business-insurance`
- `/pages/business-insurance-quote`
- `/pages/business-insurance-types`
- `/pages/business-insurance-industries`
- `/pages/business-insurance-resources`
- `/pages/business-insurance-disclaimer`
- `/pages/business-insurance-affiliate-disclosure`
- `/pages/public-liability-insurance`
- `/pages/professional-indemnity-insurance`
- `/pages/cyber-liability-insurance`
- `/pages/management-liability-insurance`
- `/pages/business-insurance-pack`

Expected Business Finance theme areas may include:

- `sections/rbp-business-finance.liquid`
- `assets/rbp-business-finance.css`
- `assets/rbp-business-finance.js`
- `templates/page.business-finance.json`
- `templates/page.business-finance-category.json`
- `templates/page.business-finance-product.json`
- `templates/page.business-finance-provider.json`
- `templates/page.business-finance-feature.json`
- `templates/page.business-finance-resource.json`

Expected Business Insurance theme areas may include:

- `sections/rbp-business-insurance.liquid`
- `assets/rbp-business-insurance.css`
- `assets/rbp-business-insurance.js`
- `templates/page.business-insurance.json`
- `templates/page.business-insurance-types.json`
- `templates/page.business-insurance-industries.json`
- `templates/page.business-insurance-resources.json`
- `templates/page.business-insurance-quote.json`
- `templates/page.business-insurance-disclaimer.json`
- `templates/page.business-insurance-affiliate-disclosure.json`

Shopify custom data structures have been planned and/or created in the connected store for both Business Finance and Business Insurance. Future implementation should expect the theme to read from metaobjects and page metafields where practical instead of hard-coding every card, CTA, provider, resource, and FAQ in Liquid.

Business Finance custom data concepts include:

- `business_finance_settings`
- `business_finance_category`
- `business_finance_product`
- `business_finance_provider`
- `business_finance_feature`
- `business_finance_resource`
- `business_finance_faq`
- `business_finance_cta`
- `business_finance_lead_source`

Business Finance page metafields are expected under the `business_finance` namespace, including page type, category, product, provider, feature, resource, CTA, tracking source, disclaimer visibility, and optional referral URL override.

Business Finance customer enquiry fields are expected to support a Shopify form that collects:

- first name
- last name
- email
- phone
- business name
- years in business
- loan required
- amount sought
- best time to call

Business Insurance custom data concepts include:

- `business_insurance_settings`
- `business_insurance_type`
- `business_insurance_industry`
- `business_insurance_resource`
- `business_insurance_faq`
- `business_insurance_cta`
- `business_insurance_partner`
- `business_insurance_lead_source`

Business Insurance page metafields are expected under the `business_insurance` namespace, including page type, industry, insurance type, resource, CTA, tracking source, disclaimer visibility, and optional referral URL override.

Important UI elements likely needed across both areas include:

- hero sections with clear business context
- category cards
- product or cover-type cards
- provider cards
- feature cards
- resource cards
- FAQ accordions
- disclosure blocks
- lead/enquiry forms
- hidden tracking/source fields
- final CTA bands
- related pathway modules linking Finance, Insurance, NBN, Marketplace, Membership, and Contact

## Key goals

- Turn Business Finance into a complete finance hub, not only a generic service page.
- Turn Business Insurance into a complete insurance hub, not only a generic service page.
- Use dedicated sections and templates where needed instead of overloading `sections/rbp-service-page.liquid`.
- Preserve the existing RBP visual language, spacing, card system, navigation, and responsive behaviour.
- Make Business Finance and Business Insurance usable immediately through Shopify enquiry forms even before deeper provider integrations are complete.
- Keep partner handoffs configurable and avoid hard-coded production provider URLs inside generic UI components.
- Support clear disclosure wording near finance, insurance, provider, referral, quote, and enquiry CTAs.
- Prefer structured, reusable content through metaobjects and metafields where practical.
- Keep Business Finance, Business Insurance, and Business NBN connected through the Essentials or Operations-style customer journey without blurring their separate purposes.
- Maintain mobile usability across 390px, 430px, and tablet-width layouts.
- Keep the implementation reviewable by changing the smallest practical set of files for each task.

For Business Finance specifically, Jules should keep these goals in mind:

- Build or prepare a Business Finance hub that can display Loans & Funding, Banking & Financial Operations, Asset/Equipment Finance, Pay Advance, Providers, Features, Resources, and FAQs.
- Implement provider/referral CTAs as Shopify enquiry forms first, collecting the finance lead details listed above.
- Allow future provider content for LoanOptions.ai, Beforepay, Airwallex, and other providers without rebuilding the theme architecture.
- Avoid pretending every finance use case is a standalone product page. Use resource or guide content for use cases unless the product is explicitly defined.

For Business Insurance specifically, Jules should keep these goals in mind:

- Build or prepare a Business Insurance hub that can display insurance types, industry pathways, resources, FAQs, partner information, and an enquiry or quote-intent form.
- Provide clear disclosure wording that RBP may be providing general information, support, or referral pathways rather than personal insurance advice unless a task explicitly confirms otherwise.
- Support partner or referral configuration without hard-coding a single provider throughout the theme.
- Keep BizCover-style FAQ/support content separate from generic insurance education unless the page specifically needs provider support context.

## Important constraints

- Read `AGENTS.md` before starting implementation work.
- Keep changes scoped to the current task. Do not refactor unrelated theme files.
- Do not rewrite global layout, navigation, product templates, cart behaviour, or checkout-adjacent logic unless the task explicitly requires it.
- Do not modify existing files unless the task requires it. Prefer adding a dedicated section/template/asset when that is safer than expanding a generic file.
- Preserve existing page handles and public URLs unless a task explicitly instructs a migration.
- Preserve existing Business NBN behaviour, including address-checker assumptions and any temporary serviceability language.
- Preserve existing Marketplace, Offers, Membership, Applications, Help Center, product, cart, and customer-account behaviour.
- Maintain Shopify Online Store 2.0 compatibility. JSON templates must reference valid section types. Liquid should avoid unsupported filters, objects, or assumptions.
- Keep CSS scoped to the feature area where practical, such as `.rbp-finance` or `.rbp-insurance`, to avoid accidental global styling regressions.
- Do not add secrets, API keys, provider credentials, private URLs, generated build artifacts, dependency caches, or local environment files.
- Do not hard-code live provider IDs, affiliate IDs, or production referral URLs unless the task explicitly provides and authorises them.
- Do not create misleading finance or insurance claims. Avoid guaranteed approval, guaranteed coverage, guaranteed savings, or advice-like language.
- Do not claim an insurance quote, finance approval, serviceability check, or provider eligibility has been confirmed unless there is a live integration that actually confirms it.
- Treat forms as enquiry or quote-intent forms unless a task explicitly implements a real application, quote, checkout, or partner API flow.
- Keep accessibility in mind: semantic headings, labelled form controls, keyboard-friendly accordions, readable contrast, and responsive form layouts.
- Validate templates and Liquid where possible before finalising changes. If repository tooling is unavailable or incomplete, state that clearly in the task notes.
- Keep all changes small enough for a reviewer to understand what changed and why.

## How Jules should use this file

Jules should read this file alongside `AGENTS.md` before starting future Business Finance, Business Insurance, or related Shopify theme implementation tasks.

Use this file to understand the product direction, expected page families, likely templates, important metaobject/metafield concepts, and implementation constraints. This file should not override a specific task prompt, issue, or pull request description. If a future task gives narrower instructions, follow that task and use this document only as background context.

Before making changes, Jules should identify which area is actually in scope:

- Business Finance hub, products, providers, features, forms, resources, or FAQs.
- Business Insurance hub, cover types, industries, quote/enquiry form, resources, disclosures, or FAQs.
- Shared navigation or cross-linking between Finance, Insurance, NBN, Marketplace, Membership, and Contact.
- Theme infrastructure such as templates, sections, snippets, or scoped assets.

After making changes, Jules should report:

- files changed
- pages or templates affected
- assumptions made
- validation performed
- any skipped checks
- any remaining follow-up work
