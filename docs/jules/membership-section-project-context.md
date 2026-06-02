# Membership Section Project Context

## Purpose

This repository contains the Shopify storefront design and theme implementation for Remote Business Partner. It is used to maintain the customer-facing Shopify experience, including page templates, navigation, theme sections, storefront layout, design system styling, and repository-based fixes that are later deployed to the Shopify store.

This context file exists to give Google Jules high-level project context before it works on future membership-related implementation tasks. The Membership area is commercially important and should not be treated as a simple content page update. It touches storefront navigation, page routing, product positioning, application intake, member access, customer account behaviour, and the way Remote Business Partner explains its business support platform to eligible B2B customers.

The immediate focus is to finalise the Membership section of the Shopify site so that the live customer journey accurately reflects the approved Remote Business Partner Premium Membership offer and no longer shows generic, placeholder, or outdated membership pathway content.

## Business context

Remote Business Partner is an Australian business support platform for SMEs. The store is not a simple retail catalogue. It combines advisory services, consulting, implementation support, operations support, business essentials, digital resources, business internet, marketplace-style offers, and membership pathways in one Shopify-powered experience.

The Membership section should represent the approved Remote Business Partner Premium Membership offer, not a generic tiered membership model. The current approved membership positioning is:

- Remote Business Partner Premium Membership.
- Early Bird price of `$50 + GST per week`.
- Standard 2027 rate of `$100 + GST per week`.
- 24-month B2B membership agreement.
- Application-first signup process.
- Approval required before activation.
- Eligible NBN 1000/400 included as part of the paid membership, subject to serviceability and eligibility.
- Access to current platform features and eligible future applications as released.
- Access to Document Nucleus, eligible templates, documentation suites, toolkits, guides, downloads, and business resources.
- Eligible member offers, marketplace benefits, discounts, and cashback opportunities where available.
- Eligible service discounts, including on-demand services, Fixer services, selected managed services, additional NBN services, selected real estate services, RBP products, and other scoped benefits.
- Support pathways through the Help Centre, member guidance, account support, and future member portal areas.

The Membership section must be clear that the included NBN service is not a separate free product. It is included as part of the paid membership bundle and remains subject to address qualification, network technology, provider approval, provisioning, equipment, premises wiring, and serviceability.

The business problem to solve is that the store has had multiple membership-related pages and menu items, but some of them are either placeholders, bridge pages, or generic design content. This can confuse prospects and make the offer appear unfinished. Future Jules work should align the live storefront with the actual commercial offer and remove or replace any outdated Foundation / Growth / Premium pathway content unless those tiers are explicitly introduced later as real products.

## Application context

This repository appears to contain a Shopify theme or Shopify storefront design implementation. Future work will likely involve Shopify Liquid templates, JSON templates, section files, snippets, navigation configuration, page templates, and CSS or design system assets.

The Membership work should be understood as a storefront implementation task with several connected areas:

1. Public-facing Membership pages.
2. Header and footer navigation.
3. Page templates and theme sections.
4. Member account or portal entry points.
5. Application / sign-up form presentation.
6. Customer tag or account-state based access control.
7. Content consistency between Shopify pages and theme-rendered sections.
8. Supporting links to legal, policy, Help Centre, and NBN/serviceability information.

The relevant public pages and intended final roles are:

| Page role | Preferred handle | Intended purpose |
| --- | --- | --- |
| Membership Overview | `/pages/membership` | Main public sales and explanation page for Premium Membership. |
| Member Benefits | `/pages/member-benefits` | Full benefits, inclusions, discounts, access rules, exclusions, and eligibility notes. |
| Membership FAQ | `/pages/membership-faq` | Dedicated membership questions covering price, eligibility, NBN, application, activation, billing, access, and benefits. |
| Sign Up / Apply | `/pages/sign-up-today` | Application-first membership signup form and process explanation. |
| Member Portal / Account | `/account` or a member dashboard page | Logged-in customer pathway for active members and applicants. |
| Member Resources | `/pages/member-resources` | Gated or member-aware resource pathway for templates, toolkits, documentation suites, and downloads. |
| Account Support | `/pages/account-support` | Account, login, billing, application status, and membership access support. |

Known existing Shopify page handles that may need review, replacement, redirect, or reuse include:

- `/pages/membership`
- `/pages/membership-options`
- `/pages/inclusions`
- `/pages/member-benefits`
- `/pages/frequently-asked-questions`
- `/pages/membership-faq`
- `/pages/sign-up-today`
- `/pages/help-center`
- `/pages/help-centre`
- `/pages/member-resources`
- `/pages/account-support`
- `/account`

