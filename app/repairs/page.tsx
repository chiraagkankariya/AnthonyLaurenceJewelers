import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jewelry Repairs | Anthony Laurence Jewelers',
  description:
    'Expert jewelry repairs in Millburn, NJ — ring resizing, prong retipping, clasp replacement, polishing, and more.',
}

const services = [
  { title: 'Ring Resizing', body: 'Up and down sizing for most ring styles. Same-day service available for simple resizes.' },
  { title: 'Prong Retipping & Tightening', body: 'Secure loose stones before they\'re lost. We inspect and retip worn or damaged prongs.' },
  { title: 'Clasp & Chain Repair', body: 'Broken clasps, soldered chain links, lobster claw replacements for necklaces and bracelets.' },
  { title: 'Stone Replacement', body: 'Missing or chipped stones replaced with exact or closely matched alternatives.' },
  { title: 'Polishing & Refinishing', body: 'Full polish to restore original luster, or matte/satin finishing on request.' },
  { title: 'Rhodium Plating', body: 'Restore the bright white finish on white gold rings and jewelry.' },
]

export default function RepairsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="font-serif text-xs tracking-widest uppercase text-gray-400 mb-2">
            Anthony Laurence Jewelers
          </p>
          <h1 className="font-serif text-4xl font-light text-brand-charcoal mb-4">
            Jewelry Repairs
          </h1>
          <p className="font-serif text-gray-500 max-w-xl mx-auto leading-relaxed">
            Trusted repairs by skilled craftsmen. From a quick polish to full restoration, we handle
            your pieces with the care they deserve.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map(({ title, body }) => (
            <div key={title} className="border border-gray-100 p-6">
              <h3 className="font-serif text-base text-brand-charcoal mb-2">{title}</h3>
              <p className="font-serif text-sm text-gray-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="bg-[#F5F5F5] p-8 mb-16">
          <h2 className="font-serif text-2xl font-light text-brand-charcoal mb-6">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Bring It In', body: 'Drop off your piece at 139 Millburn Ave. We\'ll assess it on the spot.' },
              { step: '02', title: 'Receive a Quote', body: 'We provide a written estimate before any work begins — no surprises.' },
              { step: '03', title: 'Pick It Up', body: 'Most repairs are completed within 3–7 business days. Rush service available.' },
            ].map(({ step, title, body }) => (
              <div key={step}>
                <p className="font-serif text-3xl font-light text-gray-200 mb-2">{step}</p>
                <h3 className="font-serif text-base text-brand-charcoal mb-1">{title}</h3>
                <p className="font-serif text-sm text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-2xl font-light text-brand-charcoal mb-4">
              Visit Us or Get in Touch
            </h2>
            <div className="font-serif text-sm text-gray-500 space-y-2 mb-6">
              <p>139 Millburn Ave, Millburn, NJ 07041</p>
              <p>
                <a href="tel:9733793344" className="hover:text-brand-charcoal transition-colors">
                  (973) 379-3344
                </a>
              </p>
              <p>
                <a href="mailto:anthonylaurencejewlers@gmail.com" className="hover:text-brand-charcoal transition-colors">
                  anthonylaurencejewlers@gmail.com
                </a>
              </p>
            </div>
            <div className="font-serif text-sm text-gray-500 space-y-1 mb-8">
              <p className="font-semibold text-brand-charcoal">Hours</p>
              <p>Tuesday – Friday: 8AM – 4PM</p>
              <p>Saturday: 8AM – 12PM</p>
              <p>Sunday – Monday: Closed</p>
            </div>
            <Link
              href="/custom"
              className="font-serif text-xs tracking-widest uppercase border border-brand-charcoal text-brand-charcoal px-6 py-3 hover:bg-brand-charcoal hover:text-white transition-colors inline-block"
            >
              Custom Inquiry
            </Link>
          </div>

          <div className="border border-gray-100 p-8">
            <h3 className="font-serif text-lg text-brand-charcoal mb-3">Not sure if we can fix it?</h3>
            <p className="font-serif text-sm text-gray-500 leading-relaxed">
              Bring it in — we&apos;ll take a look at no charge. If the repair is outside our scope,
              we&apos;ll tell you honestly and point you in the right direction.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
