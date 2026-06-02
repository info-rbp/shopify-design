# Services onboarding forms context

## Purpose

This repository contains the Shopify storefront theme implementation for Remote Business Partner. It is the source-controlled place for Shopify theme code, product templates, Liquid sections, snippets, JSON templates, storefront messaging, cart guidance, customer account guidance, and related presentation logic.

This file gives Google Jules high-level project context before future repository fixes relating to onboarding forms, Shopify service product pages, product metafields, product templates, service fulfilment messaging, and the customer post-purchase journey.

This file is context only. It is intended to guide future Jules tasks before code changes are made. It does not implement the onboarding form section, create product pages, change Liquid, update JSON templates, add snippets, or alter JavaScript.

The focus is specifically on onboarding and intake requirements for Shopify service products sold by Remote Business Partner. The repository needs a clear, maintainable place and implementation pattern for onboarding form links for each service product.

Every service requires the customer to complete an onboarding or intake form before delivery, fulfilment, implementation, advisory work, managed support, or service delivery begins. The storefront must not imply that services are delivered instantly if an onboarding form, intake process, scoping step, fulfilment review, setup requirement, implementation step, or managed delivery review is required.

## Business context

Remote Business Partner sells Shopify service products across three main service families:

- On-Demand Services
- Bundled On-Demand Services
- Managed Services / Outsourced Solutions

These are not simple instant-download products. They are service engagements that require intake information, review, scoping, scheduling, setup, implementation, access collection, managed handover, or recurring delivery before fulfilment begins.

The expected customer journey is:

1. Customer views a service product.
2. Customer reviews the service scope, inclusions, delivery model, and expected timeframe.
3. Customer purchases the service.
4. Customer is directed to complete the relevant onboarding or intake form.
5. The business reviews the onboarding form submission.
6. The service is scoped, scheduled, assigned, configured, or prepared.
7. Delivery, fulfilment, implementation, advisory work, or managed service delivery begins.
8. For Bundled On-Demand Services and Managed Services / Outsourced Solutions, additional setup, implementation planning, account management, handover, or recurring service delivery may occur depending on the service type or variant.

The storefront must be careful with wording around delivery, instant access, fulfilment, setup, implementation timelines, service commencement, and managed delivery expectations.

The storefront should avoid suggesting that a service begins immediately after payment unless the relevant onboarding, intake, scheduling, and fulfilment conditions are clearly explained. Service pages should make it clear that checkout is the purchase step, not the start of delivery when onboarding is required.

## Product catalogue source

The attached spreadsheet, `On-Demand Services Consolidated Upload File.csv`, is the source of truth for the current Shopify service product catalogue used for this context file.

The spreadsheet contains 442 unique service product handles. The product groups identified from the `Type` column are:

| Product group from spreadsheet | Product count | Notes |
| --- | ---: | --- |
| On-Demand Service | 402 | Main fixed-scope service catalogue. |
| Bundled On-Demand Service | 15 | Bundled service packages, including accounting and finance, change management, and management bundles. |
| On-Demand Bundle | 13 | Bundled HR on-demand products. |
| Bundled On-Demand Product | 5 | Operations lifecycle bundle products. |
| Outsourced Solution | 7 | Managed or outsourced solution style products. |

The `Product Category (product.metafields.custom.product_category)` values are:

| Product category metafield value | Product count | Notes |
| --- | ---: | --- |
| On-Demand Services | 355 | Main service category. |
| Accounting & Finance | 64 | Accounting and finance services and lifecycle products. |
| Bundled On-Demand Services | 18 | Bundle-labelled service products. |
| Outsourced Solutions | 5 | Outsourced solution-labelled products. |

Important catalogue observations:

- `Requires Onboarding Form (product.metafields.custom.requires_onboarding_form)` is `TRUE` for all 442 products.
- `Requires Onboarding (product.metafields.on_demand.requires_onboarding)` is `TRUE` for all 442 products.
- `Onboarding Form (product.metafields.custom.onboarding_form)` is populated for only 60 products.
- `Onboarding Form URL (product.metafields.on_demand.onboarding_form_url)` is blank for all 442 products.
- The populated `custom.onboarding_form` values appear to be form names or labels, not complete URL strings.
- `Variant Fulfillment Service` is `manual` for all 442 products.
- `Variant Requires Shipping` is `FALSE` for all 442 products.
- `Published` is `FALSE` for all 442 products in the spreadsheet.
- `Status` contains 280 draft products and 162 active products.

The populated onboarding form values are:

| `custom.onboarding_form` value | Product count | Product family coverage |
| --- | ---: | --- |
| `Operations On-Demand Intake Form` | 54 | Operations Management Process |
| `Operations Bundled On-Demand Intake Form` | 5 | Operations Management Process Bundles |
| `Outsourced Operations Solution Intake Form` | 1 | Operations Outsourced Solutions |

Relevant spreadsheet columns found for onboarding forms and Shopify implementation include:

### Core Shopify product and variant columns

- `Handle`
- `Title`
- `Body (HTML)`
- `Vendor`
- `Product Category`
- `Type`
- `Tags`
- `Published`
- `Option1 Name`
- `Option1 Value`
- `Variant SKU`
- `Variant Price`
- `Variant Requires Shipping`
- `Variant Fulfillment Service`
- `Status`

### General custom product metafields

- `Delivery Time (product.metafields.custom.delivery_time)`
- `Onboarding Form (product.metafields.custom.onboarding_form)`
- `Product Category (product.metafields.custom.product_category)`
- `Product Family (product.metafields.custom.product_family)`
- `Product Subcategory (product.metafields.custom.product_subcategory)`
- `Product Tier (product.metafields.custom.product_tier)`
- `Requires Onboarding Form (product.metafields.custom.requires_onboarding_form)`
- `Bundle Parent (product.metafields.custom.bundle_parent)`
- `Business Stage (product.metafields.custom.business_stage)`
- `Industry Focus (product.metafields.custom.industry_focus)`
- `Internal Status (product.metafields.custom.internal_status)`
- `Launch Priority (product.metafields.custom.launch_priority)`
- `Primary Use Case (product.metafields.custom.primary_use_case)`
- `Support Category (product.metafields.custom.support_category)`
- `Support Pathway (product.metafields.custom.support_pathway)`
- `Target Buyer (product.metafields.custom.target_buyer)`

### On-demand service metafields

- `Best Fit Client (product.metafields.on_demand.best_fit_client)`
- `Blocker Category (product.metafields.on_demand.blocker_category)`
- `Use Case Summary (product.metafields.on_demand.business_problem)`
- `Service Mode (product.metafields.on_demand.delivery_channel)`
- `Delivery Format (product.metafields.on_demand.delivery_format)`
- `Delivery Owner (product.metafields.on_demand.delivery_owner)`
- `Dependencies (product.metafields.on_demand.dependencies)`
- `Estimated Turnaround (product.metafields.on_demand.estimated_turnaround)`
- `Onboarding Form URL (product.metafields.on_demand.onboarding_form_url)`
- `Offer Model (product.metafields.on_demand.offer_basis)`
- `Price Model (product.metafields.on_demand.price_basis)`
- `Quote Required (product.metafields.on_demand.quote_required)`
- `Requires Onboarding (product.metafields.on_demand.requires_onboarding)`
- `Scope Check (product.metafields.on_demand.requires_scope_check)`
- `Scope Check Rule (product.metafields.on_demand.scope_check_rule)`
- `Service Category (product.metafields.on_demand.service_category)`
- `On-Demand Service ID (product.metafields.on_demand.service_id)`
- `Service Status (product.metafields.on_demand.service_status)`

### Booking, intake, and fulfilment-related metafields

- `Fulfillment mode (product.metafields.booking.fulfillment_mode)`
- `Booking requirements (product.metafields.booking.requirements)`
- `Requires booking first (product.metafields.booking.requires_booking_first)`
- `Requires payment before confirmation (product.metafields.booking.requires_payment_before_confirmation)`
- `Booking service (product.metafields.booking.service)`
- `Booking service type (product.metafields.booking.service_type)`
- `Booking portal URL (product.metafields.booking.portal_url)`
- `Core intake blueprint (product.metafields.core.intake_blueprint)`
- `Core intake destination (product.metafields.core.intake_destination)`
- `Core intake endpoint path (product.metafields.core.intake_endpoint_path)`
- `Core intake page URL (product.metafields.core.intake_page_url)`
- `Core requires consultation (product.metafields.core.requires_consultation)`
- `Core requires precheck (product.metafields.core.requires_precheck)`

### Bundled and managed service-related metafields

- `Custom Solution billing type (product.metafields.custom_solution.billing_type)`
- `Custom Solution configuration required (product.metafields.custom_solution.configuration_required)`
- `Custom Solution builder product (product.metafields.custom_solution.is_builder)`
- `Custom Solution product role (product.metafields.custom_solution.product_role)`
- `Custom Solution requires discovery (product.metafields.custom_solution.requires_discovery)`
- `Checkout Mode (product.metafields.rbp_ms.checkout_mode)`
- `Commercial Status (product.metafields.rbp_ms.commercial_status)`
- `Managed Service Offer (product.metafields.rbp_ms.offer)`
- `Publish Ready (product.metafields.rbp_ms.publish_ready)`
- `Quote Required (product.metafields.rbp_ms.quote_required)`

