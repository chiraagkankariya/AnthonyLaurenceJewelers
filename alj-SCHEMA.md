# SCHEMA.md — Sanity CMS Schema
## Anthony Laurence Jewelers

---

## Overview
All content is managed through Sanity Studio. The owner can add, edit, and remove products without touching code. Below are all content types and their fields.

---

## Content Type: `product`

### Basic Info
| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | ✅ | Product display name |
| `slug` | slug | ✅ | Auto-generated from name. Used in URL: `/products/[slug]` |
| `category` | string (enum) | ✅ | `rings`, `necklaces`, `chains`, `earrings`, `bracelets` |
| `subcategory` | string (enum) | ✅ | See subcategory options below |
| `description` | text | ✅ | Full product description |
| `price` | number | ✅ | Base price in USD |
| `salePrice` | number | ❌ | Optional discounted price. If set, shows strikethrough on original |
| `inStock` | boolean | ✅ | Default: true. Toggle to hide "Add to Cart" and show "Out of Stock" |
| `featured` | boolean | ✅ | Default: false. Featured products appear on homepage |
| `labGrown` | boolean | ✅ | Default: true. Toggle for lab grown vs natural diamond (natural not active yet) |

### Media
| Field | Type | Required | Notes |
|---|---|---|---|
| `images` | array of images | ✅ | First image is the primary/hero image. Supports multiple. |

### Stone Details
| Field | Type | Required | Notes |
|---|---|---|---|
| `stoneType` | string (enum) | ❌ | Diamond, Ruby, Sapphire, Emerald, Moissanite, Pearl, Opal, Amethyst, Topaz, Other |
| `stoneShape` | string (enum) | ❌ | Round, Princess, Oval, Cushion, Pear, Marquise, Emerald Cut, Radiant, Asscher, Heart |
| `caratSize` | number | ❌ | Base carat weight. If ≥ 1, carat selector is shown on product page |

### Metal & Variants
| Field | Type | Required | Notes |
|---|---|---|---|
| `metalTypes` | array of strings | ✅ | Available metals for this product. Options: Yellow Gold, White Gold, Rose Gold, Silver, Platinum |
| `purities` | array of strings | ❌ | Only for Yellow Gold & White Gold. Options: 10k, 14k, 18k, 22k, 24k |
| `ringSizes` | boolean | ❌ | If true, ring size selector shown (3–13 in 0.25 increments). Only for rings. |
| `necklaceLengths` | boolean | ❌ | If true, length selector shown (14"–24"). For necklaces and chains categories. |
| `braceletLengths` | boolean | ❌ | If true, length selector shown (6.5"–8.5"). Only for bracelets. |

---

## Subcategory Options by Category

### Rings (`category: rings`)
- `engagement` — Engagement Rings
- `wedding` — Wedding Bands
- `eternity` — Eternity Bands
- `fashion` — Fashion Rings (includes cocktail, promise, statement)
- `mens` — Men's Rings

### Necklaces & Pendants (`category: necklaces`)
- `pendant` — Pendant Necklaces
- `locket` — Lockets
- `tennis` — Tennis Necklaces

### Chains (`category: chains`)
- `cuban` — Cuban Link
- `rope` — Rope Chain
- `box` — Box Chain
- `figaro` — Figaro Chain
- `chain` — Plain Chains
- `mens-chain` — Men's Chains

### Earrings (`category: earrings`)
- `studs` — Studs
- `hoops` — Hoops
- `drop-dangle` — Drop/Dangle
- `fashion` — Fashion Earrings (huggie, chandelier, climber)

### Bracelets (`category: bracelets`)
- `tennis` — Tennis Bracelets
- `mens` — Men's Bracelets

---

## Variant Option Reference

### Metal Types
- Yellow Gold
- White Gold
- Rose Gold
- Silver
- Platinum

### Purity Options (Yellow Gold & White Gold ONLY)
- 10k
- 14k
- 18k
- 22k
- 24k

### Ring Sizes
- Range: 3.00 to 13.00
- Increments: 0.25
- Full list: 3, 3.25, 3.5, 3.75, 4, 4.25, 4.5, 4.75, 5, 5.25, 5.5, 5.75, 6, 6.25, 6.5, 6.75, 7, 7.25, 7.5, 7.75, 8, 8.25, 8.5, 8.75, 9, 9.25, 9.5, 9.75, 10, 10.25, 10.5, 10.75, 11, 11.25, 11.5, 11.75, 12, 12.25, 12.5, 12.75, 13

### Necklace Lengths
- 14", 16", 18", 20", 22", 24"

