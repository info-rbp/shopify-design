## Purpose

This repository contains the Shopify storefront theme implementation for Remote Business Partner (RBP). It appears to hold the code and configuration for a Shopify Online Store 2.0 theme, including Liquid sections, JSON templates, theme assets, product templates, global layout elements, and storefront design-system work.

The immediate purpose of this context file is to give Google Jules enough project background before it performs repository fixes. Jules should treat this file as high-level orientation only. It is not a request to implement every item listed here in one pass, because apparently repositories become disasters when every backlog item gets treated like an invitation.

The main repository work ahead is to move the product-template and data-model layer toward a final deployed state. The global theme structure has already been substantially stabilised in Shopify, but the product templates, product assignment logic, metafield usage, metaobject integration, and fulfilment messaging still need review and implementation discipline before launch.

## Business context

Remote Business Partner is an Australian business support platform. The storefront is being developed to sell, explain, and route customers toward business support products and services, including advisory, consulting, implementation, operational resources, business essentials, memberships, and support pathways.

The commercial model is broader than a simple Shopify catalogue. The store needs to support several product and service families:

- On-demand services.
- Core advisory services.
- Booking-based or property field services.
- Templates and document products.
- Documentation suites.
- Toolkits.
- Business NBN products or service pathways.
- Membership pathways.
- Marketplace, partner offers, and referral-style products.
- Future business finance and business insurance modules.

A key business requirement is that many products are not simple instant downloads. The expected customer journey for many RBP products is:

1. Customer purchases or submits interest.
2. Customer completes onboarding, intake, booking, or requirements capture where applicable.
3. RBP prepares, configures, reviews, or validates the output.
4. Customer receives digital delivery, service handover, booking confirmation, or next-step guidance.

Future changes must avoid creating customer confusion around fulfilment. If a product requires onboarding, preparation, booking, manual review, or service delivery, the product page, CTA, cart messaging, and help copy should not describe it as an instant digital download.

## Application context

This repository appears to contain a Shopify Online Store 2.0 theme based on Shopify's Refresh structure, with RBP-specific customisation layered on top.

The theme includes Shopify-native JSON templates and Liquid sections. Important theme areas include:

- `layout/theme.liquid` for the global document structure.
- `sections/header-group.json` and `sections/footer-group.json` for global section group wiring.
- RBP-specific header and footer sections.
- RBP CSS foundation files such as `assets/rbp-theme.css` and `assets/rbp-components.css` where present.
- Product templates under `templates/`.
- Product sections under `sections/`.
- Reusable product and product-state assets.

The current product-template layer appears to include these important product templates and sections:

- `templates/product.json` as the default product template.
- `templates/product.on-demand-service.json` for the dedicated on-demand service product journey.
- `templates/product.core-service.json` for core service products.
- `templates/product.booking-service.json` for booking-style service products.
- `sections/main-product.liquid` for the default Shopify product layout.
- `sections/main-product-on-demand-service.liquid` for the custom on-demand service product layout.
- `sections/rbp-core-service-product.liquid` for core service presentation.
- `sections/rbp-product-state.liquid` for product fulfilment, CTA, membership, enquiry, booking, availability, and state messaging.
- `sections/rbp-product-state-guard.liquid` for guard behaviour around product-state interactions.
- `sections/rbp-product-information.liquid` for product detail and classification content.
- `sections/rbp-product-offerings.liquid` for Templates, Documentation Suites, and Toolkits cross-navigation.
- `sections/rbp-product-faq.liquid` for product FAQ content.
- `sections/rbp-product-help.liquid` for metaobject-driven help and support content.

The theme also interacts with Shopify product metafields and metaobjects. The current data architecture appears to include namespaces and content models such as:

- `custom.*` product metafields for general product family, category, buyer, use-case, delivery, file format, onboarding, support, and related content.
- `core.*` product metafields for core service type, code, outcome, delivery, intake, pricing, eligibility, and recommended next services.
- `booking.*` product metafields for booking service configuration, portal URLs, requirements, deliverables, policies, and FAQs.
- `nbn.*` product metafields for Business NBN plan content, plan type, terms, legal pages, and feature summaries.
- `marketplace.*` product metafields for marketplace offer classification, complexity, revenue model, target customers, NDA requirements, and listing state.
- Business finance and business insurance metaobjects and metafields for future modules.

The metaobject model appears to be extensive. Important current or future metaobject families include:

- Partner, Offer Category, Partner Offer, and Offer Claim.
- Core Service, Core Diagnostic Domain, Core Intake Form, Core Intake Item, Core Service Pathway, Core Service Step, Core Deliverable, Core Service FAQ, and Core Recommendation Rule.
- Booking Service, Booking Form Requirement, Booking Service Deliverable, Booking Policy, Booking Service FAQ, and Booking Store Config.
- RBP Help Category, RBP Help Article, RBP Help FAQ, RBP Support Pathway, and RBP Process.
- Marketplace Enquiry, Marketplace Workflow Stage, Marketplace Admin Task, Marketplace Email Template, and Marketplace Flow Recipe.
- Business Insurance and Business Finance content models.
- Nucleus Toolkit content models.
- Custom Solution content models.
- Managed Service content models.

Jules should assume the repository contains both active storefront code and future architecture. Not every metaobject definition or template concept is necessarily launch-ready.

## Key goals

