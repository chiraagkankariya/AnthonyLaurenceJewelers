import Image from 'next/image'
import Link from 'next/link'

const categories = [
  {
    label: 'Rings',
    href: '/shop/rings',
    description: 'Engagement, wedding & fashion rings',
    accent: 'from-rose-50 to-brand-ivory',
    iconSrc: null,
  },
  {
    label: 'Necklaces',
    href: '/shop/necklaces',
    description: 'Pendants, chains & tennis necklaces',
    accent: 'from-amber-50 to-brand-ivory',
    iconSrc: '/category-necklace.svg',
  },
  {
    label: 'Earrings',
    href: '/shop/earrings',
    description: 'Studs, hoops & drop earrings',
    accent: 'from-brand-gray to-white',
    iconSrc: '/category-earrings.svg',
  },
  {
    label: 'Bracelets',
    href: '/shop/bracelets',
    description: 'Tennis bracelets & more',
    accent: 'from-slate-50 to-brand-ivory',
    iconSrc: null,
  },
]

// Placeholder SVG icons for categories without an uploaded image
const icons: Record<string, React.ReactNode> = {
  Rings: (
    <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16" stroke="currentColor">
      <circle cx="32" cy="36" r="18" strokeWidth="2" />
      <path d="M24 36 C24 28 40 28 40 36" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="32" cy="18" rx="5" ry="7" strokeWidth="1.5" />
    </svg>
  ),
  Necklaces: (
    <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16" stroke="currentColor">
      <path d="M12 16 Q32 52 52 16" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="32" cy="50" rx="5" ry="7" strokeWidth="1.5" />
    </svg>
  ),
  Earrings: (
    <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16" stroke="currentColor">
      <circle cx="22" cy="16" r="3" strokeWidth="1.5" />
      <path d="M22 19 L22 36" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="22" cy="43" rx="5" ry="7" strokeWidth="1.5" />
      <circle cx="42" cy="16" r="3" strokeWidth="1.5" />
      <path d="M42 19 L42 36" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="42" cy="43" rx="5" ry="7" strokeWidth="1.5" />
    </svg>
  ),
  Bracelets: (
    <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16" stroke="currentColor">
      <path d="M12 32 Q12 14 32 14 Q52 14 52 32 Q52 50 32 50 Q12 50 12 32" strokeWidth="2" />
      <circle cx="32" cy="14" r="4" strokeWidth="1.5" />
    </svg>
  ),
}

export default function ShopByCategory() {
  return (
    <section className="py-20 bg-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-serif text-xs tracking-[0.3em] uppercase text-brand-gold mb-3">
            Explore
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-charcoal">
            Shop by Category
          </h2>
          <div className="flex items-center justify-center gap-4 mt-5">
            <div className="w-12 h-px bg-brand-gold/50" />
            <div className="w-1 h-1 rounded-full bg-brand-gold/50" />
            <div className="w-12 h-px bg-brand-gold/50" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`group relative flex flex-col items-center justify-center bg-gradient-to-br ${cat.accent} aspect-square p-8 overflow-hidden transition-shadow duration-300 hover:shadow-lg`}
            >
              {/* Corner accent */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-brand-gold/30 transition-all duration-300 group-hover:w-8 group-hover:h-8" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-brand-gold/30 transition-all duration-300 group-hover:w-8 group-hover:h-8" />

              {/* Icon */}
              <div className="mb-4 transition-opacity duration-300 opacity-60 group-hover:opacity-100">
                {cat.iconSrc ? (
                  <Image
                    src={cat.iconSrc}
                    alt={cat.label}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <div className="text-brand-charcoal/30 group-hover:text-brand-red/30 transition-colors duration-300">
                    {icons[cat.label]}
                  </div>
                )}
              </div>

              {/* Label */}
              <h3 className="font-serif text-xl md:text-2xl font-light text-brand-charcoal group-hover:text-brand-red transition-colors duration-300">
                {cat.label}
              </h3>
              <p className="font-serif text-xs text-gray-400 mt-2 text-center leading-relaxed hidden md:block">
                {cat.description}
              </p>

              {/* Arrow */}
              <span className="mt-4 font-serif text-xs tracking-widest uppercase text-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
