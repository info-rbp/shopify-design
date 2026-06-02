# Shopify SEO Implementation Plan for Jules

## Purpose

This document gives Jules a detailed implementation plan for improving SEO across the Remote Business Partner Shopify theme repository. It should be used as task context before making SEO-related changes in this repository.

The goal is not to turn the theme into an SEO app, a product information management system, or a mysterious altar for keyword rituals. The goal is to make the theme render clean, accurate, crawlable, structured, fast, and useful pages while keeping Shopify product data as the source of truth.

## Repository context

This repository appears to be the Shopify theme and storefront design implementation for Remote Business Partner. It contains Shopify Liquid templates, snippets, sections, JSON template wiring, CSS assets, and Jules context documents.

Relevant existing files and areas:

- `layout/theme.liquid`: global HTML layout and `<head>` rendering.
- `snippets/meta-tags.liquid`: Open Graph and Twitter card metadata.
- `sections/main-product.liquid`: product detail page rendering.
- `snippets/card-product.liquid`: product cards across grids and related product areas.
- `sections/main-collection-product-grid.liquid`: collection page product grid.
- `sections/main-search.liquid`: search results experience.
- `sections/rbp-home.liquid`: homepage content.
- `templates/index.json`: homepage template wiring.
- `templates/collection.json`: default collection template wiring.
- `assets/rbp-theme.css`, `assets/rbp-components.css`, and `assets/rbp-ux-remediation.css`: styling layers that may influence performance, accessibility, visual headings, and content discoverability.
- `AGENTS.md`: repository working instructions.
- `docs/jules/`: task context for Jules.

Before implementing SEO changes, read `AGENTS.md` and the relevant docs under `docs/jules/`.

## SEO principles for this repository

### 1. Shopify Admin remains the source of product SEO data

Product-level SEO titles and meta descriptions should live in Shopify product data, not be hard-coded into Liquid templates. For Shopify product search listing metadata, the relevant Shopify SEO metafields are:

- `global.title_tag`
- `global.description_tag`

The theme should render Shopify's `page_title` and `page_description` cleanly and provide safe fallbacks only when Shopify data is missing.

### 2. The theme repository renders and enhances SEO signals

The theme should control:

- `<title>` output structure.
- `<meta name="description">` output.
- Canonical URL output.
- Open Graph and Twitter card metadata.
- JSON-LD structured data.
- Product, collection, article, page, and homepage semantic HTML.
- Heading hierarchy.
- Internal links.
- Breadcrumbs.
- Accessible image rendering.
- Page speed and Core Web Vitals-friendly implementation.

### 3. Automation should audit and prevent regressions

The repository should eventually include scripts and GitHub Actions that detect common SEO failures before they reach the connected Shopify theme branch.

Examples:

- Missing SEO snippets.
- Duplicate structured data snippets.
- Missing canonical rendering.
- Missing product JSON-LD.
- Overly generic title logic.
- Product metadata exports with duplicate or overlong meta descriptions.
- Empty image alt attributes where product data provides meaningful context.
- Performance regressions from oversized scripts, CSS, or media.

### 4. Avoid fake SEO improvements

Do not add hidden keyword blocks, invisible content, repetitive boilerplate, doorway-style pages, excessive internal links, spammy schema, or generated content that users cannot see. Google and customers both dislike that nonsense, for once forming an alliance.

## Current observed SEO baseline

The theme already has some useful SEO foundations:

- `layout/theme.liquid` renders a canonical link using `canonical_url`.
- `layout/theme.liquid` renders a `<title>` element using `page_title`, tags, pagination, and `shop.name`.
- `layout/theme.liquid` renders a meta description when `page_description` is available.
- `snippets/meta-tags.liquid` renders Open Graph and Twitter card metadata.
- `snippets/meta-tags.liquid` changes `og:type` to `product` on product pages and `article` on article pages.
- `snippets/meta-tags.liquid` includes product price Open Graph fields for product pages.

Do not duplicate these blindly. Future work should refactor or extend them carefully.

## Implementation area 1: Central SEO head rendering

### Goal

Make all core SEO head tags consistent, testable, and easy to maintain.

### Recommended approach

Either:

