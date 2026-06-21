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
  { number: '15+', label: 'Jewelry Stores We Repair For' },
  { number: '2', label: 'Diamond Options: Natural & Lab-Grown' },
]

const differentiators = [
  {
    title: 'Custom Design',
    description: 'Bring your vision to life, from studs to fully custom chains.',
  },
  {
    title: 'Expert Repairs',
    description: 'Trusted by 10+ NJ jewelers for precision repair work.',
  },
  {
    title: 'Certified Appraisals',
    description: 'Insurance, estate, and resale valuations.',
  },
  {
    title: 'Natural & Lab-Grown Diamonds',
    description: 'Your choice, your budget.',
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
              throughout New Jersey. Today, more than <span className="font-sans text-gray-600 text-[16.5px]">10</span> jewelry stores across the state turn to us
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

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
          {differentiators.map((item, index) => (
            <div
              key={item.title}
              className="flex items-start gap-6 py-10 border-t border-brand-gold/30"
            >
              <span className="font-serif text-4xl md:text-5xl font-light text-brand-gold leading-none shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-serif text-2xl font-semibold text-brand-charcoal mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="font-serif text-[15px] text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
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
