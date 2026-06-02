# Onboarding System v1 Follow-up Review

## Summary
This document provides a follow-up review and hardening report for the repository-driven onboarding system implemented in PR #7.

## Implementation Details
- **PR #7 Implementation**: Established repository structure, pilot YAML definitions, public-safe affiliate links, and core Shopify theme components (`page.onboarding.json`, `sections/rbp-onboarding-form.liquid`, `snippets/rbp-onboarding-field.liquid`, and assets).
- **Follow-up Hardening**:
    - Scoped the global `.hidden` CSS rule to `.rbp-onboarding-hidden`.
    - Added a Liquid fallback to the form action defaulting to `/apps/rbp-bridge`.
    - Improved JavaScript to support multiple forms per page and hardened response handling (content-type checks, redirect support, error messaging).
    - Refined `page.onboarding.json` defaults for the Business Health Check pilot.

## Bridge Integration
- **Default Route**: `/apps/rbp-bridge`
- **Installed App**: Bridge to Google Cloud
- **Backend**: rbp-integration-bridge (Cloud Run)

## Verification Status
- **Repository Safety**: COMPLETED. No secrets, tokens, or hardcoded backend URLs found in theme code.
- **Backend Health**: VERIFIED. Endpoint `/health` returns 200 OK.
- **App Proxy Signature**: VERIFIED. Unsigned direct requests are rejected with 401 Unauthorized.
- **Live Storefront Submission**: PENDING manual confirmation in a live Shopify environment.

## Store-side Configuration Requirements
- [ ] Confirm app proxy is enabled for "Bridge to Google Cloud".
- [ ] Verify app proxy subpath is `rbp-bridge`.
- [ ] Verify app proxy target is `https://rbp-integration-bridge-dlng4rmgtq-ts.a.run.app/api/app-proxy`.
- [ ] Create "Business Health Check" page and assign `page.onboarding` template.
- [ ] Ensure `/pages/thank-you` exists.

## YAML-to-Theme Workflow Gap
Current v1 system uses YAML for source definitions, but the live Shopify form relies on manual section block configuration or presets. Shopify Liquid cannot parse the YAML definitions directly at runtime.

### Recommended Future Models
1. **Manual model**: YAML definitions guide manual section block settings in Shopify Admin.
2. **Generator model**: A local script converts YAML definitions into Shopify JSON template/section block configuration files.
3. **Backend model**: The Bridge backend reads YAML from the repo and syncs Shopify pages/metaobjects via Admin API.

## Known Limitations
- Standard Shopify contact forms cannot handle file uploads without an app. Users are encouraged to provide share links in text fields.
- JavaScript progressive enhancement relies on the backend returning standard lead-pipeline compatible responses.

## Recommended Next Step
Proceed with the **Generator model** to automate the creation of JSON templates and section block settings from the YAML definitions, ensuring a single source of truth in the `content/` directory.