1. Keep the existing title, description, canonical, and `meta-tags` rendering in `layout/theme.liquid`, but clean and document it; or
2. Move the logic into a dedicated snippet such as `snippets/rbp-seo-head.liquid` and render it from `layout/theme.liquid`.

The second approach is cleaner if more SEO logic will be added.

### Proposed files

- `layout/theme.liquid`
- `snippets/rbp-seo-head.liquid`
- `snippets/meta-tags.liquid`

### Required behavior

The rendered `<head>` should include exactly one of each of the following where applicable:

- `<title>`
- `<meta name="description">`
- `<link rel="canonical">`
- Open Graph title, description, URL, type, site name, and image fields.
- Twitter card title, description, and card type.
- JSON-LD snippets, separated by page type.

### Title rendering rules

Use Shopify's `page_title` as the primary title value. Avoid adding the shop name if it is already present.

Recommended logic:

```liquid
<title>
  {{ page_title }}
  {%- if current_tags %} &ndash; tagged "{{ current_tags | join: ', ' }}"{% endif -%}
  {%- if current_page != 1 %} &ndash; Page {{ current_page }}{% endif -%}
  {%- unless page_title contains shop.name %} &ndash; {{ shop.name }}{% endunless -%}
</title>
```

Implementation notes:

- Keep titles descriptive and concise.
- Avoid forcing long repetitive brand boilerplate on every page.
- Product SEO titles should normally be populated in Shopify product data.
- Use `Remote Business Partner` consistently where brand text is controlled by the theme.

### Meta description rendering rules

Use Shopify's `page_description` when available.

Recommended logic:

```liquid
{% if page_description %}
  <meta name="description" content="{{ page_description | strip_html | escape }}">
{% endif %}
```

Do not generate a generic description for every product from the same phrase. That caused the catalogue-level duplicate metadata problem and should not be resurrected like a cursed spreadsheet.

### Canonical URL rules

Keep canonical rendering based on Shopify's `canonical_url`.

Recommended logic:

```liquid
<link rel="canonical" href="{{ canonical_url }}">
```

Do not manually construct canonical URLs unless a specific Shopify edge case requires it.

## Implementation area 2: Open Graph and Twitter metadata

### Goal

Improve social sharing previews for product, collection, article, page, and homepage URLs.

### Existing file

- `snippets/meta-tags.liquid`

### Recommended improvements

Update or extend `snippets/meta-tags.liquid` to ensure:

- `og:site_name` uses `Remote Business Partner` where possible.
- `og:url` uses `canonical_url` or a safe fallback.
- `og:title` uses the same SEO title source as the page.
- `og:description` uses `page_description`, then `shop.description`, then a concise fallback.
- `og:type` maps correctly:
  - `product` for product pages.
  - `article` for article pages.
  - `website` for homepage and general pages.
- Product pages include product price and currency only when the product has a valid price.
- Product pages use product featured image when `page_image` is unavailable.
- Twitter card metadata mirrors Open Graph metadata.

### Suggested enhancement pattern

```liquid
{%- liquid
  assign rbp_brand_name = 'Remote Business Partner'
  assign og_title = page_title | default: rbp_brand_name
  assign og_url = canonical_url | default: request.origin
  assign og_type = 'website'
  assign og_description = page_description | default: shop.description | default: rbp_brand_name

  if request.page_type == 'product'
    assign og_type = 'product'
  elsif request.page_type == 'article'
    assign og_type = 'article'
  elsif request.page_type == 'password'
    assign og_url = request.origin
  endif
-%}
```

### Validation

After changes, inspect rendered source for:

- Product page.
- Collection page.
- Article page.
- Standard page.
- Homepage.
- Search page.

Confirm there are no duplicate Open Graph or Twitter fields.

## Implementation area 3: Product structured data

### Goal

Add or improve JSON-LD structured data for Shopify product pages so search engines can understand product identity, brand, pricing, availability, images, and offers.

### Proposed file

- `snippets/rbp-jsonld-product.liquid`

Render it from `layout/theme.liquid` or the product template only when `request.page_type == 'product'`.

### Required data

Product JSON-LD should include, where available:

- `@context`
- `@type`: `Product`
- `name`
- `description`
- `image`
- `brand`
- `sku`
- `offers`
- `priceCurrency`
- `price`
- `availability`
- `url`
- `itemCondition`

