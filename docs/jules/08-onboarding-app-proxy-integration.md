# Onboarding, App Proxy, and Page Generation Implementation Brief

## Purpose

This document defines the recommended implementation path for building the RBP onboarding and page-generation system into this Shopify theme repository.

Jules should use this file as the main implementation brief when asked to build onboarding forms, page blueprints, affiliate-link storage, and integration points for the existing Shopify Custom App and Google Cloud backend.

The goal is to use GitHub as the controlled source of truth for definitions and theme code, while the Shopify Custom App and Google Cloud handle private submissions, storage, processing, and secure Shopify Admin API operations.

## Current repository context

This repository is the Shopify storefront theme implementation for Remote Business Partner. It already contains Shopify Online Store 2.0 theme files, Liquid sections, JSON templates, assets, and RBP-specific storefront design work.

Important existing files and areas:

- `AGENTS.md` defines general Jules working rules.
- `docs/jules/` stores task-specific Jules implementation context.
- `content/README.md` defines the content library direction.
- `sections/contact-form.liquid` contains the existing Shopify native contact form.
- `sections/rbp-service-page.liquid` contains the current service page implementation.
- `templates/page.service.json` renders the service page section.
- Product and service template context is documented in existing `docs/jules/` files.

The current service page pattern is largely Liquid-driven and uses page handles to assign service messaging. This is acceptable for current static service pages, but onboarding forms and generated page systems should move toward structured definitions and safer backend handling.

## Recommended architecture

Use this architecture:

```text
GitHub repository
  stores definitions, content templates, page blueprints, public-safe affiliate links, and theme code
        ↓
Shopify theme
  renders pages, forms, CTAs, validation states, and success/error messages
        ↓
Shopify Custom App
  receives submissions through app proxy routes and talks to Shopify Admin API
        ↓
Google Cloud
  stores submissions, processes workflows, sends notifications, and handles private data
```

GitHub should be the blueprint layer. The Shopify theme should be the presentation layer. The Custom App and Google Cloud backend should be the secure processing layer.

Do not store private submissions in GitHub.

## Key rule

The theme must not contain Shopify Admin API tokens, Google Cloud credentials, app secrets, private affiliate URLs, signed URLs, customer data, or submitted onboarding responses.

Those belong in the Custom App and Google Cloud, not in this public theme repository.

## What GitHub should store

GitHub may store:

- Onboarding form definitions.
- Product onboarding templates.
- Service onboarding templates.
- Page blueprints.
- Public-safe affiliate-link records.
- Content templates.
- Theme sections, snippets, assets, and JSON templates.
- Jules implementation documentation.

GitHub must not store:

- Customer onboarding submissions.
- Customer names, emails, phone numbers, or private intake details.
- Uploaded customer documents.
- Shopify Admin API tokens.
- Google Cloud service credentials.
- CRM credentials.
- Private partner links.
- Signed URLs.
- URLs containing tokens, signatures, auth parameters, API keys, or secrets.

## Shopify Custom App role

The existing Shopify Custom App should act as the secure bridge between the storefront and Google Cloud.

The Custom App should handle:

- App proxy request handling.
- Request validation and signature verification.
- Server-side form validation.
- Spam and abuse protection.
- Submission storage in Google Cloud.
- Optional Shopify customer creation or updates.
- Optional customer tagging.
- Optional Shopify metaobject or metafield updates.
- Internal notifications.
- CRM or task-management routing.
- Success and error responses back to the storefront.

The theme should not attempt to call Shopify Admin APIs directly.

## Google Cloud role

Google Cloud should handle:

- Submission storage.
- Backend processing.
- Workflow routing.
- Notification sending.
- Private partner-link storage if needed.
- Logging and error handling.
- Secret storage through an appropriate secret-management system.

Suitable backend services may include Cloud Run, Cloud Functions, Firestore, Cloud SQL, BigQuery, Pub/Sub, Cloud Tasks, and Secret Manager depending on the existing app architecture.

Jules must not assume which Google Cloud services are already deployed unless repository documentation or task instructions confirm them.

## App proxy route pattern

The storefront should submit onboarding forms to a Shopify app proxy route.

Use this placeholder route unless the installed Custom App has a documented different route:

```text
/apps/rbp-onboarding/business-health-check
```

Preferred route pattern:

```text
/apps/rbp-onboarding/{form_id}
```

Examples:

```text
/apps/rbp-onboarding/business-health-check
/apps/rbp-onboarding/service-onboarding
/apps/rbp-onboarding/product-onboarding
```

If the live Shopify app proxy prefix or subpath is different, document the mismatch and make the route configurable in section settings or definition files.

## Repository files to add

When implementing the first full version, add or update these files:

