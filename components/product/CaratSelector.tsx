'use client'

import { getCaratOptions } from '@/lib/priceCalculator'

interface CaratSelectorProps {
  baseCaratSize: number
  selectedCarat: number
  onChange: (carat: number) => void
}

export default function CaratSelector({ baseCaratSize, selectedCarat, onChange }: CaratSelectorProps) {
  const options = getCaratOptions(baseCaratSize)

  return (
    <div>
      <p className="font-serif text-xs tracking-widest uppercase text-gray-500 mb-3">
        Carat Size — <span className="text-brand-charcoal">{selectedCarat}ct</span>
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((ct) => (
          <button
            key={ct}
            onClick={() => onChange(ct)}
            className={`font-serif text-xs px-3 py-2 border transition-colors ${
              ct === selectedCarat
                ? 'border-brand-charcoal bg-brand-charcoal text-white'
                : 'border-gray-300 text-brand-charcoal hover:border-brand-charcoal'
            }`}
          >
            {ct}ct
          </button>
        ))}
      </div>
    </div>
  )
}