### Recommended baseline snippet

```liquid
{%- if request.page_type == 'product' and product -%}
  {%- liquid
    assign selected_variant = product.selected_or_first_available_variant
    assign product_description = product.description | strip_html | strip_newlines | truncate: 500
  -%}

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": {{ product.title | json }},
    "description": {{ product_description | json }},
    "image": [
      {%- for image in product.images limit: 5 -%}
        {{ image | image_url: width: 1200 | prepend: "https:" | json }}{%- unless forloop.last -%},{%- endunless -%}
      {%- endfor -%}
    ],
    "brand": {
      "@type": "Brand",
      "name": "Remote Business Partner"
    },
    {%- if selected_variant.sku != blank -%}
    "sku": {{ selected_variant.sku | json }},
    {%- endif -%}
    "offers": {
      "@type": "Offer",
      "url": {{ canonical_url | json }},
      "priceCurrency": {{ cart.currency.iso_code | json }},
      "price": {{ selected_variant.price | money_without_currency | remove: "," | json }},
      "availability": "https://schema.org/{% if product.available %}InStock{% else %}OutOfStock{% endif %}",
      "itemCondition": "https://schema.org/NewCondition"
    }
  }
  </script>
{%- endif -%}
```

### Important implementation notes

- Do not include fake reviews, fake aggregate ratings, fake GTINs, or fake availability.
- Only include `aggregateRating` if real review data is present and visible to customers.
- Only include `review` data if actual customer reviews exist on the page.
- Only include shipping and return structured data if the data is accurate and consistently maintained.
- Use `Product` for Shopify purchasable products, even where the product is a template, toolkit, documentation suite, or service-like offer. If a future implementation separates service enquiry pages from purchasable products, evaluate `Service` schema separately.

### Validation

After implementation, test representative product pages with:

- Google Rich Results Test.
- Schema.org validator.
- Browser rendered source inspection.

## Implementation area 4: Breadcrumb structured data

### Goal

Help search engines understand site hierarchy and improve customer orientation.

### Proposed file

- `snippets/rbp-jsonld-breadcrumbs.liquid`

### Page types to support

- Product pages.
- Collection pages.
- Blog article pages.
- Standard pages where a meaningful hierarchy exists.

### Product breadcrumb approach

Preferred product hierarchy:

```text
Home > Primary Collection > Product
```

If the product has no collection context, use:

```text
Home > Product
```

### Example pattern

```liquid
{%- if request.page_type == 'product' and product -%}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": {{ shop.url | json }}
    }
    {%- if collection -%},
    {
      "@type": "ListItem",
      "position": 2,
      "name": {{ collection.title | json }},
      "item": {{ collection.url | prepend: shop.url | json }}
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": {{ product.title | json }},
      "item": {{ canonical_url | json }}
    }
    {%- else -%},
    {
      "@type": "ListItem",
      "position": 2,
      "name": {{ product.title | json }},
      "item": {{ canonical_url | json }}
    }
    {%- endif -%}
  ]
}
</script>
{%- endif -%}
```

### Implementation warning

Shopify product pages can be reached through multiple collection paths. Do not generate conflicting breadcrumb schema if the visible breadcrumb navigation shows a different path from the JSON-LD. The structured data should match the user-visible page experience.

## Implementation area 5: Website and Organization structured data

### Goal

Help search engines understand the brand entity behind the site.

### Proposed file

- `snippets/rbp-jsonld-site.liquid`

Render it globally or only on the homepage.

### Recommended data

Use `Organization` or `LocalBusiness` only if all values are accurate and approved.

Baseline safe option:

```liquid
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Remote Business Partner",
  "url": {{ shop.url | json }}
}
</script>
```

Optional fields if accurate:

- Logo URL.
- SameAs social profiles.
- Contact email or phone.
- Address.
- Australian business identifiers, if intended for public display.

### Website schema

Optional `WebSite` schema can be added for the homepage:

```liquid
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Remote Business Partner",
  "url": {{ shop.url | json }}
}
</script>
```

Only add `SearchAction` if the store search URL pattern is confirmed and stable.

## Implementation area 6: Collection SEO

### Goal

Make collection pages useful landing pages for search intent, not just product grids with a headline taped on top.

### Files likely involved

