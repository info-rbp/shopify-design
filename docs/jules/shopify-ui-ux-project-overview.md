# Shopify UI/UX Project Overview

## Purpose

This repository contains the Shopify theme and storefront design implementation for Remote Business Partner (RBP). It is used to build and maintain the customer-facing Shopify storefront, including theme templates, Liquid sections, snippets, CSS assets, JSON template wiring, navigation-related sections, collection/product presentation, and supporting UX remediation work.

The repository is not an internal dashboard, admin application, SaaS product UI, or strategy board. Future implementation should keep the work focused on a Shopify online store experience: customers should be able to understand RBP, browse products and services, choose the right pathway, trust the offer, and either buy, enquire, or ask for help choosing.

This file gives Google Jules high-level project context before future repository fixes. It should help Jules understand why the UX/UI work matters, which areas are most likely to need changes, and how to keep future updates scoped and reviewable.

## Business context

Remote Business Partner is an Australian business services brand for SMEs. The store is intended to support multiple commercial pathways, including:

- Business templates and document products.
- Documentation suites.
- Toolkits.
- On-demand services.
- Booking or fixed-scope services.
- Membership or ongoing-support pathways.
- Marketplace or partner offers.
- Help resources and support/contact journeys.

The business problem behind the theme is not merely visual polish. RBP has a broad catalogue and a complex service model, so the storefront must help customers make decisions without feeling overwhelmed. Customers may arrive with practical problems such as HR setup, Fair Work compliance, NDIS provider readiness, AI adoption, document control, business operations, legal/commercial templates, ecommerce setup, or general business support. Many customers will not know whether they need a template, toolkit, fixed-scope service, advisory session, or ongoing support.

The storefront should therefore feel like a guided business-support experience, not just a large product grid. It should communicate practical support, trust, clarity, commercial confidence, Australian SME relevance, and human service delivery. It should avoid sounding generic, automated, overly abstract, or like an internal product taxonomy has been exposed directly to customers.

Current observed UX risks that future work should keep in mind:

- The catalogue is large enough that raw collection grids can cause decision fatigue.
- Some product and service descriptions may use repetitive, template-like, or internal-sounding language.
- Some product names and navigation labels may overlap conceptually, such as advisory, consulting, template products, and service categories.
- High-ticket toolkits and services need stronger trust, delivery, and comparison information than simple low-cost templates.
- Some products or collections may not yet have sufficient imagery, proof, or customer-facing explanation.
- Customers need a clear path when they are unsure what to buy.

## Application context

This appears to be a Shopify theme repository built around Shopify Liquid, JSON templates, snippets, and CSS assets. It includes broad storefront template work and RBP-specific sections/components.

Important repository areas Jules is likely to encounter:

- `layout/theme.liquid`: global theme layout and page shell.
- `assets/rbp-theme.css`: core RBP design tokens and theme-level styling.
- `assets/rbp-components.css`: reusable RBP component styling.
- `assets/rbp-ux-remediation.css`: remediation layer for contrast, overflow, mobile spacing, touch targets, focus states, reduced motion, and empty-state support.
- `sections/rbp-css-loader.liquid`: CSS loading section for RBP theme styles.
- `sections/header-group.json`: header group wiring.
- `sections/rbp-header.liquid`: RBP header and navigation presentation.
- `sections/rbp-header-controller.liquid`: header behaviour/control logic.
- `sections/rbp-header-spacing.liquid`: header spacing support.
- `sections/rbp-nav-fixes.liquid`: navigation-specific fixes.
- `sections/rbp-home.liquid`: homepage/customer journey content and homepage-specific UI.
- `templates/index.json`: Shopify homepage template wiring.
- `sections/main-collection-product-grid.liquid`: collection product grid and collection page product-listing behaviour.
- `templates/collection.json`: default collection template wiring.
- `templates/collection.asset-sales.json` and `templates/collection.business-in-a-box.json`: collection template variants that may need to remain compatible with the universal collection approach.
- `sections/rbp-collection-empty-state.liquid`: empty collection/customer recovery state.
- `sections/main-search.liquid`: storefront search results experience.
- `snippets/card-product.liquid`: product card markup used across product grids and related-product areas.
- `sections/featured-collection.liquid`: featured collection display.
- `sections/related-products.liquid`: related product presentation.
- `sections/main-product.liquid`: product detail page layout and product purchase information.
- `sections/featured-product.liquid`: featured product presentation.
- `sections/booking-service-product.liquid`: service/booking product presentation where fixed-scope services may need specialised UX.
- `locales/*.json` and `locales/*.schema.json`: translation and schema copy. Only update locale files when a task explicitly requires customer-facing copy, section schema labels, or translation keys.
- `DESIGN.md`: existing design direction for the theme.
- `AGENTS.md`: repository-level Jules working instructions. Jules must read this before starting future work.

The theme should remain a Shopify storefront. Avoid introducing application-like dashboard patterns unless specifically requested. Customer-facing sections should use Shopify-native patterns: heroes, collection browsing, product cards, product pages, service cards, CTAs, trust strips, FAQs, empty states, search, forms, cart guidance, and checkout-support messaging.