Some requested implementation concepts are not represented by exact column names in the spreadsheet. Future work should map them carefully rather than inventing data silently:

- `custom.service_family` is not present as an exact spreadsheet column. Use `custom.product_family`, `Type`, tags, or future metafield definition if introduced.
- `custom.service_category` is not present as an exact spreadsheet column. A similar value exists as `product.metafields.on_demand.service_category`.
- `custom.service_subcategory` is not present as an exact spreadsheet column. Use `custom.product_subcategory` unless a future service-specific metafield is created.
- `custom.service_delivery_model` is not present as an exact spreadsheet column. Similar data appears in `on_demand.delivery_channel`, `on_demand.delivery_format`, and `booking.fulfillment_mode`.
- `custom.service_scope` is not present as an exact spreadsheet column. Scope appears partly in product body copy, option values, product tier, offer model, and bundle naming.
- `custom.fulfilment_model` is not present as an exact spreadsheet column. Similar data appears in `booking.fulfillment_mode`, `Variant Fulfillment Service`, and on-demand delivery fields.
- `custom.intake_required`, `custom.consultation_required`, `custom.implementation_required`, `custom.setup_required`, `custom.managed_service_required`, `custom.access_model`, `custom.recurring_service`, `custom.billing_model`, `custom.service_tier`, and `custom.service_level` are not present as exact spreadsheet columns.
- Variant-level `custom.requires_onboarding` is not present in the spreadsheet. Variant-specific intake behaviour may need to be designed if service tiers or variants later require different onboarding pathways.

## Application context

This repository appears to contain a Shopify Online Store 2.0 theme based on Shopify Liquid, JSON templates, snippets, assets, and section groups.

Existing repository instructions and context files indicate that:

- `AGENTS.md` is the repository-level Jules instruction file.
- Additional Jules context belongs under `docs/jules/`.
- Existing product-template context already warns that many RBP products are not instant downloads and may require onboarding, preparation, booking, manual review, or service delivery.
- The repository includes a dedicated `templates/product.on-demand-service.json` template that points to `sections/main-product-on-demand-service.liquid`.
- The repository includes product, cart, order, and onboarding-related sections that future work should inspect before implementation.

Areas likely to matter for future onboarding form implementation include:

- `sections/`
- `snippets/`
- `templates/`
- `layout/`
- `assets/`
- JSON product templates
- Product page sections
- Product information sections
- Product purchase or call-to-action sections
- Service scope or inclusions sections
- Cart sections
- Cart drawer guidance
- Customer account and order templates, if present or configurable
- Existing product metadata, metafield, and dynamic source usage
- Existing service/product documentation under `docs/`
- `AGENTS.md`

Specific repository files or areas observed during inspection include:

- `AGENTS.md`
- `docs/jules/project-context.md`
- `docs/jules/shopify-ui-ux-project-overview.md`
- `docs/jules/shopify-product-template-context.md`
- `templates/product.on-demand-service.json`
- `sections/main-product-on-demand-service.liquid`
- `sections/main-product.liquid`
- `sections/featured-product.liquid`
- `sections/booking-service-product.liquid`
- `sections/rbp-product-state.liquid`
- `sections/rbp-product-information.liquid`
- `sections/rbp-onboarding-product-cta.liquid`
- `sections/rbp-order-onboarding-cta.liquid`
- `sections/rbp-order-account-guidance.liquid`
- `sections/rbp-cart-guidance.liquid`
- `sections/rbp-cart-drawer-guidance.liquid`
- `sections/rbp-cart-onboarding-notice.liquid`
- `sections/rbp-template-onboarding-form.liquid`
- `templates/cart.json`
- `templates/page.template-customisation-onboarding.json`
- `assets/rbp-service-product.css`
- `assets/rbp-product.css`
- `assets/rbp-theme.css`
- `assets/rbp-components.css`
- `assets/rbp-ux-remediation.css`

Future implementation should not assume the existing onboarding sections are already correct for service products. Some existing copy appears oriented toward document customisation or template-style onboarding. Service product onboarding needs a distinct pattern that works for On-Demand Services, Bundled On-Demand Services, and Managed Services / Outsourced Solutions.

Do not change these files as part of this context-only task. Jules should review them in a future implementation task.

## Onboarding form architecture

Recommended future architecture:

- Onboarding form URLs should come from Shopify metafields where possible.
- The primary product metafield should be `custom.onboarding_form`.
- The boolean product metafield `custom.requires_onboarding_form` should determine whether onboarding messaging appears.
- `custom.delivery_time` should be used to avoid misleading delivery or service-start promises.
- Service-specific metadata should be used where available to adjust copy, warnings, service family labels, and next-step messaging.
- The theme should avoid hardcoded service-specific onboarding URLs wherever possible.
- If hardcoding is temporarily unavoidable, it should be isolated in one maintainable section or snippet and documented as temporary technical debt.

The relevant metafield model should prefer these product-level fields where present or planned:

- `custom.requires_onboarding_form`
- `custom.onboarding_form`
- `custom.delivery_time`
- `custom.product_family`
- `custom.product_category`
- `custom.product_subcategory`
- `custom.service_family`
- `custom.service_category`
- `custom.service_subcategory`
- `custom.service_delivery_model`
- `custom.service_scope`
- `custom.fulfilment_model`
- `custom.intake_required`
- `custom.consultation_required`
- `custom.implementation_required`
- `custom.setup_required`
- `custom.managed_service_required`
- `custom.access_model`
- `custom.recurring_service`
- `custom.billing_model`
- `custom.service_tier`
- `custom.service_level`

The current spreadsheet also includes service data in these namespaces, which Jules should consider before adding new fields:

- `on_demand.requires_onboarding`
- `on_demand.onboarding_form_url`
- `on_demand.requires_scope_check`
- `on_demand.scope_check_rule`
- `on_demand.quote_required`
- `on_demand.delivery_channel`
- `on_demand.delivery_format`
- `on_demand.estimated_turnaround`
- `on_demand.offer_basis`
- `on_demand.price_basis`
- `on_demand.service_category`
- `booking.fulfillment_mode`
- `booking.requirements`
- `booking.requires_booking_first`
- `booking.portal_url`
- `custom_solution.billing_type`
- `custom_solution.configuration_required`
- `custom_solution.requires_discovery`
- `rbp_ms.checkout_mode`
- `rbp_ms.offer`
- `rbp_ms.quote_required`

Bundled On-Demand Services may require broader intake questions because they combine multiple individual services into one service package. Their onboarding forms should capture the combined scope, priority order, dependencies, delivery sequence, required documents, stakeholder details, and any implementation or handover requirements.

Managed Services / Outsourced Solutions may require deeper onboarding because they may involve ongoing delivery, account setup, recurring workflows, implementation planning, access collection, system permissions, stakeholder mapping, governance cadence, service levels, billing model, and service handover.

Variant-level onboarding fields may be required where different service tiers, package levels, or implementation models have different intake requirements. If variant metafields are present or introduced later, `custom.requires_onboarding` or an equivalent variant-level onboarding flag should be considered. Future Liquid should be careful not to assume that all variants under a product have the same onboarding pathway.

Product pages should display clear onboarding instructions when onboarding is required. The long-term goal is to have one consistent onboarding callout pattern across On-Demand Services, Bundled On-Demand Services, and Managed Services / Outsourced Solutions, with service-specific URLs and service-family-specific messaging driven from metafields.

## Product page requirements

Service product pages should show onboarding information in multiple customer-visible places where appropriate:

- Product page purchase area
- Product page service scope or inclusions section
- Product page fulfilment, delivery, or “how it works” explanation section
- Cart or checkout-adjacent messaging if supported by the theme
- Order confirmation or thank-you page messaging if supported by Shopify and theme limitations
- Customer account or post-purchase help content if supported
- Admin/product metafield usage documentation for maintainers
- Reusable Liquid section or snippet eventually created for onboarding callouts
- JSON product template areas that may need to include the onboarding section later

Product page guidance:

- Show an onboarding form callout when `custom.requires_onboarding_form` is true.
- Display the form URL from `custom.onboarding_form` when it is present and valid.
- Use `custom.delivery_time` or related turnaround fields to avoid misleading timing promises.
- Use clear language such as: “Complete the onboarding form after purchase so we can prepare and begin your service.”
- Avoid saying “instant download,” “instant delivery,” “instant access,” or “starts immediately” for services that require onboarding, intake, scoping, scheduling, setup, access collection, implementation, or fulfilment review first.
- Explain when service delivery begins.
- Explain what the customer must do after purchase.
- Explain whether the form is required before work can begin.
- For On-Demand Services, keep the message simple and task-focused.
- For Bundled On-Demand Services, explain that the form helps confirm the combined service scope, priorities, dependencies, and delivery sequence.
- For Managed Services / Outsourced Solutions, explain that the form helps confirm operating context, access requirements, implementation requirements, stakeholders, recurring service needs, governance cadence, and delivery model.