### Bracelet Lengths
- 6.5", 7", 7.5", 8", 8.5"

---

## Carat Selector Logic
Only shown on product page if `caratSize >= 1`.

| Parameter | Value |
|---|---|
| Minimum | `Math.max(1, caratSize - 5)` |
| Maximum | `caratSize + 5` |
| Increment | 0.5ct |

**Examples:**
- 2ct base → selector range: 1ct to 7ct
- 5ct base → selector range: 1ct to 10ct
- 10ct base → selector range: 5ct to 15ct

---

## Carat Pricing Formula
Implemented in `/lib/priceCalculator.ts`

**Inputs:** `basePrice`, `baseCaratSize`, `selectedCaratSize`

**Formula:**
```
caratDifference = selectedCaratSize - baseCaratSize
numberOfIncrements = Math.abs(caratDifference) / 0.5  (each increment = 0.5ct)

diamondAdjustment = caratDifference * $500

goldAdjustment:
  - For the first 1ct (2 increments of 0.5ct):
      first 0.5ct increment = 5% of basePrice
      second 0.5ct increment (completing 1ct) = 5% of basePrice
      (together = 10% of basePrice for first full carat)
  - Each subsequent 0.5ct increment = 3.75% of basePrice
      (7.5% per full carat, split across 2 increments)

Direction: same rates apply going up OR down (always subtract when going below base)

finalPrice = basePrice + diamondAdjustment + goldAdjustment
```

**Verified Examples (2ct base at $3,000):**

Increasing:
- 2ct → 3ct: $3,000 + $500 + $300 = **$3,800**
- 2ct → 4ct: $3,000 + $1,000 + $300 + $225 = **$4,525**
- 2ct → 5ct: $3,000 + $1,500 + $300 + $225 + $225 = **$5,250**

Decreasing back:
- 5ct → 2ct: $5,250 - $1,500 - $750 = **$3,000** ✅ (returns to base)

**Rule:** All gold adjustments calculated from `basePrice` — never from running total. This ensures symmetry going up and down.

---

## Sanity Studio Implementation Notes
```typescript
// product.ts schema skeleton
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Product Name' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'name' } },
    { name: 'category', type: 'string', title: 'Category',
      options: { list: ['rings','necklaces','earrings','bracelets'] } },
    { name: 'subcategory', type: 'string', title: 'Subcategory' },
    { name: 'description', type: 'text', title: 'Description' },
    { name: 'price', type: 'number', title: 'Base Price (USD)' },
    { name: 'salePrice', type: 'number', title: 'Sale Price (USD)' },
    { name: 'inStock', type: 'boolean', title: 'In Stock', initialValue: true },
    { name: 'featured', type: 'boolean', title: 'Featured Product', initialValue: false },
    { name: 'labGrown', type: 'boolean', title: 'Lab Grown Diamond', initialValue: true },
    { name: 'images', type: 'array', title: 'Product Images',
      of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'stoneType', type: 'string', title: 'Stone Type' },
    { name: 'stoneShape', type: 'string', title: 'Stone Shape' },
    { name: 'caratSize', type: 'number', title: 'Base Carat Size' },
    { name: 'metalTypes', type: 'array', title: 'Available Metal Types',
      of: [{ type: 'string' }],
      options: { list: ['Yellow Gold','White Gold','Rose Gold','Silver','Platinum'] } },
    { name: 'purities', type: 'array', title: 'Available Purities (Gold only)',
      of: [{ type: 'string' }],
      options: { list: ['10k','14k','18k','22k','24k'] } },
    { name: 'ringSizes', type: 'boolean', title: 'Show Ring Size Selector' },
    { name: 'necklaceLengths', type: 'boolean', title: 'Show Necklace Length Selector' },
    { name: 'braceletLengths', type: 'boolean', title: 'Show Bracelet Length Selector' },
  ]
}
```

---

## Excel Import Format
For bulk product uploads, the spreadsheet should have these columns:

| Column | Notes |
|---|---|
| name | Product name |
| category | rings / necklaces / chains / earrings / bracelets |
| subcategory | See subcategory options above |
| price | Number only, no $ sign |
| salePrice | Optional |
| description | Full description text |
| stoneType | Optional |
| stoneShape | Optional |
| caratSize | Optional, number |
| metalTypes | Comma separated: "Yellow Gold, White Gold" |
| purities | Comma separated: "14k, 18k" |
| inStock | TRUE / FALSE |
| featured | TRUE / FALSE |
| labGrown | TRUE / FALSE |
| ringSizes | TRUE / FALSE |
| necklaceLengths | TRUE / FALSE |
| braceletLengths | TRUE / FALSE |
