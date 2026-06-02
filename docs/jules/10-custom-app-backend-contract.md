# Custom App Backend Contract

## Purpose

This file defines the expected contract between the Shopify theme, the installed Shopify Custom App, and the Google Cloud backend.

Jules should use this file when implementing theme forms, app proxy submissions, onboarding workflows, marketplace enquiries, Business NBN checks, real estate booking flows, or any storefront feature that needs to send data to the RBP backend.

This file is a contract for theme-side implementation. It does not confirm that the backend routes already exist. If a route is not confirmed by repository files or task instructions, make it configurable and document the assumption.

## Architecture

The expected integration model is:

```text
Shopify theme
  renders the user interface and submits requests
        ->
Shopify app proxy route
  forwards storefront requests to the Custom App
        ->
Custom App / Google Cloud backend
  validates, stores, routes, and performs secure Shopify Admin API operations
```

The theme must not call Shopify Admin APIs directly.

The theme must not contain access tokens, API keys, Google Cloud credentials, app secrets, private partner links, signed URLs, customer submissions, or private customer data.

## Known or expected app proxy paths

Existing project context references an RBP bridge path:

```text
/apps/rbp-bridge
```

The onboarding implementation brief proposes a default onboarding route:

```text
/apps/rbp-onboarding/business-health-check
```

Preferred onboarding route pattern:

```text
/apps/rbp-onboarding/{form_id}
```

Possible bridge route patterns:

```text
/apps/rbp-bridge/api/check-address
/apps/rbp-bridge/api/marketplace-enquiry
/apps/rbp-bridge/api/onboarding/{form_id}
/apps/rbp-bridge/api/business-nbn/check-address
/apps/rbp-bridge/api/booking/availability
```

If the live Shopify Custom App uses a different proxy prefix or subpath, use section settings, theme settings, or definition files to make the route configurable.

Do not hardcode a private backend origin URL into theme files.

## Route ownership

The Custom App and backend should own:

- Signature or proxy request verification.
- Server-side validation.
- Spam and abuse protection.
- Submission storage.
- Shopify Admin API calls.
- Customer creation or updates.
- Customer tagging.
- Metaobject or metafield creation and updates.
- Email or notification sending.
- CRM, task, or workflow routing.
- Error logging.
- Secure handling of private affiliate or partner links.

The Shopify theme should own:

- Form rendering.
- Public-facing copy.
- Client-side required field validation.
- Submit button state.
- Success and error display.
- Accessible labels and error messages.
- Passing non-secret metadata such as form ID and source page.

## Standard form submission method

Use standard HTML form submission when possible.

Recommended form attributes:

```liquid
<form
  method="post"
  action="{{ section.settings.app_proxy_path }}"
  class="rbp-onboarding-form"
  data-rbp-form-id="{{ section.settings.form_id }}"
>
```

For progressive enhancement, JavaScript may intercept the submit and use `fetch`, but the form should still be understandable as a normal POST form.

## Required hidden fields

All app-proxy forms should include these fields where relevant:

```text
form_id
source_page
source_url
source_template
customer_id
customer_email
product_id
product_handle
variant_id
```

Only include customer fields when the `customer` object is available in Liquid.

Do not include private tokens or app secrets in hidden fields. Hidden fields are visible to users. This remains surprising to people, somehow.

## Standard onboarding payload

A first-version onboarding form should submit fields like:

```text
form_id=business-health-check
source_page=business-health-check
business_name=Example Business
email=client@example.com
phone=0400000000
current_challenge=Need support reviewing operations
```

The backend should treat all submitted fields as untrusted input and validate server-side.

## Standard success response

If the theme uses JavaScript submission, the backend should return a JSON response in this general shape:

```json
{
  "ok": true,
  "message": "Submission received.",
  "redirect": "/pages/thank-you",
  "submission_id": "optional-reference"
}
```

The theme should:

- Show the `message` if no redirect is provided.
- Redirect to `redirect` if provided and appropriate.
- Avoid exposing internal submission IDs unless the UX requires a public reference.

## Standard validation error response

If validation fails, the backend should return:

```json
{
  "ok": false,
  "message": "Please complete the required fields.",
  "errors": {
    "email": "Email is required.",
    "business_name": "Business name is required."
  }
}
```

The theme should:

- Show the general `message`.
- Attach field-specific errors to matching fields when possible.
- Keep the user-entered values visible unless a security rule requires clearing them.
- Re-enable the submit button after an error.

## Standard server error response

For unexpected errors, the backend may return:

