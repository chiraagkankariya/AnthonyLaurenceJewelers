'use client'

const RING_SIZES: string[] = (() => {
  const sizes: string[] = []
  for (let s = 3; s <= 13; s += 0.25) {
    sizes.push((Math.round(s * 100) / 100).toString())
  }
  return sizes
})()

const NECKLACE_LENGTHS = ['14"', '16"', '18"', '20"', '22"', '24"']
const BRACELET_LENGTHS = ['6.5"', '7"', '7.5"', '8"', '8.5"']

interface VariantSelectorProps {
  category: string
  metalTypes: string[]
  isTwoTone?: boolean
  purities?: string[]
  ringSizes?: boolean
  necklaceLengths?: boolean
  braceletLengths?: boolean
  selectedMetal: string
  selectedPurity: string
  selectedSize: string
  onMetalChange: (metal: string) => void
  onPurityChange: (purity: string) => void
  onSizeChange: (size: string) => void
}

export default function VariantSelector({
  category,
  metalTypes,
  isTwoTone,
  purities,
  ringSizes,
  necklaceLengths,
  braceletLengths,
  selectedMetal,
  selectedPurity,
  selectedSize,
  onMetalChange,
  onPurityChange,
  onSizeChange,
}: VariantSelectorProps) {
  const showPurity =
    !isTwoTone &&
    ['Yellow Gold', 'White Gold'].includes(selectedMetal) &&
    (purities?.length ?? 0) > 0
  const showRingSizes = category === 'rings' && ringSizes
  const showNecklaceLengths = category === 'necklaces' && necklaceLengths
  const showBraceletLengths = category === 'bracelets' && braceletLengths

  return (
    <div className="flex flex-col gap-6">
      {/* Metal — static label for two-tone, selectable buttons otherwise */}
      <div>
        <p className="font-serif text-xs tracking-widest uppercase text-gray-500 mb-3">
          Metal
        </p>
        {isTwoTone ? (
          <span className="font-serif text-sm text-brand-charcoal">
            Two-Tone (White Gold &amp; Yellow Gold)
          </span>
        ) : (
          <div className="flex flex-wrap gap-2">
            {metalTypes.map((metal) => (
              <button
                key={metal}
                onClick={() => onMetalChange(metal)}
                className={`font-serif text-xs px-3 py-2 border transition-colors ${
                  metal === selectedMetal
                    ? 'border-brand-charcoal bg-brand-charcoal text-white'
                    : 'border-gray-300 text-brand-charcoal hover:border-brand-charcoal'
                }`}
              >
                {metal}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Purity — only for Yellow/White Gold on non-two-tone products */}
      {showPurity && (
        <div>
          <p className="font-serif text-xs tracking-widest uppercase text-gray-500 mb-3">
            Purity — <span className="text-brand-charcoal">{selectedPurity || 'Select'}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {purities!.map((purity) => (
              <button
                key={purity}
                onClick={() => onPurityChange(purity)}
                className={`font-serif text-xs px-3 py-2 border transition-colors ${
                  purity === selectedPurity
                    ? 'border-brand-charcoal bg-brand-charcoal text-white'
                    : 'border-gray-300 text-brand-charcoal hover:border-brand-charcoal'
                }`}
              >
                {purity}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ring Size */}
      {showRingSizes && (
        <div>
          <p className="font-serif text-xs tracking-widest uppercase text-gray-500 mb-3">
            Ring Size — <span className="text-brand-charcoal">{selectedSize || 'Select a size'}</span>
          </p>
          <select
            value={selectedSize}
            onChange={(e) => onSizeChange(e.target.value)}
            className="font-serif text-sm border border-gray-300 px-3 py-2 text-brand-charcoal w-44 focus:outline-none focus:border-brand-charcoal bg-white"
          >
            <option value="">Select size</option>
            {RING_SIZES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}

      {/* Necklace Length */}
      {showNecklaceLengths && (
        <div>
          <p className="font-serif text-xs tracking-widest uppercase text-gray-500 mb-3">
            Length — <span className="text-brand-charcoal">{selectedSize || 'Select a length'}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {NECKLACE_LENGTHS.map((len) => (
              <button
                key={len}
                onClick={() => onSizeChange(len)}
                className={`font-serif text-xs px-3 py-2 border transition-colors ${
                  len === selectedSize
                    ? 'border-brand-charcoal bg-brand-charcoal text-white'
                    : 'border-gray-300 text-brand-charcoal hover:border-brand-charcoal'
                }`}
              >
                {len}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bracelet Length */}
      {showBraceletLengths && (
        <div>
          <p className="font-serif text-xs tracking-widest uppercase text-gray-500 mb-3">
            Length — <span className="text-brand-charcoal">{selectedSize || 'Select a length'}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {BRACELET_LENGTHS.map((len) => (
              <button
                key={len}
                onClick={() => onSizeChange(len)}
                className={`font-serif text-xs px-3 py-2 border transition-colors ${
                  len === selectedSize
                    ? 'border-brand-charcoal bg-brand-charcoal text-white'
                    : 'border-gray-300 text-brand-charcoal hover:border-brand-charcoal'
                }`}
              >
                {len}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
