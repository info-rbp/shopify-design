# Jules project overview

## Purpose

This repository contains Shopify theme design and storefront implementation work for the Remote Business Partner storefront. It appears to extend a Shopify Online Store 2.0 theme with custom RBP-branded Liquid sections, JSON templates, product support sections, collection fallback states, cart guidance, and page-specific landing experiences.

The purpose of this repository is to keep the Shopify storefront design, page templates, responsive layout behaviour, and customer-facing UI components consistent across the Remote Business Partner site. Future fixes should treat this repository as the source for theme-level storefront code, not as the place to alter Shopify Admin content, product data, backend services, app integrations, or operational workflows unless a task explicitly says so.

## Business context

Remote Business Partner is an Australian SME support platform that brings together business services, resources, partner offers, connectivity, memberships, operational support pathways, and practical business documentation products.

The storefront is not just a simple product catalogue. It supports several customer journeys:

- discovering the business and its value proposition from the homepage;
- choosing a core service such as Business Advisor, Decision Desk, The Fixer, or Nucleus;
- browsing partner offers by category;
- reviewing Business NBN connectivity support and using an address-checker style experience;
- comparing membership options and member benefits;
- browsing operational support, applications, and custom solution pathways;
- shopping digital products, documentation suites, templates, and toolkits;
- reviewing product delivery guidance before checkout;
- reaching the cart without layout, overflow, or usability issues on mobile.

A lot of the commercial value depends on clarity and trust. Pages should feel structured, professional, practical, and easy to navigate. The customer should quickly understand what the offer is, who it is for, what happens next, and which action to take.

## Application context

This repository appears to contain a Shopify theme derived from, or at least compatible with, a Dawn-style Shopify Online Store 2.0 architecture.

Important implementation patterns include:

- `layout/theme.liquid` provides the global Shopify document shell, loads core theme scripts such as `constants.js`, `pubsub.js`, `global.js`, disclosure/modal/search scripts, renders `content_for_header`, and defines global typography and colour CSS variables from Shopify theme settings.
- JSON templates in `templates/` assign routes to custom sections. For example:
  - `templates/index.json` renders the homepage through `sections/rbp-home.liquid`.
  - `templates/page.core-services.json` renders `/pages/core-services` through `sections/rbp-core-services-landing.liquid`.
  - `templates/page.business-nbn.json` renders `/pages/business-nbn` through `sections/rbp-business-nbn.liquid` and `sections/rbp-bridge-status-helper.liquid`.
  - `templates/page.marketplace.json` renders `/pages/marketplace` through `sections/rbp-marketplace-page.liquid`.
  - `templates/page.offers.json` renders `/pages/offers` through `sections/rbp-offer-categories.liquid`.
  - `templates/page.membership.json` renders `/pages/membership` through `sections/rbp-membership-page.liquid`.
  - `templates/page.applications.json` renders `/pages/applications` through `sections/rbp-applications-hub.liquid`.
  - `templates/page.operations.json` renders `/pages/operations` through `sections/rbp-operations-hub.liquid`.
- `templates/product.json` uses Shopify's `main-product` section together with RBP-specific sections including `rbp-product-state`, `rbp-product-state-guard`, `rbp-product-information`, `rbp-product-offerings`, `rbp-product-faq`, `rbp-product-help`, `rbp-card-fallback-styles`, and `related-products`.
- `templates/collection.json` uses standard collection sections plus RBP-specific support sections including `rbp-card-fallback-styles`, `rbp-collection-empty-state`, and `rbp-collection-help`.
- `templates/cart.json` adds `rbp-cart-guidance` before the standard cart items and footer sections.

The custom RBP sections commonly define their own scoped CSS tokens and class namespaces, such as `rbp-home-*`, `rbp-cs-*`, and `rbp-nbn-*`. Many sections combine HTML, inline section-level CSS, responsive grids, CTA cards, badges, feature panels, FAQ blocks, animated elements, and Shopify schema settings. Jules should preserve these local naming conventions and avoid mixing unrelated page styles unless a task specifically requires consolidation.

Relevant pages, templates, and elements that future fixes may need to update include:

