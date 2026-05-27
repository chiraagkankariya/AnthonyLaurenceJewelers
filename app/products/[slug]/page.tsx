import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { client, productBySlugQuery } from '@/lib/sanity'
import type { SanityProduct } from '@/types'
import ProductDetailClient from '@/components/product/ProductDetailClient'

interface ProductPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await client.fetch<SanityProduct | null>(productBySlugQuery, { slug: params.slug })
  if (!product) return {}
  return {
    title: `${product.name} | Anthony Laurence Jewelers`,
    description: product.description?.slice(0, 160),
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await client.fetch<SanityProduct | null>(productBySlugQuery, { slug: params.slug })

  if (!product) notFound()

  return <ProductDetailClient product={product} />
}
