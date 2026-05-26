import Link from 'next/link'

const services = [
  {
    title: 'Custom Jewelry',
    href: '/custom',
    cta: 'Start Your Design',
    description:
      'Bring your vision to life. We design and craft one-of-a-kind pieces tailored to your exact specifications — from sketch to finished jewel.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    title: 'Appraisals',
    href: '/appraisals',
    cta: 'Book an Appraisal',
    description:
      'Professional jewelry appraisals for insurance, estate, or resale purposes. Certified, thorough, and priced fairly — no surprises.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Repairs',
    href: '/repairs',
    cta: 'Learn More',
    description:
      'Expert repairs for individuals and other jewelry stores. Ring resizing, prong re-tipping, chain soldering, rhodium plating, engraving, and more.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
]

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-serif text-xs tracking-[0.3em] uppercase text-brand-gold mb-3">
            What We Offer
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-charcoal">
            Our Services
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="w-12 h-px bg-brand-gold/50" />
            <div className="w-1 h-1 rounded-full bg-brand-gold/50" />
            <div className="w-12 h-px bg-brand-gold/50" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group flex flex-col items-center text-center p-10 border border-gray-100 hover:border-brand-gold/40 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-brand-gold/60 group-hover:text-brand-gold transition-colors duration-300 mb-6">
                {service.icon}
              </div>

              {/* Divider */}
              <div className="w-8 h-px bg-brand-gold/40 mb-6" />

              <h3 className="font-serif text-2xl font-light text-brand-charcoal mb-4">
                {service.title}
              </h3>
              <p className="font-serif text-sm text-gray-500 leading-relaxed mb-8 flex-1">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="font-serif text-xs tracking-widest uppercase text-brand-red border-b border-brand-red pb-0.5 hover:text-[#6B0000] hover:border-[#6B0000] transition-colors"
              >
                {service.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
