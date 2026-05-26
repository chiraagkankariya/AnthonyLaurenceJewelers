import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

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
  purities,
  ringSizes,
  necklaceLengths,
  braceletLengths
}`
