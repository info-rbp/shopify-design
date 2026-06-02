## Purpose

This repository contains the Shopify storefront theme implementation for Remote Business Partner (RBP), including product templates, Liquid sections, JSON templates, cart guidance, customer-facing product information and related storefront documentation.

This file exists to give Google Jules high-level project context before it works on future repository fixes relating to Nucleus onboarding forms, Shopify product pages, product metafields, product templates and the customer post-purchase journey.

This file is context only. It is intended to guide future Jules tasks before any code changes are made. It does not request implementation of an onboarding form section, product page rewrite, Liquid change, JSON template change, JavaScript change or Shopify data migration.

The repository needs a clear, maintainable place and implementation pattern for onboarding form links for each Nucleus product. Every Nucleus product requires an onboarding form to be completed before fulfilment, preparation, delivery, customisation, deployment or access begins. The storefront must not imply that a product is delivered instantly when an onboarding form is required first.

## Business context

Nucleus is the document-product layer of the RBP Shopify catalogue. The business sells Shopify products across three main Nucleus product families:

- Templates
- Documentation Suites
- Toolkits

These are not simple instant-download products. All Nucleus products require the customer to complete an onboarding form before delivery, fulfilment, customisation, deployment, setup or access begins.

The expected customer journey is:

1. Customer views a product.
2. Customer purchases the product.
3. Customer is directed to complete the relevant onboarding form.
4. The business reviews the onboarding form submission.
5. Delivery, setup, deployment or fulfilment begins.
6. For Toolkits, additional setup or managed implementation may occur depending on the variant, access model or package tier.

The storefront must be careful with wording around delivery, instant download, fulfilment and setup expectations. Product pages, cart guidance, post-purchase messaging and customer help content should make it clear that checkout starts the onboarding-led fulfilment process. They should not imply that customers receive final files, toolkit access or completed deliverables immediately at checkout unless a future product is explicitly configured for true instant delivery.

## Product catalogue source

The attached spreadsheet `Template Import File.csv` is the source of truth for the current attached catalogue data used for this context task.

The spreadsheet currently contains:

| Product group | Count in attached spreadsheet | Notes |
| --- | ---: | --- |
| Templates | 2,241 products | All products have `Type` set to `Template Pack`, `Product Family (product.metafields.custom.product_family)` set to `Templates`, and `Product Category (product.metafields.custom.product_category)` set to `Template`. |
| Documentation Suites | 0 products found | No Documentation Suite rows were present in the attached spreadsheet. Future suite implementation should not infer product handles or URLs from this file alone. |
| Toolkits | 0 products found | No Toolkit rows were present in the attached spreadsheet. Future toolkit implementation should not infer product handles, setup models or access models from this file alone. |

For the Template products in the attached spreadsheet:

- `Requires Onboarding Form (product.metafields.custom.requires_onboarding_form)` is `TRUE` for all 2,241 products.
- `Onboarding Form (product.metafields.custom.onboarding_form)` is populated for all 2,241 products, but the value is `Required after purchase`, not an actual URL.
- `Delivery Time (product.metafields.custom.delivery_time)` is `Created after onboarding form is submitted` for all 2,241 products.
- `Published` is `false` for all 2,241 products.
- `Status` is `active` for all 2,241 products.
- `Option1 Name` is `Title` and `Option1 Value` is `Default Title` for all 2,241 products, so the attached file does not show package tiers or variant-specific onboarding behaviour.

Relevant spreadsheet columns for onboarding forms and Shopify implementation include the following exact column names:

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
- `Image Src`
- `SEO Title`
- `SEO Description`
- `Delivery Time (product.metafields.custom.delivery_time)`
- `Onboarding Form (product.metafields.custom.onboarding_form)`
- `Product Category (product.metafields.custom.product_category)`
- `Product Family (product.metafields.custom.product_family)`
- `Product Subcategory (product.metafields.custom.product_subcategory)`
- `Related Toolkits (product.metafields.custom.related_toolkits)`
- `Requires Onboarding Form (product.metafields.custom.requires_onboarding_form)`
- `Related toolkit (product.metafields.suite.related_toolkit)`
- `Related documentation suites (product.metafields.template.related_documentation_suites)`
- `Related toolkits (product.metafields.template.related_toolkits)`
- `Access model (product.metafields.toolkit.access_model)`
- `Assisted setup available (product.metafields.toolkit.assisted_setup_available)`
- `Related documentation suites (product.metafields.toolkit.related_documentation_suites)`
- `Setup required (product.metafields.toolkit.setup_required)`
- `Toolkit system status (product.metafields.toolkit.system_status)`
- `Toolkit system type (product.metafields.toolkit.system_type)`
- `Workspace platform (product.metafields.toolkit.workspace_platform)`
- `Status`

