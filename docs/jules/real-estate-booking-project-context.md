## Purpose

This repository contains Shopify storefront/theme work for Remote Business Partner. It is used to maintain and extend the Shopify customer-facing experience, including page templates, Liquid sections, assets, navigation-related theme behavior, and design-system-aligned storefront implementation.

This context file exists to give Google Jules high-level project background before it performs future fixes related to the Real Estate / Property Field Services booking rollout. It should help Jules understand the intended customer journey, the relevant Shopify pages and templates, and the outstanding deployment work without needing to reconstruct the project history from scratch.

## Business context

Remote Business Partner is expanding the Shopify store to support bookable real-estate-related field services. These services are intended to be presented as Shopify service products, with booking completed before payment and Shopify checkout used as the payment confirmation step.

The Real Estate / Property Field Services offer currently centres on seven services:

1. Property Condition Report
2. Routine Inspection
3. Exit Inspection
4. Open For Inspection Support
5. Maintenance Request Support
6. Insurance Claims Management
7. Key Installation

The intended commercial model is **booking first, checkout second**:

1. A customer discovers a service through the Shopify storefront.
2. The customer opens the relevant product page or service page.
3. The customer clicks **Book Now**.
4. The customer completes a Shopify-hosted booking form.
5. The booking form validates the property address and serviceability where available.
6. The booking form requests available appointment slots from the RBP bridge backend.
7. The customer selects a slot or submits a review-based request.
8. The bridge confirms the correct time-based Shopify variant and price.
9. The bridge holds the calendar slot and creates a Shopify checkout/draft order.
10. The customer pays through Shopify checkout.
11. Payment confirms the booking.
12. The Shopify order remains unfulfilled until the report, photos, attendance summary, or other service evidence is delivered.

The business reason for this flow is that the property address, access details, booking time, serviceability, and time-based price must be known before payment. A normal add-to-cart flow is not sufficient because the payable amount can depend on the selected appointment time and whether the request requires review.

The pricing model for these services is time-based. The expected pricing categories are:

- Standard Hours: Monday-Friday, 8:00am-6:00pm
- After Hours: Monday-Friday, 6:00pm-10:00pm
- Saturdays: Saturday, 9:00am-6:00pm
- Sundays: Sunday, 9:00am-6:00pm
- Public Holidays: Western Australia public holidays

WA public holiday classification should override normal weekday/weekend classification.

The expected base service prices are:

| Service | Standard Hours | After Hours | Saturdays | Sundays | Public Holidays |
|---|---:|---:|---:|---:|---:|
| Property Condition Report | $200 | $230 | $250 | $270 | $300 |
| Routine Inspection | $100 | $115 | $125 | $135 | $150 |
| Exit Inspection | $150 | $172.50 | $187.50 | $202.50 | $225 |
| Open For Inspection Support | $80 | $92 | $100 | $108 | $120 |
| Maintenance Request Support | $80 | $92 | $100 | $108 | $120 |
| Insurance Claims Management | $100 | $115 | $125 | $135 | $150 |
| Key Installation | $150 | $172.50 | $187.50 | $202.50 | $225 |

The storefront should present these products as service bookings, not as ordinary physical goods. The checkout and fulfilment language should support the service-delivery model.

## Application context

This repository appears to contain Shopify theme/storefront implementation for the current Remote Business Partner storefront. The active Shopify theme in the store has been identified as `shopify-design/main`. Previous work also referenced a `Copy of Refresh` theme, but future fixes should treat the current live theme and this repository as the source to reconcile unless the task says otherwise.

The Real Estate / Property Field Services implementation involves these Shopify storefront components:

### Core published support pages

The following pages exist in Shopify and should be treated as part of the Real Estate service content set:

- `/pages/property-field-services`
- `/pages/how-property-service-bookings-work`
- `/pages/property-service-pricing`
- `/pages/property-service-areas`
- `/pages/agency-access`
- `/pages/property-service-faqs`
- `/pages/booking-terms-cancellation-policy`

These pages explain the offer, booking flow, pricing, service areas, agency access, FAQs, and booking/cancellation rules. Some of the copy may still require updates to match the final deployed model, especially where older wording refers to a generic booking portal or Standard/Premium pricing rather than time-based variants.

### Shopify booking pages

