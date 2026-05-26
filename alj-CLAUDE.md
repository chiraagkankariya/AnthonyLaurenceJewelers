# CLAUDE.md — Anthony Laurence Jewelers
> This file is Claude Code's persistent memory. Read this at the start of every session before writing any code.

---

## Project Overview
**Business:** Anthony Laurence Jewelers
**Tagline:** "Made to Be Remembered."
**Domain:** https://anthonylaurencejewelry.com
**Type:** Full-stack e-commerce jewelry website with CMS, Stripe payments, and Calendly booking

---

## Tech Stack
| Layer | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| CMS | Sanity.io (free tier) |
| Payments | Stripe (hosted checkout) + Stripe Tax |
| Booking | Calendly embed |
| Hosting | Vercel |
| Styling | Tailwind CSS |
| Language | TypeScript |

---

## Environment Variables
Never hardcode these. Always reference via `process.env`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
NEXT_PUBLIC_CALENDLY_URL=YOUR_CALENDLY_URL
NEXT_PUBLIC_SITE_URL=https://anthonylaurencejewelry.com
```

---

## Brand Identity

### Colors
| Name | Hex | Usage |
|---|---|---|
| Deep Red | `#8B0000` | Primary brand color, headings, accents |
| Gold | `#F5A623` | Secondary accent, logo color, highlights |
| Ivory | `#FFFFF0` | Background alternative |
| Charcoal | `#2C2C2C` | Body text |
| White | `#FFFFFF` | Primary background |
| Light Gray | `#F5F5F5` | Section backgrounds, cards |

### Typography
- **All Serif throughout** — headings AND body text
- Recommended font: `Cormorant Garamond` (Google Fonts) — matches logo elegance
- Fallback: `Georgia, serif`
- Font weights: 300 (light), 400 (regular), 600 (semibold), 700 (bold)

### Design Aesthetic
- Light & Elegant — white/cream backgrounds, dark text, clean boutique feel
- Inspired by: furlanmarri.com
- Animations: subtle fade-ins on scroll only (no flashy transitions)
- NO dark backgrounds anywhere
- Jewelry photography should always be on white/cream backgrounds

### Logo
- File: `/public/logo.png`
- Colors: Deep Red (`#8B0000`) + Gold (`#F5A623`)
- Always maintain clear space around logo
- Never stretch or recolor

---

## Folder Structure
```
/
├── app/
│   ├── page.tsx                  # Homepage
│   ├── shop/
│   │   ├── page.tsx              # All products
│   │   ├── rings/page.tsx
│   │   ├── necklaces/page.tsx
│   │   ├── earrings/page.tsx
│   │   └── bracelets/page.tsx
│   ├── products/[slug]/page.tsx  # Product detail
│   ├── custom/page.tsx           # Custom jewelry inquiry
│   ├── appraisals/page.tsx       # Appraisals service
│   ├── repairs/page.tsx          # Repairs service
│   ├── about/page.tsx            # About us
│   ├── cart/page.tsx             # Cart
│   ├── checkout/
│   │   ├── success/page.tsx
│   │   └── cancel/page.tsx
│   └── api/
│       ├── checkout/route.ts     # Stripe checkout session
│       └── contact/route.ts      # Custom inquiry email
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── ShopByCategory.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AboutSnippet.tsx
│   │   ├── GoogleReviews.tsx
│   │   └── ConsultationBanner.tsx
│   ├── shop/
│   │   ├── ProductGrid.tsx
│   │   ├── ProductCard.tsx
│   │   ├── FilterSidebar.tsx
│   │   └── SearchBar.tsx
│   ├── product/
│   │   ├── ImageGallery.tsx
│   │   ├── VariantSelector.tsx
│   │   ├── CaratSelector.tsx
│   │   └── PriceCalculator.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── CartDrawer.tsx
│       └── CalendlyEmbed.tsx
├── lib/
│   ├── sanity.ts                 # Sanity client
│   ├── stripe.ts                 # Stripe client
│   └── priceCalculator.ts        # Carat pricing logic
├── sanity/
│   └── schema/
│       ├── product.ts
│       └── index.ts
└── public/
    └── logo.png
```

