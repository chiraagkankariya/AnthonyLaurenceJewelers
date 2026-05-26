import Link from 'next/link'

export default function AboutSnippet() {
  return (
    <section className="py-20 bg-brand-ivory">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-16 h-px bg-brand-gold/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/60" />
          <div className="w-16 h-px bg-brand-gold/50" />
        </div>

        <p className="font-serif text-xs tracking-[0.3em] uppercase text-brand-gold mb-5">
          Our Story
        </p>

        <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-charcoal leading-tight mb-8">
          Trusted. Local. Expert.
        </h2>

        <p className="font-serif text-lg md:text-xl font-light text-gray-600 leading-relaxed mb-4">
          Anthony Laurence Jewelers has been a trusted destination in Millburn, NJ for fine jewelry,
          custom designs, appraisals, and expert repairs — all under one roof.
        </p>
        <p className="font-serif text-lg md:text-xl font-light text-gray-600 leading-relaxed mb-4">
          We offer the expertise of a large retailer with the personal attention of a boutique.
          No commissions, no pressure — just honest guidance and exceptional craftsmanship.
        </p>
        <p className="font-serif text-lg md:text-xl font-light text-gray-600 leading-relaxed mb-10">
          We also serve other jewelry stores for repairs, earning the trust of the trade
          alongside the trust of our community.
        </p>

        {/* Decorative */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="w-16 h-px bg-brand-gold/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/60" />
          <div className="w-16 h-px bg-brand-gold/50" />
        </div>

        <Link
          href="/about"
          className="font-serif text-sm tracking-widest uppercase border border-brand-charcoal text-brand-charcoal px-10 py-3 hover:border-brand-red hover:text-brand-red transition-colors"
        >
          Our Story
        </Link>
      </div>
    </section>
  )
}