Future repository fixes should keep these goals in mind:

1. Preserve the completed global RBP structure.
   - Do not undo the approved global navigation direction.
   - Do not reintroduce `Outsourced` as a primary navigation item.
   - Avoid unrelated header or footer refactors unless the task specifically requires them.

2. Stabilise the product-template system.
   - Confirm which product families should use dedicated templates.
   - Keep `templates/product.json` safe as the default product template.
   - Use `templates/product.on-demand-service.json` for on-demand service products when appropriate.
   - Use `templates/product.core-service.json` for core service products when appropriate.
   - Use `templates/product.booking-service.json` for booking/property field service products when appropriate.
   - Create or update missing product-family templates only when a task explicitly asks for that work.

3. Build a clear product template routing model.
   - On-demand services should not accidentally render as document/template products.
   - Document/template products should not accidentally render as generic service products.
   - Booking, NBN, membership, marketplace, toolkit, and documentation-suite products should have clear template and CTA behaviour before deployment.

4. Align product pages with the RBP fulfilment model.
   - Avoid `instant download` language unless the product is genuinely configured for instant digital delivery.
   - Prefer wording such as prepared digital delivery, onboarding-led delivery, intake required, booking required, manual review required, or availability check required where appropriate.
   - Keep product page, cart, FAQ, footer, and support copy consistent.

5. Use metafields and metaobjects intentionally.
   - Do not add new metafield keys if an existing field already serves the purpose.
   - Keep namespaces meaningful: `custom`, `core`, `booking`, `nbn`, `marketplace`, and other existing namespaces should not be mixed carelessly.
   - When a section expects metafields or metaobjects, make that dependency clear in code comments or documentation where useful.
   - Avoid orphan template logic that references fields nobody populates.

6. Keep changes reviewable.
   - Prefer small, scoped commits.
   - Avoid broad rewrites of Liquid, JSON templates, or CSS unless required.
   - Avoid changing auto-generated Shopify JSON templates unnecessarily.
   - If editing JSON templates, preserve valid Shopify Online Store 2.0 structure.

7. Prepare the store for final deployment.
   - Product templates should render correctly for representative product families.
   - Product CTA behaviour should match the commercial model.
   - Search, cart, product forms, related products, and product-state sections should continue working.
   - Any missing pages, collections, product templates, or metafield/metaobject data should be documented as follow-up work if not fixed in the current task.

Important product-family areas still likely needing work include:

- `templates/product.template.json` for template/document products.
- `templates/product.documentation-suite.json` for documentation suite products.
- `templates/product.toolkit.json` for toolkit products.
- `templates/product.business-nbn.json` for Business NBN products or plans.
- `templates/product.membership.json` for membership products.
- `templates/product.marketplace.json` for marketplace-style products, if the product model remains the right approach.
- Product assignment rules for active products, especially products with `productType` such as `On-Demand Service`.
- Fulfilment and CTA language inside `sections/rbp-product-state.liquid`.
- Product detail sections that depend on `custom.*`, `core.*`, `booking.*`, `nbn.*`, or `marketplace.*` metafields.
- Product help sections that depend on RBP help/support metaobjects.

## Important constraints

Jules should follow these constraints when making future repository changes:

- Read `AGENTS.md` before making changes.
- Keep changes scoped to the requested task.
- Do not perform unrelated theme-wide refactors.
- Do not rewrite global header, footer, homepage, product pages, or CSS unless the task clearly requires it.
- Do not remove existing Shopify compatibility comments from auto-generated JSON templates unless there is a strong reason.
- Preserve valid Shopify Liquid syntax.
- Preserve valid Shopify JSON template structure.
- Preserve existing product form behaviour, cart behaviour, variant behaviour, and checkout paths.
- Avoid broad CSS selectors that affect Shopify base components unexpectedly.
- Prefer `.rbp-` prefixed classes for RBP-specific components and utilities.
- Do not introduce credentials, secrets, generated build output, dependency caches, or local environment files.
- Avoid deleting dormant files unless the task explicitly asks for cleanup.
- Avoid changing live deployment assumptions without documenting them.
- Do not assume all products have complete metafields populated.
- Build templates with safe fallbacks, but do not rely on fallback copy as final launch content.
- When adding or changing metafield/metaobject-dependent rendering, document which data fields are required for a launch-ready product.
- If a requested change requires Shopify admin data, product assignment changes, metafield population, or metaobject entry creation that cannot be done in the repository alone, document that limitation clearly in the final response or pull request notes.
- Run available validation, lint, format, or build commands if the repository documents them. If they cannot be run, report that clearly.

## How Jules should use this file

Jules should read this file alongside `AGENTS.md` before starting future implementation tasks in this repository.

`AGENTS.md` defines the repository working rules. This file provides the Shopify/RBP project context behind those rules.

For future tasks, Jules should use this file to understand:

- Why the Shopify theme exists.
- Which product families the storefront is expected to support.
- Which product templates and Liquid sections are likely relevant.
- Why fulfilment messaging must be handled carefully.
- How metafields and metaobjects relate to the storefront.
- Which areas are likely launch-critical versus future architecture.

This file is not a substitute for the specific task prompt. If a future task gives narrower instructions, Jules should follow the task prompt first, then use this file and `AGENTS.md` to avoid accidental architectural drift, random refactors, or the ancient human tradition of fixing one thing by breaking five quieter things.
