import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl } from '@/lib/sanity'
import type { ProductListing } from '@/types'

export default function ProductCard({ product }: { product: ProductListing }) {
  const imageUrl = getImageUrl(product.images?.[0], 600, 600)

  return (
    <div className="group flex flex-col">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square bg-[#F0F0F0] overflow-hidden mb-4">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Badges */}
        {product.salePrice && (
          <span className="absolute top-3 left-3 bg-brand-red text-white font-serif text-xs tracking-widest uppercase px-2 py-1">
            Sale
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="font-serif text-xs tracking-widest uppercase text-gray-500">Out of Stock</span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 gap-1.5">
        {product.metalTypes?.[0] && (
          <p className="font-serif text-xs tracking-widest uppercase text-gray-400">
            {product.metalTypes[0]}
          </p>
        )}

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-serif text-base font-semibold text-brand-charcoal leading-snug hover:text-brand-red transition-colors">
            {product.name}
          </h3>
        </Link>

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
          href={`/products/${product.slug}`}
          className="mt-2 inline-block font-serif text-xs tracking-widest uppercase border border-brand-charcoal text-brand-charcoal px-4 py-2 text-center hover:border-brand-red hover:text-brand-red transition-colors"
        >
          View Product
        </Link>
      </div>
    </div>
  )
}
