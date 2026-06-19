import { calculatePrice, calculateBraceletPrice } from '@/lib/priceCalculator'

interface PriceCalculatorProps {
  basePrice: number
  salePrice?: number
  baseCaratSize?: number
  selectedCarat?: number
  category?: string
  selectedSize?: string
}

export default function PriceCalculator({
  basePrice,
  salePrice,
  baseCaratSize,
  selectedCarat,
  category,
  selectedSize,
}: PriceCalculatorProps) {
  // Carat adjustment (diamond + gold weight delta from base)
  const showCaratAdjustment =
    baseCaratSize !== undefined && baseCaratSize >= 1 && selectedCarat !== undefined
  const caratAdjustment = showCaratAdjustment
    ? calculatePrice(basePrice, baseCaratSize!, selectedCarat!) - basePrice
    : 0

  // Bracelet length adjustment — 7" is always the base, price scales linearly
  const braceletLength =
    category === 'bracelets'
      ? parseFloat((selectedSize || '7"').replace('"', ''))
      : NaN
  const braceletAdjustment = !isNaN(braceletLength)
    ? calculateBraceletPrice(basePrice, braceletLength) - basePrice
    : 0

  // Both adjustments stack independently
  const totalAdjustment = caratAdjustment + braceletAdjustment
  const effectiveBase = basePrice + totalAdjustment
  const effectiveSale = salePrice != null && salePrice > 0 ? salePrice + totalAdjustment : undefined

  const displayPrice = effectiveSale ?? effectiveBase
  const strikethrough = effectiveSale !== undefined ? effectiveBase : null

  return (
    <div className="flex items-baseline gap-3">
      <span
        className={`font-serif text-3xl font-light ${
          strikethrough ? 'text-brand-red' : 'text-brand-charcoal'
        }`}
      >
        ${Math.round(displayPrice).toLocaleString()}
      </span>
      {strikethrough && (
        <span className="font-serif text-xl text-gray-400 line-through">
          ${Math.round(strikethrough).toLocaleString()}
        </span>
      )}
    </div>
  )
}
