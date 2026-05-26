import { Suspense } from 'react'
import { fetchProducts } from '@/lib/sanity'
import FilterSidebar from '@/components/shop/FilterSidebar'
import ProductGrid from '@/components/shop/ProductGrid'
import SearchBar from '@/components/shop/SearchBar'
import SortDropdown from '@/components/shop/SortDropdown'

interface ShopPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

function getString(val: string | string[] | undefined): string | undefined {
  if (!val) return undefined
  return Array.isArray(val) ? val[0] : val
}

export const metadata = {
  title: 'Shop All Jewelry | Anthony Laurence Jewelers',
  description: 'Browse our full collection of fine jewelry — rings, necklaces, earrings, and bracelets crafted in gold, silver, and platinum.',
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const products = await fetchProducts({
    category: getString(searchParams.category),
    subcategory: getString(searchParams.subcategory),
    metal: getString(searchParams.metal),
    purity: getString(searchParams.purity),
    stoneType: getString(searchParams.stoneType),
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    inStock: searchParams.inStock === 'true',
    sort: getString(searchParams.sort),
    q: getString(searchParams.q),
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="font-serif text-xs tracking-widest uppercase text-gray-400 mb-1">
            Anthony Laurence Jewelers
          </p>
          <h1 className="font-serif text-3xl font-light text-brand-charcoal">
            All Jewelry
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top bar: search + sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <Suspense>
            <SearchBar />
          </Suspense>
          <div className="flex items-center gap-4">
            <span className="font-serif text-xs text-gray-400">
              {products.length} {products.length === 1 ? 'item' : 'items'}
            </span>
            <Suspense>
              <SortDropdown />
            </Suspense>
          </div>
        </div>

        {/* Layout: sidebar + grid */}
        <div className="flex gap-10">
          <Suspense>
            <FilterSidebar showCategoryFilter={true} />
          </Suspense>
          <main className="flex-1 min-w-0">
            <ProductGrid products={products} />
          </main>
        </div>
      </div>
    </div>
  )
}