The spreadsheet includes columns for suite and toolkit metafields even though the attached rows are currently only Template products. Future Jules tasks should treat those columns as planned or available product data structures, not proof that suite or toolkit products are present in this specific file.

## Application context

This repository appears to contain a Shopify Online Store 2.0 theme with Liquid sections, JSON templates, assets, snippets, layout files and Jules project documentation.

Repository areas already identified as relevant to future onboarding form implementation include:

- `AGENTS.md`, which sets repository-wide Jules working rules.
- `docs/jules/`, which stores task-specific project context files.
- `templates/product.json`, the default product template currently wiring in product, product-state, product-information, product-offerings, FAQ, help and related product sections.
- `templates/cart.json`, the cart template currently wiring in `rbp-cart-guidance`, `main-cart-items` and `main-cart-footer`.
- `sections/main-product.liquid`, the default Shopify product section.
- `sections/rbp-product-state.liquid`, which currently handles product-state and fulfilment messaging.
- `sections/rbp-product-information.liquid`, which reads product metafields including product family, delivery time, onboarding flag and onboarding form.
- `sections/rbp-product-offerings.liquid`, which supports Templates, Documentation Suites and Toolkits cross-navigation.
- `sections/rbp-product-faq.liquid`, which may repeat delivery and fulfilment messaging.
- `sections/rbp-product-help.liquid`, which may surface support or help content.
- `sections/rbp-onboarding-product-cta.liquid`, an existing onboarding CTA section that already references `custom.requires_onboarding_form` and `custom.onboarding_form`.
- `sections/rbp-cart-guidance.liquid`, which already contains cart-level onboarding guidance for document-style products.
- `assets/rbp-product.css`, which supports product-page styling.
- `layout/theme.liquid`, which may matter if future implementation needs global assets or shared section assumptions.

Do not change these files as part of this documentation task. Future Jules implementation tasks should inspect the files above and confirm their current behaviour before editing.

Important repository observation: `sections/rbp-product-state.liquid` currently appears to classify `template-pack`, `toolkit`, `digital-toolkit` and `documentation-suite` product types as `instant`, and the instant block says customers receive an instant download link and account downloads. That conflicts with the Nucleus requirement that Templates, Documentation Suites and Toolkits require onboarding before delivery. This should be reviewed in a future implementation task, not changed here.

Another important repository observation: `sections/rbp-onboarding-product-cta.liquid` already exists and appears to be a candidate reusable section or reference pattern. Future work should decide whether to keep, refactor, replace or reuse it. Do not assume it is final merely because it exists.

## Onboarding form architecture

The recommended future architecture is metafield-driven wherever possible.

The primary product metafield for the onboarding form destination should be:

- `custom.onboarding_form`

The primary boolean product metafield controlling whether onboarding messaging appears should be:

- `custom.requires_onboarding_form`

Related product and delivery context should come from product metafields where available:

- `custom.delivery_time`
- `custom.product_family`
- `custom.product_category`
- `custom.product_subcategory`
- `template.related_documentation_suites`
- `template.related_toolkits`
- `suite.related_toolkit`
- `toolkit.setup_required`
- `toolkit.access_model`

If variant-level onboarding is introduced later, Toolkit products may also need variant-level fields such as:

- `toolkit.requires_onboarding`

The attached spreadsheet does not currently include variant-level onboarding fields or Toolkit package-tier rows. Any future use of `toolkit.requires_onboarding` should be confirmed against actual Shopify metafield definitions and product variant data before implementation.

Recommended architecture principles:

- Onboarding form URLs should come from Shopify metafields where possible.
- `custom.requires_onboarding_form` should determine whether onboarding messaging appears.
- `custom.onboarding_form` should provide the form URL or route used by the storefront.
- `custom.delivery_time` should be used to avoid misleading delivery promises.
- Toolkit products may also use `toolkit.setup_required`, `toolkit.access_model` and future variant-level onboarding fields where available.
- Product pages should display clear onboarding instructions when onboarding is required.
- Cart or checkout-adjacent messaging should remind customers that fulfilment begins after onboarding information is submitted.
- The theme should avoid hardcoded product-specific onboarding URLs wherever possible.
- If hardcoding is temporarily unavoidable, it should be isolated in one maintainable section or snippet and documented as temporary technical debt.

