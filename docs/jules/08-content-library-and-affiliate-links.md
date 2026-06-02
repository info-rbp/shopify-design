# Content Library and Affiliate Links System

## Purpose

This file explains the content and affiliate-link structure that has been added to this repository.

The system gives the repository a clear place to store blog posts, articles, help center items, reusable content templates, and public-safe affiliate link references.

It is designed so that maintainers, future ChatGPT sessions, Jules, or other code agents can understand where content belongs and how to work with it without guessing.

## What was added

The following content structure has been added at the repository root:

```text
content/
├── README.md
├── blog/
│   └── README.md
├── articles/
│   └── .gitkeep
├── help-center/
│   └── .gitkeep
├── templates/
│   ├── blog-post-template.md
│   └── article-template.md
└── affiliate-links/
    ├── README.md
    ├── affiliate-links.csv
    └── affiliate-links.md
```

The following Jules instruction file was also added:

```text
docs/jules/07-content-management.md
```

That file tells Jules how to work with content safely and consistently.

## How the system operates

The `/content` folder is the central library for customer-facing and marketing content.

It is separate from theme code, application code, and Jules instruction files.

Use it for:

- Blog drafts and approved blog copy.
- Long-form articles and guides.
- Help center content and FAQs.
- Reusable writing templates.
- Public-safe affiliate and partner offer link records.

Do not use it for:

- Shopify access tokens.
- API keys.
- Passwords.
- Customer data.
- Private partner dashboard URLs.
- Signed URLs.
- Private discount links.
- Any link or credential that should not be visible in a public repository.

## Folder responsibilities

### `/content/blog`

Stores blog posts and news-style content.

Use this folder for Shopify blog drafts, thought leadership pieces, announcements, updates, and educational posts.

Recommended filename format:

```text
YYYY-MM-DD-topic-slug.md
```

Example:

```text
2026-06-02-business-health-check-guide.md
```

### `/content/articles`

Stores longer-form articles, guides, explainers, and advisory content.

Use this folder for evergreen content that may support service pages, educational resources, client guidance, or sales enablement material.

Recommended filename format:

```text
topic-slug.md
```

Example:

```text
how-business-advisory-support-works.md
```

### `/content/help-center`

Stores help center articles, FAQs, support guides, and customer instructions.

Use this folder for content that helps users understand services, processes, account steps, ordering steps, or troubleshooting steps.

Recommended filename format:

```text
topic-slug.md
```

Example:

```text
how-to-request-a-business-health-check.md
```

### `/content/templates`

Stores reusable Markdown templates for new content items.

Current templates:

```text
content/templates/blog-post-template.md
content/templates/article-template.md
```

Use these templates when creating new blog posts or articles.

A help center template can be added later if required.

### `/content/affiliate-links`

Stores affiliate and partner offer link records that are safe to expose publicly.

Current files:

```text
content/affiliate-links/README.md
content/affiliate-links/affiliate-links.csv
content/affiliate-links/affiliate-links.md
```

Use `affiliate-links.csv` when you want structured link records that can be sorted, filtered, imported, or processed later.

Use `affiliate-links.md` when you want a human-readable explanation or notes for each affiliate relationship.

## Affiliate link safety rules

This repository is public. Treat every committed file as visible to the internet.

Only store affiliate or partner links when they are intended to be public-facing.

Safe examples:

```text
https://example.com/public-offer
https://partner.example.com/rbp
https://example.com/product?ref=publicpartnerid
```

Unsafe examples:

```text
https://partner.example.com/dashboard
https://partner.example.com/private-offer?token=SECRET
https://example.com/link?access_token=SECRET
https://example.com/link?signature=SECRET
```

Do not store URLs containing private values such as:

- `token`
- `access_token`
- `secret`
- `signature`
- `api_key`
- `password`
- `auth`
- private invite codes
- private dashboard identifiers

If there is uncertainty, do not commit the link. Use a placeholder instead.

## How to add a new blog post

1. Copy the structure from:

```text
content/templates/blog-post-template.md
```

2. Create a new file in:

```text
content/blog/
```

3. Use a clear filename, for example:

```text
2026-06-02-example-blog-post.md
```

4. Fill out the YAML front matter at the top of the file.

5. Write the article content in Markdown.

6. Set `status` to one of:

```text
draft
review
approved
published
archived
```

## How to add a new article

1. Copy the structure from:

```text
content/templates/article-template.md
```

2. Create a new file in:

```text
content/articles/
```

3. Fill out the front matter.

4. Write the article content in Markdown.

5. Keep the article focused on one topic.

## How to add a new help center item

1. Create a new Markdown file in:

```text
content/help-center/
```

2. Use this structure:

```md
---
title: ""
slug: ""
status: "draft"
content_type: "help_center"
section: ""
tags: []
last_reviewed: null
---

# Title

## Summary

Write the short answer or overview.

## Steps

1. Add the first step.
2. Add the second step.
3. Add the third step.

## Notes

Add limits, warnings, or related details.
```

3. Keep the content practical, direct, and easy to follow.

## How to add a new affiliate link

Use the CSV file when possible:

```text
content/affiliate-links/affiliate-links.csv
```

Each row should include:

```text
partner_name,offer_name,url,status,public_safe,placement,notes,last_reviewed
```

Example:

```text
Example Partner,Example Offer,https://example.com,draft,yes,homepage banner,Public customer-facing offer,2026-06-02
```

Only set `public_safe` to `yes` when the link is genuinely safe to expose publicly.

Use the Markdown file for longer notes:

```text
content/affiliate-links/affiliate-links.md
```

## How Jules should use this system

Before making content-related changes, Jules should read:

```text
AGENTS.md
docs/jules/07-content-management.md
docs/jules/08-content-library-and-affiliate-links.md
```

When a task asks Jules to create or edit content, Jules should:

1. Identify the correct content folder.
2. Use the closest available template.
3. Preserve existing front matter unless instructed otherwise.
4. Keep changes scoped to the requested content item.
5. Avoid adding sensitive information.
6. Report the files changed and any assumptions made.

## How future ChatGPT sessions should use this system

When asking another chat to add content, provide instructions like this:

```text
Connect to the GitHub repository info-rbp/shopify-design.

Read AGENTS.md and the Jules docs in docs/jules.

Add a new [blog post/article/help center item/affiliate link] using the repository content structure.

Place the file in [exact folder path].

Use the relevant template in content/templates where available.

Do not modify unrelated files.

Do not add private links, credentials, customer data, API keys, or tokens.

After making the change, report the file path and commit SHA.
```

## Implementation notes

This system is currently a repository-based content library.

It does not automatically publish content to Shopify.

It does not automatically sync affiliate links into the storefront.

It provides structure, templates, rules, and storage locations so that future implementation work can safely build on top of it.

A future implementation could add:

- A script to validate front matter.
- A script to export content to Shopify.
- A GitHub Action to check content formatting.
- A GitHub Action to scan affiliate links for risky query parameters.
- A publishing workflow that syncs approved content only.

## Current operating model

At this stage, the process is manual:

1. Content is added or edited in GitHub.
2. Changes are reviewed through Git history or pull requests.
3. Approved content can be manually copied into Shopify or another platform.
4. Future automation can be added once the content structure is stable.

## Important reminder

This repository is public. Anything added here should be considered publicly visible.

When in doubt, use placeholders instead of real private data.
