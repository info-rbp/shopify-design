# Marketplace project overview for Jules

## Purpose

This repository contains the Shopify storefront theme and design implementation for Remote Business Partner. It is the source of truth for Shopify theme fixes, page templates, reusable sections, storefront UX, and marketplace-related presentation work that should be deployed to the Shopify store in a controlled and reviewable way.

This file gives Google Jules high-level project context before future repository fixes. It is intentionally broad and strategic rather than a line-by-line implementation ticket. Specific future tasks should still define the exact files and changes required.

## Business context

Remote Business Partner is an Australian business support platform for SMEs. The storefront presents advisory, consulting, implementation, operations, membership, essential business services, partner offers, and support pathways.

A major current priority is the RBP Marketplace. The marketplace should not be treated as only a partner-offer directory. It needs to become a broader marketplace hub that can route users into several commercial pathways:

- Business-In-A-Box packages and packaged business opportunities.
- Asset sale and review pathways.
- Partner offers for tools, services, finance, resources, and member benefits.
- Buyer applications and buyer qualification journeys.
- Seller listing submissions.
- Due diligence and confidentiality pathways.
- Custom business build enquiries.
- Partner referral and provider onboarding pathways.

The current storefront has marketplace-related pages and navigation in place, but the main marketplace landing experience needs to be aligned with the broader product strategy. In particular, the marketplace page must clearly present the full set of marketplace pathways rather than appearing to be only a partner-offers page.

## Application context

This repository appears to contain a Shopify theme implementation for the Remote Business Partner storefront. The active Shopify store includes a main theme named `shopify-design/main`, and there are also unpublished development themes such as `Refresh Theme Redevelopment` and `Copy of Refresh`.

The Shopify store already contains published marketplace-related pages using page template suffixes such as:

- `marketplace`
- `compare-opportunities`
- `business-assessment`
- `marketplace-enquiry`
- `business-in-a-box`
- `asset-sales-process`
- `buyer-guide`
- `seller-guide`
- `confidentiality-process`
- `marketplace-faq`
- `custom-business-build`
- `partner-referrals`
- `submit-a-listing`
- `buyer-application`
- `due-diligence-packs`
- `marketplace-terms`

The Shopify store also has marketplace custom data structures and operational setup outside the theme, including customer segments, metaobjects for workflow stages, flow recipes, email templates, and enquiry records. These operational pieces should inform storefront UX, but future repository changes should not assume the theme can create Shopify Flow workflows or Shopify Forms directly.

The custom RBP Integration Bridge app is expected to be available through the Shopify app proxy path:

```text
/apps/rbp-bridge
```

Storefront calls should be designed around paths such as:

```text
/apps/rbp-bridge/api/check-address
/apps/rbp-bridge/api/marketplace-enquiry
```

The backend maps those storefront proxy calls to the bridge service. Theme work may need to add fetch calls, form submissions, health checks, or progressive enhancement around this app proxy, but should fail gracefully if the backend route is unavailable.

## Key goals

Jules should keep the following goals in mind when making future changes:

1. Reposition the Marketplace landing page as the central marketplace hub.

   The main `/pages/marketplace` experience should route users into Business-In-A-Box, Asset Sales, Partner Offers, Buyer Pathway, Seller Pathway, Due Diligence, Custom Business Build, and Partner Referral pathways. It should not read as only a partner-offers catalogue.

2. Keep the header navigation simple.

   Do not expand the header into a large marketplace dropdown unless a future task explicitly asks for that. The marketplace landing page itself should provide the deeper marketplace navigation and pathway selection.

3. Preserve the current polished visual direction.

   The storefront uses a strong navy/purple brand palette, rounded cards, bold hero sections, badges, gradient panels, and practical CTA blocks. Future marketplace changes should extend that visual language rather than replacing it with an unrelated design system.

4. Separate the marketplace hub from partner offers.

   Partner offers are one marketplace pathway, not the whole marketplace. If a partner-offers grid exists, it should be labelled as a partner-offers section or moved into a dedicated partner-offers page/section. Business-In-A-Box and Asset Sales should be visible as first-class marketplace pathways.

