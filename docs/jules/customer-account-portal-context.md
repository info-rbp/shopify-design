## Purpose

This repository contains the Shopify storefront theme implementation for Remote Business Partner (RBP). It appears to hold the code and configuration for a Shopify Online Store 2.0 theme, including Liquid sections, JSON templates, customer account templates, page templates, theme assets, storefront navigation, product presentation, cart guidance, and RBP-specific design-system work.

This file gives Google Jules high-level project context for future account portal and member portal fixes. It should help Jules understand which pages, templates, sections, and account-related elements are relevant before making repository changes.

This file is not a request to implement every item in one pass. It is orientation material for future scoped work.

## Business context

Remote Business Partner is an Australian business support platform. The Shopify store is being developed to explain, sell, and route customers toward business services, memberships, resources, support pathways, document products, Business NBN pathways, marketplace-style offers, and future operational modules.

The customer account and member portal experience is important because many RBP products are not simple retail items. Customers may need to:

- Review orders and purchase history.
- Understand next steps after purchasing document products, toolkits, services, or memberships.
- Access Premium Member benefits and member-only pathways.
- Find order support, document status guidance, payment-plan support, and Help Centre routes.
- Understand whether they are a visitor, applicant, approved member, active member, suspended member, or cancelled member.
- Navigate from Shopify account features into RBP-specific support and service journeys.

The account area should become a post-purchase operating hub. It should not be treated as only an order-history screen. The business goal is to make the logged-in customer experience clear enough that customers know what they bought, what happens next, what they can access, and how to get help.

Membership is especially important. The RBP Premium Membership model needs account-aware messaging, benefits guidance, resource access, support routing, and eventual customer-specific or member-specific content. Some of this can be supported in theme files, but a true Shopify new customer account portal page may require customer account UI extension work outside normal theme Liquid.

## Application context

This repository appears to contain a Shopify Online Store 2.0 theme based on Shopify's Refresh structure, with RBP-specific custom sections and page templates layered on top.

Relevant current account and member portal files include:

- `templates/customers/account.json` for the classic Shopify customer account template inside the theme.
- `sections/rbp-account-dashboard-guidance.liquid` for account dashboard guidance shown above the native account order area.
- `sections/main-account.liquid` for Shopify's native customer account/order-history area, if present in the theme.
- `templates/page.member-portal.json` for the theme page template that renders the RBP member portal shell.
- `sections/rbp-member-portal-page.liquid` for the member portal page experience, lifecycle states, gated member resource messaging, and support route cards.
- `templates/page.member-benefits.json` for the member benefits page template. At the time this context was created, this template should be reviewed because it may point at a broader membership section rather than the member portal section.
- `sections/rbp-membership-page.liquid` for the public-facing membership page and member benefits style content.
- `sections/rbp-membership-model.liquid` for membership model content and supporting presentation.
- `templates/page.membership.json`, `templates/page.membership-overview.json`, `templates/page.membership-signup.json`, and `templates/page.membership-faq.json` for public membership pathways.
- `sections/rbp-help-center.liquid` and any related help/support sections for support routing.
- `sections/rbp-order-account-guidance.liquid`, if used, for order/account guidance related to post-purchase flows.
- `sections/rbp-cart-guidance.liquid` and `sections/rbp-cart-drawer-guidance.liquid` for cart-level guidance that should stay consistent with account/order support messaging.
- `sections/rbp-header.liquid`, `sections/rbp-footer.liquid`, `sections/header-group.json`, and `sections/footer-group.json` for global access points and navigation consistency.
- `sections/rbp-nav-fixes.liquid` where account, menu, or navigation behaviour may have been stabilised.
- `sections/rbp-resource-library.liquid` for resource library presentation and future member-resource alignment.
- `sections/rbp-business-nbn.liquid`, `sections/rbp-applications-hub.liquid`, `sections/rbp-marketplace-offers.liquid`, and `sections/rbp-core-services-landing.liquid` where account routes may need to align with broader RBP service journeys.

Important storefront pages and routes likely related to the account/member experience include:

- `/account` for Shopify customer account access.
- `/pages/member-benefits` for Premium Member benefits.
- `/pages/member-resources` for gated or member-only resource guidance.
- `/pages/account-support` for customer account support.
- `/pages/order-support` for order support and post-purchase help.
- `/pages/document-order-status` for document product status and fulfilment expectations.
- `/pages/payment-plan-support` for Shopify Subscriptions/payment-plan guidance.
- `/pages/help-centre` or `/pages/help-center`, depending on the final handle used in the store.
- `/pages/membership`, `/pages/membership-options`, `/pages/inclusions`, and `/pages/sign-up-today` for public membership education and conversion.
- `/pages/applications`, `/pages/business-nbn`, `/pages/marketplace`, `/pages/offers`, `/pages/core-services`, and `/pages/custom-solutions` for wider RBP journeys that may link into account or support flows.
- `/cart` and product pages, because post-purchase expectations should match product and cart messaging.

Theme-side account work currently appears to use customer tags to determine member state. Examples include tags such as:

- `Premium Member`
- `rbp-premium-active`
- `rbp-premium-approved`
- `rbp-premium-applied`
- `rbp-premium-suspended`
- `rbp-premium-cancelled`

Jules should treat these tags as implementation clues, not final policy. Future work may replace or supplement tags with customer metafields, app-owned customer data, or Shopify customer account UI extension data.

Important distinction: Shopify's new customer accounts are not fully controlled by Online Store theme Liquid. Theme files such as `templates/customers/account.json` affect classic/theme customer account pages. A true page inside Shopify's new customer account portal generally requires a customer account UI extension or an app-powered customer account page. Theme-side pages can still support account and membership journeys, but they are not the same as native new customer account portal pages.

## Key goals

Future account/member portal work should keep these goals in mind:

1. Create a clear logged-in customer hub.
   - The account experience should help customers understand orders, membership status, document next steps, resources, payment-plan guidance, and support routes.
   - The account page should not be only a generic order-history view.
   - If the store uses new customer accounts, any true in-account custom page should be planned as a customer account UI extension or app page rather than only a Liquid theme page.

2. Stabilise member lifecycle messaging.
   - Visitors, non-members, applied customers, approved customers, active members, restricted members, suspended members, and cancelled members should receive clear, different guidance.
   - Member-only content should not appear as fully available to non-members.
   - Restricted or pending states should point to support or activation pathways instead of dead ends.

3. Make Premium Member benefits easy to find.
   - The Member Benefits page should clearly explain active benefits, support expectations, access pathways, resource availability, order support, document support, and upgrade or activation paths.
   - If `/pages/member-benefits` uses `templates/page.member-benefits.json`, confirm that the assigned section matches the intended member benefits experience.
   - Avoid duplicating conflicting membership content across membership public pages and logged-in/member pages.

4. Align account, cart, product, and support messaging.
   - Product pages, cart guidance, order support, document status, and account dashboard copy should all describe fulfilment consistently.
   - Do not describe products as instant downloads unless the product is genuinely delivered instantly.
   - For document products, services, NBN pathways, bookings, or manual review items, use accurate language around onboarding, preparation, review, support, serviceability, or next steps.

5. Keep navigation clear.
   - Account-related cards and links should use stable, customer-friendly labels such as Member Benefits, Member Resources, Order Support, Document Order Status, Payment Plans, Help Centre, and Account Support.
   - Avoid vague labels such as Management Page unless a task specifically requires that wording.
   - Header/footer/account navigation should not introduce duplicated or contradictory routes.

6. Prepare for a proper new customer account portal.
   - Repository changes may support theme-side account pages, but Jules should document when a task actually requires Shopify admin configuration, app extension work, customer account UI extension work, or customer data setup outside the repository.
   - If a future task asks for a native page inside the Shopify customer account portal, check whether the repository contains the app or extension code required to implement it. Do not assume a theme Liquid section can create a native new customer account page.

7. Keep the implementation mobile-safe.
   - Account and member portal cards should stack cleanly on mobile.
   - Avoid horizontal scrolling, clipped text, overlapping buttons, or wide grids that break around 390px, 430px, and 768px widths.
   - Preserve accessible labels, clear headings, readable contrast, and tappable CTAs.

8. Preserve existing Shopify behaviour.
   - Native order history, addresses, login, account profile, cart, product forms, and checkout routes must keep working.
   - Do not replace Shopify-native account behaviour with static content.
   - Do not hide or remove native Shopify sections unless a task explicitly requires it.

