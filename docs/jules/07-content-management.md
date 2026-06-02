# Content Management Instructions

Content files are stored in `/content`.

Use Markdown files with YAML front matter for blog posts, articles, and help center items.

Use `/content/affiliate-links` for public-safe affiliate and partner offer link references.

## Rules for Jules

- Read `AGENTS.md` before making content-related changes.
- Preserve existing front matter fields unless the task asks for a change.
- Do not publish, sync, or modify live Shopify content unless the task explicitly asks for it.
- Keep content edits scoped to the requested item.
- Do not add secrets, private links, customer data, API keys, access tokens, or private partner credentials.
- Treat affiliate links as public only when `public_safe` is set to `yes` or the task explicitly confirms the link is public-facing.
- Prefer adding new content from templates in `/content/templates`.

## Content folders

- `/content/blog` stores blog posts.
- `/content/articles` stores long-form articles and guides.
- `/content/help-center` stores support and help center content.
- `/content/affiliate-links` stores public-safe affiliate link references.
- `/content/templates` stores reusable templates.

## Validation checklist

When editing content, report:

- Files changed.
- Content status.
- Any assumptions made.
- Whether sensitive information was avoided.