### On-Demand Service example

“After purchase, complete the onboarding form so we can confirm the details needed to prepare and deliver your service.”

### Bundled On-Demand Service example

“After purchase, complete the onboarding form so we can confirm your service scope, priorities, delivery requirements, and the order in which the bundled service components should be completed.”

### Managed Service / Outsourced Solution example

“After purchase, complete the onboarding form so we can confirm your business context, access requirements, service model, implementation needs, and recurring delivery requirements before managed service delivery begins.”

## Repository areas likely to need future updates

Future implementation should inspect the repository before changing code. Do not assume exact implementation details until the current file structure, template assignment, and Shopify metafield availability are confirmed.

| Area | Likely file or folder | Why it matters | Future change to consider |
| --- | --- | --- | --- |
| Repository instructions | `AGENTS.md` | Defines Jules working rules and scope discipline. | Read before any implementation and keep changes small and reviewable. |
| Existing Jules context | `docs/jules/` | Contains product-template, UI/UX, and project context. | Read relevant context before changing product or onboarding logic. |
| On-demand product template | `templates/product.on-demand-service.json` | Dedicated product template currently points to the on-demand service section. | Confirm whether all On-Demand, Bundled On-Demand, and Managed Service products should share this template or require variants. |
| On-demand service product section | `sections/main-product-on-demand-service.liquid` | Renders the custom service product page, buy card, quick facts, inputs, delivery, limits, FAQs, and final CTA. | Add or reference a reusable onboarding callout only in a future implementation task. |
| Default product template | `templates/product.json` | Some service products may still use the default product template. | Confirm assignment rules before relying only on `product.on-demand-service.json`. |
| Main product section | `sections/main-product.liquid` | Default Shopify product purchase area and product details. | Review if service products can render here or if onboarding messaging must be present globally. |
| Product state logic | `sections/rbp-product-state.liquid` | Contains product-type fulfilment logic, including onboarding, instant download, booking, membership, enquiry, and availability states. | Review fulfilment mapping for service products and remove or avoid conflicting instant-download messaging where onboarding is required. |
| Product information section | `sections/rbp-product-information.liquid` | Reads `custom.product_family`, `custom.product_category`, `custom.product_subcategory`, `custom.delivery_time`, `custom.requires_onboarding_form`, and `custom.onboarding_form`. | Adapt messaging for services rather than document products if reused. |
| Product onboarding CTA | `sections/rbp-onboarding-product-cta.liquid` | Existing onboarding CTA uses `custom.requires_onboarding_form` and `custom.onboarding_form`, with a fallback to `/pages/template-customisation-onboarding`. | Review whether fallback and copy are appropriate for service products. Avoid hardcoded template-oriented fallback for services unless deliberately supported. |
| Order onboarding CTA | `sections/rbp-order-onboarding-cta.liquid` | Existing post-purchase onboarding CTA checks order line products and renders onboarding links. | Review Shopify order/customer template limitations and adapt service-family messaging in a future task. |
| Order account guidance | `sections/rbp-order-account-guidance.liquid` | Existing customer account order guidance renders onboarding links and order support messaging. | Confirm if and where this section is wired into customer account templates. |
| Cart guidance | `sections/rbp-cart-guidance.liquid` and `templates/cart.json` | Cart template includes a guidance section warning about onboarding and delivery review. | Adjust copy so service products are not described as document-style products when the cart contains services. |
| Cart drawer guidance | `sections/rbp-cart-drawer-guidance.liquid` | Injects cart drawer and cart notification guidance through JavaScript templates. | Review for service-specific onboarding wording and avoid template/document-only assumptions. |
| Legacy cart onboarding notice | `sections/rbp-cart-onboarding-notice.liquid` | Marked as legacy compatibility. | Avoid rebuilding around this unless future task explicitly requires it. |
| Template onboarding form page | `templates/page.template-customisation-onboarding.json` and `sections/rbp-template-onboarding-form.liquid` | Existing onboarding form page appears oriented to template/document customisation. | Review whether service forms should use separate pages, external URLs, or metafield-driven links. |
| Booking service product section | `sections/booking-service-product.liquid` | Booking-style services may overlap with intake, scheduling, and confirmation flows. | Ensure booking copy does not conflict with onboarding form messaging. |
| Featured product | `sections/featured-product.liquid` | Featured product blocks may expose product CTA and fulfilment messaging outside the product page. | Confirm whether onboarding warnings should appear in featured service contexts. |
| Product card rendering | `snippets/card-product.liquid` and product-grid sections | Product cards influence collection and search browsing decisions. | Consider lightweight badges or delivery notes later if service products require visible onboarding expectations before click-through. |
| Collection and search sections | `sections/main-collection-product-grid.liquid`, `sections/main-search.liquid`, `sections/featured-collection.liquid`, `sections/related-products.liquid` | Services can appear outside the product detail page. | Review whether service onboarding badges should appear in cards or collection filters in a future task. |
| Theme layout | `layout/theme.liquid` | Global section and script loading may affect cart drawer, product state, and account guidance. | Review only if implementation requires global assets or scripts. |
| Assets and styling | `assets/rbp-service-product.css`, `assets/rbp-product.css`, `assets/rbp-theme.css`, `assets/rbp-components.css`, `assets/rbp-ux-remediation.css` | Existing visual patterns may support onboarding callouts. | Prefer existing RBP component styles before adding new CSS. |
| Theme settings/schema | Section schemas under `sections/` | Existing sections may expose copy and URLs through settings. | Prefer metafields for product-specific form URLs and schema settings for generic fallback copy only. |
| Checkout-adjacent messaging | Cart sections, order sections, customer account sections, Shopify checkout limitations | Shopify checkout itself may be limited depending on plan and extensibility. | Surface onboarding messaging in cart, order confirmation, thank-you, or account areas only where supported. |
| Admin/product metafield usage | Shopify Admin product metafields, not stored directly as code | Future maintainers need a reliable data-entry model. | Document required metafields and validate catalogue completeness before launch. |

