'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'alj-closure-notice-2026-07'

export default function ClosureNotice() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const dismissed = sessionStorage.getItem(STORAGE_KEY)
    if (!dismissed) setIsOpen(true)
  }, [])

  const close = () => {
    setIsOpen(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {}
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={close}
        aria-hidden={!isOpen}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="closure-notice-title"
        className={`fixed left-1/2 top-1/2 z-[70] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 text-brand-charcoal hover:text-brand-red transition-colors"
          aria-label="Close announcement"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-8 py-10 text-center">
          <p className="font-serif text-xs tracking-[0.3em] uppercase text-brand-red mb-4">
            Holiday Notice
          </p>
          <h2
            id="closure-notice-title"
            className="font-serif text-2xl font-light tracking-wide text-brand-charcoal mb-5"
          >
            Store Closed July 4 – July 13
          </h2>
          <p className="font-serif text-sm text-gray-600 leading-relaxed">
            We will be closed from <span className="text-brand-charcoal">July 4th</span> through{' '}
            <span className="text-brand-charcoal">July 13th</span>.
          </p>
          <p className="mt-3 font-serif text-sm text-gray-600 leading-relaxed">
            All orders placed after <span className="text-brand-charcoal">July 1st</span> will begin
            processing on <span className="text-brand-charcoal">July 13th</span>.
          </p>
          <p className="mt-5 font-serif text-sm text-gray-500 italic">
            Thank you for your patience.
          </p>

          <button
            onClick={close}
            className="mt-8 inline-flex items-center justify-center font-serif tracking-widest uppercase text-xs px-6 py-3 bg-brand-red text-white hover:bg-[#6B0000] active:bg-[#5a0000] transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </>
  )
}
