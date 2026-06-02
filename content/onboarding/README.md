# Onboarding System

This directory stores definitions for onboarding forms and page blueprints used in the Remote Business Partner Shopify storefront.

## Structure

- `forms/`: YAML definitions for onboarding forms.
- `page-blueprints/`: YAML definitions for onboarding pages.
- `generated/`: Placeholder for any theme-driven generated output.

## Workflow

1. Define a new form in `forms/`.
2. Define a page blueprint in `page-blueprints/` that references the form.
3. The Shopify theme renders the form using `page.onboarding.json` and `sections/rbp-onboarding-form.liquid`.
4. Submissions are routed through the Bridge to Google Cloud app proxy at `/apps/rbp-bridge`.

## Safety

Do not store private customer data or submitted responses in this repository.
