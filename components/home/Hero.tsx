import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-start justify-center bg-brand-ivory overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.webp"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-test.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay so text remains readable */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Decorative corner lines */}
      <div className="absolute top-12 left-12 w-16 h-16 border-t border-l border-brand-gold/40 hidden md:block" />
      <div className="absolute top-12 right-12 w-16 h-16 border-t border-r border-brand-gold/40 hidden md:block" />
      <div className="absolute bottom-12 left-12 w-16 h-16 border-b border-l border-brand-gold/40 hidden md:block" />
      <div className="absolute bottom-12 right-12 w-16 h-16 border-b border-r border-brand-gold/40 hidden md:block" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 animate-fadeIn pt-20">
        {/* Logo */}
        <Image
          src="/alj-logo-final1.png"
          alt="Anthony Laurence Jewelers"
          width={1080}
          height={429}
          className="h-[12vh] w-auto max-w-[90vw] object-contain mb-3"
          priority
        />

        {/* Divider */}
        <div className="flex items-center gap-4 mb-3">
          <div className="w-16 h-px bg-brand-gold/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/60" />
          <div className="w-16 h-px bg-brand-gold/60" />
        </div>

        {/* Tagline */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-white leading-tight tracking-wide">
          Made to Be
          <br />
          <em className="not-italic text-brand-gold">Remembered.</em>
        </h1>

        <p className="mt-2 font-serif text-base md:text-lg text-white/70 font-light tracking-widest uppercase">
          Fine Jewelry · Millburn, New Jersey
        </p>

        {/* Divider */}
        <div className="flex items-center gap-4 my-4">
          <div className="w-16 h-px bg-brand-gold/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/60" />
          <div className="w-16 h-px bg-brand-gold/60" />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="font-serif text-sm tracking-widest uppercase bg-brand-red text-white px-10 py-4 hover:bg-[#6B0000] transition-colors"
          >
            Shop Now
          </Link>
          <Link
            href="/custom"
            className="font-serif text-sm tracking-widest uppercase border border-white/70 text-white px-10 py-4 hover:border-brand-gold hover:text-brand-gold transition-colors"
          >
            Design Custom
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
        <span className="font-serif text-xs tracking-widest uppercase text-white/50">Scroll</span>
        <svg className="w-4 h-4 text-brand-gold/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