- `sections/main-collection-product-grid.liquid`
- `templates/collection.json`
- Collection template variants.
- `snippets/card-product.liquid`
- Collection-related CSS assets.

### Recommended collection page elements

Each important collection should support:

- One clear H1.
- SEO-focused collection description near the top.
- Optional short intro that explains who the collection is for.
- Product grid with useful product cards.
- Internal links to related collections.
- FAQ or guidance content where genuinely useful.
- Clear empty-state handling.

### Collection content pattern

Recommended visible structure:

```text
H1: [Collection Name]
Intro: What this collection helps with, who it is for, and what kind of products are included.
Guided chips/links: Browse by product type, business problem, industry, or urgency.
Product grid: Cards that show product type, delivery model, price, and audience/use case.
Support block: Not sure what to choose? Link to help/contact/business health check.
FAQ block: Only if questions are visible and actually useful.
```

### SEO rules

- Avoid thin collection pages that only show products.
- Avoid keyword-stuffed collection descriptions.
- Avoid exposing internal taxonomy labels unless customers understand them.
- Link related collections where it helps users navigate.
- Ensure collection descriptions do not push product listings too far down on mobile.

## Implementation area 7: Product page SEO and content depth

### Goal

Make product pages more specific, helpful, and conversion-ready.

### Files likely involved

- `sections/main-product.liquid`
- `sections/featured-product.liquid`
- `sections/booking-service-product.liquid`
- Product-related snippets.
- Product-related CSS.

### Recommended product page sections

For RBP's catalogue, many products are not simple retail items. Product pages should support structured, visible content blocks such as:

- What this includes.
- Best suited for.
- How it works.
- What happens after purchase.
- Common use cases.
- What is not included.
- Related products or next steps.
- Support/contact path if unsure.

### Product type guidance

#### Template Pack

Visible page should explain:

- Specific document or template type.
- Use case.
- Audience.
- What the buyer receives.
- Whether it is made-to-order or downloadable.
- What inputs are required after purchase.

#### Toolkit

Visible page should explain:

- Industry or function.
- Included document types.
- Implementation level.
- Differences between standard, deployed, deployed plus, and deployed premium if applicable.

#### Documentation Suite

Visible page should explain:

- Workflow or compliance area.
- Documents included.
- When the suite should be used.
- Operational outcome.

#### On-Demand Service

Visible page should explain:

- Fixed scope.
- Deliverables.
- Required customer inputs.
- Delivery steps.
- When enquiry is better than checkout.

#### Outsourced Solution

Visible page should explain:

- Ongoing support model.
- Functions covered.
- Business size or stage fit.
- Commercial next step.

### SEO content standards

- Each product page should have one H1.
- Use H2s for major content blocks.
- Avoid hiding all important content in closed accordions if the page has no visible summary.
- Keep customer-facing copy specific and practical.
- Avoid duplicate page body copy across large product groups.

## Implementation area 8: Product metadata automation

### Goal

Provide repeatable, auditable processes for product SEO titles and descriptions.

### Proposed files

- `config/seo-rules.json`
- `scripts/seo-audit-product-meta.js`
- `scripts/seo-generate-product-meta.js`
- `scripts/seo-update-shopify-meta.js` optional, only with approved credentials and review workflow.
- `docs/jules/product-seo-metadata-rules.md` optional future doc.

### Metadata rules already established

Brand:

```text
Remote Business Partner
```

Meta title formula:

```text
[Specific product keyword] for [use case / audience modifier] | Remote Business Partner
```

Meta description formula:

```text
[Action/value phrase] + [specific product] + [audience/use case] + [outcome] + [delivery/trust detail]
```

### Recommended title constraints

- Maximum: 70 characters for Shopify import safety.
- Preferred: 50 to 60 characters where practical.
- Must be unique per product.
- Must not include internal catalogue codes unless they are part of the customer-facing product name.
- Must include `Remote Business Partner` unless the title becomes unusably long.

### Recommended description constraints

- Maximum: 160 characters.
- Preferred: 130 to 155 characters.
- Must be unique per product.
- Must be human-readable.
- Must not be a keyword list.
- Must include product-specific use case or outcome.
- Should include `Remote Business Partner` where practical and natural.

### Audit script checks

