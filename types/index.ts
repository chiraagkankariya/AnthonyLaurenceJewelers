export interface CartItem {
  id: string
  productId: string
  slug: string
  name: string
  price: number
  image?: string
  quantity: number
  category: string
  selectedMetal?: string
  selectedPurity?: string
  selectedSize?: string
  selectedCarat?: number
}

// Lightweight projection returned by shop listing queries
export interface ProductListing {
  _id: string
  name: string
  slug: string
  category: string
  subcategory?: string
  price: number
  salePrice?: number
  inStock: boolean
  images?: Array<{ asset: { _ref: string; _type: string } }>
  metalTypes: string[]
  stoneType?: string
}

export interface SanityProduct {
  _id: string
  name: string
  slug: { current: string }
  category: string
  subcategory: string
  description?: string
  price: number
  salePrice?: number
  inStock: boolean
  featured?: boolean
  labGrown?: boolean
  images?: Array<{ asset: { _ref: string; _type: string } }>
  stoneType?: string
  stoneShape?: string
  caratSize?: number
  metalTypes: string[]
  purities?: string[]
  ringSizes?: boolean
  necklaceLengths?: boolean
  braceletLengths?: boolean
}
