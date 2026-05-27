import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found | Anthony Laurence Jewelers',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <p className="font-serif text-8xl font-light text-gray-100 mb-4">404</p>
        <p className="font-serif text-xs tracking-widest uppercase text-gray-400 mb-3">
          Anthony Laurence Jewelers
        </p>
        <h1 className="font-serif text-3xl font-light text-brand-charcoal mb-4">
          Page Not Found
        </h1>
        <p className="font-serif text-sm text-gray-500 leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist. Browse our collection or return home.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="font-serif text-sm tracking-widest uppercase bg-brand-charcoal text-white px-8 py-4 hover:bg-brand-red transition-colors"
          >
            Shop Jewelry
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