The audit script should check a Shopify product export CSV for:

- Missing SEO title.
- Missing SEO description.
- SEO title over 70 characters.
- SEO description over 160 characters.
- Duplicate SEO titles.
- Duplicate SEO descriptions.
- Title missing brand.
- Description missing product-specific language.
- Product body under minimum word threshold.
- Missing image alt text.
- Handles containing internal codes.
- Blank product category.

### Output artifacts

The script should produce:

- Updated Shopify import-ready CSV.
- Audit CSV.
- Summary JSON.
- Optional markdown summary for PR review.

### Automation warning

Do not create a fully automatic production updater until the generation logic has been reviewed on sample products and a human approval step exists. SEO automation should assist; it should not behave like a caffeinated intern with write access to every product.

## Implementation area 9: Image SEO and accessibility

### Goal

Ensure product and content images have descriptive alt text and efficient delivery.

### Files likely involved

- Product media rendering snippets.
- `snippets/card-product.liquid`
- Product gallery snippets or sections.
- Collection card snippets.
- Article/image sections.

### Alt text rules

Use image alt text when it exists in Shopify product media. If missing, use a safe fallback only when the image is meaningful.

Good fallback pattern:

```liquid
alt="{{ image.alt | default: product.title | escape }}"
```

Do not use product title as fallback for decorative images. Decorative images should have empty alt attributes.

### Product image alt formula

```text
[Product name] for [audience/use case]
```

Examples:

```text
Pay Slip Template for Australian payroll
Outreach Message Pack for sales prospecting
NDIS Participant Welcome Pack for provider onboarding
```

### Performance rules

- Use Shopify `image_url` with width parameters.
- Use responsive image markup where already available.
- Avoid loading oversized images in product cards.
- Lazy-load below-the-fold images.
- Do not lazy-load the likely LCP hero/product image unless testing proves it is safe.
- Set width and height attributes where practical to reduce layout shift.

## Implementation area 10: Heading structure and semantic HTML

### Goal

Make pages easier for customers, assistive technologies, and search engines to understand.

### Rules

- Use one primary H1 per page.
- Use H2 for major page sections.
- Use H3 for nested subsections.
- Product card titles should not create excessive H2/H3 noise on collection pages unless appropriate.
- Avoid using headings only for visual sizing.
- Use semantic elements where appropriate: `main`, `nav`, `article`, `section`, `header`, `footer`.

### Files to inspect

- `layout/theme.liquid`
- `sections/rbp-home.liquid`
- `sections/main-product.liquid`
- `sections/main-collection-product-grid.liquid`
- `sections/main-search.liquid`
- `snippets/card-product.liquid`

## Implementation area 11: Internal linking and product discovery

### Goal

Improve crawl paths and customer discovery across a large catalogue.

### Recommended additions

- Related collection links on product pages.
- Related products based on collection, product type, tags, or manually configured recommendations.
- Product cards that expose product type and use case.
- Collection intro links to sub-collections or filtered paths.
- Homepage pathways that link to major commercial categories.
- Search empty-state links to key categories and contact/help flow.

### Anchor text rules

Use descriptive anchor text.

Good:

```text
Browse HR templates
Explore NDIS provider documentation
View sales outreach services
```

Weak:

```text
Click here
Learn more
View all
```

Generic labels are acceptable for buttons when nearby text provides context, but avoid making every internal link context-free.

## Implementation area 12: URL handles, redirects, and duplicate content

### Goal

Keep URLs readable and stable.

### Shopify data rules

- Prefer descriptive, hyphen-separated handles.
- Avoid internal catalogue prefixes in new URLs.
- Do not change existing indexed handles without creating redirects.
- Do not create multiple near-identical products or collections that target the same keyword without a clear content distinction.

### Theme implementation rules

- Use Shopify canonical URLs.
- Do not create alternate product links that force unnecessary duplicate collection URL variants.
- Ensure product cards link consistently to product canonical or intended collection-context URL.
- Avoid adding query-parameter links for crawlable category browsing unless necessary.

## Implementation area 13: Search, filters, and faceted navigation

### Goal

Improve usability without creating crawl bloat.

### Files likely involved

- `sections/main-search.liquid`
- `sections/main-collection-product-grid.liquid`
- Filter/facet snippets if present.