The current UX/UI direction should continue moving toward:

- Clearer homepage hierarchy.
- More customer-intent-led navigation.
- Better collection browsing for a large catalogue.
- Stronger product cards.
- Better product detail pages for complex digital products and services.
- Clearer service/package comparison.
- More human, less generic customer-facing copy.
- Stronger trust and proof elements.
- Accessibility and responsive behaviour improvements.

## Key goals

Future work should keep these goals in mind.

1. Make the storefront feel like a guided business-support experience

Customers should not be dropped into a giant catalogue and expected to self-diagnose. The theme should help them choose between templates, toolkits, services, membership/support, and contact pathways.

Areas likely to need updates:

- `sections/rbp-home.liquid`
- `templates/index.json`
- `sections/rbp-header.liquid`
- `sections/rbp-nav-fixes.liquid`
- `sections/main-collection-product-grid.liquid`
- `sections/main-search.liquid`
- `snippets/card-product.liquid`

2. Clarify homepage hierarchy and CTA strategy

The homepage should quickly explain who RBP helps, what problems it solves, and what the visitor should do next. Avoid too many competing primary CTAs. Recommended hierarchy is usually:

- Primary CTA: start with a Business Health Check, help-me-choose flow, or contact pathway.
- Secondary CTA: explore services or browse products.
- Lower-priority CTA: browse the full marketplace/catalogue.

Areas likely to need updates:

- `sections/rbp-home.liquid`
- `templates/index.json`
- related homepage CSS in `assets/rbp-components.css`, `assets/rbp-theme.css`, and/or `assets/rbp-ux-remediation.css`

3. Improve navigation around customer intent

Navigation should be based on what customers are trying to achieve, not only on RBP internal categories. Prefer labels and pathways such as:

- Get advice.
- Get something done.
- Find templates and toolkits.
- Get ongoing support.
- Help me choose.
- Browse by business problem.

Avoid ambiguous overlap between service categories and product names such as advisory, consulting, templates, and marketplace labels.

Areas likely to need updates:

- `sections/rbp-header.liquid`
- `sections/rbp-header-controller.liquid`
- `sections/rbp-nav-fixes.liquid`
- `sections/header-group.json`
- navigation-related CSS in `assets/rbp-components.css` and `assets/rbp-ux-remediation.css`

4. Improve collection and search UX for a large catalogue

Large collections such as templates, toolkits, documentation suites, on-demand services, HR/Fair Work, NDIS, compliance, forms, trackers, and legal/commercial content require stronger browsing support. Collection pages should help users narrow by customer problem, industry, product type, delivery type, price/complexity, and urgency.

Action areas:

- Improve collection heroes and descriptions.
- Add or improve category chips, filters, sort affordances, and guided entry points.
- Improve empty collection handling.
- Improve search-result guidance and no-result recovery.
- Ensure collection cards and product cards make differences obvious.

Relevant files:

- `sections/main-collection-product-grid.liquid`
- `templates/collection.json`
- `templates/collection.asset-sales.json`
- `templates/collection.business-in-a-box.json`
- `sections/rbp-collection-empty-state.liquid`
- `sections/main-search.liquid`
- `snippets/card-product.liquid`
- `sections/featured-collection.liquid`

5. Improve product-card usefulness

Product cards need to help customers understand what each item is, who it is for, and what happens next. This matters because many catalogue items may sound similar.

Product cards should make visible where practical:

- Product type: Template, Documentation Suite, Toolkit, On-Demand Service, Booking Service, Membership, Partner Offer.
- Delivery type: instant download, made-to-order, hosted/deployed setup, fixed-scope service, advisory/consulting support.
- Starting price.
- Key audience/problem.
- Human next step when unsure.
- Badges such as popular, premium, compliance, implementation support, or update support only when supported by product data/tags.

Relevant files:

- `snippets/card-product.liquid`
- `sections/main-collection-product-grid.liquid`
- `sections/main-search.liquid`
- `sections/featured-collection.liquid`
- `sections/related-products.liquid`
- component CSS assets.

6. Improve product detail pages for complex offers

Many RBP products are not simple retail products. Product pages should explain scope, delivery, who the product is for, what is included, what is not included, package differences, and what happens after checkout.

For toolkits and documentation suites, explain package options clearly:

- Standard Offering: download and implement yourself.
- Deployed Toolkit/Suite: RBP sets it up in a hosted workspace/site.
- Deployed Plus: hosted setup plus update support.
- Deployed Premium: hosted setup, update support, and implementation support.

For on-demand services and booking services, explain:

- Fixed scope.
- Expected deliverables.
- Delivery process.
- Timeframe or next step.
- When to contact before buying.
- Whether checkout or enquiry is the preferred conversion route.

Relevant files:

- `sections/main-product.liquid`
- `sections/featured-product.liquid`
- `sections/booking-service-product.liquid`
- product-related snippets if present.
- product and service CSS components.

7. Make the store feel more human and less generic

