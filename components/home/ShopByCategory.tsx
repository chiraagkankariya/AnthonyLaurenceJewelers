import Image from 'next/image'
import Link from 'next/link'

const categories = [
  {
    label: 'Rings',
    href: '/shop/rings',
    description: 'Engagement, wedding & fashion rings',
    iconSrc: '/category-rings.svg',
  },
  {
    label: 'Necklaces',
    href: '/shop/necklaces',
    description: 'Pendants, chains & tennis necklaces',
    iconSrc: '/category-necklace.svg',
  },
  {
    label: 'Earrings',
    href: '/shop/earrings',
    description: 'Studs, hoops & drop earrings',
    iconSrc: '/category-earrings.svg',
  },
  {
    label: 'Bracelets',
    href: '/shop/bracelets',
    description: 'Tennis bracelets & more',
    iconSrc: '/category-bracelet.svg',
  },
]

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
              className="group relative aspect-square overflow-hidden block transition-shadow duration-300 hover:shadow-xl bg-[#F0F0F0]"
            >
              {/* Background — full-bleed image */}
              <Image
                src={cat.iconSrc}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 320px"
              />

              {/* Dark gradient overlay — always present, deepens on hover */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/65 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/40 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-brand-gold/70 z-10" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/40 transition-all duration-300 group-hover:w-8 group-hover:h-8 group-hover:border-brand-gold/70 z-10" />

              {/* Text — pinned to bottom over gradient */}
              <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                <h3 className="font-serif text-xl md:text-2xl font-light text-white leading-tight">
                  {cat.label}
                </h3>
                <p className="font-serif text-xs text-white/70 mt-1 leading-relaxed hidden md:block">
                  {cat.description}
                </p>
                <span className="mt-2 inline-block font-serif text-xs tracking-widest uppercase text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
