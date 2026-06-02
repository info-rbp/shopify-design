# RBP Shopify Data Model Registry

## Purpose

This file centralises the known and expected data model for the RBP Shopify storefront.

Use it when implementing product templates, onboarding forms, service pages, marketplace offers, partner links, memberships, Business NBN, customer account experiences, help content, or app proxy integrations.

This registry is not proof that every field or metaobject exists in Shopify Admin. It is a working map based on repository context. Jules must verify live store configuration where possible and document assumptions where verification is not possible.

## Core rule

Do not invent new metafields, metaobjects, handles, form IDs, or app proxy routes when an existing or expected one should be used.

If a missing field is required, document the proposed field and why existing fields are insufficient.

## Ownership model

| Data type | Preferred owner | Notes |
|---|---|---|
| Theme files | GitHub repository | Liquid, JSON templates, snippets, assets. |
| Public content drafts | GitHub `/content` | Blog, articles, help center drafts, safe public references. |
| Form definitions | GitHub `/content/onboarding` | Private submissions must not be stored in GitHub. |
| Public affiliate links | GitHub `/content/affiliate-links` | Only when public-safe. |
| Private affiliate links | Custom App or Google Cloud | Do not commit to GitHub. |
| Customer submissions | Custom App or Google Cloud | Never store in the public repo. |
| Shopify products | Shopify Admin | Theme reads product data. |
| Shopify pages/articles | Shopify Admin or generated from GitHub | Define source of truth before automation. |
| Shopify metafields | Shopify Admin definitions and values | Theme can render values. |
| Shopify metaobjects | Shopify Admin definitions and entries | Theme can render entries if configured. |
| Secrets and tokens | Secure backend secret storage | Never theme or GitHub. |

## Product families

Expected product/service families include:

| Family | Notes |
|---|---|
| On-Demand Services | Fixed-scope services requiring intake/onboarding. |
| Bundled On-Demand Services | Service bundles with more complex fulfilment and setup. |
| Managed Services / Outsourced Solutions | Scoping, setup, recurring delivery, or account-management style services. |
| Core Advisory Services | Advisory and consulting pathways. |
| Booking / Property Field Services | Booking-first, checkout-second service products. |
| Templates | Nucleus document template products requiring onboarding. |
| Documentation Suites | Future or expected Nucleus suite products. |
| Toolkits | Future or expected toolkit products, potentially setup-led. |
| Business NBN | Business internet products and serviceability pathways. |
| Membership | Premium Membership and member access pathways. |
| Marketplace / Partner Offers | Public offers, partner pathways, referrals, buyer/seller routes. |
| Business Finance | Finance pathways, provider/referral CTAs, enquiry-led flows. |
| Business Insurance | Insurance pathways, quote-intent or enquiry-led flows. |

## Product template suffixes

Known or expected product template files:

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

Do not create missing product templates unless the task explicitly asks for them.

## Page template suffixes

Known or expected page templates include:

```text
templates/page.service.json
templates/page.onboarding.json
templates/page.marketplace.json
templates/page.offers.json
templates/page.offer-categories.json
templates/page.membership.json
templates/page.member-portal.json
templates/page.member-benefits.json
templates/page.membership-overview.json
templates/page.membership-signup.json
templates/page.membership-faq.json
templates/page.business-nbn.json
templates/page.business-nbn-plans.json
templates/page.business-nbn-support.json
templates/page.business-nbn-status.json
templates/page.business-nbn-sla.json
templates/page.business-nbn-critical-information-summary.json
templates/page.business-finance.json
templates/page.business-insurance.json
```

Not every expected template necessarily exists. Verify before editing or linking.

## Common page handles

Known or expected page handles include:

```text
/pages/contact
/pages/membership
/pages/member-benefits
/pages/member-resources
/pages/account-support
/pages/order-support
/pages/document-order-status
/pages/payment-plan-support
/pages/help-center
/pages/help-centre
/pages/sign-up-today
/pages/business-nbn
/pages/business-nbn-plans
/pages/business-nbn-support
/pages/business-nbn-critical-information-summary
/pages/business-nbn-sla
/pages/business-nbn-terms
/pages/business-nbn-privacy
/pages/business-nbn-status
/pages/business-finance
/pages/business-insurance
/pages/marketplace
/pages/offers
/pages/exclusive-offers
/pages/top-offers
/pages/limited-time-offers
/pages/offers-by-categories
/pages/applications
/pages/custom-solutions
/pages/core-services
/pages/business-health-check
/pages/business-advisor
/pages/decision-desk
/pages/the-fixer
/pages/nucleus
/pages/real-estate
```

Do not assume a page exists just because it appears in this registry. Check if possible and document assumptions.

## Product metafield namespaces

Known or expected namespaces:

| Namespace | Purpose |
|---|---|
| `custom` | General product classification and customer-facing product metadata. |
| `on_demand` | On-demand service metadata, intake, delivery, and service status. |
| `core` | Core service metadata and intake pathways. |
| `booking` | Booking service configuration, requirements, portals, and policies. |
| `nbn` | Business NBN plan content, legal links, terms, and features. |
| `marketplace` | Marketplace offer classification, partner logic, revenue model, and listing state. |
| `custom_solution` | Custom solution billing, discovery, and configuration requirements. |
| `rbp_ms` | Managed service commercial and checkout metadata. |
| `template` | Template product relationships and related suites/toolkits. |
| `suite` | Documentation suite relationships. |
| `toolkit` | Toolkit access and setup metadata. |

## Important general product metafields

Known from project context and catalogue imports:

```text
product.metafields.custom.product_family
product.metafields.custom.product_category
product.metafields.custom.product_subcategory
product.metafields.custom.product_tier
product.metafields.custom.delivery_time
product.metafields.custom.onboarding_form
product.metafields.custom.requires_onboarding_form
product.metafields.custom.bundle_parent
product.metafields.custom.business_stage
product.metafields.custom.industry_focus
product.metafields.custom.internal_status
product.metafields.custom.launch_priority
product.metafields.custom.primary_use_case
product.metafields.custom.support_category
product.metafields.custom.support_pathway
product.metafields.custom.target_buyer
```

Do not use fallback copy as a substitute for missing launch data unless the task permits it.

## On-demand service metafields

Known or expected:

```text
product.metafields.on_demand.best_fit_client
product.metafields.on_demand.blocker_category
product.metafields.on_demand.business_problem
product.metafields.on_demand.delivery_channel
product.metafields.on_demand.delivery_format
product.metafields.on_demand.delivery_owner
product.metafields.on_demand.dependencies
product.metafields.on_demand.estimated_turnaround
product.metafields.on_demand.onboarding_form_url
product.metafields.on_demand.offer_basis
product.metafields.on_demand.price_basis
product.metafields.on_demand.quote_required
product.metafields.on_demand.requires_onboarding
product.metafields.on_demand.requires_scope_check
product.metafields.on_demand.scope_check_rule
product.metafields.on_demand.service_category
product.metafields.on_demand.service_id
product.metafields.on_demand.service_status
```

Known data caution: previous service catalogue context indicated that `on_demand.onboarding_form_url` was blank for the imported service products, while some `custom.onboarding_form` values were labels rather than complete URLs.

## Booking metafields

Known or expected:

```text
product.metafields.booking.fulfillment_mode
product.metafields.booking.requirements
product.metafields.booking.requires_booking_first
product.metafields.booking.requires_payment_before_confirmation
product.metafields.booking.service
product.metafields.booking.service_type
product.metafields.booking.portal_url
```

Use these for booking-first or property field service products where appropriate.

## Core service metafields

Known or expected:

```text
product.metafields.core.intake_blueprint
product.metafields.core.intake_destination
product.metafields.core.intake_endpoint_path
product.metafields.core.intake_page_url
product.metafields.core.requires_consultation
product.metafields.core.requires_precheck
```

Do not assume a core intake route exists unless backend or Shopify Admin configuration confirms it.

## Managed service and custom solution metafields

Known or expected:

```text
product.metafields.custom_solution.billing_type
product.metafields.custom_solution.configuration_required
product.metafields.custom_solution.is_builder
product.metafields.custom_solution.product_role
product.metafields.custom_solution.requires_discovery
product.metafields.rbp_ms.checkout_mode
product.metafields.rbp_ms.commercial_status
product.metafields.rbp_ms.offer
product.metafields.rbp_ms.publish_ready
product.metafields.rbp_ms.quote_required
```

Use cautious wording for managed services. Do not imply instant delivery.

## Business NBN metafields

Expected areas:

```text
product.metafields.nbn.plan_type
product.metafields.nbn.speed_tier
product.metafields.nbn.contract_term
product.metafields.nbn.technology
product.metafields.nbn.critical_information_summary
product.metafields.nbn.service_schedule
product.metafields.nbn.sla
product.metafields.nbn.terms
product.metafields.nbn.feature_summary
```

Exact keys must be verified before implementation. Do not hardcode commercial terms or serviceability claims without current task confirmation.

## Marketplace metafields

Expected areas:

```text
product.metafields.marketplace.offer_classification
product.metafields.marketplace.complexity
product.metafields.marketplace.revenue_model
product.metafields.marketplace.target_customers
product.metafields.marketplace.nda_required
product.metafields.marketplace.listing_state
product.metafields.marketplace.partner
product.metafields.marketplace.cta_url
```

Exact keys must be verified. Partner offer CTA links must be public-safe before rendering.

## Nucleus product relationship metafields

Known or expected:

```text
product.metafields.template.related_documentation_suites
product.metafields.template.related_toolkits
product.metafields.suite.related_toolkit
product.metafields.toolkit.access_model
```

Nucleus products often require onboarding before fulfilment. Avoid instant-download wording unless confirmed.

## Expected metaobjects

Expected or future metaobject families include:

| Metaobject | Purpose |
|---|---|
| `partner` | Partner/provider records. |
| `offer_category` | Offer category navigation and category pages. |
| `partner_offer` | Public partner offer pages/cards. |
| `offer_claim` | Claim or interest records if used. |
| `core_service` | Core service definitions. |
| `core_diagnostic_domain` | Diagnostic or advisory domains. |
| `core_intake_form` | Intake form definitions. |
| `core_intake_item` | Intake form fields/items. |
| `core_service_pathway` | Service journey/pathway data. |
| `core_service_step` | Step-by-step service process content. |
| `core_deliverable` | Deliverable definitions. |
| `core_service_faq` | Service FAQs. |
| `core_recommendation_rule` | Recommendation logic. |
| `booking_service` | Booking service definitions. |
| `booking_form_requirement` | Booking field or requirement definitions. |
| `booking_service_deliverable` | Booking deliverables. |
| `booking_policy` | Booking policy content. |
| `booking_service_faq` | Booking FAQs. |
| `booking_store_config` | Booking configuration. |
| `rbp_help_category` | Help center categories. |
| `rbp_help_article` | Help articles. |
| `rbp_help_faq` | Help FAQs. |
| `rbp_support_pathway` | Support routing. |
| `rbp_process` | Process explanations. |
| `marketplace_enquiry` | Marketplace enquiry records. |
| `marketplace_workflow_stage` | Marketplace workflow status/stage. |
| `marketplace_admin_task` | Internal marketplace task structure. |
| `marketplace_email_template` | Marketplace email templates. |
| `marketplace_flow_recipe` | Shopify Flow or automation concepts. |
| `business_finance` | Finance content/provider models. |
| `business_insurance` | Insurance content/provider models. |
| `nucleus_toolkit` | Toolkit models. |
| `custom_solution` | Custom solution models. |
| `managed_service` | Managed service models. |

Verify metaobject definitions and entries before rendering them in theme code.

## Form IDs

Known or expected form IDs:

```text
business-health-check
service-onboarding
product-onboarding
nucleus-onboarding
business-nbn-check
marketplace-enquiry
membership-application
real-estate-booking
business-finance-enquiry
business-insurance-enquiry
custom-solution-enquiry
```

Use lowercase, hyphenated IDs. Do not create multiple IDs for the same purpose unless a task explicitly requires separate workflows.

## App proxy route concepts

Known or expected route concepts:

```text
/apps/rbp-bridge
/apps/rbp-onboarding
/apps/rbp-onboarding/business-health-check
/apps/rbp-onboarding/{form_id}
/apps/rbp-bridge/api/check-address
/apps/rbp-bridge/api/marketplace-enquiry
/apps/rbp-bridge/api/onboarding/{form_id}
/apps/rbp-bridge/api/business-nbn/check-address
/apps/rbp-bridge/api/booking/availability
/apps/rbp-bridge/api/booking/request
/apps/rbp-bridge/api/booking/checkout
```

Do not assume these exist without store/backend confirmation.

## Content folders

Known content folders:

```text
content/blog
content/articles
content/help-center
content/templates
content/affiliate-links
content/onboarding/forms
content/onboarding/page-blueprints
content/onboarding/generated
```

GitHub content folders are public. Do not store private data.

## Affiliate link fields

Recommended structured affiliate fields:

```text
partner_name
offer_name
url
status
public_safe
placement
notes
last_reviewed
```

Only render links where `public_safe` is confirmed as `yes` or the task explicitly confirms public-facing use.

## Customer tags and member states

Known or expected customer tag concepts:

```text
Premium Member
rbp-premium-active
rbp-premium-approved
rbp-premium-applied
rbp-premium-suspended
rbp-premium-cancelled
onboarding
business-health-check
```

Theme-side customer tag logic should fail safely. Do not expose private account state beyond what is appropriate for the logged-in customer.

## Missing field procedure

If a required field or model is missing:

1. Check existing docs and code for a close match.
2. Prefer existing namespaces and keys where appropriate.
3. Document the missing field.
4. Propose the minimum new field or model needed.
5. Do not silently invent and depend on a new field without documenting it.

## PR notes for data-model work

Report:

- Fields used.
- Metaobjects used.
- Template dependencies.
- Fallback behavior.
- Store-side definitions that must be created or verified.
- Any proposed new fields.
- Any fields intentionally avoided.

## Summary

This registry is a map, not a guarantee. It helps Jules avoid inventing duplicate data structures and keeps Shopify theme implementation aligned with the RBP product, content, onboarding, marketplace, and membership architecture.
