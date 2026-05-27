import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | Anthony Laurence Jewelers',
  description:
    'Anthony Laurence Jewelers — fine jewelry in Millburn, NJ. Custom pieces, expert repairs, and certified appraisals since day one.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="font-serif text-xs tracking-widest uppercase text-gray-400 mb-2">
            139 Millburn Ave, Millburn, NJ
          </p>
          <h1 className="font-serif text-4xl font-light text-brand-charcoal mb-4">
            About Anthony Laurence Jewelers
          </h1>
          <p className="font-serif text-xl font-light text-gray-500 italic">
            &ldquo;Made to Be Remembered.&rdquo;
          </p>
        </div>
      </div>

      {/* Brand story */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="font-serif text-gray-600 leading-relaxed space-y-6 text-[15px] mb-16">
          <p>
            Anthony Laurence Jewelers was founded on a simple belief: fine jewelry should feel
            personal. Every ring, necklace, bracelet, and earring we carry is chosen with care —
            crafted in precious metals, set with lab grown and natural diamonds, and made to last a
            lifetime.
          </p>
          <p>
            Located in the heart of Millburn, New Jersey, our boutique has been a trusted destination
            for engagement rings, custom commissions, expert repairs, and certified appraisals. We
            work directly with our customers from the first conversation to the final polish.
          </p>
          <p>
            Whether you&apos;re searching for the perfect engagement ring, a meaningful gift, or
            something entirely your own, we&apos;re here to make it happen.
          </p>
        </div>

        {/* Services summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {[
            { title: 'Custom Jewelry', href: '/custom', body: 'Bring your vision to life. One-of-a-kind pieces designed and crafted for you.' },
            { title: 'Appraisals', href: '/appraisals', body: 'Certified valuations for insurance, estate, and resale purposes.' },
            { title: 'Repairs', href: '/repairs', body: 'Ring resizing, prong retipping, polishing, and more — done with care.' },
          ].map(({ title, href, body }) => (
            <Link
              key={title}
              href={href}
              className="group border border-gray-100 p-6 hover:border-brand-red transition-colors"
            >
              <h3 className="font-serif text-base text-brand-charcoal mb-2 group-hover:text-brand-red transition-colors">
                {title}
              </h3>
              <p className="font-serif text-sm text-gray-500 leading-relaxed">{body}</p>
            </Link>
          ))}
        </div>

        {/* Location & hours */}
        <div className="bg-[#F5F5F5] p-8 mb-16">
          <h2 className="font-serif text-2xl font-light text-brand-charcoal mb-6">Visit Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 font-serif text-sm text-gray-500">
            <div className="space-y-1">
              <p className="font-semibold text-brand-charcoal">Address</p>
              <p>139 Millburn Ave</p>
              <p>Millburn, NJ 07041</p>
              <p className="pt-2">
                <a href="tel:9733793344" className="hover:text-brand-charcoal transition-colors">
                  (973) 379-3344
                </a>
              </p>
              <p>
                <a
                  href="mailto:anthonylaurencejewlers@gmail.com"
                  className="hover:text-brand-charcoal transition-colors"
                >
                  anthonylaurencejewlers@gmail.com
                </a>
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-brand-charcoal">Hours</p>
              <p>Tuesday – Friday: 8AM – 4PM</p>
              <p>Saturday: 8AM – 12PM</p>
              <p>Sunday – Monday: Closed</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/shop"
            className="font-serif text-sm tracking-widest uppercase bg-brand-charcoal text-white px-8 py-4 hover:bg-brand-red transition-colors inline-block mr-4"
          >
            Shop the Collection
          </Link>
          <Link
            href="/custom"
            className="font-serif text-sm tracking-widest uppercase border border-brand-charcoal text-brand-charcoal px-8 py-4 hover:bg-brand-charcoal hover:text-white transition-colors inline-block mt-4 sm:mt-0"
          >
            Start a Custom Piece
          </Link>
        </div>
      </div>
    </div>
  )
}