### Rules

- Keep search result pages useful for users.
- Avoid encouraging indexation of low-value search result pages.
- Do not create permanent internal links to every filtered parameter combination.
- Use clear no-results guidance.
- Link no-results states to major collections and contact/help options.

## Implementation area 14: Robots.txt and sitemap handling

### Goal

Avoid breaking Shopify's built-in crawl controls.

### Rules

- Shopify generates `sitemap.xml` and `robots.txt` automatically.
- Do not customize `templates/robots.txt.liquid` unless there is a specific, documented crawl issue.
- Never block product, collection, page, or blog content casually.
- Use `noindex` for index-control requirements when appropriate; do not rely only on `robots.txt` to prevent indexing.

### Possible future file

- `templates/robots.txt.liquid`

Only add this if the task specifically requires robots customization.

## Implementation area 15: Hreflang, Markets, and international SEO

### Goal

Prepare for international or regional SEO if Shopify Markets, alternate languages, or region-specific domains are used.

### Rules

- Do not add manual hreflang tags without confirmed store market/language setup.
- If Markets/languages are active, use Shopify-supported locale and URL data.
- Confirm that hreflang URLs are reciprocal and canonical-compatible.
- Do not invent region pages just to target locations.

## Implementation area 16: Performance and Core Web Vitals

### Goal

Avoid SEO loss from slow, unstable, or heavy pages.

### Files likely involved

- `layout/theme.liquid`
- JS assets.
- CSS assets.
- Product gallery sections.
- Homepage sections.
- Collection grid rendering.

### Rules

- Keep critical CSS lean.
- Avoid unnecessary render-blocking scripts.
- Defer non-critical JavaScript.
- Lazy-load below-the-fold images.
- Avoid layout shift by reserving image dimensions.
- Avoid excessive app embeds or duplicate scripts.
- Test homepage, product page, collection page, and search page.

### Optional automation

Add Lighthouse CI or a lighter performance budget check in GitHub Actions.

Baseline checks:

- LCP element is not lazy-loaded accidentally.
- CLS stays low on product and collection pages.
- Main thread impact is not worsened by new JavaScript.
- Image payloads are reasonable.

## Implementation area 17: GitHub Actions SEO checks

### Goal

Prevent theme-level SEO regressions before code reaches the connected Shopify branch.

### Proposed file

- `.github/workflows/seo-check.yml`

### Initial workflow scope

Run on pull requests and pushes to `main`:

- Checkout.
- Shopify Theme Check.
- Verify key SEO files exist.
- Grep for canonical rendering.
- Grep for meta description rendering.
- Grep for Open Graph rendering.
- Grep for product JSON-LD when implemented.
- Optional: run product SEO metadata audit if a CSV exists in a defined input location.

### Example workflow

```yaml
name: SEO Theme Checks

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  seo-check:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout theme
        uses: actions/checkout@v4

      - name: Theme Check
        uses: shopify/theme-check-action@v2

      - name: Check canonical tag rendering
        run: grep -R "canonical_url" layout snippets templates sections

      - name: Check meta description rendering
        run: grep -R "meta name=\"description\"" layout snippets templates sections

      - name: Check social metadata rendering
        run: grep -R "og:title" snippets layout templates sections
```

Extend this once dedicated SEO snippets exist.

## Implementation area 18: Product metadata update workflow

### Goal

Create a safe workflow for improving product SEO data at scale.

### Recommended workflow

```text
Export products from Shopify
Run metadata audit/generation script
Review updated CSV and audit summary
Import approved CSV into Shopify
Validate sample products in storefront source
Monitor Google Search Console changes
```

### Optional Admin API workflow

If using the Shopify Admin API later:

```text
Generate proposed metadata
Create review artifact
Human approval
Update `global.title_tag` and `global.description_tag`
Run validation audit
Log changed products
```

### Required safety controls

- Dry-run mode by default.
- Diff output before writing to Shopify.
- Rate-limit handling.
- Rollback/export backup.
- Product count summary.
- Duplicate title/description detection.
- Maximum length validation.

## Implementation area 19: FAQs and rich-result content

### Goal

Use FAQs only where they help users and match visible page content.

### Rules