The long-term goal is to have one consistent onboarding callout pattern across Templates, Documentation Suites and Toolkits, with product-specific URLs driven from metafields and product-family-specific wording controlled through Liquid logic, schema settings or theme content patterns.

## Product page requirements

Product pages should show onboarding information whenever `custom.requires_onboarding_form` is true.

At minimum, future product page implementation should:

- Show an onboarding form callout when `custom.requires_onboarding_form` is true.
- Display or link to the form URL from `custom.onboarding_form` when present and valid.
- Use clear language such as: "Complete the onboarding form after purchase so we can prepare your product."
- Avoid saying "instant download" for products that require onboarding first.
- Explain that delivery, fulfilment, setup or implementation begins after the onboarding form is completed and reviewed.
- Use `custom.delivery_time` where populated.
- Provide fallback messaging when onboarding is required but the onboarding form URL is missing or invalid.
- Keep the purchase area, product information section, FAQ and cart messaging consistent.

Recommended family-specific messaging:

### Template example

"After purchase, complete the onboarding form so we can confirm the details needed to prepare and deliver your template."

Templates should keep the message simple. The customer needs to understand that the purchased document is prepared after onboarding, not instantly downloaded.

### Documentation Suite example

"After purchase, complete the onboarding form so we can confirm your business context and prepare the documentation suite for delivery."

Documentation Suites should explain that the form helps confirm scope, process context, included documents and delivery details.

### Toolkit example

"After purchase, complete the onboarding form so we can confirm your setup requirements, access model and deployment details before implementation begins."

Toolkits should explain that the form may be required for setup, deployment, configuration, managed implementation or workspace access. If different Toolkit variants have different setup paths, future implementation should account for variant-level or package-level messaging only after confirming actual variant metafields.

## Repository areas likely to need future updates

Future Jules implementation tasks should review these areas before making code changes:

| Area | Likely file or folder | Why it matters | Future change to consider |
| --- | --- | --- | --- |
| Jules working rules | `AGENTS.md` | Defines repository-level working rules and scope discipline. | Read before implementation and keep changes limited. |
| Jules context docs | `docs/jules/` | Stores project context for future tasks. | Read this file alongside related product-template context before changing code. |
| Default product template | `templates/product.json` | Controls the default product page section order. | Confirm where onboarding callouts should sit relative to purchase, product state, product info, FAQ and help sections. |
| Future Nucleus product templates | `templates/product.template.json`, `templates/product.documentation-suite.json`, `templates/product.toolkit.json` if created later | Dedicated templates may be needed for Nucleus families. | Create only when specifically requested; preserve valid Shopify Online Store 2.0 JSON structure. |
| Main product purchase area | `sections/main-product.liquid` | Contains title, price, variants, quantity and buy buttons. | Consider whether onboarding messaging belongs near buy buttons or should remain in a separate section. |
| Product fulfilment state | `sections/rbp-product-state.liquid` | Currently appears to show instant-download messaging for Template Pack, Toolkit and Documentation Suite product types. | Review and align product-state logic with `custom.requires_onboarding_form` and Nucleus fulfilment rules. |
| Product information | `sections/rbp-product-information.liquid` | Already reads `custom.delivery_time`, `custom.requires_onboarding_form` and `custom.onboarding_form`. | Ensure onboarding form links only appear when valid and wording matches product family. |
| Existing onboarding CTA | `sections/rbp-onboarding-product-cta.liquid` | Existing candidate section for onboarding form display. | Decide whether to reuse, refactor, convert to snippet or replace with a cleaner metafield-driven pattern. |
| Product offerings navigation | `sections/rbp-product-offerings.liquid` | Helps customers navigate between Templates, Documentation Suites and Toolkits. | Keep related-product messaging consistent with onboarding-led fulfilment. |
| Product FAQ | `sections/rbp-product-faq.liquid` | May repeat delivery and onboarding guidance. | Confirm FAQ copy does not conflict with product-page and cart messaging. |
| Product help content | `sections/rbp-product-help.liquid` | May display support or post-purchase guidance. | Consider help content explaining onboarding, delivery and support pathways. |
| Cart template | `templates/cart.json` | Determines cart guidance and cart layout. | Confirm onboarding messaging appears before checkout where appropriate. |
| Cart guidance | `sections/rbp-cart-guidance.liquid` | Already flags document-style products as requiring onboarding. | Align cart language with product metafields and avoid broad tag/type assumptions where possible. |
| Cart line items | `sections/main-cart-items.liquid` | Could surface per-line onboarding notes if needed. | Consider only if future task requires line-level messaging. |
| Cart footer | `sections/main-cart-footer.liquid` | Contains checkout controls. | Consider checkout-adjacent reminder copy if supported and not disruptive. |
| Customer account or portal | `sections/rbp-member-portal-page.liquid`, customer/account-related templates if present | May support post-purchase help or access guidance. | Review whether customer account content should direct buyers to onboarding forms after purchase. |
| Order confirmation / thank-you page | Shopify checkout settings, customer events or post-purchase surfaces outside theme depending on Shopify limitations | Shopify thank-you and order-status customisation may be limited by plan and checkout extensibility. | Document limitations before attempting implementation; do not assume this theme can edit checkout. |
| Shared snippets | `snippets/` | A reusable onboarding callout may belong here if multiple sections need it. | Consider a single snippet for repeated onboarding logic, but only in a future implementation task. |
| Theme settings and schemas | `config/settings_schema.json`, section schema blocks | May control reusable wording, colour schemes or toggles. | Add settings only if a future task needs merchant-editable content. |
| Product styles | `assets/rbp-product.css` and related assets | Styling may already support RBP product cards and callouts. | Reuse existing styling where practical; avoid broad CSS refactors. |

