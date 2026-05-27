import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import type { CartItem } from '@/types'

export async function POST(request: Request) {
  try {
    const { items }: { items: CartItem[] } = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty.' }, { status: 400 })
    }

    const lineItems = items.map((item) => {
      const variantParts = [
        item.selectedMetal,
        item.selectedPurity,
        item.selectedSize
          ? item.category === 'rings'
            ? `Size ${item.selectedSize}`
            : item.selectedSize
          : null,
        item.selectedCarat ? `${item.selectedCarat}ct` : null,
      ].filter(Boolean)

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: variantParts.length > 0 ? variantParts.join(' · ') : undefined,
            ...(item.image ? { images: [item.image] } : {}),
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      automatic_tax: { enabled: true },
      shipping_address_collection: { allowed_countries: ['US'] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'usd' },
            display_name: 'Free Shipping (Signature Required)',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 5 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'usd' },
            display_name: 'Free Local Pickup — 139 Millburn Ave, Millburn NJ',
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout route error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 })
  }
}