The following one-page-per-service booking pages exist in Shopify and use the `booking-service` page template:

- `/pages/book-property-condition-report`
- `/pages/book-routine-inspection`
- `/pages/book-exit-inspection`
- `/pages/book-open-for-inspection-support`
- `/pages/book-maintenance-request-support`
- `/pages/book-insurance-claims-management`
- `/pages/book-key-installation`

The intended form flow is:

1. Contact details
2. Property details
3. Access details
4. Appointment
5. Review and payment

The booking page template should call the RBP bridge app proxy at:

```text
/apps/rbp-bridge/api
```

Expected storefront API calls are:

```text
/apps/rbp-bridge/api/check-address
/apps/rbp-bridge/api/available-slots
/apps/rbp-bridge/api/preview-price
/apps/rbp-bridge/api/hold-and-checkout
```

These map through the Shopify app proxy to the bridge backend. The bridge target has previously been described as:

```text
https://rbp-integration-bridge-dlng4rmgtq-uc.a.run.app/api/app-proxy
```

### Relevant theme files and elements

The Real Estate booking work is expected to involve or preserve the following theme files/elements where present:

- `templates/page.booking-service.json`
- `sections/property-service-booking-form.liquid`
- `assets/property-service-booking.js`
- `assets/property-service-booking.css`
- `templates/product.booking-service.json`
- `sections/booking-service-product.liquid`

The product template is intended to display:

- the service title
- a `From` price
- booking-first checkout explanation
- time-based pricing explanation
- a `Book Now` CTA
- a link to the booking explanation page
- the product description and pricing table

The booking form asset currently should treat the bridge as the source of truth for address checks, available slots, price preview, and checkout creation. Browser-side calculations may be useful as visual hints but should not be treated as authoritative for price or confirmation.

### Required Shopify products

The full deployed product state requires seven service products with these exact expected handles:

- `property-condition-report`
- `routine-inspection`
- `exit-inspection`
- `open-for-inspection-support`
- `maintenance-request-support`
- `insurance-claims-management`
- `key-installation`

Each product should use the `product.booking-service` template and should have five variants:

- Standard Hours
- After Hours
- Saturdays
- Sundays
- Public Holidays

Each variant should be mapped with booking/time-category metadata where possible, for example:

- `booking.time_category`
- `booking.time_category_label`
- `booking.time_rule`
- `booking.wa_public_holiday_applies`

Each product should also carry product-level booking/service metadata where the theme or bridge needs it, for example:

- `booking.service_type`
- `booking.time_pricing_enabled`
- `booking.timezone`

The current project review found that the products were not returned under these expected handles in Shopify at that time. Jules should verify current repository and store state before assuming the products already exist or are correctly wired.

### Required collection

The full deployed product journey requires a Property Field Services collection:

```text
/collections/property-field-services
```

The expected collection should contain the seven service products above. A smart collection based on the `Property Field Services` product tag is acceptable if it aligns with the store architecture. If the repository contains theme references to this collection, those references should only be kept if the collection exists or is being restored.

### Navigation

Property Field Services should be discoverable from storefront navigation once ready. Future work may need to add links to:

- the header menu, ideally under a Services or related section
- the footer menu, ideally under a Property Services group
- relevant support/help pages
- the Property Field Services landing page

Do not add navigation blindly if the products and collection are not ready. Navigation should only be exposed when the booking journey is ready for customers or when the task explicitly requests pre-launch exposure.

## Key goals

Jules should keep the following goals in mind when making future changes:

1. **Make the Real Estate booking flow fully deployable**
   - Customers should be able to discover a service, open the relevant product or booking page, complete the booking form, select a slot, preview the correct price, continue to Shopify checkout, and have payment confirm the booking.

2. **Keep Shopify as the storefront and payment source of truth**
   - Product presentation, pricing variants, checkout, orders, and fulfilment should remain Shopify-owned.
   - The bridge should provide booking logic, calendar availability, slot holding, and checkout creation support.

3. **Use the bridge for secure operational logic**
   - Do not put Google Calendar credentials, Shopify Admin API tokens, address API keys, or other secrets in theme files.
   - Theme code should call the app proxy path, not external secret-bearing APIs directly.

4. **Align all copy with the final booking model**
   - Replace stale references to a generic booking portal where the Shopify booking page is now the customer-facing form.
   - Replace outdated Standard/Premium pricing copy with the time-based pricing model.
   - Remove development or placeholder wording from production-facing booking pages.

