import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { ProductListing } from '@/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

// Safe wrapper — returns null instead of throwing when asset ref is missing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getImageUrl(source: any, width: number, height: number): string | null {
  if (!source?.asset?._ref) return null
  try {
    return builder.image(source).width(width).height(height).url()
  } catch {
    return null
  }
}

// GROQ Queries
export const allProductsQuery = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  slug,
  category,
  subcategory,
  price,
  salePrice,
  inStock,
  featured,
  labGrown,
  images,
  stoneType,
  stoneShape,
  caratSize,
  metalTypes,
  purities,
  ringSizes,
  necklaceLengths,
  braceletLengths
}`

export const featuredProductsQuery = `*[_type == "product" && featured == true] | order(_createdAt desc) {
  _id,
  name,
  slug,
  price,
  salePrice,
  inStock,
  images,
  category,
  metalTypes
}`

export const productsByCategoryQuery = `*[_type == "product" && category == $category] | order(_createdAt desc) {
  _id,
  name,
  slug,
  category,
  subcategory,
  price,
  salePrice,
  inStock,
  featured,
  labGrown,
  images,
  stoneType,
  stoneShape,
  caratSize,
  metalTypes,
  purities,
  ringSizes,
  necklaceLengths,
  braceletLengths
}`

// ─── Dynamic shop query ────────────────────────────────────────────────────

export interface FetchProductsParams {
  category?: string
  subcategory?: string
  metal?: string
  purity?: string
  stoneType?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  sort?: string
  q?: string
}

export async function fetchProducts(params: FetchProductsParams = {}): Promise<ProductListing[]> {
  const conditions = ['_type == "product"']
  const groqParams: Record<string, unknown> = {}

  if (params.category) {
    conditions.push('category == $category')
    groqParams.category = params.category
  }
  if (params.subcategory) {
    conditions.push('subcategory == $subcategory')
    groqParams.subcategory = params.subcategory
  }
  if (params.metal) {
    conditions.push('$metal in metalTypes')
    groqParams.metal = params.metal
  }
  if (params.purity) {
    conditions.push('$purity in purities')
    groqParams.purity = params.purity
  }
  if (params.stoneType) {
    conditions.push('stoneType == $stoneType')
    groqParams.stoneType = params.stoneType
  }
  if (params.minPrice !== undefined) {
    conditions.push('price >= $minPrice')
    groqParams.minPrice = params.minPrice
  }
  if (params.maxPrice !== undefined) {
    conditions.push('price <= $maxPrice')
    groqParams.maxPrice = params.maxPrice
  }
  if (params.inStock) {
    conditions.push('inStock == true')
  }
  if (params.q) {
    conditions.push('name match $q')
    groqParams.q = params.q + '*'
  }

  const orderMap: Record<string, string> = {
    'price-asc': 'price asc',
    'price-desc': 'price desc',
    newest: '_createdAt desc',
  }
  const order = orderMap[params.sort ?? ''] ?? '_createdAt desc'

  const query = `*[${conditions.join(' && ')}] | order(${order}) {
    _id,
    name,
    "slug": slug.current,
    category,
    subcategory,
    price,
    salePrice,
    inStock,
    "images": images[0..1],
    metalTypes,
    stoneType
  }`

  try {
    return await client.fetch<ProductListing[]>(query, groqParams)
  } catch {
    return []
  }
}

// ─── Product detail query ───────────────────────────────────────────────────

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  category,
  subcategory,
  description,
  price,
  salePrice,
  inStock,
  featured,
  labGrown,
  images,
  stoneType,
  stoneShape,
  caratSize,
  metalTypes,
  isTwoTone,
  purities,
  ringSizes,
  necklaceLengths,
  braceletLengths
}`
