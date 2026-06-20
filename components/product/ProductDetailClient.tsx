'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { SanityProduct } from '@/types'
import { useCart } from '@/context/CartContext'
import { calculatePrice, calculateBraceletPrice } from '@/lib/priceCalculator'
import { getImageUrl } from '@/lib/sanity'
import ImageGallery from './ImageGallery'
import VariantSelector from './VariantSelector'
import CaratSelector from './CaratSelector'
import PriceCalculator from './PriceCalculator'
import Button from '@/components/ui/Button'
import { CATEGORY_LABELS } from '@/lib/constants'

export default function ProductDetailClient({ product }: { product: SanityProduct }) {
  const { addItem, openCart } = useCart()

  const initialMetal = product.metalTypes?.[0] ?? ''
  const isGoldFirst = ['Yellow Gold', 'White Gold'].includes(initialMetal)
  const [selectedMetal, setSelectedMetal] = useState(initialMetal)
  const [selectedPurity, setSelectedPurity] = useState(
    isGoldFirst ? (product.purities?.[0] ?? '') : ''
  )
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedCarat, setSelectedCarat] = useState(product.caratSize ?? 1)
  const [addedToCart, setAddedToCart] = useState(false)

  const showCaratSelector = (product.caratSize ?? 0) >= 1
  const needsSize = !!(
    (product.ringSizes && product.category === 'rings') ||
    (product.necklaceLengths && product.category === 'necklaces') ||
    (product.braceletLengths && product.category === 'bracelets')
  )

  const caratAdjustment = showCaratSelector
    ? calculatePrice(product.price, product.caratSize!, selectedCarat) - product.price
    : 0
  const braceletAdjustment =
    product.category === 'bracelets'
      ? calculateBraceletPrice(product.price, parseFloat((selectedSize || '7"').replace('"', ''))) - product.price
      : 0
  const currentPrice = (product.salePrice ?? product.price) + caratAdjustment + braceletAdjustment

  const handleMetalChange = (metal: string) => {
    setSelectedMetal(metal)
    if (['Yellow Gold', 'White Gold'].includes(metal)) {
      setSelectedPurity(product.purities?.[0] ?? '')
    } else {
      setSelectedPurity('')
    }
  }

  const handleAddToCart = () => {
    if (needsSize && !selectedSize) return

    const imageUrl = getImageUrl(product.images?.[0], 200, 200) ?? undefined

    const slugString = typeof product.slug === 'string' ? product.slug : product.slug.current

    const cartId = [
      product._id,
      selectedMetal,
      selectedPurity,
      selectedSize,
      showCaratSelector ? `${selectedCarat}ct` : null,
    ]
      .filter(Boolean)
      .join('-')

    addItem({
      id: cartId,
      productId: product._id,
      slug: slugString,
      name: product.name,
      price: currentPrice,
      image: imageUrl,
      quantity: 1,
      category: product.category,
      selectedMetal,
      selectedPurity: selectedPurity || undefined,
      selectedSize: selectedSize || undefined,
      selectedCarat: showCaratSelector ? selectedCarat : undefined,
    })

    setAddedToCart(true)
    openCart()
    setTimeout(() => setAddedToCart(false), 2500)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="mb-8 font-serif text-xs tracking-widest uppercase text-gray-400 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-brand-charcoal transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-brand-charcoal transition-colors">Shop</Link>
        <span>/</span>
        <Link href={`/shop/${product.category}`} className="hover:text-brand-charcoal transition-colors">
          {CATEGORY_LABELS[product.category] ?? product.category}
        </Link>
        <span>/</span>
        <span className="text-brand-charcoal truncate max-w-[180px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left: Images */}
        <ImageGallery images={product.images ?? []} name={product.name} />

        {/* Right: Details */}
        <div className="flex flex-col gap-6">
          <p className="font-serif text-xs tracking-widest uppercase text-gray-400">
            {CATEGORY_LABELS[product.category] ?? product.category}
          </p>

          <h1 className="font-serif text-3xl lg:text-4xl font-light text-brand-charcoal leading-tight">
            {product.name}
          </h1>

          {/* Stone / lab badges */}
          <div className="flex flex-wrap gap-2">
            {product.labGrown && (
              <span className="font-serif text-xs tracking-widest uppercase px-2.5 py-1 border border-gray-300 text-gray-500">
                Lab Grown Diamond
              </span>
            )}
            {product.stoneType && (
              <span className="font-serif text-xs tracking-widest uppercase px-2.5 py-1 border border-gray-300 text-gray-500">
                {product.stoneType}
              </span>
            )}
            {product.stoneShape && (
              <span className="font-serif text-xs tracking-widest uppercase px-2.5 py-1 border border-gray-300 text-gray-500">
                {product.stoneShape} Cut
              </span>
            )}
          </div>

          {/* Price */}
          <PriceCalculator
            basePrice={product.price}
            salePrice={product.salePrice}
            baseCaratSize={product.caratSize}
            selectedCarat={showCaratSelector ? selectedCarat : undefined}
            category={product.category}
            selectedSize={selectedSize}
          />

          {product.description && (
            <p className="font-serif text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
          )}

          <hr className="border-gray-100" />

          <VariantSelector
            category={product.category}
            metalTypes={product.metalTypes ?? []}
            isTwoTone={product.isTwoTone}
            purities={product.purities}
            ringSizes={product.ringSizes}
            necklaceLengths={product.necklaceLengths}
            braceletLengths={product.braceletLengths}
            selectedMetal={selectedMetal}
            selectedPurity={selectedPurity}
            selectedSize={selectedSize}
            onMetalChange={handleMetalChange}
            onPurityChange={setSelectedPurity}
            onSizeChange={setSelectedSize}
          />

          {showCaratSelector && (
            <CaratSelector
              baseCaratSize={product.caratSize!}
              selectedCarat={selectedCarat}
              onChange={setSelectedCarat}
            />
          )}

          {/* Add to Cart */}
          <div className="flex flex-col gap-2 pt-2">
            {needsSize && !selectedSize && (
              <p className="font-serif text-xs text-brand-red">
                Please select a {product.category === 'rings' ? 'ring size' : 'length'} to continue.
              </p>
            )}
            <Button
              variant={addedToCart ? 'secondary' : 'primary'}
              size="lg"
              fullWidth
              onClick={handleAddToCart}
              disabled={!product.inStock || (needsSize && !selectedSize)}
            >
              {!product.inStock ? 'Out of Stock' : addedToCart ? 'Added to Cart' : 'Add to Cart'}
            </Button>
          </div>

          {/* Custom adjustment callout */}
          <div className="border border-gray-100 bg-[#FAFAFA] px-5 py-4 flex gap-3 items-start">
            <svg className="w-5 h-5 flex-shrink-0 text-brand-gold mt-0.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            <div className="flex flex-col gap-2">
              <p className="font-serif text-sm text-gray-600 leading-relaxed">
                Want it your way? We can adjust the metal, carat size, stones, or any other detail to your exact preference.
              </p>
              <a
                href={`/custom?product=${encodeURIComponent(product.name)}`}
                className="font-serif text-xs tracking-widest uppercase text-brand-charcoal underline underline-offset-2 hover:text-brand-gold transition-colors self-start"
              >
                Request a Custom Adjustment
              </a>
            </div>
          </div>

          {/* Info strip */}
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
            {[
              'Free shipping — signature required',
              'Free local pickup at our Millburn, NJ store',
              '30-day returns — store credit or exchange',
            ].map((line) => (
              <div key={line} className="flex items-center gap-2 font-serif text-xs text-gray-500">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