Do not make those changes in this task.

## Spreadsheet-driven onboarding form mapping

Future Jules tasks should use the spreadsheet to drive service onboarding mapping and to avoid hardcoded assumptions.

Recommended method:

1. Identify all service products using `Type`, `Tags`, `Product Category (product.metafields.custom.product_category)`, and `Product Family (product.metafields.custom.product_family)`.
2. Treat products with `Requires Onboarding Form (product.metafields.custom.requires_onboarding_form) = TRUE` as requiring customer-facing onboarding messaging.
3. Cross-check `Requires Onboarding (product.metafields.on_demand.requires_onboarding)` where the service uses on-demand fields.
4. Use `Onboarding Form (product.metafields.custom.onboarding_form)` as the primary onboarding form field if it contains a valid URL or resolvable form reference.
5. Validate whether `Onboarding Form (product.metafields.custom.onboarding_form)` values are complete URLs, Shopify page paths, form handles, form names, or placeholders.
6. Check `Onboarding Form URL (product.metafields.on_demand.onboarding_form_url)` for future URL-specific values, although it is blank in the current spreadsheet.
7. Group products by `Type` to distinguish On-Demand Services, Bundled On-Demand Services, On-Demand Bundles, Bundled On-Demand Products, and Outsourced Solutions.
8. Group products by `Product Family (product.metafields.custom.product_family)` to understand service domain and lifecycle context.
9. Group products by `Product Category (product.metafields.custom.product_category)` and `Product Subcategory (product.metafields.custom.product_subcategory)` to support category-specific messaging.
10. Use `Service Category (product.metafields.on_demand.service_category)`, where present, as additional service classification.
11. Use `Delivery Time (product.metafields.custom.delivery_time)` and `Estimated Turnaround (product.metafields.on_demand.estimated_turnaround)` to avoid misleading service-start promises.
12. Use `Scope Check (product.metafields.on_demand.requires_scope_check)` and `Scope Check Rule (product.metafields.on_demand.scope_check_rule)` to identify products where onboarding or review gates affect delivery timing.
13. Use `Quote Required (product.metafields.on_demand.quote_required)` and `Quote Required (product.metafields.rbp_ms.quote_required)` to distinguish checkout-enabled services from quote-first or review-first services.
14. Use `Custom Solution configuration required`, `Custom Solution requires discovery`, `rbp_ms.checkout_mode`, and `rbp_ms.offer` to identify bundled, managed, or custom solution behaviours.
15. Use `Option1 Name`, `Option1 Value`, `Product Tier`, and any future variant metafields to identify whether variants need different onboarding messages or form destinations.

Future implementation checks should flag:

- Products requiring onboarding but missing `custom.onboarding_form`.
- Products with onboarding URLs or form references but missing `custom.requires_onboarding_form`.
- Products with delivery or fulfilment language that conflicts with onboarding requirements.
- Products saying or implying “instant delivery,” “instant access,” or “starts immediately” despite requiring onboarding.
- Services where `custom.onboarding_form` contains a form name rather than a usable URL.
- Services where `on_demand.onboarding_form_url` is blank but `custom.requires_onboarding_form` is true.
- Bundled On-Demand Services missing scope, priority, dependency, or delivery-sequence metadata.
- Managed Services / Outsourced Solutions missing setup, implementation, access, recurring delivery, governance, or account-management metadata.
- Variants that likely require onboarding but do not have variant-level onboarding metadata.
- Services where the spreadsheet conflicts with existing repository logic or theme assumptions.

The spreadsheet currently suggests the following onboarding patterns:

- On-Demand Services: onboarding is always required, usually to collect service-specific details before a fixed-scope task begins.
- Bundled On-Demand Services: onboarding is always required, and the form should cover multiple included service components, sequencing, priorities, and dependencies.
- Managed Services / Outsourced Solutions: onboarding is always required, and the form should cover operating context, access model, implementation requirements, recurring service needs, stakeholders, account management, and service cadence.

## Outstanding onboarding data issues

The current spreadsheet shows several data issues that should be raised before implementation:

- All 442 products require onboarding, but only 60 products have `custom.onboarding_form` populated.
- 382 products have `custom.requires_onboarding_form = TRUE` but no `custom.onboarding_form` value.
- `on_demand.onboarding_form_url` is blank for all 442 products.
- The 60 populated `custom.onboarding_form` values appear to be form names, not complete URLs.
- Only Operations products currently have populated onboarding form values.
- Human Resources, Sales and Marketing Pipeline, IT/Digital, Artificial Intelligence, Change Management, Management, Accounting and Finance lifecycle products, and most bundled/outsourced service families are missing `custom.onboarding_form` values.
- The spreadsheet has no exact columns for several desired service-specific fields such as `custom.service_family`, `custom.service_category`, `custom.service_subcategory`, `custom.service_delivery_model`, `custom.service_scope`, `custom.fulfilment_model`, `custom.intake_required`, `custom.consultation_required`, `custom.implementation_required`, `custom.setup_required`, `custom.managed_service_required`, `custom.access_model`, `custom.recurring_service`, `custom.billing_model`, `custom.service_tier`, and `custom.service_level`.
- `Delivery Time (product.metafields.custom.delivery_time)` is blank for 24 products.
- `Scope Check (product.metafields.on_demand.requires_scope_check)` is `TRUE` for 408 products, which suggests most services need review or scoping before delivery timing should be treated as final.
- `Quote Required (product.metafields.on_demand.quote_required)` is `TRUE` for 49 products, and `Quote Required (product.metafields.rbp_ms.quote_required)` is `TRUE` for 12 products. Future storefront logic should not assume all services are direct-checkout ready.
- `Custom Solution requires discovery` and `Custom Solution configuration required` are `TRUE` for 35 products, suggesting bundled or managed-style discovery/setup requirements that may need stronger onboarding messaging.
- Existing repository sections include onboarding messaging that appears document or template oriented. Service products need a service-specific messaging pattern.
- Existing repository logic may use fallback onboarding paths such as `/pages/template-customisation-onboarding`. That fallback should not be silently applied to service products unless it is intentionally the correct service intake path.
- Existing product-state logic includes instant-download messaging for product types such as templates, toolkits, and documentation suites. Future work should verify service products are not accidentally routed through instant-fulfilment messaging.
- Variants likely require review because every row has `Option1 Name` and `Option1 Value`, but no variant-level onboarding metadata is present in the spreadsheet.
- If the spreadsheet conflicts with existing repository logic, Jules should document the conflict instead of silently resolving it.

## Key goals

Future changes should keep these goals in mind:

- Make onboarding requirements clear before and after purchase.
- Ensure every service product has a reliable onboarding or intake form pathway.
- Use Shopify metafields rather than hardcoded URLs wherever possible.
- Keep product page messaging consistent across On-Demand Services, Bundled On-Demand Services, and Managed Services / Outsourced Solutions.
- Support future scaling as more services and onboarding forms are added.
- Preserve Shopify theme compatibility.
- Keep changes reviewable and limited in scope.
- Avoid unrelated refactors.
- Avoid breaking existing product, cart, checkout, customer account, or theme behaviour.
- Make service commencement expectations clear.
- Avoid misleading customers about timing, setup, implementation, access, or fulfilment.
- Ensure service-family-specific messaging can be managed without duplicating logic across many files.
- Ensure products missing required onboarding metadata degrade safely without hiding the operational issue.

## Important constraints

