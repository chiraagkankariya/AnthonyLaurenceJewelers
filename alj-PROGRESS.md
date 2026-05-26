# PROGRESS.md — Build Checklist
## Anthony Laurence Jewelers Website
> Update this file as tasks are completed. Start every Claude Code session by reading this file to know where you left off.

---

## Phase 1 — Project Setup
- [x] Initialize Next.js 14 project with TypeScript and Tailwind CSS
- [x] Install dependencies: `@sanity/client`, `next-sanity`, `stripe`, `@stripe/stripe-js`
- [x] Set up `.env.local` with all environment variables (see CLAUDE.md)
- [x] Create Sanity project at sanity.io and get project ID
- [x] Configure Sanity Studio in `/sanity` directory
- [x] Create product schema in Sanity (see SCHEMA.md)
- [x] Set up Calendly account and connect to Google Calendar
- [x] Upload logo to `/public/logo.png`
- [x] Configure Tailwind with brand colors and Cormorant Garamond font
- [ ] Deploy to Vercel and connect domain anthonylaurencejewelry.com ← **AFTER PHASE 9**

---

## Phase 2 — Sanity CMS & Data
- [x] Implement full product schema (`/sanity/schema/product.ts`)
- [x] Test Sanity Studio locally (`sanity dev`) — config wired to project ID whcj6hia
- [ ] Add 3-5 test products manually in Sanity Studio ← **OWNER ACTION** (run `npm run studio`)
- [x] Write Excel import script (`/scripts/importProducts.ts`)
- [x] Test import script with sample spreadsheet (`scripts/sample-products.xlsx` — 5 test products)
- [x] Write GROQ queries for: all products, products by category, featured products, product by slug
- [x] Set up Sanity CDN for image optimization

---

## Phase 3 — Core Layout
- [x] Build `Navbar.tsx` — desktop with Shop dropdown, mobile hamburger
- [x] Build `Footer.tsx` — all 5 columns, return policy blurb, payment icons, copyright
- [x] Build `Button.tsx` UI component (primary, secondary variants)
- [x] Build `CartDrawer.tsx` — slides in from right, shows cart items
- [x] Set up cart state management (React Context or Zustand)
- [x] Build `CalendlyEmbed.tsx` reusable component

---

## Phase 4 — Homepage
- [ ] Build `Hero.tsx` — full screen image, tagline, CTA
- [ ] Build `FeaturedProducts.tsx` — pulls featured products from Sanity
- [ ] Build `ShopByCategory.tsx` — 4 category tiles
- [ ] Build `ServicesSection.tsx` — Custom, Appraisals, Repairs cards
- [ ] Build `AboutSnippet.tsx` — brand statement + Learn More
- [ ] Build `GoogleReviews.tsx` — Google reviews display
- [ ] Build `ConsultationBanner.tsx` — full width CTA banner
- [ ] Assemble homepage (`/app/page.tsx`)
- [ ] Add scroll fade-in animations (subtle only)

---

## Phase 5 — Shop Pages
- [ ] Build `ProductCard.tsx` component
- [ ] Build `ProductGrid.tsx` component
- [ ] Build `FilterSidebar.tsx` — all filters per SCHEMA.md
- [ ] Build `SearchBar.tsx`
- [ ] Build `/app/shop/page.tsx` — all products
- [ ] Build `/app/shop/rings/page.tsx`
- [ ] Build `/app/shop/necklaces/page.tsx`
- [ ] Build `/app/shop/earrings/page.tsx`
- [ ] Build `/app/shop/bracelets/page.tsx`
- [ ] Test filters and search on all shop pages

---

## Phase 6 — Product Detail Page
- [ ] Build `ImageGallery.tsx` — main image + thumbnail row
- [ ] Build `VariantSelector.tsx` — metal, purity, ring size, length
- [ ] Build `CaratSelector.tsx` — only shown if caratSize ≥ 1
- [ ] Build `PriceCalculator.tsx` — real-time price updates
- [ ] Implement `/lib/priceCalculator.ts` with verified formula (see SCHEMA.md)
- [ ] Build `/app/products/[slug]/page.tsx`
- [ ] Test carat pricing with all verified examples from SCHEMA.md
- [ ] Test variant selectors show/hide correctly per category
- [ ] Test purity selector only shows for Yellow Gold & White Gold

---

## Phase 7 — Service Pages
- [ ] Build `/app/custom/page.tsx` — inquiry form + Calendly embed
- [ ] Build `/app/api/contact/route.ts` — sends inquiry email
- [ ] Build `/app/appraisals/page.tsx` — service info + Calendly embed
- [ ] Build `/app/repairs/page.tsx` — services list + contact info
- [ ] Build `/app/about/page.tsx` — brand story + location

---

## Phase 8 — Checkout
- [ ] Build `/app/cart/page.tsx`
- [ ] Build `/app/api/checkout/route.ts` — Stripe session creation
- [ ] Configure Stripe Tax (NJ 6.625%)
- [ ] Add shipping options: Free Shipping (signature required) + Free Local Pickup
- [ ] Build `/app/checkout/success/page.tsx`
- [ ] Build `/app/checkout/cancel/page.tsx`
- [ ] Test full checkout flow end-to-end with Stripe test mode
- [ ] Switch to Stripe live mode before launch

---

## Phase 9 — Polish & Launch
- [ ] Test all pages on mobile (responsive design)
- [ ] Test hamburger menu on mobile
- [ ] Add SEO meta tags to all pages (title, description, og:image)
- [ ] Add favicon using logo
- [ ] Test all Calendly embeds
- [ ] Test custom inquiry form submission + email delivery
- [ ] Verify return policy is visible in footer
- [ ] Verify "All sales final" notice on custom jewelry page
- [ ] Performance audit (Lighthouse score target: 90+)
- [ ] Final review of all content, prices, contact info
- [ ] Remove Stripe test mode → switch to live keys
- [ ] Deploy final build to Vercel
- [ ] Point domain DNS to Vercel
- [ ] Smoke test on live domain

---

## Known Future Enhancements (Out of Scope for Now)
- Natural diamond products (toggle exists in Sanity, activate when ready)
- New Arrival product tags
- Instagram feed embed
- Blog / editorial content
- Birthstone ring category (available via custom inquiry only for now)
