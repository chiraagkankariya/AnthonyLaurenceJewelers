import type { Metadata } from 'next'
import SuccessClient from './SuccessClient'

export const metadata: Metadata = {
  title: 'Order Confirmed | Anthony Laurence Jewelers',
  description: 'Thank you for your order. We will be in touch shortly.',
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams
  return <SuccessClient sessionId={session_id ?? null} />
}
