# Content Library

This folder stores structured content for the Shopify storefront and related customer-facing material.

Use this folder for drafts, approved copy, reusable content, and content planning that may later be published to Shopify or another platform.

## Folder structure

- `blog/` - Blog posts and news-style content.
- `articles/` - Longer-form articles, guides, and service explainers.
- `help-center/` - Help center items, FAQs, and customer support guidance.
- `affiliate-links/` - Public-safe affiliate and partner offer URL references.
- `templates/` - Reusable Markdown templates for new content items.

## Content format

Use Markdown files with YAML front matter.

Each content file should include:

- `title`
- `slug`
- `status`
- `content_type`
- `tags`
- SEO fields where relevant
- Review metadata where relevant

## Status values

Use one of the following values:

- `draft`
- `review`
- `approved`
- `published`
- `archived`

## Safety rules

Do not store secrets, private customer data, Shopify access tokens, API keys, passwords, signed URLs, or private partner credentials in this folder.

Affiliate links may be stored only when they are intended to be public-facing or are safe to expose in a public repository.
