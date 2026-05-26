import Image from 'next/image'
import Link from 'next/link'

const shopLinks = [
  { label: 'All Jewelry', href: '/shop' },
  { label: 'Rings', href: '/shop/rings' },
  { label: 'Necklaces / Chains', href: '/shop/necklaces' },
  { label: 'Earrings', href: '/shop/earrings' },
  { label: 'Bracelets', href: '/shop/bracelets' },
]

const serviceLinks = [
  { label: 'Custom Jewelry', href: '/custom' },
  { label: 'Appraisals', href: '/appraisals' },
  { label: 'Repairs', href: '/repairs' },
]

const hours = [
  { days: 'Tuesday – Friday', hours: '8AM – 4PM' },
  { days: 'Saturday', hours: '8AM – 12PM' },
  { days: 'Sunday – Monday', hours: 'Closed' },
]

const paymentBrands = ['Visa', 'Mastercard', 'Amex', 'Discover']

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* 1. Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Anthony Laurence Jewelers"
                width={130}
                height={38}
                className="h-9 w-auto object-contain mb-4"
              />
            </Link>
            <p className="font-serif text-sm font-light text-gray-500 leading-relaxed">
              Made to Be Remembered.
            </p>
            <a
              href="https://www.instagram.com/anthonylaurencejewelry/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center gap-2 mt-4 text-gray-400 hover:text-brand-red transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span className="font-serif text-xs tracking-widest uppercase">Instagram</span>
            </a>
          </div>

          {/* 2. Shop */}
          <div>
            <h3 className="font-serif text-xs tracking-widest uppercase text-brand-charcoal mb-5">
              Shop
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-serif text-sm text-gray-500 hover:text-brand-red transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Services */}
          <div>
            <h3 className="font-serif text-xs tracking-widest uppercase text-brand-charcoal mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-serif text-sm text-gray-500 hover:text-brand-red transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Visit Us */}
          <div>
            <h3 className="font-serif text-xs tracking-widest uppercase text-brand-charcoal mb-5">
              Visit Us
            </h3>
            <address className="not-italic space-y-3">
              <p className="font-serif text-sm text-gray-500 leading-snug">
                139 Millburn Ave<br />Millburn, NJ 07041
              </p>
              <a
                href="tel:9733793344"
                className="block font-serif text-sm text-gray-500 hover:text-brand-red transition-colors"
              >
                (973) 379-3344
              </a>
              <a
                href="mailto:anthonylaurencejewlers@gmail.com"
                className="block font-serif text-sm text-gray-500 hover:text-brand-red transition-colors"
              >
                anthonylaurencejewlers@gmail.com
              </a>
              <ul className="space-y-1 pt-1">
                {hours.map(({ days, hours: time }) => (
                  <li key={days} className="font-serif text-xs text-gray-400 flex justify-between gap-4">
                    <span>{days}</span>
                    <span className={time === 'Closed' ? 'text-gray-300' : ''}>{time}</span>
                  </li>
                ))}
              </ul>
            </address>
          </div>

          {/* 5. Returns Policy */}
          <div>
            <h3 className="font-serif text-xs tracking-widest uppercase text-brand-charcoal mb-5">
              Returns Policy
            </h3>
            <p className="font-serif text-sm text-gray-500 leading-relaxed">
              All sales on custom pieces are final. Standard purchases are eligible for store credit
              or exchange of equal or lesser value within 30 days. No refunds.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-serif text-xs text-gray-400">
            © {new Date().getFullYear()} Anthony Laurence Jewelers. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {paymentBrands.map((brand) => (
              <span
                key={brand}
                className="font-sans text-xs text-gray-400 border border-gray-200 rounded px-2 py-1"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
