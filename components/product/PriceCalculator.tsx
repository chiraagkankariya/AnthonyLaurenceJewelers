import { calculatePrice } from '@/lib/priceCalculator'

interface PriceCalculatorProps {
  basePrice: number
  salePrice?: number
  baseCaratSize?: number
  selectedCarat?: number
}

export default function PriceCalculator({
  basePrice,
  salePrice,
  baseCaratSize,
  selectedCarat,
}: PriceCalculatorProps) {
  const showCaratAdjustment =
    baseCaratSize !== undefined && baseCaratSize >= 1 && selectedCarat !== undefined

  let displayPrice: number
  let strikethrough: number | null = null

  if (showCaratAdjustment) {
    displayPrice = calculatePrice(basePrice, baseCaratSize!, selectedCarat!)
  } else if (salePrice) {
    displayPrice = salePrice
    strikethrough = basePrice
  } else {
    displayPrice = basePrice
  }

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
          ${strikethrough.toLocaleString()}
        </span>
      )}
    </div>
  )
}
