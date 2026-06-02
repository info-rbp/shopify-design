# Content and Page Generation Guidance

## Purpose

This file defines how GitHub-stored content should be treated when future work turns it into Shopify pages, articles, help center items, metaobjects, or theme-rendered content.

The repository already has a `/content` library and content safety rules. This file adds the implementation model for how that content may eventually move from GitHub into the Shopify storefront.

This document does not implement publishing automation by itself. It tells Jules how to design and implement that automation safely when a task explicitly asks for it.

## Current content storage model

Content is stored under:

```text
content/
```

Known folders include:

```text
content/blog/
content/articles/
content/help-center/
content/templates/
content/affiliate-links/
content/onboarding/
```

Use `/content` for public-safe source material, structured content, drafts, templates, and references.

Do not use `/content` for private customer data, submitted onboarding responses, credentials, tokens, signed URLs, private partner links, or sensitive commercial data.

## Current operating model

At the time this guidance was created, content storage is repository-based and mostly manual:

1. Content is created or edited in GitHub.
2. Content is reviewed through Git history or pull requests.
3. Approved content may be manually copied into Shopify or another platform.
4. Future automation may sync approved content into Shopify.

Jules should not assume automatic publishing exists unless the task explicitly says it has been implemented.

## Recommended future publishing models

There are two supported models.

### Model A: Theme-driven generation

Use this model when content should become Shopify theme files.

```text
GitHub Markdown or YAML
  -> Jules or generator creates Liquid, snippets, assets, or JSON templates
  -> Shopify GitHub theme connection syncs the theme files
  -> Shopify theme renders the content
```

Best for:

- Landing page sections.
- Static service page blocks.
- Onboarding form sections.
- Theme-controlled page templates.
- Reusable storefront UI components.

Do not use this model to store private submissions or customer-specific content.

### Model B: App-driven Shopify content sync

Use this model when content should become Shopify Admin resources.

```text
GitHub Markdown or YAML
  -> Custom App or backend reads approved content
  -> Backend creates or updates Shopify pages, articles, metaobjects, or metafields
  -> Theme renders Shopify-managed content
```

Best for:

- Blog posts.
- Shopify articles.
- Shopify pages.
- Help center content if represented as pages or metaobjects.
- Partner offer data.
- Offer categories.
- Structured service content.
- Metaobject-driven content systems.

Do not implement this model from theme JavaScript or Liquid. Shopify Admin API operations belong in the Custom App or backend.

## Source of truth rules

Until automation exists, GitHub may be treated as a planning and draft source of truth only.

Once automation is implemented, each content type must declare its source of truth:

| Content type | Recommended source of truth | Notes |
|---|---|---|
| Blog drafts | GitHub | Markdown with front matter. |
| Published Shopify blog posts | Shopify or GitHub, but not both silently | If GitHub is canonical, build a sync process. |
| Help center content | GitHub or Shopify metaobjects/pages | Choose one per implementation. |
| Onboarding form definitions | GitHub | Private submissions go to Custom App or Google Cloud. |
| Public affiliate links | GitHub if public-safe | Private links stay out of repo. |
| Partner offers | Shopify metaobjects or GitHub definitions | CTA safety rules must apply. |
| Service page blueprints | GitHub | Theme or app may generate output. |
| Customer account content | Theme and Shopify customer state | Do not store customer-specific data in GitHub. |

## Front matter requirements

Markdown content should use YAML front matter where practical.

Recommended shared fields:

```yaml
title: ""
slug: ""
status: "draft"
content_type: ""
tags: []
seo_title: ""
seo_description: ""
created_at: "YYYY-MM-DD"
updated_at: "YYYY-MM-DD"
last_reviewed: null
```

Allowed `status` values:

```text
draft
review
approved
published
archived
```

Only content with `status: approved` or `status: published` should be considered eligible for automated publishing. The exact status rule must be documented in the implementation task.

## Blog post generation

Blog source files should live under:

```text
content/blog/
```

Recommended filename format:

```text
YYYY-MM-DD-topic-slug.md
```

Recommended front matter:

```yaml
title: ""
slug: ""
status: "draft"
content_type: "blog_post"
author: "RBP"
category: ""
tags: []
shopify_blog_handle: "news"
shopify_article_id: null
seo_title: ""
seo_description: ""
created_at: "YYYY-MM-DD"
updated_at: "YYYY-MM-DD"
publish_at: null
```

