# Affiliate Links

This directory stores public-safe affiliate and partner offer link references.

## Rules

- Do not add real private affiliate links.
- Do not add private partner dashboard URLs.
- Do not add signed URLs.
- Do not add URLs containing tokens, API keys, access keys, signatures, auth values, private invite codes, or passwords.
- Treat this repository as public.
- If no real public-safe links are provided, use placeholders only.

## Content Format

Use YAML for affiliate link definitions.

Each link should include:
- `id`: Unique identifier.
- `partner`: Partner name.
- `label`: Display label for the offer.
- `public_url`: The public-safe referral URL.
- `status`: `draft`, `active`, or `archived`.
- `public_safe`: Boolean indicating if the link is safe for public exposure.
- `placements`: List of where the link should be displayed.
- `notes`: Internal notes.
- `last_reviewed`: Date of last review.