- Do not modify existing files unless specifically asked in a future task.
- Do not implement code in this task.
- Do not add other Jules files yet.
- Do not refactor unrelated theme components.
- Do not hardcode service onboarding URLs unless no metafield-based option exists.
- Do not change product data or Shopify metafield definitions from the repository unless specifically instructed.
- Preserve existing storefront behaviour.
- Maintain Shopify theme compatibility.
- Keep future changes small and reviewable.
- Use the spreadsheet as service product context, but do not assume it is perfect.
- If the spreadsheet conflicts with existing repository logic, document the conflict instead of silently resolving it.
- Any future implementation should be designed so product-level onboarding form URLs can be managed from Shopify Admin.
- Any future implementation should support service-family-specific messaging without duplicating logic across many files.
- Any future implementation should account for the difference between one-off services, bundled service packages, and recurring or managed service offerings.
- Do not treat checkout as the start of service delivery where onboarding, intake, scoping, scheduling, setup, access, implementation, or review is required.
- Do not rely on fallback form URLs as launch-ready data if product metafields are incomplete.
- Do not expose internal catalogue notes, incomplete form mappings, or raw operational gaps to customers.

## How Jules should use this file

Jules should read this file alongside `AGENTS.md` before starting future implementation tasks.

This file is context only and should guide later tasks involving:

- Shopify service product page updates
- Onboarding form display
- Intake form display
- Product metafield rendering
- Variant metafield rendering
- Service delivery messaging
- Service commencement messaging
- Service family-specific messaging
- On-Demand Service customer journeys
- Bundled On-Demand Service customer journeys
- Managed Service / Outsourced Solution customer journeys
- Cart or checkout-adjacent service fulfilment messaging
- Customer account or post-purchase guidance
- Admin-facing product metafield usage expectations

Future Jules tasks should first confirm the relevant repository files and Shopify metafields before changing code. The correct next step for any implementation task is to inspect the current theme structure, confirm which product templates are actually assigned to service products, confirm which metafields are available in Liquid, and then make the smallest possible change that solves the requested behaviour.

If future implementation requires Shopify Admin data, product metafield definitions, product template assignment, external form creation, Shopify Forms setup, or checkout/thank-you-page configuration outside the repository, Jules should document that dependency clearly rather than pretending the theme repository can solve it alone.

## Future implementation checklist

Use this checklist before making future onboarding form changes:

- Confirm product page template structure.
- Confirm whether there are separate templates for service products.
- Confirm whether `templates/product.on-demand-service.json` is assigned to all relevant service products.
- Confirm whether Bundled On-Demand Services and Managed Services / Outsourced Solutions use the same template or need separate templates.
- Confirm whether product metafields are accessible in Liquid.
- Confirm whether variant metafields are accessible in Liquid.
- Confirm the exact metafield namespace/key names.
- Confirm whether `custom.onboarding_form` contains a URL, Shopify page path, form handle, form label, or other reference type.
- Confirm whether `on_demand.onboarding_form_url` should be used, deprecated, or populated later.
- Confirm whether the theme already renders custom product metafields in the relevant product template.
- Confirm whether service products currently use different JSON templates by family or category.
- Confirm whether the theme has a reusable product callout, accordion, banner, or metafield section that can be adapted.
- Confirm whether `rbp-onboarding-product-cta.liquid` should be reused, replaced, or adapted for service products.
- Confirm whether `rbp-product-state.liquid` should remain the fulfilment-routing layer or delegate onboarding display to a separate service-specific snippet.
- Confirm whether cart guidance copy correctly identifies services, not only document-style products.
- Confirm whether cart drawer guidance copy correctly identifies services, not only document-style products.
- Confirm whether order/account guidance sections are actually wired into customer account templates.
- Create or update a reusable onboarding callout section or snippet only when implementation is requested.
- Add service-family-specific messaging without duplicating logic across many files.
- Display onboarding form URL only when present and valid.
- Add fallback messaging when onboarding is required but the URL is missing.
- Avoid showing instant-download, instant-access, or immediate-start messaging where onboarding is required.
- Test On-Demand Service examples.
- Test Bundled On-Demand Service examples.
- Test Managed Service / Outsourced Solution examples.
- Test products with onboarding form URLs.
- Test products without onboarding form URLs.
- Test products where onboarding is required but the URL is missing.
- Test products with missing, incomplete, or inconsistent onboarding metadata.
- Test service variants if variant-level onboarding behaviour is introduced.
- Keep changes isolated and reviewable.
- Avoid unrelated Liquid, JSON, CSS, JavaScript, navigation, collection, or account refactors.
