import Image from 'next/image'
import Link from 'next/link'
import { client, featuredProductsQuery, urlFor } from '@/lib/sanity'
import type { SanityProduct } from '@/types'

async function getFeaturedProducts(): Promise<SanityProduct[]> {
  try {
    return await client.fetch(featuredProductsQuery)
  } catch {
    return []
  }
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  if (!products || products.length === 0) return null

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-serif text-xs tracking-[0.3em] uppercase text-brand-gold mb-3">
            Curated Selection
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-charcoal">
            Featured Pieces
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="w-12 h-px bg-brand-gold/50" />
            <div className="w-1 h-1 rounded-full bg-brand-gold/50" />
            <div className="w-12 h-px bg-brand-gold/50" />
          </div>
        </div>

        {/* Scrollable row */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {products.map((product) => {
            const imageUrl =
              product.images && product.images.length > 0
                ? urlFor(product.images[0]).width(600).height(600).url()
                : null

            return (
              <div
                key={product._id}
                className="flex-none w-64 sm:w-72 snap-start group"
              >
                {/* Image */}
                <div className="relative aspect-square bg-brand-gray overflow-hidden mb-4">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 256px, 288px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {product.salePrice && (
                    <span className="absolute top-3 left-3 bg-brand-red text-white font-serif text-xs tracking-widest uppercase px-2 py-1">
                      Sale
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <p className="font-serif text-xs tracking-widest uppercase text-gray-400">
                    {product.metalTypes?.[0] || ''}
                  </p>
                  <h3 className="font-serif text-base font-semibold text-brand-charcoal leading-snug">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    {product.salePrice ? (
                      <>
                        <span className="font-serif text-brand-red">
                          ${product.salePrice.toLocaleString()}
                        </span>
                        <span className="font-serif text-sm text-gray-400 line-through">
                          ${product.price.toLocaleString()}
                        </span>
                      </>
                    ) : (
                      <span className="font-serif text-brand-charcoal">
                        ${product.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/products/${product.slug.current}`}
                    className="inline-block font-serif text-xs tracking-widest uppercase text-brand-red border-b border-brand-red/0 hover:border-brand-red transition-all pb-0.5"
                  >
                    View →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="font-serif text-sm tracking-widest uppercase border border-brand-charcoal text-brand-charcoal px-10 py-3 hover:border-brand-red hover:text-brand-red transition-colors"
          >
            View All Jewelry
          </Link>
        </div>
      </div>
    </section>
  )
}
