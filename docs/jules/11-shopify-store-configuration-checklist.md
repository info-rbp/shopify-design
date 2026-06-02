# Shopify Store Configuration Checklist

## Purpose

This checklist captures Shopify Admin and backend settings that Jules usually cannot verify from the theme repository alone.

Use this file when a task touches Shopify deployment, app proxies, Custom App integration, Google Cloud routes, metaobjects, metafields, page handles, product templates, onboarding forms, marketplace offers, Business NBN, memberships, or booking flows.

The theme repository can define theme code and implementation assumptions. The live Shopify store must still be checked for operational configuration. Apparently software has more layers than a cursed wedding cake.

## How Jules should use this checklist

For implementation tasks, Jules should:

1. Review the relevant task context files.
2. Identify which Shopify Admin settings are required.
3. Implement only what can safely be done in the repository.
4. Document every store-side setting that could not be verified.
5. Avoid pretending repository changes alone completed backend or Shopify Admin configuration.

## Theme connection checklist

Before treating a repository change as deployable, verify or document the need to verify:

- [ ] The GitHub repository is connected to the intended Shopify store.
- [ ] The correct branch is connected to Shopify.
- [ ] The connected branch is known.
- [ ] The connected branch targets the intended theme.
- [ ] It is clear whether the connected theme is live or unpublished.
- [ ] The implementation has been tested on an unpublished theme where appropriate.
- [ ] Theme changes will not unexpectedly publish directly to the live store.
- [ ] Any direct Shopify Admin theme edits have been backported to GitHub if they should persist.

## App proxy checklist

For any app-proxy work, verify or document:

- [ ] The installed Shopify Custom App has an app proxy enabled.
- [ ] The app proxy prefix is known.
- [ ] The app proxy subpath is known.
- [ ] The proxy target URL points to the expected backend.
- [ ] The backend target is active.
- [ ] The backend accepts the expected HTTP methods.
- [ ] The backend can receive POST requests from storefront forms.
- [ ] The backend verifies Shopify app proxy signatures or expected request authentication.
- [ ] The theme route is configurable if the live proxy path is uncertain.
- [ ] The theme fails gracefully if the proxy route is unavailable.

Known or expected route concepts include:

```text
/apps/rbp-bridge
/apps/rbp-onboarding
/apps/rbp-onboarding/business-health-check
/apps/rbp-bridge/api/check-address
/apps/rbp-bridge/api/marketplace-enquiry
```

Do not assume these routes exist unless the task or Shopify Admin confirms them.

## Custom App API scopes checklist

For backend features that use Shopify Admin API, verify or document required scopes.

Potential scope areas:

- [ ] Products.
- [ ] Customers.
- [ ] Orders.
- [ ] Draft orders.
- [ ] Pages or content.
- [ ] Blog articles.
- [ ] Metaobjects.
- [ ] Metafields.
- [ ] Themes, if backend theme updates are required.
- [ ] Discounts, if offer workflows require them.
- [ ] Files, if media or secure uploads are involved.

Do not expose Admin API access tokens in theme files, GitHub content, JavaScript, Liquid, or Markdown.

## Google Cloud checklist

For Google Cloud backed workflows, verify or document:

- [ ] The backend service URL is known.
- [ ] The service is reachable through the Shopify app proxy.
- [ ] The service accepts the expected payload.
- [ ] The service returns the expected success/error response shape.
- [ ] Private data is stored outside GitHub.
- [ ] Secrets are stored in an appropriate secret manager.
- [ ] Logging does not expose sensitive data.
- [ ] Submission storage is configured.
- [ ] Notification routing is configured if required.
- [ ] CRM, task, or workflow integration is configured if required.

## Page handles checklist

Before linking to or generating pages, verify or document:

- [ ] The Shopify page exists.
- [ ] The handle is correct.
- [ ] The page is published if it is meant for public users.
- [ ] The page uses the intended template suffix.
- [ ] The page content does not conflict with theme-rendered section content.
- [ ] Internal links point to actual pages.
- [ ] Old or duplicate page handles have redirects if needed.

Common page areas:

```text
/pages/membership
/pages/member-benefits
/pages/sign-up-today
/pages/business-nbn
/pages/business-finance
/pages/business-insurance
/pages/marketplace
/pages/offers
/pages/contact
/pages/help-center
/pages/help-centre
/pages/account-support
/pages/order-support
/pages/business-health-check
```

Do not invent page handles silently. If a page handle is assumed, document the assumption.

## Product template checklist

For product template work, verify or document:

- [ ] Target product family.
- [ ] Correct Shopify template suffix.
- [ ] Existing product template assignment.
- [ ] Product metafields required by the template.
- [ ] Product metaobjects required by the template.
- [ ] CTA behavior.
- [ ] Fulfilment wording.
- [ ] Cart guidance consistency.
- [ ] Post-purchase or onboarding guidance.
- [ ] Whether the product is published, draft, or active.

Product templates may include:

```text
templates/product.json
templates/product.on-demand-service.json
templates/product.core-service.json
templates/product.booking-service.json
templates/product.template.json
templates/product.documentation-suite.json
templates/product.toolkit.json
templates/product.business-nbn.json
templates/product.membership.json
templates/product.marketplace.json
```

Do not create new product templates unless the task requires it.

## Metafields checklist

Before adding or relying on metafields, verify or document:

- [ ] Namespace.
- [ ] Key.
- [ ] Type.
- [ ] Owner type.
- [ ] Whether the field exists in Shopify Admin.
- [ ] Whether products/pages/customers have values populated.
- [ ] Fallback behavior when blank.
- [ ] Whether the field is safe for storefront rendering.

Known namespaces in project context include:

```text
custom
on_demand
core
booking
nbn
marketplace
custom_solution
rbp_ms
template
suite
toolkit
```

Do not invent new metafield namespaces or keys when an existing one should be used.

## Metaobjects checklist

Before relying on metaobjects, verify or document:

- [ ] Metaobject definition exists.
- [ ] Required fields exist.
- [ ] Entries exist.
- [ ] Entries are published or storefront-accessible if required.
- [ ] Handles are correct.
- [ ] Theme references are valid.
- [ ] Empty state behavior exists.

Expected or future metaobject areas include:

```text
partner
offer_category
partner_offer
offer_claim
core_service
core_intake_form
booking_service
booking_policy
rbp_help_article
rbp_help_faq
marketplace_enquiry
marketplace_workflow_stage
business_finance
business_insurance
nucleus_toolkit
custom_solution
managed_service
```

Do not assume every expected metaobject exists.

## Onboarding forms checklist

For onboarding forms, verify or document:

- [ ] Form ID.
- [ ] Source definition file.
- [ ] Target Shopify page or product.
- [ ] Target section or template.
- [ ] App proxy submission route.
- [ ] Required fields.
- [ ] Backend storage destination.
- [ ] Success route or message.
- [ ] Error response behavior.
- [ ] Customer context handling.
- [ ] Whether file uploads are required.

Do not implement file uploads unless the backend is confirmed to support secure upload handling.

## Affiliate and partner offer checklist

Before rendering affiliate links or partner offer CTAs, verify or document:

- [ ] Link is public-safe.
- [ ] Link does not contain tokens, signatures, secrets, access keys, or private invite codes.
- [ ] Link does not point to a private partner dashboard.
- [ ] Link is intended for public customers.
- [ ] Link has a clear placement.
- [ ] Link has a status.
- [ ] Link has been reviewed.
- [ ] Missing or unsafe links are not rendered as public CTAs.

If private partner links are required, they belong in the Custom App/backend or secure storage, not GitHub.

## Business NBN checklist

For Business NBN work, verify or document:

- [ ] Address checker route.
- [ ] Whether address results are preliminary or confirmed.
- [ ] Plan family.
- [ ] Plan product or variant mapping.
- [ ] Price display rules.
- [ ] GST treatment.
- [ ] Legal/support pages.
- [ ] Terms and service schedules.
- [ ] Serviceability disclaimers.
- [ ] Backend endpoint availability.

Do not claim confirmed serviceability unless the backend confirms it.

## Membership checklist

For membership work, verify or document:

- [ ] Active membership product or application path.
- [ ] Approved membership positioning.
- [ ] Current price and term.
- [ ] Whether signup is application-first.
- [ ] NBN inclusion wording.
- [ ] Eligible member benefits.
- [ ] Customer tags or account states.
- [ ] Member resource access rules.
- [ ] Account portal links.
- [ ] Legal/support pages.

Avoid reintroducing generic membership tiers unless the task explicitly confirms them.

## Real estate booking checklist

For real estate/property field service work, verify or document:

- [ ] Booking service product.
- [ ] Property address capture.
- [ ] Serviceability logic.
- [ ] Appointment availability route.
- [ ] Time category pricing.
- [ ] Public holiday handling.
- [ ] Draft order or checkout creation route.
- [ ] Booking hold logic.
- [ ] Fulfilment messaging.
- [ ] Backend confirmation behavior.

Do not fake availability or checkout creation in the theme.

## Deployment readiness checklist

Before calling implementation complete, verify or document:

- [ ] Liquid files are syntactically valid.
- [ ] JSON templates are valid.
- [ ] Section schemas are valid JSON.
- [ ] Required assets are referenced correctly.
- [ ] Theme renders expected sections.
- [ ] Existing contact/product/cart/checkout behavior remains intact.
- [ ] No credentials or private data are committed.
- [ ] Store-side configuration still needed is clearly listed.

## Final response or PR note template

Use this structure:

```text
Summary:
- ...

Files changed:
- ...

Validation:
- ...

Store-side checks still required:
- ...

Assumptions:
- ...

Skipped checks:
- ...
```

## Summary

Repository changes can prepare the theme and content model, but live functionality often depends on Shopify Admin, Custom App, and Google Cloud settings. Jules should separate what was implemented in GitHub from what must still be verified in Shopify or backend systems. This is tedious, and therefore useful.
