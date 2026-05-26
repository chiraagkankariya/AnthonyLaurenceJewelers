const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || '#'

export default function ConsultationBanner() {
  return (
    <section className="bg-brand-red py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* Decorative */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-brand-gold/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/60" />
          <div className="w-12 h-px bg-brand-gold/60" />
        </div>

        <p className="font-serif text-xs tracking-[0.3em] uppercase text-brand-gold/80 mb-4">
          We&apos;re Here to Help
        </p>

        <h2 className="font-serif text-4xl md:text-5xl font-light text-white leading-tight mb-6">
          Have questions?
          <br />
          <em className="not-italic text-brand-gold">Let&apos;s talk.</em>
        </h2>

        <p className="font-serif text-base md:text-lg text-white/70 font-light leading-relaxed mb-10">
          Whether you&apos;re designing a custom piece, need an appraisal, or just want expert advice —
          we&apos;re happy to sit down and talk through everything with you.
        </p>

        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-serif text-sm tracking-widest uppercase bg-brand-gold text-brand-charcoal px-12 py-4 hover:bg-[#d4901e] transition-colors duration-200"
        >
          Book a Consultation
        </a>

        <p className="mt-6 font-serif text-xs text-white/40 tracking-widest uppercase">
          Free · No obligation · In store or by phone
        </p>

        {/* Decorative */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="w-12 h-px bg-brand-gold/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/40" />
          <div className="w-12 h-px bg-brand-gold/40" />
        </div>
      </div>
    </section>
  )
}