| Storefront route | Likely template | Key section or elements to check |
| --- | --- | --- |
| `/` | `templates/index.json` | `rbp-home`, homepage hero, journey cards, service/category routing, CTA panels, responsive cards |
| `/pages/core-services` | `templates/page.core-services.json` | `rbp-core-services-landing`, hero CTAs, service pathway cards, service grid, process steps, FAQ, CTA band |
| `/pages/business-nbn` | `templates/page.business-nbn.json` | `rbp-business-nbn`, address checker, plan cards, eligibility/status helper, responsive input/button behaviour |
| `/pages/marketplace` | `templates/page.marketplace.json` | `rbp-marketplace-page`, marketplace category cards, offer routing, card grids, empty/fallback states |
| `/pages/offers` | `templates/page.offers.json` | `rbp-offer-categories`, partner offer categories, CTA links, category grid layout |
| `/pages/membership` | `templates/page.membership.json` | `rbp-membership-page`, membership comparison table, benefit cards, pricing/CTA areas, mobile table readability |
| `/pages/applications` | `templates/page.applications.json` | `rbp-applications-hub`, application pathway cards, forms/CTA routing, responsive hub layout |
| `/pages/operations` | `templates/page.operations.json` | `rbp-operations-hub`, operational service cards, support pathway layout, responsive grids |
| `/collections/on-demand-services` and other collections | `templates/collection.json` | `main-collection-banner`, `main-collection-product-grid`, card fallback styles, empty-state and help sections |
| Product pages | `templates/product.json` | `main-product`, variant picker, buy buttons, delivery guidance, product state guard, product FAQ, related products |
| `/cart` | `templates/cart.json` | `rbp-cart-guidance`, cart items, subtotal/buttons, mobile spacing and checkout CTA behaviour |

Future mobile fixes should especially check:

- header and navigation overflow;
- mobile menu open and close behaviour;
- horizontal scrolling at 390px, 430px, and 768px widths;
- card grids collapsing cleanly;
- product cards and fallback cards not overlapping;
- long headings and CTA labels wrapping safely;
- membership comparison table readability;
- Business NBN address checker usability;
- product variant buttons, buy buttons, and cart CTAs on mobile;
- collection filters, product grid cards, and empty states.

## Key goals

Jules should keep these goals in mind when making future changes:

1. Preserve the Remote Business Partner brand feel: professional, practical, trustworthy, structured, and SME-focused.
2. Keep the theme Shopify-compatible and Online Store 2.0-friendly.
3. Improve mobile usability without damaging desktop layouts.
4. Keep all page-specific fixes scoped to the relevant template, section, snippet, or asset.
5. Protect existing customer journeys across homepage, service pages, marketplace/offers, membership, product pages, collections, and cart.
6. Maintain clear CTAs and route destinations so users can move from education to purchase or enquiry without friction.
7. Keep product, collection, and cart experiences stable because they directly affect checkout confidence.
8. Prefer small, reviewable fixes over broad rewrites.
9. Avoid introducing global CSS changes unless the task clearly requires a shared design-system adjustment.
10. Check Liquid, JSON template validity, responsive CSS, and accessibility basics before proposing completion.

## Important constraints

Jules should observe these constraints unless a future task explicitly says otherwise:

- Do not edit unrelated files.
- Do not perform broad refactors just to tidy code.
- Do not replace page sections wholesale when a targeted fix will work.
- Do not change Shopify product data, collection data, customer data, orders, discounts, backend integrations, Cloud Run services, Appwrite configuration, MCP tooling, or operational files unless a task specifically instructs it.
- Do not add credentials, secrets, generated build artifacts, dependency caches, or local environment files.
- Preserve existing Shopify Liquid behaviour, section schema compatibility, and theme editor compatibility.
- Treat auto-generated JSON templates with care because Shopify Admin or the theme editor may overwrite them.
- Keep changes reviewable and easy to diff.
- Maintain accessibility basics, including semantic structure, keyboard-usable controls, focus states, readable contrast, alt text where relevant, and predictable link/button behaviour.
- Avoid changing URL paths, handles, section IDs, schema setting names, or data attributes unless the task requires it.
- Avoid changing customer-facing copy unless it is necessary for the fix or explicitly requested.
- Test or inspect likely affected pages at mobile widths before considering responsive work complete.
- When validation commands are unavailable or undocumented, report that clearly rather than pretending the command fairy visited.

## How Jules should use this file

Jules should read this file alongside `AGENTS.md` before starting future implementation tasks.

Use `AGENTS.md` as the repository-level working rules and this file as the high-level Shopify storefront context. Together they explain how to keep changes scoped, where RBP-specific theme work lives, what customer journeys matter, and which pages/templates/sections are most likely to be involved in future fixes.

For future tasks, Jules should:

1. Read `AGENTS.md`.
2. Read this file.
3. Identify the specific route, template, section, snippet, or asset involved.
4. Make the smallest useful change.
5. Validate the affected storefront behaviour where practical.
6. Summarize changed files, validation performed, assumptions made, and any skipped checks.
