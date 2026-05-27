import type { Metadata } from 'next'
import Image from 'next/image'
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
      {/* Hero */}
      <div className="relative min-h-[500px] flex items-center justify-center">
        <Image
          src="/repair-appraisal/appraisal-jewelry.webp"
          alt="Jewelry pieces for appraisal"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <p className="font-serif text-sm tracking-widest uppercase text-[#F5A623] mb-2">
            Anthony Laurence Jewelers
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white mb-3">
            Jewelry Appraisals
          </h1>
          <div className="w-12 h-0.5 bg-[#F5A623] mx-auto mb-5" />
          <p className="font-serif text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            Certified appraisals for insurance, estate, and resale purposes — delivered with
            precision and professionalism.
          </p>
        </div>
      </div>

      {/* Services grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
          {services.map(({ title, body }) => (
            <div key={title} className="border border-gray-100 border-l-4 border-l-[#F5A623] p-8">
              <h3 className="font-serif text-xl font-semibold text-brand-charcoal mb-3">{title}</h3>
              <p className="font-serif text-base font-medium text-gray-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* What to bring */}
        <div className="bg-[#FFFFF0] p-8 mb-16">
          <h2 className="font-serif text-3xl font-semibold text-brand-charcoal mb-6">
            What to Bring
          </h2>
          <ul className="font-serif text-base font-medium text-gray-500 space-y-2 list-none">
            {[
              'The piece(s) to be appraised',
              'Any existing certificates (GIA, AGS, EGL)',
              'Prior appraisals, if available',
              'Proof of purchase (optional but helpful)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-[#F5A623] mt-0.5">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Calendly */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-brand-charcoal mb-4">
              Schedule an Appraisal
            </h2>
            <p className="font-serif text-base font-medium text-gray-500 leading-relaxed mb-4">
              Appraisals are by appointment. Walk-ins welcome subject to availability. Visit us at
              139 Millburn Ave, Millburn, NJ 07041.
            </p>
            <p className="font-serif text-base font-medium text-gray-500">
              Questions? Call <a href="tel:9733793344" className="text-brand-charcoal hover:text-brand-red transition-colors">(973) 379-3344</a>
            </p>
          </div>
          <CalendlyEmbed mode="inline" />
        </div>
      </div>
    </div>
  )
}
