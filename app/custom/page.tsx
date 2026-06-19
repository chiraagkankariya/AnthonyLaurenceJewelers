import type { Metadata } from 'next'
import CalendlyEmbed from '@/components/ui/CalendlyEmbed'
import CustomInquiryForm from '@/components/product/CustomInquiryForm'

export const metadata: Metadata = {
  title: 'Custom Jewelry | Anthony Laurence Jewelers',
  description:
    'Commission a one-of-a-kind piece at Anthony Laurence Jewelers in Millburn, NJ. Submit your inquiry or book a complimentary consultation.',
}

export default function CustomPage({ searchParams }: { searchParams: { product?: string } }) {
  const productName = searchParams.product ?? ''

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="font-serif text-xs tracking-widest uppercase text-gray-400 mb-2">
            Anthony Laurence Jewelers
          </p>
          <h1 className="font-serif text-4xl font-light text-brand-charcoal mb-4">
            Custom Jewelry
          </h1>
          <p className="font-serif text-gray-500 max-w-xl mx-auto leading-relaxed">
            Bring your vision to life. Share the details below and we&apos;ll reach out to discuss
            your one-of-a-kind piece.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="font-serif text-2xl font-light text-brand-charcoal mb-8">
            Tell Us About Your Piece
          </h2>
          <CustomInquiryForm productName={productName} />
        </div>

        <div>
          <h2 className="font-serif text-2xl font-light text-brand-charcoal mb-8">
            Book a Consultation
          </h2>
          <p className="font-serif text-sm text-gray-500 mb-6 leading-relaxed">
            Prefer to talk through your ideas in person or over the phone? Schedule a complimentary
            consultation with our team.
          </p>
          <CalendlyEmbed mode="inline" />
        </div>
      </div>
    </div>
  )
}