Avoid repetitive, generic, or internal-sounding wording. Customer-facing copy should sound specific, practical, and human. Do not expose internal catalogue strategy terms or production notes. Avoid copy like "strong bridge", "clear product-market fit", "current catalogue", or "template gaps" if encountered in customer-facing areas.

Copy should answer:

- What problem does this solve?
- Who is this for?
- What do I get?
- What happens after I buy/enquire?
- What should I choose if I am unsure?
- Why should I trust RBP?

Relevant areas:

- Homepage sections.
- Navigation labels and mega-menu descriptions.
- Collection descriptions.
- Product-card summaries.
- Product detail pages.
- Empty states.
- Search/no-results states.
- Cart guidance.
- Contact/support microcopy.

8. Strengthen trust, proof, and reassurance

RBP sells high-trust business products and services. The theme should support trust signals throughout the journey.

Potential elements:

- Trust strip on homepage and product pages.
- Clear Australian SME positioning.
- Delivery expectations.
- "What happens next" components.
- FAQs.
- Testimonials or proof blocks when content is available.
- Case-study or example-use blocks when content is available.
- Clear disclaimers for HR, legal/commercial, compliance, NDIS, privacy, cyber, and AI-related products.
- Contact/help pathway for uncertain buyers.

Relevant files:

- `sections/rbp-home.liquid`
- `sections/main-product.liquid`
- `sections/booking-service-product.liquid`
- `sections/main-collection-product-grid.liquid`
- `snippets/card-product.liquid`
- reusable component CSS assets.

9. Preserve and extend accessibility improvements

The theme should maintain and improve:

- Sufficient text contrast.
- Keyboard navigability.
- Visible focus states.
- Sensible heading order.
- Touch target sizing.
- Reduced-motion handling.
- Alt text support for meaningful media.
- Usable forms and error messages.
- Screen-reader friendly navigation and menus.

Relevant files:

- `assets/rbp-theme.css`
- `assets/rbp-components.css`
- `assets/rbp-ux-remediation.css`
- `sections/rbp-header.liquid`
- `sections/rbp-home.liquid`
- `sections/main-product.liquid`
- `sections/main-collection-product-grid.liquid`
- `sections/main-search.liquid`
- relevant snippets and forms.

10. Keep Shopify compatibility and theme-editor usability

Changes should respect Shopify theme architecture. Avoid hard-coding content where settings, blocks, section schema, metafields, product tags, or Shopify-native data should drive behaviour. Keep theme-editor settings understandable, and avoid creating fragile assumptions about product data.

## Important constraints

- Read `AGENTS.md` before making implementation changes.
- Keep every change scoped to the requested task.
- Do not rewrite unrelated templates, sections, snippets, assets, or locale files.
- Prefer small, reviewable commits over broad refactors.
- Preserve existing storefront behaviour unless the task specifically asks to change it.
- Maintain Shopify Liquid compatibility and avoid syntax that Shopify themes cannot parse.
- Avoid changes that require unpublished dependencies or unavailable build tooling.
- Do not add credentials, secrets, tokens, environment files, generated build artefacts, dependency caches, or local-only files.
- Do not introduce admin/dashboard UI patterns into customer-facing storefront templates.
- Avoid hard-coding business data that should come from Shopify products, collections, tags, metafields, section settings, or theme settings.
- Avoid using placeholder copy in customer-facing areas unless explicitly marked as temporary and requested by the task.
- Do not remove existing sections, snippets, or templates unless the task explicitly requires removal.
- Do not modify existing Jules context files unless the task explicitly asks for that file to be updated.
- When changing CSS, check for unintended global side effects. Prefer targeted selectors and clearly scoped RBP classes.
- When changing navigation, ensure desktop mega-menu, mobile menu, keyboard focus, and responsive states still work.
- When changing collection/product templates, keep product availability, pricing, variants, media, forms, and Shopify cart behaviour intact.
- When changing copy, keep it customer-facing, specific, plain-English, and aligned to Australian SME business support.
- When adding or editing schemas, keep labels clear for Shopify theme editor users.
- When using product tags or types to drive UI, handle missing or unexpected values gracefully.
- Run available lint, theme-check, build, or test commands before finalising work where practical. If checks are unavailable or fail because of existing repo state, report that clearly.

## How Jules should use this file

Jules should read this file alongside `AGENTS.md` before starting future implementation tasks in this repository. `AGENTS.md` defines the repository working rules. This file provides the broader business, UX/UI, and Shopify theme context.

For future fixes, Jules should use this file to understand:

- Why customer guidance matters more than raw catalogue display.
- Which Shopify sections, templates, snippets, and CSS assets are likely relevant.
- Which UX/UI problems are known and still require action.
- What constraints should shape implementation decisions.
- How to avoid making the storefront feel like a generic generated catalogue.

This file is intentionally high-level. It should not replace task-specific instructions, issue descriptions, pull request notes, design screenshots, or follow-up Jules context files. When a future task gives more specific instructions, follow the task-specific instructions while keeping this context in mind.
