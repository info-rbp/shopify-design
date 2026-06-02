# Generated Onboarding Templates

This directory stores generated review artifacts from YAML onboarding definitions.

Generated files are not automatically live Shopify templates. They are intended for review, diffing, and manual promotion after validation.

## Generate The Business Health Check Template

Run:

```bash
node scripts/generate-onboarding-template.js content/onboarding/forms/business-health-check.yml --force
```

Default output:

```text
content/onboarding/generated/page.business-health-check.generated.json
```

The generator preserves `/apps/rbp-bridge` as the app proxy path and maps YAML `payload_target` values to Shopify section block `name` settings.

## Compare With The Current Template

Run:

```bash
diff -u templates/page.onboarding.json content/onboarding/generated/page.business-health-check.generated.json
```

The generated file should match the Business Health Check block structure and bridge payload settings. Differences should be reviewed before promotion.

## Safely Promote Generated Output

Generated output is not promoted automatically.

To write a page-specific Shopify template intentionally:

```bash
node scripts/generate-onboarding-template.js content/onboarding/forms/business-health-check.yml --write-template
```

This writes `templates/page.business-health-check.json` by default. Use `--force` only when intentionally replacing an existing generated target.

The generator refuses to write `templates/page.onboarding.json` unless `--allow-page-onboarding` is explicitly passed. Do not replace the shared onboarding template without a reviewed task.

## Why YAML Cannot Be Read By Shopify Liquid

Shopify Liquid renders theme files and Shopify resources at runtime. It does not parse repository YAML files from `content/onboarding/forms/`. A generation step is needed to convert YAML definitions into Online Store 2.0 JSON section and block configuration.

## Safety Rules

- Do not commit customer submissions.
- Do not add Shopify Admin tokens, Storefront API tokens, Google Cloud credentials, or bridge command keys.
- Do not use `/apps/rbp-onboarding` as the default route.
- Do not add direct Cloud Run URLs to browser-facing Liquid, JavaScript, template settings, or YAML runtime defaults.