---

## Coding Standards
- Always use **TypeScript** — no `.js` files
- Use **Tailwind CSS** for all styling — no inline styles
- Use **Next.js App Router** — no pages directory
- All Sanity queries use **GROQ**
- All components are **functional** with React hooks
- No `any` types in TypeScript
- Always handle loading and error states in components
- Use `next/image` for all images
- Use `next/link` for all internal navigation

---

## Key Business Rules (Read Before Writing Any Feature)

### Pricing Formula (Carat Adjustments)
- Base price is set per product in Sanity
- Lab grown diamonds only (for now — natural diamond toggle exists for future use)
- Diamond cost: **$500 per carat change** in either direction
- Gold adjustment (always calculated from **base price**):
  - 1st carat change: **10% of base price**
  - Each subsequent carat: **7.5% of base price**
  - 0.5ct change: **5% of base price**
- Carat range: base ± 5ct, floor of **1ct minimum**, in 0.5ct increments
- All adjustments are calculated relative to base price (NOT compounding on running total)
- See `/lib/priceCalculator.ts` for implementation

### Returns Policy
- Standard products: store credit or exchange of equal/lesser value within **30 days**
- Custom pieces: **all sales final** — no returns, no exchanges, no store credit
- **No refunds under any circumstances**

### Shipping
- All shipping: **free**
- Local pickup: **free**
- Customer chooses at checkout
- **Signature required on all shipped orders**
- Sales tax: handled by **Stripe Tax** (NJ based — 6.625%)

### Product Variants (only show relevant variants per category)
- **Metal type:** Yellow Gold, White Gold, Rose Gold, Silver, Platinum
- **Purity:** 10k, 14k, 18k, 22k, 24k — **only for Yellow Gold and White Gold**
- **Ring sizes:** 3 to 13 in 0.25 increments (3, 3.25, 3.5... 13) — rings only
- **Necklace lengths:** 14", 16", 18", 20", 22", 24" — necklaces/chains only
- **Bracelet lengths:** 6.5", 7", 7.5", 8", 8.5" — bracelets only
- **Carat selector:** only shown if base carat ≥ 1ct

---

## GitHub & Deployment

### Repository
```
https://github.com/chiraagkankariya/AnthonyLaurenceJewelers.git
```

### Branching Strategy
| Branch | Purpose |
|---|---|
| `main` | Production only — connected to Vercel, deploys live to anthonylaurencejewelry.com |
| `dev` | Active development — all code gets pushed here first |

### Rules
- **NEVER push directly to `main`**
- All development work is committed and pushed to `dev`
- `dev` has its own Vercel preview URL for review before going live
- Only merge `dev` → `main` when the owner has reviewed and approved changes
- Each Phase from PROGRESS.md should be its own commit with a clear message

### Commit Message Format
```
[Phase X] Brief description of what was built
e.g. "[Phase 3] Build Navbar and Footer components"
e.g. "[Phase 6] Implement carat pricing calculator"
```

### Workflow for Every Session
1. `git checkout dev` — always confirm you're on dev before writing code
2. Build the feature
3. `git add .`
4. `git commit -m "[Phase X] description"`
5. `git push origin dev`
6. Never run `git checkout main` or `git merge` unless explicitly instructed by the owner

---

## Contact Information
- **Address:** 139 Millburn Ave, Millburn, NJ 07041
- **Phone:** (973) 379-3344
- **Email:** anthonylaurencejewlers@gmail.com
- **Instagram:** https://www.instagram.com/anthonylaurencejewelry/
- **Hours:**
  - Tuesday–Friday: 8AM–4PM
  - Saturday: 8AM–12PM
  - Sunday–Monday: Closed