```json
{
  "ok": false,
  "message": "We could not process the request right now. Please try again."
}
```

The theme should show a friendly error and not expose stack traces, backend route details, secret names, or infrastructure details.

## Redirect behavior

For standard HTML form submission, the backend may redirect to a success or thank-you page.

For JavaScript submission, the backend may return a `redirect` value.

Recommended success page pattern:

```text
/pages/thank-you
/pages/onboarding-received
/pages/business-health-check-submitted
```

Use existing Shopify pages if they are confirmed. Do not create or link to non-existent pages without documenting the assumption.

## Business NBN address check contract

For Business NBN address or serviceability checks, the theme should not claim confirmed serviceability unless the backend confirms it.

Recommended request fields:

```text
address_line_1
suburb
state
postcode
business_name
email
plan_interest
```

Recommended response fields:

```json
{
  "ok": true,
  "status": "received_for_review",
  "message": "Address submitted for review.",
  "next_step": "RBP will confirm serviceability before activation."
}
```

Avoid wording such as `approved`, `available`, or `confirmed` unless the backend genuinely confirms serviceability.

## Marketplace enquiry contract

Marketplace enquiry forms should submit to the backend rather than storing private enquiry details in GitHub.

Recommended fields:

```text
form_id
marketplace_pathway
business_name
contact_name
email
phone
enquiry_type
message
```

The backend may create a marketplace enquiry record, route to CRM, or notify the team.

## Real estate booking contract

Real estate and property field service booking flows may require:

- Address validation.
- Serviceability review.
- Appointment availability.
- Price category selection.
- Draft order or checkout creation.
- Booking hold.

The theme should not fake confirmed availability. If backend availability is unavailable, show a review-based fallback.

Recommended route concepts:

```text
/apps/rbp-bridge/api/booking/availability
/apps/rbp-bridge/api/booking/request
/apps/rbp-bridge/api/booking/checkout
```

Do not implement checkout creation in the theme. That belongs in the backend.

## Product and Nucleus onboarding contract

For product or Nucleus onboarding forms, the theme may pass:

```text
form_id
product_id
product_handle
variant_id
order_id if known outside theme
customer_id if logged in
customer_email if logged in
```

Post-purchase onboarding often cannot be fully completed by the theme alone because order context may require Shopify, email, account, or backend integration.

If the required order context is unavailable in the theme, document it and use the appropriate account, order-status, email, or backend pathway.

## Security expectations

The backend should verify app proxy requests according to Shopify requirements.

The theme should not attempt to verify app proxy signatures. Browser code is not a safe place for secret verification.

The backend should:

- Validate all fields server-side.
- Sanitize submitted content.
- Enforce allowed form IDs.
- Reject unsupported routes.
- Rate-limit or abuse-protect public endpoints.
- Store private data securely.
- Keep credentials in a secure secret-management system.
- Log errors without leaking private data.

## Theme implementation expectations

When implementing theme code that talks to the backend, Jules should:

- Make endpoint paths configurable where practical.
- Use safe defaults only when documented.
- Provide graceful fallback messaging if the backend is unavailable.
- Keep JavaScript progressive and scoped.
- Avoid global JavaScript pollution.
- Avoid broad CSS selectors.
- Avoid breaking Shopify-native forms.
- Keep existing contact forms intact unless explicitly asked.

## Backend availability assumptions

Jules cannot confirm backend availability from this repository alone unless a task provides working endpoint details or test results.

If a route cannot be verified, report:

- The assumed route.
- The file or setting where the route is configured.
- The behavior if the backend is unavailable.
- The store-side check needed in Shopify Admin.

## Required PR notes

For any task involving the Custom App or backend, report:

- App proxy path used.
- Forms or sections using the path.
- Whether the path is configurable.
- Whether the backend route was verified.
- Any required Shopify Admin app proxy settings.
- Any required Google Cloud/backend work outside this repository.
- Any private data intentionally avoided.

## Non-goals

Do not implement these in the theme repository unless explicitly requested and technically supported:

- Backend server code.
- Google Cloud deployment.
- Secret Manager setup.
- Shopify Admin API access from theme code.
- File upload storage.
- Direct CRM integration from browser JavaScript.
- Private partner link retrieval in Liquid.
- Customer submission storage in GitHub.

## Summary

The theme renders forms and sends public, non-secret request data to app proxy routes. The Custom App and Google Cloud backend validate, store, route, and perform secure Shopify Admin API work. Keep the theme dumb, safe, and user-friendly. Let the backend do the grown-up work, tragic as that sounds.
