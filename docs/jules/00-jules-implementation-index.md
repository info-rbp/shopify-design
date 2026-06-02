# Jules Implementation Index

## Purpose

This file is the routing map for Jules and future code agents working in this repository.

Read this file after `AGENTS.md` and before making task-specific changes. The purpose is to help Jules choose the correct context files under `docs/jules/` instead of reading one narrow brief and accidentally ignoring the rest of the system like a tiny markdown-powered menace.

## Always read first

For every repository task, read:

```text
AGENTS.md
docs/jules/00-jules-implementation-index.md
```

`AGENTS.md` defines general repository working rules. This file defines which supporting context documents are relevant for each type of task.

## Critical bridge integration rule

For any storefront-to-backend, app-proxy, onboarding, lead capture, Business NBN, marketplace enquiry, order-intent, or Google Cloud integration task, read this file before all older app-proxy examples:

```text
docs/jules/15-bridge-to-google-cloud-integration.md
```

The production installed Shopify app is:

```text
Bridge to Google Cloud
```

The default storefront app proxy path is:

```text
/apps/rbp-bridge
```

Do not use `/apps/rbp-onboarding` as the default route. Older examples using `/apps/rbp-onboarding/business-health-check` are superseded by `15-bridge-to-google-cloud-integration.md` unless Shopify Admin or a future task explicitly confirms a different live route.

## General working rules

Jules should:

- Keep changes scoped to the requested task.
- Avoid broad refactors unless the task explicitly asks for them.
- Preserve existing Shopify theme behavior unless the task requires a change.
- Preserve valid Shopify Liquid syntax.
- Preserve valid Shopify Online Store 2.0 JSON template structure.
- Avoid changing header, footer, cart, checkout, account, or product templates unless relevant to the task.
- Avoid committing secrets, access tokens, API keys, private partner URLs, signed URLs, customer data, submitted form responses, generated build output, or local environment files.
- Report assumptions, changed files, validation steps, and skipped checks in the final response or pull request notes.

## Task routing table

Use this table to decide which files to read.

| Task type | Read these files |
|---|---|
| General Shopify storefront UX/UI | `shopify-ui-ux-project-overview.md` |
| General repository/project context | `project-overview.md`, `project-context.md`, and `shopify-ui-ux-project-overview.md` |
| Product templates, product pages, product-state behavior, metafields, metaobjects | `shopify-product-template-context.md` and `12-data-model-registry.md` |
| Service onboarding and intake forms | `services-onboarding-forms-context.md`, `08-onboarding-app-proxy-integration.md`, `15-bridge-to-google-cloud-integration.md`, `10-custom-app-backend-contract.md`, and `11-shopify-store-configuration-checklist.md` |
| Nucleus templates, documentation suites, toolkits, onboarding form links | `nucleus-onboarding-forms-context.md`, `shopify-product-template-context.md`, `08-onboarding-app-proxy-integration.md`, and `15-bridge-to-google-cloud-integration.md` |
| Content library, blog posts, articles, help center items | `07-content-management.md`, `08-content-library-and-affiliate-links.md`, and `09-content-page-generation.md` |
| Affiliate links and public partner offer references | `07-content-management.md`, `08-content-library-and-affiliate-links.md`, `09-content-page-generation.md`, and `12-data-model-registry.md` |
| Partner Offers, offer categories, offer pages, CTA URLs | `project-context.md`, `marketplace-project-overview.md`, `08-content-library-and-affiliate-links.md`, `12-data-model-registry.md`, and `15-bridge-to-google-cloud-integration.md` when any backend or lead-capture route is involved |
| Marketplace hub, buyer/seller paths, Business-In-A-Box, asset sales | `marketplace-project-overview.md`, `project-context.md`, `12-data-model-registry.md`, and `15-bridge-to-google-cloud-integration.md` when any backend route is involved |
| Membership pages, member benefits, application-first signup, member resources | `membership-section-project-context.md`, `customer-account-portal-context.md`, `14-copy-and-conversion-rules.md`, and `15-bridge-to-google-cloud-integration.md` when application forms use the backend |
| Business NBN | `business-nbn-shopify-context.md`, `15-bridge-to-google-cloud-integration.md`, `10-custom-app-backend-contract.md`, and `11-shopify-store-configuration-checklist.md` |
| Business Finance and Business Insurance | `business-finance-insurance-project-context.md`, `08-onboarding-app-proxy-integration.md`, `15-bridge-to-google-cloud-integration.md`, and `14-copy-and-conversion-rules.md` |
| Real Estate / Property Field Services booking | `real-estate-booking-project-context.md`, `15-bridge-to-google-cloud-integration.md`, `10-custom-app-backend-contract.md`, and `11-shopify-store-configuration-checklist.md` |
| Customer account, member portal, post-purchase support | `customer-account-portal-context.md`, `shopify-product-template-context.md`, and `14-copy-and-conversion-rules.md` |
| App proxy, Custom App, Google Cloud backend integration | `15-bridge-to-google-cloud-integration.md`, `08-onboarding-app-proxy-integration.md`, `10-custom-app-backend-contract.md`, and `11-shopify-store-configuration-checklist.md` |
| SEO changes | `shopify-seo-implementation-plan.md` plus the relevant page/product/content context files |
| Testing, validation, deployment readiness | `13-testing-and-deployment-checklist.md` plus the task-specific context files |
| Customer-facing copy, CTA wording, fulfilment wording | `14-copy-and-conversion-rules.md` plus the task-specific context files |

