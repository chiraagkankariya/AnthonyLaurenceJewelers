import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | Anthony Laurence Jewelers',
  description:
    'Anthony Laurence Jewelers — fine jewelry in Millburn, NJ. Custom pieces, expert repairs, and certified appraisals since day one.',
}

const stats = [
  { number: '40+', label: 'Years in Business' },
  { number: '10+', label: 'NJ Jewelry Stores We Repair For' },
  { number: '2', label: 'Diamond Options: Natural & Lab-Grown' },
]

const differentiators = [
  {
    title: 'Custom Design',
    description: 'Bring your vision to life, from studs to fully custom chains.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    ),
  },
  {
    title: 'Expert Repairs',
    description: 'Trusted by 10+ NJ jewelers for precision repair work.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
        />
      </svg>
    ),
  },
  {
    title: 'Certified Appraisals',
    description: 'Insurance, estate, and resale valuations.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    title: 'Natural & Lab-Grown Diamonds',
    description: 'Your choice, your budget.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
          d="M6 3h12l4 6-10 12L2 9l4-6z M2 9h20 M8 9l4 12 M16 9l-4 12"
        />
      </svg>
    ),
  },
]

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

      {/* Brand story + storefront */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="font-serif text-gray-600 leading-relaxed text-[16.5px] space-y-5">
            <p>
              For over 40 years, Anthony Laurence Jewelers has been a trusted name in fine jewelry —
              relied upon not just by generations of customers, but by other jewelers and retailers
              throughout New Jersey. Today, more than 10 jewelry stores across the state turn to us
              for expert repairs, a testament to the craftsmanship and care we bring to every piece.
            </p>
            <p>
              From the smallest diamond studs to fully custom-designed chains, we create jewelry
              tailored to your exact vision. Beyond custom design, we offer professional appraisals
              and a curated selection of both natural and lab-grown diamonds — so you can choose
              exactly what matters most to you.
            </p>
            <p>
              Four decades in, our commitment remains the same: exceptional quality, honest
              expertise, and pricing that respects your trust.
            </p>
          </div>
          <div className="relative aspect-[3/2] w-full overflow-hidden">
            <Image
              src="/about-storefront.jpg"
              alt="Anthony Laurence Jewelers storefront in Millburn, NJ"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>

      {/* By the Numbers */}
      <div className="bg-[#F5F5F5] border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            {stats.map(({ number, label }) => (
              <div key={label}>
                <p className="font-serif text-5xl md:text-6xl font-light text-brand-gold mb-3">
                  {number}
                </p>
                <p className="font-serif text-xs md:text-sm tracking-widest uppercase text-brand-charcoal">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What Sets Us Apart */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="font-serif text-xs tracking-[0.3em] uppercase text-brand-gold mb-3">
            Why Anthony Laurence
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-charcoal">
            What Sets Us Apart
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="w-12 h-px bg-brand-gold/50" />
            <div className="w-1 h-1 rounded-full bg-brand-gold/50" />
            <div className="w-12 h-px bg-brand-gold/50" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentiators.map((item) => (
            <div
              key={item.title}
              className="group flex flex-col items-center text-center p-8 border border-gray-100 hover:border-brand-gold/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-brand-gold/60 group-hover:text-brand-gold transition-colors duration-300 mb-6">
                {item.icon}
              </div>
              <div className="w-8 h-px bg-brand-gold/40 mb-6" />
              <h3 className="font-serif text-xl font-light text-brand-charcoal mb-3">
                {item.title}
              </h3>
              <p className="font-serif text-sm text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Location & hours + CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
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
