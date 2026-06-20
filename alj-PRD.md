# PRD.md — Product Requirements Document
## Anthony Laurence Jewelers Website

---

## 1. Project Summary
A full-service e-commerce website for Anthony Laurence Jewelers, a local fine jewelry store in Millburn, NJ. The site should feel like a luxury boutique — light, elegant, and trustworthy — while offering the full capabilities of a large jewelry retailer: online purchasing, custom jewelry inquiries, appraisals booking, and repair services information.

**Core positioning:** Local jeweler with big-player expertise, real customer relationships, and better pricing.

---

## 2. Goals
- Sell jewelry online with full variant selection and Stripe checkout
- Allow customers to inquire about and book custom jewelry consultations
- Allow customers to book appraisal and general consultation appointments
- Showcase repair services and drive in-store visits
- Build trust through Google reviews and brand storytelling
- Be fully manageable by a non-technical owner via Sanity CMS

---

## 3. Pages & Features

### 3.1 Homepage
**Sections (in order):**

1. **Hero**
   - Full-screen single dramatic photo
   - Overlay: Logo + tagline "Made to Be Remembered."
   - CTA button: "Shop Now" → `/shop`
   - Subtle fade-in animation on load

2. **Featured Products Row**
   - Pulls products with `featured: true` from Sanity
   - Horizontal scrollable row of product cards
   - Each card: photo, name, base price, "View" button

3. **Shop by Category**
   - 5 category tiles: Rings, Necklaces & Pendants, Chains, Earrings, Bracelets
   - Each tile links to its respective shop subcategory page
   - Elegant hover effect (subtle zoom on image)

4. **Our Services**
   - 3 service cards: Custom Jewelry, Appraisals, Repairs
   - Each card: icon, title, 1-2 sentence description, CTA button

5. **About Us Snippet**
   - Brief 2-3 sentence brand statement
   - "Learn More" button → `/about`

6. **Google Reviews**
   - Display top Google reviews
   - Star ratings, reviewer name, review snippet

7. **Book a Consultation CTA Banner**
   - Full-width banner, deep red background, gold text
   - "Have questions? Let's talk." + "Book a Consultation" button → Calendly

---

### 3.2 Shop Pages