5. Remove public placeholder language.

   Public-facing marketplace sections should not show unfinished text such as `TBC`, `Placeholder`, or `Details to be updated`. Use deliberate launch-state copy such as `Coming soon`, `Register interest`, `Quote on request`, `Pricing confirmed after enquiry`, or `Availability subject to partner confirmation`.

6. Make marketplace CTAs route with context.

   Buttons and links should send users to the right pathway, enquiry, assessment, or listing page. Where useful, URLs should include source context such as marketplace type, card type, product/listing handle, or CTA source so the enquiry flow can route users correctly.

7. Support bridge-based marketplace workflows.

   Future form or interactive features should be designed so they can submit to the RBP Integration Bridge app proxy. A final marketplace enquiry implementation should ideally create or update customers, apply tags, set marketplace customer metafields, and create marketplace enquiry records through the bridge/backend, while Shopify Forms and Flow remain an optional fallback or interim workflow.

8. Keep marketplace pages connected.

   The following pages should remain part of the marketplace journey and should be linked contextually where relevant:

   - `/pages/marketplace`
   - `/pages/business-in-a-box`
   - `/pages/asset-sales-process`
   - `/pages/compare-opportunities`
   - `/pages/business-assessment`
   - `/pages/marketplace-enquiry`
   - `/pages/buyer-guide`
   - `/pages/seller-guide`
   - `/pages/buyer-application`
   - `/pages/submit-a-listing`
   - `/pages/due-diligence-packs`
   - `/pages/confidentiality-process`
   - `/pages/marketplace-faq`
   - `/pages/marketplace-terms`
   - `/pages/custom-business-build`
   - `/pages/partner-referrals`

9. Build reusable Shopify sections where practical.

   Marketplace work should prefer reusable sections or snippets for hero blocks, pathway cards, offer grids, buyer/seller CTA bands, process steps, and support links. Avoid duplicating large hardcoded blocks across unrelated templates.

10. Keep future work suitable for deployment from GitHub.

    Repository changes should be the source of truth for theme behavior. Avoid making assumptions based only on ad hoc Shopify Admin changes unless a task explicitly provides current exported theme files or store data.

## Important constraints

- Do not modify unrelated pages, templates, snippets, sections, assets, or settings while working on a marketplace-specific task.
- Preserve existing storefront behavior unless the task explicitly asks to change it.
- Keep changes small, reviewable, and easy to roll back.
- Maintain Shopify Liquid, JSON template, and theme schema compatibility.
- Do not add credentials, app secrets, tokens, environment files, generated build artifacts, caches, or local development files.
- Do not assume Shopify Flow workflows or Shopify Forms can be created from the theme code. Those may require Shopify Admin, Sidekick, or backend/app work.
- Do not expand the header navigation into a large marketplace dropdown unless explicitly requested. Marketplace pathway navigation should live inside the marketplace landing page.
- Do not rely on unfinished placeholder content in public-facing UI.
- Preserve accessibility basics: readable contrast, semantic headings, focusable controls, useful link text, and mobile-friendly layouts.
- Avoid broad refactors of the wider RBP storefront when only marketplace fixes are requested.
- When adding JavaScript for marketplace interactivity, prefer progressive enhancement and graceful failure if the bridge endpoint is unavailable.
- Keep mobile layouts in mind. Marketplace pathway cards, filters, search controls, and CTAs should remain usable at small widths.
- Where tests, linting, or Shopify theme checks exist, run them before finalizing changes. If they are unavailable or failing due to existing repository state, report that clearly.

## How Jules should use this file

Before starting future marketplace or Shopify theme implementation tasks, Jules should read this file alongside `AGENTS.md`.

`AGENTS.md` contains the repository-wide working rules. This file provides additional marketplace-specific business context, page context, UX direction, and implementation priorities.

For future tasks, Jules should use this file to understand the intended direction, then rely on the task prompt, issue, pull request, and current repository files for the exact change scope. This file should not be treated as permission to perform broad refactors or unrelated cleanup. It is context, not a blank cheque. Humanity keeps making that mistake, so here we are spelling it out.