# Testing and Deployment Checklist

## Purpose

This checklist defines how Jules should validate Shopify theme, content, onboarding, app proxy, and storefront changes before calling a task complete.

The repository may not always have a full local build or automated test suite. That does not mean validation can be replaced by vibes and optimism, the twin engines of avoidable outages.

## Use this checklist when

Use this file for tasks involving:

- Liquid sections.
- Shopify JSON templates.
- Snippets.
- Assets and JavaScript.
- CSS changes.
- Product templates.
- Page templates.
- Content generation.
- Affiliate links.
- Onboarding forms.
- App proxy routes.
- Marketplace, membership, Business NBN, finance, insurance, real estate booking, or customer account work.

## General validation principles

Jules should:

- Read `AGENTS.md` first.
- Read relevant `docs/jules/` files.
- Keep changes scoped.
- Validate syntax and structure.
- Avoid unrelated theme changes.
- Preserve existing user flows.
- Report checks performed.
- Report checks skipped and why.
- List store-side checks that cannot be verified from the repository.

## Repository safety checklist

Before finalizing, check:

- [ ] No credentials were added.
- [ ] No Shopify Admin API tokens were added.
- [ ] No Google Cloud credentials were added.
- [ ] No private customer data was added.
- [ ] No submitted form responses were added.
- [ ] No private partner links were added.
- [ ] No signed URLs were added.
- [ ] No generated build caches or local environment files were added.
- [ ] No unrelated files were changed.
- [ ] Existing content front matter was preserved unless the task required changes.

## Liquid validation checklist

For Liquid files:

- [ ] Liquid tags are opened and closed correctly.
- [ ] `if`, `case`, `for`, `capture`, `form`, and `schema` blocks are balanced.
- [ ] Variables use safe fallbacks where data may be blank.
- [ ] Customer, product, page, collection, and cart objects are checked before use where needed.
- [ ] No Shopify Admin API token or private backend URL is present.
- [ ] No browser-visible hidden field contains secrets.
- [ ] Existing Shopify-native forms remain intact unless explicitly changed.
- [ ] Section schema remains valid JSON between `{% schema %}` and `{% endschema %}`.
- [ ] New section settings have safe defaults.
- [ ] New section settings have clear labels.
- [ ] New class names are scoped, preferably with `.rbp-` prefixes.

## JSON template validation checklist

For Shopify JSON templates:

- [ ] JSON is valid.
- [ ] Top-level `sections` and `order` structure is valid for Shopify Online Store 2.0.
- [ ] Section IDs referenced in `order` exist in `sections`.
- [ ] Section `type` values match actual section filenames.
- [ ] Template names and suffixes match intended Shopify assignment.
- [ ] No comments are inserted into JSON files.
- [ ] Existing Shopify-generated structure is preserved where possible.
- [ ] Unrelated template sections were not removed.

## Section schema checklist

For section schema changes:

- [ ] Schema JSON is valid.
- [ ] Setting IDs are unique within the section.
- [ ] Setting IDs use lowercase and underscores where practical.
- [ ] Defaults are safe and not private.
- [ ] URLs are configurable if environment-specific.
- [ ] Presets are included only where useful.
- [ ] Blocks are defined when repeated content is needed.
- [ ] Schema labels are clear for Shopify Admin users.

## CSS checklist

For CSS changes:

- [ ] CSS is scoped to the relevant component or section.
- [ ] `.rbp-` prefixed classes are used for RBP-specific styles.
- [ ] Broad selectors such as `button`, `a`, `section`, or `input` are avoided unless intentionally scoped.
- [ ] Mobile layout is considered.
- [ ] Touch targets are usable.
- [ ] Text contrast is not reduced.
- [ ] Focus states are preserved or improved.
- [ ] Styles do not break Shopify base components.
- [ ] Styles do not globally alter header, footer, product cards, cart, or checkout-adjacent UI unless requested.

## JavaScript checklist

For JavaScript changes:

- [ ] Code is scoped to the relevant component.
- [ ] It does not pollute the global namespace unnecessarily.
- [ ] It checks elements exist before using them.
- [ ] It handles missing backend routes gracefully.
- [ ] It does not expose secrets.
- [ ] It does not call Shopify Admin APIs directly.
- [ ] It handles duplicate submit prevention where relevant.
- [ ] It re-enables submit controls after errors.
- [ ] It displays usable error messages.
- [ ] It does not break non-JavaScript form fallback unless the task explicitly accepts that.

## Onboarding form checklist

For onboarding forms:

- [ ] Correct form ID is used.
- [ ] App proxy path is configurable or documented.
- [ ] Required fields are marked.
- [ ] Labels are accessible.
- [ ] Error messages are accessible.
- [ ] Success message or redirect behavior is defined.
- [ ] Hidden fields contain only non-secret metadata.
- [ ] Customer context is included only when available.
- [ ] Server-side validation is assumed to belong to the backend.
- [ ] Private submissions are not committed to GitHub.
- [ ] File uploads are not implemented unless backend support is confirmed.

## App proxy and backend checklist

For app proxy routes:

- [ ] Route path is documented.
- [ ] Route path is configurable where practical.
- [ ] Expected request fields are documented.
- [ ] Expected success response is documented.
- [ ] Expected error response is documented.
- [ ] Backend verification is documented as a store-side requirement if not confirmed.
- [ ] Theme fails gracefully if backend is unavailable.
- [ ] No private backend origin URL is hardcoded into public theme code.

## Content checklist

For content changes:

- [ ] Correct content folder is used.
- [ ] Correct template is used where available.
- [ ] Front matter is valid YAML.
- [ ] `title`, `slug`, `status`, and `content_type` are present where required.
- [ ] Status is one of `draft`, `review`, `approved`, `published`, or `archived`.
- [ ] No private customer data is included.
- [ ] No private partner links are included.
- [ ] SEO fields are included where relevant.
- [ ] Content is scoped to one clear topic.
- [ ] Customer-facing copy follows `14-copy-and-conversion-rules.md`.

## Affiliate link checklist

For affiliate or partner links:

- [ ] Link is intended to be public-facing.
- [ ] `public_safe` is set or task confirms public use.
- [ ] Link does not contain `token`, `access_token`, `secret`, `signature`, `api_key`, `password`, `auth`, or private invite codes.
- [ ] Link does not point to a private partner dashboard.
- [ ] Link status is clear.
- [ ] Placement is clear.
- [ ] Unsafe or missing links are not rendered as launch-ready CTAs.

## Product template checklist

For product template changes:

- [ ] Product family is clear.
- [ ] Template suffix is correct.
- [ ] Required metafields are documented.
- [ ] Fallback behavior is safe.
- [ ] Purchase, enquiry, onboarding, or booking CTA behavior matches the product model.
- [ ] Cart messaging remains consistent.
- [ ] Fulfilment copy does not imply instant delivery where onboarding, review, or setup is required.
- [ ] Variant behavior is preserved.
- [ ] Add-to-cart or checkout behavior is not changed unless requested.

## Cart and checkout-adjacent checklist

For cart or checkout-adjacent changes:

- [ ] Cart drawer and cart page remain usable.
- [ ] Product titles, variants, quantities, and pricing still display.
- [ ] Checkout buttons still work.
- [ ] Guidance text does not block checkout.
- [ ] Guidance text matches fulfilment model.
- [ ] No checkout customization is attempted from the theme unless Shopify supports it and the task explicitly asks.

## Customer account checklist

For account or member portal work:

- [ ] Logged-out behavior is clear.
- [ ] Logged-in behavior is clear.
- [ ] Customer tag checks fail safely.
- [ ] Member states are not exposed incorrectly.
- [ ] Order support links are clear.
- [ ] Resource access messaging is clear.
- [ ] No private account data is exposed to other customers.
- [ ] Classic account vs new customer account limitations are documented.

## Business NBN checklist

For Business NBN work:

- [ ] Address checks are described as preliminary unless confirmed by backend.
- [ ] Serviceability wording is cautious.
- [ ] Legal/support pages are linked only if handles are known or documented.
- [ ] Plan terms are not hardcoded unless confirmed.
- [ ] GST treatment is not changed unless requested.
- [ ] App proxy route assumptions are documented.

## Real estate booking checklist

For real estate booking work:

- [ ] Booking-first, checkout-second model is preserved.
- [ ] Availability is not faked.
- [ ] Time category pricing is not hardcoded incorrectly.
- [ ] Public holiday logic is not assumed in the theme unless provided.
- [ ] Checkout or draft order creation remains backend-owned.
- [ ] Fulfilment wording reflects service delivery.

## Marketplace checklist

For marketplace work:

- [ ] Marketplace is treated as a broader hub, not only partner offers, unless the task is offer-specific.
- [ ] Partner offer CTAs use safe public URLs only.
- [ ] Offer pages or cards have fallbacks for missing data.
- [ ] Offer categories remain clear.
- [ ] Buyer, seller, due diligence, custom build, and partner referral pathways are not removed accidentally.

## Membership checklist

For membership work:

- [ ] Premium Membership positioning is preserved.
- [ ] Application-first signup remains clear.
- [ ] NBN inclusion is described as part of paid membership and subject to eligibility/serviceability.
- [ ] Generic tier language is not reintroduced unless confirmed.
- [ ] Member benefit and resource links are consistent.
- [ ] Account/member portal behavior remains aligned.

## Manual smoke test suggestions

When possible, manually inspect or report that these need to be inspected:

- Homepage.
- Header navigation.
- Footer navigation.
- A standard product page.
- An on-demand service product page.
- A service page using `page.service`.
- Cart page or cart drawer.
- Contact page.
- Onboarding page if added.
- Marketplace page if touched.
- Mobile viewport.

## Final response requirements

Every implementation response should include:

```text
Summary
Files changed
Validation performed
Store-side checks required
Assumptions
Skipped checks or follow-up work
```

If no validation could be run, say so clearly and explain why.

## Summary

Testing in this repo means more than checking that a file exists. Validate Liquid, JSON, schema, styling scope, JavaScript behavior, copy accuracy, data safety, and store-side assumptions. Tedious? Yes. Better than a live storefront breaking because a form tried to become a backend? Also yes.