5. **Ensure product handles and template mappings stay exact**
   - The booking pages and product templates depend on predictable handles.
   - Avoid changing handles unless the task explicitly includes redirect and reference updates.

6. **Prevent fake or placeholder bookings in production**
   - If live availability fails, do not allow customers to proceed using placeholder slots.
   - If bridge price preview fails, do not allow checkout.
   - If slot hold or checkout creation fails, show a customer-safe error and do not create a false confirmation.

7. **Support the correct fulfilment model**
   - Payment should confirm the booking, but the Shopify order should remain unfulfilled until the service output is delivered.
   - Service outputs may include reports, photos, attendance summaries, or other evidence.

8. **Maintain mobile usability**
   - The booking pages and product pages must remain usable on mobile viewports such as 390px, 430px, and tablet widths.
   - Avoid layouts that create horizontal scrolling or cramped form controls.

9. **Keep launch changes reviewable**
   - Prefer targeted fixes to broad theme rewrites.
   - Preserve existing design-system conventions unless the task asks for a redesign.

10. **Confirm end-to-end behavior before marking complete**
   - The Property Condition Report flow should be used as the first full test case.
   - A complete test includes address check, available slots, price preview, hold-and-checkout, Shopify checkout, payment webhook, calendar confirmation, and unfulfilled order state.

## Important constraints

- Read `AGENTS.md` before starting any future task.
- Keep changes scoped to the task. Do not refactor unrelated theme files or redesign unrelated storefront areas.
- Do not add unrelated Jules context files unless specifically requested.
- Do not modify existing files unless required by the requested implementation or fix.
- Preserve existing Shopify theme compatibility and avoid using non-Shopify-compatible Liquid, schema, or asset patterns.
- Keep theme changes safe for Shopify's Online Store 2.0 conventions where applicable.
- Do not hardcode private secrets, API tokens, service account credentials, or local environment values into Liquid, JavaScript, JSON templates, or documentation intended for the repository.
- Use `/apps/rbp-bridge/api` as the storefront-facing bridge base path unless the task explicitly changes the bridge architecture.
- Treat the bridge/backend as the final authority for pricing, availability, slot hold creation, and checkout creation.
- Treat Shopify product variants as the pricing source of truth.
- Do not rely on placeholder slot data or browser-only time classification for final production checkout.
- Avoid changes that make service products look like ordinary shipped physical goods unless the fulfilment and shipping configuration has been intentionally designed for that.
- Maintain clear customer-facing language: booking is not confirmed until Shopify payment is completed.
- Maintain clear operational language: order fulfilment occurs after service output is delivered, not immediately after payment.
- Do not expose Property Field Services navigation publicly if the product catalogue, collection, and checkout flow are not ready, unless the task explicitly asks for pre-launch visibility.
- If a repository file appears to conflict with live Shopify state, report the discrepancy clearly rather than guessing.

## How Jules should use this file

Jules should read this file alongside `AGENTS.md` before starting future implementation tasks related to Real Estate / Property Field Services.

Use this file as high-level project context, not as a replacement for the task prompt. The active task prompt should still control exactly what Jules changes.

Recommended workflow for Jules:

1. Read `AGENTS.md`.
2. Read this file.
3. Inspect the repository for the relevant templates, sections, assets, and page/product references.
4. Confirm whether the task relates to Shopify theme code, product/collection setup, booking-page copy, bridge integration, navigation, or launch hardening.
5. Make the smallest change that satisfies the task.
6. Avoid unrelated refactors.
7. Run available lint, test, and build checks where practical.
8. In the final notes or pull request summary, include:
   - files changed
   - behavior changed
   - validation performed
   - assumptions made
   - any remaining deployment risks

For the final Real Estate launch, Jules should expect that the remaining work may include:

- restoring or creating the seven service products
- restoring or creating the Property Field Services collection
- updating the support page copy
- removing placeholder booking-page copy and fake-slot fallback behavior
- adding service-specific booking fields
- ensuring navigation exposes the journey at the right time
- confirming bridge routes work through the Shopify app proxy
- confirming payment webhook and calendar confirmation behavior
- preserving the unfulfilled-until-output-delivered fulfilment model
