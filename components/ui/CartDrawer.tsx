'use client'

import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import Button from './Button'

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, subtotal, isOpen, closeCart } = useCart()

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="font-serif text-xl font-light tracking-widest uppercase text-brand-charcoal">
            Your Cart
          </h2>
          <button
            onClick={closeCart}
            className="text-brand-charcoal hover:text-brand-red transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="font-serif text-gray-400 text-lg font-light">Your cart is empty</p>
              <Button href="/shop" variant="secondary" size="sm" onClick={closeCart}>
                Browse Jewelry
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map((item) => (
                <li key={item.id} className="py-5 flex gap-4">
                  {/* Image */}
                  <div className="relative w-20 h-20 flex-shrink-0 bg-brand-gray rounded overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm font-semibold text-brand-charcoal leading-snug">
                      {item.name}
                    </p>
                    <div className="mt-1 space-y-0.5">
                      {item.selectedMetal && (
                        <p className="text-xs text-gray-500">
                          {item.selectedMetal}{item.selectedPurity ? ` · ${item.selectedPurity}` : ''}
                        </p>
                      )}
                      {item.selectedSize && (
                        <p className="text-xs text-gray-500">
                          {item.category === 'rings' ? `Size ${item.selectedSize}` : item.selectedSize}
                        </p>
                      )}
                      {item.selectedCarat && (
                        <p className="text-xs text-gray-500">{item.selectedCarat}ct</p>
                      )}
                    </div>
                    <p className="mt-2 font-serif text-sm text-brand-charcoal">
                      ${(item.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>

                    {/* Qty + Remove */}
                    <div className="mt-2 flex items-center gap-4">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-500 hover:text-brand-red transition-colors text-sm"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-2 py-1 text-xs font-medium text-brand-charcoal min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-500 hover:text-brand-red transition-colors text-sm"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-gray-400 hover:text-brand-red transition-colors underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-serif text-sm text-gray-500 tracking-wide">Subtotal</span>
              <span className="font-serif text-lg text-brand-charcoal font-semibold">
                ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <p className="text-xs text-gray-400 text-center">
              Free shipping · Signature required · Tax calculated at checkout
            </p>
            <Button href="/cart" fullWidth onClick={closeCart}>
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
