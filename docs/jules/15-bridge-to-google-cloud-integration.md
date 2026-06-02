# Bridge to Google Cloud Integration Guide

## Purpose

This document defines the production Shopify-to-Google-Cloud integration that Jules must use when implementing storefront forms, onboarding submissions, Business NBN checks, order-intent flows, core service intake, marketplace enquiries, or any workflow that sends storefront data to the RBP backend.

This file overrides older generic placeholder app-proxy examples such as `/apps/rbp-onboarding/business-health-check` unless a future task explicitly confirms a different installed app proxy configuration.

## Installed Shopify Custom App Identity

Use the existing installed Shopify custom app as the integration point.

```text
Shopify custom app title: Bridge to Google Cloud
Purpose: Connect Shopify storefront/backend workflows to Google Cloud
Cloud Run backend service name: rbp-integration-bridge
Known Cloud Run URL: https://rbp-integration-bridge-dlng4rmgtq-ts.a.run.app
Expected Shopify app proxy storefront path: /apps/rbp-bridge
Expected backend proxy target: https://rbp-integration-bridge-dlng4rmgtq-ts.a.run.app/api/app-proxy
```

The app title `Bridge to Google Cloud` is the Shopify Admin app identity.

The storefront proxy path remains:

```text
/apps/rbp-bridge
```

unless Shopify Admin shows a different app proxy subpath.

## Absolute implementation rule

Jules must not:

- Create a new Shopify app.
- Assume a second Shopify app proxy.
- Use `/apps/rbp-onboarding` as the default route.
- Submit directly from Liquid or browser JavaScript to the Cloud Run URL.
- Hardcode private Google Cloud URLs into browser-facing theme code.
- Commit Shopify Admin tokens, Storefront tokens, Google secrets, app secrets, or bridge command keys.

Theme code must submit through Shopify app proxy paths such as:

```text
/apps/rbp-bridge
/apps/rbp-bridge/api/plans
/apps/rbp-bridge/api/check-address
/apps/rbp-bridge/api/order-intent
/apps/rbp-bridge/api/core-service-intake
```

Do not submit directly to:

```text
https://rbp-integration-bridge-dlng4rmgtq-ts.a.run.app/...
```

Direct browser calls to Cloud Run app-proxy endpoints are expected to reject unsigned traffic. Shopify must forward the request so the bridge receives Shopify's signed app-proxy query.

## Correction to previous onboarding route assumptions

Replace this older default destination:

```text
/apps/rbp-onboarding/business-health-check
```

with the existing installed-app proxy path:

```text
/apps/rbp-bridge
```

For the first Business Health Check pilot, use this immediate safe route:

```yaml
submission:
  handler: app_proxy
  method: post
  destination: /apps/rbp-bridge
  success_redirect: /pages/thank-you
  error_mode: inline
```

If a dedicated onboarding backend route is later added in the bridge backend, then use:

```text
/apps/rbp-bridge/api/onboarding/business-health-check
```

Do not use that path until the bridge backend actually implements:

```text
POST /api/app-proxy/api/onboarding/business-health-check
```

## Business Health Check payload contract

The Business Health Check onboarding form should submit fields compatible with the bridge lead pipeline.

Expected logical payload shape:

```json
{
  "sourceArea": "core_services",
  "formType": "business-health-check",
  "name": "Contact name",
  "email": "customer@example.com",
  "phone": "Optional phone",
  "productOrService": "Business Health Check",
  "message": "Main challenge or context",
  "preferredNextStep": "Desired outcome",
  "timeline": "Urgency",
  "sourcePage": "business-health-check",
  "urlContext": "Current page URL",
  "metadata": {
    "business_name": "Business name",
    "industry": "Industry",
    "form_id": "business-health-check",
    "submitted_via": "Bridge to Google Cloud"
  }
}
```

At minimum, the Liquid form should include these hidden/default fields:

```html
<input type="hidden" name="sourceArea" value="core_services">
<input type="hidden" name="formType" value="business-health-check">
<input type="hidden" name="productOrService" value="Business Health Check">
<input type="hidden" name="metadata[form_id]" value="business-health-check">
<input type="hidden" name="metadata[bridge_app_title]" value="Bridge to Google Cloud">
```

The visible Business Health Check fields should map as follows:

| Theme field | Bridge payload field |
|---|---|
| `contact_name` | `name` |
| `email` | `email` |
| `phone` | `phone` |
| `current_challenge` | `message` |
| `desired_outcome` | `preferredNextStep` |
| `urgency` | `timeline` |
| `business_name` | `metadata[business_name]` |
| `industry` | `metadata[industry]` |
| `page.handle` | `sourcePage` |
| current page URL | `urlContext` |

Keep the backend responsible for server-side validation and storage.

## Shopify Admin API scopes

The installed custom app `Bridge to Google Cloud` has broad Admin API access. Theme code must not use these scopes directly. The backend bridge may use them where explicitly implemented.

Admin API scopes supplied include:

```text
read_analytics, read_apps, write_assigned_fulfillment_orders, read_assigned_fulfillment_orders, read_customer_events, write_checkout_branding_settings, read_checkout_branding_settings, write_custom_pixels, read_custom_pixels, write_customers, read_customers, write_discounts, read_discounts, write_discovery, read_discovery, write_draft_orders, read_draft_orders, write_files, read_files, write_fulfillments, read_fulfillments, write_gift_card_transactions, read_gift_card_transactions, write_gift_cards, read_gift_cards, write_inventory, read_inventory, write_legal_policies, read_legal_policies, write_locations, read_locations, write_marketing_events, read_marketing_events, write_merchant_managed_fulfillment_orders, read_merchant_managed_fulfillment_orders, write_metaobject_definitions, read_metaobject_definitions, write_metaobjects, read_metaobjects, write_online_store_navigation, read_online_store_navigation, write_online_store_pages, read_online_store_pages, write_order_edits, read_order_edits, write_orders, read_orders, write_packing_slip_templates, read_packing_slip_templates, write_payment_customizations, read_payment_customizations, write_payment_terms, write_pixels, read_pixels, write_price_rules, read_price_rules, write_product_feeds, read_product_feeds, write_product_listings, read_product_listings, write_products, read_products, write_publications, read_publications, write_purchase_options, read_purchase_options, write_reports, read_reports, write_resource_feedbacks, read_resource_feedbacks, write_returns, read_returns, write_channels, read_channels, write_script_tags, read_script_tags, write_shipping, read_shipping, write_locales, read_locales, write_markets, read_markets, read_shopify_payments_accounts, read_shopify_payments_bank_accounts, write_shopify_payments_disputes, read_shopify_payments_disputes, read_shopify_payments_payouts, write_content, read_content, write_store_credit_account_transactions, read_store_credit_account_transactions, read_store_credit_accounts, write_themes, read_themes, write_third_party_fulfillment_orders, read_third_party_fulfillment_orders, write_translations, read_translations, read_all_cart_transforms, write_app_proxy, read_app_proxy, write_cart_transforms, read_cart_transforms, write_cash_tracking, read_cash_tracking, write_checkout_and_accounts_configurations, read_checkout_and_accounts_configurations, write_companies, read_companies, write_custom_fulfillment_services, read_custom_fulfillment_services, write_customer_data_erasure, read_customer_data_erasure, write_customer_merge, write_delivery_customizations, read_delivery_customizations, write_delivery_option_generators, read_delivery_option_generators, write_discounts_allocator_functions, read_discounts_allocator_functions, write_fulfillment_constraint_rules, read_fulfillment_constraint_rules, write_inventory_shipments, read_inventory_shipments, write_inventory_shipments_received_items, write_inventory_shipments_received_items, write_inventory_transfers, read_inventory_transfers, write_marketing_integrated_campaigns, read_marketing_integrated_campaigns, write_markets_home, read_markets_home, write_privacy_settings, read_privacy_settings, read_shopify_payments_provider_accounts_sensitive, write_theme_code, write_validations, read_validations
```

Important scope implications:

| Scope area | Backend implication |
|---|---|
| `write_customers` / `read_customers` | Backend can create or update customer records. |
| `write_metaobjects` / `read_metaobjects` | Backend can store lead, admin task, or workflow records if implemented. |
| `write_metaobject_definitions` / `read_metaobject_definitions` | Backend can create or inspect definitions if implemented. |
| `write_orders` / `read_orders` | Backend can match orders and process order workflows if implemented. |
| `write_app_proxy` / `read_app_proxy` | App proxy configuration is supported. |
| `read_apps` | Installed app visibility or scope validation is supported. |
| `write_files` / `read_files` and `write_content` / `read_content` | Backend can support content or file workflows if explicitly implemented. |

Jules must still route all Admin API work through the bridge backend, not through public theme code.

## Storefront API scopes

The installed app also has Storefront API access:

```text
unauthenticated_write_checkouts, unauthenticated_read_checkouts, unauthenticated_read_content, unauthenticated_write_customers, unauthenticated_read_customers, unauthenticated_read_metaobjects, unauthenticated_read_product_listings, unauthenticated_read_customer_tags, unauthenticated_read_product_inventory, unauthenticated_read_product_pickup_locations, unauthenticated_read_product_tags, unauthenticated_read_selling_plans, unauthenticated_write_bulk_operations, unauthenticated_read_bulk_operations, unauthenticated_read_bundles, unauthenticated_read_shop_pay_installments_pricing
```

Theme code should still avoid exposing private tokens. If Storefront API work is needed, use public-safe Storefront patterns or route through the bridge where backend mediation is required.

## Google Cloud and Cloud Run configuration model

The bridge backend should have custom app credentials stored in Cloud Run environment variables or Secret Manager, not in the theme repo.

Expected backend configuration names include:

```text
SHOPIFY_SHOP_DOMAIN=remote-business-partner.myshopify.com
SHOPIFY_CLIENT_ID or SHOPIFY_API_KEY=<Bridge to Google Cloud app key>
SHOPIFY_CLIENT_SECRET or SHOPIFY_API_SECRET=<Bridge to Google Cloud app secret>
SHOPIFY_ADMIN_ACCESS_TOKEN=<installed custom app Admin API token, if using token override>
SHOPIFY_WEBHOOK_SECRET=<same app secret unless separately configured>
BRIDGE_COMMAND_API_KEY=<private server-to-server bridge key>
GCP_PROJECT_ID=business-plan-applicatio-17047
GCP_REGION=australia-southeast1
GOOGLE_SERVICE_ACCOUNT_EMAIL=<Google service account>
GOOGLE_WORKSPACE_DELEGATED_USER=<delegated Workspace user>
GOOGLE_SHEETS_ENABLED=true
GOOGLE_SHEET_ID=<target sheet>
GOOGLE_DRIVE_ENABLED=true
GOOGLE_DRIVE_PARENT_FOLDER_ID=<target folder>
GOOGLE_CALENDAR_ENABLED=true
GOOGLE_CALENDAR_ID=<target calendar>
```

`BRIDGE_COMMAND_API_KEY` is only for protected server-to-server bridge, MCP, or workspace routes.

Jules must not put `BRIDGE_COMMAND_API_KEY` in Liquid, JavaScript, YAML, Markdown examples with real values, or any public repo file.

Only placeholder names are allowed in this documentation.

## Theme implementation rules

Theme code in this repository should:

- Submit forms through `/apps/rbp-bridge` by default.
- Make app proxy route settings configurable.
- Pass bridge-compatible payload fields.
- Use progressive enhancement for JSON responses.
- Preserve normal POST/no-JavaScript fallback.
- Display friendly validation and server error messages.
- Avoid hardcoded Cloud Run browser calls.
- Avoid secrets in hidden fields.
- Avoid direct Admin API or private Storefront API calls.

## Store-side checks before claiming live success

Verify in Shopify Admin before claiming the live implementation is complete:

- [ ] Installed app title is `Bridge to Google Cloud`.
- [ ] The app is installed on the target store.
- [ ] Admin API scopes match the supplied scope list or required subset.
- [ ] Storefront API scopes match the supplied scope list or required subset.
- [ ] App proxy is enabled.
- [ ] App proxy prefix is `apps`.
- [ ] App proxy subpath is `rbp-bridge`.
- [ ] App proxy target is `https://rbp-integration-bridge-dlng4rmgtq-ts.a.run.app/api/app-proxy`.
- [ ] Business Health Check page exists.
- [ ] Business Health Check page uses `page.onboarding`.
- [ ] Thank-you page exists if configured.
- [ ] Store password gate is disabled or test access is available.

## Live verification commands

Backend health check:

```bash
curl -i https://rbp-integration-bridge-dlng4rmgtq-ts.a.run.app/health
```

Expected result:

```text
200
```

Unsigned direct app-proxy call:

```bash
curl -i -X POST https://rbp-integration-bridge-dlng4rmgtq-ts.a.run.app/api/app-proxy/api/plans \
  -H 'Content-Type: application/json' \
  --data '{}'
```

Expected production result:

```text
401 Invalid app proxy signature
```

Real storefront proxy tests must be done through Shopify:

```text
https://remote-business-partner.myshopify.com/apps/rbp-bridge
```

or from the Business Health Check page form.

## Jules acceptance criteria

Jules should finish with explicit evidence that:

- No new Shopify app was created.
- `Bridge to Google Cloud` was treated as the installed app.
- All form defaults use `/apps/rbp-bridge` or a configurable path.
- `/apps/rbp-onboarding` is not used as the default route.
- No Cloud Run URL was hardcoded into browser-facing theme code.
- No Admin API token, Storefront token, Google secret, or `BRIDGE_COMMAND_API_KEY` was committed.
- Business Health Check form renders in `page.onboarding`.
- Submission payload maps to the bridge lead schema.
- Progressive JavaScript handles JSON responses and errors.
- No-JavaScript form fallback remains usable.
- Existing contact, product, cart, checkout, header, and footer behavior remains untouched.
- Live storefront submission was tested or clearly blocked.
- Google Cloud storage was verified or clearly unverified.

## Final instruction for Jules

Use this exact implementation assumption:

```text
The Shopify store already has an installed custom app titled Bridge to Google Cloud. This app is the production bridge to Google Cloud and Cloud Run. Theme code must integrate with that installed app through Shopify's app proxy path /apps/rbp-bridge. Do not create another app, do not use /apps/rbp-onboarding as the default, do not call Cloud Run directly from Liquid or browser JavaScript, and do not commit any Shopify, Google Cloud, or bridge secrets.
```

## Relationship to older docs

Older docs may mention `/apps/rbp-onboarding/business-health-check` as a placeholder route. Treat those examples as superseded by this file.

For Business Health Check and first-version onboarding work, use `/apps/rbp-bridge` as the default route unless Shopify Admin confirms a more specific bridge route is live.