- Do not add FAQ schema for questions that are not visible on the page.
- Do not generate generic FAQs across every product.
- Use product-specific FAQs for complex product types only where useful.
- Keep FAQ content accurate, practical, and non-spammy.

Good product FAQ topics:

- What happens after purchase?
- What information do I need to provide?
- Is this a template, service, or deployed setup?
- Can Remote Business Partner customise this for my business?
- Is this suitable for Australian SMEs?

## Implementation area 20: Measurement and monitoring

### Goal

Ensure SEO changes can be evaluated after deployment.

### Tools and checks

- Google Search Console.
- Rich Results Test.
- Shopify analytics.
- Google Analytics if installed.
- Merchant Center if product listings are used.
- Lighthouse or PageSpeed Insights.

### Metrics to monitor

- Indexed product and collection URLs.
- Search impressions.
- Click-through rate.
- Average position for product and collection queries.
- Product rich result eligibility.
- Crawl/indexing errors.
- Duplicate title or description warnings from third-party audit tools.
- Core Web Vitals.

### Review cadence

Suggested cadence:

- Immediate validation after deployment.
- First Search Console review after 2 to 4 weeks.
- Deeper review after 6 to 8 weeks.
- Quarterly product metadata audit.

## Recommended implementation phases

### Phase 1: Document and protect current SEO baseline

Implement:

- Add this document.
- Confirm existing `layout/theme.liquid` title, description, and canonical behavior.
- Confirm `snippets/meta-tags.liquid` behavior.
- Add basic GitHub Action checks for existing SEO tags.

### Phase 2: Structured data foundation

Implement:

- `snippets/rbp-jsonld-product.liquid`.
- `snippets/rbp-jsonld-breadcrumbs.liquid`.
- `snippets/rbp-jsonld-site.liquid`.
- Render snippets conditionally by page type.
- Validate with Rich Results Test and schema validator.

### Phase 3: Product and collection UX/content improvements

Implement:

- Product page content blocks for inclusions, audience, delivery process, and use cases.
- Better collection intro/support blocks.
- Related collection/product linking.
- Search no-results guidance.

### Phase 4: Product SEO metadata automation

Implement:

- `config/seo-rules.json`.
- `scripts/seo-audit-product-meta.js`.
- `scripts/seo-generate-product-meta.js`.
- Audit artifact generation.
- Optional Admin API updater only after manual CSV workflow is proven.

### Phase 5: Performance and monitoring automation

Implement:

- Lighthouse CI or performance budget checks.
- Image payload checks.
- JS/CSS regression checks where practical.
- Search Console review process outside repo.

## Acceptance criteria for SEO implementation PRs

Each SEO PR should include:

- Summary of what changed.
- Files touched.
- Page types affected.
- Validation steps.
- Screenshots or rendered source snippets where helpful.
- Rich Results Test outcome for structured data changes.
- Theme Check result.
- Known limitations.
- Follow-up tasks.

A PR should not claim SEO ranking improvements as guaranteed. It should claim implementation improvements only, such as cleaner metadata, better structured data, stronger internal linking, improved performance, or better crawlability.

## Official references

Use these as the main external references for implementation decisions:

- Shopify theme SEO overview: https://shopify.dev/docs/storefronts/themes/seo
- Shopify SEO overview: https://help.shopify.com/en/manual/promoting-marketing/seo/seo-overview
- Shopify GitHub integration for themes: https://shopify.dev/docs/storefronts/themes/tools/github
- Google title links documentation: https://developers.google.com/search/docs/appearance/title-link
- Google meta description/snippet documentation: https://developers.google.com/search/docs/appearance/snippet
- Google product structured data documentation: https://developers.google.com/search/docs/appearance/structured-data/product
- Shopify Theme Check GitHub Action: https://github.com/Shopify/theme-check-action

## Final implementation note for Jules

When working on SEO in this repository, keep the system split cleanly:

```text
Shopify Admin/product data = product SEO source of truth
Theme Liquid/snippets = SEO rendering and structured data layer
GitHub Actions/scripts = audit and regression-prevention layer
Search Console/Merchant Center = external validation and monitoring layer
```

This is the safest way to improve SEO without turning the theme into a brittle metadata factory. The less the theme invents, and the better it renders real Shopify data, the fewer future problems everyone gets to pretend were unforeseeable.
