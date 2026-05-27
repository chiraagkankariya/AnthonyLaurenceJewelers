import type { Metadata } from 'next'
import CartClient from '@/components/product/CartClient'

export const metadata: Metadata = {
  title: 'Your Cart | Anthony Laurence Jewelers',
  description: 'Review your items and proceed to checkout.',
}

export default function CartPage() {
  return <CartClient />
}