The preferred final structure is that the Membership menu should point to distinct, useful pages:

- `Overview` -> `/pages/membership`
- `Member Benefits` -> `/pages/member-benefits`
- `Frequently Asked Questions` -> `/pages/membership-faq`
- `Sign Up` -> `/pages/sign-up-today`
- `Member Portal / Account` -> `/account`

Relevant theme areas that may need inspection or updates include, but are not limited to:

- `templates/page.membership.json`
- `templates/page.member-benefits.json`
- `templates/page.membership-faq.json`
- `templates/page.membership-signup.json`
- `templates/page.member-portal.json`
- `templates/page.member-resources.json`
- `templates/page.account-support.json`
- `sections/header.liquid`
- `sections/footer.liquid`
- `sections/main-page.liquid`
- `sections/rbp-membership*.liquid`
- `sections/rbp-member*.liquid`
- `sections/rbp-faq*.liquid`
- `sections/rbp-application*.liquid`
- `snippets/navigation*.liquid`
- `snippets/menu*.liquid`
- `snippets/member*.liquid`
- `config/settings_data.json`
- any JSON template or section file that contains membership copy directly.

When auditing the repository, search for outdated or suspect text such as:

- `Foundation`
- `Growth`
- `Premium pathways`
- `Compare access by level`
- `Ask about Foundation`
- `Ask about Growth`
- `Ask about Premium`
- `Ongoing access to practical business support`
- `Designed for businesses that need something more than a support structure`

Those strings may indicate stale membership landing page content that should be replaced with the approved Premium Membership offer unless the task explicitly asks to preserve or reintroduce tiers.

## Key goals

- Make the Membership section commercially accurate, clear, and consistent across all public pages and menu links.
- Replace generic or outdated tiered content with the approved Remote Business Partner Premium Membership positioning.
- Ensure the top-level Membership menu and footer links route users to the correct pages.
- Make `/pages/membership` the primary overview page rather than a bridge or placeholder.
- Make `/pages/member-benefits` a complete benefits and inclusions page, not a one-sentence placeholder.
- Make `/pages/membership-faq` or the active FAQ destination a complete dedicated membership FAQ page, not a generic placeholder.
- Preserve `/pages/sign-up-today` as the application-first membership signup pathway, while improving it if future tasks require it.
- Ensure the sign-up page explains application, qualification, approval, checkout/agreement, onboarding, and activation.
- Ensure the signup form captures the business, ABN/ACN, primary contact, service address, current provider, contract status, team size, additional NBN interest, membership needs, and required acknowledgements.
- Add or preserve acknowledgements that membership is B2B, approval is required, NBN is subject to serviceability, and NBN is included as part of paid membership rather than offered as a separate free service.
- Support a future operational lifecycle where applicants and members can be tracked by customer/account state or tags.
- Use precise membership access tags where needed, preferably state-based tags such as `rbp-premium-applied`, `rbp-premium-approved`, `rbp-premium-awaiting-payment`, `rbp-premium-active`, `rbp-premium-suspended`, `rbp-premium-cancelled`, and `rbp-premium-declined`.
- Gate member-only content using an active membership state, ideally `rbp-premium-active`, rather than broad labels like `membership` or `premium-membership`.
- Provide non-member fallback states with clear login, apply, and view-benefits calls to action.
- Ensure that benefits described on the storefront are implementable and scoped with eligibility language.
- Keep NBN wording careful and consistent: included with the paid membership, subject to serviceability, not guaranteed at every address, and not described as free.
- Ensure discount promises are scoped as eligible discounts only and do not imply blanket discounts across every product or service.
- Ensure any mention of unlimited access is limited to eligible self-service resources and does not imply unlimited custom work or unlimited human-assisted drafting.
- Make the member portal and account-support pathways useful enough for active members, applicants, and non-members to understand what to do next.
- Maintain a clean repository structure so future membership copy and implementation can be reviewed without hunting through unrelated theme files.

Membership benefits that should be reflected on the Member Benefits page include:

- Eligible NBN 1000/400 included with membership.
- 20% off eligible additional NBN services taken separately from the included membership connection.
- Access to current Remote Business Partner platform features.
- Eligible future applications as released.
- Access to Document Nucleus resources.
- Unlimited access to eligible business templates.
- Unlimited self-service revisions to eligible templates.
- Unlimited access to eligible documentation suites.
- Unlimited access to eligible business, compliance, operations, and support toolkits.
- Access to articles, guides, tools, downloads, and educational resources.
- Access to on-demand advisory, decision support, and business support services.
- 25% off eligible on-demand services.
- Fair usage access to advisory support where applicable.
- Decision Desk self-service access, with fair usage for human-supported requests.
- 25% discounted pricing on eligible Fixer services.
- Fair usage discovery calls for eligible member needs.
- Access to managed services and preferred member pricing.
- 50% off eligible Bid Management onboarding fee.
- 20% off eligible real estate services.
- Member pricing on eligible HR services.
- Member pricing on eligible document management services.
- Member pricing on eligible business sale support services.
- Custom Solutions quoted at member rates where eligible.
- $100 credit or cashback per eligible business finance outcome.
- $100 credit per eligible business insurance policy.
- Access to eligible marketplace offers and member benefits.
- 35% off eligible RBP products.
- Access to eligible member offers, exclusive deals, and cashback opportunities where available.
- Help Centre, knowledge base, troubleshooting, support resources, and member guidance.

The Membership FAQ should cover at least:

- What Premium Membership is.
- Early Bird price and standard 2027 rate.
- Whether the price is weekly and how GST is presented.
- Whether there is a minimum term.
- Who can apply.
- Why approval is required.
- What information is needed to apply.
- What happens after application submission.
- Whether NBN is free.
- Whether NBN 1000/400 is guaranteed.
- What happens if an address is not serviceable.
- Whether speeds are guaranteed.
- What benefits are included.
- What `eligible` means.
- Whether unlimited access means unlimited custom work.
- How discounts apply.
- How member-only resources are accessed.
- How membership status is recognised.
- Whether customer login is required.
- Whether access can be suspended or cancelled.

## Important constraints

- Read `AGENTS.md` before making changes. This file provides additional membership-specific context only.
- Keep changes tightly scoped to the membership task being requested.
- Do not perform unrelated theme refactors while fixing membership pages, menus, or templates.
- Do not delete existing pages, templates, or sections unless the task explicitly asks for deletion and the impact is understood.
- Prefer additive or minimally invasive changes that are easy to review.
- Preserve existing Shopify compatibility, Liquid syntax, JSON template validity, and theme section schema requirements.
- Do not break existing non-membership pages, product pages, collection pages, account pages, or navigation items.
- Do not hardcode secrets, API keys, credentials, internal provider data, or private operational notes into theme files.
- Do not commit generated build artifacts, local environment files, dependency caches, or temporary files.
- Avoid storing large blocks of business-critical copy in obscure snippets if a page template, section, or metaobject-driven structure would be clearer.
- Avoid making broad CSS changes that affect unrelated site areas unless the task specifically requires design system changes.
- Preserve current design language where practical: clean B2B layout, card-based sections, strong CTA blocks, blue/navy brand treatment, readable tables, and mobile-friendly responsive layouts.
- Keep all membership statements consistent with the approved business offer and avoid inventing new benefits, prices, tiers, guarantees, or legal promises.
- Do not describe NBN as free. Use language such as `eligible NBN 1000/400 included as part of the paid membership`.
- Do not imply every address qualifies for NBN 1000/400.
- Do not imply every RBP product or service receives a discount. Use eligible/exclusion language.
- Do not imply unlimited custom work, unlimited advisory time, or unlimited done-for-you drafting unless a future task explicitly changes the offer.
- If adding access-control logic, use a clear active-member condition and a safe fallback for non-members and logged-out visitors.
- If the task involves the signup form, preserve the application-first flow unless explicitly instructed to implement direct public checkout.
- If the task involves redirecting or replacing old pages, keep legacy handles in mind so existing links do not break.
- If tests, linting, theme checks, or build commands exist, run the relevant checks before finalizing. If they are unavailable or failing due to existing repository state, report that clearly.
- Keep pull requests and commits small and reviewable. Membership fixes should be understandable by a reviewer without reconstructing the entire store history from scattered theme files.

## How Jules should use this file

Jules should read this file alongside `AGENTS.md` before starting future implementation tasks related to the Membership section, member portal, membership navigation, membership page templates, signup/application flow, customer account access, or membership-related copy.

`AGENTS.md` contains repository-wide working rules. This file provides the project and business context needed to avoid fixing the wrong thing. When a future task mentions membership, Jules should use this file to understand the approved offer, the intended page structure, the relevant Shopify handles, the likely templates and sections to inspect, and the important constraints around eligibility, NBN wording, discounts, member access, and application-first signup.

This file is context only. It is not a substitute for the task prompt, the current repository state, Shopify theme rules, or code review. Jules should still inspect the actual files before changing them, keep changes scoped, and report assumptions, validation steps, and any skipped checks in the resulting pull request or task notes.
