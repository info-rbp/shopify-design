# Jules project context: Shopify design repository

## Purpose

This repository contains the source-controlled Shopify theme implementation for the Remote Business Partner storefront. It is the theme-code source of truth for Shopify design work, storefront page templates, Liquid sections, snippets, JSON templates, and related presentation logic.

Future work in this repository should focus on maintaining and improving the Shopify storefront experience in a controlled, reviewable way. Theme-code changes should be made here first, then synced or deployed to Shopify through the existing GitHub-connected Shopify workflow. Direct Shopify theme edits should be treated as temporary unless they are intentionally backported into this repository.

The repository is especially important for the Partner Offers experience. That area is being implemented as a Shopify-native, metaobject-driven offer directory rather than as a standalone external application or a set of manually-created product pages.

## Business context

Remote Business Partner is building a storefront experience that supports small-business customers with services, resources, partner offers, applications, and operational support. The Partner Offers section is intended to help users discover relevant business offers from partners and redeem those offers through direct CTA links.

The desired Partner Offers journey is category-led and SEO-friendly:

1. A user clicks the Partner Offers navigation item.
2. The user lands on `/pages/offers`.
3. The page visually displays offer categories.
4. The user selects a category.
5. The user lands on that category’s own page.
6. The category page lists active public offers assigned to that category.
7. The user clicks an offer card.
8. The user lands on the individual offer page at `/offers/<offer-handle>`.
9. The offer page displays the offer details and a redeem CTA button.
10. The redeem CTA links directly to the partner or affiliate URL stored in `cta_url`.

The Partner Offers flow must not send users to a claim form to redeem an offer. The correct redemption model is a CTA button with an embedded partner or affiliate link. If an offer does not have a valid `cta_url`, it should not be treated as a launch-ready public offer.

Each partner offer should have its own SEO-friendly generated page. Individual offer pages are important for discoverability, clear user experience, and avoiding a shallow flat directory that does little more than list outbound links.

## Application context

This repository appears to contain a Shopify theme using Online Store 2.0-style JSON templates, Liquid sections, snippets, and metaobject templates.

Important Partner Offers theme elements include, or are expected to include:

- `templates/page.offers.json`
- `templates/page.offer-categories.json`
- `templates/metaobject.partner_offer.liquid`
- `templates/metaobject.offer_category.liquid`
- `sections/rbp-offer-categories.liquid`
- `sections/rbp-offer-category-detail.liquid`
- `sections/rbp-offer-detail.liquid`
- `snippets/rbp-offer-card.liquid`

The desired implementation uses Shopify metaobjects for structured data:

- `partner`
- `offer_category`
- `partner_offer`
- `offer_claim`, if retained for other internal purposes
- `impact_program_record`, for private Impact.com sync metadata

Theme code should assume that public storefront rendering is driven by Shopify metaobjects. It should not model offers as Shopify Products, Collections, or manually-created Shopify Pages.

The main storefront paths relevant to Partner Offers are:

- `/pages/offers` as the primary Partner Offers category hub
- `/pages/offers-by-categories` as a secondary or duplicate category hub, if retained
- `/offer-categories/<category-handle>` or Shopify’s generated offer category metaobject URL for category detail pages
- `/offers/<offer-handle>` or Shopify’s generated partner offer metaobject URL for individual offer detail pages

Offer listings and category counts must only include offers where both of the following are true:

- `status == 'active'`
- `visibility == 'public'`

Draft, internal, inactive, missing-CTA, or review-only offers must not appear in the public storefront journey.

## Key goals

- Preserve a category-led Partner Offers journey: category hub → category page → offer detail page → redeem CTA.
- Ensure `/pages/offers` behaves as the main category hub, not as a flat list of every offer.
- Ensure category cards link to category detail pages, not merely query-string filters on `/pages/offers`.
- Ensure each category detail page lists only active public offers assigned to that category.
- Ensure offer cards link to individual offer detail pages and use a `View Offer` style CTA.
- Ensure offer detail pages contain the final redeem CTA that links to the offer’s `cta_url`.
- Remove or avoid any Partner Offers journey that sends users to a claim form to redeem an offer.
- Preserve SEO-friendly generated pages for every public partner offer.
- Preserve Shopify metaobject compatibility and use `offer.system.url` or the appropriate generated metaobject URL wherever possible.
- Maintain consistent Remote Business Partner visual language, including professional business-focused layouts, clear cards, strong CTAs, and responsive design.
- Keep content public-facing, business-focused, and not membership-gated unless a future task explicitly reintroduces member-only offer logic.
- Keep Impact.com payout or commercial metadata out of public storefront fields. That data belongs in private/admin-only structures, not public offer pages.

## Important constraints

- Do not create Shopify Products for partner offers.
- Do not create a Shopify Page for every individual offer.
- Do not make form submission the redemption path for Partner Offers.
- Do not link offer redemption to `/pages/claim-offer` unless a future task explicitly changes the product model.
- Do not show offers publicly unless they are both active and public.
- Do not show a redeem CTA if `cta_url` is blank.
- Do not expose Impact.com payout terms or private affiliate metadata on storefront pages.
- Preserve existing Shopify theme compatibility and valid Liquid syntax.
- Preserve valid JSON in Shopify JSON templates.
- Avoid broad or unrelated refactors.
- Keep changes small, reviewable, and directly tied to the requested storefront behaviour.
- Avoid rewriting large Liquid files unless necessary. If a rewrite is required, preserve existing styling, schema settings, responsive layout, JavaScript behaviour, Liquid loops, and section settings.
- Do not remove existing files unless a task specifically asks for deletion and the file is confirmed unused.
- Do not modify Shopify Admin data from this repository unless the task explicitly involves a deployment or Admin API workflow outside the theme source.
- Do not publish a Shopify theme, activate offers, or change production content from repository-only tasks.
- If a task requires Shopify Admin changes, clearly separate those actions from GitHub theme-code changes.

## How Jules should use this file

Jules should read this file alongside `AGENTS.md` before starting future implementation tasks in this repository.

This file gives high-level project context for the Shopify design work, especially the Partner Offers implementation. `AGENTS.md` should remain the source for repository-specific operating instructions, coding conventions, validation requirements, and workflow rules. This file should help Jules understand the business goal and intended storefront behaviour before making code changes.

When working on Partner Offers, Jules should first confirm whether the requested change affects:

1. GitHub theme code,
2. Shopify Admin data or metaobject configuration,
3. Google Cloud / Impact.com sync logic, or
4. content and launch operations.

Only theme-code changes belong in this repository by default. If a requested task depends on Shopify Admin data, metaobject definitions, menu configuration, offer activation, or Impact.com sync results, Jules should call that out clearly instead of hiding those dependencies inside unrelated theme changes.