```text
content/onboarding/README.md
content/onboarding/forms/service-onboarding-template.yml
content/onboarding/forms/product-onboarding-template.yml
content/onboarding/forms/business-health-check.yml
content/onboarding/page-blueprints/service-page-template.yml
content/onboarding/page-blueprints/product-page-template.yml
content/onboarding/generated/.gitkeep
content/affiliate-links/README.md
content/affiliate-links/public-affiliate-links.yml
sections/rbp-onboarding-form.liquid
snippets/rbp-onboarding-field.liquid
assets/rbp-onboarding-form.js
assets/rbp-onboarding-form.css
templates/page.onboarding.json
docs/jules/09-content-page-generation.md
docs/jules/10-affiliate-link-management.md
```

Do not modify unrelated product, cart, checkout, header, footer, or global theme behavior unless the implementation task explicitly requires it.

## Onboarding form definition model

Use YAML for source definitions under:

```text
content/onboarding/forms/
```

Example:

```yaml
form_id: business-health-check
title: Business Health Check Onboarding
status: approved

rendering:
  page_handle: business-health-check
  template: page.onboarding
  section: rbp-onboarding-form

submission:
  handler: app_proxy
  method: post
  destination: /apps/rbp-onboarding/business-health-check
  success_redirect: /pages/thank-you
  error_mode: inline

storage:
  system: google_cloud
  create_shopify_customer: true
  customer_tags:
    - onboarding
    - business-health-check

fields:
  - id: business_name
    label: Business name
    type: text
    required: true

  - id: email
    label: Email address
    type: email
    required: true

  - id: phone
    label: Phone number
    type: tel
    required: false

  - id: current_challenge
    label: What is the main challenge?
    type: textarea
    required: true
```

## Field model

Supported first-version field types should include:

- `text`
- `email`
- `tel`
- `textarea`
- `select`
- `checkbox`
- `radio`
- `hidden`

Each field should support:

- `id`
- `label`
- `type`
- `required`
- `placeholder`
- `help_text`
- `options` where relevant
- `validation` where relevant

Do not implement file uploads in the theme unless the Custom App backend is confirmed to support secure upload handling.

## Theme rendering files

Add a Shopify section:

```text
sections/rbp-onboarding-form.liquid
```

This section should:

- Render a scoped RBP onboarding form.
- Use `.rbp-` prefixed classes.
- Include a heading, introduction, field area, submit button, and success/error containers.
- Submit to the configured app proxy route.
- Include hidden metadata fields.
- Provide safe fallbacks if section settings are blank.
- Avoid interfering with the existing `sections/contact-form.liquid` form.

Add a snippet:

```text
snippets/rbp-onboarding-field.liquid
```

This snippet should render supported field types consistently.

Add assets:

```text
assets/rbp-onboarding-form.js
assets/rbp-onboarding-form.css
```

The JavaScript should provide lightweight client-side validation and prevent duplicate submissions where practical. Server-side validation still belongs in the Custom App backend.

Add template:

```text
templates/page.onboarding.json
```

This template should render the onboarding form section and remain valid Shopify Online Store 2.0 JSON.

## Example Liquid form action

The rendered form should follow this pattern:

```liquid
<form
  method="post"
  action="{{ section.settings.app_proxy_path | default: '/apps/rbp-onboarding/business-health-check' }}"
  class="rbp-onboarding-form"
  data-rbp-onboarding-form="{{ section.settings.form_id | default: 'business-health-check' }}"
>
  <input type="hidden" name="form_id" value="{{ section.settings.form_id | default: 'business-health-check' }}">
  <input type="hidden" name="source_page" value="{{ page.handle }}">
  {%- if customer -%}
    <input type="hidden" name="customer_id" value="{{ customer.id }}">
    <input type="hidden" name="customer_email" value="{{ customer.email }}">
  {%- endif -%}

  <!-- generated or configured fields go here -->

  <button type="submit">Submit onboarding request</button>
</form>
```

Avoid hardcoding private URLs or credentials.

## Page generation approach

There are two acceptable models.

### Model A: Theme-driven pages

Use GitHub definitions to generate or guide Shopify theme files:

```text
GitHub YAML definitions
  ↓
Jules or a generator creates Liquid and JSON theme files
  ↓
Shopify GitHub integration syncs the theme files
  ↓
Theme renders the page and form
```

This model is best for the first implementation because it stays within the repository and connected Shopify theme workflow.

### Model B: App-driven Shopify content

Use the Custom App to read definitions and create or update Shopify pages, articles, metaobjects, or metafields:

```text
GitHub YAML definitions
  ↓
Custom App reads or receives definitions
  ↓
Custom App updates Shopify Admin API resources
  ↓
Theme renders Shopify-managed content
```

This model is stronger long term, but Jules should not implement it unless the task explicitly includes Custom App code access and Shopify Admin API credentials/scopes are confirmed outside the repository.

## Affiliate links

