# Onboarding System v1 Follow-up Review

## Summary
This document provides a follow-up review and hardening report for the repository-driven onboarding system implemented in PR #7.

## Implementation Details
- **PR #7 Implementation**: Established repository structure, pilot YAML definitions, public-safe affiliate links, and core Shopify theme components (`page.onboarding.json`, `sections/rbp-onboarding-form.liquid`, `snippets/rbp-onboarding-field.liquid`, and assets).
- **Follow-up Hardening**:
    - Scoped the global `.hidden` CSS rule to `.rbp-onboarding-hidden`.
    - Added a Liquid fallback to the form action defaulting to `/apps/rbp-bridge`.
    - Added `metadata[submitted_via]=Bridge to Google Cloud` alongside the existing bridge app metadata.
    - Improved JavaScript to support multiple forms per page and hardened response handling (content-type checks, JSON redirect support, fetch-followed redirect support, validation errors, network errors, and missing submit/message elements).
    - Refined `page.onboarding.json` defaults and blocks for the Business Health Check pilot.

## Bridge Integration
- **Default Route**: `/apps/rbp-bridge`
- **Installed App**: Bridge to Google Cloud
- **Backend**: rbp-integration-bridge (Cloud Run)
- **New Shopify App Created**: No.
- **Direct Cloud Run Browser Call Added**: No.
- **Payload Alignment**: Hidden and visible field names match the bridge lead schema documented in `15-bridge-to-google-cloud-integration.md`, including `metadata[submitted_via]`.

## Verification Status
- **Repository Safety**: COMPLETED. No secrets, tokens, private URLs, submitted responses, customer data, or hardcoded Cloud Run URLs were found in browser-facing theme implementation files.
- **Route Safety**: COMPLETED. `/apps/rbp-bridge` remains the implementation default. `/apps/rbp-onboarding` appears only in older documentation/context references, not as the theme default.
- **Syntax Checks**: COMPLETED. `templates/page.onboarding.json` is valid JSON, section schema JSON is valid, onboarding section/snippet Liquid block balance passed, and `assets/rbp-onboarding-form.js` passed `node --check`.
- **CSS Scope Check**: COMPLETED. No global `.hidden` rule remains in `assets/rbp-onboarding-form.css`.
- **Backend Health**: VERIFIED. `curl -i https://rbp-integration-bridge-dlng4rmgtq-ts.a.run.app/health` returned `HTTP/2 200`.
- **App Proxy Signature**: VERIFIED. Unsigned direct POST to `/api/app-proxy/api/plans` returned `HTTP/2 401` with `Invalid app proxy signature`.
- **Live Storefront Submission**: PENDING manual confirmation in a live Shopify environment.
- **Touched Scope**: Header, footer, cart, checkout, contact, product, service, marketplace, Business NBN, and membership implementation files were not changed by this follow-up.

## Store-side Configuration Requirements
- [ ] Confirm "Bridge to Google Cloud" is installed.
- [ ] Confirm app proxy is enabled for "Bridge to Google Cloud".
- [ ] Verify app proxy prefix is `apps`.
- [ ] Verify app proxy subpath is `rbp-bridge`.
- [ ] Verify app proxy target is `https://rbp-integration-bridge-dlng4rmgtq-ts.a.run.app/api/app-proxy`.
- [ ] Create "Business Health Check" page and assign `page.onboarding` template.
- [ ] Ensure `/pages/thank-you` exists.
- [ ] Test live storefront form submission through Shopify.
- [ ] Confirm Google Cloud storage/workflow receives the submission.

## YAML-to-Theme Workflow Gap
Current v1 system uses YAML for source definitions, but the live Shopify form relies on manual section block configuration or presets. Shopify Liquid cannot parse the YAML definitions directly at runtime.

## Generator Model Started
The first generator model now exists at `scripts/generate-onboarding-template.js`.

Current tested input:

```text
content/onboarding/forms/business-health-check.yml
```

Current generated review artifact:

```text
content/onboarding/generated/page.business-health-check.generated.json
```

The generated output preserves `/apps/rbp-bridge`, maps the Business Health Check fields to the Bridge lead schema, and does not overwrite live templates by default. Live Shopify and Google Cloud verification steps are documented in `docs/jules/17-live-shopify-bridge-verification-runbook.md`.

### Recommended Future Models
1. **Manual model**: YAML definitions guide manual section block settings in Shopify Admin.
2. **Generator model**: A local script converts YAML definitions into Shopify JSON template/section block configuration files. Started with `scripts/generate-onboarding-template.js`.
3. **Backend model**: The Bridge backend reads YAML from the repo and syncs Shopify pages/metaobjects via Admin API.

## Known Limitations
- Standard Shopify contact forms cannot handle file uploads without an app. Users are encouraged to provide share links in text fields.
- JavaScript progressive enhancement relies on the backend returning standard lead-pipeline compatible responses.

## Recommended Next Step
Use the generated Business Health Check artifact as a review baseline, then verify Shopify Admin app proxy settings, storefront password/test access, live form submission, and Google Cloud storage receipt before promoting generated templates.