Do not make those changes in this task.

## Spreadsheet-driven onboarding form mapping

Future Jules tasks should use the spreadsheet to validate product data before implementation.

Recommended mapping process:

1. Identify unique products by `Handle`.
2. Read the display name from `Title`.
3. Group products by `Product Family (product.metafields.custom.product_family)` and fall back to `Type` only if the product-family metafield is blank.
4. Determine whether onboarding is required from `Requires Onboarding Form (product.metafields.custom.requires_onboarding_form)`.
5. Find the onboarding destination from `Onboarding Form (product.metafields.custom.onboarding_form)`.
6. Validate that the onboarding value is an actual URL or agreed Shopify route, not placeholder text.
7. Read delivery expectations from `Delivery Time (product.metafields.custom.delivery_time)`.
8. Confirm product category and subcategory from `Product Category (product.metafields.custom.product_category)` and `Product Subcategory (product.metafields.custom.product_subcategory)`.
9. For Templates, review `Related documentation suites (product.metafields.template.related_documentation_suites)` and `Related toolkits (product.metafields.template.related_toolkits)` where populated.
10. For Documentation Suites, review `Related toolkit (product.metafields.suite.related_toolkit)` where populated.
11. For Toolkits, review `Setup required (product.metafields.toolkit.setup_required)`, `Access model (product.metafields.toolkit.access_model)` and any future variant-level onboarding metadata.

Future data validation should flag:

- Products requiring onboarding but missing a valid `custom.onboarding_form` URL or route.
- Products with onboarding URLs but missing `custom.requires_onboarding_form`.
- Products using delivery language that conflicts with onboarding requirements.
- Products where product type, tags or theme logic imply instant download even though onboarding is required.
- Toolkits missing setup or deployment metadata.
- Variants that likely require onboarding but do not have variant-level onboarding metadata.
- Products where onboarding appears unnecessary but `custom.requires_onboarding_form` is true.

The attached spreadsheet does not contain actual onboarding form URLs. It uses `Required after purchase` in `Onboarding Form (product.metafields.custom.onboarding_form)` for all Template products. That value may be useful as a status note, but it is not a usable storefront link.

## Outstanding onboarding data issues

The following issues should be raised before implementation:

- All 2,241 Template products in the attached spreadsheet require onboarding, but `Onboarding Form (product.metafields.custom.onboarding_form)` contains `Required after purchase` rather than an actual onboarding form URL or Shopify route.
- No Documentation Suite rows were present in the attached spreadsheet, even though suite metafield columns exist.
- No Toolkit rows were present in the attached spreadsheet, even though toolkit metafield columns exist.
- The attached spreadsheet does not show package-tier or variant-level onboarding data. All rows use `Option1 Name` = `Title` and `Option1 Value` = `Default Title`.
- Toolkit setup and deployment metadata cannot be validated from this attached file because no Toolkit products are present.
- Variant-level `toolkit.requires_onboarding` is not visible in the attached spreadsheet and should be treated as planned or future data unless confirmed in Shopify Admin.
- The repository appears to contain existing product-state logic that may show instant-download messaging for product types that should require onboarding. This is a repository logic issue to review later.
- If the spreadsheet conflicts with existing repository logic, Jules should document the conflict and avoid silently resolving it in unrelated code.

## Key goals

Future Jules tasks should keep these goals in mind:

- Make onboarding requirements clear before and after purchase.
- Ensure every product has a reliable onboarding form pathway.
- Use Shopify metafields rather than hardcoded URLs wherever possible.
- Keep product page messaging consistent across Templates, Documentation Suites and Toolkits.
- Support future scaling as more products and forms are added.
- Preserve Shopify theme compatibility.
- Keep changes reviewable and limited in scope.
- Avoid unrelated refactors.
- Avoid breaking existing product, cart, checkout or theme behaviour.
- Avoid showing instant-download messaging for products that require onboarding before fulfilment.
- Keep Shopify Admin as the long-term management point for product-level onboarding form URLs.

## Important constraints

Future work should observe these constraints:

- Do not modify existing files unless specifically asked in a future task.
- Do not implement code in this documentation task.
- Do not add other Jules files as part of this task.
- Do not refactor unrelated theme components.
- Do not hardcode product onboarding URLs unless no metafield-based option exists.
- Do not change product data or Shopify metafield definitions from the repository unless specifically instructed.
- Preserve existing storefront behaviour unless a future task explicitly asks for a behaviour change.
- Maintain Shopify theme compatibility.
- Keep future changes small and reviewable.
- Use the spreadsheet as product context, but do not assume it is perfect.
- If the spreadsheet conflicts with existing repository logic, document the conflict instead of silently resolving it.
- Any future implementation should be designed so product-level onboarding form URLs can be managed from Shopify Admin.
- Do not assume Documentation Suite or Toolkit product rows exist unless they are present in the relevant catalogue file or Shopify product data.
- Do not assume checkout, thank-you page or order-status-page customisation is available from this theme alone. Confirm Shopify limitations first.

## How Jules should use this file

Jules should read this file alongside `AGENTS.md` before starting future implementation tasks involving Nucleus onboarding, product pages, product metafields, delivery messaging or post-purchase customer guidance.

This file is context only and should guide later tasks involving:

- Shopify product page updates
- Onboarding form display
- Product metafield rendering
- Product delivery messaging
- Product family-specific messaging
- Template, Documentation Suite and Toolkit customer journeys
- Cart and checkout-adjacent onboarding guidance
- Customer account or post-purchase help content where supported

Future Jules tasks should first confirm the relevant repository files, Shopify metafields and actual catalogue data before changing code. The implementation should be scoped to the task requested at that time.

## Future implementation checklist

Use this checklist in a later implementation task:

- Confirm product page template structure.
- Confirm whether dedicated Nucleus product templates exist or are required.
- Confirm whether product metafields are accessible in Liquid.
- Confirm the exact metafield namespace/key names.
- Confirm whether `custom.onboarding_form` is a URL, page reference, metaobject reference, single-line text field or another metafield type.
- Confirm whether `custom.requires_onboarding_form` is consistently populated.
- Confirm whether the theme already renders custom product metafields in all required page areas.
- Confirm whether `sections/rbp-onboarding-product-cta.liquid` should be reused, refactored or replaced.
- Confirm whether `sections/rbp-product-state.liquid` needs to stop treating Template Pack, Documentation Suite and Toolkit products as instant downloads.
- Create or update a reusable onboarding callout section or snippet only when implementation is requested.
- Add product-family-specific messaging for Templates, Documentation Suites and Toolkits.
- Display onboarding form URL only when present and valid.
- Add fallback messaging when onboarding is required but the URL is missing.
- Avoid showing instant-download messaging where onboarding is required.
- Test Template, Documentation Suite and Toolkit product examples once representative products exist.
- Test products with and without onboarding form URLs.
- Test cart guidance for mixed carts.
- Test product pages with missing or placeholder onboarding form data.
- Keep changes isolated and reviewable.