## Known context files

Current `docs/jules/` guidance includes:

```text
docs/jules/07-content-management.md
docs/jules/08-content-library-and-affiliate-links.md
docs/jules/08-onboarding-app-proxy-integration.md
docs/jules/business-finance-insurance-project-context.md
docs/jules/business-nbn-shopify-context.md
docs/jules/customer-account-portal-context.md
docs/jules/marketplace-project-overview.md
docs/jules/membership-section-project-context.md
docs/jules/nucleus-onboarding-forms-context.md
docs/jules/project-context.md
docs/jules/project-overview.md
docs/jules/real-estate-booking-project-context.md
docs/jules/services-onboarding-forms-context.md
docs/jules/shopify-product-template-context.md
docs/jules/shopify-seo-implementation-plan.md
docs/jules/shopify-ui-ux-project-overview.md
```

Coordination documents added for implementation governance:

```text
docs/jules/00-jules-implementation-index.md
docs/jules/09-content-page-generation.md
docs/jules/10-custom-app-backend-contract.md
docs/jules/11-shopify-store-configuration-checklist.md
docs/jules/12-data-model-registry.md
docs/jules/13-testing-and-deployment-checklist.md
docs/jules/14-copy-and-conversion-rules.md
docs/jules/15-bridge-to-google-cloud-integration.md
```

## Numbering note

There are two existing files beginning with `08-`:

```text
docs/jules/08-content-library-and-affiliate-links.md
docs/jules/08-onboarding-app-proxy-integration.md
```

Do not rename these unless a task explicitly asks for repository cleanup. Use this index to avoid confusion.

## How to resolve conflicting guidance

When two files appear to conflict, use this order of authority:

1. The current user task or issue description.
2. `AGENTS.md`.
3. This implementation index.
4. `15-bridge-to-google-cloud-integration.md` for app proxy, Custom App, Cloud Run, bridge, and Google Cloud routing details.
5. The most specific task context file.
6. Broader project overview files.
7. Older contextual notes.

If there is still ambiguity, make the smallest safe change and document the assumption.

## Common implementation boundaries

Do not implement these unless the task explicitly asks for them:

- Shopify Admin API calls from theme Liquid or browser JavaScript.
- Storage of submissions in GitHub.
- Storage of credentials in the repository.
- File uploads through a theme form without backend confirmation.
- Checkout changes.
- Customer Account UI extensions.
- Google Cloud backend code when only the theme repository is available.
- Full content publishing automation when the task only asks for content storage.
- A new Shopify app when the installed `Bridge to Google Cloud` app should be used.
- Direct Cloud Run calls from browser-facing theme code.

## Expected final response or PR notes

For any implementation task, Jules should report:

- Summary of changes.
- Files changed.
- Relevant context files read.
- Validation performed.
- Store-side checks that could not be verified from the repository.
- Assumptions made.
- Any skipped checks or recommended follow-up work.
- Whether `Bridge to Google Cloud` and `/apps/rbp-bridge` were used for backend-facing storefront submissions where applicable.
