import type { Metadata } from 'next'
import CalendlyEmbed from '@/components/ui/CalendlyEmbed'

export const metadata: Metadata = {
  title: 'Jewelry Appraisals | Anthony Laurence Jewelers',
  description:
    'Professional jewelry appraisals in Millburn, NJ. Certified valuations for insurance, estate, and resale purposes.',
}

const services = [
  {
    title: 'Insurance Appraisals',
    body: 'Detailed written appraisals accepted by all major insurance carriers. Protect your investment with an accurate replacement-value assessment.',
  },
  {
    title: 'Estate & Inheritance',
    body: 'Fair market and estate valuations for inherited collections, probate, and estate planning purposes.',
  },
  {
    title: 'Resale & Pre-Purchase',
    body: 'Know exactly what you\'re buying or selling. Independent valuations for private sales, auctions, and trade-ins.',
  },
  {
    title: 'Damage Assessment',
    body: 'Documented appraisals for damaged or repaired pieces — required by most insurance claims.',
  },
]

export default function AppraisalsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="font-serif text-xs tracking-widest uppercase text-gray-400 mb-2">
            Anthony Laurence Jewelers
          </p>
          <h1 className="font-serif text-4xl font-light text-brand-charcoal mb-4">
            Jewelry Appraisals
          </h1>
          <p className="font-serif text-gray-500 max-w-xl mx-auto leading-relaxed">
            Certified appraisals for insurance, estate, and resale purposes — delivered with
            precision and professionalism.
          </p>
        </div>
      </div>

      {/* Services grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          {services.map(({ title, body }) => (
            <div key={title} className="border border-gray-100 p-8">
              <h3 className="font-serif text-lg text-brand-charcoal mb-3">{title}</h3>
              <p className="font-serif text-sm text-gray-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* What to bring */}
        <div className="bg-[#F5F5F5] p-8 mb-16">
          <h2 className="font-serif text-2xl font-light text-brand-charcoal mb-6">
            What to Bring
          </h2>
          <ul className="font-serif text-sm text-gray-500 space-y-2 list-none">
            {[
              'The piece(s) to be appraised',
              'Any existing certificates (GIA, AGS, EGL)',
              'Prior appraisals, if available',
              'Proof of purchase (optional but helpful)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-brand-red mt-0.5">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Calendly */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-serif text-2xl font-light text-brand-charcoal mb-4">
              Schedule an Appraisal
            </h2>
            <p className="font-serif text-sm text-gray-500 leading-relaxed mb-4">
              Appraisals are by appointment. Walk-ins welcome subject to availability. Visit us at
              139 Millburn Ave, Millburn, NJ 07041.
            </p>
            <p className="font-serif text-sm text-gray-500">
              Questions? Call <a href="tel:9733793344" className="text-brand-charcoal hover:text-brand-red transition-colors">(973) 379-3344</a>
            </p>
          </div>
          <CalendlyEmbed mode="inline" />
        </div>
      </div>
    </div>
  )
}
