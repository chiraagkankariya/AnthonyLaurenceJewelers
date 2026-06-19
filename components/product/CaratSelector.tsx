'use client'

import { getCaratOptions } from '@/lib/priceCalculator'

interface CaratSelectorProps {
  baseCaratSize: number
  selectedCarat: number
  onChange: (carat: number) => void
}

export default function CaratSelector({ baseCaratSize, selectedCarat, onChange }: CaratSelectorProps) {
  const options = getCaratOptions(baseCaratSize).filter((ct) => ct !== baseCaratSize)
  const isChanged = selectedCarat !== baseCaratSize

  const btnClass = (active: boolean) =>
    `font-serif text-xs px-3 py-2 border transition-colors ${
      active
        ? 'border-brand-charcoal bg-brand-charcoal text-white'
        : 'border-gray-300 text-brand-charcoal hover:border-brand-charcoal'
    }`

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="font-serif text-xs tracking-widest uppercase text-gray-500">
          Carat Size — <span className="text-brand-charcoal">{selectedCarat}ct</span>
        </p>
        {isChanged && (
          <button
            onClick={() => onChange(baseCaratSize)}
            className="font-serif text-xs text-gray-400 hover:text-brand-charcoal underline underline-offset-2 transition-colors"
          >
            Reset to Default
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Default option — always first, always reflects product.caratSize */}
        <button
          onClick={() => onChange(baseCaratSize)}
          className={btnClass(selectedCarat === baseCaratSize)}
        >
          Default ({baseCaratSize}ct) — Base Price
        </button>

        {/* 0.5ct increment steps — base carat excluded to prevent duplication */}
        {options.map((ct) => (
          <button
            key={ct}
            onClick={() => onChange(ct)}
            className={btnClass(ct === selectedCarat)}
          >
            {ct}ct
          </button>
        ))}
      </div>
    </div>
  )
}
