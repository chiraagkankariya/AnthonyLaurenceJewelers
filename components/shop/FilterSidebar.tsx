'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import {
  METAL_TYPES,
  PURITY_OPTIONS,
  STONE_TYPES,
  SUBCATEGORY_OPTIONS,
  CATEGORY_LABELS,
} from '@/lib/constants'

interface FilterSidebarProps {
  showCategoryFilter?: boolean
}

const CATEGORIES = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({ value, label }))

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="font-serif text-xs tracking-widest uppercase text-brand-charcoal">
          {title}
        </span>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  )
}

export default function FilterSidebar({ showCategoryFilter = false }: FilterSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)

  const current = {
    category: searchParams.get('category') ?? '',
    subcategory: searchParams.get('subcategory') ?? '',
    metal: searchParams.get('metal') ?? '',
    purity: searchParams.get('purity') ?? '',
    stoneType: searchParams.get('stoneType') ?? '',
    minPrice: searchParams.get('minPrice') ?? '',
    maxPrice: searchParams.get('maxPrice') ?? '',
    inStock: searchParams.get('inStock') === 'true',
  }

  // Active category: either from URL (on /shop) or derived from pathname
  const activeCategory = current.category ||
    (['rings', 'necklaces', 'earrings', 'bracelets'].find((c) => pathname.includes(c)) ?? '')

  const subcategoryOptions = activeCategory ? (SUBCATEGORY_OPTIONS[activeCategory] ?? []) : []

  const activeFilterCount = [
    current.category,
    current.subcategory,
    current.metal,
    current.purity,
    current.stoneType,
    current.minPrice,
    current.maxPrice,
    current.inStock ? 'inStock' : '',
  ].filter(Boolean).length

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    // Reset subcategory when category changes
    if (key === 'category') params.delete('subcategory')
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function clearAll() {
    router.replace(pathname, { scroll: false })
  }

  const sidebarContent = (
    <div className="space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <span className="font-serif text-xs tracking-widest uppercase text-brand-charcoal">
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </span>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAll}
            className="font-serif text-xs text-brand-red hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category — only on /shop */}
      {showCategoryFilter && (
        <FilterSection title="Category">
          <div className="space-y-2">
            {CATEGORIES.map((cat) => (
              <label key={cat.value} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  checked={current.category === cat.value}
                  onChange={() => setParam('category', cat.value)}
                  className="accent-brand-red"
                />
                <span className="font-serif text-sm text-gray-600 group-hover:text-brand-red transition-colors">
                  {cat.label}
                </span>
              </label>
            ))}
            {current.category && (
              <button
                onClick={() => setParam('category', null)}
                className="font-serif text-xs text-gray-400 hover:text-brand-red transition-colors mt-1"
              >
                ✕ Clear category
              </button>
            )}
          </div>
        </FilterSection>
      )}

      {/* Subcategory */}
      {subcategoryOptions.length > 0 && (
        <FilterSection title="Subcategory">
          <div className="space-y-2">
            {subcategoryOptions.map((sub) => (
              <label key={sub.value} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="radio"
                  name="subcategory"
                  checked={current.subcategory === sub.value}
                  onChange={() =>
                    setParam('subcategory', current.subcategory === sub.value ? null : sub.value)
                  }
                  className="accent-brand-red"
                />
                <span className="font-serif text-sm text-gray-600 group-hover:text-brand-red transition-colors">
                  {sub.label}
                </span>
              </label>
            ))}
            {current.subcategory && (
              <button
                onClick={() => setParam('subcategory', null)}
                className="font-serif text-xs text-gray-400 hover:text-brand-red transition-colors mt-1"
              >
                ✕ Clear
              </button>
            )}
          </div>
        </FilterSection>
      )}

      {/* Metal Type */}
      <FilterSection title="Metal Type">
        <div className="space-y-2">
          {METAL_TYPES.map((metal) => (
            <label key={metal} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="metal"
                checked={current.metal === metal}
                onChange={() => setParam('metal', current.metal === metal ? null : metal)}
                className="accent-brand-red"
              />
              <span className="font-serif text-sm text-gray-600 group-hover:text-brand-red transition-colors">
                {metal}
              </span>
            </label>
          ))}
          {current.metal && (
            <button
              onClick={() => setParam('metal', null)}
              className="font-serif text-xs text-gray-400 hover:text-brand-red transition-colors mt-1"
            >
              ✕ Clear
            </button>
          )}
        </div>
      </FilterSection>

      {/* Purity */}
      <FilterSection title="Purity" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {PURITY_OPTIONS.map((p) => (
            <button
              key={p}
              onClick={() => setParam('purity', current.purity === p ? null : p)}
              className={`font-serif text-xs px-3 py-1.5 border transition-colors ${
                current.purity === p
                  ? 'bg-brand-red text-white border-brand-red'
                  : 'border-gray-200 text-gray-600 hover:border-brand-red hover:text-brand-red'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Stone Type */}
      <FilterSection title="Stone Type" defaultOpen={false}>
        <div className="space-y-2">
          {STONE_TYPES.map((stone) => (
            <label key={stone} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="stoneType"
                checked={current.stoneType === stone}
                onChange={() => setParam('stoneType', current.stoneType === stone ? null : stone)}
                className="accent-brand-red"
              />
              <span className="font-serif text-sm text-gray-600 group-hover:text-brand-red transition-colors">
                {stone}
              </span>
            </label>
          ))}
          {current.stoneType && (
            <button
              onClick={() => setParam('stoneType', null)}
              className="font-serif text-xs text-gray-400 hover:text-brand-red transition-colors mt-1"
            >
              ✕ Clear
            </button>
          )}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" defaultOpen={false}>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-serif text-xs text-gray-400">$</span>
              <input
                type="number"
                min={0}
                placeholder="Min"
                value={current.minPrice}
                onChange={(e) => setParam('minPrice', e.target.value || null)}
                className="w-full pl-6 pr-2 py-2 border border-gray-200 font-serif text-sm text-brand-charcoal focus:outline-none focus:border-brand-red transition-colors"
              />
            </div>
            <span className="font-serif text-xs text-gray-400">to</span>
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 font-serif text-xs text-gray-400">$</span>
              <input
                type="number"
                min={0}
                placeholder="Max"
                value={current.maxPrice}
                onChange={(e) => setParam('maxPrice', e.target.value || null)}
                className="w-full pl-6 pr-2 py-2 border border-gray-200 font-serif text-sm text-brand-charcoal focus:outline-none focus:border-brand-red transition-colors"
              />
            </div>
          </div>
        </div>
      </FilterSection>

      {/* In Stock */}
      <div className="py-4">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={current.inStock}
            onChange={(e) => setParam('inStock', e.target.checked ? 'true' : null)}
            className="accent-brand-red w-4 h-4"
          />
          <span className="font-serif text-sm text-gray-600 group-hover:text-brand-red transition-colors">
            In stock only
          </span>
        </label>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 font-serif text-xs tracking-widest uppercase border border-gray-200 text-brand-charcoal px-4 py-2.5 hover:border-brand-red hover:text-brand-red transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 left-0 h-full w-80 max-w-full bg-white overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-serif text-lg font-light text-brand-charcoal">Filters</span>
              <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-brand-red transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {sidebarContent}
            <button
              onClick={() => setMobileOpen(false)}
              className="w-full mt-6 font-serif text-xs tracking-widest uppercase bg-brand-red text-white py-3 hover:bg-[#6B0000] transition-colors"
            >
              View Results
            </button>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-56 flex-shrink-0">
        {sidebarContent}
      </aside>
    </>
  )
}
