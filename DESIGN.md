# Remote Business Partner Shopify Theme Design

## Purpose

This document defines the design direction for the Remote Business Partner Shopify theme.

The goal is to create a customer-facing Shopify storefront theme, not a dashboard, admin interface, internal tool, SaaS app, strategy board, or presentation. Every design produced from this brief should look and behave like a Shopify online store.

The first version should create broad starting-point templates for Shopify's standard theme template types. These templates will later be refined into more specific product, service, page, and state variants.

## Brand context

Remote Business Partner is an Australian business services store. The storefront supports business templates, document products, on-demand services, booking services, Business NBN / internet products, memberships, partner offers, marketplace opportunities, help resources, and customer support pathways.

The theme should communicate:

- Practical business support
- Trust and clarity
- Professional service delivery
- Structured pathways
- Commercial confidence
- Simple product and service discovery

## Design principles

1. Design storefront pages only.
2. Keep the first version broad and reusable.
3. Start with Shopify's standard template types.
4. Avoid over-specialising templates too early.
5. Use one universal collection template at the start.
6. Use clean product, article, collection, page, and cart layouts.
7. Make every template customer-facing.
8. Prioritise clarity over decoration.
9. Use reusable sections and components.
10. Do not create dashboards, charts, internal cards, admin panels, or project planning screens.

## Visual direction

The theme should feel like a modern Shopify storefront for a professional Australian business services brand.

Use:

- Clean page layouts
- Strong hero sections
- Clear navigation
- Rounded cards
- Strong call-to-action buttons
- Product and service grids
- Collection browsing patterns
- Practical support pathways
- Trust and credibility sections
- Pill badges for categories, states, and product types
- Clear typography hierarchy
- Professional spacing
- Mobile-ready responsive layouts

Avoid:

- Dashboard layouts
- Admin-style sidebars
- Analytics cards
- Project management screens
- Internal workflow screens
- Overly abstract design system pages
- Decorative components that do not map to storefront use

## Initial colour direction

Use a restrained professional palette.

| Token | Value | Use |
|---|---:|---|
| Deep Navy | `#020617` | Dark backgrounds, footer, high-contrast panels |
| Navy | `#0f172a` | Hero backgrounds, primary text |
| Primary Blue | `#1d4ed8` | Primary CTAs, links, active states |
| Dark Blue | `#1e3a8a` | Hover states, gradients |
| Soft Blue | `#dbeafe` | Badges, light panels, highlights |
| Indigo | `#4f46e5` | Secondary accent |
| Teal | `#0d9488` | Business NBN / operational accent |
| Green | `#059669` | Success and availability states |
| Amber | `#d97706` | Warning, pending, review states |
| Purple | `#7c3aed` | Membership / premium states |
| Slate 700 | `#334155` | Strong secondary text |
| Slate 600 | `#475569` | Body copy |
| Slate 500 | `#64748b` | Muted text |
| Slate 100 | `#f1f5f9` | Light backgrounds |
| Slate 50 | `#f8fafc` | Muted page sections |
| White | `#ffffff` | Main surfaces |

## Typography direction

Use a clean professional sans-serif style.

Create type styles for:

- Display / Hero
- H1
- H2
- H3
- H4
- Body Large
- Body
- Small
- Eyebrow
- Button
- Caption

Typography should be confident and readable. Headings should be strong, compact, and suitable for commercial landing pages. Body copy should be practical and easy to scan.

## Core components

Create reusable storefront components for:

- Header
- Mobile header
- Mega menu
- Footer
- Button / Primary
- Button / Secondary
- Button / Ghost
- Button / Outline
- Product card
- Article card
- Collection card
- Service card
- Offer card
- Help card
- Badge
- State badge
- Alert
- Search field
- Form field
- Quantity selector
- Variant selector
- FAQ item
- CTA band
- Trust strip
- Empty state
- Loading state
- Error state

These components should be designed as Shopify storefront components, not dashboard widgets.

## Standard Shopify template artboards

Create broad starting-point artboards for the following Shopify template types.

### 1. 404

**Purpose:** Renders page content shown when a customer enters an invalid store URL.

**Design requirements:**

- Header
- Clear error message
- Search box
- Suggested pathways
- Popular links
- Footer

### 2. Article

**Purpose:** Renders an individual blog article page.

**Design requirements:**

- Header
- Article title
- Article metadata
- Featured image
- Article body
- Optional comments area
- Related articles or resources
- Related products/services where relevant
- Footer

### 3. Blog

**Purpose:** Renders a blog index page listing articles within a blog.

**Design requirements:**

- Header
- Blog hero
- Featured article
- Article grid or list
- Optional category/filter area
- Resource CTA
- Footer

### 4. Cart

**Purpose:** Renders the `/cart` page.

**Design requirements:**