If app-driven publishing is implemented, the backend should map Markdown body content into Shopify article body content and preserve Shopify article IDs when known.

## Article generation

Article source files should live under:

```text
content/articles/
```

Use articles for long-form guides, service explainers, advisory resources, and evergreen content.

Recommended front matter:

```yaml
title: ""
slug: ""
status: "draft"
content_type: "article"
author: "RBP"
category: ""
tags: []
seo_title: ""
seo_description: ""
created_at: "YYYY-MM-DD"
updated_at: "YYYY-MM-DD"
last_reviewed: null
```

The implementation task must decide whether articles become Shopify pages, Shopify blog articles, metaobjects, or static theme content.

## Help center generation

Help center source files should live under:

```text
content/help-center/
```

Recommended front matter:

```yaml
title: ""
slug: ""
status: "draft"
content_type: "help_center"
section: ""
tags: []
last_reviewed: null
```

Help center content may be generated into:

- Shopify pages.
- Shopify metaobjects.
- Theme-rendered static content.
- Custom App backed content.

Do not assume a help center app or Shopify metaobject model exists unless the task confirms it.

## Onboarding page blueprints

Onboarding page blueprints should live under:

```text
content/onboarding/page-blueprints/
```

Use them to define page intent, page handle, target template, form association, SEO copy, and CTA behavior.

Recommended structure:

```yaml
page_id: business-health-check-onboarding
status: approved
page:
  title: Business Health Check Onboarding
  handle: business-health-check-onboarding
  template: page.onboarding
form:
  form_id: business-health-check
  app_proxy_path: /apps/rbp-onboarding/business-health-check
seo:
  title: Business Health Check Onboarding | RBP
  description: Provide your business context so RBP can review your request and recommend next steps.
```

## Affiliate and partner link generation

Public-safe affiliate and partner offer links may live under:

```text
content/affiliate-links/
```

Do not sync or render any link unless it is marked or confirmed as public-safe.

Links containing tokens, signatures, private invite codes, dashboard URLs, private discount links, access keys, or signed parameters must not be committed or rendered.

If affiliate links are rendered into the storefront, the task must define:

- Source file.
- Required fields.
- Destination section or metaobject.
- Public-safe validation rule.
- Fallback behavior when a link is missing or unsafe.

## Handle and slug rules

Use lowercase, hyphenated slugs.

Good:

```text
business-health-check
how-to-request-support
premium-membership-benefits
```

Avoid:

```text
Business Health Check
business_health_check
businesshealthcheck
final-final-page
```

When generating Shopify pages, avoid changing existing handles unless the task explicitly asks for redirects or handle migration.

## Publishing safety rules

Before content is generated or synced to Shopify, confirm:

- The content is approved for publishing.
- The target handle is correct.
- The content does not contain private links or credentials.
- The content does not contain customer data.
- The content does not overpromise fulfilment or delivery.
- The content has SEO fields where required.
- Any external CTA URL is public-safe.
- Existing Shopify content will not be overwritten silently.

If a target Shopify page, article, metaobject, or template already exists, the implementation must define whether to update it, skip it, or create a new draft.

## Validation opportunities

Future implementation may add validation scripts or GitHub Actions for:

- Required front matter fields.
- Allowed status values.
- Duplicate slugs.
- Unsafe affiliate link query parameters.
- Empty SEO fields.
- Broken internal links.
- Invalid YAML.
- Missing content templates.
- Links pointing to private dashboard or admin URLs.

Do not add CI or GitHub Actions unless the task explicitly requests it.

## PR notes for content generation work

When implementing content/page generation, report:

- Content source folders used.
- Destination model used: theme-driven or app-driven.
- Files generated or updated.
- Shopify resources expected to be created or updated outside the repo.
- Any store-side configuration required.
- Validation performed.
- Content skipped because it was draft, unsafe, incomplete, or missing required fields.

## Non-goals

Do not implement these unless explicitly requested:

- Automatic live publishing from every commit.
- Syncing draft content to live Shopify pages.
- Storing Shopify Admin tokens in GitHub.
- Publishing private partner links.
- Publishing customer-specific content.
- Rewriting all existing pages into generated content.
- Replacing the existing Shopify page/admin workflow without a migration plan.

## Summary

GitHub stores structured content and definitions. Shopify renders or hosts published content. The Custom App and backend should perform secure Shopify Admin API operations when automation is required. Theme code should never own private data or secret credentials.