**`/shop`** — All products with filters
**`/shop/rings`** — Rings only
**`/shop/necklaces`** — Necklaces & Pendants only (pendants, lockets, tennis necklaces)
**`/shop/chains`** — Chains only (Cuban link, rope, box, figaro, men's chains)
**`/shop/earrings`** — Earrings only
**`/shop/bracelets`** — Bracelets only

**Features on all shop pages:**
- Search bar at top
- Filter sidebar:
  - Category (on `/shop` only)
  - Subcategory
  - Metal type (Yellow Gold, White Gold, Rose Gold, Silver, Platinum)
  - Purity (10k, 14k, 18k, 22k, 24k)
  - Price range slider
  - Stone type
  - In stock only toggle
- Product grid (3 columns desktop, 2 tablet, 1 mobile)
- Sort by: Price low-high, Price high-low, Newest

**Product Card:**
- Product photo
- Product name
- Base price
- Metal type badge
- "View Product" button

---

### 3.3 Product Detail Page `/products/[slug]`

**Sections:**
1. **Image Gallery** — main image + thumbnail row, click to swap
2. **Product Info:**
   - Name
   - Base price (updates dynamically with variant selections)
   - Stone type & shape
   - Description
3. **Variant Selectors** (only show relevant ones per category):
   - Metal type selector
   - Purity selector (Yellow Gold & White Gold only)
   - Ring size selector (rings only) — 3 to 13 in 0.25 increments
   - Necklace length selector (necklaces only) — 14"–24"
   - Bracelet length selector (bracelets only) — 6.5"–8.5"
   - Carat selector (only if base carat ≥ 1ct) — base ± 5ct, floor 1ct, 0.5ct increments
4. **Price Display** — updates in real time as variants change
5. **Add to Cart** button
6. **"Have questions? Book a Consultation"** button → Calendly
7. **Lab Grown badge** (shown when applicable)
8. **Stock status** indicator

**Carat Pricing Logic:**
- See CLAUDE.md and SCHEMA.md for full formula
- Price always calculated from base price, never compounding

---

### 3.4 Custom Jewelry Page `/custom`

**Layout:**
- Hero section: headline "Design Your Dream Piece", brief description
- Inquiry form:
  - Full name (required)
  - Email (required)
  - Phone number (optional)
  - Piece type dropdown (Ring, Necklace, Bracelet, Earrings, Other)
  - Description textarea — "Describe your piece in as much detail as possible" (required)
  - Budget range dropdown ($500–$1k, $1k–$2.5k, $2.5k–$5k, $5k–$10k, $10k+)
  - Reference image upload (optional, accepts JPG/PNG/WebP)
  - Reference website URL (optional)
  - Submit button → sends email to anthonylaurencejewlers@gmail.com
- After form submission: show Calendly embed to book a follow-up call
- Note: **All custom pieces are final sale — no returns or exchanges**

---

### 3.5 Appraisals Page `/appraisals`

**Layout:**
- Hero: "Professional Jewelry Appraisals"
- Description: what an appraisal is, why customers need one, what's included
- Paid service — pricing can be added/edited in Sanity
- Calendly embed to book an in-store appraisal appointment
- Note: customers can walk in during business hours or book ahead

---

### 3.6 Repairs Page `/repairs`

**Layout:**
- Hero: "Expert Jewelry Repairs"
- Intro paragraph: repairs for individuals AND other jewelry stores
- Services list (all offered):
  - Ring resizing
  - Prong re-tipping / stone tightening
  - Chain soldering / clasp replacement
  - Rhodium plating
  - Engraving
  - Watch battery replacement / servicing
  - Jewelry cleaning & polishing
  - Re-stringing (pearls/beads)
  - Stone replacement
- CTA section: "Questions about a repair? Call us or stop in."
  - Phone number: (973) 379-3344
  - Store hours displayed
- **No booking form** — informational only

---

### 3.7 About Us Page `/about`

**Content:**
- Brand story focused (no individual faces or founding story)
- Key messages to convey:
  - Trusted local expert with professional-grade capabilities
  - Fair, transparent pricing unlike big chain jewelers
  - Full-service shop: retail, custom, appraisals, repairs all under one roof
  - Also serve other jewelry stores for repairs (B2B angle)
- Location info + hours
- CTA: "Visit Us" with address + "Book a Consultation" button

---

### 3.8 Cart & Checkout

**Cart Drawer:**
- Slides in from right
- Shows all items with photo, name, selected variants, quantity, price
- Remove item button
- Order subtotal
- Note about free shipping
- "Proceed to Checkout" button → Stripe hosted checkout

**Stripe Checkout:**
- Line items from cart
- Stripe Tax enabled (NJ 6.625%)
- Shipping options: Free Shipping (signature required) or Free Local Pickup
- Redirect to `/checkout/success` on completion
- Redirect to `/checkout/cancel` on cancellation

---

## 4. Navigation

**Desktop Nav:**
- Logo (left)
- Links (center): Shop (dropdown) | Custom Jewelry | Appraisals | Repairs | About Us
- Right: Search icon | Cart icon (with item count) | **Book a Consultation** button

**Shop Dropdown:**
- All Jewelry
- Rings
- Necklaces & Pendants
- Chains
- Earrings
- Bracelets

**Mobile Nav:**
- Hamburger menu
- Full screen overlay with same links
- Cart icon always visible

---

## 5. Footer

**Columns:**
1. **Brand** — Logo, tagline, Instagram link
2. **Shop** — Links to all category pages (Rings, Necklaces & Pendants, Chains, Earrings, Bracelets)
3. **Services** — Custom Jewelry, Appraisals, Repairs
4. **Visit Us** — Address, hours, phone, email
5. **Returns Policy blurb:**
   > "All sales on custom pieces are final. Standard purchases are eligible for store credit or exchange of equal or lesser value within 30 days. No refunds."

**Bottom bar:**
- Payment icons: Visa, Mastercard, Amex, Discover, Stripe
- © 2026 Anthony Laurence Jewelers. All rights reserved.

---

## 6. Policies

### Returns & Exchanges
- Standard products: store credit or exchange of equal/lesser value within 30 days
- Custom pieces: all sales final
- No refunds under any circumstances

### Shipping
- Free shipping on all orders
- Free local pickup
- Signature required on all shipped orders
- Stripe Tax handles NJ sales tax (6.625%)

---

## 7. Non-Technical Owner Requirements
- All products managed via Sanity Studio dashboard
- No code changes needed to: add products, update prices, toggle featured items, mark out of stock, add sale prices
- Product photos uploaded directly in Sanity
- Bulk import available via Excel spreadsheet + import script

---

## 8. Out of Scope (for now)
- Natural diamond products (toggle exists, not active)
- New Arrival tags
- Instagram feed embed
- Blog / editorial content
- Loyalty or rewards program
- Birthstone ring category (available via custom inquiry only)