- Header
- Cart guidance message
- Cart item list
- Product thumbnails
- Quantity controls
- Remove item control
- Order summary
- Subtotal
- Checkout CTA
- Support/help section
- Footer

### 5. Collection

**Purpose:** Renders a collection page listing products within a collection.

**Design requirement:** Create one universal collection template at the starting point.

**Design requirements:**

- Header
- Collection hero
- Collection description
- Optional category chips
- Filter bar
- Sort control
- Product grid
- Product/service card variants
- Empty state
- Collection help section
- Footer

This template should be flexible enough for templates, services, Business NBN, offers, and marketplace-style collections.

### 6. Gift Card

**Purpose:** Renders the gift card page issued to a customer after purchase.

**Shopify target:** `gift_card.liquid`

**Design requirements:**

- Logo
- Gift card value
- Gift card code
- QR/code placeholder
- Print button
- Shop link
- Minimal footer

### 7. Index

**Purpose:** Renders the homepage at `/`.

**Design requirements:**

- Header
- Hero section
- Primary CTA
- Secondary CTA
- Commercial pathway cards
- Featured collections
- Featured products/services
- How it works
- Trust section
- Resources/help section
- CTA band
- Footer

**Hero direction:**

Business templates, services and support pathways for practical operators.

**Primary CTA:** Browse Templates  
**Secondary CTA:** Explore Services

### 8. List Collections

**Purpose:** Renders the `/collections` page listing all store collections.

**Design requirements:**

- Header
- Page hero
- Collection category grid
- Featured collection cards
- Help CTA
- Footer

### 9. Page

**Purpose:** Renders standard shop pages such as About, Contact, policy-style pages, and general information pages.

**Design requirements:**

- Header
- Page hero
- Rich text content area
- Optional image/content blocks
- Optional card grid
- CTA section
- Footer

### 10. Password

**Purpose:** Renders the `/password` page shown when the store is password-protected.

**Design requirements:**

- Logo
- Store access message
- Email signup
- Password form
- Minimal footer

### 11. Product

**Purpose:** Renders a product page with product media, content, variant selection, and add-to-cart form.

**Design requirements:**

- Header
- Product media gallery
- Product title
- Product summary
- Price
- Variant selector
- Quantity selector
- Add to cart button
- Dynamic checkout button
- Product description
- Product details
- Related products
- FAQ
- Support CTA
- Footer

### 12. Search

**Purpose:** Renders the `/search` page with storefront search results.

**Design requirements:**

- Header
- Search hero
- Search input
- Results summary
- Filters or tabs
- Sort control
- Product/page/article result cards
- No-results state
- Footer

### 13. Metaobject

**Purpose:** Renders public metaobject pages where a metaobject definition has web page capability.

**Design requirements:**

- Header
- Hero
- Details section
- Status badge
- CTA
- Related content
- FAQ/support section
- Footer

Use this as a generic public detail page pattern for future partner offers, partner profiles, business opportunities, asset sale listings, or other structured public records.

### Robots.txt

`robots.txt.liquid` is a required Liquid template for crawler instructions, but it is not a customer-facing storefront page. Do not create a visual Figma artboard for it. Document it only as a technical template.

## First-pass Figma output requirements

The first Figma pass should create:

1. A design system page.
2. A global sections page.
3. One artboard for each customer-facing Shopify template type above.
4. Desktop-first layouts.
5. Basic mobile consideration for header, product, collection, cart, and search.
6. Clear labels showing each Shopify target template.

## Artboard naming convention

Use this naming format:

```text
Template / 404
Template / Article
Template / Blog
Template / Cart
Template / Collection
Template / Gift Card
Template / Index
Template / List Collections
Template / Page
Template / Password
Template / Product
Template / Search
Template / Metaobject
```

For Shopify target notes, use:

```text
templates/404.json
templates/article.json
templates/blog.json
templates/cart.json
templates/collection.json
templates/gift_card.liquid
templates/index.json
templates/list-collections.json
templates/page.json
templates/password.json
templates/product.json
templates/search.json
templates/metaobject/[type].json
```

## Later template expansion

After the broad templates exist, expand into RBP-specific variants:

- Product / Digital Template
- Product / Service
- Product / Booking
- Product / Business NBN
- Product / Membership
- Product / Marketplace
- Page / Landing
- Page / Service
- Page / Hub
- Page / Business NBN
- Page / Help
- Page / Contact
- Page / Legal
- Page / Member Portal

Do not start with these variants until the broad Shopify template set is visually established.

## Success criteria

The design is successful when:

- It looks like a Shopify storefront theme.
- Every artboard is customer-facing.
- The standard Shopify template types are represented.
- The collection template remains universal.
- Product and page templates are broad starting points.
- Components can later become Shopify sections, snippets, and theme settings.
- The design is clean enough to implement in Liquid, JSON templates, CSS, and Shopify theme settings.
- No dashboard or internal app patterns appear anywhere.
