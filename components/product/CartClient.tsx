'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import Button from '@/components/ui/Button'

export default function CartClient() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setError('Unable to start checkout. Please try again.')
        return
      }
      window.location.href = data.url
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 px-4">
        <svg className="w-16 h-16 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h1 className="font-serif text-2xl font-light text-brand-charcoal">Your cart is empty</h1>
        <Button href="/shop" variant="secondary">Browse the Collection</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="font-serif text-xs tracking-widest uppercase text-gray-400 mb-1">
            Anthony Laurence Jewelers
          </p>
          <h1 className="font-serif text-3xl font-light text-brand-charcoal">Your Cart</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Item List */}
          <div className="lg:col-span-2">
            <ul className="divide-y divide-gray-100">
              {items.map((item) => (
                <li key={item.id} className="py-6 flex gap-5">
                  <div className="relative w-24 h-24 flex-shrink-0 bg-[#F0F0F0] overflow-hidden">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.slug}`} className="font-serif text-base font-semibold text-brand-charcoal hover:text-brand-red transition-colors leading-snug">
                      {item.name}
                    </Link>
                    <div className="mt-1 space-y-0.5">
                      {item.selectedMetal && (
                        <p className="font-serif text-xs text-gray-500">
                          {item.selectedMetal}{item.selectedPurity ? ` · ${item.selectedPurity}` : ''}
                        </p>
                      )}
                      {item.selectedSize && (
                        <p className="font-serif text-xs text-gray-500">
                          {item.category === 'rings' ? `Size ${item.selectedSize}` : item.selectedSize}
                        </p>
                      )}
                      {item.selectedCarat && (
                        <p className="font-serif text-xs text-gray-500">{item.selectedCarat}ct</p>
                      )}
                    </div>
                    <p className="mt-2 font-serif text-sm text-brand-charcoal">
                      ${item.price.toLocaleString()}
                    </p>

                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="px-3 py-1.5 text-gray-500 hover:text-brand-red transition-colors"
                        >−</button>
                        <span className="px-3 py-1.5 font-serif text-sm text-brand-charcoal min-w-[2.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="px-3 py-1.5 text-gray-500 hover:text-brand-red transition-colors"
                        >+</button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="font-serif text-xs text-gray-400 hover:text-brand-red transition-colors underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="font-serif text-sm text-brand-charcoal font-semibold whitespace-nowrap">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>

            <button
              onClick={clearCart}
              className="mt-4 font-serif text-xs text-gray-400 hover:text-brand-red transition-colors underline"
            >
              Clear cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="border border-gray-100 p-6 sticky top-24">
              <h2 className="font-serif text-lg font-light text-brand-charcoal mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-serif text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-serif text-sm text-gray-500">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-serif text-sm text-gray-500">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-serif text-base text-brand-charcoal">
                  <span>Estimated Total</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
              </div>

              {error && (
                <p className="font-serif text-xs text-brand-red mb-3">{error}</p>
              )}

              <Button fullWidth size="lg" onClick={handleCheckout} disabled={loading}>
                {loading ? 'Redirecting…' : 'Proceed to Checkout'}
              </Button>

              <div className="mt-4 space-y-1.5">
                {[
                  'Free shipping — signature required',
                  'Free local pickup available',
                  'NJ sales tax applied at checkout',
                ].map((line) => (
                  <div key={line} className="flex items-center gap-2 font-serif text-xs text-gray-400">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