Public-safe affiliate links may be stored under:

```text
content/affiliate-links/public-affiliate-links.yml
```

Example structure:

```yaml
links:
  - id: example-partner-offer
    partner: Example Partner
    label: Example public offer
    public_url: https://example.com/?ref=rbp
    status: active
    placements:
      - service_pages
      - blog_posts
    notes: Public-facing referral link only.
```

Do not store private partner links, partner dashboard URLs, signed URLs, tokens, API keys, private invite links, or URLs containing sensitive query parameters.

If private affiliate or partner links are required, document that they must be stored in the Custom App backend or Google Cloud, not in GitHub.

## Store-side requirements to verify

Jules cannot confirm Shopify Admin settings from this repository alone. When implementing, document these required store-side checks:

1. Confirm the installed Shopify Custom App has an app proxy enabled.
2. Confirm the app proxy prefix and subpath.
3. Confirm the app proxy points to the Google Cloud backend.
4. Confirm the Custom App has the required Admin API scopes.
5. Confirm the Google Cloud endpoint can receive POST requests.
6. Confirm the backend verifies Shopify proxy request signatures.
7. Confirm the theme branch is connected to the intended Shopify theme.
8. Confirm whether the connected branch deploys to the live theme or an unpublished test theme.

If any of these cannot be verified from repository files, state that clearly in PR notes.

## First implementation target

The pilot form should be:

```text
Business Health Check onboarding
```

Reason:

- It is service-oriented.
- It fits the existing RBP service-page structure.
- It is safer than starting with product fulfilment or file upload workflows.
- It can prove the app proxy submission path before the system expands.

## Implementation requirements

When Jules implements the first version:

- Read `AGENTS.md` first.
- Keep changes scoped.
- Preserve the existing contact form.
- Preserve existing product, cart, checkout, header, and footer behavior.
- Add the onboarding definition files.
- Add the affiliate-link storage files.
- Add the onboarding Liquid section, field snippet, JS, CSS, and page template.
- Make the app proxy path configurable.
- Use `/apps/rbp-onboarding/business-health-check` as the default placeholder route.
- Include hidden fields for `form_id`, `source_page`, and customer context where available.
- Add basic client-side required-field validation.
- Keep server-side validation assumptions documented for the backend.
- Use scoped `.rbp-` CSS classes.
- Preserve valid Shopify Liquid syntax.
- Preserve valid Shopify Online Store 2.0 JSON template structure.
- Do not add secrets or private data.

## Acceptance criteria

The implementation is acceptable when:

- `content/onboarding/` exists with README, form templates, and a Business Health Check example definition.
- `content/affiliate-links/` exists with README and a public-safe affiliate-link YAML file.
- `sections/rbp-onboarding-form.liquid` renders an onboarding form.
- `snippets/rbp-onboarding-field.liquid` renders supported field types or provides a clear first-version subset.
- `assets/rbp-onboarding-form.js` supports basic validation and submit-state handling.
- `assets/rbp-onboarding-form.css` scopes onboarding form styles safely.
- `templates/page.onboarding.json` renders the onboarding form section.
- The Business Health Check form posts to the configured app proxy route.
- Existing `sections/contact-form.liquid` remains unchanged unless explicitly required.
- Existing service/product/cart/checkout behavior remains unchanged.
- No credentials, private URLs, private customer data, or submitted responses are committed.
- PR notes clearly identify store-side configuration that must be verified in Shopify Admin.

## Non-goals for the first implementation

Do not implement these unless explicitly requested:

- File uploads.
- Payment handling.
- Checkout modification.
- Direct Shopify Admin API calls from the theme.
- Customer data storage in GitHub.
- Full CRM integration.
- Full Google Cloud backend implementation.
- Automatic publishing of all blog, article, and help-center content.
- Broad refactors of service pages or product templates.

## Recommended implementation order

1. Add definitions and documentation.
2. Add the onboarding form section, snippet, JS, CSS, and page template.
3. Wire the Business Health Check pilot form to the app proxy route.
4. Test that the theme renders the form correctly.
5. Confirm the app proxy route in Shopify Admin.
6. Confirm the Google Cloud backend receives POST requests.
7. Confirm backend storage and notification behavior outside the theme repository.
8. Expand the model to other services and product onboarding flows.
9. Add structured page generation once the form submission path is proven.
10. Add controlled affiliate-link rendering only for public-safe links.

## Summary

The best implementation path is:

```text
GitHub definitions + Shopify theme rendering + Custom App app proxy + Google Cloud backend
```

GitHub should define and render the system. The Shopify Custom App should receive and validate submissions. Google Cloud should store and process private data. Shopify Admin API operations should happen only from the backend, never from public theme code.

This keeps the repository useful for Jules while avoiding the deeply cursed option of turning GitHub into a public drawer full of customer intake data and private partner links.
