# Live Shopify Bridge Verification Runbook

## Purpose

This runbook defines how to verify the Business Health Check onboarding flow from Shopify storefront to the `Bridge to Google Cloud` app proxy and Google Cloud backend.

Use it when validating:

- Shopify Admin app proxy configuration.
- The live Business Health Check page.
- Progressive-enhanced and no-JavaScript form submission.
- Backend health and app-proxy signature behavior.
- Google Cloud receipt of submitted leads.

Do not use this runbook to create a new Shopify app, create a second app proxy, add direct Cloud Run calls to theme code, or store customer submissions in GitHub.

## Prerequisites

- Shopify Admin access for `remote-business-partner.myshopify.com`.
- Permission to inspect installed custom apps and app proxy settings.
- Storefront password or test access when the storefront is password protected.
- Access to the Google Cloud destination used by `rbp-integration-bridge`.
- Local checkout of `info-rbp/shopify-design` on the branch being verified.
- Network access for backend curl checks.

## Required Shopify Admin Checks

Record each item as `Pass`, `Fail`, or `Blocked`.

| Check | Expected value | Current run status |
|---|---|---|
| Installed app | `Bridge to Google Cloud` is installed | Blocked: requires Shopify Admin access |
| App proxy enabled | Enabled | Blocked: requires Shopify Admin access |
| App proxy prefix | `apps` | Blocked: requires Shopify Admin access |
| App proxy subpath | `rbp-bridge` | Blocked: requires Shopify Admin access |
| App proxy target | Cloud Run `/api/app-proxy` endpoint | Blocked: requires Shopify Admin access |
| Business Health Check page | Page exists | Blocked: storefront redirects to `/password`; Admin confirmation still required |
| Business Health Check template | Uses `page.onboarding` | Blocked: requires Shopify Admin access |
| Thank-you page | `/pages/thank-you` exists | Blocked: storefront redirects to `/password`; Admin confirmation still required |
| Store password gate | Disabled or test password available | Blocked: storefront redirects to `/password` |

Local Shopify CLI context from this run:

```text
store: remote-business-partner.myshopify.com
development_theme_id: null
```

## Required Storefront Checks

Test this URL through a browser session with storefront access:

```text
https://remote-business-partner.myshopify.com/pages/business-health-check
```

Verify:

- The page renders the Business Health Check onboarding form.
- The page uses the `page.onboarding` template.
- The form submits to `/apps/rbp-bridge`.
- Required fields block empty submission in the browser.
- The submit button disables while the request is in flight.
- JSON success responses display a success message or redirect.
- JSON validation errors display inline.
- Network errors show a friendly error message.
- No-JavaScript fallback remains a normal `POST` form.

Current run result:

```text
Blocked: storefront GET requests to /pages/business-health-check, /pages/thank-you, and /apps/rbp-bridge redirect to /password without test access.
```

## Required Backend Checks

Run:

```bash
curl -i https://rbp-integration-bridge-dlng4rmgtq-ts.a.run.app/health
```

Expected:

```text
HTTP 200
```

Current run result:

```text
HTTP/2 200
{"ok":true,"service":"rbp-integration-bridge","version":"0.1.0",...}
```

Run:

```bash
curl -i -X POST https://rbp-integration-bridge-dlng4rmgtq-ts.a.run.app/api/app-proxy/api/plans \
  -H 'Content-Type: application/json' \
  --data '{}'
```

Expected:

```text
HTTP 401
Invalid app proxy signature
```

Current run result:

```text
HTTP/2 401
{"ok":false,"error":"Invalid app proxy signature"}
```

These direct Cloud Run checks are backend verification only. Do not add the Cloud Run URL to Liquid, JavaScript, YAML runtime defaults, or theme settings.

## Required Google Cloud Checks

After a successful storefront submission through Shopify, confirm:

- The backend logs show a signed Shopify app-proxy request.
- Server-side validation passed or returned expected validation errors.
- The lead was written to the expected Google Cloud storage/workflow destination.
- Any notification or routing workflow ran as expected.
- Logs do not expose secrets or unnecessary customer data.

Current run result:

```text
Blocked: requires Google Cloud or Workspace access plus a successful live Shopify storefront submission.
```

## Expected Payload Shape

Business Health Check payload mapping:

| Payload field | Source |
|---|---|
| `sourceArea` | `core_services` |
| `formType` | `business-health-check` |
| `productOrService` | `Business Health Check` |
| `name` | Contact name |
| `email` | Email address |
| `phone` | Phone number |
| `message` | Current challenge |
| `preferredNextStep` | Desired outcome |
| `timeline` | Urgency |
| `sourcePage` | `business-health-check` |
| `urlContext` | Current page URL |
| `metadata[business_name]` | Business name |
| `metadata[industry]` | Industry |
| `metadata[form_id]` | `business-health-check` |
| `metadata[bridge_app_title]` | `Bridge to Google Cloud` |
| `metadata[submitted_via]` | `Bridge to Google Cloud` |

## Expected Success Response

For JavaScript-enhanced submissions, the bridge should return either a redirect response or JSON shaped like:

```json
{
  "ok": true,
  "message": "Submission received.",
  "redirect": "/pages/thank-you"
}
```

If `redirect` is omitted, the form should show the success message and reset.

## Expected Validation Error Response

```json
{
  "ok": false,
  "message": "Please complete the required fields.",
  "errors": {
    "email": "Email is required.",
    "metadata[business_name]": "Business name is required."
  }
}
```

The frontend should show the general message and attach field-specific errors where matching fields exist.

## How To Test No-JS Fallback

1. Open `/pages/business-health-check` with storefront password/test access.
2. Disable JavaScript in the browser or use a browser profile with JavaScript blocked.
3. Fill the required fields.
4. Submit the form.
5. Confirm the browser performs a normal `POST` to `/apps/rbp-bridge`.
6. Confirm the backend redirects or returns a user-safe response.
7. Confirm the submission reaches the expected Google Cloud destination.

Do not use direct Cloud Run URLs for this test.

## How To Record Results

For each verification run, record:

- Date and timezone.
- Branch and commit SHA.
- Theme ID or Shopify preview URL used.
- Browser and device profile.
- Shopify Admin app proxy settings observed.
- Storefront URL tested.
- Backend health response status.
- Unsigned proxy response status.
- Whether the form rendered.
- Whether the live submission reached Google Cloud.
- Exact blockers and required owner/action.

Keep private customer values, submitted responses, tokens, and backend secrets out of the repository.

## Known Blockers

- Storefront password gate without test password.
- Shopify Admin access unavailable.
- Google Cloud or Workspace access unavailable.
- App proxy disabled or configured with a different subpath.
- Business Health Check page missing or assigned to the wrong template.
- `/pages/thank-you` missing.
- Backend route not implemented for the submitted path.
- Backend rejects Shopify app-proxy signatures unexpectedly.

## Troubleshooting Steps

- If storefront redirects to `/password`, request the storefront password or use Shopify Admin preview access.
- If the page renders but no form appears, confirm the page uses `page.onboarding`.
- If the form posts to the wrong path, inspect `section.settings.app_proxy_path` and generated JSON.
- If direct Cloud Run POST returns `401`, that is expected for unsigned app-proxy traffic.
- If Shopify `/apps/rbp-bridge` returns an error with storefront access, confirm app proxy prefix, subpath, and target in Shopify Admin.
- If validation errors do not render inline, confirm the backend `errors` keys match the submitted field `name` attributes.
- If Google Cloud does not receive the lead, inspect bridge logs, app proxy signature verification, and storage/workflow configuration.