Account/member portal work likely still needing completion or review includes:

- Confirm whether the live store uses classic customer accounts, new customer accounts, or both during transition.
- Confirm whether `templates/customers/account.json` is still used by the live customer account experience.
- Review `sections/rbp-account-dashboard-guidance.liquid` for final member lifecycle logic, route handles, mobile layout, and whether customer tag names match the admin data model.
- Review `sections/rbp-member-portal-page.liquid` for final access-control copy, lifecycle states, support routes, gated resource behaviour, and mobile layout.
- Review `templates/page.member-benefits.json` and confirm whether it should render `rbp-membership-page` or `rbp-member-portal-page`.
- Confirm that pages such as `/pages/account-support`, `/pages/order-support`, `/pages/document-order-status`, `/pages/payment-plan-support`, and `/pages/member-resources` exist in Shopify admin and use the correct template.
- Confirm whether `/pages/help-centre` or `/pages/help-center` is the final canonical handle, then update internal links consistently if required by a scoped task.
- Add or refine member-only resource handling if the repository is responsible for that logic.
- Ensure account dashboard links do not point to unpublished, missing, or incorrectly templated pages.
- Consider moving repeated portal CSS into a shared asset only if a scoped task asks for CSS consolidation.
- Document any required Shopify admin work that cannot be completed from repository changes alone, such as customer account menu configuration, customer tags, customer metafields, metaobject entries, or customer account UI extension activation.

## Important constraints

Jules should follow these constraints when making future changes:

- Read `AGENTS.md` before making changes.
- Read this file before working on account, member portal, customer account, membership support, order support, document status, payment plan support, or member resource tasks.
- Keep changes scoped to the requested task.
- Do not modify unrelated Jules context files unless the task explicitly asks for documentation updates.
- Do not rewrite unrelated product, collection, homepage, header, footer, cart, or CSS systems.
- Preserve existing Shopify Online Store 2.0 JSON template structure.
- Preserve valid Liquid syntax and avoid assumptions that every customer, page, product, tag, or metafield exists.
- Do not remove native Shopify account, order, address, login, profile, checkout, cart, or product-form behaviour.
- Do not treat theme Liquid as equivalent to Shopify new customer account UI extension development.
- Use `.rbp-` prefixed classes for RBP-specific components when adding new theme markup or styles.
- Avoid broad CSS selectors that accidentally affect Shopify base components.
- Keep account/member cards, grids, and CTAs responsive at mobile widths.
- Do not introduce credentials, private keys, customer data exports, generated build artifacts, local environment files, dependency caches, or secrets.
- Do not hard-code sensitive customer information or business-only operational data into theme files.
- Use customer tags or metafields carefully, with safe fallbacks for missing data.
- Do not create access-control illusions. If content is genuinely sensitive, confirm whether repository-side Liquid gating is sufficient or whether app/server-side control is required.
- Keep changes small and reviewable.
- If validation, lint, theme check, or build commands exist, run the relevant checks where practical and report results.
- If a task requires Shopify admin configuration, live theme assignment, customer account menu changes, customer metafield definitions, app extension deployment, or page creation in Shopify admin, report that clearly in the final notes.

## How Jules should use this file

Jules should read this file alongside `AGENTS.md` before starting future implementation tasks related to the customer account, account dashboard, member portal, member benefits, member resources, order support, document order status, payment-plan support, Help Centre routing, or account-linked navigation.

`AGENTS.md` defines the repository working rules. This file provides the RBP account/member portal context behind those rules.

For future tasks, Jules should use this file to understand:

- What this Shopify theme repository is intended to support.
- Why the account and member portal experience matters commercially.
- Which theme files, templates, sections, and routes are likely relevant.
- Which account behaviours are theme-side and which may require Shopify customer account UI extension or admin configuration.
- Which member lifecycle states and customer tags currently appear to matter.
- Which pages and support pathways should stay consistent.
- Which constraints prevent broad, unrelated, or Shopify-incompatible changes.

This file should guide implementation judgement, not replace the specific task prompt. If a future task gives narrower instructions, Jules should follow that task first, then use `AGENTS.md` and this context file to avoid accidental architectural drift, duplicate account pathways, broken member states, or theme changes that cannot actually control Shopify's new customer account portal.
