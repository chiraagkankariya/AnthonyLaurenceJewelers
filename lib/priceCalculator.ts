/**
 * Carat pricing formula for Anthony Laurence Jewelers.
 *
 * All adjustments are calculated from basePrice — never compounding on a running total.
 * This ensures going up 3ct then down 3ct returns exactly to basePrice.
 *
 * Diamond cost: $500 per carat (linear)
 * Gold adjustment:
 *   - First 1ct change (2 increments of 0.5ct): 5% of basePrice per 0.5ct increment = 10% total
 *   - Each subsequent 0.5ct increment: 3.75% of basePrice
 * Direction: same rates apply going up OR down
 */
export function calculatePrice(
  basePrice: number,
  baseCaratSize: number,
  selectedCaratSize: number
): number {
  if (selectedCaratSize === baseCaratSize) return basePrice

  const caratDifference = selectedCaratSize - baseCaratSize
  const direction = caratDifference > 0 ? 1 : -1
  const numberOfIncrements = Math.abs(caratDifference) / 0.5

  // Diamond adjustment: $500 per full carat
  const diamondAdjustment = caratDifference * 500

  // Gold adjustment: based on number of 0.5ct increments from basePrice
  let goldAdjustment = 0
  for (let i = 1; i <= numberOfIncrements; i++) {
    if (i <= 2) {
      // First 2 increments (0–1ct range): 5% of basePrice each
      goldAdjustment += basePrice * 0.05
    } else {
      // Subsequent increments: 3.75% of basePrice each
      goldAdjustment += basePrice * 0.0375
    }
  }

  return basePrice + diamondAdjustment + direction * goldAdjustment
}

/**
 * Returns the valid carat options for a product given its base carat size.
 * Only called when caratSize >= 1.
 */
export function getCaratOptions(baseCaratSize: number): number[] {
  const min = Math.max(1, baseCaratSize - 5)
  const max = baseCaratSize + 5
  const options: number[] = []

  for (let ct = min; ct <= max; ct += 0.5) {
    options.push(Math.round(ct * 10) / 10)
  }

  return options
}
