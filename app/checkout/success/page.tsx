import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Order Confirmed | Anthony Laurence Jewelers',
  description: 'Thank you for your order. We will be in touch shortly.',
}

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center mx-auto mb-8">
          <svg className="w-8 h-8 text-brand-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <p className="font-serif text-xs tracking-widest uppercase text-gray-400 mb-3">
          Anthony Laurence Jewelers
        </p>
        <h1 className="font-serif text-3xl font-light text-brand-charcoal mb-4">
          Thank You for Your Order
        </h1>
        <p className="font-serif text-sm text-gray-500 leading-relaxed mb-8">
          Your order has been received. You&apos;ll receive a confirmation email shortly. If you have
          any questions, call us at{' '}
          <a href="tel:9733793344" className="text-brand-charcoal hover:text-brand-red transition-colors">
            (973) 379-3344
          </a>
          .
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="font-serif text-sm tracking-widest uppercase bg-brand-charcoal text-white px-8 py-4 hover:bg-brand-red transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="font-serif text-sm tracking-widest uppercase border border-brand-charcoal text-brand-charcoal px-8 py-4 hover:bg-brand-charcoal hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
